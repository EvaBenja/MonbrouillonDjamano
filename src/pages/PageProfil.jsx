import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const gradsBanners = [
  'linear-gradient(135deg,#1d4ed8,#4338ca)',
  'linear-gradient(135deg,#0891b2,#0369a1)',
];

const posts = [
  { id:1, views:'5.4k', temps:"il y'a 12h", texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:'linear-gradient(135deg,#1d4ed8,#4338ca)' },
  { id:2, views:'5.4k', temps:"il y'a 12h", texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:'linear-gradient(135deg,#dc2626,#b91c1c)' },
];

const commentaires = Array(4).fill({
  texte:"WAOUH ! J'ai passé un moment incroyable au restaurant de Katia ! La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails à travers les cadeaux, la musique live et la nourriture Je ne ...",
});

const IconShare = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const PageProfil = () => {
  const navigate = useNavigate();
  const [postActif, setPostActif] = useState(0);

  const s = {
    page: { background:'#fff', minHeight:'100vh', fontFamily:'Poppins, sans-serif' },
    inner: { maxWidth:1200, margin:'0 auto', padding:'28px 32px 0' },
    /* Bannières photos en haut */
    bannersRow: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:32 },
    banner: (g) => ({ borderRadius:14, height:160, background:g, overflow:'hidden' }),
    /* Grid principal */
    mainGrid: { display:'grid', gridTemplateColumns:'260px 1fr', gap:32 },
    /* Sidebar */
    profilCard: { border:'1px solid #efefef', borderRadius:16, padding:20, textAlign:'center', marginBottom:20, boxShadow:'0 1px 6px rgba(0,0,0,.05)' },
    avatarWrap: { width:70, height:70, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:26, fontWeight:700, border:'3px solid #fff', boxShadow:'0 2px 8px rgba(0,0,0,.1)' },
    profilNom: { fontSize:14.5, fontWeight:700, color:'#111' },
    profilRole: { fontSize:12, color:'#888', marginTop:2 },
    profilBadge: { display:'inline-block', fontSize:11, color:'#FF5A00', fontWeight:600, background:'#FFF3ED', padding:'3px 10px', borderRadius:20, marginTop:6 },
    bioCard: { border:'1px solid #efefef', borderRadius:16, padding:16, marginBottom:20 },
    bioTitre: { fontSize:14, fontWeight:700, color:'#111', marginBottom:8 },
    bioTexte: { fontSize:12.5, color:'#666', lineHeight:1.7 },
    recentTitre: { fontSize:14, fontWeight:700, color:'#111', marginBottom:12 },
    postMini: (active) => ({ border:active?'2px solid #FF5A00':'1px solid #efefef', borderRadius:12, overflow:'hidden', marginBottom:12, cursor:'pointer', transition:'border-color .2s' }),
    postMiniImg: (g) => ({ width:'100%', height:110, background:g }),
    postMiniBody: { padding:'8px 10px' },
    postMiniViews: { fontSize:12, fontWeight:700, color:'#111' },
    postMiniTemps: { fontSize:11, color:'#aaa', marginLeft:4 },
    postMiniTexte: { fontSize:11, color:'#aaa', marginTop:2, lineHeight:1.4 },
    postMiniLink: { fontSize:11, color:'#FF5A00', fontWeight:600, display:'block', marginTop:4 },
    /* Zone principale */
    bigPost: { border:'1px solid #efefef', borderRadius:16, overflow:'hidden', marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,.05)' },
    bigPostHead: { display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderBottom:'1px solid #f5f5f5' },
    bigPostAvatar: { width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700, flexShrink:0 },
    bigPostNom: { fontSize:13, fontWeight:700, color:'#111' },
    bigPostBadge: { fontSize:10, color:'#aaa' },
    bigPostViews: { fontSize:12, color:'#888', marginLeft:'auto' },
    bigPostTexte: { padding:'16px', fontSize:13.5, color:'#333', lineHeight:1.8 },
    bigPostFoot: { padding:'0 16px 14px', borderTop:'1px solid #f5f5f5', paddingTop:12, display:'flex', alignItems:'center', gap:14 },
    bigPostStat: { fontSize:13, fontWeight:700, color:'#333' },
    bigPostLink: { fontSize:12, color:'#FF5A00', fontWeight:600, cursor:'pointer', marginLeft:'auto' },
    commGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 },
    commCard: { border:'1px solid #efefef', borderRadius:12, padding:14, boxShadow:'0 1px 4px rgba(0,0,0,.04)' },
    commHead: { display:'flex', alignItems:'center', gap:8, marginBottom:8 },
    commAvatar: { width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700, flexShrink:0 },
    commNom: { fontSize:11.5, fontWeight:700, color:'#111' },
    commBadge: { fontSize:10, color:'#aaa' },
    commTexte: { fontSize:11.5, color:'#666', lineHeight:1.65 },
    commLink: { fontSize:11.5, color:'#FF5A00', fontWeight:600, cursor:'pointer', marginTop:5, display:'block' },
    afficherPlus: { display:'flex', justifyContent:'center', padding:'16px 0 32px', cursor:'pointer' },
    afficherPlusBtn: { fontSize:13, color:'#FF5A00', fontWeight:600, fontFamily:'Poppins, sans-serif' },
  };

  return (
    <div style={s.page}>
      <EntetePageDetail />

      <div style={s.inner}>
        {/* Bannières */}
        <div style={s.bannersRow}>
          {gradsBanners.map((g,i) => <div key={i} style={s.banner(g)} />)}
        </div>

        <div style={s.mainGrid}>
          {/* Sidebar */}
          <div>
            <div style={s.profilCard}>
              <div style={s.avatarWrap}>J</div>
              <div style={s.profilNom}>Jean Emmanuel Bitié</div>
              <div style={s.profilRole}>Organisateur d'éveévénements</div>
              <div style={s.profilBadge}>Certifié</div>
            </div>

            <div style={s.bioCard}>
              <div style={s.bioTitre}>Biographie</div>
              <div style={s.bioTexte}>
                La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails à travers les cadeaux, ...
                <span style={{ color:'#FF5A00', fontWeight:600, cursor:'pointer' }}> Afficher plus ...</span>
              </div>
            </div>

            <div style={s.recentTitre}>Récent post</div>
            {posts.map((p,i) => (
              <div key={p.id} style={s.postMini(postActif===i)} onClick={() => setPostActif(i)}>
                <div style={s.postMiniImg(p.g)} />
                <div style={s.postMiniBody}>
                  <span style={s.postMiniViews}>{p.views}</span>
                  <span style={s.postMiniTemps}>{p.temps}</span>
                  <div style={s.postMiniTexte}>{p.texte}</div>
                  <span style={s.postMiniLink}>Afficher plus ...</span>
                </div>
              </div>
            ))}
          </div>

          {/* Zone main */}
          <div>
            <div style={s.bigPost}>
              <div style={s.bigPostHead}>
                <div style={s.bigPostAvatar}>J</div>
                <div>
                  <div style={s.bigPostNom}>Jean Emmanuel Bitié</div>
                  <div style={s.bigPostBadge}>Certifié</div>
                </div>
                <span style={s.bigPostViews}>{posts[postActif].views} {posts[postActif].temps}</span>
              </div>
              <div style={s.bigPostTexte}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </div>
              <div style={s.bigPostFoot}>
                <span style={s.bigPostStat}>300</span>
                <span style={s.bigPostStat}>255</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span style={s.bigPostLink}>Afficher moins ...</span>
              </div>
            </div>

            <div style={s.commGrid}>
              {commentaires.map((c,i) => (
                <div key={i} style={s.commCard}>
                  <div style={s.commHead}>
                    <div style={s.commAvatar}>J</div>
                    <div>
                      <div style={s.commNom}>Jean Emmanuel Bitié</div>
                      <div style={s.commBadge}>Certifié</div>
                    </div>
                  </div>
                  <div style={s.commTexte}>{c.texte}</div>
                  <span style={s.commLink}>Afficher plus ...</span>
                </div>
              ))}
            </div>

            <div style={s.afficherPlus}>
              <span style={s.afficherPlusBtn}>Afficher plus de commentaires</span>
            </div>
          </div>
        </div>
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageProfil;
