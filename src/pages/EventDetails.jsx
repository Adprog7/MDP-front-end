import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Music, ChevronDown } from 'lucide-react';
import { allEvents } from '../data/events'; 
import encadreDateSvg from '../assets/encadre-evenement-date.svg';

// Importation de tes assets SVG
import boutonRetourSvg from '../assets/bouton-retour.svg';
import boutonPartageSvg from '../assets/bouton-partage.svg';
import ticketIcone from '../assets/ticket-icone.svg';

const EventDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Remonte en haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  // Recherche de l'événement directement dans tes données locales
  const event = allEvents.find(e => e.id === parseInt(id || ""));

  if (!event) {
    return (
      <div className="p-20 text-center font-bold text-[#7c3aed]">
        Évènement non trouvé.
      </div>
    );
  }

  const fullAddress = `${event.location || 'La Sucrière'}, ${event.city || 'Lyon, France'}`;
  const freeEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full font-sans antialiased text-gray-900 relative">
      
      {/* ─── EN-TÊTE FIXE COMPLETEMENT TRANSPARENT ─── */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-40 px-5 pt-5 pb-3 flex items-center justify-between bg-transparent pointer-events-none">
        <Link 
          to={-1} 
          className="active:scale-95 transition-transform pointer-events-auto"
        >
          <img src={boutonRetourSvg} alt="Retour" className="w-11 h-11 object-contain" />
        </Link>
        
        <button className="active:scale-95 transition-transform pointer-events-auto">
          <img src={boutonPartageSvg} alt="Partager" className="w-11 h-11 object-contain" />
        </button>
      </div>

      {/* ─── IMAGE DE L'ÉVÉNEMENT ─── */}
      <div className="px-5 pt-20">
        <div className="w-full h-60 relative rounded-[28px] overflow-hidden shadow-sm z-10">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          
          {/* Badge Date SVG personnalisé */}
          <div className="absolute bottom-4 left-4 w-14 h-14 flex items-center justify-center select-none">
            <img src={encadreDateSvg} alt="" className="absolute inset-0 w-full h-full object-contain" />
            <div className="relative z-10 flex flex-col items-center justify-center leading-none text-gray-950 font-black">
              <span className="text-sm">24</span>
              <span className="text-[9px] font-black mt-0.5 text-gray-800 tracking-wider">MAI</span>
            </div>
          </div>

          {/* Bouton Like */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-9 h-9 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-95 transition-all"
          >
            <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
          </button>
        </div>
      </div>

      {/* ─── CORPS DE LA PAGE ─── */}
      <div className="px-5 pt-5 pb-32 relative z-10">
        
        {/* Titre & Prix standard */}
        <div className="flex justify-between items-start gap-4 mb-1">
          <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
            {event.title}
          </h1>
          <div className="text-xl font-black text-[#8b44f7] whitespace-nowrap">
            {event.price}
          </div>
        </div>
        
        <p className="text-xs font-medium text-gray-500 mb-6">
          Par <span className="text-[#8b44f7] font-bold">David Guetta</span>
        </p>

        {/* Fiche d'informations unique */}
        <div className="bg-white rounded-[24px] border border-gray-100/70 shadow-sm divide-y divide-gray-100/70 overflow-hidden mb-6">
          
          {/* Ligne 1 : Date & Heure */}
          <div className="p-4 flex items-center gap-4">
            <div className="text-[#8b44f7] flex-shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-950">sam 24 mai 2025</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">De 18:00 à 02:00</p>
            </div>
          </div>

          {/* Ligne 2 : Adresse */}
          <div className="p-4 flex items-center gap-4">
            <div className="text-[#8b44f7] flex-shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">La Sucrière</p>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">49-50 Quai Rambaud, 69002 Lyon, France</p>
            </div>
          </div>

          {/* Ligne 3 : Genres / Style de musique */}
          <div className="p-4 flex items-center gap-4">
            <div className="text-[#8b44f7] flex-shrink-0">
              <Music size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Électro - House - Techno</p>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">DJ Set - Live - Good vibes</p>
            </div>
          </div>

          {/* Ligne 4 : Section À Propos */}
          <div className="p-4">
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-2">
              À propos
            </h3>
            <p className="text-xs font-medium text-gray-600 leading-relaxed">
              Summer Vibes is back ! ☀️ Une soirée électro au cœur de Lyon avec les meilleurs DJs, des lights de folie et une ambiance unique.
            </p>
            <div className="flex justify-center pt-3 text-[#8b44f7]">
              <ChevronDown size={20} className="animate-pulse" />
            </div>
          </div>

          {/* Ligne 5 : ORGANISÉ PAR */}
          <div className="p-4">
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-3">
              Organisé par
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="David Guetta" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">David Guetta</p>
                  <p className="text-[10px] font-semibold text-gray-400 mt-0.5">2.4k abonnés • 32 événements</p>
                </div>
              </div>
              <button className="text-[11px] bg-[#eedfff] text-[#8b44f7] px-5 py-2.5 rounded-2xl transition-all active:scale-95 uppercase tracking-wider">
                Voir
              </button>
            </div>
          </div>

          {/* Ligne 6 : LIEU */}
          <div className="p-4">
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-3">
              Lieu
            </h3>
            <div className="w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-gray-100/60 relative">
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={freeEmbedSrc}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[110%]"
              />
            </div>
          </div>

        </div>

      </div>

      {/* ─── BARRE DE RÉSERVATION FIXE EN BAS ─── */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-transparent px-5 pb-6 pt-2 z-40 pointer-events-none">
        <Link to={`/tickets/${event.id}`} className="block w-full pointer-events-auto">
          <button className="w-full h-14 bg-[#8b44f7] text-white font-medium text-xs rounded-2xl active:scale-[0.98] transition-all flex items-center justify-between px-6 shadow-lg shadow-purple-200/40 uppercase tracking-wider">
            
            <div className="flex items-center gap-3">
              <img src={ticketIcone} alt="" className="w-5 h-5 object-contain" />
              <span>Réserver votre billet</span>
            </div>

            <span className="text-xs font-medium tracking-tight">
              {event.price}
            </span>
          </button>
        </Link>
      </div>

    </div>
  );
};

export default EventDetails;