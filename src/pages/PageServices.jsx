import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const grads = [
  ['#92400e','#d97706'], ['#065f46','#059669'], ['#4338ca','#6366f1'],
  ['#be185d','#ec4899'], ['#dc2626','#ef4444'], ['#0891b2','#06b6d4'],
  ['#1d4ed8','#3b82f6'], ['#1a1a1a','#404040'], ['#0369a1','#0284c7'],
  ['#7c3aed','#8b5cf6'], ['#065f46','#10b981'], ['#6d28d9','#8b5cf6'],
];

const SECTIONS = [
  {
    id:'proche', titre:'Services · proche de vous',
    items:[
      { id:1, nom:'Catine Africaine', desc:'4.500 fr et 6.000 fr / La semaine en ville et hors ville puis 14.500 fr et 17.500 fr / Le mois', note:4.33, g:0 },
      { id:2, nom:'MAM SANK',        desc:"Nous proposons une grande variété de plats burkinabè pour satisfaire les goûts de nos visiteurs.", note:5.00, g:1 },
      { id:3, nom:'Le Gondwana',     desc:"Un restaurant, galerie d'art, qui offre plusieurs espaces, chacun aménagé dans un style différent.", note:4.10, g:2 },
      { id:4, nom:'BSL Communication',desc:"Spécialiste en Communication digitale et stratégie Digitale Événementielle.", note:5.00, g:3 },
    ],
  },
  {
    id:'ouaga', titre:'Services · Ouagadougou',
    items:[
      { id:5, nom:'bsl communication', desc:"Spécialiste en Communication digitale. Stratégie Digitale Événementielle Assistance Management.", note:5.00, g:4 },
      { id:6, nom:'Ptit Paris',        desc:"Restaurant Pâtisserie situé à Petit Paris, 2 étages, d'une capacité de 143 couverts.", note:4.00, g:5 },
      { id:7, nom:'fairy-tale-event',  desc:"Une structure qui existe depuis 2016 et qui vous accompagne dans l'organisation de vos évènements.", note:4.00, g:6 },
    ],
  },
  {
    id:'bobo', titre:'Services · Bobo Dioulasso',
    items:[
      { id:8,  nom:'La maison blanche 4g', desc:"Découvrez l'ambiance animée de la Maison Blanche 4G Bobo, une discothèque de premier ordre.", note:5.00, g:7 },
      { id:9,  nom:'KPI Security SARL',   desc:"Depuis plus d'une décennie, KPI Security SARL s'est imposée comme un leader dans la sécurité.", note:4.30, g:8 },
      { id:10, nom:'Complexe Yampoutin',  desc:"Le Complexe Yampoutin est un lieu d'exception, parfait pour accueillir vos événements.", note:5.00, g:9 },
    ],
  },
  {
    id:'autres', titre:'Services · Autres villes',
    items:[
      { id:11, nom:'Salle de fête OR', desc:'Dites : oui je le veux avec style dans la toute nouvelle salle de mariage au centre ville.', note:3.30, g:10 },
      { id:12, nom:'SWISS GLACES',    desc:"Nos locations de machines Ice Cream en suisse sont à disposition de tous les publics.", note:5.00, g:11 },
      { id:13, nom:'SALEM SONORE',    desc:"Le meilleur rapport qualité/prix de la capitale en matière de salle de répète.", note:4.33, g:0  },
    ],
  },
];

const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

const EtoileNote = ({ note }) => {
  const n = Math.round(note * 2) / 2;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:2 }}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} style={{ fontSize:11, color: i<=Math.floor(n)?'#FF5A00':'#ddd' }}>★</span>
      ))}
      <span style={{ fontSize:11, color:'#888', marginLeft:3, fontFamily:'Poppins,sans-serif' }}>{note.toFixed(2)}</span>
    </div>
  );
};

