import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Certifique-se de que o backend esteja rodando nesta URL
});

export default api;
