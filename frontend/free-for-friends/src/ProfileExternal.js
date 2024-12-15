import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import rockettes from './rockettes.png';

function ProfileExternal() {
  return (
    <div >
        <div style={{ top: '347.94px', position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center', color: 'black', fontSize: '42.04px', fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word' }}>Juna K</div>
        <div style={{ top: '352.24px', position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center', color: 'black', fontSize: '31.53px', fontFamily: 'Inter, sans-serif', fontWeight: '400', wordWrap: 'break-word' }}>@juna_k</div>
        
        <div style={{ top: '390px', position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ textAlign: 'center', color: '#82805E', fontSize: '30.68px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Year</div>
            <div style={{ textAlign: 'center', color: 'black', fontSize: '30.68px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Senior</div>
        </div>
        <div style={{ top: '400px', position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center' }}> 
            <div style={{ textAlign: 'center', color: '#82805E', fontSize: '30.68px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>School</div>
            <div style={{ textAlign: 'center', color: 'black', fontSize: '30.68px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Barnard</div>
        </div>

       
        <div style={{
            top: '330px', marginLeft: '40.25px', position: 'relative', textAlign: 'left', color: 'black', fontSize: '25.64px', fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word', left: '0', marginTop: '13.5vh'
        }}>
            Interests
        </div>
        <div style={{
        position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '320px'
        }}>

        {/* Row of items (Visual Arts, Food & Drink, Music, Dance) */}
        <div style={{
            display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '3vh', position: 'relative'
        }}>

            {/* Visual Arts */}
            <div style={{ position: 'relative', textAlign: 'center', marginLeft: '15px' }}>
            <div style={{
                width: '19vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                VISUAL ARTS
            </div>
            </div>

            {/* Food & Drink */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
                width: '21vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                FOOD & DRINK
            </div>
            </div>

            {/* Music */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
                width: '10vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                MUSIC
            </div>
            </div>

            {/* Dance */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
                width: '10vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                DANCE
            </div>
            </div>

            {/* Drawing */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
                width: '20vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                DRAWING
            </div>
            </div>

            {/* Drawing */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
                width: '10vw', height: '5vh', background: '#82D4BB', boxShadow: '0px 4.6px 2.63px rgba(130, 128, 94, 0.25)', borderRadius: '13.15px'
            }} />
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', textAlign: 'center', color: 'black', fontSize: '17.1px', fontFamily: 'Inter, sans-serif', fontWeight: '700', letterSpacing: '2.57px', wordWrap: 'break-word'
            }}>
                MOVIES
            </div>
            </div>

        </div>
        </div>




      <div style={{ left: '108.84px', top: '790px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '32.78px', fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word' }}>2 Events Attended</div>

      <img style={{ width: '407.56px', height: '173.11px', left: '108px', top: '846.3px', position: 'absolute', borderRadius: '12.61px' }} src={rockettes} alt="Event 1" />

      <div style={{ width: '461.34px', height: '80.67px', left: '108px', top: '1009.2px', position: 'absolute' }}>
        <div style={{ width: '461.34px', height: '64.7px', color: 'black', fontSize: '12.61px', fontFamily: 'Inter, sans-serif', fontWeight: '600', letterSpacing: '0.63px', wordWrap: 'break-word' }}>
          <br />Christmas Spectacular Starring The Radio City Rockettes P...
        </div>
        <span style={{ color: 'black', fontSize: '12.61px', marginTop: '-30px', fontFamily: 'Inter, sans-serif', fontWeight: '400', letterSpacing: '0.63px', wordWrap: 'break-word' }}>Dec 7th 2024</span>

        <div style={{ width: '461.34px', height: '64.7px' }}>
          <span style={{ color: 'black', fontSize: '12.61px', fontFamily: 'Inter, sans-serif', fontWeight: '400', letterSpacing: '0.63px', wordWrap: 'break-word' }}>Dec 7th 2024</span>
        </div>
      </div>

      <div style={{ width: '462.18px', height: '80.67px', left: '566.82px', top: '1009.2px', position: 'absolute' }}>
        <div style={{ width: '461.34px', height: '64.7px', color: 'black', fontSize: '12.61px', fontFamily: 'Inter, sans-serif', fontWeight: '600', letterSpacing: '0.63px', wordWrap: 'break-word' }}>
          <br />Glow-in-the-Dark Mini Golf at Orpy Glow Golf
        </div>
        <div style={{ width: '461.34px', height: '64.7px' }}>
          <span style={{ color: 'black', fontSize: '12.61px', fontFamily: 'Inter, sans-serif', fontWeight: '600', letterSpacing: '0.63px', wordWrap: 'break-word' }}>
            <br />
          </span>
          <span style={{ color: 'black', fontSize: '12.61px', fontFamily: 'Inter, sans-serif', fontWeight: '400', letterSpacing: '0.63px', wordWrap: 'break-word' }}>Nov 1st 2024</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileExternal;