import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TaskColumn from './TaskColumn';

const TaskBoard = ({ tasks, onEdit, onView,onDelete, moveTask }) => {
  const taskStatus = ['TODO', 'IN PROGRESS', 'DONE'];

  return (
    <Grid container spacing={2} >
      {taskStatus.map(status => (
        <Grid item xs={12} md={4} key={status}>
          <Paper elevation={3} sx={{pt:1}}>
            <Typography variant="h6" align="left" sx={{ margin: '10px' ,p:1,  backgroundColor: '#2196f3' , color:"white", fontSize:15, fontWeight:"bold"}} >{status}</Typography>
            <TaskColumn
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              moveTask={moveTask}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskBoard;
