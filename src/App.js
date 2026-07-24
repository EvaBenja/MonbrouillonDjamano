import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

/* ── Landing page components ── */
import BarreNavigation        from './components/BarreNavigation';
import SectionHero            from './components/SectionHero';
import SectionCestQuoi        from './components/SectionCestQuoi';
import SectionServices        from './components/SectionServices';
import SectionApplication     from './components/SectionApplication';
import SectionIntelligenceArtificielle from './components/SectionIntelligenceArtificielle';
import SectionFAQ             from './components/SectionFAQ';
import SectionTemoignages     from './components/SectionTemoignages';
import SectionConfiance       from './components/SectionConfiance';
import PiedDePage             from './components/PiedDePage';

/* ── Shared layout for inner pages ── */
import NavbarPages            from './composants-communs/NavbarPages';

/* ── Inner pages ── */
import PageEvenements         from './pages/PageEvenements';
import PageDetailEvenement    from './pages/PageDetailEvenement';
import PageExperiences        from './pages/PageExperiences';
import PageDetailExperience   from './pages/PageDetailExperience';
import PageServices           from './pages/PageServices';
import PageDetailService      from './pages/PageDetailService';
import PageProfil             from './pages/PageProfil';
import PageProposerService     from './pages/PageProposerService';
import PageMesEvenements       from './pages/PageMesEvenements';
import PageModifierEvenement   from './pages/PageModifierEvenement';

/* ══ Landing page ══ */
const LandingPage = () => (
  <div>
    <BarreNavigation />
    <div id="accueil"><SectionHero /></div>
    <div id="apropos"><SectionCestQuoi /></div>
    <div id="services"><SectionServices /></div>
    <SectionApplication />
    <div id="ia"><SectionIntelligenceArtificielle /></div>
    <SectionFAQ />
    <SectionTemoignages />
    <SectionConfiance />
    <PiedDePage />
  </div>
);

/* ══ Layout inner pages (avec navbar) ══ */
const AvecNavbar = ({ children }) => (
  <div style={{ minHeight: '100vh', background: '#fff' }}>
    <NavbarPages />
    {children}
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/"                      element={<LandingPage />} />

        {/* Évènements */}
        <Route path="/evenements"            element={<AvecNavbar><PageEvenements /></AvecNavbar>} />
        <Route path="/evenements/:id"        element={<PageDetailEvenement />} />

        {/* Expériences */}
        <Route path="/experiences"           element={<AvecNavbar><PageExperiences /></AvecNavbar>} />
        <Route path="/experiences/:id"       element={<PageDetailExperience />} />

        {/* Services */}
        <Route path="/services"              element={<AvecNavbar><PageServices /></AvecNavbar>} />
        <Route path="/services/:id"          element={<PageDetailService />} />
        <Route path="/profil"               element={<PageProfil />} />
        <Route path="/proposer-service"     element={<PageProposerService />} />
        <Route path="/mes-evenements"       element={<PageMesEvenements />} />
        <Route path="/modifier-evenement/:id" element={<PageModifierEvenement />} />
        <Route path="/creer-evenement"      element={<PageModifierEvenement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
