import React, { useState } from 'react';

const StatistiquesBas = () => {
  const [onglet, setOnglet] = useState('Populaire');

  const stats = [
    'Meilleures évènements','Location de matériels sonore','Sécurité évenementiel',
    'Vidéo d\'évenement','Salle d\'évènement','Photo d\'évenementiel',
    'Gâteau de mariage','Organisation d\'évènement',
  ];

  const s = {
    wrap: { background: '#F7F7F7', padding: '52px 0 0', borderTop: '1px solid #ebebeb', fontFamily:'Poppins,sans-serif' },
    inner: { maxWidth: 1200, margin: '0 auto', padding: '0 32px 52px' },
    title: { fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 20 },
    tabs: { display: 'flex', gap: 28, marginBottom: 28, borderBottom: '1.5px solid #e8e8e8' },
    tab: (active) => ({
      fontSize: 14, fontWeight: active ? 700 : 500,
      color: active ? '#FF5A00' : '#888',
      paddingBottom: 12, cursor: 'pointer',
      borderBottom: active ? '2.5px solid #FF5A00' : '2.5px solid transparent',
      marginBottom: -1.5, transition: 'all .2s',
    }),
    grid: { display: 'flex', flexWrap: 'wrap', gap: '10px 40px' },
    item: { fontSize: 13.5, color: '#555', fontWeight: 400, cursor: 'pointer' },
  };

  return (
    <div style={s.wrap}>
      <div style={s.inner}>
        <div style={s.title}>Les statistiques des meilleurs du moment</div>
        <div style={s.tabs}>
          {['Populaire','Ouagadougou','Bobo Dioulasso'].map(t => (
            <span key={t} style={s.tab(onglet===t)} onClick={()=>setOnglet(t)}>{t}</span>
          ))}
        </div>
        <div style={s.grid}>
          {stats.map(st => <span key={st} style={s.item}>{st}</span>)}
        </div>
      </div>
    </div>
  );
};

export default StatistiquesBas;
