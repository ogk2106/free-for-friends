import React, { useState, useEffect } from 'react';
import Explore from './Explore';
import EventDetails from './EventDetails';
import { BrowserRouter as Router, Routes, Route } from
'react-router-dom';

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
    <Routes>
      <Route path="/" element={<Explore deals={deals}/>} />
      <Route path="/event/:id" element={<EventDetails deals={deals}/>} />
    </Routes>
    </Router>
  );
}

export default App;
