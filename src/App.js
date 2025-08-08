import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Triagem from './components/Triagem';
import FichaPaciente from './components/FichaPaciente';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/triagem" element={<Triagem />} />
        <Route path="/ficha" element={<FichaPaciente />} />
      </Routes>
    </div>
  );
}

export default App;