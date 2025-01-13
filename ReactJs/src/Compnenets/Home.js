import React, { useState, useEffect } from 'react';

function Home() {
    const [taskName, setTaskName] = useState('');
    const [data, setData] = useState([]);
    const addTaskName = (e) => {
        setTaskName(e.target.value);
    }

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

    const addTask = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            alert("Please add a taskname");
            return;
        }

        const register = async () => {
            try {
                const result = await fetch("http://localhost:5011/addTask", {
                    method: "POST",
                    body: JSON.stringify({ taskName }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const newtask = await result.json();
                setData((prevdata) => [...prevdata, newtask]);
            } catch (e) {
                console.error("Error adding task:", e);
            }

        };
        register();
        setTaskName('');
    }
    return (
        <div className="Home">
            <h1>TodoList</h1>
            <div className="container">
                <label htmlFor="taskName"></label>
                <input type="text" id="taskname" value={taskName} onChange={addTaskName}></input>
                <button type="button" htmlFor="taskname" value={taskName} onClick={addTask}>Add Task</button>
            </div>
            <div className="todolist">
                <h1>List of TODOs</h1>
                <ul>
                    {data.map((todo) => (
                        <li key={todo._id}>{todo.taskName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;