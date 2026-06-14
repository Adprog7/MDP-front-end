import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. On décommente et on importe correctement l'image
// Assure-toi que le nom "ticket-success-paiement.svg" est exactement le bon
import ticketsSvg from '../assets/ticket-succes-paiement.svg';

const PaymentSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* ─── HALOS (pour le fond violet/jaune) ─── */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center text-center">
        
        {/* ─── L'IMAGE DES TICKETS ─── */}
        <img 
          src={ticketsSvg} 
          alt="Tickets de réussite" 
          className="w-full max-w-[280px] h-auto mb-10 object-contain drop-shadow-sm"
        />

        {/* ─── TITRE ─── */}
        <h1 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
          🥳 Vous êtes de la partie !
        </h1>

        {/* ─── SOUS-TITRE VIOLET ─── */}
        <p className="text-base font-bold text-[#8b44f7] mb-6">
          Votre achat a bien été pris en compte.
        </p>

        {/* ─── TEXTE DESCRIPTIF ─── */}
        <p className="text-sm font-medium text-gray-500 mb-10 leading-relaxed px-2">
          Retrouvez vos billets à tout moment<br />
          dans la rubrique Mes billets<br />
          et préparez-vous pour votre prochain événement.
        </p>

        {/* ─── BOUTON ─── */}
        <Link 
          to="/my-tickets" 
          className="w-fit px-8 py-3.5 bg-[#E8DBFA] text-[#8b44f7] rounded-xl font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
        >
          Voir mes billets
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;