import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('username');
        if (storedUserName) {
        setUserName(storedUserName);
        }
    }, []);
    const profileLetter = userName ? userName.charAt(0).toUpperCase() : '';

    return(
        <header class="header">
            <div className="logo">
                <img className="brand-logo" src={logo} alt="FF Logo" />
                <Link to="/explore" className="brand-title" style={{left: '100px', top: '13px'}} >free for friends</Link>
            </div>
            <nav>
                <Link to="/explore" className="nav-link">Explore</Link>
                <Link to="/calendar" className="nav-link">Calendar</Link>

                <div className="profile">{profileLetter}</div>
            </nav>
        </header>
    );
}

export default Header;