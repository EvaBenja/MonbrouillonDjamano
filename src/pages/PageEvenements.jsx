import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatistiquesBas from '../composants-communs/StatistiquesBas';
import PiedDePage from '../components/PiedDePage';

/* ── Images événements depuis /public ── */
const imgs = [
  '/evenement1.jpg', '/evenement2.jpg', '/evenement3.jpg',
  '/evenement4.jpg', '/evenement5.jpg', '/evenement6.jpg',
  '/evenement7.jpg', '/evenement8.jpg', '/evenement9.jpg',
  '/evenement10.jpg','/evenement11.jpg','/evenement12.jpg',
  '/evenement13.jpg','/evenement14.jpg',
];

/* Fallback gradient si image absente */
const fallbacks = [
  'linear-gradient(145deg,#7c2d12,#c2410c)',
  'linear-gradient(145deg,#1e3a8a,#1d4ed8)',
  'linear-gradient(145deg,#3b0764,#7e22ce)',
  'linear-gradient(145deg,#14532d,#15803d)',
  'linear-gradient(145deg,#1c1917,#44403c)',
  'linear-gradient(145deg,#7f1d1d,#dc2626)',
  'linear-gradient(145deg,#0c4a6e,#0369a1)',
  'linear-gradient(145deg,#365314,#4d7c0f)',
  'linear-gradient(145deg,#831843,#be185d)',
  'linear-gradient(145deg,#1a1a2e,#16213e)',
  'linear-gradient(145deg,#4a044e,#86198f)',
  'linear-gradient(145deg,#042f2e,#065f46)',
  'linear-gradient(145deg,#92400e,#d97706)',
  'linear-gradient(145deg,#0f172a,#1e293b)',
];

const SECTIONS = [
  {
    id: 'proche',
    titre: 'Évènements · proche de vous',
    items: [
      { id:1,  titre:"Prix de l'Entrepreneuriat Féminin act 2", lieu:"CENASA",                          org:"MBM Group",            date:"Le Jeudi 30 Septembre", b1:'Gratuit', b2:'Pass'     },
      { id:2,  titre:"FESTIVAL DE LA COHESION SAHELIENNE",      lieu:"Rossignol à Wemtenga",           org:"ASSEC",                date:"Du 25 au 26 Octobre",   b1:'Pass'                   },
      { id:3,  titre:"BOUGOUSSO de la diversité",               lieu:"Au Wakanda",                     org:"ZOMALECT",             date:"Du 20 Mars au 25 Mars", b1:'5.500 Fr'               },
      { id:4,  titre:"SOIREE KARAOKE",                          lieu:"Cosy Corner",                    org:"Cosy Corner",          date:"Vendredi 11 Octobre",   b1:'Gratuit'                },
    ],
  },
  {
    id: 'ouaga',
    titre: 'Évènements · Ouagadougou',
    items: [
      { id:5,  titre:"SOIREE KARAOKE",              lieu:"Cosy Corner",                         org:"Cosy Corner",   date:"Vendredi 11 Octobre",  b1:'Gratuit' },
      { id:6,  titre:"JEUNES COULEURS AMNBIANCE",   lieu:"Situé derrière l'ex IAM Ouaga 2000",  org:"SQUASH TIME",   date:"Jeudi 28 Août",        b1:'Gratuit' },
      { id:7,  titre:"ORCHESTRE BANA M'BOKA",       lieu:"Situé derrière l'ex IAM Ouaga 2000",  org:"SQUASH TIME",   date:"Samedi 20 Septembre",  b1:'Pass'    },
      { id:8,  titre:"FESTIVAL DU JAZZ",            lieu:"Palais des Sports",                   org:"MBM Group",     date:"Samedi 5 Octobre",     b1:'Gratuit' },
    ],
  },
  {
    id: 'bobo',
    titre: 'Évènements · Bobo Dioulasso',
    items: [
      { id:9,  titre:"SOIREE ANIMATION DEEJAY",   lieu:"COSY CORNER",                    org:"SITHO",               date:"Samedi 21 Décembre",  b1:'Gratuit' },
      { id:10, titre:"BOUGOUSSO de la diversité", lieu:"Musée National du Burkina Faso", org:"Co . MNBF & PCIM INTS",date:"Mercredi 15 Octobre", b1:'Gratuit' },
      { id:11, titre:"FUTUR MAKER NIGHT",         lieu:"ELPARA GA",                      org:"NEXUS",               date:"Vendredi 10 Octobre", b1:'Gratuit' },
    ],
  },
  {
    id: 'autres',
    titre: 'Évènements · Autres villes',
    items: [
      { id:12, titre:"MISTER KOFF EN LIVE",           lieu:"Situé derrière l'ex IAM Ouaga 2000", org:"SQUASH TIME", date:"Du 20 Mars au 25 Mars", b1:'Gratuit' },
      { id:13, titre:"SUMMER PARTY",                  lieu:"AFRICA FESTIVAL",                    org:"SUBIACO",     date:"Mardi 16 Novembre",      b1:'Gratuit' },
      { id:14, titre:"ROOTS AFRICAN FASHION PARTY",   lieu:"ACCRA AIRPORT",                      org:"CULTURE",     date:"Jeudi 28 Décembre",      b1:'Gratuit' },
    ],
  },
];

