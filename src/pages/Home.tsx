import React, { useState, useEffect } from 'react';
import { MapPin, Search, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Pont API
import api from '../services/api'; 

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
import encadreDateSvg from '../assets/encadre-evenement-date.svg';

const categories = [
  { id: "Tout", label: "Tout", iconDefault: toutIcon, iconActif: toutActifIcon },
  { id: "Concerts", label: "Concerts", iconDefault: concertsIcon, iconActif: concertsActifIcon },
  { id: "Clubs", label: "Clubs", iconDefault: clubsIcon, iconActif: clubsActifIcon },
  { id: "Festivals", label: "Festivals", iconDefault: festivalsIcon, iconActif: festivalsActifIcon },
  { id: "Sport", label: "Sport", iconDefault: sportIcon, iconActif: sportActifIcon },
  { id: "Plus", label: "Plus", iconDefault: plusIcon, iconActif: plusActifIcon },
];

// --- HOOK POUR DÉTECTER LA VUE DESKTOP ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);
  return matches;
};

// --- TYPES TYPESCRIPT POUR LES PROPS ---
type EventType = {
  id: number;
  title: string;
  city: string;
  theme: string;
  date: string;
  price: string;
  tag: string;
  image: string;
};

type HomeProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  filteredEvents: EventType[];
  likedEvents: number[];
  toggleLike: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
};

