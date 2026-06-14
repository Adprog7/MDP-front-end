import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Music, 
  ChevronRight,
  LogOut 
} from 'lucide-react';

// Import de ton bouton retour
import boutonRetourSvg from '../assets/bouton-retour.svg';

const Settings = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Fonction de déconnexion
  const handleLogout = () => {
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/');
  };

  // Tableau des données pour générer les sections automatiquement
  const settingsSections = [
    {
      id: "account",
      title: "Mon compte",
      items: [
        { icon: Calendar, title: "Informations personnelles", desc: "Nom, email, téléphone..." },
        { icon: MapPin, title: "Sécurité", desc: "Mot de passe, connexion, 2FA..." },
        { icon: Music, title: "Préférences de profil", desc: "Photo, bio, réseaux sociaux..." }
      ]
    },
    {
      id: "preferences",
      title: "Préférences",
      items: [
        { icon: Calendar, title: "Notifications", desc: "Gère tes notifications push, email..." },
        { icon: MapPin, title: "Confidentialité", desc: "Qui peut voir ton profil, activités..." },
        { icon: Music, title: "Langue", desc: "Français" },
        { icon: Music, title: "Contenus préférés", desc: "Artistes, genres, centres d'intérêt..." }
      ]
    },
    {
      id: "appearance",
      title: "Apparence",
      items: [
        { icon: Calendar, title: "Thème", desc: "Clair" },
        { icon: MapPin, title: "Couleurs de l'application", desc: "Personnalise ton expérience" },
        { icon: Music, title: "Affichage", desc: "Taille du texte, mode compact..." }
      ]
    },
    {
      id: "payment",
      title: "Paiement",
      items: [
        { icon: Calendar, title: "Moyen de paiement", desc: "Cartes, PayPal, Apple Pay..." },
        { icon: MapPin, title: "Historique des paiements", desc: "Achats, factures, reçus..." },
        { icon: Music, title: "Remboursements", desc: "Demandes et suivi..." }
      ]
    },
    {
      id: "about",
      title: "À propos",
      items: [
        { icon: Calendar, title: "Aide et Support", desc: "FAQ, contacter le support" },
        { icon: MapPin, title: "Conditions d'utilisation", desc: "Consulte nos CGU" },
        { icon: Music, title: "Politique de confidentialité", desc: "Comment nous protégeons tes données" },
        { icon: Music, title: "À propos de Sparkup", desc: "Version 1.0.0" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-x-hidden pb-28">
      
      {/* ─── HALO VIOLET ─── */}
      <div className="absolute top-0 -left-10 w-[350px] h-[400px] bg-[#DBCDF8]/50 rounded-[100%] blur-[80px] pointer-events-none z-0" />

      {/* ─── HEADER (Bouton Retour) ─── */}
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

      {/* ─── TITRE DE LA PAGE ─── */}
      <div className="relative z-10 px-5 mt-2 mb-8">
        <h1 className="text-[34px] font-black text-gray-900 tracking-tighter uppercase leading-none">
          PARAMÈTRES
        </h1>
      </div>

      {/* ─── SECTIONS DES PARAMÈTRES ─── */}
      <div className="relative z-10 px-5 flex flex-col gap-8">
        {settingsSections.map((section) => (
          <div key={section.id}>
            
            {/* Titre de la section */}
            <h2 className="text-[19px] font-black text-gray-900 tracking-tight mb-3">
              {section.title}
            </h2>
            
            {/* Conteneur blanc des items */}
            <div className="bg-white rounded-[24px] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
              {section.items.map((item, index) => (
                <Link 
                  key={index} 
                  to="#" 
                  className="flex items-center justify-between p-3.5 rounded-xl active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Icône */}
                    <item.icon size={22} className="text-[#8b44f7] shrink-0" strokeWidth={2.5} />
                    
                    {/* Textes */}
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-tight mb-0.5">
                        {item.title}
                      </span>
                      <span className="text-[12px] text-gray-400 font-medium leading-tight">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  
                  {/* Flèche droite */}
                  <ChevronRight size={18} className="text-gray-400 shrink-0" />
                </Link>
              ))}
            </div>
            
          </div>
        ))}

        {/* ─── BOUTON DÉCONNEXION ─── */}
        <div className="pt-2">
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-transparent border-2 border-red-100 text-red-500 rounded-[20px] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Se déconnecter
            <LogOut size={18} className="text-red-500" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;