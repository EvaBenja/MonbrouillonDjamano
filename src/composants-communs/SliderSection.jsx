import React, { useState } from 'react';

const IconChevronLeft  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

/* Slider générique : reçoit un tableau d'items + un renderCard */
const SliderSection = ({ titre, items, renderCard, colonnes = 3 }) => {
  const [debut, setDebut] = useState(0);
  const visibles = items.slice(debut, debut + colonnes);
  const peutReculer = debut > 0;
  const peutAvancer = debut + colonnes < items.length;

  const s = {
    section: { marginBottom: 52 },
    header: {
      display: 'flex', alignItems: 'center', gap: 6,
      marginBottom: 20,
    },
    titre: {
      fontSize: 17, fontWeight: 700, color: '#111',
      fontFamily: 'Poppins, sans-serif', flex: 1,
    },
    fleche: { color: '#FF5A00', fontWeight: 700, cursor: 'pointer', fontSize: 14 },
    sliderWrap: { position: 'relative' },
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${colonnes}, 1fr)`,
      gap: 20,
    },
    navBtn: (actif) => ({
      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
      width: 36, height: 36, borderRadius: '50%',
      background: actif ? '#fff' : 'rgba(255,255,255,0.5)',
      boxShadow: actif ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
      border: '1px solid #eee',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: actif ? 'pointer' : 'default',
      opacity: actif ? 1 : 0.3,
      zIndex: 2,
      color: '#333',
    }),
    navLeft:  { left: -18 },
    navRight: { right: -18 },
  };

  return (
    <div style={s.section}>
      <div style={s.header}>
        <span style={s.titre}>{titre}</span>
        <span style={s.fleche}>&gt;</span>
      </div>
      <div style={s.sliderWrap}>
        <div
          style={{ ...s.navBtn(peutReculer), ...s.navLeft }}
          onClick={() => peutReculer && setDebut(d => d - 1)}
        >
          <IconChevronLeft />
        </div>
        <div style={s.grid}>
          {visibles.map((item, i) => renderCard(item, i))}
        </div>
        <div
          style={{ ...s.navBtn(peutAvancer), ...s.navRight }}
          onClick={() => peutAvancer && setDebut(d => d + 1)}
        >
          <IconChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
