import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntetePageDetail from '../composants-communs/EntetePageDetail';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

const onglets = ['Tickets', 'Elections', 'Stands', 'Support'];

/* Mini QR code SVG */
const QRCode = () => (
  <svg width="48" height="48" viewBox="0 0 48 48">
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
    <rect x="28" y="34" width="6" height="4" fill="#111"/>
  </svg>
);

const PageDetailEvenement = () => {
  const navigate = useNavigate();
  const [ongletActif, setOngletActif] = useState('Tickets');

  const IconShare = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  const s = {
    page: { background: '#fff', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' },
    inner: { maxWidth: 900, margin: '0 auto', padding: '28px 24px 52px' },
    /* Info card */
    infoCard: {
      display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24,
      background: '#fff', border: '1px solid #efefef', borderRadius: 16,
      padding: 24, marginBottom: 36, boxShadow: '0 2px 16px rgba(0,0,0,.06)',
    },
    affiche: {
      width: '100%', height: 280, borderRadius: 12, overflow: 'hidden',
      background: 'linear-gradient(145deg,#92400e,#b45309)',
      position: 'relative',
    },
    afficheOverlay: {
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: 16, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)',
    },
    afficheLabel: { fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '2px', marginBottom: 4 },
    afficheTitle: { fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.25, letterSpacing: '0.5px' },
    infoRight: { display: 'flex', flexDirection: 'column', gap: 0 },
    evTitle: { fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 10, letterSpacing: '-0.3px', lineHeight: 1.3 },
    evDesc: { fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 20 },
    infoRow: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#333', marginBottom: 10 },
    infoLabel: { color: '#888', fontWeight: 400, minWidth: 90 },
    infoVal: (orange) => ({ color: orange ? '#FF5A00' : '#111', fontWeight: orange ? 600 : 400 }),
    /* Onglets */
    ongletBar: {
      background: '#f8f8f8', borderRadius: 14, padding: '5px', gap: 3,
      display: 'flex', marginBottom: 32,
    },
    onglet: (active) => ({
      flex: 1, padding: '11px 0', textAlign: 'center',
      borderRadius: 11, fontSize: 14, fontWeight: active ? 600 : 400,
      color: active ? '#fff' : '#666', background: active ? '#FF5A00' : 'transparent',
      cursor: 'pointer', transition: 'all .2s', border: 'none',
      fontFamily: 'Poppins, sans-serif',
    }),
    /* Grille tickets */
    ticketsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
    ticketCard: { borderRadius: 14, overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: '0 2px 10px rgba(0,0,0,.06)' },
    ticketImg: {
      width: '100%', height: 130,
      background: 'linear-gradient(135deg,#b45309,#d97706)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10,
    },
    ticketFoot: { padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    ticketType: { fontSize: 14.5, fontWeight: 700, color: '#111' },
    ticketHL: { color: '#FF5A00' },
    ticketPrix: { fontSize: 16, fontWeight: 700, color: '#111', marginTop: 4 },
    ticketDispo: { fontSize: 12, color: '#22c55e', fontWeight: 600 },
    /* Elections grid */
    electGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
    electCard: { border: '1px solid #efefef', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,.05)' },
    electImg: { width: '100%', height: 150, background: 'linear-gradient(135deg,#1d4ed8,#4338ca)' },
    electBody: { padding: '14px 16px' },
    electTitre: { fontSize: 14, fontWeight: 700, color: '#111', letterSpacing: '0.3px', marginBottom: 12 },
    electRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
    electStatut: (ouvert) => ({ fontSize: 12, fontWeight: 700, color: ouvert ? '#22c55e' : '#ef4444' }),
    electInfo: { fontSize: 12, color: '#888' },
    /* Stands */
    standsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
    standCard: { border: '1px solid #f0f0f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,.05)' },
    standImg: { width: '100%', height: 130, background: 'linear-gradient(135deg,#b45309,#92400e)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 },
    standFoot: { padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    standNom: { fontSize: 14, fontWeight: 700, color: '#111' },
    standPrix: { fontSize: 15, fontWeight: 700, color: '#111', marginTop: 4 },
    /* Support */
    supportRow: { border: '1px solid #efefef', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    supportLabel: { fontSize: 14, fontWeight: 600, color: '#333', fontFamily: 'Poppins, sans-serif' },
    /* Pay btn */
    payWrap: { display: 'flex', justifyContent: 'center', marginTop: 44 },
    payBtn: { background: '#FF5A00', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 52px', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,90,0,.3)', fontFamily: 'Poppins, sans-serif' },
  };

  const IconPin     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconOrg     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
  const IconCal     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  const IconTicket  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
  const IconDL      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

  return (
    <div style={s.page}>
      <EntetePageDetail
        titre="Détails Évènement"
        droite={
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width:36,height:36,borderRadius:10,border:'1.5px solid #eee',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>
              <IconShare />
            </div>
          </div>
        }
      />

      <div style={s.inner}>
        {/* Info card */}
        <div style={s.infoCard}>
          <div style={s.affiche}>
            <div style={s.afficheOverlay}>
              <div style={s.afficheLabel}>PREFE AWARDS</div>
              <div style={s.afficheTitle}>PRIX DE L'ENTREPRENEURIAT FÉMININ ACT 2</div>
            </div>
          </div>
          <div style={s.infoRight}>
            <div style={s.evTitle}>PRIX DE L'ENTREPRENEURIAT FÉMININ ACT 2</div>
            <div style={s.evDesc}>La 2ᵉ édition des Prefe Awards met à l'honneur l'entrepreneuriat féminin au Burkina Faso, sous le thème « Entrepreneuriat pour la paix et le développement ».</div>
            {[
              [<IconPin/>,    'Lieu :',        'CENASA',                     true ],
              [<IconOrg/>,    'Organisé Par :','MBM GROUP',                  true ],
              [<IconCal/>,    'Date :',        'Le 2025-10-30 de 20:00 à 23:55', false],
              [<IconTicket/>, 'Tickets :',     'Oui Disponible',             true ],
              [<IconTicket/>, 'Elections :',   'Oui Disponible',             true ],
              [<IconTicket/>, 'Stands :',      'Oui Disponible',             true ],
            ].map(([Icon, label, val, orange], i) => (
              <div key={i} style={s.infoRow}>
                {Icon}
                <span style={s.infoLabel}>{label}</span>
                <span style={s.infoVal(orange)}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Onglets */}
        <div style={s.ongletBar}>
          {onglets.map(o => (
            <button key={o} style={s.onglet(ongletActif === o)} onClick={() => setOngletActif(o)}>{o}</button>
          ))}
        </div>

        {/* Contenu onglet */}
        {ongletActif === 'Tickets' && (
          <>
            <div style={s.ticketsGrid}>
              {[{ type:'VIP', prix:'5.000 CFA' },{ type:'STANDARD', prix:'2.500 CFA' }].map(t => (
                <div key={t.type} style={s.ticketCard}>
                  <div style={s.ticketImg}><QRCode /></div>
                  <div style={s.ticketFoot}>
                    <div>
                      <div style={s.ticketType}>Ticket <span style={s.ticketHL}>{t.type}</span></div>
                      <div style={s.ticketPrix}>{t.prix}</div>
                    </div>
                    <div style={s.ticketDispo}>Disponible</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.payWrap}><button style={s.payBtn}>Payer un ticket</button></div>
          </>
        )}

        {ongletActif === 'Elections' && (
          <div style={s.electGrid}>
            {[
              { titre:"JEUNE FILLE CODEUSE DE L'ANNÉE",   ouvert:false, dates:"Du 22 Sept au 23 Sept", candidats:12, g:'linear-gradient(135deg,#1d4ed8,#3b82f6)' },
              { titre:"JEUNE FOOTBALLEUSE DE L'ANNÉE",    ouvert:true,  dates:"Du 22 Sept au 23 Sept", candidats:10, g:'linear-gradient(135deg,#065f46,#059669)' },
            ].map(el => (
              <div key={el.titre} style={s.electCard}>
                <div style={{ ...s.electImg, background: el.g }} />
                <div style={s.electBody}>
                  <div style={s.electTitre}>{el.titre}</div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={el.ouvert?'#22c55e':'#ef4444'} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={s.electStatut(el.ouvert)}>{el.ouvert ? 'Ouvert' : 'Fermé'}</span>
                  </div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={s.electInfo}>{el.dates}</span>
                  </div>
                  <div style={s.electRow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    <span style={s.electInfo}>{el.candidats} candidates</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ongletActif === 'Stands' && (
          <>
            <div style={s.standsGrid}>
              {[{ type:'VIP',prix:'50.000 CFA' },{ type:'STANDARD',prix:'25.000 CFA' }].map(st => (
                <div key={st.type} style={s.standCard}>
                  <div style={s.standImg}><QRCode /></div>
                  <div style={s.standFoot}>
                    <div>
                      <div style={s.standNom}>Stand (9m x 9m) <span style={{ color:'#FF5A00' }}>{st.type}</span></div>
                      <div style={s.standPrix}>{st.prix}</div>
                    </div>
                    <div style={{ fontSize:12,color:'#22c55e',fontWeight:600 }}>Disponible</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.payWrap}><button style={s.payBtn}>Payer un ticket</button></div>
          </>
        )}

        {ongletActif === 'Support' && (
          <div style={s.supportRow}>
            <span style={s.supportLabel}>TDR</span>
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