/* ── Badge ── */
const Badge = ({ txt }) => {
  if (!txt) return null;
  let bg = '#111', color = '#fff';
  if (txt === 'Gratuit') { bg = '#16a34a'; color = '#fff'; }
  else if (txt === 'Pass') { bg = '#1e293b'; color = '#fff'; }
  else { bg = '#FF5A00'; color = '#fff'; }
  return (
    <span style={{
      background: bg, color, fontSize: 10.5, fontWeight: 700,
      padding: '4px 12px', borderRadius: 20,
      fontFamily: 'Poppins, sans-serif', letterSpacing: '0.3px',
    }}>
      {txt}
    </span>
  );
};

/* ── Icônes SVG maquette ── */
const IcoPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoOrg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9f1239" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
  </svg>
);
const IcoCal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IcoLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

/* ── Carte Évènement ── */
const CarteEvenement = ({ ev, onClick }) => {
  const idx = ev.id - 1;
  const imgSrc = imgs[idx] || imgs[0];
  const fallback = fallbacks[idx % fallbacks.length];

  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid #efefef', cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,.07)',
        transition: 'transform .2s, box-shadow .2s',
        fontFamily: 'Poppins, sans-serif',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,.07)'; }}
    >
      {/* Affiche */}
      <div style={{
        width: '100%', height: 200, position: 'relative', overflow: 'hidden',
        background: imgError ? fallback : 'transparent',
      }}>
        {!imgError && (
          <img
            src={imgSrc}
            alt={ev.titre}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {imgError && (
          <div style={{ width: '100%', height: '100%', background: fallback, display: 'flex', alignItems: 'flex-end', padding: 12 }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>{ev.titre}</span>
          </div>
        )}
        {/* Badges par dessus l'image */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
          <Badge txt={ev.b1} />
          {ev.b2 && <Badge txt={ev.b2} />}
        </div>
        {/* Overlay gradient bas */}
        {!imgError && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
          }} />
        )}
      </div>

      {/* Corps */}
      <div style={{ padding: '13px 14px 15px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10, lineHeight: 1.35 }}>
          {ev.titre}
        </div>

        {/* Lieu — vert léger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <IcoPin />
          <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>{ev.lieu}</span>
        </div>

        {/* Organisateur — rouge bordeaux léger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <IcoOrg />
          <span style={{ fontSize: 12, color: '#9f1239', fontWeight: 500 }}>{ev.org}</span>
        </div>

        {/* Date — gris */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <IcoCal />
          <span style={{ fontSize: 12, color: '#777', fontWeight: 400 }}>{ev.date}</span>
        </div>

        {/* Bouton Détails */}
        <button
          style={{
            width: '100%',
            background: '#FF5A00',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '10px 0',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif',
            cursor: 'pointer',
            letterSpacing: '0.2px',
            boxShadow: '0 3px 12px rgba(255,90,0,0.28)',
            transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e04e00'}
          onMouseLeave={e => e.currentTarget.style.background = '#FF5A00'}
        >
          Détails
        </button>
      </div>
    </div>
  );
};

/* ── Section avec slider ── */
const SectionSlider = ({ section, onSelect }) => {
  const [start, setStart] = useState(0);
  const PER = 3;
  const canLeft  = start > 0;
  const canRight = start + PER < section.items.length;

  const navStyle = (active, side) => ({
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: -18,
    width: 36, height: 36, borderRadius: '50%',
    background: active ? '#fff' : 'rgba(255,255,255,0.5)',
    boxShadow: active ? '0 2px 14px rgba(0,0,0,.15)' : 'none',
    border: '1.5px solid #eee',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: active ? 'pointer' : 'default',
    opacity: active ? 1 : 0.35, zIndex: 2, color: '#333',
  });

  return (
    <div style={{ marginBottom: 52 }}>
      {/* En-tête section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#111', fontFamily: 'Poppins, sans-serif', flex: 1 }}>
          {section.titre}
        </span>
        <span style={{ fontSize: 13, color: '#FF5A00', fontWeight: 700, cursor: 'pointer' }}>&nbsp;›</span>
      </div>

      {/* Slider */}
      <div style={{ position: 'relative' }}>
        <div style={navStyle(canLeft, 'left')} onClick={() => canLeft && setStart(s => s - 1)}>
          <IcoLeft />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {section.items.slice(start, start + PER).map(ev => (
            <CarteEvenement key={ev.id} ev={ev} onClick={() => onSelect(ev.id)} />
          ))}
        </div>
        <div style={navStyle(canRight, 'right')} onClick={() => canRight && setStart(s => s + 1)}>
          <IcoRight />
        </div>
      </div>
    </div>
  );
};

/* ── Barre de recherche ── */
const BarreRecherche = () => {
  const [type, setType] = useState('');
  const [loc,  setLoc]  = useState('');
  const [date, setDate] = useState('');

  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,.09)',
      border: '1px solid #efefef',
      display: 'flex', alignItems: 'stretch', overflow: 'hidden',
    }}>
      {[
        { label: 'Type de recherche', ph: 'Ajouter',   val: type,  set: setType, type: 'text' },
        { label: 'Localisation',       ph: 'Ajouter',   val: loc,   set: setLoc,  type: 'text' },
        { label: 'Date',               ph: 'Quand ?',   val: date,  set: setDate, type: 'text', last: true },
      ].map(f => (
        <div key={f.label} style={{
          flex: 1, padding: '16px 22px',
          borderRight: f.last ? 'none' : '1px solid #efefef',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Poppins,sans-serif' }}>
            {f.label}
          </span>
          <input
            style={{ border: 'none', outline: 'none', fontSize: 13.5, color: '#333', fontFamily: 'Poppins,sans-serif', background: 'transparent', fontWeight: 400 }}
            placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} type={f.type}
          />
        </div>
      ))}
      <button style={{
        background: '#FF5A00', color: '#fff', border: 'none',
        padding: '0 28px', minHeight: 72,
        fontSize: 14, fontWeight: 600, fontFamily: 'Poppins,sans-serif',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <IcoSearch /> Rechercher
      </button>
    </div>
  );
};

/* ── Pagination ── */
const Pagination = ({ page, total, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '20px 0 44px' }}>
    <div
      onClick={() => page > 1 && onChange(page - 1)}
      style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#555' }}
    >
      <IcoLeft />
    </div>
    {[...Array(total)].map((_, i) => (
      <div
        key={i} onClick={() => onChange(i + 1)}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: i + 1 === page ? 'none' : '1.5px solid #e0e0e0',
          background: i + 1 === page ? '#FF5A00' : '#fff',
          color: i + 1 === page ? '#fff' : '#555',
          fontSize: 13, fontWeight: i + 1 === page ? 700 : 400,
          fontFamily: 'Poppins,sans-serif', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {i + 1}
      </div>
    ))}
    <div
      onClick={() => page < total && onChange(page + 1)}
      style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#555' }}
    >
      <IcoRight />
    </div>
  </div>
);

/* ══ PAGE ÉVÈNEMENTS ══ */
const PageEvenements = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      {/* Barre de recherche */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 28px 0' }}>
        <BarreRecherche />
      </div>

      {/* Sections événements */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '48px 28px 0' }}>
        {SECTIONS.map(sec => (
          <SectionSlider
            key={sec.id}
            section={sec}
            onSelect={id => navigate(`/evenements/${id}`)}
          />
        ))}
        <Pagination page={page} total={4} onChange={setPage} />
      </div>

      <StatistiquesBas />
      <PiedDePage />
    </div>
  );
};

export default PageEvenements;