const CarteService = ({ svc, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [c1,c2] = grads[svc.g];
  const s = {
    card: { background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid #f0f0f0', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,.05)', transition:'transform .2s,box-shadow .2s' },
    imgWrap: { position:'relative' },
    img: { width:'100%', height:185, background:`linear-gradient(145deg,${c1},${c2})`, display:'block' },
    heart: { position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,.1)' },
    body: { padding:'12px 14px 14px' },
    nom: { fontSize:12, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.3px' },
    desc: { fontSize:12, color:'#777', lineHeight:1.65, fontFamily:'Poppins,sans-serif', marginBottom:7 },
  };
  return (
    <div style={s.card} onClick={onClick}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.09)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,.05)';}}>
      <div style={s.imgWrap}>
        <div style={s.img}/>
        <div style={s.heart} onClick={e=>{e.stopPropagation();setLiked(l=>!l);}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={liked?'#FF5A00':'none'} stroke={liked?'#FF5A00':'#aaa'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
      </div>
      <div style={s.body}>
        <div style={s.nom}>{svc.nom}</div>
        <div style={s.desc}>{svc.desc}</div>
        <EtoileNote note={svc.note}/>
      </div>
    </div>
  );
};

const SectionSlider = ({ section, onSelect }) => {
  const [start, setStart] = useState(0);
  const PER = 3;
  const canLeft  = start > 0;
  const canRight = start + PER < section.items.length;
  const navBtn = (active, side) => ({ position:'absolute', top:'50%', transform:'translateY(-50%)', [side]:-16, width:34, height:34, borderRadius:'50%', background:active?'#fff':'rgba(255,255,255,0.4)', boxShadow:active?'0 2px 12px rgba(0,0,0,.14)':'none', border:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'center', cursor:active?'pointer':'default', opacity:active?1:0.3, zIndex:2, color:'#333' });
  return (
    <div style={{ marginBottom:48 }}>
      <div style={{ display:'flex', alignItems:'center', marginBottom:18 }}>
        <span style={{ fontSize:16.5, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif', flex:1 }}>{section.titre}</span>
        <span style={{ fontSize:13, color:'#FF5A00', fontWeight:700 }}>&nbsp;&rsaquo;</span>
      </div>
      <div style={{ position:'relative' }}>
        <div style={navBtn(canLeft,'left')} onClick={()=>canLeft&&setStart(s=>s-1)}><IcoLeft /></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {section.items.slice(start,start+PER).map(svc=>(
            <CarteService key={svc.id} svc={svc} onClick={()=>onSelect(svc.id)}/>
          ))}
        </div>
        <div style={navBtn(canRight,'right')} onClick={()=>canRight&&setStart(s=>s+1)}><IcoRight /></div>
      </div>
    </div>
  );
};

const BarreRecherche = () => {
  const s = {
    wrap: { background:'#fff', borderRadius:16, boxShadow:'0 4px 28px rgba(0,0,0,.09)', border:'1px solid #efefef', display:'flex', alignItems:'stretch', overflow:'hidden' },
    field: { flex:1, padding:'16px 22px', borderRight:'1px solid #efefef', display:'flex', flexDirection:'column', gap:3 },
    label: { fontSize:10, fontWeight:700, color:'#bbb', letterSpacing:'1px', textTransform:'uppercase', fontFamily:'Poppins,sans-serif' },
    input: { border:'none', outline:'none', fontSize:13.5, color:'#333', fontFamily:'Poppins,sans-serif', background:'transparent' },
    btn: { background:'#FF5A00', color:'#fff', border:'none', padding:'0 28px', fontSize:14, fontWeight:600, fontFamily:'Poppins,sans-serif', cursor:'pointer', display:'flex', alignItems:'center', gap:8 },
  };
  return (
    <div style={s.wrap}>
      <div style={s.field}><span style={s.label}>Type de recherche</span><input style={s.input} placeholder="Ajouter"/></div>
      <div style={s.field}><span style={s.label}>Localisation</span><input style={s.input} placeholder="Ajouter"/></div>
      <div style={{ ...s.field, borderRight:'none' }}><span style={s.label}>Date</span><input style={s.input} placeholder="Quand ?"/></div>
      <button style={s.btn}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Rechercher
      </button>
    </div>
  );
};

const Pagination = ({ page, total, onChange }) => {
  const navStyle = { width:32, height:32, borderRadius:'50%', border:'1.5px solid #e0e0e0', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#555' };
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, padding:'20px 0 40px' }}>
      <div style={navStyle} onClick={()=>page>1&&onChange(page-1)}><IcoLeft /></div>
      {[...Array(total)].map((_,i)=>(
        <div key={i} onClick={()=>onChange(i+1)} style={{ width:36,height:36,borderRadius:'50%',border:i+1===page?'none':'1.5px solid #e0e0e0',background:i+1===page?'#FF5A00':'#fff',color:i+1===page?'#fff':'#555',fontSize:13,fontWeight:i+1===page?700:400,fontFamily:'Poppins,sans-serif',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>{i+1}</div>
      ))}
      <div style={navStyle} onClick={()=>page<total&&onChange(page+1)}><IcoRight /></div>
    </div>
  );
};

const PageServices = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 24px 0' }}>
        <BarreRecherche />
      </div>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'44px 24px 0' }}>
        {SECTIONS.map(sec=>(
          <SectionSlider key={sec.id} section={sec} onSelect={id=>navigate(`/services/${id}`)}/>
        ))}
        <Pagination page={page} total={4} onChange={setPage}/>
      </div>
      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageServices;
