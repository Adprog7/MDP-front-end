import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QrCode, Share, RefreshCcw, MoreHorizontal } from 'lucide-react';
import { allEvents } from '../data/events';
import boutonRetourSvg from '../assets/bouton-retour.svg';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = allEvents.find(e => e.id === parseInt(id || ''));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) return <div className="p-20 text-center font-bold">Billet introuvable</div>;

  // Fonctions de formatage : retournent une chaîne vide si la date est manquante ou invalide
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-32">
      
      {/* Halo décoratif */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-5 pb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1 shadow-sm">
          <img src={boutonRetourSvg} alt="Retour" className="w-10 h-10 object-contain" />
        </button>
      </div>

      {/* TICKET PRINCIPAL */}
      <div className="relative z-10 px-5">
        <div className="bg-white rounded-[20px] shadow-sm relative pt-10 pb-8 px-6 overflow-hidden border border-gray-100">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FDFBF7] rounded-full"></div>

          {/* TITRE ET LIEU */}
          <div className="text-center mb-10">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
              {event.titre}
            </h2>
            <p className="text-xs font-bold text-gray-400 uppercase mt-1">{event.lieu}</p>
          </div>

          {/* QR CODE SEUL */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <QrCode size={220} strokeWidth={1.2} className="text-black" />
            </div>
          </div>

          {/* FOOTER TICKET : Conditionnel pour ne rien afficher si la date est vide */}
          {event.date_debut && (
            <div className="flex justify-between items-center text-xs font-black text-gray-900 border-t border-dashed border-gray-200 pt-6">
              <span className="uppercase">{formatDate(event.date_debut)}</span>
              <span className="uppercase">{formatTime(event.date_debut)}</span>
            </div>
          )}
        </div>
      </div>

      {/* BOUTONS D'ACTION */}
      <div className="relative z-10 px-6 mt-8 flex justify-between gap-4 max-w-sm mx-auto">
        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-sm active:scale-95 transition-transform border border-gray-100">
          <RefreshCcw size={20} className="text-gray-900" />
          <span className="text-[9px] font-bold text-gray-900 uppercase">Revendre</span>
        </button>
        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-sm active:scale-95 transition-transform border border-gray-100">
          <Share size={20} className="text-gray-900" />
          <span className="text-[9px] font-bold text-gray-900 uppercase">Transférer</span>
        </button>
        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-sm active:scale-95 transition-transform border border-gray-100">
          <MoreHorizontal size={20} className="text-gray-900" />
          <span className="text-[9px] font-bold text-gray-900 uppercase">Plus</span>
        </button>
      </div>

    </div>
  );
};

export default TicketDetail;