import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

/* ── Données événements (id → données) ── */
const EVENEMENTS = {
  1:  { titre:"Prix de l'Entrepreneuriat Féminin act 2", lieu:"CENASA",    org:"MBM GROUP",            date:"Le 2025-10-30 de 20:00 à 23:55" },
  2:  { titre:"Festival de la Cohésion Sahélienne",       lieu:"Rossignol à Wemtenga", org:"ASSEC",    date:"Du 25 au 26 Octobre" },
  3:  { titre:"Bougousso de la Diversité",                lieu:"Au Wakanda",           org:"ZOMALECT", date:"Du 20 Mars au 25 Mars" },
  4:  { titre:"Soirée Karaoké",                           lieu:"Cosy Corner",          org:"Cosy Corner", date:"Vendredi 11 Octobre" },
  5:  { titre:"Soirée Karaoké",                           lieu:"Cosy Corner",          org:"Cosy Corner", date:"Vendredi 11 Octobre" },
  6:  { titre:"Jeunes Couleurs Ambiance",                 lieu:"Situé derrière l'ex IAM Ouaga 2000", org:"SQUASH TIME", date:"Jeudi 28 Août" },
  7:  { titre:"Orchestre Bana M'Boka",                    lieu:"Situé derrière l'ex IAM Ouaga 2000", org:"SQUASH TIME", date:"Samedi 20 Septembre" },
  8:  { titre:"Festival du Jazz",                         lieu:"Palais des Sports",    org:"MBM Group", date:"Samedi 5 Octobre" },
  9:  { titre:"Soirée Animation Deejay",                  lieu:"Cosy Corner",          org:"SITHO",    date:"Samedi 21 Décembre" },
  10: { titre:"Bougousso de la Diversité",                lieu:"Musée National du Burkina Faso", org:"Co. MNBF & PCIM INTS", date:"Mercredi 15 Octobre" },
  11: { titre:"Futur Maker Night",                        lieu:"ELPARA GA",            org:"NEXUS",    date:"Vendredi 10 Octobre" },
  12: { titre:"Mister Koff en Live",                      lieu:"Situé derrière l'ex IAM Ouaga 2000", org:"SQUASH TIME", date:"Du 20 Mars au 25 Mars" },
  13: { titre:"Summer Party",                             lieu:"AFRICA FESTIVAL",      org:"SUBIACO",  date:"Mardi 16 Novembre" },
  14: { titre:"Roots African Fashion Party",              lieu:"ACCRA AIRPORT",        org:"CULTURE",  date:"Jeudi 28 Décembre" },
};

/* Images des petites cartes tickets/stands depuis /public/detailsimages/ */
const detailImgs = [
  '/detailsimages/details1.jpg','/detailsimages/details2.jpg',
  '/detailsimages/details3.jpg','/detailsimages/details4.jpg',
  '/detailsimages/details5.jpg','/detailsimages/details6.jpg',
];
const fallbacks = [
  'linear-gradient(135deg,#b45309,#d97706)',
  'linear-gradient(135deg,#1d4ed8,#4338ca)',
  'linear-gradient(135deg,#065f46,#059669)',
  'linear-gradient(135deg,#7c3aed,#6d28d9)',
];

const getImg = (idx) => detailImgs[idx % detailImgs.length];
const getFallback = (idx) => fallbacks[idx % fallbacks.length];

