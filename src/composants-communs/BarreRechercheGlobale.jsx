import React, { useState } from 'react';

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const BarreRechercheGlobale = () => {
  const [typeRecherche, setTypeRecherche] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [date, setDate] = useState('');

  const s = {
    wrap: {
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
      display: 'flex',
      alignItems: 'center',
      padding: '6px 6px 6px 0',
      gap: 0,
      border: '1px solid #efefef',
      margin: '32px 0 0',
    },
    field: {
      flex: 1,
      padding: '14px 24px',
      borderRight: '1px solid #efefef',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    },
    label: {
      fontSize: 11, fontWeight: 600, color: '#bbb',
      fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', textTransform: 'uppercase',
    },
    input: {
      border: 'none', outline: 'none',
      fontSize: 14, color: '#333',
      fontFamily: 'Poppins, sans-serif', fontWeight: 400,
      background: 'transparent',
      width: '100%',
    },
    btnRecherche: {
      background: '#FF5A00', color: '#fff',
      border: 'none', borderRadius: 12,
      padding: '14px 28px',
      fontSize: 14, fontWeight: 600,
      fontFamily: 'Poppins, sans-serif',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 8,
      margin: '0 4px',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <div style={s.wrap}>
      <div style={s.field}>
        <span style={s.label}>Type de recherche</span>
        <input style={s.input} placeholder="Ajouter" value={typeRecherche} onChange={e=>setTypeRecherche(e.target.value)}/>
      </div>
      <div style={s.field}>
        <span style={s.label}>Localisation</span>
        <input style={s.input} placeholder="Ajouter" value={localisation} onChange={e=>setLocalisation(e.target.value)}/>
      </div>
      <div style={{ ...s.field, borderRight: 'none' }}>
        <span style={s.label}>Date</span>
        <input style={s.input} placeholder="Quand ?" value={date} onChange={e=>setDate(e.target.value)} type="date"/>
      </div>
      <button style={s.btnRecherche}>
        <IconSearch /> Rechercher
      </button>
    </div>
  );
};

export default BarreRechercheGlobale;
