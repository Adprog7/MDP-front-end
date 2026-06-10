import React from 'react';
// 🟢 Remplacement de CircleUserRound par User
import { Search, Home, ShieldCheck, User, MessageSquare, LayoutDashboard, Ticket } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isOrganizer }) => {
  const location = useLocation();

  // 1. Items de base accessibles à tout le monde
  const navItems = [
    { label: 'Accueil', icon: <Home size={24} />, path: '/' },
    { label: 'Recherche', icon: <Search size={24} />, path: '/search' },
    { label: 'Mes billets', icon: <Ticket size={24} />, path: '/my-tickets' }, 
  ];


  // 3. Item "Messages" (Uniquement si connecté)
  if (isLoggedIn) {
    if (isOrganizer) {
      navItems.push({ label: 'Messages', icon: <MessageSquare size={24} />, path: '/groups' });
    }
  }

  // 4. Configuration du Bouton Dynamique (Connexion / Compte)
  let authPath = '/login';
  let authLabel = 'Connexion';

  if (isLoggedIn) {
    authLabel = 'Compte';
    authPath = isOrganizer ? '/organizer/profile' : '/account'; 
  }

  // 🟢 Utilisation de l'icône User épurée de ta maquette Figma
  const authItem = { label: authLabel, icon: <User size={24} />, path: authPath };
  const allItems = [...navItems, authItem];

  return (
    <>
      {/* --- VERSION BUREAU --- */}
      <nav className="hidden md:flex items-center justify-center px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <Link to="/" className="font-black text-2xl tracking-tighter text-[#1e2da7]">
            SPARK<span className="text-[#f06292]">UP</span>
          </Link>
          
          <div className="flex justify-center gap-8 flex-1">
            {allItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="text-gray-600 hover:text-[#1e2da7] font-medium text-sm uppercase tracking-wide transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="w-[120px] hidden lg:block"></div>
        </div>
      </nav>

      {/* --- VERSION MOBILE --- */}
      {/* --- VERSION MOBILE --- */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-white shadow-xl border border-gray-100 z-50 h-16 rounded-full px-1 flex items-center">
        <div className="flex justify-around items-center h-full w-full">
          {allItems.map((item, index) => {
            const isAuthButton = item.path === '/login' || item.path === '/account' || item.path === '/organizer/profile';
            const displayLabel = isAuthButton ? 'Profil' : item.label;
            
            const isActive = location.pathname === item.path;

            return (
              <Link 
                key={index} 
                to={item.path} 
                // 🟢 Augmentation ici : px-8 et min-w-[100px] pour un fond plus large
                className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#d7c3fa] text-[#8b44f7] rounded-full px-8 min-w-[100px]' 
                    : 'text-gray-800 px-2'
                }`}
              >
                {React.cloneElement(item.icon, { 
                  size: 20, 
                  className: isActive ? 'text-[#8b44f7]' : 'text-gray-800'
                })}
                
                <span className={`text-[9px] mt-0.5 font-bold text-center truncate tracking-wide ${
                  isActive ? 'text-[#8b44f7]' : 'text-gray-800'
                }`}>
                  {displayLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;