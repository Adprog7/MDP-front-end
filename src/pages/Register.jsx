import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, Info } from 'lucide-react';
import boutonRetourSvg from '../assets/bouton-retour.svg';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Redirection vers la page profil/compte après l'inscription
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-10">
      
      {/* ─── HALOS DE FOND ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
      </div>

      {/* ─── HEADER (Bouton Retour) ─── */}
      <div className="relative z-10 px-5 pt-5 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1 shadow-sm"
        >
          <img
            src={boutonRetourSvg}
            alt="Retour"
            className="w-10 h-10 object-contain"
          />
        </button>
      </div>

      {/* ─── EN-TÊTE ─── */}
      <div className="relative z-10 flex flex-col items-center px-6 mt-2">
        {/* Avatar */}
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

      {/* ─── FORMULAIRE ─── */}
      <form onSubmit={handleRegister} className="relative z-10 px-6 space-y-4">
        
        {/* Prénom */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Prénom</label>
          <input 
            type="text" 
            placeholder="Votre prénom" 
            className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" 
            required 
          />
        </div>

        {/* Nom */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Nom</label>
          <input 
            type="text" 
            placeholder="Votre nom" 
            className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" 
            required 
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-900">Email</label>
          <input 
            type="email" 
            placeholder="exemple@votre-email.com" 
            className="w-full px-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400" 
            required 
          />
        </div>

        {/* Mot de passe */}
        <div className="space-y-1.5 pt-2">
          <label className="text-[13px] font-bold text-gray-900">Mot de passe</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="••••••••••••" 
              className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400 tracking-widest" 
              required 
            />
            <Eye className="absolute right-4 text-[#8b44f7]" size={18} />
          </div>
          
          {/* Jauge de sécurité du mot de passe */}
          <div className="flex items-center justify-between pt-1 px-1">
            <span className="text-[11px] text-gray-500 font-medium">8 caractères minimum</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8b44f7] font-medium">Bon</span>
              <div className="flex gap-1">
                <div className="w-6 h-1 bg-[#8b44f7] rounded-full"></div>
                <div className="w-6 h-1 bg-[#8b44f7] rounded-full"></div>
                <div className="w-6 h-1 bg-[#8b44f7] rounded-full"></div>
                <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Encadré Conditions d'utilisation */}
        <div className="bg-[#E8DBFA] rounded-2xl p-4 flex gap-3 items-start mt-6 shadow-sm">
          <Info className="text-[#8b44f7] shrink-0 mt-0.5" size={20} />
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            En créant votre compte, vous acceptez nos{' '}
            <Link to="#" className="text-[#8b44f7] underline">Conditions d'utilisation</Link>{' '}
            et{' '}
            <Link to="#" className="text-[#8b44f7] underline">Politique de confidentialité</Link>.
          </p>
        </div>

        {/* Bouton de validation */}
        <button 
          type="submit" 
          className="w-full py-4 bg-[#8b44f7] text-white font-bold text-[13px] rounded-2xl active:scale-[0.98] transition-transform uppercase tracking-wide mt-6 shadow-lg shadow-purple-200/50"
        >
          CRÉER MON COMPTE CLIENT
        </button>

        {/* Lien de connexion */}
        <p className="text-center text-[13px] text-gray-600 mt-6 font-medium">
          Vous avez déjà un compte ? <Link to="/login" className="text-[#8b44f7] underline">Se connecter</Link>
        </p>

      </form>
    </div>
  );
};

export default Register;