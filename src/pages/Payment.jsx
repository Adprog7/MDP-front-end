import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, ChevronDown, Loader2, Check } from 'lucide-react';
import { allEvents } from '../data/events';
import boutonRetourSvg from '../assets/bouton-retour.svg';
// Tes icônes personnalisées
import appleIcone from '../assets/apple-icone.svg'; 
import iconeAppleCarte from '../assets/icone-apple-carte.svg';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // État pour gérer la méthode de paiement sélectionnée
  const [paymentMethod, setPaymentMethod] = useState('apple'); // Par défaut 'apple'
  
  // État pour afficher/masquer la modale de choix de paiement
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const event = allEvents.find(e => e.id === parseInt(id || ''));
  const count = location.state?.members?.length || location.state?.count || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/payment-success?count=${count}`);
    }, 2000);
  };

  if (!event) return null;

  const priceValue = parseFloat(event.price.replace(',', '.').replace(' €', ''));
  const totalValue = priceValue * count;
  const formattedTotal = totalValue.toFixed(2).replace('.', ',') + ' €';

  // Helper pour obtenir les infos de la méthode sélectionnée
  const getPaymentDetails = (method) => {
    switch(method) {
      case 'apple':
        return { 
          name: 'Apple Pay', 
          icon: <img src={iconeAppleCarte} alt="Apple Pay" className="h-7 w-auto object-contain" /> 
        };
      case 'cb':
        return { 
          name: 'Carte Bancaire', 
          icon: <div className="border border-gray-800 rounded flex items-center justify-center p-1 px-1.5"><CreditCard size={18} className="text-gray-900" strokeWidth={2.5} /></div> 
        };
      case 'paypal':
        return { 
          name: 'PayPal', 
          icon: <span className="text-[#0079C1] font-black italic text-xl px-2">P</span> 
        };
      default:
        return { name: '', icon: null };
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

        <h1 className="text-[40px] leading-none font-black uppercase tracking-tight text-gray-900">
          Paiement
        </h1>
      </div>

      {/* ─── CARTE RÉSUMÉ ÉVÉNEMENT ─── */}
      <div className="relative z-10 px-5 mt-2">
        <div className="bg-white rounded-[20px] p-2 pr-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div>
              <h2 className="text-sm font-black uppercase tracking-tight text-gray-900 line-clamp-1">
                {event.title}
              </h2>
              <p className="text-sm font-medium text-gray-400 mt-0.5">
                {count} article{count > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <ChevronDown size={20} className="text-gray-900" />
        </div>
      </div>

      {/* ─── LIGNE MÉTHODE DE PAIEMENT ACTUELLE ─── */}
      <div className="relative z-10 px-5 mt-10">
        <h3 className="text-lg font-black uppercase tracking-wide text-gray-900 mb-4">
          Pay with
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentPayment.icon}
            <span className="font-bold text-sm text-gray-900">
              {currentPayment.name}
            </span>
          </div>

          <button 
            onClick={() => setShowPaymentModal(true)}
            className="bg-[#E8DBFA] text-[#8b44f7] text-xs font-bold px-5 py-3 rounded-xl uppercase tracking-wider active:scale-95 transition-transform"
          >
            Changer
          </button>
        </div>
      </div>

      {/* ─── BARRE FIXE EN BAS (TOTAL + BOUTON) ─── */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#FDFBF7] px-5 pb-8 pt-4 z-20">
        <div className="max-w-md mx-auto">
          
          <div className="flex justify-between items-end mb-4">
            <span className="text-[22px] font-black uppercase text-gray-900">Total</span>
            <span className="text-[22px] font-black text-[#8b44f7]">{formattedTotal}</span>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            // Le fond est maintenant uniformément violet pour tous les modes de paiement
            className="w-full h-14 bg-[#8b44f7] text-white font-bold text-xl rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-purple-200/50 tracking-tight"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                {paymentMethod === 'apple' && (
                  <img 
                    src={appleIcone} 
                    alt="Apple Pay" 
                    className="h-8 w-auto object-contain brightness-0 invert" 
                  />
                )}
                {paymentMethod === 'cb' && (
                  <CreditCard size={32} strokeWidth={2} />
                )}
                {paymentMethod === 'paypal' && (
                  <span className="font-black italic text-[24px]">PayPal</span>
                )}
              </>
            )}
          </button>

          <p className="text-[10px] text-gray-500 text-center leading-tight mt-4 px-2">
            En confirmant votre commande, vous acceptez les <span className="font-bold text-gray-900">Conditions Générales d'Utilisation</span> ainsi que la <span className="font-bold text-gray-900">Politique de Confidentialité</span> de SparkUp.
          </p>
        </div>
      </div>

      {/* ─── MODALE BOTTOM SHEET (CHOIX PAIEMENT) ─── */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPaymentModal(false)}
          />
          
          <div className="relative bg-[#FDFBF7] w-full max-w-md mx-auto rounded-t-3xl px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h2 className="text-center text-lg font-black uppercase tracking-tight text-gray-900 mb-6">
              Méthode de paiement
            </h2>

            <div className="flex flex-col gap-3">
              {/* Option Apple Pay */}
              <button 
                onClick={() => {
                  setPaymentMethod('apple');
                  setShowPaymentModal(false);
                }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.99] ${
                  paymentMethod === 'apple' 
                    ? 'border-[#8b44f7] bg-[#E8DBFA]' 
                    : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={iconeAppleCarte} alt="Apple Pay" className="h-7 w-auto object-contain" />
                  <span className={`font-bold text-sm ${paymentMethod === 'apple' ? 'text-[#8b44f7]' : 'text-gray-900'}`}>
                    Apple Pay
                  </span>
                </div>
                {paymentMethod === 'apple' && (
                  <div className="w-6 h-6 rounded-full bg-[#8b44f7] flex items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* Option CB */}
              <button 
                onClick={() => {
                  setPaymentMethod('cb');
                  setShowPaymentModal(false);
                }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.99] ${
                  paymentMethod === 'cb' 
                    ? 'border-[#8b44f7] bg-[#E8DBFA]' 
                    : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="border border-gray-800 rounded flex items-center justify-center p-1 px-1.5">
                    <CreditCard size={18} className="text-gray-900" strokeWidth={2.5} />
                  </div>
                  <span className={`font-bold text-sm ${paymentMethod === 'cb' ? 'text-[#8b44f7]' : 'text-gray-900'}`}>
                    Carte Bancaire
                  </span>
                </div>
                {paymentMethod === 'cb' && (
                  <div className="w-6 h-6 rounded-full bg-[#8b44f7] flex items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* Option PayPal */}
              <button 
                onClick={() => {
                  setPaymentMethod('paypal');
                  setShowPaymentModal(false);
                }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.99] ${
                  paymentMethod === 'paypal' 
                    ? 'border-[#8b44f7] bg-[#E8DBFA]' 
                    : 'border-transparent bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#0079C1] font-black italic text-xl px-2">P</span>
                  <span className={`font-bold text-sm ${paymentMethod === 'paypal' ? 'text-[#8b44f7]' : 'text-gray-900'}`}>
                    PayPal
                  </span>
                </div>
                {paymentMethod === 'paypal' && (
                  <div className="w-6 h-6 rounded-full bg-[#8b44f7] flex items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payment;