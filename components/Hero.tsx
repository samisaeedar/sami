
import React, { useEffect, useRef, memo } from 'react';
import { optimizeImageUrl } from '../db';

interface HeroProps {
  heroImageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ heroImageUrl }) => {
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth > 1024 && meshRef.current) {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            meshRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#020617] font-['Tajawal']" dir="rtl">
      
      {heroImageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none gpu">
          <img 
            src={optimizeImageUrl(heroImageUrl, 1200, 70)} 
            alt="Hero" 
            loading="eager"
            className="w-full h-full object-cover opacity-15 dark:opacity-20 blur-[1px] scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-white dark:from-[#020617]/95 dark:via-[#020617]/30 dark:to-[#020617]" />
        </div>
      )}

      {/* Optimized Grid Pattern */}
      <div 
        ref={meshRef}
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none hidden lg:block text-slate-900 dark:text-white gpu" 
        style={{ 
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} 
      />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-16 pb-20">
        
        <div className="mb-6 opacity-0 animate-[fadeUp_0.25s_ease-out_forwards]">
          <div className="px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 flex items-center gap-2 backdrop-blur-md">
            <span className="text-yellow-600 dark:text-yellow-500 text-[10px] font-black tracking-widest uppercase">
              الريادة في الهندسة الميكاترونية
            </span>
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        <div className="flex flex-col items-center mb-10 select-none w-full">
          <h1 className="flex flex-col items-center font-[900] leading-[1.1] tracking-tighter uppercase w-full">
            <div className="overflow-hidden mb-1 w-full">
              <span className="opacity-0 translate-y-3 inline-block text-[11vw] sm:text-7xl lg:text-8xl animate-[reveal_0.3s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] gpu">
                <span className="text-slate-900 dark:text-white">نصنع</span> <span className="text-[#eab308]">القوة</span>
              </span>
            </div>
            <div className="overflow-hidden mb-1 w-full">
              <span className="opacity-0 translate-y-3 inline-block text-[13vw] sm:text-8xl lg:text-9xl text-slate-900 dark:text-white animate-[reveal_0.3s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] gpu">
                نهندس
              </span>
            </div>
            <div className="overflow-hidden w-full">
              <span className="opacity-0 translate-y-3 inline-block text-[11vw] sm:text-7xl lg:text-8xl outline-text italic animate-[reveal_0.3s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] gpu text-yellow-500/60 dark:text-yellow-500/40">
                المستقبل
              </span>
            </div>
          </h1>
        </div>

        <div className="max-w-2xl mb-10 opacity-0 animate-[fadeUp_0.3s_ease-out_0.4s_forwards] px-4">
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-bold leading-relaxed">
            حلول هندسية متكاملة تبدأ من لوحات الـ PLC وتصل لأضخم محطات التوليد. 
            <span className="text-slate-950 dark:text-white font-black block mt-1">العريقي.. حيث تلتقي الخبرة الميدانية بالابتكار.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[280px] sm:max-w-none justify-center opacity-0 animate-[fadeUp_0.3s_ease-out_0.5s_forwards]">
          <a href="#contact" className="bg-[#eab308] text-slate-950 h-12 px-8 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.03] transition-transform w-full sm:w-auto border-2 border-white ring-1 ring-white/10">
             <span>اطلب استشارة فنية</span>
          </a>
          <a href="#specializations" className="bg-slate-900/5 dark:bg-white/5 border-2 border-white text-slate-900 dark:text-white h-12 px-8 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-white/10 w-full sm:w-auto group/btn">
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>استكشف خدماتنا</span>
          </a>
        </div>
      </div>

      <style>{`
        .outline-text { 
          -webkit-text-stroke: 1px currentColor; 
          color: transparent;
        }
        @media (min-width: 768px) { 
          .outline-text { -webkit-text-stroke: 1.5px currentColor; } 
        }
      `}</style>
    </section>
  );
};

export default memo(Hero);
