import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Estilos para o menu de navegação

function Navbar() {
    const location = useLocation();

    // Verificar se a localização atual é /login ou /signup
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null; // Não renderizar o Navbar
    }

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/preferences" className="navbar-link">Preferências</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/login" className="navbar-link">Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;