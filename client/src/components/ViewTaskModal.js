import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ViewTaskModal = ({ task, onClose }) => {
  return (
    <Modal open onClose={onClose}>
      <Box 
        style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          margin: 'auto', 
          marginTop: '10%', 
          maxWidth: '20%', 
          height: "60%", 
          borderRadius: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontSize: 20 }}>{`Task Details`}</Typography>
          <Typography variant="h5">{`Title: ${task.title}`}</Typography>
          <Typography>{`Description: ${task.description}`}</Typography>
          <Typography>{`Created at: ${task.createdAt}`}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewTaskModal;
