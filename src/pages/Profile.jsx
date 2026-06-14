import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Heart, 
  User, 
  MapPin, 
  Music, 
  ChevronRight
} from 'lucide-react';

// Imports des assets
import sparkUpHeaderSvg from '../assets/spark-up-header.svg';
import starSvg from '../assets/star.svg';
import clocheActifSvg from '../assets/bouton-cloche-actif.svg';
import clochePassifSvg from '../assets/bouton-cloche-passif.svg';
import parametresSvg from '../assets/bouton-parametres.svg';
import boutonModifierProfilSvg from '../assets/bouton-modifier-profil.svg';

const Profile = () => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(true);

  const tickets = [
    { id: 1, title: "SUMMER VIBES", location: "Lyon, France", price: "25,00 €", date: "24", month: "MAI", image: "https://images.unsplash.com/photo-1540039155732-6847368222a0?q=80&w=300&auto=format&fit=crop" },
    { id: 2, title: "TECHNO ROOM", location: "Marseille, France", price: "18,00 €", date: "2", month: "MAI", image: "https://images.unsplash.com/photo-1514525253361-b83f85f051c0?q=80&w=300&auto=format&fit=crop" },
    { id: 3, title: "GREEN FESTIVAL", location: "Bordeaux, France", price: "35,00 €", date: "2", month: "MAI", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=300&auto=format&fit=crop" }
  ];

  const groups = [
    { id: 1, name: "Soirée Lyon", members: 8, image: "https://images.unsplash.com/photo-1540039155732-6847368222a0?q=80&w=100&auto=format&fit=crop" },
    { id: 2, name: "After School", members: 4, image: "https://images.unsplash.com/photo-1514525253361-b83f85f051c0?q=80&w=100&auto=format&fit=crop" },
    { id: 3, name: "Summer vibes", members: 6, image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=100&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased pb-28 relative overflow-x-hidden">

      {/* ─── HALO VIOLET GLOBAL ─── */}
      <div className="absolute top-10 -left-20 w-[120%] h-[600px] bg-[#DBCDF8]/50 rounded-[100%] blur-[90px] pointer-events-none z-0" />

      {/* ─── HEADER SPÉCIFIQUE ─── */}
      <div className="relative z-10 flex justify-between items-center px-5 pt-6 pb-6">
        <div className="flex items-center gap-2">
          <img src={sparkUpHeaderSvg} alt="SparkUp" className="h-5 object-contain" />
          <img src={starSvg} alt="Star" className="h-6 object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/notifications')} 
            className="active:scale-95 transition-transform"
          >
            <img 
              src={hasNotification ? clocheActifSvg : clochePassifSvg} 
              alt="Notifications" 
              className="w-11 h-11 object-contain" 
            />
          </button>
          <button 
            onClick={() => navigate('/settings')} 
            className="active:scale-95 transition-transform"
          >
            <img 
              src={parametresSvg} 
              alt="Paramètres" 
              className="w-11 h-11 object-contain" 
            />
          </button>
        </div>
      </div>

      {/* ─── PROFIL UTILISATEUR ─── */}
      <div className="relative z-10 px-5 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
            alt="Emma Solar" 
            className="w-[72px] h-[72px] rounded-full object-cover shadow-sm relative z-10"
          />
          <div className="relative z-10">
            <h2 className="text-[22px] font-black text-gray-900 leading-tight">Emma Solar</h2>
            <p className="text-[13px] text-gray-500 font-medium leading-tight">@emma.sr</p>
            <span className="bg-[#E8DBFA] text-[#8b44f7] text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1.5 inline-block tracking-wide">
              Participant
            </span>
          </div>
        </div>
        
        <button className="active:scale-95 transition-transform relative z-10">
          <img 
            src={boutonModifierProfilSvg} 
            alt="Modifier le profil" 
            className="w-11 h-11 object-contain shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-full" 
          />
        </button>
      </div>

      {/* ─── STATISTIQUES ─── */}
      <div className="relative z-10 px-5 mb-10">
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <Calendar className="text-[#8b44f7] mb-1.5" size={22} />
            <span className="font-black text-[17px] text-gray-900 leading-none mb-1">12</span>
            <span className="text-[10px] text-gray-900 font-medium">Évènements</span>
          </div>
          <div className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <Users className="text-[#8b44f7] mb-1.5" size={22} />
            <span className="font-black text-[17px] text-gray-900 leading-none mb-1">4</span>
            <span className="text-[10px] text-gray-900 font-medium">Groupes</span>
          </div>
          <div className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <Heart className="text-[#8b44f7] mb-1.5" size={22} />
            <span className="font-black text-[17px] text-gray-900 leading-none mb-1">28</span>
            <span className="text-[10px] text-gray-900 font-medium">Favoris</span>
          </div>
          <div className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <User className="text-[#8b44f7] mb-1.5" size={22} />
            <span className="font-black text-[17px] text-gray-900 leading-none mb-1">36</span>
            <span className="text-[10px] text-gray-900 font-medium">Amis</span>
          </div>
        </div>
      </div>

      {/* ─── MES BILLETS ─── */}
      <div className="relative z-10 mb-10">
        <h3 className="px-5 text-[15px] font-bold text-gray-900 mb-4">Mes billets</h3>
        <div className="flex overflow-x-auto gap-4 px-5 snap-x pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tickets.map(ticket => (
            <div key={ticket.id} className="min-w-[150px] bg-white rounded-3xl pb-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 snap-start overflow-hidden">
              <div className="relative h-36 mb-3">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Heart size={16} color="white" />
                </div>
                <div className="absolute bottom-2 left-2 bg-[#FDE073] px-2.5 py-1.5 rounded-xl text-center leading-none shadow-sm">
                  <span className="block text-[13px] font-black text-gray-900">{ticket.date}</span>
                  <span className="block text-[8px] font-black text-gray-900 mt-0.5">{ticket.month}</span>
                </div>
              </div>
              <div className="px-3">
                <h4 className="text-xs font-black uppercase text-gray-900 truncate mb-1">{ticket.title}</h4>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-2 font-medium">
                  <MapPin size={10} /> {ticket.location}
                </div>
                <div className="text-xs font-black text-[#8b44f7]">{ticket.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ACTIVITÉ RÉCENTE ─── */}
      <div className="relative z-10 px-5 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-bold text-gray-900">Activité récente</h3>
          <Link to="#" className="text-[11px] text-[#8b44f7] font-medium flex items-center gap-0.5">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] bg-[#FDFBF7] border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-[#8b44f7]" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-900 leading-tight mb-0.5">Réservation effectuée</p>
                <p className="text-[11px] text-gray-400 font-medium">After School - 1 billet</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">il y 2 jours</span>
          </div>

          <div className="w-full h-px bg-gray-50"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] bg-[#FDFBF7] border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#8b44f7]" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-900 leading-tight mb-0.5">A rejoint le groupe</p>
                <p className="text-[11px] text-gray-400 font-medium">Soirée Lyon - 6 membres</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">il y 5 jours</span>
          </div>

          <div className="w-full h-px bg-gray-50"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] bg-[#FDFBF7] border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                <Music size={20} className="text-[#8b44f7]" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-900 leading-tight mb-0.5">Paiement validé</p>
                <p className="text-[11px] text-gray-400 font-medium">After School - Apple Pay</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">il y 6 jours</span>
          </div>
        </div>
      </div>

      {/* ─── MES GROUPES ─── */}
      <div className="relative z-10 mb-4">
        <div className="flex justify-between items-center px-5 mb-4">
          <h3 className="text-[15px] font-bold text-gray-900">Mes groupes</h3>
          <Link to="#" className="text-[11px] text-[#8b44f7] font-medium flex items-center gap-0.5">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-3 px-5 snap-x pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {groups.map(group => (
            <div key={group.id} className="min-w-[150px] bg-[#F3F0FA] rounded-2xl p-2.5 flex items-center gap-3 snap-start">
              <img src={group.image} alt={group.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-[11px] font-black text-gray-900 leading-tight mb-0.5 truncate">{group.name}</p>
                <p className="text-[9px] text-gray-500 font-medium">{group.members} membres</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;