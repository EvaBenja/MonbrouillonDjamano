import React from 'react';
import './index.css';
import BarreNavigation from './components/BarreNavigation';
import SectionHero from './components/SectionHero';
import SectionCestQuoi from './components/SectionCestQuoi';
import SectionServices from './components/SectionServices';
import SectionApplication from './components/SectionApplication';
import SectionIntelligenceArtificielle from './components/SectionIntelligenceArtificielle';
import SectionFAQ from './components/SectionFAQ';
import SectionTemoignages from './components/SectionTemoignages';
import SectionConfiance from './components/SectionConfiance';
import PiedDePage from './components/PiedDePage';

function App() {
  return (
    <div>
      <BarreNavigation />
      <SectionHero />
      <SectionCestQuoi />
      <SectionServices />
      <SectionApplication />
      <SectionIntelligenceArtificielle />
      <SectionFAQ />
      <SectionTemoignages />
      <SectionConfiance />
      <PiedDePage />
    </div>
  );
}

export default App;
