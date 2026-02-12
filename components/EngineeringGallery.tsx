
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import { optimizeImageUrl } from '../db';

interface GalleryItem {
  id: string | number;
  image?: string;
  img?: string;
}

interface EngineeringGalleryProps {
  galleryItems: GalleryItem[];
  logoUrl: string;
  onOpenArchive?: () => void;
}

const EngineeringGallery: React.FC<EngineeringGalleryProps> = ({ galleryItems, onOpenArchive }) => {
  const swiperRef = useRef<any>(null);

  const items = (galleryItems || []).map((item, idx) => ({
    ...item,
    displayImage: optimizeImageUrl(item.img || item.image || '', 1920, 85),
    thumb: optimizeImageUrl(item.img || item.image || '', 600, 70),
    idStr: `AREIQI-LOG-${2025 + idx}`,
    title: `توثيق ميداني #${String(item.id).slice(-4)}`,
  }));

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-12 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-['Tajawal']" dir="rtl">
      <div className="max-w-full mx-auto relative">
        <div className="mb-12 px-6 md:px-16 flex flex-col items-start border-r-4 border-yellow-500 pr-6">
          <span className="text-yellow-500 font-black text-[10px] tracking-[0.5em] uppercase opacity-60">Visual_Operations_Log</span>
          <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 dark:text-white leading-none">معرض العمليات</h2>
        </div>

        <div className="relative group perspective-2000">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            speed={800}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay, Keyboard, Mousewheel]}
            className="w-full py-10 overflow-visible"
            breakpoints={{
              320: { slidesPerView: 1.1 },
              768: { slidesPerView: 1.6 },
              1440: { slidesPerView: 2.3 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="px-3 md:px-6 w-[85%] sm:w-[500px] md:w-[700px] lg:w-[900px]">
                <div 
                  className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xl group/card cursor-pointer"
                >
                  <img 
                    src={item.thumb} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[6s] group-hover/card:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 p-6 md:p-10 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] opacity-0 translate-y-6 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                    <p className="text-yellow-500 font-black text-[9px] md:text-[11px] tracking-[0.4em] uppercase mb-1">RECORD: {item.idStr}</p>
                    <h3 className="text-white text-xl md:text-3xl font-black">{item.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-14 pointer-events-none">
            <button onClick={() => swiperRef.current?.slidePrev()} className="pointer-events-auto w-12 h-12 md:w-20 md:h-20 rounded-full bg-slate-950/50 hover:bg-yellow-500 backdrop-blur-xl border border-white/10 text-white hover:text-slate-950 flex items-center justify-center transition-all shadow-xl active:scale-90">
              <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} className="pointer-events-auto w-12 h-12 md:w-20 md:h-20 rounded-full bg-slate-950/50 hover:bg-yellow-500 backdrop-blur-xl border border-white/10 text-white hover:text-slate-950 flex items-center justify-center transition-all shadow-xl active:scale-90">
              <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={onOpenArchive}
            className="group px-12 py-5 bg-slate-950 dark:bg-yellow-500 text-white dark:text-slate-950 rounded-[2rem] font-black text-sm md:text-xl shadow-3xl hover:scale-105 transition-all border border-white/5 flex items-center gap-4"
          >
            <span>استعراض الأرشيف الكامل</span>
            <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet { background: #eab308 !important; opacity: 0.2; height: 6px !important; }
        .swiper-pagination-bullet-active { width: 60px !important; border-radius: 10px !important; opacity: 1 !important; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </section>
  );
};

export default EngineeringGallery;
