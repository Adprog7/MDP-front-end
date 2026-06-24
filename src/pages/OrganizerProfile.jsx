import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, TrendingUp, Ticket, Tag, MessageSquare, Users, CreditCard, Settings, CalendarPlus } from 'lucide-react';

import sparkUpHeaderSvg from '../assets/spark-up-header.svg';
import starSvg from '../assets/star.svg';
import clocheActifSvg from '../assets/bouton-cloche-actif.svg';
import clochePassifSvg from '../assets/bouton-cloche-passif.svg';
import parametresSvg from '../assets/bouton-parametres.svg';
import boutonModifierProfilSvg from '../assets/bouton-modifier-profil.svg';

const eventsData = [
  {
    id: 1,
    title: "SUMMER VIBES",
    date: "24 mai 2025",
    lieu: "La Sucrière, Lyon",
    status: "En ligne",
    statusColor: "bg-green-100 text-green-600",
    vendus: 523,
    taux: "28 %",
    revenus: "12 450 €",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500"
  },
  {
    id: 2,
    title: "AFTER SCHOOL",
    date: "7 juin 2025",
    lieu: "Le Sucre, Lyon",
    status: "Brouillon",
    statusColor: "bg-orange-100 text-orange-500",
    vendus: 0,
    taux: "0 %",
    revenus: "0 €",
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=500"
  },
  {
    id: 3,
    title: "TECHNO ROOM",
    date: "15 juin 2025",
    lieu: "Le Transbordeur",
    status: "Planifié",
    statusColor: "bg-blue-100 text-blue-500",
    vendus: 0,
    taux: "0 %",
    revenus: "0 €",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500"
  }
];

const stats = [
  { label: "Évènements", value: "8", icon: "✦" },
  { label: "Billets vendus", value: "1 248", icon: "◇" },
  { label: "Revenus", value: "12 450 €", icon: "€" },
  { label: "Note moyenne", value: "4.8/5", icon: "☆" },
];

const outils = [
  { label: "Créer un\névènement", icon: <CalendarPlus size={22} className="text-[#f5c000]" /> },
  { label: "Statistiques\ndétaillées", icon: <TrendingUp size={22} className="text-[#f5c000]" /> },
  { label: "Gestion des\nbillets", icon: <Ticket size={22} className="text-[#f5c000]" /> },
  { label: "Codes\npromo", icon: <Tag size={22} className="text-[#f5c000]" /> },
  { label: "Messages\norganisateur", icon: <MessageSquare size={22} className="text-[#f5c000]" /> },
  { label: "Participants\net listes", icon: <Users size={22} className="text-[#f5c000]" /> },
  { label: "Paiements\net revenus", icon: <CreditCard size={22} className="text-[#f5c000]" /> },
  { label: "Paramètres\névènements", icon: <Settings size={22} className="text-[#f5c000]" /> },
];

const OrganizerProfile = () => {
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased pb-32 relative overflow-x-hidden">

      {/* Halo violet — identique à Profile.tsx */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-5 pt-6">

        {/* Header */}
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

        {/* Profil — sans card blanche, directement dans le flux */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="Marc Rassant"
              className="w-[72px] h-[72px] rounded-full object-cover shadow-sm"
            />
            <div>
              <h2 className="text-[22px] font-black text-gray-900 leading-tight">Marc Rassant</h2>
              <p className="text-[13px] text-gray-500 font-medium">@marc.events</p>
              <span className="inline-block mt-1 bg-[#FFF9C4] text-yellow-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Organisateur
              </span>
            </div>
          </div>
          <button className="active:scale-95 transition-transform">
            <img src={boutonModifierProfilSvg} alt="Modifier le profil" className="w-11 h-11 object-contain" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
              <span className="text-[#f5c000] text-lg mb-1">{s.icon}</span>
              <span className="font-black text-[15px] text-gray-900 leading-none mb-1">{s.value}</span>
              <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Mes évènements */}
        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Mes évènements</h2>
        <div className="space-y-3 mb-6">
          {eventsData.map(event => (
            <div key={event.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
              <img
                src={event.image}
                alt={event.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <h3 className="text-xs font-black text-gray-900 truncate">{event.title}</h3>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${event.statusColor}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium mb-2">{event.date} · {event.lieu}</p>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: event.vendus, label: "Vendus" },
                    { val: event.taux, label: "Taux de vente" },
                    { val: event.revenus, label: "Revenus" },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-black text-gray-900">{item.val}</p>
                      <p className="text-[9px] text-gray-400 font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="self-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0">
                <Pencil size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Outils organisateur */}
        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Outils organisateur</h2>
        <div className="grid grid-cols-4 gap-2">
          {outils.map((outil, i) => (
            <button
              key={i}
              onClick={() => {
                if (outil.label === "Créer un\névènement") {
                  navigate('/organizer/create');
                }
              }}
              className="rounded-2xl p-3 flex flex-col items-center gap-2 transition-all active:scale-95"
            >
              <div className="w-12 h-12 bg-[#FFF9C4] rounded-2xl flex items-center justify-center">
                {outil.icon}
              </div>
              <span className="text-[9px] font-bold text-gray-600 text-center leading-tight whitespace-pre-line">
                {outil.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrganizerProfile;