import React, { useState } from 'react';
import './App.css';
import logo from './images/logo.jpg'; // You imported 'logo' but used 'login' below
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const style = {
        branding: {
            left: '20px',
            top: '12px',
        },
        brandTitle: {
            top: '23px',
        },
        inputContainer: {
            position: 'relative',
            left: '449px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        link: {
            display: 'block',
            marginTop: '10px',
            color: '#007BFF',
            textDecoration: 'none',
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/explore');
            } else {
                setError(data.error || 'Login failed. Please check your credentials.');
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

            <div className="login-title">Log In</div>
  
            <div className="input-container" style={{ ...style.inputContainer, top: '293px' }}>
                <input
                    type="text"
                    className="input-box"
                    style={style.input}
                    placeholder="Username"
                    aria-label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="input-container" style={{ ...style.inputContainer, top: '313px' }}>
                <input
                    type="password"
                    className="input-box"
                    style={style.input}
                    placeholder="Password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && (
                <div className="error" style={{ color: 'red', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <div className="login-button-container" style={{ ...style.inputContainer, top: '351px'}}>
                <button className="login-button" style={style.button} onClick={handleLogin}> Log In </button>
            </div>

            <a href="#1" className="link-text" style={{ ...style.link, left: '581px', top: '531px'}}>Forgot your password?</a>
            <a href="#2" className="link-text" style={{ ...style.link, left: '581px', top: '578px'}}>Don’t have an account? Sign up!</a>
        </div>
    );
}

export default Login;