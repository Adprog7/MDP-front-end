import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import de ton bouton retour
import boutonRetourSvg from '../assets/bouton-retour.svg';

const Notifications = () => {
  const navigate = useNavigate();

  // Les données exactes de ta capture d'écran
  const notificationsList = [
    {
      id: 1,
      title: "Plus d'excuse pour ne pas venir 😎",
      description: "Alexis vient de vous réserver une place pour Soirée After School. Retrouvez votre billet dans Mes billets.",
      footer: "Il y a 2 min / Réservation groupe",
      dateSeparator: null
    },
    {
      id: 2,
      title: "Summer Vibes approche 🎶",
      description: "L'événement que vous avez ajouté à vos favoris aura lieu dans 7 jours.",
      footer: "Il y a 2 jours / Favoris",
      dateSeparator: "Lun 22 Mai"
    },
    {
      id: 3,
      title: "Un billet est disponible pour Techno Room 🎟️",
      description: "Un participant vient de mettre sa place en revente.",
      footer: "Il y a 2 jours / revente",
      dateSeparator: null
    },
    {
      id: 4,
      title: "Lucas vous invite à rejoindre Festival Squad 👥",
      description: "Acceptez l'invitation pour réserver vos prochaines sorties en groupe.",
      footer: "Il y a 2 jours / Invitation",
      dateSeparator: null
    },
    {
      id: 5,
      title: "Votre réservation pour After School est confirmée 🎉",
      description: "Votre billet est disponible dans Mes billets. Vous pourrez le transférer à un ami ou le revendre si l'événement l'autorise.",
      footer: "Il y a 3 jours / Réservation",
      dateSeparator: null
    }
  ];

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
        {notificationsList.map((notif) => (
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
        ))}
      </div>

    </div>
  );
};

export default Notifications;