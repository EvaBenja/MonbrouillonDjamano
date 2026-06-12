import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

/* ── Images ── */
const svcBannerSrc = (id) => `/services/service${id || 1}.jpg`;
const svcProfilSrc = (id) => `/services/service${id || 1}.jpg`;
const detailImgSrc = (n)  => `/detailsimages/details${(n % 6) + 1}.jpg`;
const personneImgs = [
  '/experiences/personne1.jpg','/experiences/personne2.jpg',
  '/experiences/personne3.jpg','/experiences/personne4.jpg',
];
const fbs = [
  'linear-gradient(145deg,#f97316,#ea580c)',
  'linear-gradient(145deg,#c2410c,#ea580c)',
  'linear-gradient(145deg,#0891b2,#06b6d4)',
  'linear-gradient(145deg,#065f46,#059669)',
  'linear-gradient(145deg,#7c3aed,#6d28d9)',
  'linear-gradient(145deg,#1d4ed8,#4338ca)',
];

/* ── Image avec fallback ── */
const Img = ({ src, fallback, style = {}, round = false }) => {
  const [err, setErr] = useState(false);
  const base = { objectFit: 'cover', display: 'block', ...style };
  const wrap = round ? { borderRadius: '50%', overflow: 'hidden', ...style } : {};
  if (round) {
    return (
      <div style={wrap}>
        {err
          ? <div style={{ width: '100%', height: '100%', background: fallback }} />
          : <img src={src} alt="" onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        }
      </div>
    );
  }
  return err
    ? <div style={{ ...base, background: fallback }} />
    : <img src={src} alt="" onError={() => setErr(true)} style={base} />;
};

/* ── Données services ── */
const SERVICES = {
  1:{nom:'MAM SANK',       loc:"Ouagadougou, patte d'oie"},
  2:{nom:'MAM SANK',       loc:"Ouagadougou, patte d'oie"},
  3:{nom:'LE GONDWANA',    loc:"Ouagadougou, Koulouba"},
  4:{nom:'BSL COMMUNICATION',loc:"Ouagadougou, Hamdalaye"},
  5:{nom:'PTIT PARIS',     loc:"Ouagadougou, Petit Paris"},
  6:{nom:'FAIRY-TALE-EVENT',loc:"Ouagadougou, Zogona"},
  7:{nom:'LA MAISON BLANCHE 4G',loc:"Bobo-Dioulasso"},
  8:{nom:'KPI SECURITY SARL',  loc:"Bobo-Dioulasso"},
  9:{nom:'COMPLEXE YAMPOUTIN', loc:"Bobo-Dioulasso"},
  10:{nom:'SALLE DE FÊTE OR',  loc:"Autres villes"},
  11:{nom:'SWISS GLACES',      loc:"Suisse"},
  12:{nom:'SALEM SONORE',      loc:"Ouagadougou"},
};

const cats = ['Tout','Restaurations','Pâtisserie','Location'];

const produits = [
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Crudité',       prix:'A partir de 5.000Fr',    type:'Commander' },
  { nom:'Salle de mariage', prix:'A partir de 150.000/Jr', type:'Réserver' },
  { nom:'Salle de mariage', prix:'A partir de 150.000/Jr', type:'Réserver' },
  { nom:'Salle de mariage', prix:'A partir de 150.000/Jr', type:'Réserver' },
];

/* ── Étoiles noires ── */
const Etoiles = ({ note, date }) => (
  <div style={{ display:'flex', alignItems:'center', gap:4, flexWrap:'wrap' }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ fontSize:11, color:'#111', lineHeight:1 }}>★</span>
    ))}
    <span style={{ fontSize:10.5, color:'#aaa', marginLeft:4 }}>{date}</span>
  </div>
);

