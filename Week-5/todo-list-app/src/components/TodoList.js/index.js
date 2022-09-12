import { useRef } from "react";
import { useState } from "react"

const TodoList = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [newTodo, setNewTodo] = useState("");
    const todosPrev = useRef();

    //Enter'a tıklanması 
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTodo()
        }
    }

    //Add new todo
    const addTodo = () => {
        if (newTodo) {
            let num = todos.length + 1; //Yeni eklenen id değeri
            let newEntry = { id: num, title: newTodo, status: false }
            todosPrev.current = [...todos, newEntry]
            setTodos([...todos, newEntry])
            addLocalStorage([...todos, newEntry])
            setNewTodo("")
        }
    }

    //Add todos in storage
    const addLocalStorage = (values) => {
        let localTodo = [...values]
        localStorage.setItem("todos", JSON.stringify(localTodo))
    }

    //Delete todo 
    const deleteTodo = (id) => {
        let newTasks = todos.filter(task => task.id !== parseInt(id))
        addLocalStorage(newTasks)
        setTodos(newTasks)
    }

    const markDone = (id) => {
        let newTasks = todos.map((task) => {
            if (task.id === id) {
                return ({ ...task, status: !task.status })
            }
            return task;
        })
        todosPrev.current = [...newTasks]
        addLocalStorage(newTasks)
        setTodos(newTasks)
    }

    const handleAllCheck = () => {
        setTodos(todosPrev.current)
    }

    const handleActiveFilter = () => {
        const todosTemp = [...todosPrev.current]
        const filterActive = todosTemp.filter((e) => e.status === false);
        setTodos(filterActive)
    }

    const handleComplatedFilter = () => {
        const todosTemp = [...todosPrev.current]
        const filter = todosTemp.filter((e) => e.status === true);
        setTodos(filter)
    }

    const handleClearCompleted = (id) => {
        const todosTemp = [...todosPrev.current]
        const filterActive = todosTemp.filter((e) => e.status === false);
        setTodos(filterActive)
    }

    return (
        <>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <form>
                        <input className="new-todo" placeholder="What needs to be done?" autoFocus
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            onKeyDown={handleKeyDown} />
                    </form>
                </header>

                <section className="main">
                    <input className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">
                        Mark all as complete
                    </label>
                    {todos.map((task, index) => {
                        return (
                                <ul className="todo-list" key={index + task.title}>
                                    <li className={task.status && "completed"}>
                                        <div className="view">
                                            <input className="toggle" type="checkbox" onClick={() => markDone(task.id)} />
                                            <label className="task-label">{task.title}</label>
                                            <button className="destroy" onClick={() => deleteTodo(task.id)}></button>
                                        </div>
                                    </li>
                                </ul>
                        )
                    })}
                </section>

                <footer className="footer">
                    <span className="todo-count">
                        <strong>{JSON.parse(localStorage.getItem('todos'))?.filter((e) => e.status === false).length}</strong>
                        items left
                    </span>

                    <ul className="filters">
                        <li>
                            <a href="#/" onClick={handleAllCheck} className="selected">All</a>
                        </li>
                        <li>
                            <a href="#/" onClick={handleActiveFilter}>Active</a>
                        </li>
                        <li>
                            <a href="#/" onClick={handleComplatedFilter}>Completed</a>
                        </li>
                    </ul>

                    <button className="clear-completed" onClick={handleClearCompleted}>
                        Clear completed
                    </button>
                </footer>
            </section>

            <footer className="info">
                <p>Click to edit a todo</p>
                <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </>
    )
}

export default TodoList