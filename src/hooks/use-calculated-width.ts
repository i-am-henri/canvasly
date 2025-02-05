'use client';

import { useEffect, useState } from 'react';

function useCalculatedWidth() {
  const calculateWidth = () => {
    const screenWidth = window.innerWidth;
    const baseOffset = screenWidth < 1024 ? 0 : 200;
    return screenWidth - baseOffset - 32;
  };

  const [width, setWidth] = useState(calculateWidth);

  useEffect(() => {
    const handleResize = () => setWidth(calculateWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useCalculatedWidth;
