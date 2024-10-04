// App.tsx
import React from 'react';
import Java from './java';
import styled from 'styled-components';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
    setTasks(savedTasks as Task[]);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Body>
      <Container>
        <Heading>
          <h1>TO DO LIST</h1>
        </Heading>
        <Java tasks={tasks} setTasks={setTasks} />
      </Container>
    </Body>
  );
}

export default App;

export const Body = styled.div`
   font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
`;

export const Container = styled.div`
  background: #000000;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
`;

export const Heading = styled.h1`
  margin: 0 0 20px;
    font-size: 24px;
    text-align: center;
    color: white;
`;

export const InputContainer = styled.div`
  display: flex;
    margin-bottom: 10px;
`;

export const Paragraph = styled.p`
   font-size: 15px;
    text-emphasis-color: blue;
    animation-fill-mode: forwards;
`;

export const TaskInput = styled.div`
 flex: 1;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
`;

export const Button = styled.button`
padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:red;
  }
`;

export const FilterButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #5e2d4b;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #b36b00;
  }
`;

export const FilterContainer = styled.div`
   margin-bottom: 20px;
  text-align: center;

`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #fffbfb;
  color: #f4f4f4;

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.label`
  flex: 1;
  margin-left: 10px;
`;

export const CheckboxInput = styled.input`
 margin-right: 10px;
`;
export const DeleteButton = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;