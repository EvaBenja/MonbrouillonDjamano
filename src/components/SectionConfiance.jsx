import React from 'react';

const partners = [
  { name: 'Google',  color: '#858b95', size: 26 },
  { name: 'P&G',     color: '#858b95', size: 25 },
  { name: 'NETFLIX', color: '#858b95', size: 30 },
  { name: 'PayPal',  color: '#858b95', size: 24 },
  { name: 'NETFLIX', color: '#858b95', size: 30 },
];

const TrustSection = () => {
  const s = {
    section: { background: '#fff', padding: '60px 32px', borderTop: '1px solid #f0f0f0', fontFamily: 'Poppins, sans-serif' },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    title: { fontSize: 20, fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#111', marginBottom: 42 },
    logos: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 52, flexWrap: 'wrap' },
    logo: (color, size) => ({ fontWeight: 800, fontFamily: 'Poppins, sans-serif', fontSize: size, color, letterSpacing: '-0.5px' }),
  };

  return (
    <section style={s.section}>
      <div style={s.wrapper}>
        <div style={s.title}>Ils nous font confiance</div>
        <div style={s.logos}>
          {partners.map((p, i) => (
            <span key={i} style={s.logo(p.color, p.size)}>{p.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
