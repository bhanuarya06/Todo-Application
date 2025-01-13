import './App.css';
import Home from './Compnenets/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from "./Compnenets/Nav";
import SignUp from "./Compnenets/SignUp";
import Login from "./Compnenets/Login";
import PrivateComponent from './Compnenets/PrivateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route element={ <PrivateComponent />}>
            <Route path="/home" element={<Home />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;






















