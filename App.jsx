import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 My To-Do List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-btn">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 && <p className="empty-msg">No tasks yet!</p>}
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span
              className="todo-text"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
