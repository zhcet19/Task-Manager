import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskBoard from "./TaskBoard";
import { Container, Button } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditTaskModal from "./EditTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import AddTask from "./AddTask";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [alltasks, setAllTasks] = useState([]);
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    // Fetch tasks and columns from the backend
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage

      try {
        const taskResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tasks/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        setTasks(taskResponse.data);
        setAllTasks(taskResponse.data);
        console.log("data", taskResponse.data);
      } catch (error) {
        console.error("Error fetching tasks and columns", error);
      }
    };
    fetchTasks();
  }, []);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)) // Use _id instead of id
    );
    handleCloseEditModal();
  };
  

  const moveTask = async (taskId, newStatus) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const originalTasks = [...tasks]; // Make a copy of the current tasks
  
    // Optimistically update the task in the UI
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  
    try {
      // Make the API call to update the task status
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`,
        {
          status: newStatus,
          title: tasks.find((task) => task._id === taskId).title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      if (response.status !== 200) {
        throw new Error("Failed to update the task");
      }
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
      // Revert the UI change if the API call fails
      setTasks(originalTasks);
    }
  };
  

  const handleAddTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      {
        ...newTask,
        id: tasks.length + 1,
        createdAt: new Date().toLocaleDateString(),
      },
    ];
    setTasks(updatedTasks);
    setIsAddModalOpen(false);
  };

  const handleDelete = (deletedTask) => {
    setTasks(tasks.filter((task) => task._id !== deletedTask._id));
  };

  const handleSearch = (query) => {
    if (!query) {
      setTasks(alltasks);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      if (lowerCaseQuery.length == 0) {
        setTasks(alltasks);
      } else {
        const filtered = tasks.filter((task) =>
          task.title.toLowerCase().includes(lowerCaseQuery)
        );
        setTasks(filtered);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Container>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 10, mb: 5 }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Task
        </Button>
        <SearchBox tasks={tasks} onSearch={handleSearch} />
        <TaskBoard
          tasks={tasks}
          onEdit={handleOpenEditModal}
          onView={handleOpenViewModal}
          onDelete={handleDelete}
          moveTask={moveTask}
        />
        {isEditModalOpen && (
          <EditTaskModal
            task={selectedTask}
            onClose={handleCloseEditModal}
            onSave={handleSaveTask}
          />
        )}
        {isViewModalOpen && (
          <ViewTaskModal task={selectedTask} onClose={handleCloseViewModal} />
        )}
        {isAddModalOpen && (
          <AddTask
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddTask}
          />
        )}
      </Container>
    </DndProvider>
  );
};

export default Dashboard;
