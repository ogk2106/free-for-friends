import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function EventItem({item}) {
    console.log(item);

    const [attendeesInfo, setAttendeesInfo] = useState({
      firstPerson: '',
      numAttendees: 0,
      message: '',
    });
  
    useEffect(() => {
      // Load attendees info from localStorage
      const storedAttendeesInfo = JSON.parse(localStorage.getItem(`attendeesInfo-${item.id}`));
      
      if (storedAttendeesInfo) {
        setAttendeesInfo(storedAttendeesInfo);
      } else {
        // Default message if no data found in localStorage
        setAttendeesInfo({
          firstPerson: '',
          numAttendees: 0,
          message: 'No one has joined yet.',
        });
      }
    }, [item.id]);
    
    return(
        <div className="event-card">
       <Link to= {`/event/${item.id}`}><img src={item.image_url} className="event-card-image" /> </Link>
        <Link to= {`/event/${item.id}`}><h3 className="event-card-title">{item.title}</h3> </Link>
        <p className="attendees-info">
        {attendeesInfo.numAttendees === 0
          ? "0 people are currently going to this event."
          : `${attendeesInfo.firstPerson} and ${attendeesInfo.numAttendees - 1} other friend(s) are going.`}
        </p>
        <p className="event-card-price">
          <span className="original-price">{item.original_price}</span>
          <span className="discount-price">{item.discounted_price}</span>
        </p>
        <p className="event-card-meta">{item.location}</p>
      </div>
    );

}
export default EventItem;