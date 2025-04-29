import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  select,
  input {
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const TaskFilters = ({ onFilterChange, onSearch }) => {
  return (
    <FiltersContainer>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </FiltersContainer>
  );
};

export default TaskFilters;