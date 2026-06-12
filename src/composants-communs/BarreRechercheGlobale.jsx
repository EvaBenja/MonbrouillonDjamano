import React, { useState } from 'react';

/**
 * Barre de recherche conforme à la maquette Djamano :
 * - Fond blanc, coins arrondis 16px, shadow légère
 * - 3 champs séparés par lignes verticales fines
 * - Bouton orange "Rechercher" avec icône loupe à droite
 */
const BarreRechercheGlobale = () => {
  const [type, setType] = useState('');
  const [loc,  setLoc]  = useState('');
  const [date, setDate] = useState('');

  const champs = [
    { label: 'Type de recherche', ph: 'Ajouter',  val: type, set: setType },
    { label: 'Localisation',       ph: 'Ajouter',  val: loc,  set: setLoc  },
    { label: 'Date',               ph: 'Quand ?',  val: date, set: setDate  },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #e8e8e8',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
    }}>
      {champs.map((c, i) => (
        <div
          key={c.label}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '14px 20px',
            borderRight: i < 2 ? '1px solid #efefef' : 'none',
          }}
        >
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#bbb',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: 4,
            fontFamily: 'Poppins, sans-serif',
          }}>
            {c.label}
          </span>
          <input
            value={c.val}
            onChange={e => c.set(e.target.value)}
            placeholder={c.ph}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: '#333',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              background: 'transparent',
              padding: 0,
            }}
          />
        </div>
      ))}

      {/* Bouton Rechercher */}
      <button style={{
        background: '#FF5A00',
        color: '#fff',
        border: 'none',
        borderRadius: 0,
        padding: '0 26px',
        minWidth: 140,
        fontSize: 13.5,
        fontWeight: 600,
        fontFamily: 'Poppins, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        letterSpacing: '0.2px',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Rechercher
      </button>
    </div>
  );
};

export default BarreRechercheGlobale;
