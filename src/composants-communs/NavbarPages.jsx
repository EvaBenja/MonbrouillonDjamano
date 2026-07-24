import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useResponsive from './useResponsive';

const IcoHome      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>;
const IcoEvent     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoHeart     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IcoBriefcase = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const IcoGlobe     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IcoMenu      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcoClose     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const liens = [
  { label:'Accueil',     Icon:IcoHome,      to:'/'            },
  { label:'Évènements',  Icon:IcoEvent,     to:'/evenements'  },
  { label:'Expériences', Icon:IcoHeart,     to:'/experiences' },
  { label:'Services',    Icon:IcoBriefcase, to:'/services'    },
];

const NavbarPages = () => {
  const location = useLocation();
  const [langOpen,  setLangOpen]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langue,    setLangue]    = useState('FR');
  const { isMobile } = useResponsive();
  const langRef = useRef(null);

  /* Fermer modal langue au clic extérieur */
  useEffect(() => {
    const h = e => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    if (langOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [langOpen]);

  /* Fermer menu mobile au changement de page */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = to => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  const navigate = useNavigate();

  return (
    <>
      <nav style={{ position:'sticky', top:0, zIndex:1000, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid #f0f0f0', fontFamily:'Poppins,sans-serif' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 20px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
            <img src="/djamano.png" alt="Djamano" style={{ height:38, width:'auto', objectFit:'contain' }}/>
          </Link>

          {/* Liens desktop */}
          {!isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              {liens.map(({ label, Icon, to }) => {
                const active = isActive(to);
                return (
                  <Link key={label} to={to} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 15px', borderRadius:9, fontSize:13.5, fontWeight:active?700:500, color:active?'#FF5A00':'#444', textDecoration:'none', borderBottom:active?'2.5px solid #FF5A00':'2.5px solid transparent', transition:'all .18s', fontFamily:'Poppins,sans-serif' }}>
                    <Icon /> {label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Droite : globe + cloche + avatar profil + hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap:8, position:'relative' }} ref={langRef}>
            {/* Globe langue */}
            <div onClick={() => setLangOpen(o=>!o)} style={{ width:36, height:36, borderRadius:9, border:'1.5px solid #eee', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <IcoGlobe/>
            </div>

            {/* Avatar profil cliquable → /profil (desktop uniquement) */}
            {!isMobile && (
              <div onClick={() => navigate('/profil')} style={{ width:36, height:36, borderRadius:'50%', overflow:'hidden', cursor:'pointer', border:'2px solid #FF5A00', flexShrink:0 }}>
                <img src="/experiences/personne1.jpg" alt="profil" onError={e=>e.target.style.display='none'} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
            )}

            {/* Hamburger */}
            <div
              onClick={() => setMenuOpen(o=>!o)}
              style={{ width:36, height:36, borderRadius:9, border:'1.5px solid #eee', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}
            >
              {menuOpen ? <IcoClose/> : <IcoMenu/>}
            </div>

            {/* Modal langue */}
            {langOpen && (
              <div style={{ position:'absolute', top:44, right:0, background:'#fff', borderRadius:14, boxShadow:'0 8px 40px rgba(0,0,0,.13)', border:'1px solid #f0f0f0', overflow:'hidden', minWidth:140, zIndex:300 }}>
                <div style={{ padding:'10px 16px 7px', fontSize:10, fontWeight:700, color:'#aaa', letterSpacing:'1px', borderBottom:'1px solid #f5f5f5', fontFamily:'Poppins,sans-serif' }}>LANGUE</div>
                {[{code:'FR',flag:'🇫🇷',label:'Français'},{code:'US',flag:'🇺🇸',label:'English'}].map(({code,flag,label})=>(
                  <div key={code} onClick={()=>{setLangue(code);setLangOpen(false);}} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 16px', cursor:'pointer', background:langue===code?'#FFF3ED':'#fff' }}>
                    <span style={{ fontSize:18 }}>{flag}</span>
                    <span style={{ fontSize:13.5, fontWeight:600, color:'#111', fontFamily:'Poppins,sans-serif' }}>{label}</span>
                    {langue===code && (
                      <div style={{ marginLeft:'auto', width:18, height:18, borderRadius:'50%', background:'#FF5A00', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Menu mobile déroulant ── */}
        {isMobile && menuOpen && (
          <div style={{ background:'#fff', borderTop:'1px solid #f0f0f0', padding:'8px 0 16px' }}>
            {liens.map(({ label, Icon, to }) => {
              const active = isActive(to);
              return (
                <Link
                  key={label} to={to}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 24px', fontSize:15, fontWeight:active?700:500, color:active?'#FF5A00':'#333', textDecoration:'none', borderLeft: active?'3px solid #FF5A00':'3px solid transparent', background:active?'#FFF3ED':'transparent', fontFamily:'Poppins,sans-serif' }}
                >
                  <Icon/> {label}
                </Link>
              );
            })}
            {/* Liens supplémentaires */}
            <div style={{ borderTop:'1px solid #f5f5f5', margin:'8px 0' }}/>
            {[
              { label:'Mon Profil',            to:'/profil' },
              { label:'Mes Évènements',        to:'/mes-evenements' },
              { label:'Créer un évènement',    to:'/creer-evenement' },
              { label:'Proposer un service',   to:'/proposer-service' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 24px', fontSize:14, fontWeight:400, color:'#555', textDecoration:'none', fontFamily:'Poppins,sans-serif' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavbarPages;