const PageDetailService = () => {
  const { id } = useParams();
  const svcId = parseInt(id) || 1;
  const svc = SERVICES[svcId] || SERVICES[1];
  const [catActive, setCatActive] = useState('Tout');
  const [page, setPage] = useState(1);
  const [prodPage, setProdPage] = useState(0);
  const PER_PAGE = 9;
  const prodVisible = produits.slice(prodPage * PER_PAGE, (prodPage + 1) * PER_PAGE);

  const IcoPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins, sans-serif' }}>
      <EntetePageDetail />

      {/* ── Bannière image (hauteur réduite) + avatar profil rond ── */}
      <div style={{ position:'relative', width:'100%', height:220, overflow:'hidden', background: fbs[svcId % fbs.length] }}>
        <Img src={svcBannerSrc(svcId)} fallback={fbs[svcId % fbs.length]} style={{ width:'100%', height:'100%' }} />
        {/* Gradient overlay bas */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }} />
        {/* Stats haut droite */}
        <div style={{ position:'absolute', bottom:16, right:24, display:'flex', gap:14, alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:'#fff' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            300 K
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </div>
        </div>
        {/* Avatar profil rond — positionné en bas gauche, chevauchant la bannière */}
        <div style={{
          position:'absolute', bottom:-36, left:28,
          width:74, height:74, borderRadius:'50%',
          border:'4px solid #fff',
          boxShadow:'0 4px 16px rgba(0,0,0,.18)',
          overflow:'hidden', background: fbs[(svcId+1) % fbs.length],
        }}>
          <Img src={svcProfilSrc(svcId)} fallback={fbs[(svcId+1) % fbs.length]} style={{ width:'100%', height:'100%' }} />
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'52px 24px 40px' }}>

        {/* Localisation */}
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#555', marginBottom:20 }}>
          <IcoPin />
          {svc.loc}
        </div>

        {/* Grid 2 colonnes responsive */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'minmax(0,1fr) 300px',
          gap:36,
        }}>

          {/* ── COLONNE GAUCHE ── */}
          <div>
            {/* Nom + description */}
            <div style={{ fontSize:16, fontWeight:700, color:'#111', marginBottom:8 }}>{svc.nom}</div>
            <p style={{ fontSize:13, color:'#666', lineHeight:1.72, marginBottom:16 }}>
              Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique...
              <span style={{ color:'#111', fontWeight:700, cursor:'pointer' }}> Afficher plus ...</span>
            </p>

            {/* Services proposées — en noir */}
            <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, color:'#111', fontWeight:700, cursor:'pointer', marginBottom:14 }}>
              Services proposées &nbsp;›
            </div>

            {/* Catégories */}
            <div style={{ fontSize:12, color:'#888', marginBottom:8 }}>Catégorie :</div>
            <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }}>
              {cats.map(c => (
                <button
                  key={c}
                  onClick={() => setCatActive(c)}
                  style={{
                    padding:'6px 16px', borderRadius:20,
                    fontSize:12.5, fontWeight: catActive===c ? 600 : 400,
                    color: catActive===c ? '#fff' : '#555',
                    background: catActive===c ? '#FF5A00' : '#f0f0f0',
                    border:'none', cursor:'pointer', fontFamily:'Poppins, sans-serif',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grille produits */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:11, marginBottom:12 }}>
              {prodVisible.map((p, i) => (
                <div key={i} style={{ border:'1px solid #efefef', borderRadius:10, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
                  <div style={{ width:'100%', height:82, overflow:'hidden' }}>
                    <Img src={detailImgSrc(i)} fallback={fbs[i % fbs.length]} style={{ width:'100%', height:'100%' }} />
                  </div>
                  <div style={{ padding:'8px 10px' }}>
                    <div style={{ fontSize:11.5, fontWeight:600, color:'#111' }}>{p.nom}</div>
                    <div style={{ fontSize:11, color:'#888', marginTop:2 }}>{p.prix}</div>
                    {/* Bouton Commander = bordure orange | Réserver = fond orange */}
                    <button style={{
                      marginTop:6, width:'100%', borderRadius:6, padding:'5px 0',
                      fontSize:11.5, fontWeight:600, cursor:'pointer',
                      fontFamily:'Poppins, sans-serif',
                      background: p.type === 'Réserver' ? '#FF5A00' : 'transparent',
                      color:       p.type === 'Réserver' ? '#fff'    : '#FF5A00',
                      border:      p.type === 'Réserver' ? 'none'    : '1.5px solid #FF5A00',
                    }}>
                      {p.type}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination produits simple */}
            <div style={{ display:'flex', justifyContent:'center', gap:8, padding:'12px 0 24px' }}>
              {[0,1,2,3].map(i => (
                <div
                  key={i}
                  onClick={() => setProdPage(i)}
                  style={{
                    width:32, height:32, borderRadius:'50%', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, fontWeight: prodPage===i ? 700 : 400,
                    background: prodPage===i ? '#FF5A00' : '#fff',
                    color:      prodPage===i ? '#fff'    : '#555',
                    border:     prodPage===i ? 'none'    : '1.5px solid #e0e0e0',
                  }}
                >
                  {i+1}
                </div>
              ))}
            </div>
          </div>

          {/* ── COLONNE DROITE ── */}
          <div>
            {/* Avis clients */}
            <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:12 }}>Avis des clients</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:24 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ border:'1px solid #efefef', borderRadius:12, padding:11 }}>
                  {/* Header : avatar photo + nom + date sur même ligne */}
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7 }}>
                    {/* Avatar = vraie photo personne */}
                    <div style={{ width:28, height:28, borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
                      <Img src={personneImgs[i % personneImgs.length]} fallback={fbs[i % fbs.length]} style={{ width:'100%', height:'100%' }} />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:'#111', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Jean E. Bitié</div>
                      <div style={{ fontSize:9.5, color:'#aaa' }}>Certifié</div>
                    </div>
                  </div>
                  {/* Étoiles noires + date sur même ligne */}
                  <Etoiles note={3.5} date="Il y a 3 jours" />
                  {/* Texte avis */}
                  <div style={{ fontSize:11, color:'#666', lineHeight:1.6, marginTop:7 }}>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                  </div>
                </div>
              ))}
            </div>

            {/* Portfolio */}
            <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:10 }}>Portfolio</div>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {[4, 5].map((n, i) => (
                <div key={i} style={{ borderRadius:10, overflow:'hidden', height:108 }}>
                  <Img src={detailImgSrc(n)} fallback={fbs[i]} style={{ width:'100%', height:'100%' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Champ message centré */}
        <div style={{ display:'flex', justifyContent:'center', padding:'28px 0 8px' }}>
          <div style={{
            width:'100%', maxWidth:420,
            border:'1.5px solid #e8e8e8', borderRadius:24,
            padding:'11px 22px', fontSize:13.5, color:'#aaa',
            fontFamily:'Poppins, sans-serif', background:'#fff',
            display:'flex', alignItems:'center', gap:8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Message
          </div>
        </div>
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageDetailService;
