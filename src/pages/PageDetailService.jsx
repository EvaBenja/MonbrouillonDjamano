import React, { useState } from 'react';
const svcBanner = (id) => `/services/service${id || 1}.jpg`;
const detailImg = (n) => `/detailsimages/details${(n % 6) + 1}.jpg`;
const detailFb  = ['linear-gradient(145deg,#f97316,#ea580c)','linear-gradient(145deg,#c2410c,#ea580c)','linear-gradient(145deg,#0891b2,#06b6d4)','linear-gradient(145deg,#065f46,#059669)'];
const ImgFb = ({ src, fallback, style }) => { const [e, setE] = React.useState(false); return e ? React.createElement('div',{style:{...style,background:fallback}}) : React.createElement('img',{src,alt:'',onError:()=>setE(true),style:{...style,objectFit:'cover',display:'block'}}); };
import { useNavigate } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import Pagination from '../composants-communs/Pagination';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const cats = ['Tout','Restaurations','Pâtisserie','Location'];

const produits = [
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Crudité',      prix:'A partir de 5.000Fr',   type:'Commander', g:'linear-gradient(145deg,#f97316,#ea580c)' },
  { nom:'Salle de mariage',  prix:'A partir de 150.000/Jr', type:'Réserver', g:'linear-gradient(145deg,#c2410c,#ea580c)' },
  { nom:'Salle de mariage',  prix:'A partir de 150.000/Jr', type:'Réserver', g:'linear-gradient(145deg,#c2410c,#ea580c)' },
  { nom:'Salle de mariage',  prix:'A partir de 150.000/Jr', type:'Réserver', g:'linear-gradient(145deg,#c2410c,#ea580c)' },
];

const avis = [
  { note:3.5 }, { note:3.5 }, { note:3.5 }, { note:3.5 },
];

const EtoileNote = ({ note }) => (
  <div style={{ display:'flex',gap:2 }}>
    {[...Array(5)].map((_,i) => <span key={i} style={{ fontSize:12,color:i<Math.floor(note)?'#FF5A00':'#ddd' }}>★</span>)}
  </div>
);

const PageDetailService = () => {
  const navigate = useNavigate();
  const [catActive, setCatActive] = useState('Tout');
  const [page, setPage] = useState(1);

  const s = {
    page: { background:'#fff', minHeight:'100vh', fontFamily:'Poppins, sans-serif' },
    /* Bannière */
    banner: { width:'100%', height:280, position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#065f46,#059669)' },
    bannerContent: { position:'absolute', bottom:-38, left:32, display:'flex', alignItems:'flex-end', gap:16 },
    avatarRond: {
      width:76, height:76, borderRadius:'50%',
      border:'4px solid #fff',
      background:'linear-gradient(135deg,#FF5A00,#ff8c00)',
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', fontSize:28, fontWeight:700,
      fontFamily:'Poppins, sans-serif', boxShadow:'0 4px 16px rgba(0,0,0,.15)',
    },
    statsRow: { position:'absolute', bottom:16, right:24, display:'flex', gap:14, alignItems:'center' },
    statItem: { display:'flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:'#fff' },
    /* Inner */
    inner: { maxWidth:1200, margin:'0 auto', padding:'56px 32px 40px' },
    location: { display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#555', marginBottom:20 },
    /* 2 colonnes */
    mainGrid: { display:'grid', gridTemplateColumns:'1fr 320px', gap:40, marginTop:4 },
    /* Gauche */
    nomService: { fontSize:17, fontWeight:700, color:'#111', marginBottom:8 },
    descService: { fontSize:13, color:'#666', lineHeight:1.72, marginBottom:20 },
    servicesLink: { display:'flex', alignItems:'center', gap:4, fontSize:13, color:'#FF5A00', fontWeight:600, cursor:'pointer', marginBottom:16 },
    catLabel: { fontSize:12, color:'#888', marginBottom:10 },
    cats: { display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' },
    cat: (a) => ({ padding:'6px 16px', borderRadius:20, fontSize:12.5, fontWeight:a?600:400, color:a?'#fff':'#555', background:a?'#FF5A00':'#f0f0f0', border:'none', cursor:'pointer', fontFamily:'Poppins, sans-serif' }),
    grid3: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 },
    prodCard: { border:'1px solid #efefef', borderRadius:10, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.04)' },
    prodImg: (g) => ({ width:'100%', height:85, background:g }),
    prodBody: { padding:'8px 10px' },
    prodNom: { fontSize:11.5, fontWeight:600, color:'#111' },
    prodPrix: { fontSize:11, color:'#888', marginTop:2 },
    prodBtn: (t) => ({
      marginTop:6, width:'100%', borderRadius:6, padding:'5px 0', fontSize:11.5, fontWeight:600,
      cursor:'pointer', fontFamily:'Poppins, sans-serif',
      background:t==='Commander'?'transparent':'#FF5A00',
      color:t==='Commander'?'#FF5A00':'#fff',
      border:t==='Commander'?'1.5px solid #FF5A00':'none',
    }),
    /* Droite */
    avisTitre: { fontSize:15, fontWeight:700, color:'#111', marginBottom:14 },
    avisGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:28 },
    avisCard: { border:'1px solid #efefef', borderRadius:12, padding:12 },
    avisHead: { display:'flex', alignItems:'center', gap:7, marginBottom:8 },
    avisAvatar: { width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#FF5A00,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:700, flexShrink:0 },
    avisNom: { fontSize:12, fontWeight:700, color:'#111' },
    avisBadge: { fontSize:10, color:'#aaa' },
    avisDate: { fontSize:11, color:'#bbb', marginLeft:'auto' },
    avisTexte: { fontSize:11.5, color:'#666', lineHeight:1.65 },
    portfolioTitre: { fontSize:15, fontWeight:700, color:'#111', marginBottom:10 },
    portGrid: { display:'flex', flexDirection:'column', gap:10 },
    portImg: (g) => ({ width:'100%', height:110, borderRadius:10, background:g }),
    /* Message */
    msgWrap: { display:'flex', justifyContent:'center', padding:'28px 0 0' },
    msgInput: { width:'320px', border:'1.5px solid #e8e8e8', borderRadius:24, padding:'11px 22px', fontSize:13.5, color:'#aaa', outline:'none', fontFamily:'Poppins, sans-serif', background:'#fff' },
  };

  return (
    <div style={s.page}>
      <EntetePageDetail />

      {/* Bannière */}
      <div style={s.banner}><ImgFb src={svcBanner(1)} fallback='linear-gradient(135deg,#065f46,#059669)' style={{ width:'100%', height:'100%', position:'absolute', top:0, left:0 }} />
        <div style={s.bannerContent}>
          <div style={s.avatarRond}>M</div>
        </div>
        <div style={s.statsRow}>
          <div style={s.statItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            300 K
          </div>
          <div style={s.statItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </div>
        </div>
      </div>

      <div style={s.inner}>
        <div style={s.location}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Ouagadougou, patte d'oie
        </div>

        <div style={s.mainGrid}>
          {/* Gauche */}
          <div>
            <div style={s.nomService}>MAM SANK</div>
            <p style={s.descService}>
              Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Il n'a pas fait que survivre cinq siècles...
              <span style={{ color:'#FF5A00',fontWeight:600,cursor:'pointer' }}> Afficher plus ...</span>
            </p>

            <div style={s.servicesLink}>Services proposées &nbsp;›</div>
            <div style={s.catLabel}>Catégorie :</div>
            <div style={s.cats}>
              {cats.map(c => <button key={c} style={s.cat(catActive===c)} onClick={()=>setCatActive(c)}>{c}</button>)}
            </div>

            <div style={s.grid3}>
              {produits.map((p,i) => (
                <div key={i} style={s.prodCard}>
                  <ImgFb src={detailImg(i)} fallback={detailFb[i % 4]} style={{ width:'100%', height:85 }} />
                  <div style={s.prodBody}>
                    <div style={s.prodNom}>{p.nom}</div>
                    <div style={s.prodPrix}>{p.prix}</div>
                    <button style={s.prodBtn(p.type)}>{p.type}</button>
                  </div>
                </div>
              ))}
            </div>

            <Pagination page={page} total={4} onChange={setPage} />
          </div>

          {/* Droite */}
          <div>
            <div style={s.avisTitre}>Avis des clients</div>
            <div style={s.avisGrid}>
              {avis.map((a,i) => (
                <div key={i} style={s.avisCard}>
                  <div style={s.avisHead}>
                    <div style={s.avisAvatar}>J</div>
                    <div>
                      <div style={s.avisNom}>Jean Emmanuel Bitié</div>
                      <div style={s.avisBadge}>Certifié</div>
                    </div>
                    <span style={s.avisDate}>Il y a 3 jours</span>
                  </div>
                  <EtoileNote note={a.note} />
                  <div style={{ ...s.avisTexte, marginTop:8 }}>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</div>
                </div>
              ))}
            </div>

            <div style={s.portfolioTitre}>Portfolio</div>
            <div style={s.portGrid}>
              {[0,1].map((_,i) => (
                <div key={i} style={{ borderRadius:10, overflow:'hidden', marginBottom:8 }}><ImgFb src={detailImg(i+4)} fallback={detailFb[i]} style={{ width:'100%', height:110 }} /></div>
              ))}
            </div>
          </div>
        </div>

        {/* Message */}
        <div style={s.msgWrap}>
          <input style={s.msgInput} placeholder="Message" readOnly />
        </div>
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageDetailService;
