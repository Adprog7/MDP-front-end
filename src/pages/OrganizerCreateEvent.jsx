import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, ChevronRight, Calendar, Clock, MapPin, Plus, Sparkles, List, LayoutGrid, Moon } from 'lucide-react';

const OrganizerCreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [preview, setPreview] = useState(null);
  const [tempBillet, setTempBillet] = useState({ nom: '', quantite: '', prix: '' });
  
  const [formData, setFormData] = useState({
    titre: '', description: '', date: '', heure: '', lieu: '', categorie: '',
    theme: 'Automatique', couleur: '#6D28D9',
    billets: [
      { id: 1, nom: 'Billet Standard', quantite: 400, prix: '25,00' },
      { id: 2, nom: 'Billet VIP', quantite: 80, prix: '50,00' }
    ]
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => { if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0])); };

  const saveBillet = () => {
    if (tempBillet.nom && tempBillet.quantite && tempBillet.prix) {
      setFormData({ ...formData, billets: [...formData.billets, { id: Date.now(), ...tempBillet }] });
      setTempBillet({ nom: '', quantite: '', prix: '' });
      setIsAdding(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) setStep(step + 1);
    else { console.log("Final:", formData); navigate('/organizer/create-success'); }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32">
      <div className="max-w-md mx-auto">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="mb-6"><ArrowLeft size={24} /></button>
        <h1 className="text-2xl font-black mb-1">Créer un évènement</h1>
        <p className="text-gray-400 text-sm font-medium mb-6">Étape {step} sur 5 : {['Informations', 'Quand et où ?', 'Catégorie', 'Billetterie', 'Personnalisation'][step - 1]}</p>

        {/* Stepper */}
        <div className="flex justify-between mb-8 px-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= s ? 'bg-[#6D28D9] text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
              <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">{['Infos', 'Détails', 'Cat.', 'Billet', 'Perso'][s-1]}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-purple-200 rounded-3xl p-8 flex flex-col items-center bg-purple-50/50 relative cursor-pointer">
                <ImageIcon size={32} className="text-purple-400 mb-2" />
                <input type="file" className="absolute inset-0 opacity-0" onChange={handleImageChange} />
                <p className="text-xs font-bold text-purple-600 uppercase">Ajouter une image</p>
              </div>
              <input name="titre" placeholder="Nom de l'évènement" className="w-full p-4 rounded-2xl border font-bold" onChange={handleChange} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border"><Calendar size={20} className="text-gray-400"/><input placeholder="Date" className="flex-1 font-bold" name="date" onChange={handleChange}/></div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border"><Clock size={20} className="text-gray-400"/><input placeholder="De 18:00 à 02:00" className="flex-1 font-bold" name="heure" onChange={handleChange}/></div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border"><MapPin size={20} className="text-gray-400"/><input placeholder="Lieu" className="flex-1 font-bold" name="lieu" onChange={handleChange}/></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">{['Concert', 'Festival', 'Soirée / Club', 'Sport', 'Conférence', 'Autre'].map(cat => (
              <div key={cat} onClick={() => setFormData({...formData, categorie: cat})} className={`p-4 bg-white rounded-2xl border flex justify-between items-center cursor-pointer ${formData.categorie === cat ? 'border-[#6D28D9] ring-1 ring-[#6D28D9]' : ''}`}>
                <span className="font-bold text-sm">{cat}</span>
                <div className={`w-5 h-5 rounded-full border-2 ${formData.categorie === cat ? 'border-[#6D28D9] bg-[#6D28D9]' : 'border-gray-300'}`} />
              </div>
            ))}</div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {/* Liste des billets */}
              {formData.billets.map(b => (
                <div key={b.id} className="p-4 bg-white rounded-2xl border flex justify-between items-center shadow-sm">
                  <div><p className="font-black text-sm">{b.nom}</p><p className="text-[10px] text-gray-400 font-bold uppercase">Qté: {b.quantite} · Prix: {b.prix} €</p></div>
                </div>
              ))}

              {/* Formulaire d'ajout qui s'affiche quand isAdding est true */}
              {isAdding ? (
                <div className="p-5 bg-white rounded-3xl border-2 border-[#6D28D9] space-y-3">
                  <input 
                    placeholder="Nom du billet" 
                    className="w-full p-2 border rounded-lg font-bold" 
                    onChange={(e) => setTempBillet({...tempBillet, nom: e.target.value})} 
                  />
                  <div className="flex gap-2">
                    <input 
                      placeholder="Qté" type="number" 
                      className="w-1/2 p-2 border rounded-lg font-bold" 
                      onChange={(e) => setTempBillet({...tempBillet, quantite: e.target.value})} 
                    />
                    <input 
                      placeholder="Prix €" type="number" 
                      className="w-1/2 p-2 border rounded-lg font-bold" 
                      onChange={(e) => setTempBillet({...tempBillet, prix: e.target.value})} 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={saveBillet} 
                    className="w-full py-2 bg-[#6D28D9] text-white rounded-lg font-black"
                  >
                    Valider
                  </button>
                </div>
              ) : (
                /* Bouton d'ajout */
                <button 
                  type="button" 
                  onClick={() => setIsAdding(true)} 
                  className="w-full p-4 border-2 border-dashed border-[#6D28D9]/30 rounded-2xl text-[#6D28D9] font-black flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Ajouter un billet
                </button>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <p className="font-black">Thème de la page</p>
              <div className="grid grid-cols-4 gap-2">
                {[ {name:'Auto', icon:<Sparkles size={20}/>}, {name:'Minimal', icon:<List size={20}/>}, {name:'Coloré', icon:<LayoutGrid size={20}/>}, {name:'Sombre', icon:<Moon size={20}/>} ].map(t => (
                  <div key={t.name} onClick={() => setFormData({...formData, theme: t.name})} className={`p-3 rounded-2xl border flex flex-col items-center ${formData.theme === t.name ? 'border-[#6D28D9] bg-purple-50' : ''}`}>
                    {t.icon} <span className="text-[10px] font-bold mt-2">{t.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {['#6D28D9', '#FBBF24', '#F472B6', '#F97316', '#06B6D4', '#22C55E'].map(c => (
                  <div key={c} className="w-10 h-10 rounded-full cursor-pointer" style={{ background: c }} onClick={() => setFormData({...formData, couleur: c})} />
                ))}
              </div>
              <div className="bg-white p-3 rounded-3xl shadow-lg border border-gray-100">
                <div className="h-32 bg-gray-100 rounded-2xl mb-3 overflow-hidden">{preview && <img src={preview} className="w-full h-full object-cover"/>}</div>
                <div className="flex justify-between px-2 font-black"><span>{formData.titre || 'Titre'}</span> <span>{formData.billets[0]?.prix || '0'} €</span></div>
              </div>
            </div>
          )}

          <button type="submit" className="w-full mt-8 py-4 bg-[#6D28D9] text-white rounded-2xl font-black">{step === 5 ? "Publier l'évènement" : "Continuer"}</button>
        </form>
      </div>
    </div>
  );
};

export default OrganizerCreateEvent;