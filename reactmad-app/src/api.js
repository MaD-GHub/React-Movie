// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '182071d1195c0a892ce90dfc2b1fc280',
        language: 'es-ES'
    }
});

export default api;
