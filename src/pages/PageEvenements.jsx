import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

/* ── Couleurs affiches ── */
const palettes = [
  ['#7c2d12','#c2410c'],  // rouge foncé
  ['#1e3a8a','#1d4ed8'],  // bleu
  ['#3b0764','#7e22ce'],  // violet
  ['#14532d','#15803d'],  // vert
  ['#1c1917','#44403c'],  // noir
  ['#7f1d1d','#dc2626'],  // rouge vif
  ['#0c4a6e','#0369a1'],  // bleu ciel
  ['#365314','#4d7c0f'],  // vert olive
  ['#831843','#be185d'],  // rose
  ['#1a1a2e','#16213e'],  // marine
  ['#4a044e','#86198f'],  // magenta
  ['#042f2e','#065f46'],  // emeraude
];

const SECTIONS = [
  {
    id: 'proche',
    titre: 'Évènements · proche de vous',
    items: [
      { id:1, titre:"Prix de l'Entrepreneuriat Féminin act 2", lieu:"CENASA",                           org:"MBM Group",            date:"Le Jeudi 30 Septembre",  b1:'Gratuit', b2:'Pass',     pal:0 },
      { id:2, titre:"FESTIVAL DE LA COHESION SAHELIENNE",       lieu:"Rossignol à Wemtenga",            org:"ASSEC",                date:"Du 25 au 26 Octobre",    b1:'Pass',                   pal:1 },
      { id:3, titre:"BOUGOUSSO de la diversité",                lieu:"Au Wakanda",                      org:"ZOMALECT",             date:"Du 20 Mars au 25 Mars",  b1:'5.500 Fr',               pal:2 },
      { id:4, titre:"SOIREE KARAOKE",                           lieu:"Cosy Corner",                     org:"Cosy Corner",          date:"Vendredi 11 Octobre",    b1:'Gratuit',                pal:3 },
    ],
  },
  {
    id: 'ouaga',
    titre: 'Évènements · Ouagadougou',
    items: [
      { id:5, titre:"SOIREE KARAOKE",               lieu:"Cosy Corner",                          org:"Cosy Corner",    date:"Vendredi 11 Octobre",    b1:'Gratuit', pal:4 },
      { id:6, titre:"JEUNES COULEURS AMNBIANCE",    lieu:"Situé derrière l'ex IAM Ouaga 2000",   org:"SQUASH TIME",    date:"Jeudi 28 Août",          b1:'Gratuit', pal:5 },
      { id:7, titre:"ORCHESTRE BANA M'BOKA",        lieu:"Situé derrière l'ex IAM Ouaga 2000",   org:"SQUASH TIME",    date:"Samedi 20 Septembre",    b1:'Pass',    pal:6 },
      { id:8, titre:"FESTIVAL DU JAZZ",             lieu:"Palais des Sports",                    org:"MBM Group",      date:"Samedi 5 Octobre",       b1:'Gratuit', pal:7 },
    ],
  },
  {
    id: 'bobo',
    titre: 'Évènements · Bobo Dioulasso',
    items: [
      { id:9,  titre:"SOIREE ANIMATION DEEJAY",    lieu:"COSY CORNER",                         org:"SITHO",                      date:"Samedi 21 Décembre",  b1:'Gratuit', pal:8  },
      { id:10, titre:"BOUGOUSSO de la diversité",  lieu:"Musée National du Burkina Faso",      org:"Co . MNBF & PCIM INTS",      date:"Mercredi 15 Octobre", b1:'Gratuit', pal:9  },
      { id:11, titre:"FUTUR MAKER NIGHT",          lieu:"ELPARA GA",                           org:"NEXUS",                      date:"Vendredi 10 Octobre", b1:'Gratuit', pal:10 },
    ],
  },
  {
    id: 'autres',
    titre: 'Évènements · Autres villes',
    items: [
      { id:12, titre:"MISTER KOFF EN LIVE",            lieu:"Situé derrière l'ex IAM Ouaga 2000", org:"SQUASH TIME", date:"Du 20 Mars au 25 Mars", b1:'Gratuit', pal:11 },
      { id:13, titre:"SUMMER PARTY",                   lieu:"AFRICA FESTIVAL",                    org:"SUBIACO",     date:"Mardi 16 Novembre",      b1:'Gratuit', pal:0  },
      { id:14, titre:"ROOTS AFRICAN FASHION PARTY",    lieu:"ACCRA AIRPORT",                      org:"CULTURE",     date:"Jeudi 28 Décembre",      b1:'Gratuit', pal:1  },
    ],
  },
];

