import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const svcBannerSrc = id => `/services/service${id||1}.jpg`;
const detailImgSrc = n  => `/detailsimages/details${(n%6)+1}.jpg`;
const personneImgs = ['/experiences/personne1.jpg','/experiences/personne2.jpg','/experiences/personne3.jpg','/experiences/personne4.jpg'];
const fbs = ['linear-gradient(145deg,#f97316,#ea580c)','linear-gradient(145deg,#c2410c,#ea580c)','linear-gradient(145deg,#0891b2,#06b6d4)','linear-gradient(145deg,#065f46,#059669)','linear-gradient(145deg,#7c3aed,#6d28d9)','linear-gradient(145deg,#1d4ed8,#4338ca)'];

const Img = ({ src, fallback, style={} }) => {
  const [err, setErr] = useState(false);
  return err ? <div style={{...style,background:fallback}}/> : <img src={src} alt="" onError={()=>setErr(true)} style={{...style,objectFit:'cover',display:'block'}}/>;
};

const SERVICES = {
  1:{nom:'MAM SANK',loc:"Ouagadougou, patte d'oie"},2:{nom:'MAM SANK',loc:"Ouagadougou, patte d'oie"},
  3:{nom:'LE GONDWANA',loc:"Ouagadougou, Koulouba"},4:{nom:'BSL COMMUNICATION',loc:"Ouagadougou, Hamdalaye"},
  5:{nom:'PTIT PARIS',loc:"Ouagadougou, Petit Paris"},6:{nom:'FAIRY-TALE-EVENT',loc:"Ouagadougou, Zogona"},
  7:{nom:'LA MAISON BLANCHE 4G',loc:"Bobo-Dioulasso"},8:{nom:'KPI SECURITY SARL',loc:"Bobo-Dioulasso"},
  9:{nom:'COMPLEXE YAMPOUTIN',loc:"Bobo-Dioulasso"},10:{nom:'SALLE DE FÊTE OR',loc:"Autres villes"},
  11:{nom:'SWISS GLACES',loc:"Suisse"},12:{nom:'SALEM SONORE',loc:"Ouagadougou"},
};

const cats = ['Tout','Restaurations','Pâtisserie','Location'];
const produits = [
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Crudité',prix:'A partir de 5.000Fr',type:'Commander'},
  {nom:'Salle de mariage',prix:'A partir de 150.000/Jr',type:'Réserver'},
  {nom:'Salle de mariage',prix:'A partir de 150.000/Jr',type:'Réserver'},
  {nom:'Salle de mariage',prix:'A partir de 150.000/Jr',type:'Réserver'},
];

const Etoiles = ({ date }) => (
  <div style={{display:'flex',alignItems:'center',gap:4,flexWrap:'wrap'}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{fontSize:11,color:'#111',lineHeight:1}}>★</span>)}
    <span style={{fontSize:10.5,color:'#aaa',marginLeft:4}}>{date}</span>
  </div>
);

const IcoPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const PageDetailService = () => {
  const { id } = useParams();
  const { isMobile } = useResponsive();
  const svcId = parseInt(id)||1;
  const svc = SERVICES[svcId]||SERVICES[1];
  const [catActive, setCatActive] = useState('Tout');
  const [prodPage, setProdPage]   = useState(0);
  const PER = 9;
  const prodVisible = produits.slice(prodPage*PER,(prodPage+1)*PER);

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <EntetePageDetail/>

      {/* ── Bannière ── */}
      <div style={{position:'relative',width:'100%',height: isMobile?160:220,overflow:'hidden',background:fbs[svcId%fbs.length]}}>
        <Img src={svcBannerSrc(svcId)} fallback={fbs[svcId%fbs.length]} style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 60%)'}}/>
        <div style={{position:'absolute',bottom:16,right:16,display:'flex',gap:12,alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:5,fontSize:13,fontWeight:700,color:'#fff'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            300 K
          </div>
        </div>
        {/* Avatar profil rond */}
        <div style={{position:'absolute',bottom: isMobile?-28:-36,left: isMobile?16:28,width: isMobile?60:74,height: isMobile?60:74,borderRadius:'50%',border:'4px solid #fff',boxShadow:'0 4px 16px rgba(0,0,0,.18)',overflow:'hidden',background:fbs[(svcId+1)%fbs.length]}}>
          <Img src={svcBannerSrc(svcId)} fallback={fbs[(svcId+1)%fbs.length]} style={{width:'100%',height:'100%'}}/>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div style={{maxWidth:1200,margin:'0 auto',padding: isMobile?'44px 16px 32px':'52px 24px 40px'}}>

        {/* Localisation */}
        <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#555',marginBottom:16}}>
          <IcoPin/>{svc.loc}
        </div>

        {/* Grid : 1 col mobile, 2 col desktop */}
        <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr':'minmax(0,1fr) 280px',gap: isMobile?24:36}}>

          {/* ── COLONNE GAUCHE ── */}
          <div>
            <div style={{fontSize:15,fontWeight:700,color:'#111',marginBottom:8}}>{svc.nom}</div>
            <p style={{fontSize:13,color:'#666',lineHeight:1.72,marginBottom:14}}>
              Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
              <span style={{color:'#111',fontWeight:700,cursor:'pointer'}}> Afficher plus ...</span>
            </p>
            <div style={{display:'flex',alignItems:'center',gap:4,fontSize:13,color:'#111',fontWeight:700,cursor:'pointer',marginBottom:12}}>Services proposées &nbsp;›</div>

            {/* Catégories */}
            <div style={{fontSize:12,color:'#888',marginBottom:8}}>Catégorie :</div>
            <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCatActive(c)} style={{padding:'6px 14px',borderRadius:20,fontSize:12.5,fontWeight:catActive===c?600:400,color:catActive===c?'#fff':'#555',background:catActive===c?'#FF5A00':'#f0f0f0',border:'none',cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grille produits : 2 cols mobile, 3 cols desktop */}
            <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr 1fr':'repeat(3,1fr)',gap:10,marginBottom:12}}>
              {prodVisible.map((p,i)=>(
                <div key={i} style={{border:'1.5px solid rgba(255,255,255,0.6)',borderRadius:10,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,.08)'}}>
                  <div style={{width:'100%',height: isMobile?80:105,overflow:'hidden'}}>
                    <Img src={detailImgSrc(i)} fallback={fbs[i%fbs.length]} style={{width:'100%',height:'100%'}}/>
                  </div>
                  <div style={{padding:'8px 10px'}}>
                    <div style={{fontSize:11.5,fontWeight:600,color:'#111'}}>{p.nom}</div>
                    <div style={{fontSize:11,color:'#888',marginTop:2}}>{p.prix}</div>
                    <button style={{marginTop:6,width:'100%',borderRadius:6,padding:'5px 0',fontSize:11.5,fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif',background:p.type==='Réserver'?'#FF5A00':'transparent',color:p.type==='Réserver'?'#fff':'#FF5A00',border:p.type==='Réserver'?'none':'1.5px solid #FF5A00'}}>
                      {p.type}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination produits */}
            <div style={{display:'flex',justifyContent:'center',gap:8,padding:'10px 0 20px'}}>
              {[0,1,2,3].map(i=>(
                <div key={i} onClick={()=>setProdPage(i)} style={{width:32,height:32,borderRadius:'50%',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:prodPage===i?700:400,background:prodPage===i?'#FF5A00':'#fff',color:prodPage===i?'#fff':'#555',border:prodPage===i?'none':'1.5px solid #e0e0e0'}}>
                  {i+1}
                </div>
              ))}
            </div>
          </div>

          {/* ── COLONNE DROITE ── */}
          <div>
            {/* Avis */}
            <div style={{fontSize:14,fontWeight:700,color:'#111',marginBottom:12}}>Avis des clients</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9,marginBottom:24}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{border:'1px solid #efefef',borderRadius:12,padding:11}}>
                  <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:7}}>
                    <div style={{width:28,height:28,borderRadius:'50%',overflow:'hidden',flexShrink:0}}>
                      <Img src={personneImgs[i%personneImgs.length]} fallback={fbs[i%fbs.length]} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:700,color:'#111',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Jean E. Bitié</div>
                      <div style={{fontSize:9.5,color:'#aaa'}}>Certifié</div>
                    </div>
                  </div>
                  <Etoiles date="Il y a 3 jours"/>
                  <div style={{fontSize:11,color:'#666',lineHeight:1.6,marginTop:7}}>Le Lorem Ipsum est simplement du faux texte employé dans la composition.</div>
                </div>
              ))}
            </div>

            {/* Portfolio */}
            <div style={{fontSize:14,fontWeight:700,color:'#111',marginBottom:10}}>Portfolio</div>
            <div style={{display:'flex',flexDirection:'column',gap:9}}>
              {[4,5].map((n,i)=>(
                <div key={i} style={{overflow:'hidden',height:108}}>
                  <Img src={detailImgSrc(n)} fallback={fbs[i]} style={{width:'100%',height:'100%'}}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Champ message */}
        <div style={{display:'flex',justifyContent:'center',padding:'24px 0 8px'}}>
          <div style={{width:'100%',maxWidth:420,border:'1.5px solid #e8e8e8',borderRadius:24,padding:'11px 22px',fontSize:13.5,color:'#aaa',fontFamily:'Poppins,sans-serif',background:'#fff',display:'flex',alignItems:'center',gap:8}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Message
          </div>
        </div>
      </div>

      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageDetailService;
