
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      setScrollWidth(percent);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1.5 z-[2000] bg-yellow-500 shadow-[0_2px_15px_rgba(234,179,8,0.6)] transition-all duration-100 ease-out" 
      style={{ width: `${scrollWidth}%` }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-[20px] bg-white/50 blur-[5px] translate-x-1/2"></div>
    </div>
  );
};

export default ScrollProgress;
