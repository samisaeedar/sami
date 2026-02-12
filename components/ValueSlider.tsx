
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ValueSlide {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

interface ValueSliderProps {
  values: ValueSlide[];
}

const ValueSlider: React.FC<ValueSliderProps> = ({ values }) => {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (values.length === 0) return;
    setCurrent((prev) => (prev + 1) % values.length);
  }, [values.length]);

  const prevSlide = useCallback(() => {
    if (values.length === 0) return;
    setCurrent((prev) => (prev - 1 + values.length) % values.length);
  }, [values.length]);

  useEffect(() => {
    if (values.length <= 1) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, values.length]);

  const handleDragEnd = (e: any) => {
    if (dragStartX.current === null) return;
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const diff = dragStartX.current - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    dragStartX.current = null;
  };

  if (!values || values.length === 0) return null;

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 transition-colors duration-500 select-none overflow-hidden" dir="rtl">
      <div 
        className="max-w-7xl mx-auto relative h-[500px] md:h-[700px] rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] group cursor-grab active:cursor-grabbing border-4 border-slate-100 dark:border-white/5"
        onMouseDown={e => dragStartX.current = e.clientX}
        onMouseUp={handleDragEnd}
        onTouchStart={e => dragStartX.current = e.touches[0].clientX}
        onTouchEnd={handleDragEnd}
      >
        {values.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-slate-950">
              <img 
                src={slide.image} 
                className={`w-full h-full object-cover opacity-70 transition-transform duration-[20s] ease-linear ${index === current ? 'scale-110' : 'scale-100'}`} 
                alt={slide.title} 
              />
              
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(rgba(234,179,8,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent"></div>

              {/* خط المسح الليزري المنبثق */}
              <div className="absolute inset-0 w-full h-[1px] bg-yellow-500 shadow-[0_0_20px_#eab308] opacity-20 animate-slide-scan z-30"></div>
            </div>

            <div className="relative h-full flex flex-col items-start justify-end p-8 sm:p-16 md:p-24 z-20 pointer-events-none text-right">
              <div className="mb-6 overflow-hidden">
                <span className={`inline-block px-6 py-2 bg-yellow-500 text-slate-950 text-xs md:text-sm font-[1000] rounded-full uppercase tracking-[0.4em] transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  {slide.tag}
                </span>
              </div>
              
              <h2 className={`text-4xl sm:text-6xl md:text-8xl font-[1000] text-white mb-6 leading-[0.9] tracking-tighter transition-all duration-700 delay-500 ${index === current ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'text-yellow-500 block' : 'block'}>{word}</span>
                ))}
              </h2>
              
              <div className={`max-w-2xl border-r-4 border-yellow-500 pr-6 transition-all duration-700 delay-700 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-slate-200 text-lg md:text-2xl font-bold leading-relaxed drop-shadow-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
          <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-slate-950 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
          </button>
          
          <div className="flex gap-2">
            {values.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrent(index)} 
                className={`h-2 rounded-full transition-all duration-500 ${index === current ? 'w-16 bg-yellow-500' : 'w-4 bg-white/20 hover:bg-white/40'}`} 
              />
            ))}
          </div>

          <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-slate-950 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-slide-scan {
          animation: slide-scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ValueSlider;
