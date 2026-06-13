import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Camera, Mic, Plus } from 'lucide-react';

const ChatView = () => {
  const navigate = useNavigate();

  // Photo de profil factice pour Killian
  const profilePic = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden flex flex-col">
      
      {/* ─── HALOS DE FOND ─── */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-0">
        <div className="absolute top-60 -left-20 w-96 h-96 bg-[#FFF9C4]/50 rounded-full blur-[80px]" />
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-[#DBCDF8]/50 rounded-full blur-[80px]" />
      </div>

      {/* ─── HEADER ─── */}
      <div className="relative z-10 flex items-center gap-4 px-5 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] shrink-0"
        >
          <ChevronLeft size={24} className="text-gray-900" strokeWidth={2.5} />
        </button>
        
        <div className="flex items-center gap-3">
          <img src={profilePic} alt="Killian" className="w-10 h-10 rounded-full object-cover shadow-sm" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-black text-gray-900 text-[15px] leading-none">Killian</span>
              <ChevronRight size={14} className="text-gray-400" strokeWidth={3} />
            </div>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5">kiki.pt06200</span>
          </div>
        </div>
      </div>

      {/* ─── ZONE DE CHAT ─── */}
      <div className="relative z-10 flex-grow px-5 overflow-y-auto pb-6 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Profil central (Haut de la conversation) */}
        <div className="flex flex-col items-center mt-8 mb-10">
          <img src={profilePic} alt="Killian" className="w-24 h-24 rounded-full object-cover shadow-sm mb-3" />
          <h2 className="text-xl font-black text-gray-900 leading-tight">Killian</h2>
          <p className="text-[13px] text-gray-500 font-medium">kiki.pt06200</p>
        </div>

        {/* Liste des Messages */}
        <div className="flex flex-col gap-3">
          
          {/* Message Autre (Killian) */}
          <div className="flex items-end gap-2">
            <img src={profilePic} alt="Killian" className="w-7 h-7 rounded-full object-cover shrink-0 shadow-sm" />
            <div className="bg-[#8b44f7] text-white px-4 py-3 rounded-[20px] rounded-bl-sm max-w-[75%] shadow-[0_2px_10px_rgba(139,68,247,0.15)]">
              <p className="text-[13px] font-medium leading-snug">
                Slt frérot, ouais je te prends les places pas
              </p>
            </div>
          </div>

          {/* Message Moi (Texte simple) */}
          <div className="flex justify-end mt-2">
            <div className="bg-white border border-gray-100 text-gray-800 px-4 py-3 rounded-[20px] rounded-br-sm max-w-[75%] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="text-[13px] font-medium leading-snug">
                Slt frérot, ouais je te prends les places pas de soucis
              </p>
            </div>
          </div>

          {/* Message Moi (Billet partagé) */}
          <div className="flex justify-end">
            <div className="bg-white border border-gray-100 rounded-[20px] rounded-br-sm p-3 max-w-[85%] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="text-[12px] font-medium text-gray-800 mb-2.5 leading-snug px-1">
                Ceci est le billet pour : Soirée After School pour killian.
              </p>
              
              {/* Carte du billet flouté */}
              <div className="relative h-56 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                {/* Image de fond très floutée pour simuler le QR/Billet */}
                <img 
                  src="https://images.unsplash.com/photo-1540039155732-6847368222a0?q=80&w=300&auto=format&fit=crop" 
                  alt="Billet" 
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 grayscale"
                />
                
                {/* Carré simulé de QR Code flou au centre */}
                <div className="absolute w-32 h-32 bg-gray-300/40 rounded-lg blur-[3px]" />

                {/* Bouton d'action */}
                <button className="relative z-10 bg-[#E8DBFA] text-[#8b44f7] px-5 py-2.5 rounded-xl font-bold text-[11px] active:scale-95 transition-transform shadow-sm">
                  Vérifier mon billet
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BARRE D'ENTRÉE (FIXE EN BAS) ─── */}
      <div className="relative z-20 bg-[#FDFBF7] px-4 py-3 flex items-center gap-3">
        <button className="w-[38px] h-[38px] bg-[#8b44f7] rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-[0_2px_8px_rgba(139,68,247,0.3)]">
          <Camera size={18} className="text-white" strokeWidth={2.5} />
        </button>
        
        <div className="flex-grow bg-white border border-gray-100 rounded-full px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center">
          <input 
            type="text"
            placeholder="Message..."
            className="w-full bg-transparent outline-none text-[14px] font-medium text-gray-800 placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0 text-gray-500">
          <button className="active:scale-95 transition-transform">
            <Mic size={22} strokeWidth={2.5} />
          </button>
          <button className="active:scale-95 transition-transform">
            <Plus size={26} strokeWidth={2.5} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatView;