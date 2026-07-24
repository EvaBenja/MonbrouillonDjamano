import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalChoixEvenement from '../composants-communs/ModalChoixEvenement';

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);

const IconAI = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
    <path d="M12 6v5M9 6h6M12 2v2" />
  </svg>
);

const IconServices = () => (
  <img src="/services.png" alt="Services" style={{ width: 18, height: 18, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }} />
);

const IconAbout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconHamburger = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [lang, setLang] = useState('FR');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalEvenement, setModalEvenement] = useState(false);
  const modalRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLangModal(false);
      }
      if (isMobile && isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  /* ── Navigation : scroll sur landing, route vers les autres pages ── */
  const goTo = (target) => {
    setIsMobileMenuOpen(false);
    if (target.startsWith('/')) {
      navigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #f0f0f0',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.3s ease', fontFamily: 'Poppins, sans-serif'
    },
    container: { maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
    logoArea: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'none', border: 'none' },
    logoImg: { height: 45, width: 'auto', objectFit: 'contain' },
    menu: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center', width: '100%' },
    menuBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 500, color: '#444', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
    rightArea: { display: 'flex', alignItems: 'center', gap: 16, position: 'relative' },
    globeBtn: { display: 'flex', alignItems: 'center', gap: 6, background: '#f5f5f5', border: 'none', padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#444' },
    modal: { position: 'absolute', top: '110%', right: 0, background: '#ffffff', borderRadius: 10, border: '1px solid #eef0f2', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 80, zIndex: 1001 },
    modalOpt: (active) => ({ padding: '8px 12px', fontSize: 13, fontWeight: 600, borderRadius: 6, textAlign: 'center', cursor: 'pointer', border: 'none', width: '100%', background: active ? '#FFF3ED' : 'transparent', color: active ? '#FF5A00' : '#444', transition: 'all 0.15s' }),
    hamburgerBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 500, color: '#444', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
    mobileMenu: {
      position: 'absolute', top: '100%', left: 0, right: 0,
      background: 'rgba(255, 255, 255, 0.97)', backdropFilter: 'blur(10px)',
      borderTop: '1px solid #f0f0f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 999,
    },
    mobileMenuBtn: { display: 'block', width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#444', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
  };

  return (
    <>
    <nav style={styles.nav} ref={menuRef}>
      <div style={styles.container}>
        <button style={styles.logoArea} onClick={() => goTo('accueil')}>
          <img src="/djamano.png" alt="Djamano Logo" style={styles.logoImg} />
        </button>

        {!isMobile ? (
          <div style={styles.menu}>
            <button style={styles.menuBtn} onClick={() => goTo('accueil')}><IconHome /> Accueil</button>
            <button style={styles.menuBtn} onClick={() => setModalEvenement(true)}><IconServices /> Évènements</button>
            <button style={styles.menuBtn} onClick={() => goTo('AISection')}><IconAI /> Djamano ai</button>
            <button style={styles.menuBtn} onClick={() => goTo('/services')}><IconServices /> Services</button>
            <button style={styles.menuBtn} onClick={() => goTo('WhatIsSection')}><IconAbout /> A propos</button>
          </div>
        ) : (
          <button style={styles.hamburgerBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <IconHamburger />
          </button>
        )}

        <div style={styles.rightArea} ref={modalRef}>
          <button style={styles.globeBtn} onClick={() => setShowLangModal(!showLangModal)}>
            <IconGlobe />
            <span>{lang}</span>
          </button>
          {showLangModal && (
            <div style={styles.modal}>
              <button style={styles.modalOpt(lang === 'FR')} onClick={() => { setLang('FR'); setShowLangModal(false); }}>FR</button>
              <button style={styles.modalOpt(lang === 'US')} onClick={() => { setLang('US'); setShowLangModal(false); }}>US</button>
            </div>
          )}
        </div>

        {isMobile && isMobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <button style={styles.mobileMenuBtn} onClick={() => goTo('accueil')}><IconHome /> Accueil</button>
            <button style={styles.mobileMenuBtn} onClick={() => { setIsMobileMenuOpen(false); setModalEvenement(true); }}><IconServices /> Évènements</button>
            <button style={styles.mobileMenuBtn} onClick={() => goTo('AISection')}><IconAI /> Djamano ai</button>
            <button style={styles.mobileMenuBtn} onClick={() => goTo('/services')}><IconServices /> Services</button>
            <button style={styles.mobileMenuBtn} onClick={() => goTo('WhatIsSection')}><IconAbout /> A propos</button>
          </div>
        )}
      </div>
    </nav>
    {modalEvenement && <ModalChoixEvenement onClose={() => setModalEvenement(false)} />}
  </>
  );
};

export default Navbar;
