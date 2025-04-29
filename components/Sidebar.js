import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #8c6e63;
  color: white;
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        color: #d3a376;
      }
    }
  }

  .task-count {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #fff2df;
  }
`;

const Sidebar = ({ onFilterChange, tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <SidebarContainer>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Menu
      </h2>
      <ul>
        <li onClick={() => onFilterChange('all')}>All Tasks</li>
        <li onClick={() => onFilterChange('pending')}>Pending</li>
        <li onClick={() => onFilterChange('completed')}>Completed</li>
      </ul>
      <div className="task-count">
        Pending: {pendingTasks}, Completed: {completedTasks}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;