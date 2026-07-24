import { useNavigate } from 'react-router-dom';
import NavbarPages from '../composants-communs/NavbarPages';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

const PROFIL = {
  nom: 'MAMOUNATA SAWADOGO',
  entreprise: 'CHITIR',
  categories: ['Restauration', 'Service traiteur', 'Restauration'],
  description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit de l'imprimerie depuis ....",
  lieu: "Ouagadougou, patte d'oie",
  tel: '+226 44 44 44 44',
  email: 'chitir@gmail.com',
  likes: '300 K',
  avatarPersonne: '/experiences/personne1.jpg',
  avatarEntreprise: '/services/service1.jpg',
  banner: '/services/service2.jpg',
};

const CATS = ['Tout', 'Restaurations', 'Pâtisserie', 'Location'];
const detailImg = n => `/detailsimages/details${(n % 6) + 1}.jpg`;
const evtImg    = n => `/evenement${(n % 14) + 1}.jpg`;
const fallbacks = [
  'linear-gradient(145deg,#92400e,#d97706)','linear-gradient(145deg,#065f46,#059669)',
  'linear-gradient(145deg,#4338ca,#6366f1)','linear-gradient(145deg,#be185d,#ec4899)',
  'linear-gradient(145deg,#dc2626,#ef4444)','linear-gradient(145deg,#0891b2,#06b6d4)',
];

const Img = ({ src, fallback, style={} }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{...style, background:fallback}}/>
    : <img src={src} alt="" onError={()=>setErr(true)} style={{...style, objectFit:'cover', display:'block'}}/>;
};

const IcoEdit   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoPin    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoPhone  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.91 5.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IcoMail   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IcoFB     = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IcoTikTok = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="#111"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.19 8.19 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>;
const IcoWA     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
const IcoTrash  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoStats  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoChevron= () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

const BtnOutline = ({ children, onClick, red }) => (
  <button onClick={onClick} style={{border:`1.5px solid ${red?'#ef4444':'#FF5A00'}`,background:'#fff',color:red?'#ef4444':'#FF5A00',borderRadius:8,padding:'7px 12px',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif',display:'flex',alignItems:'center',gap:4}}>
    {children}
  </button>
);

const TitreSection = ({ titre, onClick }) => (
  <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:4,fontSize:16,fontWeight:800,color:'#111',marginBottom:16,fontFamily:'Poppins,sans-serif',cursor:'pointer'}}>
    {titre} <IcoChevron/>
  </div>
);

