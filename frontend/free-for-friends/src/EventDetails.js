import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function EventDetails({ deals, username }) {
  const { id } = useParams();
  const item = deals.find(item => item.id.toString() === id);

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [groupChatLink, setGroupChatLink] = useState('');

  const [attendeesInfo, setAttendeesInfo] = useState({
    firstPerson: 'N/A',  // Default values
    numAttendees: 0,
    // message: '6 people are currently going to this event.', // Default message
    message: '0 people are currently going to this event.',
    attendeesList: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRSVPInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_event_rsvp?event_id=${item.id}`);
  
        if (response.ok) {
          const data = await response.json();
          if (data.last_person && data.num_attendees >= 1) {
            setAttendeesInfo({
              firstPerson: data.last_person,  // Last person who RSVP'd
              numAttendees: data.num_attendees,  // Number of attendees
              message: `${data.num_attendees} people are currently going to this event.`, // Updated message
              attendeesList: Array.isArray(data.attendees) ? data.attendees : []
            });
          }
        } else {
          setAttendeesInfo({ firstPerson: 'N/A', numAttendees: 0, message: '0 people are currently going to this event.' });
        }
      } catch (err) {
        console.error('Failed to fetch RSVP info:', err);
      }
    };
  
    fetchRSVPInfo();
  }, [item.id]);

  useEffect(() => {
    // Check localStorage for any saved state of the 'hasJoined' button and attendees info
    if (username) {
      const savedState = localStorage.getItem(`hasJoined-${item.id}-${username}`);
      if (savedState) {
        setHasJoined(JSON.parse(savedState));  // Set from localStorage
      }

      const savedAttendees = JSON.parse(localStorage.getItem(`attendeesInfo-${item.id}`));
      if (savedAttendees) {
        setAttendeesInfo(savedAttendees); // Load saved attendees info from localStorage
      }
    }

    fetchDescription();
  }, [username, item.id]);

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

  const handleGetGroupChat = async () => {
    // Step 1: Check if user is logged in (similar to handleJoinGroupchat)
    if (!username) {
      alert("You must be logged in to join the group chat.");
      return;
    }
  
    try {
      // Step 2: Fetch group chat link (original behavior from handleGetGroupChat)
      const response = await fetch('http://127.0.0.1:5000/api/groupchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: item.id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch group chat: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Step 3: Set group chat link if available
      if (data.group_chat_link) {
        setGroupChatLink(data.group_chat_link);
      } else {
        setGroupChatLink('No group chat link available.');
      }
  
      // Step 4: Now handle the "join event" functionality (mimicking handleJoinGroupchat)
      const joinResponse = await fetch('http://127.0.0.1:5000/api/add_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: item.id,
          username: username,
          name: username,  // Assuming the username is used as the name here
        }),
      });
  
      if (joinResponse.ok) {
        const joinData = await joinResponse.json();
        console.log('Event added:', joinData);
  
        setHasJoined(true);
        localStorage.setItem(`hasJoined-${item.id}-${username}`, JSON.stringify(true));
  
        // Step 5: Update attendee info and store in localStorage
        const updatedAttendees = {
          firstPerson: joinData.last_person,
          numAttendees: joinData.num_attendees,
          message: `${joinData.num_attendees} people are currently going to this event.`,
          attendeesList: joinData.attendees,
        };
        setAttendeesInfo(updatedAttendees);
        console.log("Updated Attendees List:", attendeesInfo.attendeesList);
  
        localStorage.setItem(`attendeesInfo-${item.id}`, JSON.stringify(updatedAttendees));
  
        alert(`Event added successfully and you are now part of the group chat!`);
      } else {
        const joinData = await joinResponse.json();
        console.error('Error response:', joinData);
  
        if (joinData.error && joinData.error === 'Event already added') {
          setHasJoined(true);
          localStorage.setItem(`hasJoined-${item.id}-${username}`, JSON.stringify(true));
          alert('You have already joined this event.');
        } else {
          alert(joinData.error || 'An error occurred while adding you to the event.');
        }
      }
    } catch (error) {
      console.error('Error during the group chat or join event process:', error);
      alert('An error occurred while fetching the group chat link or adding the event.');
    }
  };  

  const attendeeIcons = (Array.isArray(attendeesInfo.attendeesList) ? attendeesInfo.attendeesList : [])
  .slice(0, 4)
  .map((attendee, index) => {
    const initial = attendee.charAt(0).toUpperCase(); // Get first letter of the name
    return <div className="attendee-icon" key={index}>{initial}</div>;
  });

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);


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
            {/* <a href="#attendee-modal" className="view-list-btn">View List</a> */}
            <a href="#" className="view-list-btn" onClick={openModal}>View List</a>
          </div>
          <div className="event-actions">
            <button
              onClick={handleGetGroupChat}
              style={{
                backgroundColor: groupChatLink ? 'red' : 'green',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
            
              {groupChatLink ? 'View Groupchat' : 'Join Groupchat'}
            </button>
            {/* <div id="attendee-modal" className="modal">
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
            </div> */}
            <div className={`modal ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <a href="#" className="close-btn" onClick={closeModal}>&times;</a>
          <h3 className="modal-title">Attendees</h3>
          <ul className="attendee-list">
            {attendeesInfo.attendeesList?.length > 0 ? (
              attendeesInfo.attendeesList.map((attendee, index) => {
                const initial = attendee.charAt(0).toUpperCase();
                return (
                  <li key={index}>
                    <span className="attendee-icon">{initial}</span> {attendee}
                  </li>
                );
              })
            ) : (
              <li>No attendees yet</li>
            )}
          </ul>
        </div>

          </div>
            <button className="btn-primary">Buy Tickets</button>
            <div className="event-price">
              <span className="original-price">{item.original_price}</span>
              <span className="discount-price">{item.discount_price}</span>
              <span className="discount-percentage">-52%</span>
            </div>
          </div>
        </div>

        <p className="attendees-info">
          {attendeesInfo.numAttendees === 0 
            ? "0 people are currently going to this event."
            : `${attendeesInfo.firstPerson} and ${attendeesInfo.numAttendees - 1} other(s) are going.`}
        </p>

        {groupChatLink && (
          <p className="group-chat-link">
            Group Chat Link: <a href={groupChatLink} target="_blank" rel="noopener noreferrer">{groupChatLink}</a>
          </p>
        )}


        <div className="event-description">
          <p>{description}</p>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;
