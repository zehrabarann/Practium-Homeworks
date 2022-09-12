import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList.js';

function App() {

  useEffect(() => {
    const todos = localStorage.getItem('todos')
    if (todos === null) {
      localStorage.setItem('todos', JSON.stringify([
        { id: 1, title: "Learn JavaScript", status: false },
        { id: 2, title: "Learn React", status: false },
        { id: 3, title: "Have a Life", status: false }
      ]))
    }
  })
  return (
    <div className="App">
      <TodoList />

    </div>
  );
}

export default App;
