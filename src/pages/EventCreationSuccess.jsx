import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, LayoutDashboard, Share2, Plus, Sparkles } from 'lucide-react';

const EventCreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
        
        {/* --- ICONE SUCCÈS "SPARK" --- */}
        <div className="w-20 h-20 bg-purple-50 border-2 border-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-inner">
          <div className="absolute -top-1 -right-1 text-[#FBBF24] animate-bounce">
            <Sparkles size={20} fill="#FBBF24" />
          </div>
          <Check size={36} className="text-[#6D28D9] stroke-[3]" />
        </div>

        {/* --- TEXTES (Typo calée sur le form) --- */}
        <h1 className="text-2xl font-black mb-2 text-gray-900">
          Ton Spark est en ligne !
        </h1>
        <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed px-2">
          Félicitations ! Ton évènement est maintenant visible par toute la communauté SparkUp.
        </p>

        {/* --- ACTIONS --- */}
        <div className="space-y-3">
          <Link 
            to="/organizer/dashboard" 
            className="w-full py-4 bg-[#6D28D9] text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-transform active:scale-95"
          >
            <LayoutDashboard size={18} /> Voir mon Dashboard
          </Link>

          <button 
            onClick={() => {/* Logique partage */}}
            className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-black flex items-center justify-center gap-2 hover:border-[#6D28D9] hover:bg-purple-50/30 transition-all"
          >
            <Share2 size={18} className="text-gray-400" /> Partager l'évènement
          </button>
        </div>

        {/* --- LIEN SECONDAIRE DISCRET --- */}
        <div className="mt-8 pt-6 border-t border-gray-50">
          <button 
            onClick={() => navigate('/organizer/create')}
            className="text-gray-400 hover:text-[#6D28D9] text-xs font-black flex items-center justify-center gap-1.5 mx-auto transition-colors"
          >
            <Plus size={16} /> Créer un autre évènement
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventCreationSuccess;