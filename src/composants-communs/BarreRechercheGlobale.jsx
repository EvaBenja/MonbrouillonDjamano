import React, { useState } from 'react';

/**
 * Barre de recherche conforme à la maquette Djamano :
 * - Fond blanc, coins arrondis 16px, ombre légère
 * - 3 champs séparés par des lignes verticales fines, chacun avec sa propre bordure visible (boîte)
 * - Bouton orange "Rechercher" avec icône loupe
 */
const BarreRechercheGlobale = () => {
  const [type, setType] = useState('');
  const [loc,  setLoc]  = useState('');
  const [date, setDate] = useState('');

  const champs = [
    { label: 'Type de recherche', ph: 'Ajouter', val: type, set: setType },
    { label: 'Localisation',      ph: 'Ajouter', val: loc,  set: setLoc  },
    { label: 'Date',              ph: 'Quand ?', val: date, set: setDate },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #ececec',
      boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
      padding: '6px',
    }}>
      {champs.map((c, i) => (
        <div
          key={c.label}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '12px 22px',
            borderRight: i < champs.length - 1 ? '1px solid #ececec' : 'none',
          }}
        >
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#222',
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
              fontSize: 13.5,
              color: '#aaa',
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
        borderRadius: 11,
        padding: '15px 30px',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'Poppins, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        marginLeft: 4,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Rechercher
      </button>
    </div>
  );
};

export default BarreRechercheGlobale;
