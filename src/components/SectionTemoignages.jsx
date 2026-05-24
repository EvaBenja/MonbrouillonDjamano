import React from 'react';

const list = [
  { name: 'DJ Malik', text: "Grâce à Djamano, j'ai trouvé de nouveaux clients sans bouger de mon studio.", initials: 'M', rating: 5 },
  { name: 'Clarisse Kaboré', text: "J'adore pouvoir découvrir des événements près de moi et acheter mes billets directement en ligne.", initials: 'C', rating: 4.5 },
  { name: 'Shailesh Kushwaha', text: "Avant Djamano, gérer la billetterie et les réservations était un vrai casse-tête. Aujourd'hui, tout est centralisé.", initials: 'S', rating: 4.5 },
];

const TestimonialsSection = () => {
  const styles = {
    section: { background: '#F9F9F9', padding: '90px 24px', fontFamily: 'Poppins, sans-serif' },
    container: { maxWidth: 1200, margin: '0 auto' },
    title: { fontSize: 34, fontWeight: 800, color: '#111', marginBottom: 44 },
    highlight: { color: '#FF5A00' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'center' },
    card: (isCenter) => ({
      borderRadius: 18, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 14,
      
      background: isCenter ? 'linear-gradient(135deg, #FF5A00 0%, #FF782E 100%)' : '#ffffff',
      color: isCenter ? '#ffffff' : '#111111',
      border: isCenter ? 'none' : '1px solid #ebebeb',
      transform: isCenter ? 'scale(1.03)' : 'scale(1)',
      boxShadow: isCenter ? '0 12px 30px rgba(255,90,0,0.25)' : 'none',
      transition: 'all 0.3s ease'
    }),
    avatar: (isCenter) => ({ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, background: isCenter ? 'rgba(255,255,255,0.2)' : '#FFF3ED', color: isCenter ? '#fff' : '#FF5A00' }),
    name: { fontSize: 16, fontWeight: 700 },
    text: (isCenter) => ({ fontSize: 14, lineHeight: 1.6, color: isCenter ? 'rgba(255,255,255,0.9)' : '#555' }),
    stars: { display: 'flex', gap: 2 },
    star: (isCenter) => ({ color: isCenter ? '#ffffff' : '#FF5A00', fontSize: 14 })
  };

  return (
    <section id="temoignages" style={styles.section}>
      <div style={styles.container}>
    
        <h2 style={styles.title}>Avis d’<span style={styles.highlight}>utilisateurs</span></h2>
        
        <div style={styles.grid}>
          {list.map((t, idx) => {
            const isCenter = idx === 1; 
            return (
              <div key={idx} style={styles.card(isCenter)}>
                <div style={styles.avatar(isCenter)}>{t.initials}</div>
                <div style={styles.name}>{t.name}</div>
                <p style={styles.text(isCenter)}>{t.text}</p>
                <div style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={styles.star(isCenter)}>
                      {t.rating > i ? (t.rating === i + 0.5 ? '½★' : '★') : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;