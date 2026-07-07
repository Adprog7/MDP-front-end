import axios from 'axios';

// Utilise la variable d'environnement de Vite, ou se rabat sur localhost si elle n'est pas définie
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    withCredentials: true, // Crucial pour que Laravel/Sanctum accepte les cookies/sessions
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Token envoyé dans la requête :", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;