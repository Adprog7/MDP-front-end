import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ChevronDown, Check } from 'lucide-react';
import { allEvents } from '../data/events'; // Gardé pour l'évènement local, à remplacer par un fetch si besoin
import boutonRetourSvg from '../assets/bouton-retour.svg';
import ticketIcone from '../assets/ticket-icone.svg';
import groupeIcone from '../assets/icone-groupe.svg';

const TicketCount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = allEvents.find(e => e.id === parseInt(id || ''));
  const [count, setCount] = useState(0);

  // État pour la modale et la sélection du groupe
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- ÉTATS DYNAMIQUES POUR L'API ---
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- APPEL API : RÉCUPÉRER LES GROUPES ---
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/groups`)
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        if (data.length > 0) setSelectedGroupId(data[0].id);
        setLoading(false);
      })
      .catch(err => console.error("Erreur groupes:", err));
  }, []);

  // --- APPEL API : RÉCUPÉRER LES MEMBRES D'UN GROUPE ---
  useEffect(() => {
    if (selectedGroupId) {
      fetch(`${import.meta.env.VITE_API_URL}/groups/${selectedGroupId}/members`)
        .then(res => res.json())
        .then(data => setMembers(data))
        .catch(err => console.error("Erreur membres:", err));
    }
  }, [selectedGroupId]);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  // Réinitialiser la sélection si le nombre de tickets ou le groupe change
  useEffect(() => {
    setSelectedMembers([]);
  }, [count, selectedGroupId]);

  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    } else {
      if (selectedMembers.length < count) {
        setSelectedMembers(prev => [...prev, memberId]);
      }
    }
  };

  const isSelectionValid = selectedMembers.length === count;
  const priceValue = event ? parseFloat(event.price.replace(',', '.').replace(' €', '')) : 25.00;
  const totalValue = priceValue * count;
  const formatPrice = (val) => val.toFixed(2).replace('.', ',') + ' €';
  const formattedTotal = formatPrice(totalValue);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-64">
      {/* ... (Garde ton design de halos et header identique) ... */}
      
      {/* (Exemple de rendu conditionnel pour le groupe) */}
      {selectedGroup ? (
        // ... affichage dynamique
        null
      ) : (
        <p className="text-gray-400 text-center">Chargement...</p>
      )}

      {/* Reste du JSX... (Assure-toi d'utiliser groups.map et members.map au lieu des variables fictives) */}
      
      {/* Modale Bottom Sheet dynamique */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
           {/* ... Contenu de la modale utilisant la liste 'groups' et 'members' dynamique ... */}
           {groups.map(group => (
              <div key={group.id} onClick={() => setSelectedGroupId(group.id)}>
                {group.name}
              </div>
           ))}
           {members.map(member => (
              <button key={member.id} onClick={() => toggleMember(member.id)}>
                {member.name}
              </button>
           ))}
        </div>
      )}
    </div>
  );
};

export default TicketCount;