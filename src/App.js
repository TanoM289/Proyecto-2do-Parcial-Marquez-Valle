import React, { useReducer, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styled from 'styled-components';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filter: 'all', // Puede ser 'all', 'pending', 'completed'
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Recordatorios automáticos
  useEffect(() => {
    const checkReminders = () => {
      const today = new Date();
      state.tasks.forEach((task) => {
        if (!task.completed && task.dueDate) {
          const dueDate = new Date(task.dueDate);
          const timeDiff = dueDate - today;
          const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          if (daysLeft <= 2 && daysLeft > 0) {
            alert(`Recordatorio: Tienes ${daysLeft} día(s) para "${task.title}"`);
          }
        }
      });
    };

    checkReminders();
  }, [state.tasks]);

  // Funciones para manejar tareas
  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task, completed: false };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const editTask = (updatedTask) => {
    dispatch({ type: 'EDIT_TASK', payload: updatedTask });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    dispatch({ type: 'EDIT_TASK', payload: updatedTasks.find((t) => t.id === taskId) });
  };

  // Filtrar tareas según el estado
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <AppContainer>
      <Header />
      <MainLayout>
        <Sidebar
          onFilterChange={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })}
          tasks={state.tasks}
        />
        <Content>
          <h1>Task Planner</h1>
          <TaskForm onSubmit={addTask} />
          <TaskList
            tasks={filteredTasks}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </Content>
      </MainLayout>
    </AppContainer>
  );
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffe0b2; /* Fondo principal */
  color: #3e2522; /* Texto principal */
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default App;