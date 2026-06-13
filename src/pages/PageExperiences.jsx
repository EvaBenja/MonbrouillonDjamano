import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarreRechercheGlobale from '../composants-communs/BarreRechercheGlobale';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const imgs = Array.from({length:10},(_,i)=>`/experiences/personne${i+1}.jpg`);
const fallbacks = [
  'linear-gradient(145deg,#1d4ed8,#4338ca)','linear-gradient(145deg,#dc2626,#b91c1c)',
  'linear-gradient(145deg,#0891b2,#0369a1)','linear-gradient(145deg,#065f46,#047857)',
  'linear-gradient(145deg,#7c3aed,#6d28d9)','linear-gradient(145deg,#b45309,#92400e)',
  'linear-gradient(145deg,#be185d,#9d174d)','linear-gradient(145deg,#0f766e,#0d9488)',
  'linear-gradient(145deg,#1e40af,#1d4ed8)','linear-gradient(145deg,#4338ca,#6366f1)',
];

const SECTIONS = [
  { id:'ouaga', titre:"Expériences d'évènements · Ouagadougou", items:[
    {id:1,nom:'Jean Emmanuel Bitié',role:'Utilisateur',hybride:false,views:'5.4k',temps:"il y'a 12h",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:0},
    {id:2,nom:'Marienne Barry',role:'Utilisateur Hybride',hybride:true,views:'10.8k',temps:"il y'a 22h",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:1},
    {id:3,nom:'Edouard Ouédraogo',role:'Utilisateur',hybride:false,views:'5.4k',temps:"il y'a 1 Jour",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:2},
    {id:9,nom:'Yasmine Traoré',role:'Utilisateur',hybride:false,views:'8k',temps:'10 Octobre',texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:3},
  ]},
  { id:'bobo', titre:"Expériences d'évènements · Bobo Dioulasso", items:[
    {id:4,nom:'Maïmouna Traoré',role:'Utilisateur Hybride',hybride:true,views:'50k',temps:"il y'a 24h",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:4},
    {id:5,nom:'Jean Emmanuel Bitié',role:'Utilisateur',hybride:false,views:'6.4k',temps:"il y'a 3 jours",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:5},
    {id:6,nom:'Jean Emmanuel Bitié',role:'Utilisateur',hybride:false,views:'9.9k',temps:"il y'a une semaine",texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:6},
  ]},
  { id:'ailleurs', titre:"Expériences d'évènements · D'ailleurs", items:[
    {id:7,nom:'Donald Dao',role:'Utilisateur Hybride',hybride:true,views:'15k',temps:'Hier',texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:7},
    {id:8,nom:'Yasmine Traoré',role:'Utilisateur',hybride:false,views:'8k',temps:'10 Octobre',texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:8},
    {id:10,nom:'Darlène Jad Nikiema',role:'Utilisateur',hybride:false,views:'25k',temps:'22 décembre',texte:"Sortie de notre promotion, comme le temps file aussi vite qu'on l'imaginait...",img:9},
  ]},
];

const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoShare = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const CarteExperience = ({ exp, onClick }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div onClick={onClick} style={{background:'#fff',borderRadius:14,overflow:'hidden',border:'1px solid #efefef',cursor:'pointer',boxShadow:'0 2px 10px rgba(0,0,0,.06)',fontFamily:'Poppins,sans-serif'}}>
      {/* Image carrée */}
      <div style={{width:'100%',aspectRatio:'1/1',overflow:'hidden',background:imgError?fallbacks[exp.img%10]:'#f5f5f5'}}>
        {!imgError
          ? <img src={imgs[exp.img]} alt={exp.nom} onError={()=>setImgError(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          : <div style={{width:'100%',height:'100%',background:fallbacks[exp.img%10]}}/>
        }
      </div>
      <div style={{padding:'12px 14px'}}>
        {/* Nom + badge hybride */}
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
          <div style={{width:28,height:28,borderRadius:'50%',overflow:'hidden',flexShrink:0}}>
            {!imgError
              ? <img src={imgs[exp.img]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              : <div style={{width:'100%',height:'100%',background:fallbacks[exp.img%10]}}/>
            }
          </div>
          <div>
            <div style={{fontSize:12.5,fontWeight:700,color:'#111',lineHeight:1.2}}>{exp.nom}</div>
            <div style={{fontSize:10.5,color:'#888'}}>{exp.role}</div>
          </div>
          {exp.hybride && <span style={{marginLeft:'auto',fontSize:9.5,color:'#ef4444',fontWeight:700,background:'#fef2f2',padding:'2px 8px',borderRadius:20}}>● hybride</span>}
        </div>
        {/* Vues + temps en gras */}
        <div style={{display:'flex',alignItems:'center',gap:6,margin:'8px 0'}}>
          <span style={{fontSize:12,fontWeight:700,color:'#111'}}>{exp.views}</span>
          <span style={{fontSize:11,color:'#aaa'}}>·</span>
          <span style={{fontSize:12,fontWeight:700,color:'#111'}}>{exp.temps}</span>
        </div>
        <div style={{fontSize:11.5,color:'#666',lineHeight:1.6,marginBottom:8}}>{exp.texte}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:12,color:'#111',fontWeight:700,cursor:'pointer'}}>Afficher plus ...</span>
          <div style={{width:28,height:28,borderRadius:8,border:'1px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><IcoShare/></div>
        </div>
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
      <div style={{display:'flex',alignItems:'center',marginBottom:16}}>
        <span style={{fontSize:isMobile?14:16,fontWeight:700,color:'#111',flex:1,fontFamily:'Poppins,sans-serif'}}>{section.titre}</span>
        <span style={{fontSize:13,color:'#FF5A00',fontWeight:700,cursor:'pointer'}}>›</span>
      </div>

      {isMobile ? (
        <div style={{display:'flex',overflowX:'auto',gap:14,paddingBottom:8,scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',scrollbarWidth:'none',msOverflowStyle:'none'}}>
          {section.items.map(exp=>(
            <div key={exp.id} style={{minWidth:'78vw',maxWidth:300,flexShrink:0,scrollSnapAlign:'start'}}>
              <CarteExperience exp={exp} onClick={()=>onSelect(exp.id)}/>
            </div>
          ))}
        </div>
      ) : (
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',left:-18,width:36,height:36,borderRadius:'50%',background:canLeft?'#fff':'rgba(255,255,255,0.5)',boxShadow:canLeft?'0 2px 14px rgba(0,0,0,.15)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canLeft?'pointer':'default',opacity:canLeft?1:0.35,zIndex:2}} onClick={()=>canLeft&&setStart(s=>s-1)}><IcoLeft/></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
            {section.items.slice(start,start+PER).map(exp=>(
              <CarteExperience key={exp.id} exp={exp} onClick={()=>onSelect(exp.id)}/>
            ))}
          </div>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',right:-18,width:36,height:36,borderRadius:'50%',background:canRight?'#fff':'rgba(255,255,255,0.5)',boxShadow:canRight?'0 2px 14px rgba(0,0,0,.15)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canRight?'pointer':'default',opacity:canRight?1:0.35,zIndex:2}} onClick={()=>canRight&&setStart(s=>s+1)}><IcoRight/></div>
        </div>
      )}
    </div>
  );
};

const PageExperiences = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <div style={{maxWidth:1160,margin:'0 auto',padding:isMobile?'20px 16px 0':'28px 28px 0'}}>
        <BarreRechercheGlobale/>
      </div>
      <div style={{maxWidth:1160,margin:'0 auto',padding:isMobile?'32px 16px 0':'48px 28px 0'}}>
        {SECTIONS.map(sec=>(
          <SectionSlider key={sec.id} section={sec} onSelect={id=>navigate(`/experiences/${id}`)} isMobile={isMobile}/>
        ))}
      </div>
      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageExperiences;
