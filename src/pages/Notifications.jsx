import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import de ton bouton retour
import boutonRetourSvg from '../assets/bouton-retour.svg';

const Notifications = () => {
  const navigate = useNavigate();

  // --- ÉTATS VIDES PRÊTS POUR L'API ---
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- APPEL API ---
  useEffect(() => {
    // Remplace par ton endpoint (ex: /user/notifications)
    fetch(`${import.meta.env.VITE_API_URL}/notifications`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des notifications');
        return res.json();
      })
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger vos notifications.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-10">
      
      {/* ─── HALO VIOLET (Haut Droite) ─── */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#DBCDF8]/50 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* ─── BOUTON RETOUR ─── */}
      <div className="relative z-10 px-5 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform w-fit bg-white rounded-full p-1 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
        >
          <img
            src={boutonRetourSvg}
            alt="Retour"
            className="w-10 h-10 object-contain"
          />
        </button>
      </div>

      {/* ─── TITRE ─── */}
      <div className="relative z-10 px-5 mt-4 mb-6">
        <h1 className="text-[34px] font-black text-gray-900 tracking-tighter uppercase leading-none">
          NOTIFICATIONS
        </h1>
      </div>

      {/* ─── LISTE DES NOTIFICATIONS ─── */}
      <div className="relative z-10 px-5 flex flex-col gap-3">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase text-xs">Chargement...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 font-bold uppercase text-xs">{error}</p>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notif) => (
            <React.Fragment key={notif.id}>
              
              {/* Séparateur de date conditionnel */}
              {notif.dateSeparator && (
                <div className="text-center text-[11px] text-[#A399B2] font-medium my-1">
                  {notif.dateSeparator}
                </div>
              )}
              
              {/* Carte Notification */}
              <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 active:scale-[0.99] transition-transform">
                <h3 className="text-[14px] font-black text-gray-900 leading-tight mb-1">
                  {notif.title}
                </h3>
                <p className="text-[13px] text-gray-600 leading-snug font-medium mb-4">
                  {notif.description}
                </p>
                <span className="text-[10px] text-gray-400 font-medium">
                  {notif.footer}
                </span>
              </div>
              
            </React.Fragment>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase text-xs">
              Aucune notification
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Notifications;