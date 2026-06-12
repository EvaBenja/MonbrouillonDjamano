import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IconBack  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconGlobe = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconMenu  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;

const EntetePageDetail = ({ titre, droite }) => {
  const navigate = useNavigate();
  const [modalLang, setModalLang] = useState(false);
  const [langue, setLangue] = useState('FR');
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setModalLang(false); };
    if (modalLang) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [modalLang]);

  const s = {
    bar: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px', borderBottom: '1px solid #f5f5f5',
      background: '#fff', position: 'sticky', top: 0, zIndex: 100,
    },
    left: { display: 'flex', alignItems: 'center', gap: 12 },
    backBtn: {
      width: 36, height: 36, borderRadius: 10,
      border: '1.5px solid #eee', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    },
    titreWrap: { fontSize: 15, fontWeight: 700, color: '#111', fontFamily: 'Poppins, sans-serif' },
    titreFleche: { color: '#ccc', fontWeight: 300, margin: '0 4px' },
    right: { display: 'flex', alignItems: 'center', gap: 8, position: 'relative' },
    iconBtn: {
      width: 36, height: 36, borderRadius: 10,
      border: '1.5px solid #eee', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    },
    modal: {
      position: 'absolute', top: 44, right: 0,
      background: '#fff', borderRadius: 14,
      boxShadow: '0 8px 40px rgba(0,0,0,.13)',
      border: '1px solid #f0f0f0', overflow: 'hidden',
      minWidth: 140, zIndex: 200,
    },
    modalHeader: { padding: '10px 16px 7px', fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: '1px', borderBottom: '1px solid #f5f5f5' },
    modalOpt: (sel) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', background: sel ? '#FFF3ED' : '#fff' }),
    check: { marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#FF5A00', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  };

  return (
    <div style={s.bar}>
      <div style={s.left}>
        <div style={s.backBtn} onClick={() => navigate(-1)}><IconBack /></div>
        {titre && (
          <div style={s.titreWrap}>
            {titre} <span style={s.titreFleche}>&rsaquo;</span>
          </div>
        )}
      </div>
      <div style={s.right} ref={ref}>
        {droite || (
          <>
            <div style={s.iconBtn} onClick={() => setModalLang(o => !o)}>
              <IconGlobe />
            </div>
            <div style={s.iconBtn}><IconMenu /></div>
          </>
        )}
        {modalLang && (
          <div style={s.modal}>
            <div style={s.modalHeader}>LANGUE</div>
            {[{ code: 'FR', flag: '🇫🇷', label: 'Français' }, { code: 'US', flag: '🇺🇸', label: 'English' }].map(({ code, flag, label }) => (
              <div key={code} style={s.modalOpt(langue === code)} onClick={() => { setLangue(code); setModalLang(false); }}>
                <span style={{ fontSize: 16 }}>{flag}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111', fontFamily: 'Poppins, sans-serif' }}>{label}</span>
                {langue === code && <div style={s.check}><svg width="10" height="10" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntetePageDetail;
