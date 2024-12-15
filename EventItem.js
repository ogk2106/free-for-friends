import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function EventItem({item}) {
    console.log(item);
    return(
        <div className="event-card">
       <Link to= {`/event/${item.id}`}><img src={item.image_url} className="event-card-image" /> </Link>
        <Link to= {`/event/${item.id}`}><h3 className="event-card-title">{item.title}</h3> </Link>
        <p className="event-attendees">Olivia and 6 others are going</p>
        <p className="event-card-price">
          <span className="original-price">{item.original_price}</span>
          <span className="discount-price">{item.discounted_price}</span>
        </p>
        <p className="event-card-meta">{item.location}</p>
      </div>
    );

}
export default EventItem;