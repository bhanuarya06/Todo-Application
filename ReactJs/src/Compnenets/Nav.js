import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            {auth ?
                <ul>
                    <li> <Link to="/home">Home</Link></li>
                    <li> <Link to="/" onClick={logout}>Logout  ({JSON.parse(localStorage.getItem("user")).username})</Link></li>
                </ul>

                :
                <ul>
                    <li> <Link to="/" >Login</Link></li>
                </ul>
            }
        </div>
    );
}

export default Nav;