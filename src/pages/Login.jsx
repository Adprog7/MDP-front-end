import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  
  // État pour contrôler l'affichage de la modale d'inscription
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden flex flex-col items-center justify-center">

      {/* ─── HALOS DE FOND ─── */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-0">
        <div className="absolute top-10 -left-10 w-72 h-72 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
      </div>

      {/* ─── HEADER (Bouton Paramètres) ─── */}
      <div className="absolute top-8 right-5 z-10">
        <button 
          onClick={() => navigate('/account')} 
          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] active:scale-95 transition-transform"
        >
          <Settings size={20} className="text-gray-900" strokeWidth={2.5} />
        </button>
      </div>

      {/* ─── CONTENU CENTRAL ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm -mt-10">
        <h2 className="text-[20px] font-bold text-gray-900 mb-3 tracking-tight">
          On se connait ?
        </h2>
        
        <p className="text-[15px] text-gray-600 leading-snug mb-8 font-medium px-2">
          Connecte toi ou créer un compte pour avoir des recommandations customisées et acheter des tickets pour les meilleurs évènements.
        </p>

        {/* Bouton qui ouvre la modale */}
        <button 
          onClick={() => setShowAuthModal(true)}
          className="bg-[#E8DBFA] text-[#8b44f7] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide active:scale-95 transition-transform"
        >
          S'inscrire
        </button>
      </div>

      {/* ─── MODALE BOTTOM SHEET (AVEC PORTAL POUR COUVRIR LA NAVBAR) ─── */}
      {showAuthModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end">
          {/* Overlay sombre cliquable pour fermer */}
          <div 
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
            onClick={() => setShowAuthModal(false)}
          />
          
          <div className="relative bg-[#FDFBF7] w-full max-w-md mx-auto rounded-t-3xl px-5 pt-4 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom-full duration-300">
            {/* Barre de drag */}
            <div className="w-12 h-1 bg-gray-900 rounded-full mx-auto mb-6" />

            <h3 className="text-center text-[13px] font-black text-gray-900 mb-6 tracking-tight">
              Connecte toi ou créer un compte pour continuer
            </h3>

            {/* Bouton Email */}
            <button 
              onClick={() => navigate('/register')}
              className="w-full h-14 bg-[#8b44f7] text-white font-bold text-xs rounded-2xl mb-3 active:scale-[0.98] transition-transform uppercase tracking-wide"
            >
              Continuer avec votre email
            </button>

            {/* Boutons Sociaux (Apple & Google) */}
            <div className="flex gap-3 mb-6">
              {/* Apple */}
              <button className="flex-1 h-14 bg-[#E8DBFA] rounded-2xl flex items-center justify-center active:scale-[0.98] transition-transform">
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 text-[#8b44f7]">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </button>
              
              {/* Google */}
              <button className="flex-1 h-14 bg-[#E8DBFA] rounded-2xl flex items-center justify-center active:scale-[0.98] transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
            </div>

            {/* Ligne séparatrice */}
            <div className="w-full h-px bg-gray-100 mb-6"></div>

            {/* Bouton Organisateur */}
            <button 
              onClick={() => navigate('/organizer/login')}
              className="w-full h-14 bg-[#FDE073] text-gray-900 font-bold text-xs rounded-2xl active:scale-[0.98] transition-transform uppercase tracking-wide shadow-sm"
            >
              Faire un compte organisateur
            </button>

          </div>
        </div>,
        document.body // Le secret est ici : on l'injecte dans le body !
      )}

    </div>
  );
};

export default Login;