import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarreRechercheGlobale from '../composants-communs/BarreRechercheGlobale';
import SectionReels from '../composants-communs/SectionReels';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const fallbacks = [
  'linear-gradient(145deg,#92400e,#d97706)','linear-gradient(145deg,#065f46,#059669)',
  'linear-gradient(145deg,#4338ca,#6366f1)','linear-gradient(145deg,#be185d,#ec4899)',
  'linear-gradient(145deg,#dc2626,#ef4444)','linear-gradient(145deg,#0891b2,#06b6d4)',
  'linear-gradient(145deg,#1d4ed8,#3b82f6)','linear-gradient(145deg,#1a1a1a,#404040)',
  'linear-gradient(145deg,#0369a1,#0284c7)','linear-gradient(145deg,#7c3aed,#8b5cf6)',
  'linear-gradient(145deg,#065f46,#10b981)','linear-gradient(145deg,#6d28d9,#8b5cf6)',
];
const svcImg = id => `/services/service${id}.jpg`;

/* Réels — basés sur les noms de la maquette Figma */
const REELS = [
  { nom:'MankSank',          img: svcImg(1) },
  { nom:'CATINE AFRICAINE',  img: svcImg(1) },
  { nom:'BSL COMMUNICATION', img: svcImg(4) },
  { nom:'LE GONDWANA',       img: svcImg(3) },
  { nom:'PTIT PARIS',        img: svcImg(5) },
  { nom:'KPI SECURITY SARL', img: svcImg(8) },
  { nom:'SWISS GLACES',      img: svcImg(11) },
  { nom:'SALEM SONORE',      img: svcImg(12) },
  { nom:'LA MAISON BLANCHE 4G', img: svcImg(7) },
];

const SECTIONS = [
  { id:'proche', titre:'Services · proche de vous', items:[
    {id:1,nom:'CATINE AFRICAINE',desc:'4.500 fr et 6.000 fr / La semaine en ville et hors ville puis 14.500 fr et 17.500 fr / Le mois en ville et hors ville',note:4.33,g:0},
    {id:2,nom:'MAM SANK',desc:'Nous proposons une grande variété de plats burkinabè pour satisfaire les goûts de nos visiteurs et invités.',note:5.00,g:1},
    {id:3,nom:'LE GONDWANA',desc:"Un restaurant, galerie d'art, qui offre plusieurs espaces, chacun aménagé dans un style différent (maison Gourounsi, ...)",note:4.10,g:2},
  ]},
  { id:'ouaga', titre:'Services · Ouagadougou', items:[
    {id:4,nom:'BSL COMMUNICATION',desc:'Spécialiste en Communication digitale. Communication et stratégie Digitale Événementielle. Assistance Management.',note:5.00,g:3},
    {id:5,nom:'PTIT PARIS',desc:"Restaurant Pâtisserie situé à Petit Paris, 2 étages, d'une capacité de 143 couverts, sert une large gamme de plats.",note:4.00,g:4},
    {id:6,nom:'FAIRY-TALE-EVENT',desc:"Une structure qui existe depuis 2016 et qui vous accompagne dans l'organisation de vos évènements.",note:4.00,g:5},
  ]},
  { id:'bobo', titre:'Services · Bobo Dioulasso', items:[
    {id:7,nom:'LA MAISON BLANCHE 4G',desc:"Découvrez l'ambiance animée de la Maison Blanche 4G Bobo, une discothèque de premier ordre à Bobo-Dioulasso.",note:5.00,g:6},
    {id:8,nom:'KPI SECURITY SARL',desc:"Depuis plus d'une décennie, KPI Security SARL s'est imposée comme un leader dans le domaine de la sécurité évènementielle.",note:4.30,g:7},
    {id:9,nom:'COMPLEXE YAMPOUTIN',desc:"Le Complexe Yampoutin est un lieu d'exception, parfait pour accueillir vos événements privés et professionnels.",note:5.00,g:8},
  ]},
  { id:'autres', titre:'Services · Autres villes', items:[
    {id:10,nom:'SALLE DE FÊTE OR',desc:'Dites : oui je le veux avec style dans la toute nouvelle salle de mariage située au centre ville, avec son design moderne.',note:3.30,g:9},
    {id:11,nom:'SWISS GLACES',desc:'Nos locations de machines Ice Cream en Suisse sont à disposition de tous les publics, tant les professionnels que les particuliers.',note:5.00,g:10},
    {id:12,nom:'SALEM SONORE',desc:"Le meilleur rapport qualité/prix de la capitale en matière de salle de répète. Réservez vos séances plus d'une semaine à l'avance.",note:4.33,g:11},
  ]},
];

const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

const NoteService = ({ note }) => (
  <div style={{display:'flex',alignItems:'center',gap:4}}>
    <span style={{fontSize:14,color:'#111',fontWeight:700,lineHeight:1}}>★</span>
    <span style={{fontSize:12,fontWeight:600,color:'#111',fontFamily:'Poppins,sans-serif'}}>{note.toFixed(2)}</span>
  </div>
);

const CarteService = ({ svc, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fallback = fallbacks[svc.g % fallbacks.length];
  return (
    <div onClick={onClick} style={{background:'#fff',borderRadius:14,overflow:'hidden',border:'1px solid #f0f0f0',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,.05)',fontFamily:'Poppins,sans-serif'}}>
      <div style={{position:'relative',width:'100%',height:170,overflow:'hidden',background:fallback}}>
        {!imgError
          ? <img src={svcImg(svc.id)} alt={svc.nom} onError={()=>setImgError(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          : <div style={{width:'100%',height:'100%',background:fallback}}/>
        }
        <button onClick={e=>{e.stopPropagation();setLiked(l=>!l);}} style={{position:'absolute',top:10,right:10,width:30,height:30,borderRadius:'50%',background:'rgba(255,255,255,0.92)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 1px 4px rgba(0,0,0,.12)'}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={liked?'#FF5A00':'none'} stroke={liked?'#FF5A00':'#888'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div style={{padding:'12px 14px 14px'}}>
        <div style={{fontSize:12,fontWeight:700,color:'#111',textTransform:'uppercase',letterSpacing:'0.3px',marginBottom:5}}>{svc.nom}</div>
        <div style={{fontSize:12,color:'#666',lineHeight:1.6,marginBottom:8}}>{svc.desc}</div>
        <NoteService note={svc.note}/>
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
        /* Mobile : scroll horizontal snappé */
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {section.items.map(svc=>(
            <div key={svc.id} style={{width:'100%'}}>
              <CarteService svc={svc} onClick={()=>onSelect(svc.id)}/>
            </div>
          ))}
        </div>
      ) : (
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',left:-18,width:36,height:36,borderRadius:'50%',background:canLeft?'#fff':'rgba(255,255,255,0.4)',boxShadow:canLeft?'0 2px 14px rgba(0,0,0,.14)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canLeft?'pointer':'default',opacity:canLeft?1:0.3,zIndex:2,color:'#333'}} onClick={()=>canLeft&&setStart(s=>s-1)}><IcoLeft/></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
            {section.items.slice(start,start+PER).map(svc=>(
              <CarteService key={svc.id} svc={svc} onClick={()=>onSelect(svc.id)}/>
            ))}
          </div>
          <div style={{position:'absolute',top:'50%',transform:'translateY(-50%)',right:-18,width:36,height:36,borderRadius:'50%',background:canRight?'#fff':'rgba(255,255,255,0.4)',boxShadow:canRight?'0 2px 14px rgba(0,0,0,.14)':'none',border:'1.5px solid #eee',display:'flex',alignItems:'center',justifyContent:'center',cursor:canRight?'pointer':'default',opacity:canRight?1:0.3,zIndex:2,color:'#333'}} onClick={()=>canRight&&setStart(s=>s+1)}><IcoRight/></div>
        </div>
      )}
    </div>
  );
};

const Pagination = ({ page, total, onChange, isMobile }) => (
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:isMobile?6:8,padding:'16px 0 44px',flexWrap:'wrap'}}>
    <div onClick={()=>page>1&&onChange(page-1)} style={{width:34,height:34,borderRadius:'50%',border:'1.5px solid #e0e0e0',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#555'}}><IcoLeft/></div>
    {[...Array(total)].map((_,i)=>(
      <div key={i} onClick={()=>onChange(i+1)} style={{width:36,height:36,borderRadius:'50%',border:i+1===page?'none':'1.5px solid #e0e0e0',background:i+1===page?'#FF5A00':'#fff',color:i+1===page?'#fff':'#555',fontSize:13,fontWeight:i+1===page?700:400,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{i+1}</div>
    ))}
    <div onClick={()=>page<total&&onChange(page+1)} style={{width:34,height:34,borderRadius:'50%',border:'1.5px solid #e0e0e0',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#555'}}><IcoRight/></div>
  </div>
);

const PageServices = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { isMobile } = useResponsive();

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <div style={{maxWidth:1160,margin:'0 auto',padding:isMobile?'20px 16px 0':'28px 28px 0'}}>
        <BarreRechercheGlobale/>
      </div>
      <div style={{maxWidth:1160,margin:'0 auto',padding:isMobile?'32px 16px 0':'48px 28px 0'}}>
        <SectionReels items={REELS} />
        {SECTIONS.map(sec=>(
          <SectionSlider key={sec.id} section={sec} onSelect={id=>navigate(`/services/${id}`)} isMobile={isMobile}/>
        ))}
        <Pagination page={page} total={4} onChange={setPage} isMobile={isMobile}/>
      </div>
      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageServices;
