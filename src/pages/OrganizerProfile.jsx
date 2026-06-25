import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, TrendingUp, Ticket, Tag, MessageSquare, Users, CreditCard, Settings, CalendarPlus } from 'lucide-react';
import api from '../services/api'; // Assure-toi que le chemin est correct

import sparkUpHeaderSvg from '../assets/spark-up-header.svg';
import starSvg from '../assets/star.svg';
import clocheActifSvg from '../assets/bouton-cloche-actif.svg';
import clochePassifSvg from '../assets/bouton-cloche-passif.svg';
import parametresSvg from '../assets/bouton-parametres.svg';
import boutonModifierProfilSvg from '../assets/bouton-modifier-profil.svg';

const OrganizerProfile = () => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(true);
  
  // États pour les données dynamiques
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
    try {
      const [profileRes, eventsRes, statsRes] = await Promise.all([
        api.get('/organizer/profile'),
        api.get('/organizer/events'),
        api.get('/organizer/stats')
      ]);

      // AJOUTE CES LIGNES POUR VOIR LES DONNÉES
      console.log("Profil reçu:", profileRes.data);
      console.log("Événements reçus:", eventsRes.data);
      console.log("Stats reçues:", statsRes.data);
      // Ajoute ceci juste au début de ton composant OrganizerProfile
      console.log("Tentative d'appel API avec le token :", localStorage.getItem('token'));

      setProfile(profileRes.data);
      setEvents(eventsRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (err) {
        console.error("Erreur chargement profil:", err);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const outils = [
    { label: "Créer un\névènement", icon: <CalendarPlus size={22} className="text-[#f5c000]" />, path: '/organizer/create' },
    { label: "Statistiques\ndétaillées", icon: <TrendingUp size={22} className="text-[#f5c000]" />, path: '/organizer/stats' },
    { label: "Gestion des\nbillets", icon: <Ticket size={22} className="text-[#f5c000]" />, path: '/organizer/tickets' },
    { label: "Codes\npromo", icon: <Tag size={22} className="text-[#f5c000]" />, path: '/organizer/promo' },
    { label: "Messages\norganisateur", icon: <MessageSquare size={22} className="text-[#f5c000]" />, path: '/organizer/messages' },
    { label: "Participants\net listes", icon: <Users size={22} className="text-[#f5c000]" />, path: '/organizer/participants' },
    { label: "Paiements\net revenus", icon: <CreditCard size={22} className="text-[#f5c000]" />, path: '/organizer/revenue' },
    { label: "Paramètres\névènements", icon: <Settings size={22} className="text-[#f5c000]" />, path: '/organizer/settings' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased pb-32 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-5 pt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img src={sparkUpHeaderSvg} alt="SparkUp" className="h-5 object-contain" />
            <img src={starSvg} alt="Star" className="h-6 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="active:scale-95 transition-transform">
              <img src={hasNotification ? clocheActifSvg : clochePassifSvg} alt="Notifications" className="w-11 h-11 object-contain" />
            </button>
            <button onClick={() => navigate('/settings')} className="active:scale-95 transition-transform">
              <img src={parametresSvg} alt="Paramètres" className="w-11 h-11 object-contain" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={profile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"} alt="Profil" className="w-[72px] h-[72px] rounded-full object-cover shadow-sm" />
            <div>
              <h2 className="text-[22px] font-black text-gray-900 leading-tight">{profile?.nom_complet || "Chargement..."}</h2>
              <p className="text-[13px] text-gray-500 font-medium">@{profile?.username || "organisateur"}</p>
              <span className="inline-block mt-1 bg-[#FFF9C4] text-yellow-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Organisateur</span>
            </div>
          </div>
          <button className="active:scale-95 transition-transform"><img src={boutonModifierProfilSvg} alt="Modifier" className="w-11 h-11 object-contain" /></button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
              <span className="text-[#f5c000] text-lg mb-1">{s.icon}</span>
              <span className="font-black text-[15px] text-gray-900 leading-none mb-1">{s.value}</span>
              <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Mes évènements</h2>
        <div className="space-y-3 mb-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
              {/* 1. Change 'event.image' par 'event.image' (ou 'event.photo' si ton API renvoie photo) */}
              <img 
                src={event.image ? `http://localhost:8000/storage/${event.image}` : "https://ui-avatars.com/api/?name=" + event.title} 
                alt={event.title} 
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0" 
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1 mb-1">
                  {/* 2. Assure-toi que 'title' correspond à ce que ton Controller envoie */}
                  <h3 className="text-xs font-black text-gray-900 truncate">{event.title}</h3>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${event.statusColor}`}>{event.status}</span>
                </div>
                
                {/* 3. Affiche la date et le lieu */}
                <p className="text-[10px] text-gray-400 font-medium mb-2">{event.date} · {event.lieu}</p>
                
                <div className="grid grid-cols-3 gap-1">
                  <div><p className="text-xs font-black text-gray-900">{event.vendus}</p><p className="text-[9px] text-gray-400 font-medium">Vendus</p></div>
                  <div><p className="text-xs font-black text-gray-900">{event.taux}</p><p className="text-[9px] text-gray-400 font-medium">Taux</p></div>
                  <div><p className="text-xs font-black text-gray-900">{event.revenus}</p><p className="text-[9px] text-gray-400 font-medium">Revenus</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Outils organisateur</h2>
        <div className="grid grid-cols-4 gap-2">
          {outils.map((outil, i) => (
            <button key={i} onClick={() => navigate(outil.path)} className="rounded-2xl p-3 flex flex-col items-center gap-2 transition-all active:scale-95">
              <div className="w-12 h-12 bg-[#FFF9C4] rounded-2xl flex items-center justify-center">{outil.icon}</div>
              <span className="text-[9px] font-bold text-gray-600 text-center leading-tight whitespace-pre-line">{outil.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;