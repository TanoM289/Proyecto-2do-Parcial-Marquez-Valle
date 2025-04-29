import React, { useState } from 'react';
import styled from 'styled-components';
import TaskModal from './TaskModal';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskItem = styled.div`
  background-color: #fff2df;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    color: #555;
  }

  div {
    display: flex;
    gap: 10px;

    button {
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;

      &.edit {
        background-color: #d3a376;
        color: black;
      }

      &.delete {
        background-color: #ef4444;
        color: white;
      }

      &.complete {
        background-color: #10b981;
        color: white;
      }
    }
  }
`;

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  return (
    <>
      <TaskListContainer>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div>
              <button className="edit" onClick={() => handleEditClick(task)}>
                Edit
              </button>
              <button className="delete" onClick={() => onDelete(task.id)}>
                Delete
              </button>
              <button
                className="complete"
                onClick={() => onToggleComplete(task.id)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          </TaskItem>
        ))}
      </TaskListContainer>
      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={onEdit}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TaskList;