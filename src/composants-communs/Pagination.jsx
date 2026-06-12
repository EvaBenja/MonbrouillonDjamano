import React from 'react';

const Pagination = ({ page, total, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const s = {
    wrap: {
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 8, padding: '32px 0',
    },
    btn: (actif) => ({
      width: 36, height: 36, borderRadius: '50%',
      border: actif ? 'none' : '1.5px solid #e0e0e0',
      background: actif ? '#FF5A00' : '#fff',
      color: actif ? '#fff' : '#555',
      fontSize: 13, fontWeight: actif ? 700 : 400,
      fontFamily: 'Poppins, sans-serif',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }),
    arrow: {
      width: 32, height: 32, borderRadius: '50%',
      border: '1.5px solid #e0e0e0', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#555',
    },
  };

  return (
    <div style={s.wrap}>
      <div style={s.arrow} onClick={() => page > 1 && onChange(page - 1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </div>
      {pages.map(p => (
        <div key={p} style={s.btn(p === page)} onClick={() => onChange(p)}>{p}</div>
      ))}
      <div style={s.arrow} onClick={() => page < total && onChange(page + 1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
  );
};

export default Pagination;