const VoirPlus = () => (
  <div style={{display:'flex',alignItems:'center',gap:4,fontSize:13,fontWeight:600,color:'#111',marginTop:16,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
    Voir plus <IcoChevron/>
  </div>
);

const FiltresCats = ({ active, setActive }) => (
  <div style={{marginBottom:18}}>
    <div style={{fontSize:12.5,color:'#888',marginBottom:8,fontFamily:'Poppins,sans-serif'}}>Catégorie :</div>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {CATS.map(c=>(
        <button key={c} onClick={()=>setActive(c)} style={{padding:'6px 14px',borderRadius:20,fontSize:12.5,fontWeight:active===c?600:400,color:active===c?'#fff':'#555',background:active===c?'#FF5A00':'#f0f0f0',border:'none',cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
          {c}
        </button>
      ))}
    </div>
  </div>
);

const PageProfil = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [catSvc, setCatSvc]     = useState('Tout');
  const [catEvt, setCatEvt]     = useState('Tout');
  const [ongletStats, setOngletStats] = useState('Populaire');

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>
      <NavbarPages/>

      {/* ── BANNIÈRE ── */}
      <div style={{position:'relative',width:'100%',height:isMobile?160:220,overflow:'hidden',background:fallbacks[0]}}>
        <Img src={PROFIL.banner} fallback={fallbacks[0]} style={{width:'100%',height:'100%'}}/>
        {/* 300K ❤️ + partage */}
        <div style={{position:'absolute',top:16,right:20,display:'flex',alignItems:'center',gap:14}}>
          <div style={{display:'flex',alignItems:'center',gap:6,color:'#fff',fontSize:14,fontWeight:700}}>
            {PROFIL.likes}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </div>
        </div>
        {/* 2 avatars chevauchés */}
        <div style={{position:'absolute',bottom:-30,left:isMobile?16:32,display:'flex',alignItems:'flex-end'}}>
          <div style={{width:isMobile?70:90,height:isMobile?70:90,borderRadius:'50%',border:'3px solid #fff',overflow:'hidden',background:fallbacks[1],boxShadow:'0 4px 12px rgba(0,0,0,.15)',flexShrink:0}}>
            <Img src={PROFIL.avatarPersonne} fallback={fallbacks[1]} style={{width:'100%',height:'100%'}}/>
          </div>
          <div style={{width:isMobile?50:64,height:isMobile?50:64,borderRadius:'50%',border:'3px solid #FF5A00',overflow:'hidden',background:fallbacks[4],marginLeft:-14,marginBottom:0,boxShadow:'0 4px 12px rgba(0,0,0,.15)',flexShrink:0}}>
            <Img src={PROFIL.avatarEntreprise} fallback={fallbacks[4]} style={{width:'100%',height:'100%'}}/>
          </div>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{maxWidth:1200,margin:'0 auto',padding:isMobile?'48px 16px 40px':'56px 28px 40px'}}>

        {/* LIGNE 1 : Infos + Portfolio */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?28:40,marginBottom:48}}>

          {/* ── Carte infos ── */}
          <div style={{border:'1px solid #efefef',borderRadius:16,padding:isMobile?16:24,position:'relative',boxShadow:'0 2px 12px rgba(0,0,0,.05)'}}>
            <div style={{position:'absolute',top:14,right:14,width:36,height:36,borderRadius:'50%',background:'#FF5A00',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 4px 12px rgba(255,90,0,.3)'}}>
              <IcoEdit/>
            </div>
            <div style={{fontSize:isMobile?15:17,fontWeight:800,color:'#111',marginBottom:5}}>{PROFIL.nom}</div>
            <div style={{fontSize:13,fontWeight:700,color:'#333',marginBottom:8}}>Entreprise : {PROFIL.entreprise}</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
              {PROFIL.categories.map((c,i)=>(
                <span key={i} style={{fontSize:12.5,color:'#555',fontWeight:500}}>
                  {c}{i<PROFIL.categories.length-1?' •':''}
                </span>
              ))}
            </div>
            <p style={{fontSize:12.5,color:'#666',lineHeight:1.72,marginBottom:16}}>{PROFIL.description}</p>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}><IcoPin/><span style={{fontSize:13,color:'#333'}}>{PROFIL.lieu}</span></div>
              <div style={{display:'flex',alignItems:'center',gap:10}}><IcoPhone/><span style={{fontSize:13,color:'#333'}}>{PROFIL.tel}</span></div>
              <div style={{display:'flex',alignItems:'center',gap:10}}><IcoMail/><span style={{fontSize:13,color:'#333'}}>{PROFIL.email}</span></div>
            </div>
            <div style={{fontSize:13,fontWeight:700,color:'#111',marginBottom:10}}>Réseaux sociaux</div>
            <div style={{display:'flex',gap:12,marginBottom:18}}>
              <IcoFB/><IcoTikTok/>
            </div>
            <button style={{display:'flex',alignItems:'center',gap:8,border:'1.5px solid #25D366',background:'#fff',color:'#25D366',borderRadius:10,padding:'10px 18px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
              <IcoWA/> Discuter sur whatsapp
            </button>
          </div>

          {/* ── Portfolio ── */}
          <div>
            <TitreSection titre="Portfolio" onClick={()=>navigate("/profil")}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{aspectRatio:'1/1',borderRadius:10,overflow:'hidden'}}>
                  <Img src={detailImg(i)} fallback={fallbacks[i%fallbacks.length]} style={{width:'100%',height:'100%'}}/>
                </div>
              ))}
              {/* case + bouton orange sur image sombre */}
              <div style={{aspectRatio:'1/1',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <Img src={detailImg(5)} fallback={fallbacks[5%fallbacks.length]} style={{width:'100%',height:'100%',filter:'brightness(0.45)'}}/>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{width:36,height:36,borderRadius:'50%',background:'#FF5A00',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 4px 12px rgba(255,90,0,.4)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <VoirPlus/>
          </div>
        </div>

        {/* LIGNE 2 : Mes services + Mes évènements */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?36:48,marginBottom:48}}>

          {/* ── Mes services ── */}
          <div>
            <TitreSection titre="Mes services" onClick={()=>navigate("/proposer-service")}/>
            <FiltresCats active={catSvc} setActive={setCatSvc}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {[0,1,2,3,4,5].map(i=>(
                <div key={i} style={{border:'1px solid #efefef',borderRadius:10,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
                  <div style={{position:'relative',height:isMobile?70:85,overflow:'hidden'}}>
                    <Img src={detailImg(i)} fallback={fallbacks[i%fallbacks.length]} style={{width:'100%',height:'100%'}}/>
                    <div style={{position:'absolute',top:5,right:5,width:22,height:22,borderRadius:6,background:'rgba(255,255,255,0.92)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                      <IcoTrash/>
                    </div>
                  </div>
                  <div style={{padding:'8px 8px'}}>
                    <div style={{fontSize:11.5,fontWeight:700,color:'#111'}}>Crudité</div>
                    <div style={{fontSize:10.5,color:'#888',marginTop:2,marginBottom:7}}>A partir de 5.000Fr</div>
                    <BtnOutline onClick={()=>navigate("/proposer-service")}>Modifier</BtnOutline>
                  </div>
                </div>
              ))}
            </div>
            <VoirPlus/>
          </div>

          {/* ── Mes évènements ── */}
          <div>
            <TitreSection titre="Mes évènements" onClick={()=>navigate("/mes-evenements")}/>
            <FiltresCats active={catEvt} setActive={setCatEvt}/>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {[0,1].map(i=>(
                <div key={i} style={{border:'1px solid #efefef',borderRadius:12,overflow:'hidden',boxShadow:'0 1px 6px rgba(0,0,0,.05)'}}>
                  <div style={{height:isMobile?130:150,overflow:'hidden'}}>
                    <Img src={evtImg(i)} fallback={fallbacks[i%fallbacks.length]} style={{width:'100%',height:'100%'}}/>
                  </div>
                  <div style={{padding:'12px 14px'}}>
                    <div style={{fontSize:13,fontWeight:800,color:'#111',textTransform:'uppercase',marginBottom:6}}>SALLE CLIMATISÉE</div>
                    <p style={{fontSize:12,color:'#666',lineHeight:1.6,marginBottom:12}}>Plongez Dans Une Bulle De Fraîcheur Instantanée. Grâce À Notre Système De Climatisation Intelligente De Dernière Génération, Nous Vous Garantissons Une Température Constante...</p>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      <BtnOutline onClick={()=>navigate(`/modifier-evenement/${i+1}`)}>Modifier</BtnOutline>
                      <BtnOutline onClick={()=>navigate(`/statistiques-evenement/${i+1}`)}><IcoStats/> Statistiques</BtnOutline>
                      <BtnOutline red>Supprimer</BtnOutline>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <VoirPlus/>
          </div>
        </div>

        {/* ── STATISTIQUES DU MOMENT ── */}
        <div style={{borderTop:'1px solid #f0f0f0',paddingTop:36}}>
          <div style={{fontSize:isMobile?17:21,fontWeight:800,color:'#111',marginBottom:20,fontFamily:'Poppins,sans-serif'}}>
            Les statistiques des meilleurs du moment
          </div>
          <div style={{display:'flex',gap:isMobile?20:32,borderBottom:'1.5px solid #ececec',marginBottom:24,overflowX:'auto'}}>
            {['Populaire','Ouagadougou','Bobo Dioulasso'].map(o=>(
              <div key={o} onClick={()=>setOngletStats(o)} style={{fontSize:14,fontWeight:ongletStats===o?700:400,color:ongletStats===o?'#111':'#aaa',paddingBottom:10,borderBottom:ongletStats===o?'2.5px solid #111':'2.5px solid transparent',cursor:'pointer',fontFamily:'Poppins,sans-serif',whiteSpace:'nowrap',transition:'all .15s'}}>
                {o}
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:isMobile?14:24,overflowX:'auto',paddingBottom:8,scrollbarWidth:'none'}}>
            {['Restauration','Location de matériel sonore','Sécurité évènementielle','Vidéo diffusement','Traiteur'].map((cat,i)=>(
              <div key={i} style={{flexShrink:0,fontSize:13,fontWeight:i===0?700:400,color:'#333',paddingBottom:8,borderBottom:i===0?'2px solid #FF5A00':'none',cursor:'pointer',fontFamily:'Poppins,sans-serif',whiteSpace:'nowrap'}}>
                {cat}
              </div>
            ))}
          </div>
        </div>

      </div>

      <StatistiquesBas/>
      <PiedDePage/>
    </div>
  );
};

export default PageProfil;
