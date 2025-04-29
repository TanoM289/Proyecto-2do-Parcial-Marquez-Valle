import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;

  h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 10px;
    background-color: #3e2522;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #8c6e63;
    }
  }
`;

const TaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [dueDate, setDueDate] = React.useState(task.dueDate);

  const handleSave = () => {
    if (!title.trim() || !dueDate) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    onSave({ ...task, title, description, dueDate });
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>Edit Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default TaskModal;