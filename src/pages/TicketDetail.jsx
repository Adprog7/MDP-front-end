import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QrCode, Share, RefreshCcw, MoreHorizontal } from 'lucide-react';
import boutonRetourSvg from '../assets/bouton-retour.svg';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ÉTATS VIDES PRÊTS POUR L'API ---
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Appel API pour récupérer le détail d'un billet précis
    fetch(`${import.meta.env.VITE_API_URL}/billets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Billet introuvable');
        return res.json();
      })
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger le ticket.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold">Chargement du billet...</div>;
  if (error || !ticket) return <div className="p-20 text-center font-bold text-red-500">{error || "Billet introuvable"}</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-32">

      {/* ─── HALOS FLOUES DE DÉGRADÉ ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {/* ─── HEADER ─── */}
      <div className="relative z-10 px-5 pt-5 pb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1"
        >
          <img
            src={boutonRetourSvg}
            alt="Retour"
            className="w-10 h-10 object-contain"
          />
        </button>

        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 shadow-sm active:scale-95 transition-transform">
          ?
        </button>
      </div>

      {/* ─── TICKET PRINCIPAL ─── */}
      <div className="relative z-10 px-5">
        <div className="bg-white rounded-[20px] shadow-sm relative pt-10 pb-8 px-6 overflow-hidden">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FDFBF7] rounded-full"></div>

          {/* En-tête du ticket (Dynamique) */}
          <div className="grid grid-cols-3 text-center mb-10 text-[9px] font-bold text-gray-900 leading-tight uppercase">
            <div>
              <p>{ticket.artist_start || "LINE UP"}</p>
              <p>{ticket.venue_start}</p>
              <p>{ticket.date_start}</p>
            </div>
            <div>
              <p>{ticket.title}</p>
              <p>{ticket.venue}</p>
              <p>{ticket.date}</p>
              <p>{ticket.hours}</p>
            </div>
            <div>
              <p>{ticket.artist_end || "GUEST"}</p>
              <p>{ticket.venue_end}</p>
              <p>{ticket.date_end}</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              {ticket.title} - {ticket.city}
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <div className="mb-2">
              <QrCode size={200} strokeWidth={1} className="text-black" />
            </div>
            <p className="text-xs font-bold text-gray-400 font-mono tracking-wider">
              {ticket.barcode} - {ticket.price}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-black text-gray-900">
            <span>{ticket.date_short}</span>
            <span>{ticket.time_range}</span>
          </div>
        </div>
      </div>

      {/* ─── BOUTONS D'ACTION ─── */}
      <div className="relative z-10 px-6 mt-8 flex justify-between gap-4 max-w-sm mx-auto">
        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-95 transition-transform">
          <RefreshCcw size={22} className="text-gray-900" />
          <span className="text-[10px] font-bold text-gray-900">Revendre</span>
        </button>

        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-95 transition-transform">
          <Share size={22} className="text-gray-900" />
          <span className="text-[10px] font-bold text-gray-900">Transférer</span>
        </button>

        <button className="flex flex-col items-center gap-2 flex-1 bg-white py-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-95 transition-transform">
          <MoreHorizontal size={22} className="text-gray-900" />
          <span className="text-[10px] font-bold text-gray-900">Plus</span>
        </button>
      </div>

      <div className="relative z-10 px-5 mt-6 flex justify-center">
        <button className="bg-black text-white px-5 py-2.5 rounded-[14px] flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-8 h-5 bg-white rounded flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-1/3 bg-orange-400 absolute top-0"></div>
            <div className="w-full h-1/3 bg-green-500 absolute top-1/3"></div>
            <div className="w-full h-1/3 bg-blue-500 absolute bottom-0"></div>
            <div className="w-4 h-2 bg-white rounded-full absolute -top-1"></div>
          </div>
          <div className="text-left">
            <p className="text-[9px] font-medium text-gray-300 leading-tight">Ajouter à</p>
            <p className="text-sm font-semibold leading-tight">Apple Cartes</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;