import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import api from '../services/api';
import boutonRetourSvg from '../assets/bouton-retour.svg';

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [groupInfo, setGroupInfo] = useState({ nom: "Chargement..." });

  useEffect(() => {
    // Charger messages et infos du groupe
    const fetchData = async () => {
      try {
        const [msgRes, groupRes] = await Promise.all([
          api.get(`/messages/${id}`),
          api.get(`/groupes`) // Tu peux créer une route /groupes/{id} pour plus de précision
        ]);
        setMessages(msgRes.data);
        // Filtrer le groupe actuel dans la liste
        const currentGroup = groupRes.data.find(g => g.id_groupe == id);
        if (currentGroup) setGroupInfo(currentGroup);
      } catch (err) {
        console.error("Erreur chargement :", err);
      }
    };
    fetchData();
  }, [id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await api.post('/messages', { id_groupe: id, text: newMessage });
      setNewMessage("");
      const res = await api.get(`/messages/${id}`);
      setMessages(res.data);
    } catch (err) {
      alert("Erreur envoi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased flex flex-col">
      {/* ─── HEADER ─── */}
      <div className="relative z-10 flex items-center px-5 pt-6 pb-2 gap-4">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <img src={boutonRetourSvg} alt="Retour" className="w-11 h-11 object-contain" />
        </button>
        
        {/* Titre cliquable pour voir le groupe */}
        <button 
          onClick={() => navigate(`/group-details/${id}`)}
          className="flex flex-col items-start"
        >
          <h2 className="font-black text-gray-900 text-[16px]">{groupInfo.nom}</h2>
          <span className="text-[11px] text-purple-600 font-bold uppercase">Voir détails & lien</span>
        </button>
      </div>

      {/* ─── ZONE DE CHAT ─── */}
      <div className="flex-grow px-5 overflow-y-auto pb-6 flex flex-col justify-end">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.is_mine ? 'justify-end' : 'justify-start items-end'} gap-2`}>
              {!msg.is_mine && (
                <img src={msg.sender_avatar} className="w-7 h-7 rounded-full object-cover shadow-sm shrink-0" />
              )}
              <div className={`px-4 py-3 max-w-[75%] shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
                msg.is_mine 
                  ? 'bg-white border border-gray-100 text-gray-800 rounded-[20px] rounded-br-sm' 
                  : 'bg-[#8b44f7] text-white rounded-[20px] rounded-bl-sm shadow-[0_2px_10px_rgba(139,68,247,0.15)]'
              }`}>
                <p className="text-[13px] font-medium leading-snug">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── BARRE D'ENTRÉE ─── */}
      <div className="bg-[#FDFBF7] px-4 py-3 flex items-center gap-3">
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow bg-white border border-gray-100 rounded-full px-4 py-3 outline-none"
          placeholder="Message..."
        />
        <button onClick={sendMessage} className="w-[38px] h-[38px] bg-[#8b44f7] rounded-full flex items-center justify-center">
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatView;