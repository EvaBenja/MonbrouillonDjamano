import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ── Icons ── */
const IcoHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);
const IcoEvent = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IcoHeart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IcoBriefcase = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const IcoGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IcoMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const liens = [
  { label: 'Accueil',     Icon: IcoHome,      to: '/'           },
  { label: 'Évènements',  Icon: IcoEvent,     to: '/evenements' },
  { label: 'Expériences', Icon: IcoHeart,     to: '/experiences'},
  { label: 'Services',    Icon: IcoBriefcase, to: '/services'   },
];

const NavbarPages = () => {
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const [langue, setLangue]     = useState('FR');
  const langRef = useRef(null);

  useEffect(() => {
    const h = e => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    if (langOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [langOpen]);

  const isActive = to => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const s = {
    nav: {
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #f0f0f0', fontFamily: 'Poppins, sans-serif',
    },
    inner: {
      maxWidth: 1200, margin: '0 auto', padding: '0 28px',
      height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: 6,
      fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 19,
      color: '#111', fontStyle: 'italic', textDecoration: 'none', letterSpacing: '-0.3px',
    },
    logoCircle: {
      width: 28, height: 28, borderRadius: '50%',
      border: '2.5px solid #FF5A00',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    },
    links: { display: 'flex', alignItems: 'center', gap: 2 },
    link: active => ({
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 16px', borderRadius: 9,
      fontSize: 13.5, fontWeight: active ? 700 : 500,
      color: active ? '#FF5A00' : '#444',
      textDecoration: 'none', transition: 'all .18s',
      borderBottom: active ? '2.5px solid #FF5A00' : '2.5px solid transparent',
      fontFamily: 'Poppins, sans-serif',
    }),
    right: { display: 'flex', alignItems: 'center', gap: 8, position: 'relative' },
    iconBtn: {
      width: 36, height: 36, borderRadius: 9,
      border: '1.5px solid #eee', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', gap: 4,
    },
    langLabel: { fontSize: 11, fontWeight: 600, color: '#555', fontFamily: 'Poppins, sans-serif' },
    modal: {
      position: 'absolute', top: 44, right: 0,
      background: '#fff', borderRadius: 14,
      boxShadow: '0 8px 40px rgba(0,0,0,.13)',
      border: '1px solid #f0f0f0', overflow: 'hidden', minWidth: 140, zIndex: 300,
    },
    modalHeader: {
      padding: '10px 16px 7px', fontSize: 10, fontWeight: 700,
      color: '#aaa', letterSpacing: '1px', borderBottom: '1px solid #f5f5f5',
      fontFamily: 'Poppins, sans-serif',
    },
    modalOpt: sel => ({
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 16px', cursor: 'pointer',
      background: sel ? '#FFF3ED' : '#fff', transition: 'background .15s',
    }),
    modalOptLabel: { fontSize: 13.5, fontWeight: 600, color: '#111', fontFamily: 'Poppins, sans-serif' },
    check: {
      marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%',
      background: '#FF5A00', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
  };

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        {/* Logo */}
        <Link to="/" style={s.logo}>
          <div style={s.logoCircle}>
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <path d="M4 3h5c3.3 0 6 2.7 6 6s-2.7 6-6 6H4V3z"
                stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          djamano
        </Link>

        {/* Nav links */}
        <div style={s.links}>
          {liens.map(({ label, Icon, to }) => (
            <Link key={label} to={to} style={s.link(isActive(to))}>
              <Icon />{label}
            </Link>
          ))}
        </div>

        {/* Right: globe + hamburger */}
        <div style={s.right} ref={langRef}>
          <div style={s.iconBtn} onClick={() => setLangOpen(o => !o)}>
            <IcoGlobe />
            <span style={s.langLabel}>{langue}</span>
          </div>
          <div style={s.iconBtn}><IcoMenu /></div>

          {langOpen && (
            <div style={s.modal}>
              <div style={s.modalHeader}>LANGUE</div>
              {[{ code:'FR', flag:'🇫🇷', label:'Français' }, { code:'US', flag:'🇺🇸', label:'English' }].map(({ code, flag, label }) => (
                <div key={code} style={s.modalOpt(langue === code)}
                  onClick={() => { setLangue(code); setLangOpen(false); }}>
                  <span style={{ fontSize: 18 }}>{flag}</span>
                  <span style={s.modalOptLabel}>{label}</span>
                  {langue === code && (
                    <div style={s.check}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarPages;
