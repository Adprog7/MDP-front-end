import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Heart } from 'lucide-react';
import api from '../services/api';

// Imports des assets
import sparkUpHeaderSvg from '../assets/spark-up-header.svg';
import starSvg from '../assets/star.svg';
import clocheActifSvg from '../assets/bouton-cloche-actif.svg';
import clochePassifSvg from '../assets/bouton-cloche-passif.svg';
import parametresSvg from '../assets/bouton-parametres.svg';
import boutonModifierProfilSvg from '../assets/bouton-modifier-profil.svg';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ evenements: 0, groupes: 0, favoris: 0 });
  const [loading, setLoading] = useState(true);
  const [hasNotification] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/connexion');
        return;
      }

      try {
        // Récupération simultanée du profil et des statistiques réelles[cite: 1, 2]
        const [userRes, statsRes] = await Promise.all([
          api.get('/user', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/user/stats', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setUser(userRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Erreur récupération données:", error);
        localStorage.removeItem('token');
        navigate('/connexion');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Chargement...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased pb-28 relative overflow-x-hidden">
      <div className="absolute top-10 -left-20 w-[120%] h-[600px] bg-[#DBCDF8]/50 rounded-[100%] blur-[90px] pointer-events-none z-0" />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center px-5 pt-6 pb-6">
        <div className="flex items-center gap-2">
          <img src={sparkUpHeaderSvg} alt="SparkUp" className="h-5 object-contain" />
          <img src={starSvg} alt="Star" className="h-6 object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/notifications')}>
            <img src={hasNotification ? clocheActifSvg : clochePassifSvg} alt="Notifs" className="w-11 h-11" />
          </button>
          <button onClick={() => navigate('/settings')}>
            <img src={parametresSvg} alt="Paramètres" className="w-11 h-11" />
          </button>
        </div>
      </div>

      {/* PROFIL DYNAMIQUE */}
      <div className="relative z-10 px-5 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-[#E8DBFA] flex items-center justify-center text-[#8b44f7] font-black text-xl shadow-sm">
            {user.prenom?.[0]}{user.nom?.[0]}
          </div>
          <div className="relative z-10">
            <h2 className="text-[22px] font-black text-gray-900 leading-tight">
              {user.prenom} {user.nom}
            </h2>
            <p className="text-[13px] text-gray-500 font-medium leading-tight">{user.email}</p>
          </div>
        </div>
        <button><img src={boutonModifierProfilSvg} alt="Modifier" className="w-11 h-11" /></button>
      </div>

      {/* STATISTIQUES RÉELLES */}
      <div className="relative z-10 px-5 mb-10">
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Calendar} value={stats.evenements} label="Évènements" />
          <StatCard icon={Users} value={stats.groupes} label="Groupes" />
          <StatCard icon={Heart} value={stats.favoris} label="Favoris" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
    <Icon className="text-[#8b44f7] mb-1.5" size={22} />
    <span className="font-black text-[17px] text-gray-900 leading-none mb-1">{value}</span>
    <span className="text-[10px] text-gray-900 font-medium">{label}</span>
  </div>
);

export default Profile;