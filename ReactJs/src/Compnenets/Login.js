import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const register = ()=>{
        console.log("user added :",name);
        alert('user added :'+name);
        setName('');
        setPassword('');
        navigate('/');
    }

    return (
        <div className="Login">
            <label htmlFor="name">USERNAME</label>
            <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button type="button" onClick={register}>REGISTER</button>
        </div>
    );
}

export default Login;