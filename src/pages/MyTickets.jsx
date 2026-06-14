import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allEvents } from '../data/events';

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('À venir');
  const tabs = ['À venir', 'En attente', 'Passés'];

  // Simulation des billets achetés
  const purchasedIds = [1, 3, 5];
  const myTickets = allEvents.filter(event => purchasedIds.includes(event.id));

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
        {myTickets.length > 0 ? (
          myTickets.map(ticket => (
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