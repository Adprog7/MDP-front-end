// src/pages/JoinGroupHandler.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const JoinGroupHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('redirect_after_login', `/join/${code}`);
      navigate('/login');
      return;
    }

    api.post('/groupes/join', { code })
       .then(res => navigate(`/chat/${res.id_groupe}`))
       .catch(() => alert("Lien invalide."));
  }, [code, navigate]);

  return <div className="p-10">Connexion au groupe...</div>;
};
export default JoinGroupHandler;