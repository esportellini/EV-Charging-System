import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Preferences.css'; // Importando o arquivo de estilos CSS

function Preferences() {
    const [preferences, setPreferences] = useState({
        renewableOnly: false,
        offPeakHours: false,
    });

    // Carregar preferências quando o componente for montado
    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await api.get('/preferences', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setPreferences({
                    renewableOnly: response.data.renewable_only,
                    offPeakHours: response.data.off_peak_hours,
                });
            } catch (error) {
                console.error('Erro ao carregar preferências', error);
            }
        };

        fetchPreferences();
    }, []);

    const updatePreferences = async () => {
        try {
            await api.put('/preferences', preferences, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Preferências atualizadas com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar preferências', error);
            alert('Falha ao atualizar preferências');
        }
    };

    return (
        <div className="preferences-container">
            <form onSubmit={(e) => e.preventDefault()} className="preferences-form">
                <h2>Configurações de Carregamento</h2>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={preferences.renewableOnly}
                            onChange={(e) => setPreferences({ ...preferences, renewableOnly: e.target.checked })}
                            className="checkbox-input"
                        />
                        Usar apenas energia renovável
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={preferences.offPeakHours}
                            onChange={(e) => setPreferences({ ...preferences, offPeakHours: e.target.checked })}
                            className="checkbox-input"
                        />
                        Carregar em horários de menor demanda
                    </label>
                </div>
                <button type="button" onClick={updatePreferences} className="submit-button">
                    Salvar Configurações
                </button>
            </form>
        </div>
    );
}

export default Preferences;
