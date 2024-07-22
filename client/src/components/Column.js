import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';


const Column = ({ column, tasks }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: () => ({ columnId: column })
  });

  return (
    <div className="column" ref={drop}>
      <h2>{column}</h2>
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default Column;
