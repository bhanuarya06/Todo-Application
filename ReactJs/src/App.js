import './App.css';
import Home from './Compnenets/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from "./Compnenets/Nav";
import Login from "./Compnenets/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;






















