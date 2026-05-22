import React from 'react';

const importantLinks = ['Devenez Organisateur','Devenez Prestataire','Créer un compte utilisateur','Réserver un service','Rechercher un événement'];
const quickLinks = ["C'est quoi Djamano ?","Djamano ai","Services","Mes billets","Mes réservations","Assistance","FAQ"];

const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>;
const IconMsg  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconFb   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IconTik  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;
const IconMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconPin  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const Footer = () => {
  const s = {
    footer: {
      background: '#F7F7F7',
      color: '#e0e0e0',
      padding: '64px 32px 32px',
      fontFamily: 'Poppins, sans-serif',
      borderTop: '1px solid #e8e8e8',
    },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 32,
      paddingBottom: 44,
      borderBottom: '1px solid #e0e0e0',
      marginBottom: 28,
      flexWrap: 'wrap',
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 20, fontWeight: 700, marginBottom: 16,
      color: '#111',
    },
    logoImg: {
      height: '45px',
      width: 'auto',
      objectFit: 'contain'
    },
    tagline: {
      fontSize: 13, color: '#666', lineHeight: 1.72,
      fontFamily: 'Poppins, sans-serif', fontWeight: 400,
      maxWidth: 260, marginBottom: 22,
    },
    stores: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },
    storeBadge: {
      height: '34px',
      width: 'auto',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    colTitle: {
      fontSize: 13, fontWeight: 700, color: '#111',
      fontFamily: 'Poppins, sans-serif', marginBottom: 18,
    },
    link: {
      display: 'block', fontSize: 12.5, color: '#666',
      fontFamily: 'Poppins, sans-serif', fontWeight: 400,
      marginBottom: 11, cursor: 'pointer',
      transition: 'color .2s',
      textDecoration: 'none',
    },
    contact: { display: 'flex', flexDirection: 'column', gap: 10 },
    contactItem: {
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 12.5, color: '#666',
      fontFamily: 'Poppins, sans-serif', fontWeight: 400,
    },
    bottom: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    copy: {
      fontSize: 12, color: '#aaa',
      fontFamily: 'Poppins, sans-serif', fontWeight: 400,
      textAlign: 'center'
    }
  };

  const infoItems = [
    [<IconMail/>, 'djamanoinfo01@gmail.com'],
    [<IconPin/>, 'Ouagadougou'], 
  ];
  
  const assistanceItems = [
    [<IconPhone/>, '+226 79632545'],
    [<IconMsg/>, 'Whatsapp'],
    [<IconFb/>, 'Facebook'],
    [<IconTik/>, 'TikTok'],
  ];

  return (
    <footer style={s.footer}>
      <div style={s.wrapper}>
        <div style={s.top}>
          {/* Brand */}
          <div>
            <div style={s.logo}>
              <img src="/djamano.png" alt="Djamano Logo" style={s.logoImg} />
             
            </div>
            <p style={s.tagline}>
              Djamano est une plateforme tout-en-un dédiée à la gestion et à la réservation d'événements et de services associés.
            </p>
            {/* Remplacement des anciens boutons texte par les badges images officiels */}
            <div style={s.stores}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                style={s.storeBadge} 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                style={s.storeBadge} 
              />
            </div>
          </div>

          {/* Liens importants */}
          <div>
            <div style={s.colTitle}>Liens importants</div>
            {importantLinks.map(l => <a key={l} style={s.link}>{l}</a>)}
          </div>

          {/* Liens rapides */}
          <div>
            <div style={s.colTitle}>Liens rapides</div>
            {quickLinks.map(l => <a key={l} style={s.link}>{l}</a>)}
          </div>

          {/* Informations */}
          <div>
            <div style={s.colTitle}>Informations</div>
            <div style={s.contact}>
              {infoItems.map(([icon, text], i) => (
                <div key={i} style={s.contactItem}>{icon} {text}</div>
              ))}
            </div>
          </div>

          {/* Assistance */}
          <div>
            <div style={s.colTitle}>Assistance</div>
            <div style={s.contact}>
              {assistanceItems.map(([icon, text], i) => (
                <div key={i} style={s.contactItem}>{icon} {text}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bas du footer avec centrage horizontal parfait */}
        <div style={s.bottom}>
          <span style={s.copy}><strong>© 2026 Djamano.</strong> Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;