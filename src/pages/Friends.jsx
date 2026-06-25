import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, UserCheck, X, Users, UserMinus, ChevronRight } from 'lucide-react';

// Génère les initiales et une couleur à partir du nom
const getAvatarInfo = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const colors = [
    ['#1e2da7', '#f06292'],
    ['#f06292', '#1e2da7'],
    ['#7c3aed', '#f472b6'],
    ['#0891b2', '#34d399'],
    ['#d97706', '#f472b6'],
  ];
  const hash = name.charCodeAt(0) % colors.length;
  return { initials, from: colors[hash][0], to: colors[hash][1] };
};

const Friends = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]); // Données dynamiques
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover'); 
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // --- APPEL API : RÉCUPÉRER LES UTILISATEURS ---
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement utilisateurs:", err);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const friends = users.filter(u => u.isFriend);
  const discover = users.filter(u => !u.isFriend);

  useEffect(() => {
    setShowResults(query.length > 0);
  }, [query]);

  // --- LOGIQUE API : AJOUTER/RETIRER AMI ---
  const handleAddFriend = async (id) => {
    // Appel API pour envoyer une demande
    setUsers(prev => prev.map(u => u.id === id ? { ...u, requestSent: true } : u));
    await fetch(`${import.meta.env.VITE_API_URL}/friends/add/${id}`, { method: 'POST' });
  };

  const handleRemoveFriend = async (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isFriend: false } : u));
    await fetch(`${import.meta.env.VITE_API_URL}/friends/remove/${id}`, { method: 'DELETE' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header et Search Bar (Identique à ton code, juste connecté aux states) */}
      {/* ... */}

      <div className="max-w-2xl mx-auto px-4 mt-8 pb-24">
        {/* Onglets et Liste */}
        {loading ? (
          <p className="text-center py-10 font-bold text-gray-400">Chargement...</p>
        ) : (
          <div className="space-y-3">
            {activeTab === 'discover' && discover.map(user => (
              <UserCard key={user.id} user={user} onAdd={handleAddFriend} onRemove={handleRemoveFriend} />
            ))}
            {activeTab === 'friends' && friends.map(user => (
              <UserCard key={user.id} user={user} onAdd={handleAddFriend} onRemove={handleRemoveFriend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Composants UserCard et SearchResultRow (Identiques, garde-les tels quels !)
// ...

export default Friends;