import React, { useState } from 'react';
import { MapPin, Search, X, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importation de tes fichiers SVG personnalisés depuis le dossier assets
import toutIcon from '../assets/tout.svg';
import toutActifIcon from '../assets/tout-actif.svg';
import concertsIcon from '../assets/concerts.svg';
import concertsActifIcon from '../assets/concerts-actif.svg';
import clubsIcon from '../assets/clubs.svg';
import clubsActifIcon from '../assets/clubs-actif.svg';
import festivalsIcon from '../assets/festivals.svg';
import festivalsActifIcon from '../assets/festivals-actif.svg';
import sportIcon from '../assets/sport.svg';
import sportActifIcon from '../assets/sport-actif.svg';
import plusIcon from '../assets/plus.svg';
import plusActifIcon from '../assets/plus-actif.svg';
import starIcon from '../assets/star.svg';
import organisateursBanniere from '../assets/organisateurs_bannière.svg';
// 🟢 Import de ton nouveau SVG pour la date
import encadreDateSvg from '../assets/encadre-evenement-date.svg';

const eventsData = [
  {
    id: 1,
    title: "SUMMER VIBES",
    city: "Lyon, France",
    theme: "Sport",
    date: "24 MAI",
    price: "25,00 €",
    tag: "OUTDOOR",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500"
  },
  {
    id: 2,
    title: "TECHNO ROOM",
    city: "Marseille, France",
    theme: "Clubs",
    date: "24 MAI",
    price: "18,00 €",
    tag: "DJ SET",
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=500"
  },
  {
    id: 3,
    title: "GREEN FESTIVAL",
    city: "Bordeaux, France",
    theme: "Festivals",
    date: "24 MAI",
    price: "35,00 €",
    tag: "ECO",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500"
  }
];

const categories = [
  { id: "Tout", label: "Tout", iconDefault: toutIcon, iconActif: toutActifIcon },
  { id: "Concerts", label: "Concerts", iconDefault: concertsIcon, iconActif: concertsActifIcon },
  { id: "Clubs", label: "Clubs", iconDefault: clubsIcon, iconActif: clubsActifIcon },
  { id: "Festivals", label: "Festivals", iconDefault: festivalsIcon, iconActif: festivalsActifIcon },
  { id: "Sport", label: "Sport", iconDefault: sportIcon, iconActif: sportActifIcon },
  { id: "Plus", label: "Plus", iconDefault: plusIcon, iconActif: plusActifIcon },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const toggleLike = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLikedEvents(prev => 
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tout" || event.theme === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-4 pb-24 px-5 max-w-md mx-auto font-sans antialiased relative overflow-hidden">
      
      {/* ─── EFFETS DE DÉGRADÉ DE COULEURS ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-[#E8DXFF]/40 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        
        {/* --- BARRE DE RECHERCHE --- */}
        <div className="mb-6 relative flex items-center">
          <Search className="absolute left-4 text-gray-400 pointer-events-none" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un événement, une ville, un artiste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-yellow-300 placeholder-gray-400 text-sm font-medium transition-all text-gray-800"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={16} />
            </button>
          )}
        </div>

        {/* --- BLOCS CATÉGORIES --- */}
        <div className="mb-8 flex gap-1.5 overflow-x-auto pb-2 items-center scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const currentIcon = isSelected ? cat.iconActif : cat.iconDefault;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center justify-center w-[60px] h-[68px] rounded-2xl transition-all outline-none flex-shrink-0 ${
                  isSelected ? "bg-[#FFE552] shadow-sm" : "bg-transparent"
                }`}
              >
                <img src={currentIcon} alt={cat.label} className="w-14 h-14 object-contain" />
              </button>
            );
          })}
        </div>

        {/* --- SECTION : À LA UNE 🌟 --- */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-normal tracking-tight text-gray-900 flex items-center gap-1.5">
              À la une 
              <img src={starIcon} alt="Étoile" className="w-5 h-5 object-contain" />
            </h2>
          </div>

          {/* 🔽 Modification ici : Cartes un peu moins larges (155px) */}
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {filteredEvents.map(event => (
              <Link 
                to={`/event/${event.id}`} 
                key={event.id} 
                className="min-w-[155px] w-[155px] bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/40 block flex-shrink-0 relative"
              >
                {/* 🔽 Modification ici : Hauteur réduite de h-44 à h-36 pour être un peu plus petit */}
                <div className="relative h-36 w-full">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  
                  {/* 🟢 Remplacement du badge jaune CSS par ton nouveau SVG encadre-evenement-date.svg */}
                  <div className="absolute bottom-2 left-2 w-11 h-11 flex items-center justify-center select-none">
                    <img src={encadreDateSvg} alt="" className="absolute inset-0 w-full h-full object-contain" />
                    {/* Texte superposé par-dessus ton SVG */}
                    <div className="relative z-10 flex flex-col items-center justify-center leading-none text-gray-950 font-black text-[10px]">
                      <span>{event.date.split(' ')[0]}</span>
                      <span className="text-[7px] font-bold mt-0.5 text-gray-700">{event.date.split(' ')[1]}</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => toggleLike(event.id, e)}
                    className="absolute top-3 right-3 w-7 h-7 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-transform active:scale-95 z-10"
                  >
                    <Heart size={14} className={likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : "text-white"} />
                  </button>
                </div>

                <div className="p-3">
                  <h3 className="font-black text-xs tracking-tight text-gray-900 truncate">{event.title}</h3>
                  <div className="flex items-center gap-0.5 text-[10px] text-gray-400 font-semibold mt-1">
                    <MapPin size={10} className="text-gray-400" />
                    <span className="truncate">{event.city}</span>
                  </div>
                  <div className="text-xs font-black text-[#7c3aed] mt-2">{event.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- BANNIÈRE ORGANISATEUR --- */}
        <div className="mb-8 cursor-pointer hover:opacity-95 transition-opacity">
          <img 
            src={organisateursBanniere} 
            alt="Devenir organisateur d'événements" 
            className="w-full h-auto object-contain" 
          />
        </div>

        {/* --- SECTION : RECOMMANDÉ POUR VOUS --- */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-extrabold tracking-tight text-gray-900">Recommandé pour vous</h2>
          </div>

          <div className="space-y-3">
            {filteredEvents.map(event => (
              <Link 
                to={`/event/${event.id}`} 
                key={event.id}
                className="bg-white rounded-2xl p-2 flex gap-3 items-center shadow-sm border border-gray-50/50 hover:border-gray-100 transition-all"
              >
                <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xs tracking-tight text-gray-900 truncate">{event.title}</h3>
                  <div className="flex items-center gap-0.5 text-[10px] text-gray-400 font-semibold mt-0.5">
                    <MapPin size={10} />
                    <span className="truncate">{event.city}</span>
                  </div>
                  <span className="inline-block bg-[#F5EFFF] text-[#7c3aed] font-bold text-[9px] px-1.5 py-0.5 rounded-md mt-1.5 tracking-wide">
                    {event.tag || "DJ SET"}
                  </span>
                </div>

                <div className="text-right pr-2 flex flex-col items-end justify-between h-14 py-1 flex-shrink-0">
                  <span className="text-xs font-black text-[#7c3aed]">{event.price}</span>
                  <button 
                    onClick={(e) => toggleLike(event.id, e)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Heart size={14} className={likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;