import React, { useEffect } from 'react';
import { ShieldCheck, Scale, Globe } from 'lucide-react';

const MentionsLegales = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 my-12 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#1e2da7] p-3 rounded-2xl text-white shadow-lg shadow-blue-100">
          <Scale size={32} />
        </div>
        <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter">Mentions Légales</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 space-y-10 text-gray-600 leading-relaxed">
        
        {/* Section 1 : Éditeur */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-black text-[#1e2da7] uppercase mb-4">
            <Globe size={20} /> 1. Édition du site
          </h2>
          <p>
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site <strong>SparkUp</strong> l'identité des différents intervenants dans le cadre de sa réalisation :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li><strong>Propriétaire du site :</strong> Adrien Macaire - Étudiant Web Design</li>
            <li><strong>Contact :</strong> adrien.macaire@example.com</li>
            <li><strong>Établissement :</strong> MyDigitalSchool Lyon</li>
          </ul>
        </section>

        {/* Section 2 : Hébergement */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-black text-[#1e2da7] uppercase mb-4">
            <ShieldCheck size={20} /> 2. Hébergement
          </h2>
          <p>
            Le site est un projet pédagogique réalisé dans le cadre d'un cursus étudiant. 
            Il est hébergé localement ou sur des plateformes de démonstration (ex: Vercel / Netlify).
          </p>
        </section>

        {/* Section 3 : Propriété intellectuelle */}
        <section className="border-t border-gray-50 pt-10">
          <h2 className="text-xl font-black text-[#1e2da7] uppercase mb-4">3. Propriété intellectuelle</h2>
          <p>
            Adrien Macaire est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images (sourcées via Unsplash), graphismes, logos et icônes.
          </p>
          <p className="mt-2 text-sm italic">
            Note : Les logos OL et PSG utilisés dans le cadre des démonstrations restent la propriété de leurs marques respectives.
          </p>
        </section>

        {/* Section 4 : Données personnelles */}
        <section className="border-t border-gray-50 pt-10">
          <h2 className="text-xl font-black text-[#1e2da7] uppercase mb-4">4. CNIL et gestion des données</h2>
          <p>
            Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l'utilisateur du site dispose d'un droit d'accès, de modification et de suppression des informations collectées. 
            Le site SparkUp ne collecte aucune donnée à des fins commerciales sans consentement préalable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MentionsLegales;