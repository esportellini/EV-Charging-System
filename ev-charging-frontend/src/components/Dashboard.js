import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Importando o CSS da biblioteca
import api from '../services/api';
import './Dashboard.css'; // Importando o CSS para o Dashboard

function Dashboard() {
    const [status, setStatus] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(100); // 100% no início

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await api.get('/status', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setStatus(response.data);

                // Supondo que 'timeRemaining' venha como um número (em segundos, por exemplo)
                const time = response.data.timeRemaining;

                // Se o valor de timeRemaining for válido, atualize o estado
                if (time && !isNaN(time)) {
                    setTimeRemaining(time); // Defina o tempo restante corretamente
                } else {
                    setTimeRemaining(100); // Caso o valor seja inválido, defina 100%
                }
            } catch (error) {
                console.error('Erro ao buscar status', error);
            }
        };

        fetchStatus();
    }, []);
    
    // Garantir que timeRemaining seja um número válido para o cálculo
    const percentage = (((timeRemaining) / 60) * 100 - 100) * -1  // Supondo que o tempo total seja 60 minutos;
    console.log(timeRemaining);
    console.log(percentage);

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <h2>Status de Recarga</h2>

                {status ? (
                    <div className="status-card">
                        <p>Status: {status.status}</p>
                        <p>Fonte de Energia: {status.energySource}</p>
                        <p>Tempo Restante: {status.timeRemaining} minutos</p>

                        {/* Círculo de progresso */}
                        <div className="progress-circle">
                            <CircularProgressbar 
                                value={percentage} 
                                text={`${percentage.toFixed(0)}%`} 
                                styles={{
                                    path: {
                                        stroke: `#4caf50`,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                        transformOrigin: 'center center',
                                    },
                                    trail: {
                                        stroke: '#e6e6e6',
                                    },
                                    text: {
                                        fill: '#4caf50',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="loading">Carregando...</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
