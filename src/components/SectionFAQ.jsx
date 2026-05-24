import React from 'react';

const faqs = [
  {
    q: "Que faire en cas de besoin d'assistance ?",
    a: "Si vous rencontrez un problème technique ou avez une question, notre équipe d'assistance est là pour vous aider.\nVous pouvez nous contacter directement via le chat intégré sur la plateforme ou par e-mail à support@djamano.com.\n Notre équipe vous répondra dans les plus brefs délais pour vous accompagner.",
  },
  {
    q: "Faut-il créer un compte pour acheter un ticket ?",
    a: "Non, l'achat de tickets peut se faire sans créer de compte.\nCependant, la création d'un compte gratuit vous permet de noter les organisateurs, commenter, partager vos expériences et suivre l'actualité des événements.",
  },
  {
    q: "Qu'est-ce qu'un compte hybride ?",
    a: "Le compte hybride permet à un utilisateur d'être à la fois organisateur et prestataire.\nVous pouvez créer vos propres événements (avec billetterie, stands, votes…) tout en proposant vos services (DJ, salle, sécurité, traiteur, etc.).",
  },
  {
    q: "Comment contacter un organisateur ou un prestataire ?",
    a: "Grâce à la messagerie intégrée, vous pouvez discuter directement avec un organisateur ou un prestataire.\nPosez vos questions, demandez un devis ou échangez avant de réserver, tout se fait facilement sur Djamano.",
  },
  {
    q: "Comment promouvoir mes événements ou mes services ?",
    a: "Vous pouvez publier des stories et statuts temporaires pour partager vos offres, annoncer un événement ou montrer vos réalisations.\nC'est un moyen simple et efficace pour gagner en visibilité sur la plateforme.",
  },
  {
    q: "Quels sont les moyens de paiement disponibles ?",
    a: "Djamano prend en charge plusieurs modes de paiement sécurisés : Mobile Money, cartes locales et transferts bancaires.\nToutes les transactions sont fiables et protégées.",
  },
];

const FAQSection = () => {
  const s = {
    section: {
      background: '#fff',
      padding: 'clamp(60px, 8vw, 90px) 24px',
      fontFamily: 'Poppins, sans-serif',
    },
    wrapper: { maxWidth: 1200, margin: '0 auto' },
    title: {
      fontSize: 34, fontWeight: 800,
      color: '#FF5A00',
      fontFamily: 'Poppins, sans-serif',
      letterSpacing: '-0.6px',
      marginBottom: 52,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '32px',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },
    q: {
      fontSize: 16,
      fontWeight: 700,
      color: '#111',
      fontFamily: 'Poppins, sans-serif',
      lineHeight: 1.4,
    },
    a: {
      fontSize: 14,
      color: '#555',
      lineHeight: 1.78,
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
      whiteSpace: 'pre-line',
    },
  };

  return (
    <section style={s.section}>
      <div style={s.wrapper}>
        <h2 style={s.title}>Foire aux Questions (FAQ)</h2>
        <div style={s.grid}>
          {faqs.map((f, i) => (
            <div key={i} style={s.card}>
              <div style={s.q}>{f.q}</div>
              <div style={s.a}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
