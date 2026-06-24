import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const OrganizerAuth = ({ setIsLoggedIn, setIsOrganizer }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [siret, setSiret] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const getStrength = (pwd) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 4) return 1;
    if (pwd.length < 6) return 2;
    if (pwd.length < 8) return 3;
    return 4;
  };
  const strength = getStrength(password);
  const strengthLabel = ['', 'Faible', 'Moyen', 'Bon', 'Fort'][strength];
  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsOrganizer(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isOrganizer', 'true');
    navigate('/organizer/profile');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    handleLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative overflow-hidden">

      {/* Halos de fond — identiques à Home et Search */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex justify-center items-start">
        <div className="w-full max-w-sm min-h-screen flex flex-col">

          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-4 z-20 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft size={22} className="text-gray-800" />
          </button>

          <div className="pt-14 pb-6 px-6 text-center">
            {!isLogin && (
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#fff9e6] border border-yellow-100 flex items-center justify-center">
                  <User size={32} className="text-[#f5c000]" />
                </div>
              </div>
            )}
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {isLogin ? 'Se connecter' : 'Créer votre compte'}
            </h1>
            <p className="text-[#f5c000] font-bold text-lg mt-0.5">Organisateur</p>
            {!isLogin && (
              <p className="text-gray-400 text-sm mt-2 leading-snug">
                Rejoignez SparUp en tant qu'organisateur<br />et gérez vos évènements en toute simplicité.
              </p>
            )}
          </div>

          <div className="flex-1 px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm font-semibold text-center bg-red-50 p-3 rounded-2xl">
                  {error}
                </div>
              )}

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Prénom</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nom</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email professionnel</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@votre-entreprise.com"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Numéro de SIRET</label>
                  <input
                    type="text"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                    placeholder="123 456 789 00012"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full pl-10 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition tracking-widest"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-400">8 caractères minimum</p>
                    <div className="flex items-center gap-1.5">
                      {strength > 0 && (
                        <span className="text-xs font-semibold text-[#f5c000]">{strengthLabel}</span>
                      )}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-6 rounded-full transition-all ${
                              i <= strength ? strengthColors[strength] : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="bg-[#fffbe6] border border-yellow-100 rounded-2xl px-4 py-3 flex gap-3 items-start">
                  <span className="text-[#f5c000] mt-0.5 shrink-0">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#f5c000" strokeWidth="2" />
                      <path d="M12 8v4m0 4h.01" stroke="#f5c000" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <p className="text-xs text-gray-500 leading-snug">
                    En créant votre compte, vous acceptez nos{' '}
                    <a href="#" className="text-[#f5c000] font-semibold underline">Conditions d'utilisation</a>{' '}
                    et{' '}
                    <a href="#" className="text-[#f5c000] font-semibold underline">Politique de confidentialité.</a>
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-extrabold uppercase tracking-widest text-sm text-gray-900 shadow-md transition-all active:scale-95 hover:brightness-105"
                style={{ background: 'linear-gradient(90deg, #f5c000 0%, #ffe566 100%)' }}
              >
                {isLogin ? 'Se connecter' : 'Créer mon compte organisateur'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">
                {isLogin ? 'Pas encore de compte ? ' : 'Vous avez déjà un compte ? '}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#f5c000] text-sm font-bold hover:underline transition-colors"
              >
                {isLogin ? "S'inscrire" : 'Se connecter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerAuth;