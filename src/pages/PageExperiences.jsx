import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PiedDePage from '../components/PiedDePage';

const grads = [
  ['#1d4ed8','#4338ca'],
  ['#dc2626','#b91c1c'],
  ['#0891b2','#0369a1'],
  ['#065f46','#047857'],
  ['#7c3aed','#6d28d9'],
  ['#b45309','#92400e'],
  ['#be185d','#9d174d'],
  ['#0f766e','#0d9488'],
  ['#1e40af','#1d4ed8'],
];

const SECTIONS = [
  {
    id: 'ouaga',
    titre: "Expériences d'évènements · Ouagadougou",
    items: [
      { id:1, nom:'Jean Emmanuel Bitié',  role:'Utilisateur',         badge:false, certifie:false, views:'5.4k',  temps:"il y'a 12h",         texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:0 },
      { id:2, nom:'Marienne Barry',       role:'Utilisateur Hybride', badge:true,  certifie:false, views:'10.8k', temps:"il y'a 22h",         texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:1 },
      { id:3, nom:'Edouard Ouédraogo',    role:'Utilisateur',         badge:false, certifie:false, views:'5.4k',  temps:"il y'a 1 Jour",      texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:2 },
      { id:9, nom:'Yasmine Traoré',       role:'Utilisateur',         badge:false, certifie:false, views:'8k',    temps:'10 Octobre',         texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:3 },
    ],
  },
  {
    id: 'bobo',
    titre: "Expériences d'évènements · Bobo Dioulasso",
    items: [
      { id:4, nom:'Maïmouna Traoré',       role:'Utilisateur Hybride', badge:true,  certifie:false, views:'50k',   temps:"il y'a 24h",         texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:4 },
      { id:5, nom:'Jean Emmanuel Bitié',   role:'Utilisateur',         badge:false, certifie:false, views:'6.4k',  temps:"il y'a 3 jours",     texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:5 },
      { id:6, nom:'Jean Emmanuel Bitié',   role:'Utilisateur',         badge:false, certifie:false, views:'9.9k',  temps:"il y'a une semaine", texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:6 },
    ],
  },
  {
    id: 'ailleurs',
    titre: "Expériences d'évènements · D'ailleurs",
    items: [
      { id:7, nom:'Donald Dao',           role:'Utilisateur Hybride', badge:true,  certifie:false, views:'15k',   temps:'Hier',          texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:7 },
      { id:8, nom:'Yasmine Traoré',       role:'Utilisateur',         badge:false, certifie:false, views:'8k',    temps:'10 Octobre',    texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:8 },
      { id:10,nom:'Darlène Jad Nikiema',  role:'Utilisateur',         badge:false, certifie:false, views:'25k',   temps:'22 décembre',   texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:0 },
    ],
  },
];

const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoShare = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const CarteExperience = ({ exp, onClick }) => {
  const [c1,c2] = grads[exp.g];
  const s = {
    card: { background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid #efefef', cursor:'pointer', boxShadow:'0 1px 6px rgba(0,0,0,.05)' },
    head: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 13px 7px' },
    userRow: { display:'flex', alignItems:'center', gap:9 },
    avatar: { width:34, height:34, borderRadius:'50%', background:`linear-gradient(135deg,${c1},${c2})`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700, flexShrink:0, fontFamily:'Poppins,sans-serif' },
    nom: { fontSize:12.5, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif' },
    role: { fontSize:11, color:'#aaa', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:3 },
    rouge: { color:'#ef4444', fontSize:9 },
    dots: { fontSize:17, color:'#ccc', letterSpacing:'1px' },
    photo: { width:'100%', height:188, background:`linear-gradient(135deg,${c1},${c2})` },
    body: { padding:'9px 13px 12px' },
    stats: { fontSize:12, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif' },
    temps: { fontSize:11, color:'#aaa', marginLeft:4 },
    texte: { fontSize:12, color:'#666', lineHeight:1.65, marginTop:4, fontFamily:'Poppins,sans-serif' },
    foot: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 },
    plus: { fontSize:12, color:'#FF5A00', fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif' },
  };
  return (
    <div style={s.card} onClick={onClick}>
      <div style={s.head}>
        <div style={s.userRow}>
          <div style={s.avatar}>{exp.nom[0]}</div>
          <div>
            <div style={s.nom}>{exp.nom}</div>
            <div style={s.role}>
              {exp.badge && <span style={s.rouge}>●</span>}
              {exp.role}
            </div>
          </div>
        </div>
        <span style={s.dots}>⋮</span>
      </div>
      <div style={s.photo}/>
      <div style={s.body}>
        <span style={s.stats}>{exp.views},</span>
        <span style={s.temps}>{exp.temps}</span>
        <div style={s.texte}>{exp.texte}</div>
        <div style={s.foot}>
          <span style={s.plus}>Afficher plus ...</span>
          <IcoShare />
        </div>
      </div>
    </div>
  );
};

const SectionSlider = ({ section, onSelect }) => {
  const [start, setStart] = useState(0);
  const PER = 3;
  const canLeft  = start > 0;
  const canRight = start + PER < section.items.length;

  const navBtn = (active, side) => ({
    position:'absolute', top:'50%', transform:'translateY(-50%)',
    [side]: -16, width:34, height:34, borderRadius:'50%',
    background: active?'#fff':'rgba(255,255,255,0.4)',
    boxShadow: active?'0 2px 12px rgba(0,0,0,.14)':'none',
    border:'1px solid #eee',
    display:'flex', alignItems:'center', justifyContent:'center',
    cursor: active?'pointer':'default',
    opacity: active?1:0.3, zIndex:2, color:'#333',
  });

  return (
    <div style={{ marginBottom:48 }}>
      <div style={{ display:'flex', alignItems:'center', marginBottom:18 }}>
        <span style={{ fontSize:16.5, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif', flex:1 }}>{section.titre}</span>
        <span style={{ fontSize:13, color:'#FF5A00', fontWeight:700 }}>&nbsp;&rsaquo;</span>
      </div>
      <div style={{ position:'relative' }}>
        <div style={navBtn(canLeft,'left')} onClick={()=>canLeft&&setStart(s=>s-1)}><IcoLeft /></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {section.items.slice(start,start+PER).map(exp=>(
            <CarteExperience key={exp.id} exp={exp} onClick={()=>onSelect(exp.id)}/>
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

const PageExperiences = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 24px 0' }}>
        <BarreRecherche />
      </div>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'44px 24px 0' }}>
        {SECTIONS.map(sec=>(
          <SectionSlider key={sec.id} section={sec} onSelect={id=>navigate(`/experiences/${id}`)}/>
        ))}
        <Pagination page={page} total={4} onChange={setPage}/>
      </div>
      <PiedDePage />
    </div>
  );
};

export default PageExperiences;
