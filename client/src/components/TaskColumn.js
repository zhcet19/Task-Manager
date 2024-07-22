import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';


const TaskColumn = ({ status, tasks, onEdit, onView,onDelete, moveTask }) => {

    const [, drop] = useDrop({
        accept: 'task',
        drop: (item) => {
          console.log(item); // Should log the task item with id
          moveTask(item.id, status);
        }
      });

      
  return (
    <div ref={drop} style={{ minHeight: '400px' }}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onView={onView}  onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default TaskColumn;
