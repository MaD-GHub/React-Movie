// src/api.js
import axios from 'axios';

const API_KEY = '182071d1195c0a892ce90dfc2b1fc280';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'es-ES'  // Idioma en español
    }
});

export default api;