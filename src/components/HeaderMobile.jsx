import React from 'react';
import { Heart, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/spark-up-header.svg'; 
import starsvg from '../assets/star.svg';

const HeaderMobile = () => {
  return (
    /* Ici on passe en bg-transparent pur et sans aucun flou (backdrop-blur).
      Comme ça, le header n'a plus de "matière" blanche et fusionne à 100% avec le fond de l'application.
    */
    <header className="md:hidden flex items-center justify-between px-6 py-5 bg-transparent sticky top-0 z-50">
      
      {/* Zone Logo + Étoile jaune */}
      <Link to="/" className="flex items-center gap-1.5 active:opacity-80 transition-opacity">
        <img src={logoSvg} alt="SparkUp" className="h-6 w-auto object-contain" /> 
        <img src={starsvg} alt="" className="h-7 w-auto object-contain select-none" />
      </Link>

      {/* Zone Boutons Actions (Favoris & Messages) */}
      <div className="flex items-center gap-3">
        
        {/* Bouton Favoris (Cœur) */}
        <Link 
          to="/notifications" 
          className="relative w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-100/40 active:scale-95 transition-all"
        >
          <Heart size={20} className="text-gray-900" />
          {/* Badge de notification violet */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#8b44f7] rounded-full border-2 border-white transform translate-x-0.5 -translate-y-0.5"></span>
        </Link>

        {/* Bouton Messages (Avion de papier) */}
        <Link 
          to="/groups" 
          className="relative w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-100/40 active:scale-95 transition-all"
        >
          <Send size={18} className="text-gray-900 -rotate-12 -translate-x-0.5 translate-y-0.5" />
          {/* Badge de notification violet */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#8b44f7] rounded-full border-2 border-white transform translate-x-0.5 -translate-y-0.5"></span>
        </Link>

      </div>
    </header>
  );
};

export default HeaderMobile;