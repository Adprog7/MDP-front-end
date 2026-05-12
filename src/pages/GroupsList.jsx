import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, Users, ChevronRight, Search } from 'lucide-react';

const GroupsList = () => {
  // Mock data pour tes groupes
  const myGroups = [
    { id: 1, name: "La commu OL", event: "OL - PSG", lastMsg: "On se rejoint devant la porte A ?", time: "14:30", unread: 3, image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Team Techno", event: "Nuits Sonores", lastMsg: "Quelqu'un a pris les pass ?", time: "Hier", unread: 0, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop" },
    { id: 3, name: "Les Lyonnais", event: "Fête des Lumières", lastMsg: "Rdv Place Bellecour !", time: "Mar.", unread: 0, image: "https://images.unsplash.com/photo-1514525253361-b83f85f051c0?q=80&w=200&auto=format&fit=crop" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 mb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter">Mes Groupes</h1>
          <p className="text-gray-500 font-medium">Tes discussions d'évènements</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-2xl text-[#1e2da7]">
          <MessageSquare size={28} />
        </div>
      </div>

      {/* Barre de recherche locale */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher un groupe..." 
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#1e2da7] outline-none transition-all"
        />
      </div>

      {/* Liste des conversations */}
      <div className="space-y-4">
        {myGroups.map((group) => (
          <Link 
            key={group.id} 
            to={`/chat/${group.id}`}
            className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md hover:translate-x-1 transition-all group"
          >
            {/* Avatar du groupe */}
            <div className="relative">
              <img src={group.image} alt="" className="w-16 h-16 rounded-2xl object-cover" />
              {group.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f06292] text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                  {group.unread}
                </span>
              )}
            </div>

            {/* Détails du message */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-black text-[#1e2da7] truncate uppercase text-sm tracking-tight">{group.name}</h3>
                <span className="text-[10px] text-gray-400 font-bold">{group.time}</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-widest">{group.event}</p>
              <p className="text-sm text-gray-600 truncate">{group.lastMsg}</p>
            </div>

            <ChevronRight size={20} className="text-gray-200 group-hover:text-[#1e2da7] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;