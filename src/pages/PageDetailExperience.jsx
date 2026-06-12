import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const personneImgs = [
  '/experiences/personne1.jpg','/experiences/personne2.jpg',
  '/experiences/personne3.jpg','/experiences/personne4.jpg',
  '/experiences/personne5.jpg','/experiences/personne6.jpg',
  '/experiences/personne7.jpg','/experiences/personne8.jpg',
  '/experiences/personne9.jpg','/experiences/personne10.jpg',
];
const fallbacks = [
  'linear-gradient(135deg,#1d4ed8,#4338ca)',
  'linear-gradient(135deg,#dc2626,#b91c1c)',
  'linear-gradient(135deg,#065f46,#047857)',
  'linear-gradient(135deg,#7c3aed,#6d28d9)',
  'linear-gradient(135deg,#b45309,#92400e)',
];

const EXPERIENCES = {
  1:  { nom:'Jean Emmanuel Bitié', role:'Utilisateur',         hybride:false, views:'5.4k',  temps:"il y'a 12h",         img:0 },
  2:  { nom:'Marienne Barry',      role:'Utilisateur Hybride', hybride:true,  views:'10.8k', temps:"il y'a 22h",         img:1 },
  3:  { nom:'Edouard Ouédraogo',   role:'Utilisateur',         hybride:false, views:'5.4k',  temps:"il y'a 1 Jour",      img:2 },
  4:  { nom:'Maïmouna Traoré',     role:'Utilisateur Hybride', hybride:true,  views:'50k',   temps:"il y'a 24h",         img:3 },
  5:  { nom:'Jean Emmanuel Bitié', role:'Utilisateur',         hybride:false, views:'6.4k',  temps:"il y'a 3 jours",     img:4 },
  6:  { nom:'Jean Emmanuel Bitié', role:'Utilisateur',         hybride:false, views:'9.9k',  temps:"il y'a une semaine", img:5 },
  7:  { nom:'Donald Dao',          role:'Utilisateur Hybride', hybride:true,  views:'15k',   temps:'Hier',               img:6 },
  8:  { nom:'Yasmine Traoré',      role:'Utilisateur',         hybride:false, views:'8k',    temps:'10 Octobre',         img:7 },
  9:  { nom:'Yasmine Traoré',      role:'Utilisateur',         hybride:false, views:'8k',    temps:'10 Octobre',         img:8 },
  10: { nom:'Darlène Jad Nikiema', role:'Utilisateur',         hybride:false, views:'25k',   temps:'22 décembre',        img:9 },
};

const ImgFallback = ({ src, fallback, style }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{ ...style, background: fallback }} />
    : <img src={src} alt="" onError={() => setErr(true)} style={{ ...style, objectFit:'cover', display:'block' }} />;
};

const postsRecents = [0, 1, 2, 3, 4].map(i => ({
  img: personneImgs[i % personneImgs.length],
  fb:  fallbacks[i % fallbacks.length],
  views: ['5.4k','9.9k','6.4k','10.8k','15k'][i],
  temps: ["il y'a 12h","il y'a une semaine","il y'a 3 jours","il y'a 22h",'Hier'][i],
}));

const commentaires = Array(4).fill("WAOUH ! J'ai passé un moment incroyable au restaurant de Katia ! La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails à travers les cadeaux, la musique live et la nourriture Je ne ...");

const IcoBack  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoGlobe = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IcoMenu  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;

