import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarPages from '../composants-communs/NavbarPages';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const EVENEMENTS = {
  1:{ titre:"PRIX DE L'ENTREPRENEURIAT FÉMININ ACT 2", lieu:"CENASA", org:"MBM GROUP", date:"Le 2025-10-30 de 20:00 à 23:55", img:"/evenement1.jpg",
      desc:"La 2e édition des prefe awards met à l'honneur l'entrepreneuriat féminin au burkina faso, sous le thème « entrepreneuriat pour la paix et le développement ». l'événement récompense des initiatives féminines innovantes et favorise les échanges entre entrepreneures, partenaires et invités." },
};

const RESERVATIONS = [
  { client:'Marie Ouédraogo',  date:'05 Fév 2026', heure:'19:30', personnes:4, montant:'18,000 FCFA', statut:'Confirmée'  },
  { client:'Ibrahim Sawadogo', date:'04 Fév 2026', heure:'20:00', personnes:2, montant:'9,000 FCFA',  statut:'Confirmée'  },
  { client:'Aminata Traoré',   date:'03 Fév 2026', heure:'18:45', personnes:6, montant:'27,000 FCFA', statut:'En attente' },
  { client:'Boukary Compaoré', date:'02 Fév 2026', heure:'21:00', personnes:3, montant:'13,500 FCFA', statut:'Confirmée'  },
  { client:'Fatou Diallo',     date:'01 Fév 2026', heure:'19:00', personnes:5, montant:'22,500 FCFA', statut:'Annulée'    },
];

const AVIS = [
  { initiales:'AE', nom:'Alain Emmanuel',  temps:'Il y a 2 jours',  note:5, texte:"Excellent restaurant avec une ambiance chaleureuse. La cuisine est authentique et les plats sont délicieux. Le service est rapide et le personnel très accueillant. Je recommande vivement !" },
  { initiales:'JE', nom:'Jean Emmanuel',   temps:'Il y a 5 jours',  note:4, texte:"Très bon rapport qualité-prix. Les portions sont généreuses et la nourriture est savoureuse. Seul petit bémol : l'attente peut être un peu longue aux heures de pointe." },
  { initiales:'SE', nom:'Sophie Emmanuel', temps:'Il y a 1 semaine', note:3, texte:"Bon restaurant dans l'ensemble mais j'ai trouvé que certains plats manquaient un peu de saveur. L'ambiance est agréable et le cadre sympathique." },
];

const KPIS = [
  { val:'342',  label:'Réservations totales',     pct:'+18%', color:'#16a34a' },
  { val:'289',  label:'Réservations confirmées',  pct:'+22%', color:'#16a34a' },
  { val:'1.5M', label:'Revenus générés (FCFA)',   pct:'+15%', color:'#16a34a' },
  { val:'4.0',  label:'Note moyenne / 5',         pct:null },
];

/* Statut badge */
const Statut = ({ s }) => {
  const cfg = {
    'Confirmée':  { bg:'#f0fdf4', color:'#16a34a', icon:'✓' },
    'En attente': { bg:'#fff7ed', color:'#ea580c', icon:'⏳' },
    'Annulée':    { bg:'#fef2f2', color:'#dc2626', icon:'✕' },
  }[s] || {};
  return (
    <span style={{ background:cfg.bg, color:cfg.color, borderRadius:20, padding:'5px 12px', fontSize:12, fontWeight:600, display:'inline-flex', alignItems:'center', gap:4, fontFamily:'Poppins,sans-serif', whiteSpace:'nowrap' }}>
      {cfg.icon} {s}
    </span>
  );
};

/* Étoiles */
const Etoiles = ({ note }) => (
  <div style={{ display:'flex', gap:2 }}>
    {[1,2,3,4,5].map(i=>(
      <span key={i} style={{ color: i<=note ? '#f59e0b' : '#e5e7eb', fontSize:18 }}>★</span>
    ))}
  </div>
);

