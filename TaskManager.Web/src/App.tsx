// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { TaskItem, TaskFilter } from './types/task';
import './App.css'; 

// 📌 The corrected API URL with port 5021 (based on your setup)
const API_URL = 'http://localhost:5021/api/tasks';

function App() {
  // Utility to save to Local Storage (NEW ADDITION)
  const saveTasksLocally = (currentTasks: TaskItem[]) => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(currentTasks));
  };

  // 📌 Initialize state by loading from Local Storage (REPLACEMENT/MODIFICATION)
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const localData = localStorage.getItem('taskManagerTasks');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all'); 

  // 1. Display a list of tasks (GET /api/tasks) (MODIFIED)
  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
      saveTasksLocally(response.data); // NEW LINE: Sync with local storage on successful fetch
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // On failure, rely on the state loaded from localStorage in the useState hook
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Add a new task (POST /api/tasks) (MODIFIED)
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDescription.trim()) return;

    const newTask: Partial<TaskItem> = {
      description: newTaskDescription,
      isCompleted: false,
    };

    try {
      // POST call returns the newly created task with its GUID
      const response = await axios.post<TaskItem>(API_URL, newTask);
      setNewTaskDescription('');
      
      // Update state and save locally in one go (IMPROVEMENT)
      setTasks(prevTasks => {
        const newTasks = [...prevTasks, response.data]; 
        saveTasksLocally(newTasks); // NEW LINE
        return newTasks;
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 3. Mark a task as completed/uncompleted (PUT /api/tasks/{id}) (MODIFIED)
  const handleToggleCompletion = async (task: TaskItem) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      await axios.put(`${API_URL}/${task.id}`, updatedTask);
      
      // Optimistically update the UI and save to local storage (MODIFIED)
      setTasks(prevTasks => {
        const newTasks = prevTasks.map(t => (t.id === task.id ? updatedTask : t));
        saveTasksLocally(newTasks); // NEW LINE
        return newTasks;
      });
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  // 4. Delete a task (DELETE /api/tasks/{id}) (MODIFIED)
  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Update the UI by filtering out the deleted task and save (MODIFIED)
      setTasks(prevTasks => {
        const newTasks = prevTasks.filter(t => t.id !== id);
        saveTasksLocally(newTasks); // NEW LINE
        return newTasks;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 💡 Task Filtering Logic (Enhancement)
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'active') return !task.isCompleted;
    return true; // 'all' filter
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* UI for Adding a task */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Enter new task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task filtering UI (Enhancement) */}
      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      {/* Display all tasks in a list */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.isCompleted ? 'completed' : ''}>
            <span 
                style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
                onClick={() => handleToggleCompletion(task)} // Toggling completion status
            >
                {task.description}
            </span>
            <button 
              className="delete-btn" 
              onClick={() => handleDeleteTask(task.id)} // Deleting a task
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;