const PageDetailExperience = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const exp = EXPERIENCES[parseInt(id)] || EXPERIENCES[1];
  const [postActif, setPostActif] = useState(0);

  const iconBtn = {
    width:36, height:36, borderRadius:9, border:'1.5px solid #eee',
    background:'#fff', display:'flex', alignItems:'center',
    justifyContent:'center', cursor:'pointer',
  };

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins, sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 24px', borderBottom:'1px solid #f5f5f5', position:'sticky', top:0, background:'#fff', zIndex:100 }}>
        <div style={iconBtn} onClick={() => navigate(-1)}><IcoBack /></div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={iconBtn}><IcoGlobe /></div>
          <div style={iconBtn}><IcoMenu /></div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 32px 0' }}>

        {/* ── Bannières 2 images CARRÉES ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:32 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ borderRadius:14, height:160, overflow:'hidden' }}>
              <ImgFallback
                src={personneImgs[(exp.img + i + 1) % personneImgs.length]}
                fallback={fallbacks[i % fallbacks.length]}
                style={{ width:'100%', height:'100%' }}
              />
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:32 }}>

          {/* ── SIDEBAR ── */}
          <div>
            {/* Profil card */}
            <div style={{ border:'1px solid #efefef', borderRadius:16, padding:20, textAlign:'center', marginBottom:20, boxShadow:'0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ width:72, height:72, borderRadius:'50%', overflow:'hidden', margin:'0 auto 12px', border:'1.5px solid #eee', boxShadow:'0 2px 8px rgba(0,0,0,.1)' }}>
                <ImgFallback
                  src={personneImgs[exp.img]}
                  fallback={fallbacks[exp.img % fallbacks.length]}
                  style={{ width:'100%', height:'100%' }}
                />
              </div>
              <div style={{ fontSize:15, fontWeight:800, color:'#111' }}>{exp.nom}</div>
              <div style={{ fontSize:12.5, color:'#888', marginTop:2 }}>{exp.role}</div>
              {exp.hybride && (
                <div style={{ display:'inline-block', fontSize:11.5, color:'#111', fontWeight:700, background:'#FFF3ED', padding:'4px 12px', borderRadius:20, marginTop:8 }}>
                  Certifié ✓
                </div>
              )}
              {/* Stats en orange */}
              <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:16, paddingTop:14, borderTop:'1px solid #f5f5f5' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:15, fontWeight:800, color:'#111' }}>{exp.views}</div>
                  <div style={{ fontSize:10.5, color:'#aaa' }}>vues</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:15, fontWeight:800, color:'#111' }}>128</div>
                  <div style={{ fontSize:10.5, color:'#aaa' }}>abonnés</div>
                </div>
              </div>
            </div>

            {/* Biographie */}
            <div style={{ border:'1px solid #efefef', borderRadius:16, padding:16, marginBottom:20 }}>
              <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:8 }}>Biographie</div>
              <div style={{ fontSize:13, color:'#555', lineHeight:1.72 }}>
                La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails...
                <span style={{ color:'#111', fontWeight:700, cursor:'pointer' }}> Afficher plus ...</span>
              </div>
            </div>

            {/* Posts récents */}
            <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:12 }}>Récent post</div>
            {postsRecents.slice(0, 2).map((p, i) => (
              <div
                key={i}
                onClick={() => setPostActif(i)}
                style={{
                  border:'1.5px solid #eee' : '1px solid #efefef',
                  borderRadius:12, overflow:'hidden', marginBottom:12,
                  cursor:'pointer', transition:'border-color .2s',
                  boxShadow: postActif === i ? '0 0 0 3px rgba(255,90,0,0.08)' : 'none',
                }}
              >
                {/* image CARRÉE */}
                <div style={{ width:'100%', height:200, overflow:'hidden' }}>
                  <ImgFallback src={p.img} fallback={p.fb} style={{ width:'100%', height:'100%' }} />
                </div>
                <div style={{ padding:'10px 12px' }}>
                  <span style={{ fontSize:13, fontWeight:800, color:'#111' }}>{p.views}</span>
                  <span style={{ fontSize:11.5, color:'#aaa', marginLeft:6 }}>{p.temps}</span>
                  <div style={{ fontSize:12, color:'#666', marginTop:4, lineHeight:1.45 }}>
                    Sortie de notre promotion, comme le temps file aussi vite...
                  </div>
                  <span style={{ fontSize:12, color:'#111', fontWeight:700, display:'block', marginTop:6 }}>Afficher plus ...</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── ZONE PRINCIPALE ── */}
          <div>
            {/* Grand post */}
            <div style={{ border:'1px solid #efefef', borderRadius:16, overflow:'hidden', marginBottom:24, boxShadow:'0 1px 8px rgba(0,0,0,.06)' }}>
              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 16px', borderBottom:'1px solid #f5f5f5' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', overflow:'hidden', flexShrink:0, border:'1.5px solid #eee' }}>
                  <ImgFallback src={personneImgs[exp.img]} fallback={fallbacks[0]} style={{ width:'100%', height:'100%' }} />
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>{exp.nom}</div>
                  <div style={{ fontSize:11, color:'#aaa' }}>{exp.hybride ? <span style={{ color:'#111', fontWeight:700 }}>Certifié</span> : exp.role}</div>
                </div>
                <div style={{ marginLeft:'auto', textAlign:'right' }}>
                  <div style={{ fontSize:13, fontWeight:800, color:'#111' }}>{exp.views}</div>
                  <div style={{ fontSize:11, color:'#aaa' }}>{exp.temps}</div>
                </div>
              </div>

              {/* Image CARRÉE du post */}
              <div style={{ width:'100%', height:200, overflow:'hidden' }}>
                <ImgFallback
                  src={personneImgs[(exp.img + 2) % personneImgs.length]}
                  fallback={fallbacks[2]}
                  style={{ width:'100%', height:'100%' }}
                />
              </div>

              {/* Texte */}
              <div style={{ padding:'16px', fontSize:14, color:'#333', lineHeight:1.82, fontWeight:400 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </div>

              {/* Footer post */}
              <div style={{ padding:'10px 16px 14px', borderTop:'1px solid #f5f5f5', display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#555" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span style={{ fontSize:13, fontWeight:800, color:'#111' }}>300</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span style={{ fontSize:13, fontWeight:800, color:'#333' }}>255</span>
                </div>
                <span style={{ fontSize:13, color:'#111', fontWeight:800, cursor:'pointer', marginLeft:'auto' }}>Afficher moins ...</span>
              </div>
            </div>

            {/* ── Commentaires — PAS de border, juste texte ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              {commentaires.map((c, i) => (
                <div key={i} style={{ paddingBottom:16, borderBottom:'1px solid #f5f5f5' }}>
                  {/* Avatar + nom */}
                  <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:10 }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', overflow:'hidden', flexShrink:0, border:'1.5px solid #eee' }}>
                      <ImgFallback
                        src={personneImgs[(exp.img + i) % personneImgs.length]}
                        fallback={fallbacks[i % fallbacks.length]}
                        style={{ width:'100%', height:'100%' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:800, color:'#111' }}>{exp.nom}</div>
                      <div style={{ fontSize:10.5, color:'#111', fontWeight:700 }}>Certifié</div>
                    </div>
                  </div>
                  {/* Texte commentaire — sans aucune box/border */}
                  <div style={{ fontSize:13, color:'#555', lineHeight:1.72, fontWeight:400 }}>{c}</div>
                  <span style={{ fontSize:13, color:'#111', fontWeight:800, cursor:'pointer', marginTop:6, display:'block' }}>Afficher plus ...</span>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', justifyContent:'center', padding:'20px 0 36px', cursor:'pointer' }}>
              <span style={{ fontSize:14, color:'#111', fontWeight:800 }}>Afficher plus de commentaires</span>
            </div>
          </div>
        </div>
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageDetailExperience;
