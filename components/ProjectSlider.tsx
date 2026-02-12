
import React, { useState, useEffect } from 'react';
// Use db instead of supabase as the engine uses IndexedDB (db.ts)
import { db } from '../db';

const ProjectSlider: React.FC = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  // جلب البيانات مرة واحدة فقط
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fix: Use db.getItems('projects') instead of the non-existent supabase.getItems()
        const data = await db.getItems('projects');
        if (data && Array.isArray(data) && data.length > 0) {
          setSlides(data.slice(0, 5)); // نكتفي بأحدث 5 مشاريع للأداء
        }
      } catch (e) {
        console.error("Error loading slider data");
      }
    };
    fetchProjects();
  }, []);

  // مؤقت التنقل التلقائي البسيط (خفيف جداً على المتصفح)
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // كل 6 ثواني
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNav = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  if (!slides || slides.length === 0) return null;
  const project = slides[current];
  if (!project) return null;

  return (
    <section className="relative h-[85vh] min-h-[600px] bg-slate-950 overflow-hidden font-['Tajawal']" dir="rtl">
       
       {/* الخلفيات - استخدام Opacity للتنقل السلس جداً */}
       {slides.map((slide, index) => (
         <div 
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
         >
            {/* طبقات التظليل لقراءة النص بوضوح */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/20 to-transparent z-10" />
            
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear will-change-transform ${index === current ? 'scale-110' : 'scale-100'}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
         </div>
       ))}

       {/* المحتوى النصي */}
       <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 items-end pb-24 md:pb-32">
             
             {/* كتلة النص */}
             <div>
                {/* مفتاح current يعيد تشغيل الأنيميشن عند تغيير الشريحة */}
                <div key={current} className="animate-in slide-in-from-right-8 fade-in duration-700 fill-mode-forwards">
                    
                    {/* التصنيف */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md rounded-full text-yellow-500 text-xs font-bold mb-6">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                        {project.category || 'مشاريع العريقي'}
                    </div>
                    
                    {/* العنوان */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl">
                       {project.title}
                    </h1>
                    
                    {/* الوصف */}
                    <p className="text-slate-300 text-lg leading-relaxed max-w-xl mb-10 border-r-4 border-yellow-500 pr-6 font-medium">
                       {project.description || 'تنفيذ هندسي دقيق بأعلى معايير الجودة العالمية، نضمن لكم الكفاءة والاستدامة.'}
                    </p>

                    {/* الأزرار */}
                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-4 rounded-xl font-black transition-transform active:scale-95 shadow-lg shadow-yellow-500/20 flex items-center gap-2 group">
                           <span>اطلب عرض سعر</span>
                           <svg className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                        <a href="#portfolio" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-colors border border-white/10">
                           استعرض المعرض
                        </a>
                    </div>
                </div>
             </div>

             {/* أدوات التحكم (يسار الشاشة) */}
             <div className="flex flex-col items-end justify-end gap-8">
                
                {/* أزرار التنقل */}
                <div className="flex gap-4">
                   <button 
                      onClick={() => handleNav('prev')} 
                      className="w-14 h-14 rounded-full border border-white/20 text-white hover:bg-white hover:text-slate-950 flex items-center justify-center transition-all backdrop-blur-sm group active:scale-90"
                      aria-label="السابق"
                   >
                      <svg className="w-6 h-6 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
                   </button>
                   <button 
                      onClick={() => handleNav('next')} 
                      className="w-14 h-14 rounded-full bg-yellow-500 text-slate-950 hover:bg-white hover:text-slate-950 flex items-center justify-center transition-all shadow-lg shadow-yellow-500/20 group active:scale-90"
                      aria-label="التالي"
                   >
                       <svg className="w-6 h-6 rtl:rotate-180 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                   </button>
                </div>

                {/* مؤشرات التقدم (Dots) */}
                <div className="flex gap-2 p-2 bg-black/20 backdrop-blur-md rounded-full">
                   {slides.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === current ? 'w-8 bg-yellow-500' : 'w-2 bg-white/30 hover:bg-white/60'}`} 
                        aria-label={`الذهاب للشريحة ${idx + 1}`}
                      />
                   ))}
                </div>
             </div>
          </div>
       </div>

       {/* زخرفة بسيطة */}
       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default ProjectSlider;
