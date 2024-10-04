// java.tsx
import React from 'react';
import { DeleteButton, FilterButton, FilterContainer, ListItem, UnorderedList } from "./App";
import { Button, CheckboxInput, InputContainer, Label, Paragraph, TaskInput } from "./App";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface JavaProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Java: React.FC<JavaProps> = ({ tasks, setTasks }) => {
  const [taskInput, setTaskInput] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'incomplete'>('all');

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <InputContainer>
        <TaskInput>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter your task here"
          />
        </TaskInput>
        <Button onClick={addTask}>Add Task</Button>
      </InputContainer>

      <FilterContainer>
        <FilterButton onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton onClick={() => setFilter('completed')}>Completed</FilterButton>
        <FilterButton onClick={() => setFilter('incomplete')}>Incomplete</FilterButton>
      </FilterContainer>

      <UnorderedList id="task-list">
        {filteredTasks.map(task => (
          <ListItem key={task.id}>
            <Label>
              <CheckboxInput
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <Paragraph>{task.text}</Paragraph>
            </Label>
            <DeleteButton onClick={() => deleteTask(task.id)}>Delete</DeleteButton>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};

export default Java;