// ============================================================================
// 📱 VUE MOBILE
// ============================================================================
const MobileHome = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredEvents, likedEvents, toggleLike, isLoading }: HomeProps) => (
  <div className="min-h-screen bg-[#FDFBF7] pt-4 pb-24 px-5 max-w-md mx-auto font-sans antialiased relative overflow-hidden">
    
    <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
      <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10">
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

      <div className="mb-8 flex gap-1.5 overflow-x-auto pb-2 items-center scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center justify-center w-[60px] h-[68px] rounded-2xl transition-all outline-none flex-shrink-0 ${isSelected ? "bg-[#FFE552] shadow-sm" : "bg-transparent"}`}
            >
              <img src={isSelected ? cat.iconActif : cat.iconDefault} alt={cat.label} className="w-14 h-14 object-contain" />
            </button>
          );
        })}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-normal tracking-tight text-gray-900 flex items-center gap-1.5">
            À la une 
            <img src={starIcon} alt="Étoile" className="w-5 h-5 object-contain" />
          </h2>
        </div>
        
        {isLoading ? (
            <p className="text-gray-400 text-sm">Chargement des événements...</p>
        ) : (
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {filteredEvents.map(event => (
                <Link to={`/event/${event.id}`} key={event.id} className="min-w-[155px] w-[155px] bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100/40 block flex-shrink-0 relative">
                <div className="relative h-36 w-full">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 w-11 h-11 flex items-center justify-center select-none">
                    <img src={encadreDateSvg} alt="" className="absolute inset-0 w-full h-full object-contain" />
                    <div className="relative z-10 flex flex-col items-center justify-center leading-none text-gray-950 font-black text-[10px]">
                        <span>{event.date.split(' ')[0]}</span>
                        <span className="text-[7px] font-bold mt-0.5 text-gray-700">{event.date.split(' ')[1]}</span>
                    </div>
                    </div>
                    <button onClick={(e) => toggleLike(event.id, e)} className="absolute top-3 right-3 w-7 h-7 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-transform active:scale-95 z-10">
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
        )}
      </div>

      <div className="mb-8 cursor-pointer hover:opacity-95 transition-opacity">
        <img src={organisateursBanniere} alt="Devenir organisateur" className="w-full h-auto object-contain" />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900">Recommandé pour vous</h2>
        </div>
        
        {/* Affichage conditionnel (Recommandé) */}
        {isLoading ? (
          <p className="text-sm text-gray-400 font-medium py-6 text-center w-full">Recherche de recommandations...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-sm text-gray-400 font-medium py-6 text-center w-full">Rien à vous recommander pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {filteredEvents?.map(event => (
              <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-2xl p-2 flex gap-3 items-center shadow-sm border border-gray-50/50 hover:border-gray-100 transition-all">
                <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xs tracking-tight text-gray-900 truncate">{event.title}</h3>
                  <div className="flex items-center gap-0.5 text-[10px] text-gray-400 font-semibold mt-0.5">
                    <MapPin size={10} />
                    <span className="truncate">{event.city}</span>
                  </div>
                  <span className="inline-block bg-[#F5EFFF] text-[#7c3aed] font-bold text-[9px] px-1.5 py-0.5 rounded-md mt-1.5 tracking-wide">{event.tag || "DJ SET"}</span>
                </div>
                <div className="text-right pr-2 flex flex-col items-end justify-between h-14 py-1 flex-shrink-0">
                  <span className="text-xs font-black text-[#7c3aed]">{event.price}</span>
                  <button onClick={(e) => toggleLike(event.id, e)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Heart size={14} className={likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// ============================================================================
// 💻 VUE DESKTOP (Large, aérée et centrée)
// ============================================================================
const DesktopHome = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredEvents, likedEvents, toggleLike, isLoading }: HomeProps) => (
  <div className="min-h-screen bg-[#FDFBF7] pt-12 pb-24 px-10 w-full font-sans antialiased relative overflow-hidden">
    
    <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-20 -left-10 w-96 h-96 bg-[#FFF9C4]/60 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -right-10 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px]" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto">
      
      <div className="mb-12 relative flex items-center max-w-3xl mx-auto">
        <Search className="absolute left-6 text-gray-400 pointer-events-none" size={22} />
        <input 
          type="text"
          placeholder="Rechercher un événement, une ville, un artiste..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-12 py-5 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-yellow-300 placeholder-gray-400 text-base font-medium transition-all text-gray-800"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mb-16 flex justify-center gap-6">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center w-28 h-32 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-md ${isSelected ? "bg-[#FFE552] shadow-sm" : "bg-white border border-gray-100/50"}`}
            >
              <img src={isSelected ? cat.iconActif : cat.iconDefault} alt={cat.label} className="w-16 h-16 object-contain mb-2" />
              <span className={`text-xs font-bold ${isSelected ? "text-gray-900" : "text-gray-500"}`}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-3 mb-8">
          À la une <img src={starIcon} alt="Étoile" className="w-8 h-8 object-contain" />
        </h2>
        
        {isLoading ? (
            <p className="text-gray-400 text-center">Chargement des événements...</p>
        ) : (
            <div className="grid grid-cols-4 gap-6">
            {filteredEvents.map(event => (
                <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/40 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-3 left-3 w-14 h-14 flex items-center justify-center select-none">
                    <img src={encadreDateSvg} alt="" className="absolute inset-0 w-full h-full object-contain" />
                    <div className="relative z-10 flex flex-col items-center justify-center leading-none text-gray-950 font-black text-xs">
                        <span>{event.date.split(' ')[0]}</span>
                        <span className="text-[9px] font-bold mt-0.5 text-gray-700">{event.date.split(' ')[1]}</span>
                    </div>
                    </div>
                    <button onClick={(e) => toggleLike(event.id, e)} className="absolute top-3 right-3 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:bg-black/40 z-10">
                    <Heart size={18} className={likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                </div>
                <div className="p-5">
                    <h3 className="font-black text-lg tracking-tight text-gray-900 truncate mb-1">{event.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mb-4">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="truncate">{event.city}</span>
                    </div>
                    <div className="text-lg font-black text-[#7c3aed]">{event.price}</div>
                </div>
                </Link>
            ))}
            </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-10 items-start">
        <div className="col-span-2">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-6">Recommandé pour vous</h2>
          
          {isLoading ? (
            <div className="py-6"><p className="text-gray-400 font-bold">Chargement des recommandations...</p></div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-6"><p className="text-gray-400 font-bold">Rien à vous recommander pour le moment.</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredEvents?.map(event => (
                <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-gray-100/50 hover:border-[#7c3aed]/30 hover:shadow-md transition-all group">
                  <img src={event.image} alt={event.title} className="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-base tracking-tight text-gray-900 truncate mb-1">{event.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold mb-2">
                      <MapPin size={12} />
                      <span className="truncate">{event.city}</span>
                    </div>
                    <span className="inline-block bg-[#F5EFFF] text-[#7c3aed] font-bold text-[10px] px-2 py-1 rounded-md tracking-wide">{event.tag || "DJ SET"}</span>
                  </div>
                  <div className="text-right flex flex-col items-end justify-between h-full py-1">
                    <span className="text-base font-black text-[#7c3aed] mb-4">{event.price}</span>
                    <button onClick={(e) => toggleLike(event.id, e)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Heart size={18} className={likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""} />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-1 mt-14 cursor-pointer hover:opacity-90 transition-opacity">
          <img src={organisateursBanniere} alt="Devenir organisateur" className="w-full h-auto object-contain rounded-3xl shadow-md" />
        </div>
      </div>

    </div>
  </div>
);

// ============================================================================
// COMPOSANT PRINCIPAL (Logique & Appel API)
// ============================================================================
const Home = () => {
  const [eventsData, setEventsData] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [likedEvents, setLikedEvents] = useState<number[]>([]);
  
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // --- RÉCUPÉRATION DES ÉVÉNEMENTS ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/evenements'); 
        
        const formattedEvents = response.data.map((ev: any) => {
          const dateObj = new Date(ev.date_debut);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString('fr-FR', { month: 'short' }).toUpperCase();

          return {
            id: ev.id,
            title: ev.titre || ev.title || "Titre inconnu",
            city: ev.ville || ev.lieu || "Lieu inconnu",
            theme: ev.theme || ev.categorie || "Tout",
            date: `${day} ${month}`,
            price: ev.prix ? `${ev.prix} €` : "À partir de 10 €", 
            tag: ev.tag || "OUTDOOR", 
            image: ev.photo || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500" // La modif est bien là !
          };
        });

        setEventsData(formattedEvents);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleLike = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLikedEvents(prev => prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]);
  };

  // Le filtre s'applique désormais sur l'état "events" provenant de l'API
  // Utilise eventsData au lieu de events
  const filteredEvents = eventsData.filter(event => {
    // 1. Vérifie si le title/city existe avant de faire le toLowerCase
    const title = event.title || "";
    const city = event.city || "";
    
    // 2. Sécurise aussi la recherche
    const query = searchQuery.toLowerCase() || "";
    
    const matchesSearch = title.toLowerCase().includes(query) || 
                          city.toLowerCase().includes(query);
                          
    const matchesCategory = selectedCategory === "Tout" || event.theme === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const props = { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredEvents, likedEvents, toggleLike, isLoading };

  return isDesktop ? <DesktopHome {...props} /> : <MobileHome {...props} />;
};

export default Home;