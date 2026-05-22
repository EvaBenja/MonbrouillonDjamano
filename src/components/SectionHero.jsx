import React from 'react';

const HeroSection = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    section: { 
      position: 'relative', 
      padding: 'clamp(70px, 10vw, 160px) 24px 60px', 
      fontFamily: 'Poppins, sans-serif',
      overflow: 'hidden',
      minHeight: 'min(80vh, 760px)',
      display: 'flex',
      alignItems: 'center',
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1
    },
    videoOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.25)', 
      zIndex: 2
    },
    container: { 
      position: 'relative', 
      zIndex: 3,
      maxWidth: 1200, 
      margin: '0 auto', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      textAlign: 'left' 
    },
    h1: { 
      fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', 
      fontWeight: 800, 
      lineHeight: 1.2, 
      color: '#ffffff', 
      maxWidth: 800, 
      marginBottom: 28, 
      letterSpacing: '-1.5px' 
    },
    highlight: { color: '#FF5A00' },
    subText: { 
      fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', 
      color: 'rgba(255, 255, 255, 0.9)', 
      maxWidth: 620, 
      lineHeight: 1.6, 
      fontWeight: 400, 
      marginBottom: 40 
    },
    storeRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 54 },
    btnOrange: {
      background: '#FF5A00', 
      color: '#ffffff',
      padding: '14px 32px',
      borderRadius: 12,
      fontSize: 15,
      fontWeight: 600,
      fontFamily: 'Poppins, sans-serif',
      border: 'none', 
      cursor: 'pointer',
      boxShadow: '0 6px 22px rgba(255,90,0,.3)',
      transition: 'all .2s',
    },
    partnersArea: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 20, 
      flexWrap: 'wrap', 
      borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
      paddingTop: 30, 
      width: '100%' 
    },
    partnerLabel: { fontSize: 13, fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' },
    logosContainer: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
    partnerLogo: { fontSize: 16, fontWeight: 700, color: '#ffffff', opacity: 0.9,  background: 'rgba(255, 255, 255, 0.12)', // Léger fond blanc transparent
  backdropFilter: 'blur(4px)', 
  padding: '6px 16px', 
  borderRadius: 20, 
  border: '1px solid rgba(255, 255, 255, 0.1)',}, 
    playBtn: {
      width: 36, height: 36, borderRadius: '50%', background: '#FFF3ED', border: 'none',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      marginLeft: '12px', transition: 'all 0.2s', padding: 0
    }
  };

  return (
    <section id="accueil" style={styles.section}>
   
      <video 
        style={styles.videoBackground}
        autoPlay 
        loop 
        muted 
        playsInline
        src="/hero-video.mp4" 
      />

    
      <div style={styles.videoOverlay} />

     
      <div style={styles.container}>
        <h1 style={styles.h1}>
          La plateforme digitale pour propulser vos <span style={styles.highlight}>Événements</span>
        </h1>
        <p style={styles.subText}>
          Entrez dans une communauté où chaque événement devient une expérience à vivre, partager et
          découvrir. Djamano rassemble créateurs, organisateurs, prestataires et passionnés autour d’un
          même espace pensé pour connecter tout l’univers de l’événementiel.
        </p>
        

        <div style={styles.storeRow}>
          <button 
            style={styles.btnOrange} 
            onClick={() => scrollToSection('services')}
          >
            Voir les événements
          </button>
        </div>

       

<div style={styles.partnersArea}>
  <span style={styles.partnerLabel}>Reconnu par :</span>
  <div style={styles.logosContainer}>
    <span style={styles.partnerLogo}>Google</span>
    <span style={styles.partnerLogo}>P&G</span>
    <span style={styles.partnerLogo}>PayPal</span>
    <span style={styles.partnerLogo}>Netflix</span>
  </div>

          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;