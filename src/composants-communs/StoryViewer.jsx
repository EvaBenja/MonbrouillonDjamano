import React, { useState, useEffect, useRef } from 'react';

/* Image avec fallback */
const ImgFb = ({ src, fallback, style = {} }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{ ...style, background: fallback }} />
    : <img src={src} alt="" onError={() => setErr(true)} style={{ ...style, objectFit: 'cover', display: 'block' }} />;
};

const IcoEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcoClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoChevronLeft  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoChevronRight = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

const DUREE_STORY = 5000; // ms par story

/**
 * Viewer de Story plein écran type WhatsApp/Instagram.
 * profil: { nom, statut, img (avatar), fallback }
 * stories: [{ img, fallback, description, vues }]
 */
const StoryViewer = ({ profil, stories, onClose, onNavigerProfilSuivant, onNavigerProfilPrecedent }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const story = stories[index];

  useEffect(() => {
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }
    const step = 100 / (DUREE_STORY / 50);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p + step >= 100) {
          allerSuivant();
          return 0;
        }
        return p + step;
      });
    }, 50);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  const allerSuivant = () => {
    if (index < stories.length - 1) {
      setIndex(i => i + 1);
    } else if (onNavigerProfilSuivant) {
      onNavigerProfilSuivant();
    } else {
      onClose();
    }
  };

  const allerPrecedent = () => {
    if (index > 0) {
      setIndex(i => i - 1);
    } else if (onNavigerProfilPrecedent) {
      onNavigerProfilPrecedent();
    }
  };

  /* Fermer avec Échap */
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
    }}>
      {/* Flèche gauche (desktop) */}
      <div
        onClick={allerPrecedent}
        style={{
          position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.25)', zIndex: 10,
        }}
      >
        <IcoChevronLeft />
      </div>

      {/* Conteneur story */}
      <div
        style={{ width: '100%', maxWidth: 460, height: '100%', maxHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' }}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Barres de progression */}
        <div style={{ display: 'flex', gap: 4, padding: '14px 14px 0' }}>
          {stories.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: '#FF5A00', borderRadius: 2,
                width: i < index ? '100%' : i === index ? `${progress}%` : '0%',
                transition: i === index ? 'none' : 'width .2s',
              }} />
            </div>
          ))}
        </div>

        {/* Header profil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '2px solid #FF5A00', flexShrink: 0 }}>
            <ImgFb src={profil.img} fallback={profil.fallback} style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{profil.nom}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12.5, marginTop: 2 }}>{profil.statut}</div>
          </div>
          <div onClick={onClose} style={{ cursor: 'pointer', padding: 6 }}>
            <IcoClose />
          </div>
        </div>

        {/* Image story */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '8px 18px', minHeight: 0 }}>
          <div style={{ width: '100%', maxHeight: '100%', borderRadius: 16, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImgFb src={story.img} fallback={story.fallback} style={{ width: '100%', maxHeight: 420, objectFit: 'contain' }} />
          </div>
        </div>

        {/* Description */}
        {story.description && (
          <div style={{ color: '#fff', fontSize: 14, lineHeight: 1.6, textAlign: 'center', padding: '12px 24px 4px' }}>
            {story.description}
          </div>
        )}

        {/* Vues */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 0 22px', color: '#fff' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{story.vues}</span>
          <IcoEye />
        </div>

        {/* Zones tactiles invisibles pour naviguer en tapant gauche/droite (mobile) */}
        <div onClick={allerPrecedent} style={{ position: 'absolute', left: 0, top: 60, bottom: 60, width: '35%', cursor: 'pointer' }} />
        <div onClick={allerSuivant}   style={{ position: 'absolute', right: 0, top: 60, bottom: 60, width: '35%', cursor: 'pointer' }} />
      </div>

      {/* Flèche droite (desktop) */}
      <div
        onClick={allerSuivant}
        style={{
          position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.25)', zIndex: 10,
        }}
      >
        <IcoChevronRight />
      </div>
    </div>
  );
};

export default StoryViewer;
