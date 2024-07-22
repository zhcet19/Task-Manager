import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { useDrag } from 'react-dnd';
import axios from 'axios';

const TaskCard = ({ task, onEdit, onView, onDelete }) => {



  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task._id }, // Make sure to use _id here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
      });
      onDelete(task);
    } catch (error) {
      console.error('An error occurred while deleting the task:', error);
    }
  };

  return (
    <Card ref={drag} style={{ margin: '10px', opacity: isDragging ? 0.5 : 1, backgroundColor:"#c0d7ef" }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography color="textSecondary">{task.description}</Typography>
        <Typography color="textSecondary">{`Created at: ${task.createdAt}`}</Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button size="small" variant="contained" color="error" sx={{mr:1}} onClick={handleDelete}>Delete</Button>
          <Button size="small" variant="contained" color="primary" sx={{mr:1}} onClick={() => onEdit(task)}>Edit</Button>
          <Button size="small" variant="contained" color="primary" onClick={() => onView(task)}>View Details</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
