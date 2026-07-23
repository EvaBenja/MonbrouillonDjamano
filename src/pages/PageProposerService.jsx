import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPages from '../composants-communs/NavbarPages';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const IcoChevron = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IcoPin     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoDollar  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IcoApercu  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoArrow   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IcoChevronRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

/* Zone d'upload photo */
const ZonePhoto = ({ idx }) => {
  const [preview, setPreview] = useState(null);
  const ref = useRef();
  const onChange = e => {
    const f = e.target.files[0];
    if (f) setPreview(URL.createObjectURL(f));
  };
  return (
    <div
      onClick={() => ref.current.click()}
      style={{ width:'100%', aspectRatio:'1/1', borderRadius:16, overflow:'hidden', background:'rgba(255,255,255,0.18)', border:'2px dashed rgba(255,255,255,0.35)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}
    >
      {preview
        ? <img src={preview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        : (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            {/* Icône image placeholder */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            {/* Bouton + orange */}
            <div style={{ width:36, height:36, borderRadius:'50%', background:'#FF5A00', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(255,90,0,.4)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
        )
      }
      <input ref={ref} type="file" accept="image/*" onChange={onChange} style={{ display:'none' }}/>
    </div>
  );
};

/* Toggle switch */
const Toggle = ({ label, value, onChange }) => (
  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
    <span style={{ fontSize:14, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif' }}>{label}</span>
    <div
      onClick={() => onChange(!value)}
      style={{ width:46, height:26, borderRadius:13, background:value?'#FF5A00':'#ddd', position:'relative', cursor:'pointer', transition:'background .2s', flexShrink:0 }}
    >
      <div style={{ position:'absolute', top:3, left:value?22:3, width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,.2)', transition:'left .2s' }}/>
    </div>
  </div>
);

/* Select dropdown stylisé */
const SelectField = ({ label, options }) => {
  const [open, setOpen] = useState(false);
  const [val, setVal]   = useState('');
  return (
    <div style={{ position:'relative', marginBottom:12 }}>
      <div
        onClick={() => setOpen(o=>!o)}
        style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', background:'#fff', fontFamily:'Poppins,sans-serif' }}
      >
        <span style={{ fontSize:14, color: val?'#111':'#aaa' }}>{val || label}</span>
        <IcoChevron/>
      </div>
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'#fff', border:'1.5px solid #e8e8e8', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.1)', zIndex:100, overflow:'hidden', marginTop:4 }}>
          {options.map(o=>(
            <div key={o} onClick={()=>{ setVal(o); setOpen(false); }} style={{ padding:'13px 18px', fontSize:14, color:'#333', cursor:'pointer', fontFamily:'Poppins,sans-serif', borderBottom:'1px solid #f5f5f5' }}>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Input simple */
const InputField = ({ placeholder, icon }) => (
  <div style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', display:'flex', alignItems:'center', gap:10, marginBottom:12, background:'#fff' }}>
    {icon}
    <input placeholder={placeholder} style={{ border:'none', outline:'none', fontSize:14, color:'#333', fontFamily:'Poppins,sans-serif', background:'transparent', width:'100%' }}/>
  </div>
);

const PageProposerService = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [reservable,   setReservable]   = useState(true);
  const [disponible,   setDisponible]   = useState(true);

  const inputStyle = { border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', fontSize:14, color:'#333', fontFamily:'Poppins,sans-serif', background:'#fff', width:'100%', outline:'none', boxSizing:'border-box' };

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <NavbarPages/>

      {/* ── BANNIÈRE ORANGE avec photos ── */}
      <div style={{ background:'#FF5A00', padding: isMobile?'28px 20px 36px':'36px 80px 48px', position:'relative', overflow:'hidden' }}>
        {/* Motif de fond semi-transparent */}
        <div style={{ position:'absolute', inset:0, opacity:0.08, backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize:'40px 40px' }}/>

        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:isMobile?16:18, fontWeight:800, color:'#fff', marginBottom:24, cursor:'pointer', position:'relative', zIndex:1 }}>
          Proposer un service <IcoChevronRight/>
        </div>

        {/* 4 zones d'upload */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'repeat(2,1fr)':'repeat(4,1fr)', gap:isMobile?12:20, maxWidth:800, position:'relative', zIndex:1 }}>
          {[0,1,2,3].map(i=><ZonePhoto key={i} idx={i}/>)}
        </div>
      </div>

      {/* ── FORMULAIRE ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding: isMobile?'28px 16px 40px':'36px 40px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'1fr 1fr', gap: isMobile?20:40, alignItems:'start' }}>

          {/* Colonne gauche */}
          <div>
            <InputField placeholder="Titre du service"/>
            <InputField placeholder="Lieu" icon={<IcoPin/>}/>
            <SelectField label="Catégorie" options={['Restauration','Pâtisserie','Location','Service traiteur','Sécurité','Sonorisation']}/>
            <SelectField label="Créneau"   options={['Matin','Après-midi','Soir','Toute la journée','Weekend']}/>
            <InputField placeholder="Prix" icon={<IcoDollar/>}/>

            <div style={{ margin:'20px 0 8px' }}>
              <Toggle label="Ce service est réservable"      value={reservable} onChange={setReservable}/>
            </div>
            {reservable && (
              <InputField placeholder="Pourcentage d'acompte pour réservation" icon={<IcoDollar/>}/>
            )}
            <Toggle label="Ce service est disponible actuellemnt" value={disponible} onChange={setDisponible}/>
          </div>

          {/* Colonne droite — Description */}
          <div>
            <textarea
              placeholder="Description"
              style={{ ...inputStyle, height: isMobile?180:320, resize:'vertical', lineHeight:1.7 }}
            />
          </div>
        </div>

        {/* ── Boutons du bas ── */}
        <div style={{ display:'flex', gap:isMobile?10:16, marginTop:36, flexDirection: isMobile?'column':'row' }}>
          <button style={{ flex:1, border:'1.5px solid #e0e0e0', background:'#fff', color:'#333', borderRadius:12, padding:'14px 0', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>
            Enregistrer comme brouillon
          </button>
          <button style={{ flex:1, border:'1.5px solid #e0e0e0', background:'#fff', color:'#333', borderRadius:12, padding:'14px 0', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <IcoApercu/> Aperçu
          </button>
          <button style={{ flex:1, background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:'14px 0', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 6px 20px rgba(255,90,0,.3)' }}>
            Publier <IcoArrow/>
          </button>
        </div>
      </div>

      <PiedDePage/>
    </div>
  );
};

export default PageProposerService;
