import React from 'react';
import './App.css';
import logo from './images/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header class="header">
            <div className="logo">
                <img className="brand-logo" src={logo} alt="FF Logo" />
                <Link to="/explore" className="brand-title" style={{left: '100px', top: '13px'}} >free for friends</Link>
            </div>
            <nav>
                <Link to="/explore" className="nav-link">Explore</Link>
                <Link to="/calendar" className="nav-link">Calendar</Link>

                <div class="profile">J</div>
            </nav>
        </header>
    );
}

export default Header;