import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const login = async () => {
        try {
            if (!username || !password) {
                setErrorMessage('all fields are required');
            } else {
                const resdata = await fetch("http://localhost:5011/login", {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (resdata.ok) {
                    const data = await resdata.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    navigate('/home');
                } else {
                    const data = await resdata.json();
                    console.data(data.message());
                }
            }
        } catch (error) {
            console.error("user not found", error.message);
        }
    }
    const createAcc = () => {
        navigate('/signup');
    };
    return (
        <div className="Login">
            <h2>User Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <button type="button" onClick={login} >
                Login</button>
                <br />
                <br />
            <h3>don't have an account</h3>
            <button onClick={createAcc}>Create Account</button>
        </div>
    )
}

export default Login;