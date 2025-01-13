import React, { useState, useEffect } from 'react';

function Home() {
    const [taskName, setTaskName] = useState('');
    const [data, setData] = useState([]);

    // Handles task name input
    const addTaskName = (e) => {
        setTaskName(e.target.value);
    };

    // Fetches all tasks from the backend
    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const res = await fetch("http://localhost:5011/getTaskDetails", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed fetching tasks");
                }
                const con_res = await res.json();
                console.log("Fetched tasks:", con_res); // Debugging log
                setData(Array.isArray(con_res) ? con_res : []);
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };
        getAllTasks();
    }, []);

    // Adds a new task to the backend
    const addTask = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            alert("Please add a task name");
            return;
        }

        const register = async () => {
            try {
                const result = await fetch("http://localhost:5011/addTask", {
                    method: "POST",
                    body: JSON.stringify({ taskName }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const newtask = await result.json();
                setData((prevData) => [...prevData, newtask]);
            } catch (e) {
                console.error("Error adding task:", e);
            }
        };
        register();
        setTaskName('');
    };

    // Deletes a task from the backend
    const delTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5011/delete/${id}`, {
                method: "DELETE",
            });
            // const resdata = await response.json();
            if (response.ok) {
                alert("Data deleted Sucessfully");
                setData((prevData) => prevData.filter((todo) => todo._id !== id));
            } else {
                alert("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="Home">
            <h1>Todo List</h1>
            <div className="container">
                <label htmlFor="taskName"></label>
                <input
                    type="text"
                    id="taskname"
                    value={taskName}
                    onChange={addTaskName}
                    placeholder="Enter task name"
                />
                <button type="button" onClick={addTask}>Add Task</button>
            </div>

            <div className="todolist">
                <h1>List of TODOs</h1>
                <ul>
                    {data.map((todo) => (
                        <li key={todo._id}>
                            {todo.taskName}
                            <span>
                                <button onClick={() => delTask(todo._id)}>Delete</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;