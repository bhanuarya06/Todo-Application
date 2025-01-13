import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate("/home");
        }
    },[]);

    const sendLoginDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5011/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to register user.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error sending login details:", error);
            setErrorMessage(error.message || "An unexpected error occurred.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        setErrorMessage(''); // Clear previous error messages
        console.log("User Details:", { username, email, password });
        if (!username || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }
        const userdata = await sendLoginDetails();
        if (userdata) {
            console.log("User data added:", userdata);
            alert('User registered successfully: ' + username);
            setName('');
            setPassword('');
            setEmail('');
            localStorage.setItem("user",JSON.stringify(userdata));
            navigate('/home'); // Navigate to home page
        } else {
            console.error("Failed to register user.");
        }
    };

    return (
        <div className="Login">
            <h2>Create Account</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <button type="button" onClick={register} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
    );
}

export default SignUp;