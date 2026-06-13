import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return { isMobile: w <= 600, isTablet: w <= 900, width: w };
};

export default useResponsive;
