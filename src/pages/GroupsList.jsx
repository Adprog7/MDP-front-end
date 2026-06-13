import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, SquarePen } from 'lucide-react';

// Import de ton bouton retour personnalisé
import boutonRetourSvg from '../assets/bouton-retour.svg';

const GroupsList = () => {
  const navigate = useNavigate();

  // Nouvelles données calquées sur ta maquette (avec nom et PP modifiés)
  const myMessages = [
    { 
      id: 1, 
      name: "Thomas.mrt", 
      lastMsg: "Envoyé il y a 1h", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      name: "Killian", 
      lastMsg: "Envoyé il y a 2h", 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" 
    },
    { 
      id: 3, 
      name: "Groupe soirée After School", 
      lastMsg: "Killian: Vous pouvez me prendre ma place ? · 1h", 
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-28">
      
      {/* ─── HALOS DE FOND ─── */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#FFF9C4]/60 rounded-full blur-[80px]" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#DBCDF8]/50 rounded-full blur-[80px]" />
      </div>

      {/* ─── HEADER (Bouton Retour & Nouveau Message) ─── */}
      <div className="relative z-10 flex justify-between items-center px-5 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
        >
          <img
            src={boutonRetourSvg}
            alt="Retour"
            className="w-11 h-11 object-contain"
          />
        </button>

        <button className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <SquarePen size={22} className="text-gray-900" strokeWidth={2.5} />
        </button>
      </div>

      {/* ─── BARRE DE RECHERCHE ─── */}
      <div className="relative z-10 px-5 mt-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Rechercher des amis ou un groupe" 
            className="w-full pl-11 pr-4 py-3.5 bg-white border-none rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.03)] outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-[13px] font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ─── TITRE ─── */}
      <div className="relative z-10 px-5 mb-6">
        <h1 className="text-[26px] font-black text-gray-900 tracking-tight leading-none">
          Messages
        </h1>
      </div>

      {/* ─── LISTE DES MESSAGES ─── */}
      <div className="relative z-10 px-5 flex flex-col gap-6">
        {myMessages.map((msg) => (
          <Link 
            key={msg.id} 
            to={`/chat/${msg.id}`}
            className="flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            {/* Avatar */}
            <img 
              src={msg.image} 
              alt={msg.name} 
              className="w-[60px] h-[60px] rounded-full object-cover shadow-sm shrink-0" 
            />
            
            {/* Textes */}
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="text-[15px] font-black text-gray-900 truncate leading-tight mb-0.5">
                {msg.name}
              </h3>
              <p className="text-[13px] text-gray-500 font-medium truncate">
                {msg.lastMsg}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default GroupsList;