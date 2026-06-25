import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('À venir');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['À venir', 'En attente', 'Passés'];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/my-tickets'); 
        console.log("🎟️ Billets reçus :", response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Erreur chargement billets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Filtrage basé sur les données remontées par la jointure SQL
  const filteredTickets = tickets.filter(t => {
    if (activeTab === 'À venir') return t.statut === 'valide';
    if (activeTab === 'En attente') return t.statut === 'en_attente';
    if (activeTab === 'Passés') return t.statut === 'passe';
    return false;
  });

  return (
    <div className="pt-10 px-5 pb-24 relative z-10">
      <h1 className="text-[40px] leading-none font-black uppercase tracking-tight text-gray-900 mb-8">
        Mes Billets
      </h1>

      <div className="flex items-center bg-white rounded-full p-1.5 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab ? 'bg-[#E8DBFA] text-[#8b44f7]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-center text-gray-400">Chargement...</p>
        ) : filteredTickets.length > 0 ? (
          // CORRECTION : Utiliser filteredTickets ici au lieu de tickets
          filteredTickets.map(ticket => (
            <Link key={ticket.id_billet} to={`/ticket-detail/${ticket.id_billet}`} className="block">
              <div className="bg-white rounded-[20px] p-2 pr-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform">
                {/* Données accédées directement car jointure SQL */}
                <img 
                  src={ticket.photo || '/default-event.jpg'} 
                  alt={ticket.titre || 'Billet'} 
                  className="w-[88px] h-[88px] rounded-2xl object-cover shrink-0" 
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[15px] font-black uppercase tracking-tight text-gray-900 leading-[1.1] mb-1.5">
                    {ticket.titre || 'Événement inconnu'}
                  </h3>
                  <span className="text-xs font-bold text-[#8b44f7]">
                    {ticket.date_debut || 'Date à venir'}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase text-sm">
              Aucun billet {activeTab.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;