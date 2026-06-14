import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Heart, 
  User, 
  MapPin, 
  Music, 
  ChevronRight
} from 'lucide-react';

// Imports des assets
import sparkUpHeaderSvg from '../assets/spark-up-header.svg';
import starSvg from '../assets/star.svg';
import clocheActifSvg from '../assets/bouton-cloche-actif.svg';
import clochePassifSvg from '../assets/bouton-cloche-passif.svg';
import parametresSvg from '../assets/bouton-parametres.svg';
import boutonModifierProfilSvg from '../assets/bouton-modifier-profil.svg';

const Profile = () => {
  const navigate = useNavigate();
  
  // --- ÉTATS DYNAMIQUES ---
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Remplace par tes vrais endpoints API
        const [userRes, ticketsRes, groupsRes, activitiesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/profile`),
          fetch(`${import.meta.env.VITE_API_URL}/profile/tickets`),
          fetch(`${import.meta.env.VITE_API_URL}/profile/groups`),
          fetch(`${import.meta.env.VITE_API_URL}/profile/activities`)
        ]);

        setUser(await userRes.json());
        setTickets(await ticketsRes.json());
        setGroups(await groupsRes.json());
        setActivities(await activitiesRes.json());
      } catch (err) {
        console.error("Erreur chargement profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased pb-28 relative overflow-x-hidden">

      <div className="absolute top-10 -left-20 w-[120%] h-[600px] bg-[#DBCDF8]/50 rounded-[100%] blur-[90px] pointer-events-none z-0" />

      {/* ─── HEADER ─── */}
      <div className="relative z-10 flex justify-between items-center px-5 pt-6 pb-6">
        <div className="flex items-center gap-2">
          <img src={sparkUpHeaderSvg} alt="SparkUp" className="h-5 object-contain" />
          <img src={starSvg} alt="Star" className="h-6 object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/notifications')} className="active:scale-95 transition-transform">
            <img src={hasNotification ? clocheActifSvg : clochePassifSvg} alt="Notifications" className="w-11 h-11 object-contain" />
          </button>
          <button onClick={() => navigate('/settings')} className="active:scale-95 transition-transform">
            <img src={parametresSvg} alt="Paramètres" className="w-11 h-11 object-contain" />
          </button>
        </div>
      </div>

      {/* ─── PROFIL ─── */}
      <div className="relative z-10 px-5 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={user?.avatar} alt={user?.name} className="w-[72px] h-[72px] rounded-full object-cover shadow-sm relative z-10" />
          <div className="relative z-10">
            <h2 className="text-[22px] font-black text-gray-900 leading-tight">{user?.name}</h2>
            <p className="text-[13px] text-gray-500 font-medium leading-tight">@{user?.username}</p>
            <span className="bg-[#E8DBFA] text-[#8b44f7] text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1.5 inline-block tracking-wide">
              {user?.role}
            </span>
          </div>
        </div>
        <button className="active:scale-95 transition-transform relative z-10">
          <img src={boutonModifierProfilSvg} alt="Modifier" className="w-11 h-11 object-contain" />
        </button>
      </div>

      {/* ─── STATISTIQUES ─── */}
      <div className="relative z-10 px-5 mb-10">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Calendar, label: "Évènements", val: user?.stats?.events },
            { icon: Users, label: "Groupes", val: user?.stats?.groups },
            { icon: Heart, label: "Favoris", val: user?.stats?.favorites },
            { icon: User, label: "Amis", val: user?.stats?.friends }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[20px] py-4 flex flex-col items-center justify-center shadow-sm border border-gray-50">
              <item.icon className="text-[#8b44f7] mb-1.5" size={22} />
              <span className="font-black text-[17px] text-gray-900">{item.val || 0}</span>
              <span className="text-[10px] text-gray-900 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MES BILLETS ─── */}
      <div className="relative z-10 mb-10">
        <h3 className="px-5 text-[15px] font-bold text-gray-900 mb-4">Mes billets</h3>
        <div className="flex overflow-x-auto gap-4 px-5 snap-x pb-4" style={{ scrollbarWidth: 'none' }}>
          {tickets.map(ticket => (
            <div key={ticket.id} className="min-w-[150px] bg-white rounded-3xl pb-3 shadow-sm border border-gray-50 snap-start overflow-hidden">
              <div className="relative h-36 mb-3">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-[#FDE073] px-2.5 py-1.5 rounded-xl text-center shadow-sm">
                  <span className="block text-[13px] font-black text-gray-900">{ticket.date}</span>
                  <span className="block text-[8px] font-black text-gray-900">{ticket.month}</span>
                </div>
              </div>
              <div className="px-3">
                <h4 className="text-xs font-black uppercase text-gray-900 truncate">{ticket.title}</h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-2"><MapPin size={10} /> {ticket.location}</p>
                <div className="text-xs font-black text-[#8b44f7]">{ticket.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ACTIVITÉ RÉCENTE (Épurée) ─── */}
      <div className="relative z-10 px-5 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-bold text-gray-900">Activité récente</h3>
          <Link to="#" className="text-[11px] text-[#8b44f7] font-medium flex items-center gap-0.5">
            Voir tout <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {activities.map((act, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-[42px] h-[42px] bg-white border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar size={20} className="text-[#8b44f7]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-gray-900 leading-tight mb-0.5">{act.title}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{act.subtitle}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{act.timeAgo}</span>
              </div>
              {i < activities.length - 1 && <div className="w-full h-px bg-gray-200/60" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ─── MES GROUPES ─── */}
      <div className="relative z-10 mb-4">
        <h3 className="px-5 text-[15px] font-bold text-gray-900 mb-4">Mes groupes</h3>
        <div className="flex overflow-x-auto gap-3 px-5 snap-x pb-4" style={{ scrollbarWidth: 'none' }}>
          {groups.map(group => (
            <div key={group.id} className="min-w-[150px] bg-[#F3F0FA] rounded-2xl p-2.5 flex items-center gap-3">
              <img src={group.image} alt={group.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-[11px] font-black text-gray-900 truncate">{group.name}</p>
                <p className="text-[9px] text-gray-500">{group.members} membres</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;