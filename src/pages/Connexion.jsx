import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import boutonRetourSvg from '../assets/bouton-retour.svg';
import api from '../services/api'; // Import de ton instance API

const Connexion = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // 1. État pour stocker les données du formulaire
  const [formData, setFormData] = useState({ email: '', password: '' });

  // 2. Logique de connexion
  // Dans Connexion.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/login', formData);
    localStorage.setItem('token', res.data.token);
    // AJOUTE CECI :
    window.location.href = '/account'; // Force le rechargement pour mettre à jour l'état de l'App
  } catch (err) {
    alert("Email ou mot de passe incorrect");
  }
};

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden px-6 pt-5">
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />

      <button 
        onClick={() => navigate(-1)} 
        className="active:scale-95 transition-transform"
      >
        <img src={boutonRetourSvg} alt="Retour" className="w-10 h-10 object-contain" />
      </button>

      <div className="mt-10 mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
          Connexion
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2">
          Heureux de vous revoir sur SparkUp !
        </p>
      </div>

      {/* 3. Ajout de onSubmit et des onChange */}
      <form className="space-y-4" onSubmit={handleLogin}>
        
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            type="email" 
            placeholder="Email"
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#8b44f7]/20 outline-none text-sm font-bold"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#8b44f7]/20 outline-none text-sm font-bold"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full h-14 bg-[#8b44f7] text-white font-black text-xs rounded-2xl mt-6 active:scale-[0.98] transition-transform uppercase tracking-widest shadow-lg shadow-purple-200"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connexion;