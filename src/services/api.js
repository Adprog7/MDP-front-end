import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true, // Crucial pour que Laravel/Sanctum accepte les cookies/sessions
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Token envoyé dans la requête :", token); // AJOUTE CECI
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;