import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import boutonRetourSvg from '../assets/bouton-retour.svg';

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    api.get('/groupes').then(res => {
      const found = res.data.find(g => g.id_groupe == id);
      setGroup(found);
    });
  }, [id]);

  const copyLink = () => {
    const inviteLink = `${window.location.origin}/join/${group.lien_invitation}`;
    navigator.clipboard.writeText(inviteLink);
    alert("Lien copié !");
  };

  if (!group) return <div className="p-10">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-5">
      <button onClick={() => navigate(-1)} className="mb-6">
        <img src={boutonRetourSvg} alt="Retour" className="w-10 h-10" />
      </button>
      
      <h1 className="text-2xl font-black uppercase mb-4">{group.nom}</h1>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <p className="font-bold text-gray-500 text-sm mb-2">Lien d'invitation :</p>
        <button onClick={copyLink} className="w-full bg-[#8b44f7] text-white py-4 rounded-xl font-bold">
          Copier le lien de partage
        </button>
      </div>
    </div>
  );
};

export default GroupDetails;