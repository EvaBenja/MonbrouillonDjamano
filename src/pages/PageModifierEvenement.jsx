import React, { useState, useRef } from 'react';
import NavbarPages from '../composants-communs/NavbarPages';
import PiedDePage from '../components/PiedDePage';
import useResponsive from '../composants-communs/useResponsive';

/* ── Icônes ── */
const IcoCal     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoPin     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoChevron = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IcoRight   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoClose   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoPlus    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcoTicket  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M4 12a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V12H4z"/></svg>;
const IcoStand   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>;
const IcoElect   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 11 12 14 22 4"/></svg>;
const IcoApercu  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IcoStats   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoArrow   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

/* ── Composants réutilisables ── */
const inputStyle = { border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', fontSize:14, color:'#333', fontFamily:'Poppins,sans-serif', background:'#fff', width:'100%', outline:'none', boxSizing:'border-box' };

const InputField = ({ placeholder, icon, type='text' }) => (
  <div style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', display:'flex', alignItems:'center', gap:10, background:'#fff', flex:1 }}>
    {icon}
    <input type={type} placeholder={placeholder} style={{ border:'none', outline:'none', fontSize:14, color:'#333', fontFamily:'Poppins,sans-serif', background:'transparent', width:'100%' }}/>
  </div>
);

const SelectField = ({ label, options=[] }) => {
  const [open, setOpen] = useState(false);
  const [val,  setVal]  = useState('');
  return (
    <div style={{ position:'relative' }}>
      <div onClick={()=>setOpen(o=>!o)} style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'15px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', background:'#fff' }}>
        <span style={{ fontSize:14, color:val?'#333':'#aaa', fontFamily:'Poppins,sans-serif' }}>{val||label}</span>
        <IcoChevron/>
      </div>
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'#fff', border:'1.5px solid #e8e8e8', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.1)', zIndex:200, overflow:'hidden', marginTop:4 }}>
          {options.map(o=>(
            <div key={o} onClick={()=>{setVal(o);setOpen(false);}} style={{ padding:'13px 18px', fontSize:14, color:val===o?'#FF5A00':'#333', fontWeight:val===o?700:400, cursor:'pointer', fontFamily:'Poppins,sans-serif', borderBottom:'1px solid #f5f5f5', background:val===o?'#FFF3ED':'#fff' }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const Toggle = ({ label, icon, value, onChange }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
    {icon && <span style={{ color:'#555' }}>{icon}</span>}
    <span style={{ fontSize:16, fontWeight:700, color:'#111', fontFamily:'Poppins,sans-serif' }}>{label}</span>
    <div onClick={()=>onChange(!value)} style={{ width:46, height:26, borderRadius:13, background:value?'#FF5A00':'#ddd', position:'relative', cursor:'pointer', transition:'background .2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left:value?22:3, width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,.2)', transition:'left .2s' }}/>
    </div>
  </div>
);

const BtnOrange = ({ children, onClick }) => (
  <button onClick={onClick} style={{ background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:'13px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:8 }}>
    {children}
  </button>
);

const BtnOutline = ({ children, onClick }) => (
  <button onClick={onClick} style={{ border:'1.5px solid #e0e0e0', background:'#fff', color:'#333', borderRadius:12, padding:'13px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:8 }}>
    {children}
  </button>
);

/* Zone upload photo */
const ZonePhoto = ({ prefilledSrc }) => {
  const [preview, setPreview] = useState(prefilledSrc||null);
  const ref = useRef();
  const onChange = e => { const f=e.target.files[0]; if(f) setPreview(URL.createObjectURL(f)); };
  return (
    <div onClick={()=>ref.current.click()} style={{ width:'100%', aspectRatio:'1/1', borderRadius:16, overflow:'hidden', background:'rgba(255,255,255,0.18)', border:'2px dashed rgba(255,255,255,0.35)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
      {preview
        ? <img src={preview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        : <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'#FF5A00', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(255,90,0,.4)' }}>
              <IcoPlus/>
            </div>
          </div>
      }
      <input ref={ref} type="file" accept="image/*" onChange={onChange} style={{ display:'none' }}/>
    </div>
  );
};

/* Ligne type ticket/stand */
const LigneType = ({ nom, nbr=25, prix='2.000 FCFA', onRemove }) => (
  <div style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:16, marginBottom:10, background:'#fff' }}>
    <span style={{ fontSize:14, color:'#333', flex:1, fontFamily:'Poppins,sans-serif' }}>{nom}</span>
    <span style={{ fontSize:13, color:'#555' }}>Nbr: {nbr}</span>
    <span style={{ fontSize:13, color:'#FF5A00', fontWeight:700 }}>Prix: {prix}</span>
    <div onClick={onRemove} style={{ cursor:'pointer', padding:4 }}><IcoClose/></div>
  </div>
);

/* Ligne candidat élection */
const LigneCandidат = ({ nom, onRemove }) => (
  <div style={{ border:'1.5px solid #e8e8e8', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:14, marginBottom:10, background:'#fff' }}>
    <div style={{ width:36, height:36, borderRadius:'50%', background:'#e0e0e0', flexShrink:0 }}/>
    <span style={{ fontSize:14, color:'#333', flex:1, fontFamily:'Poppins,sans-serif' }}>{nom}</span>
    <div onClick={onRemove} style={{ cursor:'pointer', padding:4 }}><IcoClose/></div>
  </div>
);

/* Section Tickets / Stands avec structure identique */
const SectionBillet = ({ titre, typeLabel, addLabel, icon, isMobile }) => {
  const [actif, setActif]     = useState(true);
  const [types, setTypes]     = useState([
    { id:1, nom: typeLabel==='Type de ticket'?'Etudiant':'Grand',   nbr:25, prix:'2.000 FCFA' },
    { id:2, nom: typeLabel==='Type de ticket'?'Standard':'Moyen',   nbr:25, prix:'2.000 FCFA' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState({ nom:'', description:'', prix:'', quantite:'' });

  const total  = types.reduce((s,t)=>s+t.nbr, 0);
  const remove = id => setTypes(t=>t.filter(x=>x.id!==id));

  const enregistrer = () => {
    if (!form.nom.trim()) return;
    setTypes(t=>[...t, { id:Date.now(), nom:form.nom, nbr:parseInt(form.quantite)||25, prix:`${form.prix||'2.000'} FCFA` }]);
    setForm({ nom:'', description:'', prix:'', quantite:'' });
    setModalOpen(false);
  };

  const modalInput = { background:'transparent', border:'1.5px solid rgba(255,255,255,0.25)', borderRadius:12, padding:'14px 18px', fontSize:14, color:'#fff', fontFamily:'Poppins,sans-serif', outline:'none', width:'100%', boxSizing:'border-box' };

  return (
    <div style={{ marginBottom:36 }}>
      <Toggle label={titre} icon={icon} value={actif} onChange={setActif}/>
      {actif && (
        <div style={{ border:'1.5px solid #e8e8e8', borderRadius:16, padding:24, background:'#fafafa' }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?16:20 }}>
            {/* Gauche */}
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#111', textAlign:'center', marginBottom:14, fontFamily:'Poppins,sans-serif' }}>{typeLabel}</div>
              {types.map(t=><LigneType key={t.id} nom={t.nom} nbr={t.nbr} prix={t.prix} onRemove={()=>remove(t.id)}/>)}
              <BtnOrange onClick={()=>setModalOpen(true)}>{addLabel} <IcoPlus/></BtnOrange>
              <div style={{ fontSize:12.5, color:'#888', marginTop:10, fontFamily:'Poppins,sans-serif' }}>
                Nombre de {titre.toLowerCase()} total : {total}
              </div>
            </div>
            {/* Droite */}
            <div>
              <div style={{ display:'flex', gap:10, marginBottom:12 }}>
                <InputField placeholder="Date de début vente" icon={<IcoCal/>}/>
                <InputField placeholder="Date de fin vente"   icon={<IcoCal/>}/>
              </div>
              <textarea placeholder="Politique de remboursement" style={{ ...inputStyle, height:120, resize:'vertical' }}/>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal sombre "Ajouter un type" ── */}
      {modalOpen && (
        <div
          onClick={()=>setModalOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
        >
          <div
            onClick={e=>e.stopPropagation()}
            style={{ background:'#2d2d2d', borderRadius:20, padding:36, width:'100%', maxWidth:560, boxShadow:'0 20px 60px rgba(0,0,0,.5)' }}
          >
            {/* Titre modal */}
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:18, fontWeight:800, color:'#fff', marginBottom:24, fontFamily:'Poppins,sans-serif' }}>
              {addLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            {/* Champ Nom */}
            <input
              placeholder="Nom"
              value={form.nom}
              onChange={e=>setForm(f=>({...f,nom:e.target.value}))}
              style={{ ...modalInput, marginBottom:14 }}
            />

            {/* Champ Description */}
            <input
              placeholder="Description"
              value={form.description}
              onChange={e=>setForm(f=>({...f,description:e.target.value}))}
              style={{ ...modalInput, marginBottom:14 }}
            />

            {/* Prix + Quantité côte à côte */}
            <div style={{ display:'flex', flexDirection:isMobile?'column':'row', gap:12, marginBottom:28 }}>
              <input
                placeholder="Prix"
                value={form.prix}
                onChange={e=>setForm(f=>({...f,prix:e.target.value}))}
                style={{ ...modalInput }}
              />
              <input
                placeholder="Quantité"
                type="number"
                value={form.quantite}
                onChange={e=>setForm(f=>({...f,quantite:e.target.value}))}
                style={{ ...modalInput }}
              />
            </div>

            {/* Bouton Enregistrer */}
            <button
              onClick={enregistrer}
              style={{ background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:'14px 36px', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', boxShadow:'0 6px 20px rgba(255,90,0,.4)' }}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Section Election */
const SectionElection = () => {
  const [actif, setActif]         = useState(true);
  const [elections, setElections] = useState([{
    id:1,
    titre:'',
    items:[{ id:1, nom:'Irène TANDAMBA' },{ id:2, nom:'Samirah OUATTARA' }],
  }]);

  const addElection = () => setElections(e=>[...e,{ id:Date.now(), titre:'', items:[] }]);
  const addItem = eid => setElections(e=>e.map(el=>el.id===eid?{...el,items:[...el.items,{id:Date.now(),nom:`Candidat ${el.items.length+1}`}]}:el));
  const removeItem = (eid,iid) => setElections(e=>e.map(el=>el.id===eid?{...el,items:el.items.filter(i=>i.id!==iid)}:el));

  return (
    <div style={{ marginBottom:36 }}>
      <Toggle label="Election" icon={<IcoElect/>} value={actif} onChange={setActif}/>
      {actif && elections.map(el=>(
        <div key={el.id} style={{ border:'1.5px solid #e8e8e8', borderRadius:16, padding:24, background:'#fafafa', marginBottom:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?16:20 }}>
            {/* Gauche */}
            <div>
              <div style={{ marginBottom:14 }}>
                <input placeholder="Titre" style={{ ...inputStyle }} defaultValue={el.titre}/>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:'#111', textAlign:'center', marginBottom:12, fontFamily:'Poppins,sans-serif' }}>Items</div>
              {el.items.map(item=>(
                <LigneCandidат key={item.id} nom={item.nom} onRemove={()=>removeItem(el.id,item.id)}/>
              ))}
              <BtnOrange onClick={()=>addItem(el.id)}>Ajouter un item <IcoPlus/></BtnOrange>
              <div style={{ fontSize:12.5, color:'#888', marginTop:10, fontFamily:'Poppins,sans-serif' }}>
                Nombre d'item total : {el.items.length}
              </div>
            </div>
            {/* Droite */}
            <div>
              <div style={{ display:'flex', gap:10, marginBottom:12 }}>
                <InputField placeholder="Date de début vote" icon={<IcoCal/>}/>
                <InputField placeholder="Date de fin vote"   icon={<IcoCal/>}/>
              </div>
              <textarea placeholder="Politique de remboursement" style={{ ...inputStyle, height:120, resize:'vertical' }}/>
            </div>
          </div>
          <div style={{ marginTop:16 }}>
            <BtnOrange onClick={addElection}>Ajouter une élection <IcoPlus/></BtnOrange>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── PAGE PRINCIPALE ── */
const PageModifierEvenement = () => {
  const { isMobile } = useResponsive();

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <NavbarPages/>

      {/* ── BANNIÈRE ORANGE ── */}
      <div style={{ background:'#FF5A00', padding:isMobile?'28px 20px 36px':'32px 80px 44px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.07, backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize:'40px 40px' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:isMobile?16:18, fontWeight:800, color:'#fff', marginBottom:22, position:'relative', zIndex:1 }}>
          Modifier L'évènement <IcoRight/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'repeat(2,1fr)':'repeat(4,1fr)', gap:isMobile?12:20, maxWidth:800, position:'relative', zIndex:1 }}>
          <ZonePhoto prefilledSrc="/evenement1.jpg"/>
          <ZonePhoto/><ZonePhoto/><ZonePhoto/>
        </div>
      </div>

      {/* ── FORMULAIRE ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:isMobile?'28px 16px 40px':'36px 40px 60px' }}>

        {/* Ligne 1 : Titre + Description */}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:20, marginBottom:16 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <input placeholder="Titre de l'évènement" style={inputStyle}/>
            <div style={{ display:'flex', gap:12 }}>
              <InputField placeholder="Date de début" icon={<IcoCal/>}/>
              <InputField placeholder="Date de fin"   icon={<IcoCal/>}/>
            </div>
            <InputField placeholder="Lieu" icon={<IcoPin/>}/>
          </div>
          <textarea placeholder="Description" style={{ ...inputStyle, height:isMobile?160:220, resize:'vertical' }}/>
        </div>

        {/* Ligne 2 : Catégorie / Type + Supports */}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:20, marginBottom:32 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <SelectField label="Catégorie" options={['Concert','Festival','Conférence','Formation','Sport','Culturel']}/>
            <SelectField label="Type"      options={['Gratuit','Payant','Sur invitation']}/>
          </div>
          <textarea placeholder="Supports" style={{ ...inputStyle, height:isMobile?120:160, resize:'vertical' }}/>
        </div>

        {/* ── Sections Tickets / Stands / Election ── */}
        <SectionBillet titre="Tickets" isMobile={isMobile} typeLabel="Type de ticket" addLabel="Ajouter un type de ticket" icon={<IcoTicket/>}/>
        <SectionBillet titre="Stands" isMobile={isMobile}  typeLabel="Type de stand"  addLabel="Ajouter un type de stand"  icon={<IcoStand/>}/>
        <SectionElection/>

        {/* ── Boutons du bas ── */}
        <div style={{ display:'flex', gap:isMobile?8:14, flexWrap:'wrap', marginTop:16 }}>
          <BtnOutline>Enregistrer comme brouillon</BtnOutline>
          <BtnOutline><IcoApercu/> Aperçu</BtnOutline>
          <BtnOutline><IcoStats/> Statistiques</BtnOutline>
          <button style={{ background:'linear-gradient(135deg,#FF5A00,#ff8c00)', color:'#fff', border:'none', borderRadius:12, padding:'13px 32px', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', display:'flex', alignItems:'center', gap:10, boxShadow:'0 6px 20px rgba(255,90,0,.3)', marginLeft:'auto' }}>
            Publier <IcoArrow/>
          </button>
        </div>
      </div>

      <PiedDePage/>
    </div>
  );
};

export default PageModifierEvenement;
