import React, { useState } from 'react';
import useResponsive from './useResponsive';

/* Avatar avec image + fallback dégradé */
const AvatarReel = ({ src, fallback }) => {
  const [err, setErr] = useState(false);
  return err
    ? <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:fallback }} />
    : <img src={src} alt="" onError={() => setErr(true)} style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover', display:'block' }} />;
};

const fallbacks = [
  'linear-gradient(145deg,#92400e,#d97706)','linear-gradient(145deg,#065f46,#059669)',
  'linear-gradient(145deg,#4338ca,#6366f1)','linear-gradient(145deg,#be185d,#ec4899)',
  'linear-gradient(145deg,#dc2626,#ef4444)','linear-gradient(145deg,#0891b2,#06b6d4)',
  'linear-gradient(145deg,#1d4ed8,#3b82f6)','linear-gradient(145deg,#1a1a1a,#404040)',
  'linear-gradient(145deg,#0369a1,#0284c7)',
];

/**
 * Section "Réels" — façon stories WhatsApp/Instagram.
 * items: [{ nom: string, img: string (chemin) }]
 */
const SectionReels = ({ items, onSelect }) => {
  const { isMobile } = useResponsive();
  const taille = isMobile ? 64 : 88;

  return (
    <div style={{ marginBottom: isMobile ? 32 : 44 }}>
      <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: '#111', marginBottom: 16, fontFamily: 'Poppins,sans-serif' }}>
        Réels
      </div>
      <div style={{
        display: 'flex', gap: isMobile ? 16 : 24, overflowX: 'auto',
        paddingBottom: 6, scrollbarWidth: 'none', msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect && onSelect(item, i)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer', width: taille + 8 }}
          >
            {/* Anneau orange en pointillés */}
            <div style={{
              width: taille, height: taille, borderRadius: '50%',
              border: '2.5px dashed #FF5A00', padding: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxSizing: 'border-box', background: '#fff',
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#eee' }}>
                <AvatarReel src={item.img} fallback={fallbacks[i % fallbacks.length]} />
              </div>
            </div>
            <span style={{
              fontSize: isMobile ? 10.5 : 12, fontWeight: 600, color: '#333',
              fontFamily: 'Poppins,sans-serif', textAlign: 'center',
              maxWidth: taille + 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {item.nom}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionReels;
