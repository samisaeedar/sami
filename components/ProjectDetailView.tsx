
import React, { useEffect, useState, useMemo } from 'react';
import { optimizeImageUrl } from '../db';
import { 
  MapPin, 
  Calendar, 
  User, 
  Briefcase,
  X,
  Maximize2,
  CheckCircle2,
  Settings,
  ArrowRight,
  Shield,
  Layers,
  Home,
  ArrowLeft
} from 'lucide-react';

interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  location?: string;
  client_name?: string;
  end_date?: string;
  technical_scope?: string[];
  gallery?: string[];
}

interface ProjectDetailViewProps {
  project: Project | null;
  allProjects: Project[];
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, allProjects, onBack, onProjectClick }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return allProjects
      .filter(p => p.category === project.category && p.id !== project.id)
      .slice(0, 3);
  }, [project, allProjects]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImgLoaded(false);
  }, [project]);

  if (!project) return null;

  const stats = [
    { label: 'القطاع', value: project.category || 'هندسة', icon: Briefcase },
    { label: 'الموقع', value: project.location || 'اليمن', icon: MapPin },
    { label: 'العميل', value: project.client_name || 'جهة معتمدة', icon: User },
    { label: 'الإنجاز', value: project.end_date || '2024', icon: Calendar },
  ];

  const technicalScope = project.technical_scope || [
    "تحليل الأحمال وتصميم دوائر التحكم",
    "توريد وتركيب لوحات الـ PLC",
    "برمجة أنظمة المراقبة SCADA",
    "اختبارات الجودة والمعايرة"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] font-['Tajawal'] pb-40 transition-colors duration-500" dir="rtl">
      
      {/* Header Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-slate-500 hover:text-amber-500 transition-all font-black text-xs md:text-sm group"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span>العودة للرئيسية</span>
          </button>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
             PROJECT_REF: {String(project.id).slice(0,8).toUpperCase()}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* Main Project Display */}
        <section className="mb-16">
          <div className="aspect-video w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-3xl relative">
             <img 
               src={optimizeImageUrl(project.image, 1920, 90)} 
               className={`w-full h-full object-cover transition-all duration-[1.5s] ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
               onLoad={() => setImgLoaded(true)}
               alt={project.title}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* Info Hierarchy */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
           <div className="lg:w-2/3 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <Layers className="w-4 h-4 text-amber-500" />
                <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">{project.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 dark:text-white leading-tight tracking-tighter">
                {project.title}
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed border-r-4 border-amber-500 pr-8">
                {project.description}
              </p>
           </div>

           <div className="lg:w-1/3 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-white/5 flex flex-col gap-3 group hover:border-amber-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 dark:border-white/5">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-slate-900 dark:text-white font-black text-xs md:text-sm truncate">{s.value}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Technical & Action */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
           <div className="space-y-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                <div className="w-1.5 h-10 bg-amber-500 rounded-full"></div>
                النطاق الهندسي للمشروع
              </h2>
              <ul className="space-y-6">
                {technicalScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 font-bold text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
           </div>

           <div className="p-12 md:p-16 bg-slate-950 rounded-[3rem] md:rounded-[4rem] border border-white/10 flex flex-col items-center text-center gap-8 relative overflow-hidden group shadow-3xl">
              <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-3xl font-black text-white">هل تبحث عن حل هندسي؟</h3>
                <p className="text-slate-400 font-bold text-base leading-relaxed">نحن جاهزون لتنفيذ مشاريعكم بأعلى معايير الجودة والاعتمادية.</p>
                <button 
                  onClick={() => window.location.hash = '#contact'}
                  className="inline-flex items-center gap-4 bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/20"
                >
                  طلب استشارة فنية
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
           </div>
        </div>

        {/* Related Gallery */}
        {(project.gallery && project.gallery.length > 0) && (
          <section className="mb-32">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-12">التوثيق الميداني</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {project.gallery.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(img)} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-900 cursor-pointer shadow-lg">
                  <img src={optimizeImageUrl(img, 600, 75)} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                    <Maximize2 className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-24 border-t border-slate-100 dark:border-white/5">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-12">مشاريع في نفس القطاع</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <div key={p.id} onClick={() => onProjectClick(p)} className="group cursor-pointer bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 transition-all hover:shadow-2xl">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={optimizeImageUrl(p.image, 600, 70)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white truncate">{p.title}</h3>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-amber-500 transition-colors">
                      <span className="text-xs font-bold">تفاصيل المشروع</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      {activeImg && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           <button onClick={() => setActiveImg(null)} className="absolute top-8 right-8 text-white/40 hover:text-white p-3">
              <X className="w-10 h-10" />
           </button>
           <img src={activeImg} className="max-w-full max-h-full object-contain rounded-3xl shadow-3xl" alt="" />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailView;
