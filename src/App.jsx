import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeaderMobile from './components/HeaderMobile';
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
import Connexion from './pages/Connexion';
import GroupDetails from './pages/GroupDetails';
import api from './services/api';
import JoinGroupHandler from './pages/JoinGroupHandler';

function AppContent() {
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isOrganizer, setIsOrganizer] = useState(localStorage.getItem('is_organizer') === 'true');

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    const testerConnexion = async () => {
      try {
        const reponse = await api.get('/test-connexion'); 
        console.log("🔥 Connexion réussie ! Voici les données :", reponse.data);
      } catch (erreur) {
        console.error("❌ Aïe, erreur de connexion avec le back :", erreur);
      }
    };
    testerConnexion();
  }, []);

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
  const isOrganizerPages = location.pathname.startsWith('/organizer/login');
  const isOrganizerProfilePage = location.pathname.startsWith('/organizer/profile');
  const isOrganizerCreateEventPage = location.pathname.startsWith('/organizer/create');
  const isConnexionPage = location.pathname.startsWith('/connexion');
  const isGroupDetailsPage = location.pathname.startsWith('/group-details/');

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] w-full font-sans antialiased relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-3xl" />
        <div className="absolute -top-14 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      {!isEventDetailsPage && !isOrganizerCreateEventPage && !isTicketCountTicket && !isPaymentPage && !isPaymentSuccessPage && !isNotificationsPage && !isChatPage && !isConnexionPage && !isGroupDetailsPage && (
        <Navbar isLoggedIn={isLoggedIn} isOrganizer={isOrganizer}/>
      )}

      {!isEventDetailsPage && !isGroupDetailsPage && !isConnexionPage && !isTicketCountTicket && !isOrganizerCreateEventPage && !isOrganizerProfilePage && !isPaymentPage && !isPaymentSuccessPage && !isBilletsPage && !isOrganizerPages && !isTicketDetailPage && !isSearchPage && !isLoginPage && !isRegisterPage && !isAccountPage && !isNotificationsPage && !isGroupsPage && !isChatPage && !isSettingsPage && <HeaderMobile />}

      <main className="flex-grow pb-20 md:pb-0 relative z-10">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
          <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/my-tickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
          <Route path="/ticket-detail/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path="/mentions-legales" element={<ProtectedRoute><MentionsLegales /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><GroupsList /></ProtectedRoute>} />
          <Route path="/chat/:id" element={<ProtectedRoute><ChatView /></ProtectedRoute>} />
          <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/organizer/login" element={<OrganizerAuth setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} />} />
          <Route path="/organizer/dashboard" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
          <Route path="/organizer/stats/revenue" element={<ProtectedRoute><OrganizerRevenue /></ProtectedRoute>} />
          <Route path="/organizer/stats/tickets" element={<ProtectedRoute><OrganizerTickets /></ProtectedRoute>} />
          <Route path="/organizer/stats/engagement" element={<ProtectedRoute><OrganizerEngagement /></ProtectedRoute>} />
          <Route path="/organizer/event/:id" element={<ProtectedRoute><OrganizerEventDetail /></ProtectedRoute>} />
          <Route path="/organizer/create" element={<ProtectedRoute><OrganizerCreateEvent /></ProtectedRoute>} />
          <Route path="/organizer/create-success" element={<ProtectedRoute><EventCreationSuccess /></ProtectedRoute>} />
          <Route path="/organizer/support" element={<ProtectedRoute><OrganizerSupport /></ProtectedRoute>} />
          <Route path="/organizer/profile" element={<ProtectedRoute><OrganizerProfile /></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute><TicketCount /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/group-details/:id" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
          <Route path="/join/:code" element={<JoinGroupHandler />} />
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