import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ChevronDown, Check } from 'lucide-react';
import { allEvents } from '../data/events';
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

  // Tes données de groupes
  const myGroups = [
    { id: 0, name: "Groupe soirée After School", event: "Soirée", lastMsg: "", time: "", unread: 0, image: "https://images.unsplash.com/photo-1511632765486-a01c80cf8cb4?q=80&w=200&auto=format&fit=crop" },
    { id: 1, name: "La commu OL", event: "OL - PSG", lastMsg: "On se rejoint devant la porte A ?", time: "14:30", unread: 3, image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Team Techno", event: "Nuits Sonores", lastMsg: "Quelqu'un a pris les pass ?", time: "Hier", unread: 0, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop" },
    { id: 3, name: "Les Lyonnais", event: "Fête des Lumières", lastMsg: "Rdv Place Bellecour !", time: "Mar.", unread: 0, image: "https://images.unsplash.com/photo-1514525253361-b83f85f051c0?q=80&w=200&auto=format&fit=crop" },
  ];

  // Membres fictifs pour la démo
  const dummyMembers = [
    { id: 'm1', name: 'Moi (Toi)', image: 'https://i.pravatar.cc/150?u=m1' },
    { id: 'm2', name: 'Léa Dubois', image: 'https://i.pravatar.cc/150?u=m2' },
    { id: 'm3', name: 'Hugo Martin', image: 'https://i.pravatar.cc/150?u=m3' },
    { id: 'm4', name: 'Sarah Leroy', image: 'https://i.pravatar.cc/150?u=m4' },
    { id: 'm5', name: 'Lucas Moreau', image: 'https://i.pravatar.cc/150?u=m5' },
    { id: 'm6', name: 'Emma Petit', image: 'https://i.pravatar.cc/150?u=m6' },
  ];

  const [selectedGroupId, setSelectedGroupId] = useState(myGroups[0].id);
  const selectedGroup = myGroups.find(g => g.id === selectedGroupId);

  // État pour les membres sélectionnés
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Réinitialiser la sélection si le nombre de tickets ou le groupe change
  useEffect(() => {
    setSelectedMembers([]);
  }, [count, selectedGroupId]);

  // Fonction pour cocher/décocher un membre
  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      // S'il est déjà sélectionné, on le retire
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    } else {
      // S'il n'est pas sélectionné, on vérifie si on n'a pas atteint la limite
      if (selectedMembers.length < count) {
        setSelectedMembers(prev => [...prev, memberId]);
      }
    }
  };

  // Validation : le nombre de membres sélectionnés doit être exactement égal au nombre de tickets
  const isSelectionValid = selectedMembers.length === count;

  // Prix de base
  const priceValue = event
    ? parseFloat(event.price.replace(',', '.').replace(' €', ''))
    : 25.00;

  // Calcul du total sans les frais
  const totalValue = priceValue * count;

  // Formatage pour l'affichage
  const formatPrice = (val) => val.toFixed(2).replace('.', ',') + ' €';
  const formattedTotal = formatPrice(totalValue);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden pb-64">

      {/* ─── HALOS ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {/* ─── HEADER ─── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-95 transition-transform"
        >
          <img
            src={boutonRetourSvg}
            alt="Retour"
            className="w-11 h-11 object-contain"
          />
        </button>

        <button className="text-xs font-black uppercase tracking-wider bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm active:scale-95 transition-transform">
          J'ai un code
        </button>
      </div>

      {/* ─── TITRE ─── */}
      <div className="relative z-10 px-5 pt-2 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
          Tickets
        </h1>
      </div>

      {/* ─── CARTE TICKET ─── */}
      <div className="relative z-10 px-5">
        <div className="bg-white rounded-[20px] border border-gray-100/70 shadow-sm px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-gray-900">
              Prévente
            </p>
            <p className="text-sm font-black text-[#8b44f7] mt-0.5">
              {event?.price ?? '25,00 €'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(c => Math.max(0, c - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>

            <span className="text-base font-black text-gray-900 w-4 text-center">
              {count}
            </span>

            <button
              onClick={() => setCount(c => c + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── BARRE BAS (FIXÉE) ─── */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#FDFBF7] px-5 pb-8 pt-4 z-40 border-t border-gray-100/50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
          
          <div className="mb-5">
            <p className="text-sm text-gray-800 mb-3">
              {count} ticket{count > 1 ? 's' : ''} sélectionné{count > 1 ? 's' : ''}
            </p>
            
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase text-gray-900">Total</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xl font-black text-[#8b44f7]">{formattedTotal}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to={`/payment/${id}`} className="block">
              <button className="w-full h-14 bg-[#8b44f7] text-white font-bold text-xs rounded-xl active:scale-[0.98] transition-all flex items-center justify-between px-5 uppercase tracking-wide">
                <div className="flex items-center gap-3">
                  <img
                    src={ticketIcone}
                    alt=""
                    className="w-5 h-5 object-contain flex-shrink-0"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <span>Réserver votre billet</span>
                </div>
                <span className="font-bold tracking-tight">
                  {formattedTotal}
                </span>
              </button>
            </Link>

            <button 
              onClick={() => setShowGroupModal(true)}
              className="w-full h-14 bg-[#E8DBFA] text-[#8b44f7] font-bold text-xs rounded-xl active:scale-[0.98] transition-all flex items-center justify-between px-5 uppercase tracking-wide"
            >
              <div className="flex items-center gap-3">
                <img
                  src={groupeIcone}
                  alt=""
                  className="w-5 h-5 object-contain flex-shrink-0"
                />
                <span>Réserver pour mon groupe</span>
              </div>
              <span className="font-bold tracking-tight">
                4 / 6
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ─── MODALE BOTTOM SHEET (CHOIX DU GROUPE & MEMBRES) ─── */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setShowGroupModal(false);
              setIsDropdownOpen(false);
            }}
          />
          
          {/* Modale agrandie à h-[75vh] pour laisser la place à la liste */}
          <div className="relative bg-[#FDFBF7] w-full max-w-md mx-auto rounded-t-3xl px-5 pt-4 pb-8 shadow-2xl animate-in slide-in-from-bottom-full duration-300 h-[75vh] flex flex-col">
            
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 shrink-0" />

            <h2 className="text-center text-lg font-black uppercase tracking-tight text-gray-900 mb-6 shrink-0">
              Pour quel groupe ? 👀
            </h2>

            {/* Conteneur principal qui s'étend */}
            <div className="flex-1 flex flex-col min-h-0">
              
              {/* Le Dropdown du groupe */}
              <div className="relative shrink-0 mb-6 z-20">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-gray-100 rounded-2xl p-3 flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedGroup?.image} 
                      alt={selectedGroup?.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-bold text-sm text-gray-900">{selectedGroup?.name}</span>
                  </div>
                  <ChevronDown size={20} className={`text-gray-900 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                    {myGroups.map(group => (
                      <div 
                        key={group.id}
                        onClick={() => {
                          setSelectedGroupId(group.id);
                          setIsDropdownOpen(false);
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <img src={group.image} alt={group.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className={`font-bold text-sm ${selectedGroupId === group.id ? 'text-[#8b44f7]' : 'text-gray-900'}`}>
                          {group.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* La liste des membres (scrollable) */}
              <div className="flex-1 overflow-y-auto pb-4 pr-1">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Pour qui paies-tu ?
                  </p>
                  <span className={`text-xs font-black ${isSelectionValid ? 'text-green-500' : 'text-[#8b44f7]'}`}>
                    {selectedMembers.length} / {count}
                  </span>
                </div>

                <div className="space-y-2">
                  {dummyMembers.map(member => {
                    const isSelected = selectedMembers.includes(member.id);
                    // On grise légèrement les membres non sélectionnés si la limite est atteinte
                    const isMaxReached = !isSelected && selectedMembers.length >= count;

                    return (
                      <button
                        key={member.id}
                        onClick={() => toggleMember(member.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all active:scale-[0.98] ${
                          isSelected 
                            ? 'border-[#8b44f7] bg-[#E8DBFA]' 
                            : isMaxReached
                              ? 'border-transparent bg-white/50 opacity-50 cursor-not-allowed'
                              : 'border-transparent bg-white shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                          <span className={`font-bold text-sm ${isSelected ? 'text-[#8b44f7]' : 'text-gray-900'}`}>
                            {member.name}
                          </span>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#8b44f7]' : 'bg-gray-100'
                        }`}>
                          {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bouton de validation conditionnel */}
            <button 
              onClick={() => {
                if (!isSelectionValid) return;
                setShowGroupModal(false);
                navigate(`/payment/${id}`, { 
                  state: { 
                    groupId: selectedGroupId, 
                    members: selectedMembers 
                  } 
                }); 
              }}
              className={`mt-4 w-full h-14 font-bold text-sm rounded-2xl transition-all uppercase tracking-wider shrink-0 ${
                isSelectionValid 
                  ? 'bg-[#8b44f7] text-white active:scale-[0.98] shadow-lg shadow-purple-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSelectionValid ? 'Valider le choix' : `Sélectionne ${count} membre${count > 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TicketCount;