/* ── Badge ── */
const Badge = ({ txt }) => {
  if (!txt) return null;
  let bg = '#111', color = '#fff';
  if (txt === 'Gratuit') { bg = '#22c55e'; color = '#fff'; }
  else if (txt === 'Pass') { bg = '#111'; color = '#fff'; }
  else { bg = '#FF5A00'; color = '#fff'; } // prix
  return (
    <span style={{ background:bg, color, fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20, fontFamily:'Poppins,sans-serif' }}>
      {txt}
    </span>
  );
};

/* ── Icônes info ── */
const IcoPin  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoOrg  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IcoCal  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

/* ── Carte Évènement ── */
const CarteEvenement = ({ ev, onClick }) => {
  const [c1, c2] = palettes[ev.pal];
  const s = {
    card: { background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid #efefef', cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,.06)', transition:'transform .2s,box-shadow .2s' },
    affiche: { width:'100%', height:200, background:`linear-gradient(145deg,${c1},${c2})`, position:'relative', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:10 },
    badges: { display:'flex', gap:5 },
    titreImg: { color:'#fff', fontSize:12, fontWeight:800, fontFamily:'Poppins,sans-serif', lineHeight:1.3, letterSpacing:'0.2px', textShadow:'0 1px 4px rgba(0,0,0,.4)' },
    body: { padding:'12px 13px 14px' },
    nom: { fontSize:12.5, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif', marginBottom:7, lineHeight:1.3 },
    info: { display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'#777', fontFamily:'Poppins,sans-serif', marginBottom:4 },
    btn: { marginTop:10, width:'100%', background:'#FF5A00', color:'#fff', border:'none', borderRadius:8, padding:'9px 0', fontSize:12.5, fontWeight:600, fontFamily:'Poppins,sans-serif', cursor:'pointer' },
  };
  return (
    <div style={s.card} onClick={onClick}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(0,0,0,.1)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 10px rgba(0,0,0,.06)'; }}>
      <div style={s.affiche}>
        <div style={s.badges}>
          <Badge txt={ev.b1} />
          {ev.b2 && <Badge txt={ev.b2} />}
        </div>
        <div style={s.titreImg}>{ev.titre}</div>
      </div>
      <div style={s.body}>
        <div style={s.nom}>{ev.titre}</div>
        <div style={s.info}><IcoPin />{ev.lieu}</div>
        <div style={s.info}><IcoOrg />{ev.org}</div>
        <div style={s.info}><IcoCal />{ev.date}</div>
        <button style={s.btn}>Détails</button>
      </div>
    </div>
  );
};

/* ── Section avec slider ── */
const SectionSlider = ({ section, onSelect }) => {
  const [start, setStart] = useState(0);
  const PER_PAGE = 3;
  const canLeft  = start > 0;
  const canRight = start + PER_PAGE < section.items.length;

  const s = {
    wrap: { marginBottom: 48 },
    head: { display:'flex', alignItems:'center', marginBottom:18 },
    titre: { fontSize:16.5, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif', flex:1 },
    fleche: { fontSize:13, color:'#FF5A00', fontWeight:700, cursor:'pointer' },
    sliderWrap: { position:'relative' },
    grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 },
    navBtn: (active, side) => ({
      position:'absolute', top:'50%', transform:'translateY(-50%)',
      [side]: -16,
      width:34, height:34, borderRadius:'50%',
      background: active ? '#fff' : 'rgba(255,255,255,0.4)',
      boxShadow: active ? '0 2px 12px rgba(0,0,0,.14)' : 'none',
      border: '1px solid #eee',
      display:'flex', alignItems:'center', justifyContent:'center',
      cursor: active ? 'pointer' : 'default',
      opacity: active ? 1 : 0.3, zIndex:2, color:'#333',
    }),
  };

  return (
    <div style={s.wrap}>
      <div style={s.head}>
        <span style={s.titre}>{section.titre}</span>
        <span style={s.fleche}>&nbsp;&rsaquo;</span>
      </div>
      <div style={s.sliderWrap}>
        <div style={s.navBtn(canLeft,'left')} onClick={() => canLeft && setStart(s => s - 1)}>
          <IcoLeft />
        </div>
        <div style={s.grid}>
          {section.items.slice(start, start + PER_PAGE).map(ev => (
            <CarteEvenement key={ev.id} ev={ev} onClick={() => onSelect(ev.id)} />
          ))}
        </div>
        <div style={s.navBtn(canRight,'right')} onClick={() => canRight && setStart(s => s + 1)}>
          <IcoRight />
        </div>
      </div>
    </div>
  );
};

/* ── Barre de recherche ── */
const BarreRecherche = () => {
  const [type, setType]   = useState('');
  const [loc,  setLoc]    = useState('');
  const [date, setDate]   = useState('');
  const s = {
    wrap: {
      background:'#fff', borderRadius:16,
      boxShadow:'0 4px 28px rgba(0,0,0,.09)',
      border:'1px solid #efefef',
      display:'flex', alignItems:'center', overflow:'hidden',
    },
    field: { flex:1, padding:'16px 22px', borderRight:'1px solid #efefef', display:'flex', flexDirection:'column', gap:3 },
    label: { fontSize:10, fontWeight:700, color:'#bbb', letterSpacing:'1px', textTransform:'uppercase', fontFamily:'Poppins,sans-serif' },
    input: { border:'none', outline:'none', fontSize:13.5, color:'#333', fontFamily:'Poppins,sans-serif', background:'transparent', fontWeight:400 },
    btn: { background:'#FF5A00', color:'#fff', border:'none', borderRadius:0, padding:'0 28px', height:'100%', minHeight:72, fontSize:14, fontWeight:600, fontFamily:'Poppins,sans-serif', cursor:'pointer', display:'flex', alignItems:'center', gap:8 },
  };
  return (
    <div style={s.wrap}>
      <div style={s.field}>
        <span style={s.label}>Type de recherche</span>
        <input style={s.input} placeholder="Ajouter" value={type} onChange={e=>setType(e.target.value)}/>
      </div>
      <div style={s.field}>
        <span style={s.label}>Localisation</span>
        <input style={s.input} placeholder="Ajouter" value={loc} onChange={e=>setLoc(e.target.value)}/>
      </div>
      <div style={{ ...s.field, borderRight:'none' }}>
        <span style={s.label}>Date</span>
        <input style={s.input} placeholder="Quand ?" value={date} onChange={e=>setDate(e.target.value)} type="date"/>
      </div>
      <button style={s.btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Rechercher
      </button>
    </div>
  );
};

/* ── Pagination ── */
const Pagination = ({ page, total, onChange }) => {
  const s = {
    wrap: { display:'flex', justifyContent:'center', alignItems:'center', gap:8, padding:'20px 0 40px' },
    btn: active => ({
      width:36, height:36, borderRadius:'50%',
      border: active?'none':'1.5px solid #e0e0e0',
      background: active?'#FF5A00':'#fff',
      color: active?'#fff':'#555',
      fontSize:13, fontWeight: active?700:400,
      fontFamily:'Poppins,sans-serif',
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
    }),
    arrow: { width:32, height:32, borderRadius:'50%', border:'1.5px solid #e0e0e0', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#555' },
  };
  return (
    <div style={s.wrap}>
      <div style={s.arrow} onClick={() => page > 1 && onChange(page - 1)}><IcoLeft /></div>
      {[...Array(total)].map((_,i) => (
        <div key={i} style={s.btn(i+1===page)} onClick={() => onChange(i+1)}>{i+1}</div>
      ))}
      <div style={s.arrow} onClick={() => page < total && onChange(page + 1)}><IcoRight /></div>
    </div>
  );
};

/* ══ PAGE ÉVÈNEMENTS ══ */
const PageEvenements = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      {/* Barre recherche */}
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 24px 0' }}>
        <BarreRecherche />
      </div>

      {/* Sections */}
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'44px 24px 0' }}>
        {SECTIONS.map(sec => (
          <SectionSlider key={sec.id} section={sec} onSelect={id => navigate(`/evenements/${id}`)} />
        ))}
        <Pagination page={page} total={4} onChange={setPage} />
      </div>

      {/* Stats + Footer */}
      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageEvenements;
