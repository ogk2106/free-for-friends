import './App.css';
import EventItem from './EventItem';
import {Link} from 'react-router-dom';

function Explore({deals}) {
return (
    <main className="main-content">
    <section className="featured-event">
        <button className="carousel-btn left">&lt;</button>
        <div className="event-content">
          <div className="event-carousel">
          <img src={deals[0].image_url} className="carousel-image" />
          </div>
          <div className="event-details">
            <h2 className="event-title">{deals[0].title}</h2>
            <div className="event-attendees">
            {/* need to update once the gcs are set up */}
              <div className="attendee-icon">J</div>
              <div className="attendee-icon">A</div>
              <div className="attendee-icon">S</div>
              <div className="attendee-icon">O</div>
              <p>Juna and 12 others are going</p>
            </div>
            <div className="event-meta">
              <span className="original-price">{deals[0].original_price}</span>
              <span className="discount-price">{deals[0].discounted_price}</span>
            </div>
            <p className="event-time-location">
              {deals[0].location}
            </p>
            <Link to= {`/event/${deals[0].id}`}><button className="event-btn">EVENT DETAILS</button></Link>
          </div>
        </div>
        <button className="carousel-btn right">&gt;</button>
      </section>
      
      

    <div className="pagination-dots">
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>

    <section className="event-filter">
      <select className="filter-dropdown">
        <option>Manhattan, NY</option>
      </select>
      <select className="filter-dropdown">
        <option>This week</option>
      </select>
      <select className="filter-dropdown">
        <option>Anyone</option>
        <option>With Friends</option>
      </select>
      <select className="filter-dropdown">
        <option>Price</option>
      </select>
    </section>

    <h2 className="events-heading">Events for You</h2>

    <section className="event-grid">
    {deals.map((eventItem, index) => (
        <EventItem item={eventItem} />
    ))}
    </section>
  </main>
);
}
export default Explore;