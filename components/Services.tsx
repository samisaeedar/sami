
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { IndustrialIcons } from './Icons';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  long_description: string;
  features: string;
  icon: string;
  category: string;
  extra_info?: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4.2);
  const [isPaused, setIsPaused] = useState(false);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  
  const dragStartX = useRef<number | null>(null);
  const [displayOffset, setDisplayOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1.4);
      else if (window.innerWidth < 1024) setItemsToShow(2.8);
      else if (window.innerWidth < 1536) setItemsToShow(4.2);
      else setItemsToShow(5.2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - Math.floor(itemsToShow));

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || activeService || services.length <= itemsToShow) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused, activeService, services.length, itemsToShow]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (activeService) return;
    setIsPaused(true);
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStartX.current = x;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = (x - dragStartX.current) * 0.8; 
    setDisplayOffset(diff);
  };

  const handleDragEnd = () => {
    if (dragStartX.current === null) return;
    if (displayOffset > 100) prev();
    else if (displayOffset < -100) next();
    dragStartX.current = null;
    setDisplayOffset(0);
    setTimeout(() => setIsPaused(false), 1500);
  };

  const renderIcon = (iconName: string, className: string = "w-8 h-8") => {
    if (IndustrialIcons[iconName]) {
      return React.createElement(IndustrialIcons[iconName], { className });
    }
    return <span className="text-xl md:text-3xl">{iconName || '🛠️'}</span>;
  };

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden text-right relative" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>
              حلول هندسية متخصصة
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
              نطاق <span className="text-yellow-500 italic block md:inline">خبراتنا</span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 self-end md:self-auto" dir="ltr">
            <button 
              onClick={prev} 
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-100 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-slate-950 hover:border-white/20 transition-all active:scale-90 shadow-lg group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={next} 
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-100 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-slate-950 hover:border-white/20 transition-all active:scale-90 shadow-lg group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Fixed: corrected setisPaused(false) to setIsPaused(false) on line 123 */}
        <div className="relative overflow-visible cursor-grab active:cursor-grabbing" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd}>
          <div className={`flex transition-transform ${displayOffset === 0 ? 'duration-1000 cubic-bezier(0.16, 1, 0.3, 1)' : 'duration-0'}`} style={{ transform: `translate3d(calc(${currentIndex * (100 / itemsToShow)}% + ${displayOffset}px), 0, 0)` }}>
            {services.map((service) => (
              <div key={service.id} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${100 / itemsToShow}%` }}>
                <div 
                  onClick={() => Math.abs(displayOffset) < 5 && setActiveService(service)} 
                  className="bg-slate-50 dark:bg-slate-900/30 aspect-[3/4.2] rounded-[2rem] md:rounded-[3rem] border border-slate-100 dark:border-white/5 group hover:bg-white dark:hover:bg-slate-900 hover:border-yellow-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-700 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden p-6 md:p-8"
                >
                  {/* Background Number */}
                  <span className="absolute top-6 right-6 text-5xl md:text-7xl font-black text-slate-200 dark:text-white/[0.02] pointer-events-none transition-colors group-hover:text-yellow-500/5">0{services.indexOf(service) + 1}</span>

                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 shadow-xl group-hover:bg-yellow-500 transition-all duration-700 group-hover:rotate-12 text-yellow-500 group-hover:text-slate-950 border border-slate-100 dark:border-white/5 group-hover:border-transparent">
                    {renderIcon(service.icon, "w-8 h-8 md:w-12 md:h-12")}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-[1000] text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed line-clamp-4 px-2">
                    {service.description}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                     <span className="inline-flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                       المواصفات 
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M11 19l-7-7 7-7"/></svg>
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
