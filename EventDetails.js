import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

function EventDetails({deals}) {
  const { id } = useParams();
  console.log(id)
  const item = deals.find(item => item.id.toString() === id);
  console.log(item)

  //using the second flask route to get the description for that event
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDescription();
  }, []);

  const fetchDescription = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/description?url=${encodeURIComponent(item.link)}`
      );      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDescription(data.description || 'No description available.');
    } catch (err) {
      setError(`Failed to fetch description: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="event-details-page">
    <section className="event-hero">
      <img src={item.image_url} className="event-image" />
    </section>

    <section className="event-info">
        <h1 className="event-title">
          {item.title}
        </h1>
      
        <div className="event-metadata">
          <div className="event-metadata-item">
            <h4 className="metadata-heading">Date & Time</h4>
            <p>Sat, Dec 7th at 10:00PM</p>
          </div>
          <div className="event-metadata-item">
            <h4 className="metadata-heading">Location</h4>
            <p>{item.location}</p>
          </div>
        </div>
      
        <div className="event-top-row">
          <div className="event-attendees">
            <div className="attendee-icon">J</div>
            <div className="attendee-icon">K</div>
            <div className="attendee-icon">S</div>
            <div className="attendee-icon">O</div>
            <a href="#attendee-modal" className="view-list-btn">View List</a>
          </div>
          <div className="event-actions">
            <button className="btn-secondary">Join Groupchat</button>
            <button className="btn-primary">Buy Tickets</button>
            <div className="event-price">
              <span className="original-price">{item.original_price}</span>
              <span className="discount-price">{item.discount_price}</span>
              <span className="discount-percentage">-52%</span> {/*make dynamic*/}
            </div>
          </div>
        </div>
        <p className="attendees-info">Juna and 12 others are going.</p> 

        <div id="attendee-modal" className="modal">
            <div className="modal-content">
              <a href="#" className="close-btn">&times;</a>
              <h3 className="modal-title">Friends</h3>
              <ul className="attendee-list">
                <li><span className="attendee-icon">J</span> Juna K.</li>
                <li><span className="attendee-icon">K</span> Kynnedy S.</li>
                <li><span className="attendee-icon">S</span> Sheen Z.</li>
                <li><span className="attendee-icon">O</span> Olivia K.</li>
                <li><span className="attendee-icon">A</span> Anika K.</li>
                <li><span className="attendee-icon">L</span> Luisa S.</li>
              </ul>
            </div>
          </div>
      
        <div className="event-description">
          {description}
        </div>
      </section>
      
  </main>
  );
}

export default EventDetails;
