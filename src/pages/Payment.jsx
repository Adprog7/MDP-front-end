import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, ChevronDown, Loader2, Check } from 'lucide-react';
import api from '../services/api';
import boutonRetourSvg from '../assets/bouton-retour.svg';
import appleIcone from '../assets/apple-icone.svg'; 
import iconeAppleCarte from '../assets/icone-apple-carte.svg';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('apple');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const targetUserId = location.state?.targetUserId || null;

  // Nombre de places récupéré depuis la page précédente
  const count = location.state?.count || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Récupération dynamique de l'événement depuis Laravel
    api.get(`/evenements/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Erreur chargement événement :", err));
  }, [id]);

  const handlePayment = async () => {
    setLoading(true);
    try {
        // targetUserId provient du state envoyé par TicketCount
        const targetUserId = location.state?.targetUserId;

        console.log("Paiement initié pour l'utilisateur ID :", targetUserId);

        await api.post('/billets', {
            id_evenement: id,
            id_destinataire: targetUserId // Laravel va traiter cet ID
        });
        
        navigate(`/payment-success`);
    } catch (error) {
        console.error("Erreur paiement :", error);
        alert("Une erreur est survenue lors de la réservation.");
    } finally {
        setLoading(false);
    }
};
  if (!event) return <div className="p-20 text-center">Chargement...</div>;

  const priceValue = parseFloat(event.prix);
  const totalValue = priceValue * count;
  const formattedTotal = totalValue.toFixed(2).replace('.', ',') + ' €';

  const getPaymentDetails = (method) => {
    switch(method) {
      case 'apple': return { name: 'Apple Pay', icon: <img src={iconeAppleCarte} alt="Apple Pay" className="h-7 w-auto object-contain" /> };
      case 'cb': return { name: 'Carte Bancaire', icon: <div className="border border-gray-800 rounded flex items-center justify-center p-1 px-1.5"><CreditCard size={18} className="text-gray-900" strokeWidth={2.5} /></div> };
      case 'paypal': return { name: 'PayPal', icon: <span className="text-[#0079C1] font-black italic text-xl px-2">P</span> };
      default: return { name: '', icon: null };
    }
  };

  const currentPayment = getPaymentDetails(paymentMethod);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-48">
      {/* ─── HALOS ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {/* ─── HEADER ─── */}
      <div className="relative z-10 px-5 pt-5 pb-2 flex flex-col gap-6">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1">
          <img src={boutonRetourSvg} alt="Retour" className="w-10 h-10 object-contain" />
        </button>
        <h1 className="text-[40px] leading-none font-black uppercase tracking-tight text-gray-900">Paiement</h1>
      </div>

      {/* ─── RÉSUMÉ ─── */}
      <div className="relative z-10 px-5 mt-2">
        <div className="bg-white rounded-[20px] p-2 pr-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img src={event.photo} alt={event.titre} className="w-14 h-14 rounded-2xl object-cover" />
            <div>
              <h2 className="text-sm font-black uppercase tracking-tight text-gray-900 line-clamp-1">{event.titre}</h2>
              <p className="text-sm font-medium text-gray-400 mt-0.5">{count} article{count > 1 ? 's' : ''}</p>
            </div>
          </div>
          <ChevronDown size={20} className="text-gray-900" />
        </div>
      </div>

      {/* ─── MÉTHODE PAIEMENT ─── */}
      <div className="relative z-10 px-5 mt-10">
        <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-4">Pay with</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentPayment.icon}
            <span className="font-bold text-sm text-gray-900">{currentPayment.name}</span>
          </div>
          <button onClick={() => setShowPaymentModal(true)} className="bg-[#E8DBFA] text-[#8b44f7] text-xs font-bold px-5 py-3 rounded-xl uppercase tracking-wider active:scale-95 transition-transform">
            Changer
          </button>
        </div>
      </div>

      {/* ─── FOOTER TOTAL ─── */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#FDFBF7] px-5 pb-8 pt-4 z-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[22px] font-black uppercase text-gray-900">Total</span>
            <span className="text-[22px] font-black text-[#8b44f7]">{formattedTotal}</span>
          </div>
          <button onClick={handlePayment} disabled={loading} className="w-full h-14 bg-[#8b44f7] text-white font-bold text-xl rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-lg">
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Confirmer le paiement"}
          </button>
        </div>
      </div>

      {/* --- Modale Modal ... (Ton code modale est parfait, garde-le tel quel) --- */}
    </div>
  );
};

export default Payment;