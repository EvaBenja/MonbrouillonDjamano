import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarreRechercheGlobale from '../composants-communs/BarreRechercheGlobale';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const imgs = Array.from({length:14},(_,i)=>`/evenement${i+1}.jpg`);
const fallbacks = [
  'linear-gradient(145deg,#7c2d12,#c2410c)','linear-gradient(145deg,#1e3a8a,#1d4ed8)',
  'linear-gradient(145deg,#3b0764,#7e22ce)','linear-gradient(145deg,#14532d,#15803d)',
  'linear-gradient(145deg,#1c1917,#44403c)','linear-gradient(145deg,#7f1d1d,#dc2626)',
  'linear-gradient(145deg,#0c4a6e,#0369a1)','linear-gradient(145deg,#365314,#4d7c0f)',
  'linear-gradient(145deg,#831843,#be185d)','linear-gradient(145deg,#1a1a2e,#16213e)',
  'linear-gradient(145deg,#4a044e,#86198f)','linear-gradient(145deg,#042f2e,#065f46)',
  'linear-gradient(145deg,#92400e,#d97706)','linear-gradient(145deg,#0f172a,#1e293b)',
];

const SECTIONS = [
  { id:'proche', titre:'Évènements · proche de vous', items:[
    {id:1,titre:"Prix de l'Entrepreneuriat Féminin act 2",lieu:"CENASA",org:"MBM Group",date:"Le Jeudi 30 Septembre",b1:'Gratuit',b2:'Pass'},
    {id:2,titre:"FESTIVAL DE LA COHESION SAHELIENNE",lieu:"Rossignol à Wemtenga",org:"ASSEC",date:"Du 25 au 26 Octobre",b1:'Pass'},
    {id:3,titre:"BOUGOUSSO de la diversité",lieu:"Au Wakanda",org:"ZOMALECT",date:"Du 20 Mars au 25 Mars",b1:'5.500 Fr'},
    {id:4,titre:"SOIREE KARAOKE",lieu:"Cosy Corner",org:"Cosy Corner",date:"Vendredi 11 Octobre",b1:'Gratuit'},
  ]},
  { id:'ouaga', titre:'Évènements · Ouagadougou', items:[
    {id:5,titre:"SOIREE KARAOKE",lieu:"Cosy Corner",org:"Cosy Corner",date:"Vendredi 11 Octobre",b1:'Gratuit'},
    {id:6,titre:"JEUNES COULEURS AMBIANCE",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Jeudi 28 Août",b1:'Gratuit'},
    {id:7,titre:"ORCHESTRE BANA M'BOKA",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Samedi 20 Septembre",b1:'Pass'},
    {id:8,titre:"FESTIVAL DU JAZZ",lieu:"Palais des Sports",org:"MBM Group",date:"Samedi 5 Octobre",b1:'Gratuit'},
  ]},
  { id:'bobo', titre:'Évènements · Bobo Dioulasso', items:[
    {id:9,titre:"SOIREE ANIMATION DEEJAY",lieu:"COSY CORNER",org:"SITHO",date:"Samedi 21 Décembre",b1:'Gratuit'},
    {id:10,titre:"BOUGOUSSO de la diversité",lieu:"Musée National du Burkina Faso",org:"Co. MNBF & PCIM INTS",date:"Mercredi 15 Octobre",b1:'Gratuit'},
    {id:11,titre:"FUTUR MAKER NIGHT",lieu:"ELPARA GA",org:"NEXUS",date:"Vendredi 10 Octobre",b1:'Gratuit'},
  ]},
  { id:'autres', titre:'Évènements · Autres villes', items:[
    {id:12,titre:"MISTER KOFF EN LIVE",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Du 20 Mars au 25 Mars",b1:'Gratuit'},
    {id:13,titre:"SUMMER PARTY",lieu:"AFRICA FESTIVAL",org:"SUBIACO",date:"Mardi 16 Novembre",b1:'Gratuit'},
    {id:14,titre:"ROOTS AFRICAN FASHION PARTY",lieu:"ACCRA AIRPORT",org:"CULTURE",date:"Jeudi 28 Décembre",b1:'Gratuit'},
  ]},
];

const Badge = ({ txt }) => {
  if (!txt) return null;
  let bg = '#111';
  if (txt==='Gratuit') bg='#16a34a';
  else if (txt==='Pass') bg='#1e293b';
  else bg='#FF5A00';
  return <span style={{background:bg,color:'#fff',fontSize:10.5,fontWeight:700,padding:'4px 12px',borderRadius:20,fontFamily:'Poppins,sans-serif'}}>{txt}</span>;
};

const IcoPin   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoOrg   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9f1239" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IcoCal   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoSearch= () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

const CarteEvenement = ({ ev, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc   = imgs[ev.id-1];
  const fallback = fallbacks[(ev.id-1) % fallbacks.length];
  return (
    <div onClick={onClick} style={{background:'#fff',borderRadius:16,overflow:'hidden',border:'1px solid #efefef',cursor:'pointer',boxShadow:'0 2px 12px rgba(0,0,0,.07)',fontFamily:'Poppins,sans-serif'}}>
      <div style={{width:'100%',height:185,position:'relative',overflow:'hidden',background:imgError?fallback:'transparent'}}>
        {!imgError && <img src={imgSrc} alt={ev.titre} onError={()=>setImgError(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>}
        {imgError && <div style={{width:'100%',height:'100%',background:fallback,display:'flex',alignItems:'flex-end',padding:12}}><span style={{color:'#fff',fontSize:12,fontWeight:800,lineHeight:1.3}}>{ev.titre}</span></div>}
        <div style={{position:'absolute',top:10,left:10,display:'flex',gap:5}}><Badge txt={ev.b1}/>{ev.b2&&<Badge txt={ev.b2}/>}</div>
        {!imgError && <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top,rgba(0,0,0,0.55),transparent)'}}/>}
      </div>
      <div style={{padding:'13px 14px 15px'}}>
        <div style={{fontSize:13,fontWeight:700,color:'#111',marginBottom:10,lineHeight:1.35}}>{ev.titre}</div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}><IcoPin/><span style={{fontSize:12,color:'#16a34a',fontWeight:500}}>{ev.lieu}</span></div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}><IcoOrg/><span style={{fontSize:12,color:'#9f1239',fontWeight:500}}>{ev.org}</span></div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12}}><IcoCal/><span style={{fontSize:12,color:'#777'}}>{ev.date}</span></div>
        <button style={{width:'100%',background:'#FF5A00',color:'#fff',border:'none',borderRadius:10,padding:'10px 0',fontSize:13,fontWeight:600,fontFamily:'Poppins,sans-serif',cursor:'pointer',boxShadow:'0 3px 12px rgba(255,90,0,0.28)'}}>Détails</button>
      </div>
    </div>
  );
};

const SectionSlider = ({ section, onSelect, isMobile }) => {
  const [start, setStart] = useState(0);
  const PER = isMobile ? 1 : 3;
  const canLeft  = start > 0;
  const canRight = start + PER < section.items.length;

  return (
    <div style={{marginBottom:44}}>
      <div style={{display:'flex',alignItems:'center',marginBottom:16,padding: isMobile ? '0 4px' : 0}}>
        <span style={{fontSize: isMobile?14:16,fontWeight:700,color:'#111',fontFamily:'Poppins,sans-serif',flex:1}}>{section.titre}</span>
        <span style={{fontSize:13,color:'#FF5A00',fontWeight:700,cursor:'pointer'}}>›</span>
      </div>

      {isMobile ? (
        /* Mobile : scroll horizontal */
        <div style={{display:'flex',overflowX:'auto',gap:14,paddingBottom:8,scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',msOverflowStyle:'none',scrollbarWidth:'none'}}>
          {section.items.map(ev=>(
            <div key={ev.id} style={{minWidth:'78vw',maxWidth:300,flexShrink:0,scrollSnapAlign:'start'}}>
              <CarteEvenement ev={ev} onClick={()=>onSelect(ev.id)}/>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop/tablette : slider avec flèches */
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',left:-18,width:36,height:36,borderRadius:'50%',background:canLeft?'#fff':'rgba(255,255,255,0.5)',boxShadow:canLeft?'0 2px 14px rgba(0,0,0,.15)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canLeft?'pointer':'default',opacity:canLeft?1:0.35,zIndex:2,color:'#333'}} onClick={()=>canLeft&&setStart(s=>s-1)}><IcoLeft/></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
            {section.items.slice(start,start+PER).map(ev=>(
              <CarteEvenement key={ev.id} ev={ev} onClick={()=>onSelect(ev.id)}/>
            ))}
          </div>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',right:-18,width:36,height:36,borderRadius:'50%',background:canRight?'#fff':'rgba(255,255,255,0.5)',boxShadow:canRight?'0 2px 14px rgba(0,0,0,.15)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canRight?'pointer':'default',opacity:canRight?1:0.35,zIndex:2,color:'#333'}} onClick={()=>canRight&&setStart(s=>s+1)}><IcoRight/></div>
        </div>
      )}
    </div>
  );
};

const BarreRecherche = ({ isMobile }) => {
  const [type,setType]=useState('');
  const [loc,setLoc]=useState('');
  const [date,setDate]=useState('');
  return (
    <div style={{background:'#fff',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,.09)',border:'1px solid #efefef',display:'flex',flexDirection:isMobile?'column':'row',alignItems:'stretch',overflow:'hidden'}}>
      {[{label:'Type de recherche',ph:'Ajouter',val:type,set:setType},{label:'Localisation',ph:'Ajouter',val:loc,set:setLoc},{label:'Date',ph:'Quand ?',val:date,set:setDate,last:true}].map(f=>(
        <div key={f.label} style={{flex:1,padding:'14px 20px',borderRight:isMobile?'none':(f.last?'none':'1px solid #efefef'),borderBottom:isMobile&&!f.last?'1px solid #efefef':'none',display:'flex',flexDirection:'column',gap:4}}>
          <span style={{fontSize:10,fontWeight:700,color:'#bbb',letterSpacing:'1px',textTransform:'uppercase',fontFamily:'Poppins,sans-serif'}}>{f.label}</span>
          <input style={{border:'none',outline:'none',fontSize:13.5,color:'#333',fontFamily:'Poppins,sans-serif',background:'transparent'}} placeholder={f.ph} value={f.val} onChange={e=>f.set(e.target.value)}/>
        </div>
      ))}
      <button style={{background:'#FF5A00',color:'#fff',border:'none',padding:isMobile?'16px':'0 28px',minHeight:isMobile?'auto':72,fontSize:14,fontWeight:600,fontFamily:'Poppins,sans-serif',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
        <IcoSearch/> Rechercher
      </button>
    </div>
  );
};

const Pagination = ({ page, total, onChange, isMobile }) => (
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:isMobile?6:8,padding:'16px 0 44px',flexWrap:'wrap'}}>
    <div onClick={()=>page>1&&onChange(page-1)} style={{width:34,height:34,borderRadius:'50%',border:'1.5px solid #e0e0e0',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#555'}}><IcoLeft/></div>
    {[...Array(total)].map((_,i)=>(
      <div key={i} onClick={()=>onChange(i+1)} style={{width:36,height:36,borderRadius:'50%',border:i+1===page?'none':'1.5px solid #e0e0e0',background:i+1===page?'#FF5A00':'#fff',color:i+1===page?'#fff':'#555',fontSize:13,fontWeight:i+1===page?700:400,fontFamily:'Poppins,sans-serif',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{i+1}</div>
    ))}
    <div onClick={()=>page<total&&onChange(page+1)} style={{width:34,height:34,borderRadius:'50%',border:'1.5px solid #e0e0e0',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#555'}}><IcoRight/></div>
  </div>
);

const PageEvenements = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { isMobile, isTablet } = useResponsive();

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <div style={{maxWidth:1160,margin:'0 auto',padding: isMobile?'20px 16px 0':'28px 28px 0'}}>
        <BarreRecherche isMobile={isMobile}/>
      </div>
      <div style={{maxWidth:1160,margin:'0 auto',padding: isMobile?'32px 16px 0':'48px 28px 0'}}>
        {SECTIONS.map(sec=>(
          <SectionSlider key={sec.id} section={sec} onSelect={id=>navigate(`/evenements/${id}`)} isMobile={isMobile}/>
        ))}
        <Pagination page={page} total={4} onChange={setPage} isMobile={isMobile}/>
      </div>
      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageEvenements;
