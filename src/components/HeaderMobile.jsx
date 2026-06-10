import React from 'react';
import { Heart, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/spark-up-header.svg'; 
import starsvg from '../assets/star.svg'; // 🟢 Ton fichier d'étoile importé

const HeaderMobile = () => {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#fffde6] via-[#f3f0ff] to-[#f3f0ff] sticky top-0 z-50">
      
      {/* Zone Logo + Étoile jaune */}
      <Link to="/" className="flex items-center gap-1.5">
        <img src={logoSvg} alt="SparkUp" className="h-6 w-auto object-contain" /> 
        
        {/* 🟢 Remplacement du SVG en dur par ton image d'étoile figma */}
        <img src={starsvg} alt="" className="h-7 w-auto object-contain select-none" />
      </Link>

      {/* Zone Boutons Actions (Favoris & Messages) */}
      <div className="flex items-center gap-3">
        
        {/* Bouton Favoris (Cœur) */}
        <Link to="/favorites" className="relative w-11 h-11 bg-white rounded-[1.1rem] shadow-sm flex items-center justify-center border border-gray-100 active:scale-95 transition-transform">
          <Heart size={20} className="text-gray-900" />
          {/* Badge de notification violet */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#8b44f7] rounded-full border-2 border-white"></span>
        </Link>

        {/* Bouton Messages (Avion de papier) */}
        <Link to="/groups" className="relative w-11 h-11 bg-white rounded-[1.1rem] shadow-sm flex items-center justify-center border border-gray-100 active:scale-95 transition-transform">
          <Send size={18} className="text-gray-900 rotate-[-15deg] translate-x-[-0.5px]" />
          {/* Badge de notification violet */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#8b44f7] rounded-full border-2 border-white"></span>
        </Link>

      </div>
    </header>
  );
};

export default HeaderMobile;