/* Image avec fallback */
const Img = ({ src, style={} }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{ ...style, background:'linear-gradient(145deg,#92400e,#d97706)' }}/>
    : <img src={src} alt="" onError={()=>setErr(true)} style={{ ...style, objectFit:'cover', display:'block' }}/>;
};

const IcoPin    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoOrg    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IcoCal    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoTicket = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
const IcoElect  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 11 12 14 22 4"/></svg>;
const IcoStand  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const IcoDown   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoRight  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoUp     = ({ color }) => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>;

const PageStatistiquesEvenement = () => {
  const { id } = useParams();
  const { isMobile } = useResponsive();
  const ev = EVENEMENTS[parseInt(id)] || EVENEMENTS[1];
  const [ongletStats, setOngletStats] = useState('Populaire');

  const infoRows = [
    { ico:<IcoPin/>,    label:'Lieu :',        val:ev.lieu, color:'#16a34a' },
    { ico:<IcoOrg/>,    label:'Organisé Par :', val:ev.org,  color:'#FF5A00' },
    { ico:<IcoCal/>,    label:'Date :',         val:ev.date, color:'#333'    },
    { ico:<IcoTicket/>, label:'Tickets :',      val:'Oui Disponible', color:'#16a34a' },
    { ico:<IcoElect/>,  label:'Elections :',    val:'Oui Disponible', color:'#16a34a' },
    { ico:<IcoStand/>,  label:'Stands :',       val:'Oui Disponible', color:'#16a34a' },
  ];

  const thStyle = { padding:'12px 16px', fontSize:11.5, fontWeight:700, color:'#999', textAlign:'left', background:'#fdf8f6', letterSpacing:'0.5px', fontFamily:'Poppins,sans-serif', whiteSpace:'nowrap' };
  const tdStyle = { padding:'16px', fontSize:13.5, color:'#333', fontFamily:'Poppins,sans-serif', borderBottom:'1px solid #f5f5f5', verticalAlign:'middle' };

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <NavbarPages/>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'28px 16px 60px':'36px 28px 60px' }}>

        {/* ── Titre + Exporter ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:isMobile?18:22, fontWeight:800, color:'#111', cursor:'pointer' }}>
            Statistiques <IcoRight/>
          </div>
          <button style={{ background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:'12px 22px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 14px rgba(255,90,0,.3)', letterSpacing:'0.5px' }}>
            EXPORTER <IcoDown/>
          </button>
        </div>

        {/* ── Carte événement ── */}
        <div style={{ border:'1px solid #efefef', borderRadius:16, overflow:'hidden', display:'grid', gridTemplateColumns:isMobile?'1fr':'280px 1fr', gap:0, marginBottom:32, boxShadow:'0 2px 14px rgba(0,0,0,.06)' }}>
          <div style={{ height:isMobile?200:280, overflow:'hidden' }}>
            <Img src={ev.img} style={{ width:'100%', height:'100%' }}/>
          </div>
          <div style={{ padding:isMobile?20:28 }}>
            <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:'#111', marginBottom:10 }}>{ev.titre}</div>
            <p style={{ fontSize:13, color:'#666', lineHeight:1.72, marginBottom:16 }}>{ev.desc}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {infoRows.map((r,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, fontSize:13.5 }}>
                  {r.ico}
                  <span style={{ color:'#888', minWidth:110 }}>{r.label}</span>
                  <span style={{ color:r.color, fontWeight:600 }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4 KPI cards ── */}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:16, marginBottom:36 }}>
          {KPIS.map((k,i)=>(
            <div key={i} style={{ border:'1px solid #efefef', borderRadius:16, padding:isMobile?'18px 14px':'24px 20px', boxShadow:'0 1px 8px rgba(0,0,0,.05)', position:'relative' }}>
              {k.pct && (
                <span style={{ position:'absolute', top:14, right:14, background:'#f0fdf4', color:'#16a34a', fontSize:11.5, fontWeight:700, padding:'3px 8px', borderRadius:20, display:'flex', alignItems:'center', gap:3 }}>
                  <IcoUp color="#16a34a"/> {k.pct}
                </span>
              )}
              <div style={{ fontSize:isMobile?28:36, fontWeight:900, color:'#111', lineHeight:1.1, marginBottom:8 }}>{k.val}</div>
              <div style={{ fontSize:13, color:'#888', fontFamily:'Poppins,sans-serif' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tableau réservations ── */}
        <div style={{ border:'1px solid #efefef', borderRadius:16, overflow:'hidden', marginBottom:36, boxShadow:'0 1px 8px rgba(0,0,0,.05)' }}>
          <div style={{ padding:'20px 24px 14px', fontSize:16, fontWeight:800, color:'#111' }}>Dernières réservations</div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {['CLIENT','DATE','HEURE','PERSONNES','MONTANT','STATUT'].map(h=>(
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESERVATIONS.map((r,i)=>(
                  <tr key={i} style={{ background: i%2===0?'#fff':'#fafafa' }}>
                    <td style={{ ...tdStyle, fontWeight:700 }}>{r.client}</td>
                    <td style={tdStyle}>{r.date}</td>
                    <td style={tdStyle}>{r.heure}</td>
                    <td style={tdStyle}>{r.personnes} personnes</td>
                    <td style={tdStyle}>{r.montant}</td>
                    <td style={tdStyle}><Statut s={r.statut}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Avis clients ── */}
        <div style={{ border:'1px solid #efefef', borderRadius:16, padding:isMobile?20:28, marginBottom:40, boxShadow:'0 1px 8px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize:16, fontWeight:800, color:'#111', marginBottom:20 }}>Derniers avis clients</div>
          {AVIS.map((a,i)=>(
            <div key={i} style={{ paddingBottom:20, marginBottom: i<AVIS.length-1?20:0, borderBottom: i<AVIS.length-1?'1px solid #f5f5f5':'none' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {/* Avatar initiales */}
                  <div style={{ width:44, height:44, borderRadius:'50%', background:'#FF5A00', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'#fff', fontSize:14, fontWeight:800, fontFamily:'Poppins,sans-serif' }}>{a.initiales}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#111' }}>{a.nom}</div>
                    <div style={{ fontSize:12, color:'#aaa', marginTop:2 }}>{a.temps}</div>
                  </div>
                </div>
                <Etoiles note={a.note}/>
              </div>
              <p style={{ fontSize:13, color:'#555', lineHeight:1.72, margin:0 }}>{a.texte}</p>
            </div>
          ))}
        </div>

        {/* ── Statistiques du moment ── */}
        <div style={{ borderTop:'1px solid #f0f0f0', paddingTop:32 }}>
          <div style={{ fontSize:isMobile?17:20, fontWeight:800, color:'#111', marginBottom:18 }}>
            Les statistiques des meilleurs du moment
          </div>
          <div style={{ display:'flex', gap:28, borderBottom:'1.5px solid #ececec', marginBottom:20, overflowX:'auto' }}>
            {['Populaire','Ouagadougou','Bobo Dioulasso'].map(o=>(
              <div key={o} onClick={()=>setOngletStats(o)} style={{ fontSize:14, fontWeight:ongletStats===o?700:400, color:ongletStats===o?'#111':'#aaa', paddingBottom:10, borderBottom:ongletStats===o?'2.5px solid #111':'2.5px solid transparent', cursor:'pointer', fontFamily:'Poppins,sans-serif', whiteSpace:'nowrap', transition:'all .15s' }}>
                {o}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:isMobile?16:32, overflowX:'auto', paddingBottom:8, scrollbarWidth:'none' }}>
            {['Restauration','Location de matériels sonore','Sécurité évenementiel','Vidéo d\'événement','Traiteur'].map((cat,i)=>(
              <div key={i} style={{ flexShrink:0, fontSize:13, fontWeight:i===0?700:400, color:'#333', paddingBottom:8, borderBottom:i===0?'2px solid #FF5A00':'none', cursor:'pointer', fontFamily:'Poppins,sans-serif', whiteSpace:'nowrap' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

      </div>
      <PiedDePage/>
    </div>
  );
};

export default PageStatistiquesEvenement;
