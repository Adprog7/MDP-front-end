import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ChevronDown, Check } from 'lucide-react';
import api from '../services/api';
import boutonRetourSvg from '../assets/bouton-retour.svg';
import ticketIcone from '../assets/ticket-icone.svg';
import groupeIcone from '../assets/icone-groupe.svg';

const TicketCount = () => {
  const { id } = useParams();
  console.log("ID de l'événement récupéré via URL :", id);
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [count, setCount] = useState(1); // On commence à 1 pour faciliter la sélection
  const [isLoading, setIsLoading] = useState(true);

  // États pour les groupes et membres réels
  const [myGroups, setMyGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dans TicketCount.jsx
useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        console.log("--- Tentative appel API Événement ---");
        const eventRes = await api.get('/evenements/' + id);
        setEvent(eventRes.data);
        console.log("Succès Événement :", eventRes.data);

        console.log("--- Tentative appel API Groupes ---");
        const groupsRes = await api.get('/groupes');
        console.log("Succès Groupes :", groupsRes.data);
        
        // Mettre à jour les états
        setMyGroups(Array.isArray(groupsRes.data) ? groupsRes.data : groupsRes.data.data || []);
        if (groupsRes.data.length > 0) {
          const firstGroupId = groupsRes.data[0].id_groupe;
          setSelectedGroupId(firstGroupId); // Cela devrait déclencher ton 2ème useEffect
          console.log("ID groupe sélectionné automatiquement :", firstGroupId);
        }
      } catch (error) {
        console.error("--- ERREUR API :", error);
      } finally {
        setIsLoading(false); // <--- C'est ici que le chargement s'arrête !
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    console.log("Recherche des membres pour le groupe ID :", selectedGroupId);
    if (selectedGroupId) {
      api.get(`/groupes/${selectedGroupId}/membres`)
        .then(res => {
            console.log("Membres reçus :", res.data);
            setGroupMembers(res.data);
        })
        .catch(err => console.error("Erreur membres :", err));
    }
  }, [selectedGroupId]);

  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    } else if (selectedMembers.length < count) {
      setSelectedMembers(prev => [...prev, memberId]);
    }
  };

  const isSelectionValid = selectedMembers.length === count;
  
  // Utilisation du prix réel provenant de la BDD via Laravel
  const priceValue = event ? parseFloat(event.prix) : 0;
  const totalValue = priceValue * count;
  const formattedTotal = totalValue.toFixed(2).replace('.', ',') + ' €';

  if (isLoading) return <div className="p-20 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-64">
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
        <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform">
          <img src={boutonRetourSvg} alt="Retour" className="w-11 h-11 object-contain" />
        </button>
        <button className="text-xs font-black uppercase tracking-wider bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm active:scale-95 transition-transform">
          J'ai un code
        </button>
      </div>

      <div className="relative z-10 px-5 pt-2 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">Tickets</h1>
        <p className="text-gray-600 font-bold">{event?.titre}</p>
      </div>

      <div className="relative z-10 px-5">
        <div className="bg-white rounded-[20px] border border-gray-100/70 shadow-sm px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-gray-900">Prévente</p>
            <p className="text-sm font-black text-[#8b44f7] mt-0.5">{priceValue.toFixed(2).replace('.', ',')} €</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCount(c => Math.max(0, c - 1))} className="w-8 h-8 flex items-center justify-center text-gray-700"><Minus size={18} strokeWidth={2.5} /></button>
            <span className="text-base font-black text-gray-900 w-4 text-center">{count}</span>
            <button onClick={() => setCount(c => c + 1)} className="w-8 h-8 flex items-center justify-center text-gray-700"><Plus size={18} strokeWidth={2.5} /></button>
          </div>
        </div>
      </div>

      {/* --- BARRE DE RÉSERVATION FIXE EN BAS (Corrigée) --- */}
{count > 0 && (
  <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#FDFBF7] px-5 pb-8 pt-4 z-40 border-t border-gray-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
    <div className="mb-5 flex justify-between items-end">
      <span className="text-xl font-black uppercase text-gray-900">Total</span>
      <span className="text-xl font-black text-[#8b44f7]">{formattedTotal}</span>
    </div>
    <div className="flex flex-col gap-3">
      {/* BOUTON 1 : ACHETER POUR MOI-MÊME (Toujours actif pour count > 0) */}
      <Link to={`/payment/${id}`} state={{ total: totalValue, count: count, targetUserId: null }}>
        <button className="w-full h-14 bg-[#8b44f7] text-white font-bold text-xs rounded-xl active:scale-[0.98] transition-all flex items-center justify-between px-5 uppercase tracking-wide shadow-md shadow-purple-100">
          <div className="flex items-center gap-3">
            <img src={ticketIcone} alt="" className="w-5 h-5 object-contain flex-shrink-0" style={{ filter: 'brightness(0) invert(1)' }} />
            <span>Réserver votre billet</span>
          </div>
          <span>{formattedTotal}</span>
        </button>
      </Link>

      {/* BOUTON 2 : ACHETER POUR MON GROUPE (Ouvre la modale) */}
      <button onClick={() => setShowGroupModal(true)} className="w-full h-14 bg-[#E8DBFA] text-[#8b44f7] font-bold text-xs rounded-xl active:scale-[0.98] transition-all flex items-center justify-between px-5 uppercase tracking-wide">
        <div className="flex items-center gap-3">
          <img src={groupeIcone} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
          <span>Réserver pour mon groupe</span>
        </div>
        {/* On affiche dynamiquement le nombre sélectionné */}
        <span>{selectedMembers.length} / {count}</span>
      </button>
    </div>
  </div>
)}

      {showGroupModal && (
  <div className="fixed inset-0 z-50 flex flex-col justify-end">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowGroupModal(false)} />
    <div className="relative bg-[#FDFBF7] w-full max-w-md mx-auto rounded-t-3xl px-5 pt-4 pb-8 h-[75vh] flex flex-col shadow-2xl">
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
      <h2 className="text-center text-lg font-black uppercase text-gray-900 mb-6">Pour quel groupe ?</h2>

      {/* --- AJOUT DU SÉLECTEUR DE GROUPE ICI --- */}
      <div className="mb-4">
        <select 
          className="w-full p-4 rounded-2xl bg-white border border-gray-100 font-bold text-sm shadow-sm"
          value={selectedGroupId || ""}
          onChange={(e) => {
            setSelectedGroupId(Number(e.target.value));
            setSelectedMembers([]); // Reset de la sélection quand on change de groupe
          }}
        >
          {myGroups.map(group => (
            <option key={group.id_groupe} value={group.id_groupe}>
              {group.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">Membres du groupe</p>
        {groupMembers.length > 0 ? (
          groupMembers.map(member => (
            <button 
              key={member.id} 
              onClick={() => toggleMember(member.id)} 
              className="w-full flex items-center justify-between p-3 mb-2 rounded-2xl bg-white shadow-sm border border-gray-100"
            >
              <span className="font-bold text-sm">{member.name}</span>
              {selectedMembers.includes(member.id) && <Check className="text-[#8b44f7]" size={18} />}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-4">Aucun membre dans ce groupe.</p>
        )}
      </div>

      <button 
        onClick={() => {
          if (isSelectionValid) {
            setShowGroupModal(false); // Ferme la modale
            // Redirige vers le paiement avec l'ID du membre
            navigate(`/payment/${id}`, { 
              state: { 
                count: count, 
                targetUserId: selectedMembers[0] 
              } 
            });
          }
        }} 
        className={`w-full h-14 font-bold rounded-2xl mt-4 ${isSelectionValid ? 'bg-[#8b44f7] text-white' : 'bg-gray-200'}`}
      >
        {isSelectionValid ? 'Valider et payer' : `Sélectionner ${count} personnes`}
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default TicketCount;