// java.tsx
import React from 'react';
import { DeleteButton, FilterButton, FilterContainer, ListItem, UnorderedList } from "./App";
import { Button, CheckboxInput, InputContainer, Label, Paragraph, TaskInput } from "./App";

//  The Task interface
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

//  Creating the JavaProps interface
interface JavaProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// I am Defining the Java component
const Java: React.FC<JavaProps> = ({ tasks, setTasks }) => {
  // Initialize the taskInput state
  const [taskInput, setTaskInput] = React.useState('');

  // I am Seting up the filter state
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'incomplete'>('all');

  // I am  setting the addTask function
  const addTask = () => {
    // Check if the taskInput is empty
    if (taskInput.trim() === '') return;

    // Creating a new task object
    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    // Add the new task to the tasks 
    setTasks([...tasks, newTask]);

    // Reset the taskInput state
    setTaskInput('');
  };

  // Defining the toggleTaskCompletion function
  const toggleTaskCompletion = (id: number) => {
    // Toggle the completed state of the task with the given id
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Defining  the deleteTask function
  const deleteTask = (id: number) => {
    // Remove the task with the given id from the tasks array
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter on the state the user has marked the object
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Return the JSX
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