/* QR code SVG */
const QRCode = () => (
  <svg width="44" height="44" viewBox="0 0 48 48">
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

/* Image avec fallback */
const ImgCard = ({ src, fallback, height = 130, children }) => {
  const [err, setErr] = useState(false);
  return (
    <div style={{ width:'100%', height, position:'relative', overflow:'hidden', background: err ? fallback : '#f5f5f5' }}>
      {!err
        ? <img src={src} alt="" onError={() => setErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        : <div style={{ width:'100%', height:'100%', background: fallback }} />
      }
      {children && <div style={{ position:'absolute', bottom:10, right:10 }}>{children}</div>}
    </div>
  );
};

const onglets = ['Tickets', 'Elections', 'Stands', 'Support'];

const PageDetailEvenement = () => {
  const { id } = useParams();
  const ev = EVENEMENTS[parseInt(id)] || EVENEMENTS[1];
  const imgSrc = `/evenement${id || 1}.jpg`;
  const [imgErr, setImgErr] = useState(false);
  const [ongletActif, setOngletActif] = useState('Tickets');

  const IconShare  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
  const IconPin    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconOrg    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9f1239" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
  const IconCal    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  const IconTicket = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
  const IconDL     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

  const s = {
    page: { background:'#fff', minHeight:'100vh', fontFamily:'Poppins, sans-serif' },
    inner: { maxWidth:900, margin:'0 auto', padding:'28px 24px 52px' },
    infoCard: { display:'grid', gridTemplateColumns:'280px 1fr', gap:24, background:'#fff', border:'1px solid #efefef', borderRadius:16, padding:24, marginBottom:36, boxShadow:'0 2px 16px rgba(0,0,0,.06)' },
    evTitle: { fontSize:18, fontWeight:800, color:'#111', marginBottom:10, lineHeight:1.3 },
    evDesc:  { fontSize:12.5, color:'#666', lineHeight:1.72, marginBottom:16 },
    infoRow: { display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#333', marginBottom:9 },
    infoLabel: { color:'#888', minWidth:100 },
    orange: { color:'#FF5A00', fontWeight:600 },
    ongletBar: { background:'#f8f8f8', borderRadius:14, padding:5, display:'flex', marginBottom:32 },
    onglet: (a) => ({ flex:1, padding:'11px 0', textAlign:'center', borderRadius:11, fontSize:13.5, fontWeight:a?600:400, color:a?'#fff':'#555', background:a?'#FF5A00':'transparent', cursor:'pointer', border:'none', fontFamily:'Poppins, sans-serif', transition:'all .2s' }),
    grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 },
    ticketCard: { borderRadius:14, overflow:'hidden', border:'1px solid #f0f0f0', boxShadow:'0 2px 10px rgba(0,0,0,.06)' },
    ticketFoot: { padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' },
    payWrap: { display:'flex', justifyContent:'center', marginTop:44 },
    payBtn: { background:'#FF5A00', color:'#fff', border:'none', borderRadius:12, padding:'14px 52px', fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 6px 20px rgba(255,90,0,.3)', fontFamily:'Poppins, sans-serif' },
    electCard: { border:'1px solid #efefef', borderRadius:14, overflow:'hidden', boxShadow:'0 1px 6px rgba(0,0,0,.05)' },
    electBody: { padding:'14px 16px' },
    electTitre: { fontSize:13.5, fontWeight:700, color:'#111', marginBottom:12 },
    electRow: { display:'flex', alignItems:'center', gap:8, marginBottom:6 },
    supportRow: { border:'1px solid #efefef', borderRadius:12, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  };

  return (
    <div style={s.page}>
      <EntetePageDetail
        titre="Détails Évènement"
        droite={
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ width:36, height:36, borderRadius:10, border:'1.5px solid #eee', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <IconShare />
            </div>
          </div>
        }
      />

      <div style={s.inner}>
        {/* ── Info card avec image réelle de l'événement ── */}
        <div style={s.infoCard}>
          {/* Image de l'événement (même que sur la liste) */}
          <div style={{ borderRadius:12, overflow:'hidden', height:260 }}>
            {!imgErr
              ? <img src={imgSrc} alt={ev.titre} onError={() => setImgErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              : <div style={{ width:'100%', height:'100%', background:'linear-gradient(145deg,#92400e,#b45309)', display:'flex', alignItems:'flex-end', padding:16 }}>
                  <span style={{ color:'#fff', fontSize:13, fontWeight:800, lineHeight:1.3 }}>{ev.titre}</span>
                </div>
            }
          </div>

          {/* Infos droite */}
          <div style={{ display:'flex', flexDirection:'column' }}>
            <div style={s.evTitle}>{ev.titre.toUpperCase()}</div>
            <div style={s.evDesc}>La 2ᵉ édition des Prefe Awards met à l'honneur l'entrepreneuriat féminin au Burkina Faso, sous le thème « Entrepreneuriat pour la paix et le développement ».</div>
            <div style={s.infoRow}><IconPin /><span style={s.infoLabel}>Lieu :</span><span style={{ color:'#16a34a', fontWeight:600 }}>{ev.lieu}</span></div>
            <div style={s.infoRow}><IconOrg /><span style={s.infoLabel}>Organisé Par :</span><span style={{ color:'#9f1239', fontWeight:600 }}>{ev.org}</span></div>
            <div style={s.infoRow}><IconCal /><span style={s.infoLabel}>Date :</span><span>{ev.date}</span></div>
            <div style={s.infoRow}><IconTicket /><span style={s.infoLabel}>Tickets :</span><span style={s.orange}>Oui Disponible</span></div>
            <div style={s.infoRow}><IconTicket /><span style={s.infoLabel}>Elections :</span><span style={s.orange}>Oui Disponible</span></div>
            <div style={s.infoRow}><IconTicket /><span style={s.infoLabel}>Stands :</span><span style={s.orange}>Oui Disponible</span></div>
          </div>
        </div>

        {/* ── Onglets ── */}
        <div style={s.ongletBar}>
          {onglets.map(o => (
            <button key={o} style={s.onglet(ongletActif === o)} onClick={() => setOngletActif(o)}>{o}</button>
          ))}
        </div>

        {/* ── Tickets ── */}
        {ongletActif === 'Tickets' && (
          <>
            <div style={s.grid2}>
              {[{ type:'VIP', hl:'#FF5A00', prix:'5.000 CFA', idx:0 }, { type:'STANDARD', hl:'#FF5A00', prix:'2.500 CFA', idx:1 }].map(t => (
                <div key={t.type} style={s.ticketCard}>
                  <ImgCard src={getImg(t.idx)} fallback={getFallback(t.idx)} height={130}>
                    <QRCode />
                  </ImgCard>
                  <div style={s.ticketFoot}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:'#111' }}>
                        Ticket <span style={{ color: t.hl }}>{t.type}</span>
                      </div>
                      <div style={{ fontSize:15, fontWeight:700, color:'#111', marginTop:4 }}>{t.prix}</div>
                    </div>
                    <div style={{ fontSize:12, color:'#22c55e', fontWeight:600 }}>Disponible</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.payWrap}><button style={s.payBtn}>Payer un ticket</button></div>
          </>
        )}

        {/* ── Elections ── */}
        {ongletActif === 'Elections' && (
          <div style={s.grid2}>
            {[
              { titre:"JEUNE FILLE CODEUSE DE L'ANNÉE",  ouvert:false, dates:"Du 22 Sept au 23 Sept", candidats:12, idx:2 },
              { titre:"JEUNE FOOTBALLEUSE DE L'ANNÉE",   ouvert:true,  dates:"Du 22 Sept au 23 Sept", candidats:10, idx:3 },
            ].map(el => (
              <div key={el.titre} style={s.electCard}>
                <ImgCard src={getImg(el.idx)} fallback={getFallback(el.idx)} height={160} />
                <div style={s.electBody}>
                  <div style={s.electTitre}>{el.titre}</div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={el.ouvert?'#22c55e':'#ef4444'} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontSize:12, fontWeight:700, color: el.ouvert?'#22c55e':'#ef4444' }}>{el.ouvert?'Ouvert':'Fermé'}</span>
                  </div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={{ fontSize:12, color:'#888' }}>{el.dates}</span>
                  </div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    <span style={{ fontSize:12, color:'#888' }}>{el.candidats} candidates</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Stands ── */}
        {ongletActif === 'Stands' && (
          <>
            <div style={s.grid2}>
              {[{ type:'VIP', prix:'50.000 CFA', idx:4 }, { type:'STANDARD', prix:'25.000 CFA', idx:5 }].map(st => (
                <div key={st.type} style={{ borderRadius:14, overflow:'hidden', border:'1px solid #f0f0f0', boxShadow:'0 1px 6px rgba(0,0,0,.05)' }}>
                  <ImgCard src={getImg(st.idx)} fallback={getFallback(st.idx)} height={130}>
                    <QRCode />
                  </ImgCard>
                  <div style={s.ticketFoot}>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:'#111' }}>
                        Stand (9m x 9m) <span style={{ color:'#FF5A00' }}>{st.type}</span>
                      </div>
                      <div style={{ fontSize:14, fontWeight:700, color:'#111', marginTop:4 }}>{st.prix}</div>
                    </div>
                    <div style={{ fontSize:12, color:'#22c55e', fontWeight:600 }}>Disponible</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.payWrap}><button style={s.payBtn}>Payer un ticket</button></div>
          </>
        )}

        {/* ── Support ── */}
        {ongletActif === 'Support' && (
          <div style={s.supportRow}>
            <span style={{ fontSize:14, fontWeight:600, color:'#333', fontFamily:'Poppins, sans-serif' }}>TDR</span>
            <IconDL />
          </div>
        )}
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageDetailEvenement;
