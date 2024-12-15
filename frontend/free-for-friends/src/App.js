import React, { useState, useEffect } from 'react';
import Header from './Header';
import Explore from './Explore';
import EventDetails from './EventDetails';
import Calendar from './Calendar'
import Signup from './Signup'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // connecting to flask to get all the groupon deals
  useEffect(() => {
    fetchDeals();
  }, []);
  
  const fetchDeals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/scrape?url=https://www.groupon.com/local/new-york-city/things-to-do');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setDeals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/explore" element={<Explore deals={deals} />} />
        <Route path="/event/:id" element={<EventDetails deals={deals} />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/') {
    return null;
  }
  return <Header />;
}

export default App;
