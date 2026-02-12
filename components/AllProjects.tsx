
import React, { useState, useMemo, useEffect } from 'react';

interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface AllProjectsProps {
  projects: Project[];
  onBack: () => void;
  onProjectClick?: (project: Project) => void;
}

const CategoryIcons: Record<string, React.ReactNode> = {
  "الكل": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h7" /></svg>,
  "طاقة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  "أتمتة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  // Fix: Corrected broken SVG path for the maintenance (صيانة) icon
  "صيانة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
  "لوحة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>,
  "projects": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><path d="M16 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2" /></svg>
};

const CATEGORIES = [
  { id: "الكل", label: "كافة القطاعات" },
  { id: "طاقة", label: "الطاقة والتوليد" },
  { id: "أتمتة", label: "الأتمتة والتحكم" },
  { id: "صيانة", label: "حلول الصيانة" },
  { id: "لوحة", label: "تصنيع اللوحات" },
  { id: "projects", label: "مشاريع متنوعة" }
];

const AllProjects: React.FC<AllProjectsProps> = ({ projects, onBack, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure the page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filtered = useMemo(() => {
    return (projects || []).filter(p => {
      const matchCat = activeCategory === "الكل" || (p.category && (p.category.includes(activeCategory) || (activeCategory === "projects" && !["طاقة", "أتمتة", "صيانة", "لوحة"].some(c => p.category.includes(c)))));
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-['Tajawal'] pb-40 relative" dir="rtl">
      
      {/* 1. Industrial Header */}
      <div className="relative pt-24 md:pt-32 pb-16 overflow-hidden bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-4 text-slate-400 hover:text-yellow-500 transition-all font-black text-xs md:text-sm mb-12"
          >
            <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-300">
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </div>
            <span>الرجوع إلى المركز الرئيسي</span>
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></span>
                  <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">Asset Archive v4.2</span>
               </div>
               <h1 className="text-6xl md:text-9xl font-[1000] text-slate-900 dark:text-white leading-[0.8] tracking-tighter">
                  أرشيف <br /> <span className="text-yellow-500 italic">المشاريع</span>
               </h1>
            </div>
          </div>
        </div>
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* 2. THE STATIC CONTROL BAR - Flows with the page content */}
      <div className="relative z-[20] bg-white dark:bg-[#020617] border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Engine Interface */}
          <div className="w-full lg:flex-1 relative group">
             <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-yellow-500 transition-colors">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             </div>
             <input 
               type="text" 
               placeholder="ابحث عن مشروع، تقنية، أو مدينة..." 
               className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 pr-10 text-slate-900 dark:text-white outline-none focus:border-yellow-500/50 transition-all font-bold text-xs"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>

          {/* Technical Categories Selector */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar w-full lg:w-auto scroll-smooth">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all border whitespace-nowrap flex items-center gap-2 active:scale-95 ${
                  activeCategory === cat.id 
                  ? 'bg-yellow-500 border-yellow-500 text-slate-950 shadow-lg' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-yellow-500/40'
                }`}
              >
                <div className={`${activeCategory === cat.id ? 'text-slate-950' : 'text-yellow-500'}`}>
                  {CategoryIcons[cat.id]}
                </div>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Immersive Project Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-[10]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filtered.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-[400px] md:h-[550px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-md hover:shadow-2xl transition-all duration-700"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 flex flex-col items-start gap-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                   <span className="text-yellow-500 font-black text-[9px] uppercase tracking-widest">{project.category}</span>
                </div>
                <h3 className="text-xl md:text-3xl font-[1000] text-white leading-tight mb-4 group-hover:text-yellow-500 transition-colors">
                  {project.title}
                </h3>
                
                <button 
                  onClick={() => onProjectClick?.(project)}
                  className="inline-flex items-center gap-4 px-8 py-4 bg-white text-slate-950 rounded-2xl font-[1000] text-[10px] transition-all hover:bg-yellow-500 active:scale-95 shadow-xl"
                >
                  <span>استعراض المواصفات الهندسية</span>
                  <div className="w-5 h-5 bg-slate-950/5 rounded-lg flex items-center justify-center text-slate-950">
                    <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-60 text-center animate-in fade-in zoom-in duration-700">
             <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-200 dark:border-white/10">
                <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
             </div>
             <p className="text-slate-400 font-black text-3xl md:text-4xl tracking-tight mb-6">لا يوجد سجلات تطابق طلبك حالياً</p>
             <button 
              onClick={() => {setActiveCategory("الكل"); setSearchQuery("");}}
              className="text-yellow-500 font-black text-sm md:text-lg hover:underline underline-offset-[12px] decoration-2"
             >
               إعادة تعيين مصفوفة البحث
             </button>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AllProjects;
