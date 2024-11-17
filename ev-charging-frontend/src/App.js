import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importando o Navbar
import Login from './components/Login'; // Importando a Tela de Login
import Dashboard from './components/Dashboard'; // Importando o Dashboard
import Preferences from './components/Preferences'; // Importando a Tela de Preferências
import SignUp from './components/SignUp'; // Importando a Tela de Registro

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/signup" element={<SignUp />} /> {/* Rota para a tela de registro */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
