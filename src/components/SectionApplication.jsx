import React from 'react';

const barData = [38, 68, 54, 88, 64, 78, 100, 73, 44, 60];

const AppSection = () => {
  const s = {
    section: { background: '#fff', padding: '90px 32px', fontFamily: 'Poppins, sans-serif' },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'center' },

    phoneWrap: { display: 'flex', justifyContent: 'center', position: 'relative', width: '100%' },
    phoneGlow: {
      position: 'absolute', width: 340, height: 340, borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(255,90,0,.07) 0%,transparent 70%)',
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
    },
    phone: {
      width: 'min(100%, 320px)', minHeight: 420,
      background: 'linear-gradient(145deg,#1a1a1a,#282828)',
      borderRadius: 40, padding: 11,
      boxShadow: '0 32px 80px rgba(0,0,0,.28)',
      position: 'relative', zIndex: 1,
    },
    phoneScreen: {
      background: '#fff', borderRadius: 30, height: '100%',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    },
    phoneHeader: { background: '#FF5A00', padding: '18px 14px 14px' },
    phoneHeaderTitle: { fontSize: 11, fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fff', marginBottom: 3 },
    phoneHeaderSub: { fontSize: 9, opacity: .75, fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#fff' },
    phoneBody: { padding: 12, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 },
    phoneRow: {
      background: '#f8f8f8', borderRadius: 10, padding: '10px 12px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    phoneLabel: { fontSize: 9, color: '#888', fontFamily: 'Poppins, sans-serif', fontWeight: 400 },
    phoneVal: { fontSize: 12.5, fontWeight: 700, color: '#FF5A00', fontFamily: 'Poppins, sans-serif' },
    chartBox: { background: '#f8f8f8', borderRadius: 10, padding: '10px 12px' },
    chartLabel: { fontSize: 9, color: '#bbb', fontFamily: 'Poppins, sans-serif', fontWeight: 400, marginBottom: 8 },
    bars: { display: 'flex', alignItems: 'flex-end', gap: 5, height: 48 },
    /* Badge */
    badge: {
      position: 'static', margin: '-40px auto 0',
      background: '#fff', borderRadius: 14, padding: '14px 18px',
      boxShadow: '0 10px 36px rgba(0,0,0,.11)', zIndex: 2, minWidth: 145, maxWidth: 240,
    },
    badgeAvatar: {
      width: 30, height: 30, borderRadius: '50%', background: '#FF5A00',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 8,
      fontFamily: 'Poppins, sans-serif',
    },
    badgeName: { fontSize: 11, fontWeight: 700, color: '#111', fontFamily: 'Poppins, sans-serif' },
    badgeRole: { fontSize: 9, color: '#aaa', fontFamily: 'Poppins, sans-serif', marginTop: 2 },
    /* Right */
    right: { display: 'flex', flexDirection: 'column', gap: 32, width: '100%' },
    tagline: {
      fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: 800,
      color: '#111', lineHeight: 1.15, letterSpacing: '-1.2px',
    },
    orange: { color: '#FF5A00' },
    desc: { fontSize: 14.5, color: '#666', lineHeight: 1.74, fontFamily: 'Poppins, sans-serif', fontWeight: 400, marginTop: 14 },
    statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 },
    statVal: { fontSize: 30, fontWeight: 800, color: '#FF5A00', fontFamily: 'Poppins, sans-serif', lineHeight: 1 },
    statLabel: { fontSize: 12, color: '#777', fontFamily: 'Poppins, sans-serif', fontWeight: 400 },
    storeLabel: { fontSize: 12, color: '#bbb', fontFamily: 'Poppins, sans-serif', fontWeight: 500, marginBottom: 12 },
    storesRow: { display: 'flex', gap: 12 },
    storeBtn: (bg) => ({
      display: 'flex', alignItems: 'center', gap: 10,
      background: bg || '#111', color: '#fff', padding: '12px 20px',
      borderRadius: 12, cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
    }),
    storeBtnTexts: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
    storeBtnSub: { fontSize: 9, opacity: .65, fontFamily: 'Poppins, sans-serif', fontWeight: 400 },
    storeBtnMain: { fontSize: 13, fontWeight: 700, fontFamily: 'Poppins, sans-serif' },
  };

  return (
    <section style={s.section}>
      <div style={s.wrapper}>
        <div style={s.grid}>
     
          <div style={s.phoneWrap}>
            <div style={s.phoneGlow} />
            <div style={s.phone}>
              <div style={s.phoneScreen}>
                <div style={s.phoneHeader}>
                  <div style={s.phoneHeaderTitle}>Djamano Dashboard</div>
                  <div style={s.phoneHeaderSub}>Événementiel à portée de main</div>
                </div>
                <div style={s.phoneBody}>
                  <div style={s.phoneRow}>
                    <span style={s.phoneLabel}>Billets vendus</span>
                    <span style={s.phoneVal}>1 284</span>
                  </div>
                  <div style={s.phoneRow}>
                    <span style={s.phoneLabel}>Revenus</span>
                    <span style={s.phoneVal}>2.4M FCFA</span>
                  </div>
                  <div style={s.chartBox}>
                    <div style={s.chartLabel}>Activité hebdomadaire</div>
                    <div style={s.bars}>
                      {barData.map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? '#FF5A00' : '#ebebeb', borderRadius: '3px 3px 0 0' }} />
                      ))}
                    </div>
                  </div>
                  <div style={s.phoneRow}>
                    <span style={s.phoneLabel}>Prestataires actifs</span>
                    <span style={s.phoneVal}>342</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

         
          <div style={s.right}>
            <div>
              <h2 style={s.tagline}>L'événementiel <span style={s.orange}>à portée de main.</span></h2>
              <p style={s.desc}>Découvrez, réservez et gérez vos événements directement depuis votre téléphone.</p>
            </div>
            <div style={s.statsGrid}>
              {[['100%','événementiels'],['100%','recommandés'],['24h/7j','Assistance'],['4,5/5','notes avis']].map(([v,l])=>(
                <div key={l}>
                  <div style={s.statVal}>{v}</div>
                  <div style={s.statLabel}>{l}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={s.storeLabel}>Disponible bientôt sur :</div>
              <div style={s.storesRow}>
                <div style={s.storeBtn()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.33.18.7.24 1.08.18L14.84 12 4.26.06C3.88 0 3.51.06 3.18.24 2.52.6 2.1 1.32 2.1 2.2v19.6c0 .88.42 1.6 1.08 1.96z"/></svg>
                  <div style={s.storeBtnTexts}>
                    <span style={s.storeBtnSub}>Disponible sur</span>
                    <span style={s.storeBtnMain}>Google Play</span>
                  </div>
                </div>
                <div style={s.storeBtn('#1a1a1a')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div style={s.storeBtnTexts}>
                    <span style={s.storeBtnSub}>Télécharger sur</span>
                    <span style={s.storeBtnMain}>App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
