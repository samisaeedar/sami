
import React, { useState, useMemo, useEffect } from 'react';
import { optimizeImageUrl } from '../db';
import { X, Maximize2, Calendar, FileText, ChevronRight, LayoutGrid, ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string | number;
  image?: string;
  img?: string;
}

interface GalleryArchiveProps {
  galleryItems: GalleryItem[];
  logoUrl: string;
  onBack: () => void;
}

const GalleryArchive: React.FC<GalleryArchiveProps> = ({ galleryItems, logoUrl, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const items = useMemo(() => {
    return (galleryItems || []).map((item, idx) => ({
      ...item,
      full: optimizeImageUrl(item.img || item.image || '', 1920, 85),
      thumb: optimizeImageUrl(item.img || item.image || '', 600, 75),
      idStr: `AREIQI-VIS-${2025 + idx}`,
      title: `توثيق عمليات #${String(item.id).slice(-4)}`,
      timestamp: `2024-0${(idx % 9) + 1}-1${idx % 10}`,
      status: idx % 3 === 0 ? 'معتمد' : 'مكتمل'
    }));
  }, [galleryItems]);

  return (
    <div className="min-h-screen bg-[#020617] font-['Tajawal'] pb-40 relative overflow-hidden" dir="rtl">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '100px 100px' 
        }} 
      />

      {/* Header Section */}
      <header className="relative pt-24 md:pt-32 pb-16 px-6 max-w-7xl mx-auto z-10">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-4 text-slate-500 hover:text-yellow-500 transition-all font-black text-xs md:text-sm mb-12"
        >
          <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-300">
             <ChevronRight className="w-5 h-5" />
          </div>
          <span>العودة للرئيسية</span>
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-r-4 border-yellow-500 pr-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_#eab308]"></span>
                <span className="text-yellow-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">Engineering_Vault_Archive</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-[1000] text-white leading-none tracking-tighter">
                الأرشيف <br /> <span className="text-yellow-500 italic">البصري</span> الكامل
             </h1>
          </div>
          
          <div className="flex items-center gap-4 text-slate-500 font-bold text-sm md:text-lg">
             <LayoutGrid className="text-yellow-500" />
             <span>{items.length} ملف توثيقي متاح</span>
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              className="group relative h-[220px] sm:h-[280px] md:h-[320px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 cursor-pointer hover:border-yellow-500/50 transition-all duration-700 hover:-translate-y-1"
            >
              <img 
                src={item.thumb} 
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                alt="" 
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent opacity-80"></div>
              
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                 <div className="w-10 h-10 rounded-xl bg-yellow-500 text-slate-950 flex items-center justify-center shadow-2xl">
                    <Maximize2 className="w-5 h-5" />
                 </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-right">
                 <h3 className="text-white font-black text-xs md:text-lg leading-none mb-2 group-hover:text-yellow-500 transition-colors truncate">{item.title}</h3>
                 
                 <div className="flex items-center justify-between pt-2 border-t border-white/10 opacity-60">
                    <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] text-slate-400">
                       <Calendar size={10} className="text-yellow-500" />
                       {item.timestamp}
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-500 font-black">
                       <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                       {item.status}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-40 text-center animate-in fade-in duration-1000">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <ImageIcon className="text-slate-700 w-10 h-10" />
             </div>
             <p className="text-slate-500 font-black text-2xl">لا يوجد ملفات توثيق حالياً</p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100000] bg-[#020617]/98 backdrop-blur-3xl flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-6 md:p-10 border-b border-white/5">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2">
                   <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-right">
                   <p className="text-yellow-500 font-black text-[10px] uppercase tracking-widest">Document_View_Mode</p>
                   <h2 className="text-white font-black text-xl md:text-2xl">{selectedImage.idStr}</h2>
                </div>
             </div>
             <button onClick={() => setSelectedImage(null)} className="group w-14 h-14 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl flex items-center justify-center transition-all shadow-2xl active:scale-95">
                <X className="w-8 h-8" />
             </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
             <img src={selectedImage.full} className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryArchive;
