import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatIsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const s = {
    section: { background: '#fff', padding: 'clamp(60px, 8vw, 90px) 24px', fontFamily: 'Poppins, sans-serif' },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    title: {
      fontSize: 34, fontWeight: 800, color: '#111',
      fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.6px',
      marginBottom: 40, lineHeight: 1.2,
    },
    orange: { color: '#FF5A00' },
    btns: { display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 },
    btnOrange: {
      background: '#FF5A00', color: '#fff',
      padding: '14px 32px', borderRadius: 12,
      fontSize: 15, fontWeight: 600, fontFamily: 'Poppins, sans-serif',
      border: 'none', cursor: 'pointer',
      boxShadow: '0 6px 22px rgba(255,90,0,.3)',
      transition: 'all .2s',
    },
    imgWrap: {
      width: '100%', borderRadius: 18, overflow: 'hidden',
      minHeight: 280, maxHeight: 540,
      position: 'relative', 
    },
    video: {
      width: '100%', height: '100%',
      objectFit: 'cover', 
      display: 'block',
    },
    videoOverlay: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     
      background: isPlaying ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.15)', 
      zIndex: 2,
      transition: 'background 0.3s ease',
    },
    centerPlayBtn: {
      width: 76,
      height: 76,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
      transition: 'transform 0.2s ease, opacity 0.3s ease',
    }
  };

  return (
    <section style={s.section}>
      <div style={s.wrapper}>
        <h2 style={s.title}>
          <span style={s.orange}>Djamano</span>, c'est quoi ?
        </h2>
        
        <div style={s.btns}>
          <button onClick={() => navigate('/creer-evenement')} style={s.btnOrange}>Créer un évènement</button>
        </div>
        
      
        <div style={s.imgWrap}>
          <video
            ref={videoRef}
            src="/what-is-video.mp4"
            style={s.video}
            loop
            playsInline
          
            onClick={togglePlay} 
          />
          
       
          <div style={s.videoOverlay} onClick={togglePlay}>
            <button 
              style={s.centerPlayBtn} 
              title={isPlaying ? "Mettre en pause" : "Lancer la vidéo"}
            >
              {isPlaying ? (
           
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5A00">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
              
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5A00" style={{ marginLeft: 4 }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;