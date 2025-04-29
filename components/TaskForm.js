import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input,
  textarea {
    padding: 10px;
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
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #8c6e63;
    }
  }
`;

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !dueDate) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    onSubmit({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título (ej. Salir a pasear)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Agregar Tarea</button>
    </FormContainer>
  );
};

export default TaskForm;