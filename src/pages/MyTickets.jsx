import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('À venir');
  const tabs = ['À venir', 'En attente', 'Passés'];

  // --- ÉTATS VIDES PRÊTS POUR L'API ---
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- APPEL API ---
  useEffect(() => {
    // Remplacer par ton vrai endpoint (ex: /user/tickets)
    fetch(`${import.meta.env.VITE_API_URL}/mes-billets`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la récupération des billets');
        return res.json();
      })
      .then((data) => {
        setMyTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger vos billets.");
        setLoading(false);
      });
  }, []);

  // --- FILTRAGE OPTIONNEL (Si ton API renvoie tout d'un coup) ---
  // Tu pourras adapter cette logique selon la propriété "status" renvoyée par ton backend
  /*
  const filteredTickets = myTickets?.filter(ticket => {
    if (activeTab === 'À venir') return ticket.status === 'upcoming';
    if (activeTab === 'En attente') return ticket.status === 'pending';
    if (activeTab === 'Passés') return ticket.status === 'past';
    return true;
  });
  */
  // Pour l'instant on affiche tout, à remplacer par `filteredTickets` quand ton API sera branchée
  const ticketsToDisplay = myTickets; 

  return (
    <div className="pt-10 px-5 pb-24 relative z-10">
      
      {/* ─── TITRE ─── */}
      <h1 className="text-[40px] leading-none font-black uppercase tracking-tight text-gray-900 mb-8">
        Mes Billets
      </h1>

      {/* ─── TABS / FILTRES ─── */}
      <div className="flex items-center bg-white rounded-full p-1.5 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-[#E8DBFA] text-[#8b44f7]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── LISTE DES BILLETS ─── */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase text-sm">Chargement de vos billets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 font-bold uppercase text-sm">{error}</p>
          </div>
        ) : ticketsToDisplay && ticketsToDisplay.length > 0 ? (
          ticketsToDisplay.map(ticket => (
            <Link key={ticket.id} to={`/ticket-detail/${ticket.id}`} className="block">
              <div className="bg-white rounded-[20px] p-2 pr-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform">
                
                {/* Miniature de l'événement */}
                <img 
                  src={ticket.image} 
                  alt={ticket.title} 
                  className="w-[88px] h-[88px] rounded-2xl object-cover shrink-0" 
                />
                
                {/* Informations du billet */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-[15px] font-black uppercase tracking-tight text-gray-900 leading-[1.1] mb-1.5 line-clamp-2">
                    {ticket.title}
                  </h3>
                  <span className="text-xs font-bold text-[#8b44f7]">
                    {ticket.date}
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