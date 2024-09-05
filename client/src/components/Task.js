import React from 'react';
import { useDrag } from 'react-dnd';


const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { taskId: task._id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="task" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
