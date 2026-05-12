import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Tag, CreditCard, ArrowLeft } from 'lucide-react';
import { allEvents } from '../data/events'; // Importation de la source unique

const EventDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // On cherche l'event précis. parseInt est crucial car l'id de l'URL est un string.
  const event = allEvents.find(e => e.id === parseInt(id));

  if (!event) {
    return <div className="p-20 text-center font-bold text-[#1e2da7]">Évènement non trouvé.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20">
      <Link to={-1} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] mb-6 transition-colors font-semibold">
        <ArrowLeft size={20} /> Retour
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        <img src={event.image} alt={event.title} className="w-full h-64 md:h-96 object-cover" />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-blue-100 text-[#1e2da7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {event.theme}
              </span>
              <h1 className="text-4xl font-black text-[#1e2da7] mt-2 tracking-tighter uppercase">{event.title}</h1>
            </div>
            <div className="text-3xl font-black text-[#f06292]">{event.price}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-xl"><MapPin size={24} className="text-[#1e2da7]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Lieu</p>
                  <p className="font-semibold text-lg">{event.city}, {event.countryFlag}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-xl"><Calendar size={24} className="text-[#1e2da7]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Date</p>
                  <p className="font-semibold text-lg">{event.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-xl"><Clock size={24} className="text-[#1e2da7]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Heure</p>
                  <p className="font-semibold text-lg">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="bg-gray-100 p-3 rounded-xl"><Tag size={24} className="text-[#1e2da7]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Type</p>
                  <p className="font-semibold text-lg">Présentiel</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-[#1e2da7] text-white font-bold rounded-2xl hover:bg-[#f06292] transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-blue-100">
            <CreditCard size={22} /> Payer ma place
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;