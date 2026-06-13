import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Profile from './pages/Profile';
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
import TicketCount from './pages/TicketCount';
import Notifications from './pages/Notifications';

// Sous-composant pour accéder au hook useLocation
function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);

  // Détection des pages pour masquer les menus
  const isEventDetailsPage = location.pathname.startsWith('/event/');
  const isTicketCountTicket = location.pathname.startsWith('/tickets/');
  const isPaymentPage = location.pathname.startsWith('/payment/');
  const isPaymentSuccessPage = location.pathname.startsWith('/payment-success');
  const isBilletsPage = location.pathname.startsWith('/my-tickets');
  const isTicketDetailPage = location.pathname.startsWith('/ticket-detail');
  const isSearchPage = location.pathname.startsWith('/search');
  const isLoginPage = location.pathname.startsWith('/login');
  const isRegisterPage = location.pathname.startsWith('/register');
  const isAccountPage = location.pathname.startsWith('/account');
  const isNotificationsPage = location.pathname.startsWith('/notifications');
  const isGroupsPage = location.pathname.startsWith('/groups');
  const isChatPage = location.pathname.startsWith('/chat/');
  const isSettingsPage = location.pathname.startsWith('/settings');

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] max-w-md mx-auto font-sans antialiased relative overflow-hidden">
      
      {/* ─── HALOS FLOUES DE DÉGRADÉ ─── */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {/* 🟢 La Navbar s'affiche uniquement si on n'est pas sur ces pages */}
      {!isEventDetailsPage && !isTicketCountTicket && !isPaymentPage && !isPaymentSuccessPage && !isNotificationsPage && !isChatPage && (
        <Navbar isLoggedIn={isLoggedIn} isOrganizer={isOrganizer}/>
      )}

      {/* 🟢 Le HeaderMobile s'affiche partout SAUF sur ces pages */}
      {!isEventDetailsPage && !isTicketCountTicket && !isPaymentPage && !isPaymentSuccessPage && !isBilletsPage && !isTicketDetailPage && !isSearchPage && !isLoginPage && !isRegisterPage && !isAccountPage && !isNotificationsPage && !isGroupsPage && !isChatPage && !isSettingsPage && <HeaderMobile />}

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
          <Route path="/account" element={<Profile />} />
          <Route path="/settings" element={<Settings setIsLoggedIn={setIsLoggedIn} />} />
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
          <Route path="/tickets/:id" element={<TicketCount />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;