import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav(){
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <ul>
                <li> <Link to="/home">Home</Link></li>
                <li> {auth? <Link to="/" onClick={logout}>Logout</Link>: <Link to="/">Login</Link>}</li>
            </ul>
        </div>
    );
}

export default Nav;