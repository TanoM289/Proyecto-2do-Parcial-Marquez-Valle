import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #3e2522;
  color: white;
  padding: 1rem;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Task Planner</h1>
    </HeaderContainer>
  );
};

export default Header;