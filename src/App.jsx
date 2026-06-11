import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeaderMobile from './components/HeaderMobile';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import Payment from './pages/Payment';
import MyTickets from './pages/MyTickets';
import TicketDetail from './pages/TicketDetail';
import Settings from './pages/Settings';
import MentionsLegales from './pages/MentionsLegales';
import GroupsList from './pages/GroupsList';
import ChatView from './pages/ChatView';
import PaymentSuccess from './pages/PaymentSuccess';
import OrganizerAuth from './pages/OrganizerAuth';
import OrganizerDashboard from './pages/OrganizerDashboard';
import OrganizerRevenue from './pages/OrganizerRevenue';
import OrganizerProfile from './pages/OrganizerProfile';
import OrganizerTickets from './pages/OrganizerTickets';
import OrganizerEngagement from './pages/OrganizerEngagement';
import OrganizerEventDetail from './pages/OrganizerEventDetail';
import OrganizerCreateEvent from './pages/OrganizerCreateEvent';
import EventCreationSuccess from './pages/EventCreationSuccess';
import OrganizerSupport from './pages/OrganizerSupport'; 

function App() {
  // État global de connexion (simulé)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);

  return (
    <Router>
      {/* Conteneur Mobile-First Global de l'App.
        On remplace bg-gray-50 par ton fond crème bg-[#FDFBF7], max-w-md, et position relative.
      */}
      <div className="flex flex-col min-h-screen bg-[#FDFBF7] max-w-md mx-auto font-sans antialiased relative overflow-hidden">
        
        {/* ─── HALOS FLOUES DE DÉGRADÉ (Placés à la racine de l'app) ─── */}
        <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
          {/* Tâche Jaune Pastel (En haut à gauche) */}
          <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
          {/* Tâche Violette Pastel (En haut à droite) */}
          <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        </div>

        {/* Le HeaderMobile étant en bg-transparent, il laisse maintenant voir 
          parfaitement les deux halos ci-dessus qui montent tout en haut de l'écran.
        */}
        <Navbar isLoggedIn={isLoggedIn} isOrganizer={isOrganizer}/>
        <HeaderMobile />

        {/* Le contenu des pages passe au-dessus via un z-10 relatif */}
        <main className="flex-grow pb-20 md:pb-0 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/ticket-detail/:id" element={<TicketDetail />} />
            <Route path="/account" element={<Settings setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/groups" element={<GroupsList />} />
            <Route path="/chat/:id" element={<ChatView />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/organizer/login" element={<OrganizerAuth setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} />} />
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/stats/revenue" element={<OrganizerRevenue />} />
            <Route path="/organizer/stats/tickets" element={<OrganizerTickets />} />
            <Route path="/organizer/stats/engagement" element={<OrganizerEngagement />} />
            <Route path="/organizer/event/:id" element={<OrganizerEventDetail />} />
            <Route path="/organizer/create" element={<OrganizerCreateEvent />} />
            <Route path="/organizer/create-success" element={<EventCreationSuccess />} />
            <Route path="/organizer/support" element={<OrganizerSupport />} />
            <Route path="/organizer/profile" element={<OrganizerProfile />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;