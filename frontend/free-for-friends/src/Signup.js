import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './images/logo.jpg';

function Signup({ setUsername }) {
  const style = {
    branding: {
      left: '20px',
      top: '12px',
    },
    brandTitle: {
      top: '23px',
    },
    inputContainer: {
      left: '449px',
      position: 'relative',
    },
    termsText: {
      top: '12px',
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, phone, password, confirmPassword } = formData;

    if (!name || !username || !email || !phone || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'test',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({ error: 'Invalid JSON response' }));
      console.log('Backend response:', data);

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div>
        <div className="branding" style={style.branding}>
        <div className="brand-title" style={style.brandTitle}>free for friends</div>
            <img className="brand-logo" src={logo} alt="FF Logo" />
        </div>

        <div className="signup-title">Sign Up</div>
        <div className="tagline">Connect with fellow Columbia University students through discounted events.</div>

        <form onSubmit={handleSubmit}>
          <div className="input-container" style={{ ...style.inputContainer, top: '313px' }}>
            <input
              type="text"
              className="input-box"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-container" style={{ ...style.inputContainer, top: '336px' }}>
            <input
              type="text"
              className="input-box"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-container" style={{ ...style.inputContainer, top: '359px' }}>
            <input
              type="email"
              className="input-box"
              placeholder="Email (@columbia.edu)"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container" style={{ ...style.inputContainer, top: '382px' }}>
            <input
              type="tel"
              className="input-box"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-container" style={{ ...style.inputContainer, top: '405px' }}>
            <input
              type="password"
              className="input-box"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-container" style={{ ...style.inputContainer, top: '428px' }}>
            <input
              type="password"
              className="input-box"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

        {/* {error && <div className="error">{error}</div>} */}

          <div className="terms-container">
            <input type="checkbox" className="checkbox" />
            <div className="terms-text" style={style.termsText}>
              <span className="normal-text">I have read and agree to the </span>
              <a href="#1" className="underline-text">Terms of Use.</a>
            </div>
          </div>

          <div className="createaccount-button-container">
            <button type="submit" className="createaccount-button">Create Account</button>
          </div>
        </form>
        {error && (
          <div className="popup-error">
            {/* Show the error in a popup */}
            <div className="popup-content">
              <p>{error}</p>
              <button onClick={() => setError(null)}>Close</button>
            </div>
          </div>
        )}

        <Link to="/login" className="login-text">Already have an account? Log In</Link>

    </div>
  );
}

export default Signup;
