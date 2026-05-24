import React from 'react';

const IconTicket = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
const IconBriefcase = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const IconUser = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
const IconChat = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconCamera = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconCard = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;

const items = [
  { Icon: IconTicket, title: 'Billetterie simplifiée', desc: "Achetez ou gérez vos tickets d'événements en toute simplicité. Chaque billet possède un QR code sécurisé." },
  { Icon: IconBriefcase, title: 'Réservation de services', desc: "Trouvez et réservez les meilleurs prestataires pour vos événements : DJ, traiteurs, sécurité, salles, etc." },
  { Icon: IconUser, title: 'Comptes hybrides', desc: "Soyez à la fois organisateur et prestataire sur une seule plateforme. Créez vos événements tout en vendant vos services." },
  { Icon: IconChat, title: 'Dimension sociale', desc: "Interagissez avec la communauté Djamano : commentez, notez, répondez et partagez vos expériences." },
  { Icon: IconCamera, title: 'Stories & promotions', desc: "Publiez des stories temporaires pour promouvoir vos événements, services ou expériences récents." },
  { Icon: IconCard, title: 'Paiements sécurisés', desc: "Payez et recevez vos fonds via Mobile Money, cartes locales ou transferts bancaires de façon fiable." },
];

const ServicesSection = () => {
  const styles = {
    section: { background: '#ffffff', padding: '90px 24px', fontFamily: 'Poppins, sans-serif' },
    container: { maxWidth: 1200, margin: '0 auto' },
    title: { fontSize: 34, fontWeight: 800, color: '#111', marginBottom: 50 },
    highlight: { color: '#FF5A00' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px 24px' },
    card: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 20 },
    iconBg: {
      width: 74, height: 74, borderRadius: '50%',
    
      background: 'linear-gradient(135deg, #FF5A00 0%, #c94e07 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 20, boxShadow: '0 8px 20px rgba(205, 78, 10, 0.2)'
    },
    cardTitle: { fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 12 },
    cardDesc: { fontSize: 14, color: '#666', lineHeight: 1.6, fontWeight: 400 }
  };

  return (
    <section id="services" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Qu'<span style={styles.highlight}>offrons</span> nous ?</h2>
        <div style={styles.grid}>
          {items.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.iconBg}><item.Icon /></div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;