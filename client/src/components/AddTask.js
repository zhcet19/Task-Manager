import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddTask = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const newTask = { title, description, status };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
      });
      if (response.data) {
        onSave(response.data);
        setTitle('');
        setDescription('');
        onClose();
      } else {
        console.error('Failed to save the task');
      }
    } catch (error) {
      console.error('An error occurred while saving the task:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', mt: '10%', maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add Task</Typography>
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
        
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTask;
