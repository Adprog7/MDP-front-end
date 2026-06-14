import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import de ton icône star
import starSvg from '../assets/star.svg';

const recentEvents = [
  { 
    id: 1, 
    title: "AFTER SCHOOL", 
    location: "Paris, France", 
    price: "20,00 €", 
    tag: "DJ SET", 
    tagBg: "bg-[#E8DBFA]", 
    tagColor: "text-[#8b44f7]", 
    image: "https://images.unsplash.com/photo-1540039155732-6847368222a0?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    title: "SUNSET PARTY", 
    location: "Nice, France", 
    price: "15,00 €", 
    tag: "HOUSE", 
    tagBg: "bg-[#FFEAD5]", 
    tagColor: "text-[#FF7A50]", 
    image: "https://images.unsplash.com/photo-1514525253361-b83f85f051c0?q=80&w=200&auto=format&fit=crop" 
  }
];

const Search = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const filteredEvents = recentEvents.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-32">
      
      {/* ─── HALOS DE FOND ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-5 pt-10">
        
        {/* ─── BARRE DE RECHERCHE ─── */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Rechercher un évènement, une ville, un artiste..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none focus:ring-2 focus:ring-[#8b44f7]/20 transition-all text-sm font-medium placeholder:text-gray-400"
          />
        </div>

        {/* ─── TITRE SECTION AVEC SVG ─── */}
        <div className="mb-4 flex items-center gap-1.5">
          <h2 className="text-[13px] font-black text-gray-900 tracking-tight">
            Évènements vus récemment
          </h2>
          <img 
            src={starSvg} 
            alt="Étoile" 
            className="w-4 h-4 object-contain" 
          />
        </div>

        {/* ─── LISTE DES ÉVÉNEMENTS ─── */}
        <div className="flex flex-col gap-3">
          {filteredEvents.map(event => (
            <Link key={event.id} to={`/event/${event.id}`} className="block">
              <div className="bg-white rounded-[20px] p-2 pr-3 flex items-center justify-between shadow-sm border border-gray-50 active:scale-[0.98] transition-transform">
                
                {/* Gauche : Image et Infos */}
                <div className="flex items-center gap-4">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-[72px] h-[72px] rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-black uppercase tracking-tight text-gray-900 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                      <MapPin size={10} />
                      <span>{event.location}</span>
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full w-fit mt-0.5 ${event.tagBg} ${event.tagColor}`}>
                      {event.tag}
                    </span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                  )}
                </div>

                {/* Droite : Prix et Favoris */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-black text-[#8b44f7]">
                    {event.price}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Pour éviter de déclencher le Link (navigation) en cliquant sur le cœur
                      // Ajouter logique favoris ici
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart size={14} className="text-gray-900" strokeWidth={2.5} />
                  </button>
                </div>

              </div>
            </Link>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 font-bold uppercase text-xs">
                Aucun résultat
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Search;