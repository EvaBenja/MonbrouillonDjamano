import React from 'react';
import { useNavigate } from 'react-router-dom';

const IcoVisiteur = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IcoActeur = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
    <path d="M10 9l2 2 4-4"/>
  </svg>
);

const IcoClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ModalChoixEvenement = ({ onClose }) => {
  const navigate = useNavigate();

  const choisir = (type) => {
    onClose();
    if (type === 'visiteur') navigate('/evenements');
    else navigate('/mes-evenements');
  };

  return (
    <div
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'Poppins,sans-serif' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:'#fff', borderRadius:20, padding:36, width:'100%', maxWidth:520, boxShadow:'0 20px 60px rgba(0,0,0,.18)', position:'relative' }}
      >
        {/* Bouton fermer */}
        <div onClick={onClose} style={{ position:'absolute', top:16, right:16, width:32, height:32, borderRadius:'50%', background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <IcoClose/>
        </div>

        {/* Titre */}
        <div style={{ fontSize:20, fontWeight:800, color:'#111', marginBottom:8, textAlign:'center' }}>
          Comment souhaitez-vous continuer ?
        </div>
        <div style={{ fontSize:13.5, color:'#888', textAlign:'center', marginBottom:32 }}>
          Choisissez votre profil pour accéder aux évènements
        </div>

        {/* 2 cartes */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

          {/* Visiteur */}
          <div
            onClick={() => choisir('visiteur')}
            style={{ border:'2px solid #efefef', borderRadius:16, padding:'28px 20px', textAlign:'center', cursor:'pointer', transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.border='2px solid #FF5A00'; e.currentTarget.style.background='#FFF3ED'; }}
            onMouseLeave={e => { e.currentTarget.style.border='2px solid #efefef'; e.currentTarget.style.background='#fff'; }}
          >
            <div style={{ width:72, height:72, borderRadius:'50%', background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#555' }}>
              <IcoVisiteur/>
            </div>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:8 }}>Visiteur</div>
            <div style={{ fontSize:12.5, color:'#888', lineHeight:1.6 }}>
              Parcourez et découvrez les évènements disponibles près de vous
            </div>
          </div>

          {/* Acteur culturel */}
          <div
            onClick={() => choisir('acteur')}
            style={{ border:'2px solid #FF5A00', borderRadius:16, padding:'28px 20px', textAlign:'center', cursor:'pointer', background:'#FFF3ED', transition:'all .2s', position:'relative' }}
            onMouseEnter={e => { e.currentTarget.style.background='#FFE8D6'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#FFF3ED'; }}
          >
            {/* Badge recommandé */}
            <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'#FF5A00', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 12px', borderRadius:20, whiteSpace:'nowrap' }}>
              Organisateur
            </div>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(255,90,0,0.12)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#FF5A00' }}>
              <IcoActeur/>
            </div>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:8 }}>Acteur Culturel</div>
            <div style={{ fontSize:12.5, color:'#888', lineHeight:1.6 }}>
              Créez vos évènements, gérez les tickets, stands, élections et consultez vos statistiques
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChoixEvenement;
