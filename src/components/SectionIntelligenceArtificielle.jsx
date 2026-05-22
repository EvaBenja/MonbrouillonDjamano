import React from 'react';

const cards = [
  {
    tag: 'DJAMANO INSIGHT IA',
    sub: "L'IA d'analyse et de décision stratégique",
    points: ['Prévisions événementielles', 'Analyse comportementale', 'Statistiques nationales'],
    bg: 'linear-gradient(135deg,#FF5A00 0%,#FF8A3D 100%)',
  },
  {
    tag: 'DJAMANO MATCH IA',
    sub: "L'IA de mise en relation intelligente",
    points: ['Recommandations prestataires', 'Réduction du temps de recherche', 'Valorisation des talents locaux'],
    bg: 'linear-gradient(135deg,#1a1a1a 0%,#333 100%)',
  },
  {
    tag: 'DJAMANO PULSE IA',
    sub: "L'IA d'engagement et d'expérience utilisateur",
    points: ['Recommandations personnalisées', 'Analyse de satisfaction', "Amélioration de l'expérience"],
    bg: 'linear-gradient(135deg,#2d2d2d 0%,#464646 100%)',
  },
];

const AISection = () => {
  const s = {
    section: { background: '#fff', padding: '90px 32px', fontFamily: 'Poppins, sans-serif' },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    eyebrow: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#FFF3ED', color: '#FF5A00',
      padding: '6px 14px', borderRadius: 30,
      fontSize: 12, fontWeight: 600, marginBottom: 20,
      fontFamily: 'Poppins, sans-serif',
    },
    title: {
      fontSize: 30, fontWeight: 800, color: '#111',
      fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.6px',
      marginBottom: 14, lineHeight: 1.2,
    },
    orange: { color: '#FF5A00' },
    subtitle: {
      fontSize: 18, color: '#666', fontFamily: 'Poppins, sans-serif', fontWeight: 700,
      lineHeight: 1.8, maxWidth: 640, marginBottom: 52,
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 },
    card: () => ({
      background: 'linear-gradient(90deg, #ff9f45 0%, #ff5a00 100%)',
      borderRadius: 18, padding: '34px 28px',
      color: '#fff', display: 'flex', flexDirection: 'column', gap: 18,
      border: '4px solid rgba(255, 110, 0, 0.96)',
      boxShadow: '0 24px 70px rgba(255, 102, 0, 0.18)',
    }),
    tag: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', padding: '8px 18px', borderRadius: 999,
      border: '3px solid rgba(255,255,255,0.96)',
      fontSize: 12, fontWeight: 700, letterSpacing: '.6px',
      fontFamily: 'Poppins, sans-serif', alignSelf: 'flex-start',
      background: 'transparent',
    },
    cardSub: { fontSize: 18, fontWeight: 700, fontFamily: 'Poppins, sans-serif', lineHeight: 1.4, color: '#fff' },
    points: { display: 'flex', flexDirection: 'column', gap: 14 },
    point: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#fff', opacity: 0.95 },
    dot: { width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.96)', flexShrink: 0 },
  };

  return (
    <section style={s.section}>
      <div style={s.wrapper}>

        <h6 style={s.title}>
          <span style={s.orange}> Djamano IA</span>, l'intelligence qui propulse <br />vos événements.
        </h6><br />
        <p style={s.subtitle}>
          Trois intelligences artificielles conçues pour organiser mieux, connecter plus intelligemment et impacter durablement l'écosystème événementiel.
        </p>
        <div style={s.grid}>
          {cards.map((c) => (
            <div key={c.tag} style={s.card()}>
              <span style={s.tag}>{c.tag}</span>
              <div style={s.cardSub}>{c.sub}</div>
              <div style={s.points}>
                {c.points.map((p) => (
                  <div key={p} style={s.point}><span style={s.dot}/> {p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;
