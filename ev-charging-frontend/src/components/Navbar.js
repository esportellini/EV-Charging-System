import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Estilos para o menu de navegação

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/preferences" className="navbar-link">Preferências</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
