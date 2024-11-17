import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import api from '../services/api';
import './Login.css'; // Importando o arquivo de estilos CSS

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação programática

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpar mensagens de erro
        try {
            const response = await api.post('/login', { username, password });
            console.log("Login bem-sucedido:", response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard'); // Redireciona para o dashboard após o login
        } catch (error) {
            console.error("Erro no login:", error.response?.data || error.message);
            setError('Credenciais inválidas. Tente novamente.');
        }
    };
    const handleRegisterRedirect = () => {
        navigate('/signup'); // Redireciona para a página de registro
    };


    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Entrar</button>
                <p>
                    Não tem uma conta?{' '}
                    <button type="button" onClick={handleRegisterRedirect}>Cadastre-se</button>
                </p>
            </form>
        </div>
    );
}

export default Login;
