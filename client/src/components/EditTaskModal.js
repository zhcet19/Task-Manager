import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const updatedTask = { title, description, status };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${task._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
      });
      if (response.status === 200) {
        onSave(response.data);
        onClose();
      } else {
        console.error('Failed to update the task');
      }
    } catch (error) {
      console.error('An error occurred while updating the task:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box 
        style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          margin: 'auto', 
          marginTop: '10%', 
          maxWidth: '20%', 
          height: '50%', 
          borderRadius: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Box>
          <Typography variant="h5">Edit Task</Typography>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="inherit" onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button variant="contained" color="inherit" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
