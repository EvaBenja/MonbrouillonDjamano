import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const grads = [
  ['#1d4ed8','#4338ca'],['#dc2626','#b91c1c'],['#065f46','#047857'],
  ['#7c3aed','#6d28d9'],['#b45309','#92400e'],['#0891b2','#0369a1'],
];

const posts = [
  { id:1, views:'5.4k', temps:"il y'a 12h", texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:0 },
  { id:2, views:'5.4k', temps:"il y'a 12h", texte:"Sortie de notre promotion, comme le temps fil aussi vite qu'on l'i ...", g:1 },
];

const commentaires = Array(4).fill({ texte:"WAOUH ! J'ai passé un moment incroyable au restaurant de Katia ! La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails à travers les cadeaux, la musique live et la nourriture Je ne ..." });

const IcoBack = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoGlobe = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IcoMenu = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcoShare = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const PageDetailExperience = () => {
  const navigate  = useNavigate();
  const [postActif, setPostActif] = useState(0);

  const iconBtn = { width:34, height:34, borderRadius:9, border:'1.5px solid #eee', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' };

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      {/* Top bar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 24px', borderBottom:'1px solid #f5f5f5', position:'sticky', top:0, background:'#fff', zIndex:100 }}>
        <div style={iconBtn} onClick={()=>navigate(-1)}><IcoBack /></div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={iconBtn}><IcoGlobe /></div>
          <div style={iconBtn}><IcoMenu /></div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 32px 0' }}>
        {/* Bannières */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:32 }}>
          {['linear-gradient(135deg,#1d4ed8,#4338ca)','linear-gradient(135deg,#0891b2,#0369a1)'].map((g,i)=>(
            <div key={i} style={{ borderRadius:14, height:160, background:g }}/>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:32 }}>
          {/* Sidebar */}
          <div>
            <div style={{ border:'1px solid #efefef', borderRadius:16, padding:20, textAlign:'center', marginBottom:20, boxShadow:'0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ width:70, height:70, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:26, fontWeight:700, border:'3px solid #fff', boxShadow:'0 2px 8px rgba(0,0,0,.1)' }}>J</div>
              <div style={{ fontSize:14.5, fontWeight:700, color:'#111' }}>Jean Emmanuel Bitié</div>
              <div style={{ fontSize:12, color:'#888', marginTop:2 }}>Organisateur d'éveévénements</div>
              <div style={{ display:'inline-block', fontSize:11, color:'#FF5A00', fontWeight:600, background:'#FFF3ED', padding:'3px 10px', borderRadius:20, marginTop:6 }}>Certifié</div>
            </div>

            <div style={{ border:'1px solid #efefef', borderRadius:16, padding:16, marginBottom:20 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:8 }}>Biographie</div>
              <div style={{ fontSize:12.5, color:'#666', lineHeight:1.7 }}>
                La nourriture et les boissons étaient délicieuses, l'atmosphère était fantastique aussi ! J'ai adoré l'attention portée aux détails à travers les cadeaux, ...
                <span style={{ color:'#FF5A00', fontWeight:600, cursor:'pointer' }}> Afficher plus ...</span>
              </div>
            </div>

            <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:12 }}>Récent post</div>
            {posts.map((p,i)=>{
              const [c1,c2] = grads[p.g];
              return (
                <div key={p.id} onClick={()=>setPostActif(i)}
                  style={{ border:postActif===i?'2px solid #FF5A00':'1px solid #efefef', borderRadius:12, overflow:'hidden', marginBottom:12, cursor:'pointer', transition:'border-color .2s' }}>
                  <div style={{ width:'100%', height:110, background:`linear-gradient(135deg,${c1},${c2})` }}/>
                  <div style={{ padding:'8px 10px' }}>
                    <span style={{ fontSize:12, fontWeight:700, color:'#111' }}>{p.views}</span>
                    <span style={{ fontSize:11, color:'#aaa', marginLeft:4 }}>{p.temps}</span>
                    <div style={{ fontSize:11, color:'#aaa', marginTop:2, lineHeight:1.4 }}>{p.texte}</div>
                    <span style={{ fontSize:11, color:'#FF5A00', fontWeight:600, display:'block', marginTop:4 }}>Afficher plus ...</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main */}
          <div>
            {/* Grand post */}
            <div style={{ border:'1px solid #efefef', borderRadius:16, overflow:'hidden', marginBottom:24, boxShadow:'0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderBottom:'1px solid #f5f5f5' }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>J</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>Jean Emmanuel Bitié</div>
                  <div style={{ fontSize:10, color:'#aaa' }}>Certifié</div>
                </div>
                <span style={{ fontSize:12, color:'#888', marginLeft:'auto' }}>{posts[postActif].views} {posts[postActif].temps}</span>
              </div>
              <div style={{ padding:'16px', fontSize:13.5, color:'#333', lineHeight:1.8 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </div>
              <div style={{ padding:'0 16px 14px', borderTop:'1px solid #f5f5f5', paddingTop:12, display:'flex', alignItems:'center', gap:14 }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#333' }}>300</span>
                <span style={{ fontSize:13, fontWeight:700, color:'#333' }}>255</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span style={{ fontSize:12, color:'#FF5A00', fontWeight:600, cursor:'pointer', marginLeft:'auto' }}>Afficher moins ...</span>
              </div>
            </div>

            {/* Grille commentaires */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {commentaires.map((c,i)=>(
                <div key={i} style={{ border:'1px solid #efefef', borderRadius:12, padding:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#1d4ed8,#4338ca)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700, flexShrink:0 }}>J</div>
                    <div>
                      <div style={{ fontSize:11.5, fontWeight:700, color:'#111' }}>Jean Emmanuel Bitié</div>
                      <div style={{ fontSize:10, color:'#aaa' }}>Certifié</div>
                    </div>
                  </div>
                  <div style={{ fontSize:11.5, color:'#666', lineHeight:1.65 }}>{c.texte}</div>
                  <span style={{ fontSize:11.5, color:'#FF5A00', fontWeight:600, cursor:'pointer', marginTop:5, display:'block' }}>Afficher plus ...</span>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', justifyContent:'center', padding:'16px 0 32px', cursor:'pointer' }}>
              <span style={{ fontSize:13, color:'#FF5A00', fontWeight:600 }}>Afficher plus de commentaires</span>
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
