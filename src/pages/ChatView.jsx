import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Camera, Mic, Plus, Send } from 'lucide-react';
import axios from 'axios';
import boutonRetourSvg from '../assets/bouton-retour.svg'; // Assure-toi d'avoir le bon chemin

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // --- RÉCUPÉRATION DES MESSAGES ---
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur chargement chat:", err));
  }, [id]);

  // --- ENVOI DE MESSAGE ---
  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    const msg = { text: newMessage, sender: 'me', timestamp: new Date().toISOString() };
    
    // Optimistic UI : on ajoute le message avant la confirmation serveur
    setMessages([...messages, msg]);
    setNewMessage('');

    await axios.post(`${import.meta.env.VITE_API_URL}/messages/${id}`, { text: newMessage });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased flex flex-col">
      
      {/* ─── HEADER ─── */}
      <div className="relative z-10 flex items-center gap-4 px-5 pt-6 pb-2">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {/* Remplace par l'avatar dynamique */}
            <img src={messages[0]?.avatar} alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-black text-gray-900 text-[15px]">{messages[0]?.name || 'Chargement...'}</span>
          </div>
        </div>
      </div>

      {/* ─── ZONE DE CHAT ─── */}
      <div className="flex-grow px-5 overflow-y-auto pb-6">
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Chargement de la conversation...</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} my-2`}>
              <div className={`px-4 py-3 rounded-[20px] max-w-[75%] ${msg.sender === 'me' ? 'bg-white border text-gray-800' : 'bg-[#8b44f7] text-white'}`}>
                <p className="text-[13px] font-medium">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── BARRE D'ENTRÉE ─── */}
      <div className="bg-[#FDFBF7] px-4 py-3 flex items-center gap-3 border-t">
        <button className="w-[38px] h-[38px] bg-[#8b44f7] rounded-full flex items-center justify-center">
          <Camera size={18} className="text-white" />
        </button>
        
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-grow bg-white border rounded-full px-4 py-3 outline-none text-sm"
        />
        
        <button onClick={handleSend}>
          <Send size={22} className="text-[#8b44f7]" />
        </button>
      </div>
    </div>
  );
};

export default ChatView;