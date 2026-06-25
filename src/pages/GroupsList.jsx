import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, SquarePen } from 'lucide-react';
import api from '../services/api'; // Ton instance Axios
import boutonRetourSvg from '../assets/bouton-retour.svg';

const GroupsList = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des groupes depuis ton API Laravel
        const response = await api.get('/groupes');
        setMessages(response.data);
      } catch (error) {
        console.error("Erreur chargement groupes :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-28">
      {/* ... [HALOS DE FOND IDENTIQUES] ... */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#FFF9C4]/60 rounded-full blur-[80px]" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#DBCDF8]/50 rounded-full blur-[80px]" />
      </div>

      {/* ... [HEADER IDENTIQUE] ... */}
      <div className="relative z-10 flex justify-between items-center px-5 pt-6 pb-2">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <img src={boutonRetourSvg} alt="Retour" className="w-11 h-11 object-contain" />
        </button>
        <button className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <SquarePen size={22} className="text-gray-900" strokeWidth={2.5} />
        </button>
      </div>

      {/* ... [RECHERCHE ET TITRE IDENTIQUES] ... */}
      <div className="relative z-10 px-5 mt-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
          <input type="text" placeholder="Rechercher des amis ou un groupe" className="w-full pl-11 pr-4 py-3.5 bg-white border-none rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.03)] outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-[13px] font-medium placeholder:text-gray-400" />
        </div>
      </div>
      <div className="relative z-10 px-5 mb-6">
        <h1 className="text-[26px] font-black text-gray-900 tracking-tight leading-none">Messages</h1>
      </div>

      {/* ─── LISTE RÉELLE ─── */}
      <div className="relative z-10 px-5 flex flex-col gap-6">
        {isLoading ? (
          <p className="text-center text-gray-400 text-sm font-bold">Chargement...</p>
        ) : (
          messages.map((group) => (
            <Link 
              key={group.id_groupe} 
              to={`/chat/${group.id_groupe}`}
              className="flex items-center gap-4 active:scale-[0.98] transition-transform"
            >
              {/* Avatar généré dynamiquement */}
              <div className="w-[60px] h-[60px] rounded-full bg-[#E8DBFA] flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                <span className="font-black text-[#8b44f7] text-xl">
                    {group.nom.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="text-[15px] font-black text-gray-900 truncate leading-tight mb-0.5">
                  {group.nom}
                </h3>
                <p className="text-[13px] text-gray-500 font-medium truncate">
                  Voir la conversation
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupsList;