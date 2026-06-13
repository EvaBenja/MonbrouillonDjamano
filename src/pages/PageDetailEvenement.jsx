import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const EVENEMENTS = {
  1:{titre:"Prix de l'Entrepreneuriat Féminin act 2",lieu:"CENASA",org:"MBM GROUP",date:"Le 2025-10-30 de 20:00 à 23:55"},
  2:{titre:"Festival de la Cohésion Sahélienne",lieu:"Rossignol à Wemtenga",org:"ASSEC",date:"Du 25 au 26 Octobre"},
  3:{titre:"Bougousso de la Diversité",lieu:"Au Wakanda",org:"ZOMALECT",date:"Du 20 Mars au 25 Mars"},
  4:{titre:"Soirée Karaoké",lieu:"Cosy Corner",org:"Cosy Corner",date:"Vendredi 11 Octobre"},
  5:{titre:"Soirée Karaoké",lieu:"Cosy Corner",org:"Cosy Corner",date:"Vendredi 11 Octobre"},
  6:{titre:"Jeunes Couleurs Ambiance",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Jeudi 28 Août"},
  7:{titre:"Orchestre Bana M'Boka",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Samedi 20 Septembre"},
  8:{titre:"Festival du Jazz",lieu:"Palais des Sports",org:"MBM Group",date:"Samedi 5 Octobre"},
  9:{titre:"Soirée Animation Deejay",lieu:"Cosy Corner",org:"SITHO",date:"Samedi 21 Décembre"},
  10:{titre:"Bougousso de la Diversité",lieu:"Musée National du Burkina Faso",org:"Co. MNBF & PCIM INTS",date:"Mercredi 15 Octobre"},
  11:{titre:"Futur Maker Night",lieu:"ELPARA GA",org:"NEXUS",date:"Vendredi 10 Octobre"},
  12:{titre:"Mister Koff en Live",lieu:"Situé derrière l'ex IAM Ouaga 2000",org:"SQUASH TIME",date:"Du 20 Mars au 25 Mars"},
  13:{titre:"Summer Party",lieu:"AFRICA FESTIVAL",org:"SUBIACO",date:"Mardi 16 Novembre"},
  14:{titre:"Roots African Fashion Party",lieu:"ACCRA AIRPORT",org:"CULTURE",date:"Jeudi 28 Décembre"},
};

const detailImgs = [1,2,3,4,5,6].map(n=>`/detailsimages/details${n}.jpg`);
const detailFbs  = ['linear-gradient(135deg,#b45309,#d97706)','linear-gradient(135deg,#1d4ed8,#4338ca)','linear-gradient(135deg,#065f46,#059669)','linear-gradient(135deg,#7c3aed,#6d28d9)'];
const getImg = i => detailImgs[i % detailImgs.length];
const getFb  = i => detailFbs[i % detailFbs.length];

const ImgFb = ({ src, fallback, style={} }) => {
  const [err, setErr] = useState(false);
  return err ? <div style={{...style,background:fallback}}/> : <img src={src} alt="" onError={()=>setErr(true)} style={{...style,objectFit:'cover',display:'block'}}/>;
};

const QRCode = () => (
  <svg width="42" height="42" viewBox="0 0 48 48">
    <rect width="48" height="48" fill="white" rx="4"/>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#111" strokeWidth="2"/>
    <rect x="7" y="7" width="10" height="10" fill="#111"/>
    <rect x="28" y="4" width="16" height="16" rx="2" fill="none" stroke="#111" strokeWidth="2"/>
    <rect x="31" y="7" width="10" height="10" fill="#111"/>
    <rect x="4" y="28" width="16" height="16" rx="2" fill="none" stroke="#111" strokeWidth="2"/>
    <rect x="7" y="31" width="10" height="10" fill="#111"/>
    <rect x="28" y="28" width="6" height="6" fill="#111"/>
    <rect x="38" y="28" width="6" height="6" fill="#111"/>
    <rect x="28" y="38" width="6" height="6" fill="#111"/>
    <rect x="38" y="38" width="6" height="6" fill="#111"/>
  </svg>
);

const CarteTicket = ({ label, type, prix, imgIdx }) => (
  <div style={{borderRadius:14,overflow:'hidden',border:'1.5px solid #e8e8e8',boxShadow:'0 2px 12px rgba(0,0,0,.07)'}}>
    <div style={{position:'relative',height:130,overflow:'hidden'}}>
      <ImgFb src={getImg(imgIdx)} fallback={getFb(imgIdx)} style={{width:'100%',height:'100%'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(255,90,0,0.72) 0%,rgba(255,90,0,0.18) 100%)'}}/>
      <div style={{position:'absolute',bottom:8,right:8}}><QRCode/></div>
    </div>
    <div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>
        <div style={{fontSize:13,fontWeight:400,color:'#111'}}>{label} <span style={{color:'#FF5A00',fontWeight:700}}>{type}</span></div>
        <div style={{fontSize:15,fontWeight:400,color:'#111',marginTop:3}}>{prix}</div>
      </div>
      <div style={{fontSize:12,color:'#22c55e',fontWeight:600}}>Disponible</div>
    </div>
  </div>
);

const IcoShare    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IcoPin      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoOrg      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#9f1239"/><polyline points="9 21 9 12 15 12 15 21" stroke="#9f1239"/><circle cx="18.5" cy="20" r="2" fill="#9f1239" stroke="none"/><path d="M18.5 18c0-2-2-3.5-2-3.5s-2 1.5-2 3.5" stroke="#9f1239"/></svg>;
const IcoCal      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoTicketIco= () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
const IcoElectIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoStandIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>;
const IcoDL       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

const onglets = ['Tickets','Elections','Stands','Support'];

const PageDetailEvenement = () => {
  const { id } = useParams();
  const { isMobile } = useResponsive();
  const ev = EVENEMENTS[parseInt(id)] || EVENEMENTS[1];
  const imgSrc = `/evenement${id||1}.jpg`;
  const [imgErr, setImgErr]      = useState(false);
  const [ongletActif, setOnglet] = useState('Tickets');

  const p = isMobile ? '16px' : '28px 24px 52px';

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <EntetePageDetail titre="Détails Évènement" droite={
        <div style={{width:36,height:36,borderRadius:10,border:'1.5px solid #eee',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><IcoShare/></div>
      }/>

      <div style={{maxWidth:900,margin:'0 auto',padding:p}}>

        {/* ── Info card : 2 colonnes desktop, 1 colonne mobile ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
          gap: isMobile ? 16 : 24,
          background:'#fff', border:'1px solid #efefef', borderRadius:16,
          padding: isMobile ? 16 : 24,
          marginBottom:28, boxShadow:'0 2px 16px rgba(0,0,0,.06)',
        }}>
          {/* Image */}
          <div style={{borderRadius:12,overflow:'hidden',height: isMobile ? 200 : 260,background:'linear-gradient(145deg,#92400e,#b45309)'}}>
            {!imgErr
              ? <img src={imgSrc} alt={ev.titre} onError={()=>setImgErr(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              : <div style={{width:'100%',height:'100%',background:'linear-gradient(145deg,#92400e,#b45309)',display:'flex',alignItems:'flex-end',padding:14}}><span style={{color:'#fff',fontSize:13,fontWeight:800,lineHeight:1.3}}>{ev.titre}</span></div>
            }
          </div>

          {/* Infos */}
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{fontSize: isMobile?15:17,fontWeight:800,color:'#111',marginBottom:8,lineHeight:1.3}}>{ev.titre.toUpperCase()}</div>
            <div style={{fontSize:12.5,color:'#666',lineHeight:1.72,marginBottom:12}}>La 2ᵉ édition des Prefe Awards met à l'honneur l'entrepreneuriat féminin au Burkina Faso.</div>
            {[
              {ico:<IcoPin/>,  label:'Lieu :',        val:ev.lieu,  color:'#16a34a'},
              {ico:<IcoOrg/>,  label:'Organisé Par :', val:ev.org,   color:'#9f1239'},
              {ico:<IcoCal/>,  label:'Date :',         val:ev.date,  color:'#333'},
              {ico:<IcoTicketIco/>, label:'Tickets :',  val:'Oui Disponible', color:'#16a34a'},
              {ico:<IcoElectIco/>, label:'Elections :', val:'Oui Disponible', color:'#16a34a'},
              {ico:<IcoStandIco/>, label:'Stands :',    val:'Oui Disponible', color:'#16a34a'},
            ].map((r,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:12.5,marginBottom:7}}>
                {r.ico}
                <span style={{color:'#888',minWidth: isMobile?80:100,flexShrink:0}}>{r.label}</span>
                <span style={{color:r.color,fontWeight:600}}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Onglets ── */}
        <div style={{display:'flex',background:'#f5f5f5',borderRadius:14,padding:5,marginBottom:28,border:'1px solid #e0e0e0'}}>
          {onglets.map(o=>{
            const active = ongletActif===o;
            return (
              <button key={o} onClick={()=>setOnglet(o)} style={{
                flex:1, padding: isMobile?'9px 0':'10px 0', textAlign:'center', borderRadius:10,
                fontSize: isMobile?12:13.5, fontWeight:active?700:400,
                color:active?'#fff':'#666', background:active?'#FF5A00':'transparent',
                border:active?'1px solid #e04e00':'1px solid transparent',
                cursor:'pointer', fontFamily:'Poppins,sans-serif', transition:'all .18s',
                boxShadow:active?'0 2px 8px rgba(255,90,0,.25)':'none',
              }}>{o}</button>
            );
          })}
        </div>

        {/* ── TICKETS ── */}
        {ongletActif==='Tickets' && (<>
          <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr':'1fr 1fr',gap:16}}>
            <CarteTicket label="Ticket" type="VIP"      prix="5.000 CFA" imgIdx={0}/>
            <CarteTicket label="Ticket" type="STANDARD" prix="2.500 CFA" imgIdx={1}/>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:32}}>
            <button style={{background:'linear-gradient(135deg,#FF5A00,#ff8c00)',color:'#fff',border:'none',borderRadius:12,padding:'13px 52px',fontSize:14,fontWeight:600,cursor:'pointer',boxShadow:'0 6px 20px rgba(255,90,0,.35)',fontFamily:'Poppins,sans-serif',width: isMobile?'100%':'auto'}}>Payer un ticket</button>
          </div>
        </>)}

        {/* ── ELECTIONS ── */}
        {ongletActif==='Elections' && (
          <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr':'1fr 1fr',gap:16}}>
            {[
              {titre:"JEUNE FILLE CODEUSE DE L'ANNÉE",ouvert:false,dates:"Du 22 Sept au 23 Sept",candidats:12,imgIdx:2},
              {titre:"JEUNE FOOTBALLEUSE DE L'ANNÉE",ouvert:true,dates:"Du 22 Sept au 23 Sept",candidats:10,imgIdx:3},
            ].map(el=>(
              <div key={el.titre} style={{border:'1px solid #efefef',borderRadius:14,overflow:'hidden',boxShadow:'0 1px 6px rgba(0,0,0,.05)'}}>
                <div style={{height:165,overflow:'hidden'}}><ImgFb src={getImg(el.imgIdx)} fallback={getFb(el.imgIdx)} style={{width:'100%',height:'100%'}}/></div>
                <div style={{padding:'14px 16px'}}>
                  <div style={{fontSize:13,fontWeight:700,color:'#111',marginBottom:10}}>{el.titre}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={el.ouvert?'#22c55e':'#ef4444'} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span style={{fontSize:12,fontWeight:700,color:el.ouvert?'#22c55e':'#ef4444'}}>{el.ouvert?'Ouvert':'Fermé'}</span></div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span style={{fontSize:12,color:'#888'}}>{el.dates}</span></div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span style={{fontSize:12,color:'#888'}}>{el.candidats} candidates</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STANDS ── */}
        {ongletActif==='Stands' && (<>
          <div style={{display:'grid',gridTemplateColumns: isMobile?'1fr':'1fr 1fr',gap:16}}>
            <CarteTicket label="Stand (9m x 9m)" type="VIP"      prix="50.000 CFA" imgIdx={4}/>
            <CarteTicket label="Stand (9m x 9m)" type="STANDARD" prix="25.000 CFA" imgIdx={5}/>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:32}}>
            <button style={{background:'linear-gradient(135deg,#FF5A00,#ff8c00)',color:'#fff',border:'none',borderRadius:12,padding:'13px 52px',fontSize:14,fontWeight:600,cursor:'pointer',boxShadow:'0 6px 20px rgba(255,90,0,.35)',fontFamily:'Poppins,sans-serif',width: isMobile?'100%':'auto'}}>Payer un ticket</button>
          </div>
        </>)}

        {/* ── SUPPORT ── */}
        {ongletActif==='Support' && (
          <div style={{border:'1px solid #efefef',borderRadius:12,padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:14,fontWeight:600,color:'#333',fontFamily:'Poppins,sans-serif'}}>TDR</span>
            <IcoDL/>
          </div>
        )}
      </div>
      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageDetailEvenement;
