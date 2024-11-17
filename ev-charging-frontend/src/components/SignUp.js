import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Para navegação

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem!');
            return;
        }

        try {
            const response = await api.post('/api/register', { username, password });
            console.log("Usuário registrado com sucesso:", response.data);
            navigate('/'); // Redireciona para a tela de login após o cadastro
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.response?.data || error.message);
            setError('Erro ao criar conta. Tente novamente.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleRegister} className="login-form">
                <h2>Cadastro</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirme a Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
                <p>
                    Já tem uma conta?{' '}
                    <button type="button" onClick={() => navigate('/')}>Faça login</button>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
