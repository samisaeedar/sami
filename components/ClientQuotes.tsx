
import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface ClientQuotesProps {
  testimonials: Testimonial[];
}

const ClientQuotes: React.FC<ClientQuotesProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAuto || testimonials.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isAuto, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-950 overflow-hidden relative transition-colors duration-500 font-['Tajawal']" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-lg mb-4 border border-yellow-500/20">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-yellow-500 font-black text-[9px] uppercase tracking-[0.3em]">Customer_Success_Log</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            ثقة <span className="text-yellow-500 italic">شركائنا</span>
          </h2>
        </div>

        <div className="relative group" onMouseEnter={() => setIsAuto(false)} onMouseLeave={() => setIsAuto(true)}>
          {/* Main Slider Container - Fixed Height for Stability */}
          <div className="relative h-[420px] md:h-[380px] w-full max-w-2xl mx-auto">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-sm ${
                  index === current ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10 pointer-events-none translate-x-10'
                }`}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < (t.rating || 5) ? 'text-yellow-500 fill-current' : 'text-slate-700'}`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-base md:text-xl font-bold text-slate-200 mb-8 leading-relaxed italic max-w-lg">
                  "{t.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-xl border border-white/10 group-hover:rotate-3 transition-transform">
                    {t.avatar || '🏢'}
                  </div>
                  <h4 className="text-lg font-black text-white leading-none">{t.name}</h4>
                  <p className="text-yellow-500 font-bold text-[10px] mt-1 uppercase tracking-wider">
                    {t.position} - {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 md:absolute md:top-1/2 md:-translate-y-1/2 md:inset-x-[-80px] md:mt-0">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all active:scale-90 shadow-lg"
              aria-label="Previous Testimonial"
            >
              <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots Indicator for Mobile/Visual feedback */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-6 bg-yellow-500' : 'w-1.5 bg-slate-800 hover:bg-slate-700'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all active:scale-90 shadow-lg"
              aria-label="Next Testimonial"
            >
              <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Corner Brackets for HUD feel */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/5 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/5 opacity-50"></div>
    </section>
  );
};

export default ClientQuotes;
