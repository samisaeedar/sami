
import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // إظهار الزر بعد تمرير 400 بكسل
      setIsVisible(scrolled > 400);

      if (scrollHeight > 0) {
        const scrollPercent = (scrolled / scrollHeight) * 100;
        setProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // تشغيل الدالة مرة واحدة عند التحميل للتأكد من الحالة
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const size = 60;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth - 5; // تعويض للمساحة الخارجية
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-8 right-8 z-[5000] transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      dir="ltr"
    >
      <div className="relative flex items-center justify-center group">
        
        {/* توهج خلفي نابض */}
        <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* زوايا HUD هندسية */}
        <div className="absolute -inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
           <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500"></div>
           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500"></div>
           <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-500"></div>
           <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500"></div>
        </div>

        {/* دائرة التقدم البرمجية */}
        <svg
          width={size}
          height={size}
          className="absolute -rotate-90 transform z-0"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200 dark:text-white/10"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#eab308"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-200 ease-out shadow-[0_0_10px_#eab308]"
          />
        </svg>

        {/* الزر الرئيسي */}
        <button
          onClick={scrollToTop}
          className="relative z-10 w-12 h-12 bg-slate-950 text-yellow-500 border border-white/10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-slate-950 active:scale-90"
          aria-label="العودة للأعلى"
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:-translate-y-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          
          {/* نص صغير HUD يظهر عند التحويم */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-yellow-500 text-[8px] font-black px-2 py-1 rounded border border-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase">
            UP_LINK
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
