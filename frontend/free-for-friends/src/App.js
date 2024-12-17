import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Explore from './Explore';
import EventDetails from './EventDetails';
import Calendar from './Calendar';
import Signup from './Signup';
import Login from './Login';
import ProfileExternal from './ProfileExternal';

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);  // Track app loading state
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const navigate = useNavigate();

  console.log('App component rendered, username:', username);

  // Adding a loading check to prevent premature redirects
  useEffect(() => {
    // Wait for username to be loaded before deciding on redirects
    if (username === null) {
      console.log("No username, redirecting to signup...");
      setLoading(false);  // Allow page to load with signup
      navigate('/login'); // redirect to signup
    } else {
      console.log("Fetching deals...");
      fetchDeals();
    }
  }, [username, navigate]);

  // Fetching the deals from the API
  const fetchDeals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/scrape?url=https://www.groupon.com/local/new-york-city/things-to-do');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDeals(data);
      setLoading(false);  // Stop loading once deals are fetched
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // If app is still loading, show loading screen
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <HeaderWrapper /> {/* This will render the header if necessary */}
      <Routes>
        <Route path="/" element={<Signup setUsername={setUsername} />} />
        <Route path="/explore" element={<Explore deals={deals} />} />
        <Route path="/event/:id" element={<EventDetails deals={deals} username={username} />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/externalprofile" element={<ProfileExternal />} />
      </Routes>
    </>
  );
}

// HeaderWrapper component
function HeaderWrapper() {
  const location = useLocation();
  if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/') {
    return null;
  }
  return <Header />;
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}