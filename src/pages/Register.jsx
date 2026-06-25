import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, Info } from 'lucide-react';
import api from '../services/api'; // Import de ton instance axios
import boutonRetourSvg from '../assets/bouton-retour.svg';

const Register = () => {
  const navigate = useNavigate();
  
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: ''
  });

  // Gestion de la saisie
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', formData);
      navigate('/account');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Affiche les erreurs détaillées de Laravel dans la console
        console.table(error.response.data.errors);
        alert("Erreur : regarde la console pour voir les champs invalides.");
      } else {
        console.error("Erreur complète :", error);
        alert("Une erreur est survenue.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-10">
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-5 pt-5 pb-2">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1 shadow-sm">
          <img src={boutonRetourSvg} alt="Retour" className="w-10 h-10 object-contain" />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 mt-2">
        <div className="w-20 h-20 bg-[#E8DBFA] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <User size={36} className="text-[#8b44f7]" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center leading-tight">
          Créer votre compte<br />
          <span className="text-[#8b44f7]">Client</span>
        </h1>
        <p className="text-[14px] text-gray-500 text-center mt-4 mb-8 leading-snug font-medium px-2">
          Rejoignez SparkUp en tant que client et accédez facilement aux événements qui vous correspondent.
        </p>
      </div>

      <form onSubmit={handleRegister} className="relative z-10 px-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Prénom</label>
          <input name="prenom" type="text" placeholder="Votre prénom" onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" required />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Nom</label>
          <input name="nom" type="text" placeholder="Votre nom" onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" required />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Email</label>
          <input name="email" type="email" placeholder="exemple@votre-email.com" onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" required />
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-[13px] font-bold text-gray-900">Mot de passe</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-400" size={18} />
            <input name="password" type="password" placeholder="••••••••••••" onChange={handleChange} className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400 tracking-widest" required />
            <Eye className="absolute right-4 text-[#8b44f7]" size={18} />
          </div>
        </div>

        <div className="bg-[#E8DBFA] rounded-2xl p-4 flex gap-3 items-start mt-6 shadow-sm">
          <Info className="text-[#8b44f7] shrink-0 mt-0.5" size={20} />
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            En créant votre compte, vous acceptez nos <Link to="#" className="text-[#8b44f7] underline">Conditions d'utilisation</Link> et <Link to="#" className="text-[#8b44f7] underline">Politique de confidentialité</Link>.
          </p>
        </div>

        <button type="submit" className="w-full py-4 bg-[#8b44f7] text-white font-bold text-[13px] rounded-2xl active:scale-[0.98] transition-transform uppercase tracking-wide mt-6 shadow-lg shadow-purple-200/50">
          CRÉER MON COMPTE CLIENT
        </button>

        <p className="text-center text-[13px] text-gray-600 mt-6 font-medium">
          Vous avez déjà un compte ? <Link to="/connexion" className="text-[#8b44f7] underline">Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;