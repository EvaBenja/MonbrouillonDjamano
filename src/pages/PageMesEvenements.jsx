import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPages from '../composants-communs/NavbarPages';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const evtImg = n => `/evenement${(n % 14) + 1}.jpg`;
const fallbacks = [
  'linear-gradient(145deg,#92400e,#d97706)','linear-gradient(145deg,#1d4ed8,#4338ca)',
  'linear-gradient(145deg,#065f46,#059669)','linear-gradient(145deg,#7c3aed,#6d28d9)',
  'linear-gradient(145deg,#be185d,#ec4899)','linear-gradient(145deg,#0891b2,#06b6d4)',
];

const EVENEMENTS = Array.from({length:9}, (_,i) => ({
  id: i+1,
  titre: 'SALLE CLIMATISÉE',
  description: "Plongez Dans Une Bulle De Fraîcheur Instantanée. Grâce À Notre Système De Climatisation Intelligente De Dernière Génération, Nous Vous Garantissons Une Température Constante Et Optimale, Quel Que Soit Le Thermomètre Extérieur. Fini L'Inconfort Des Chaleurs Estivales : Ici, Vos Collaborateurs Et Proches Profitent D'un Air Purifié Et D'une Atmosphère Apaisante Du Début À La Fin.",
  img: evtImg(i),
  fb: fallbacks[i % fallbacks.length],
}));

const PERIODES = ['7 Derniers Jours','30 Derniers Jours','3 Derniers Mois','Cette Année'];

const IcoChevron = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IcoStats   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoChevRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

const BtnOutline = ({ children, red, onClick }) => (
  <button onClick={onClick} style={{ border:`1.5px solid ${red?'#ef4444':'#FF5A00'}`, background:'#fff', color:red?'#ef4444':'#FF5A00', borderRadius:8, padding:'9px 16px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap' }}>
    {children}
  </button>
);

const Img = ({ src, fallback }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{ width:'100%', height:'100%', background:fallback }}/>
    : <img src={src} alt="" onError={()=>setErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>;
};

const PageMesEvenements = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [periode, setPeriode] = useState('7 Derniers Jours');
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <NavbarPages/>

      <div style={{ maxWidth:1200, margin:'0 auto', padding: isMobile?'28px 16px 48px':'40px 28px 60px' }}>

        {/* Titre + bouton créer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <div onClick={()=>navigate('/mes-evenements')} style={{ display:'flex', alignItems:'center', gap:4, fontSize: isMobile?18:22, fontWeight:800, color:'#111', cursor:'pointer' }}>
            Mes Évènements <IcoChevRight/>
          </div>
          <button onClick={()=>navigate('/creer-evenement')} style={{ background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:isMobile?'10px 16px':'12px 24px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:6, boxShadow:'0 4px 14px rgba(255,90,0,.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Créer un évènement
          </button>
        </div>

        {/* Dropdown période */}
        <div style={{ position:'relative', display:'inline-block', marginBottom:28 }}>
          <div
            onClick={() => setDropOpen(o=>!o)}
            style={{ display:'flex', alignItems:'center', gap:10, border:'1.5px solid #e0e0e0', borderRadius:24, padding:'10px 20px', fontSize:14, fontWeight:600, color:'#333', cursor:'pointer', background:'#fff', fontFamily:'Poppins,sans-serif', userSelect:'none' }}
          >
            {periode} <IcoChevron/>
          </div>
          {dropOpen && (
            <div style={{ position:'absolute', top:'110%', left:0, background:'#fff', border:'1.5px solid #e8e8e8', borderRadius:14, boxShadow:'0 8px 28px rgba(0,0,0,.1)', zIndex:100, minWidth:200, overflow:'hidden' }}>
              {PERIODES.map(p=>(
                <div key={p} onClick={()=>{ setPeriode(p); setDropOpen(false); }} style={{ padding:'12px 20px', fontSize:13.5, color: p===periode?'#FF5A00':'#333', fontWeight: p===periode?700:400, cursor:'pointer', fontFamily:'Poppins,sans-serif', borderBottom:'1px solid #f5f5f5', background: p===periode?'#FFF3ED':'#fff' }}>
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KPI cards */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr 1fr':'repeat(2,220px)', gap:16, marginBottom:40 }}>
          <div style={{ border:'1.5px solid #e8e8e8', borderRadius:16, padding: isMobile?'18px 14px':'24px 28px', boxShadow:'0 2px 10px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: isMobile?28:36, fontWeight:800, color:'#111', lineHeight:1.1 }}>204</div>
            <div style={{ fontSize:13, color:'#888', marginTop:8, fontFamily:'Poppins,sans-serif' }}>Total de Tickets vendus</div>
          </div>
          <div style={{ border:'1.5px solid #e8e8e8', borderRadius:16, padding: isMobile?'18px 14px':'24px 28px', boxShadow:'0 2px 10px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: isMobile?24:32, fontWeight:800, color:'#111', lineHeight:1.1 }}>505 000</div>
            <div style={{ fontSize:13, fontWeight:600, color:'#111', marginTop:2 }}>FCFA</div>
            <div style={{ fontSize:13, color:'#888', marginTop:6, fontFamily:'Poppins,sans-serif' }}>Total Revenus</div>
          </div>
        </div>

        {/* Grille événements — 3 colonnes desktop, 1 mobile */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap: isMobile?16:20 }}>
          {EVENEMENTS.map(ev=>(
            <div key={ev.id} style={{ border:'1px solid #efefef', borderRadius:14, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,.06)' }}>
              <div style={{ height: isMobile?160:190, overflow:'hidden' }}>
                <Img src={ev.img} fallback={ev.fb}/>
              </div>
              <div style={{ padding:'14px 16px' }}>
                <div style={{ fontSize:13.5, fontWeight:800, color:'#111', textTransform:'uppercase', marginBottom:8 }}>{ev.titre}</div>
                <p style={{ fontSize:12, color:'#666', lineHeight:1.65, marginBottom:14 }}>{ev.description}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <BtnOutline onClick={()=>navigate(`/modifier-evenement/${ev.id}`)}>Modifier</BtnOutline>
                  <BtnOutline onClick={()=>navigate(`/statistiques-evenement/${ev.id}`)}><IcoStats/> Statistiques</BtnOutline>
                  <BtnOutline red>Supprimer</BtnOutline>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PiedDePage/>
    </div>
  );
};

export default PageMesEvenements;
