
import React from 'react';

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode, detail: string, color: string }> = ({ label, value, icon, detail, color }) => (
  <div className="relative group p-6 md:p-10 bg-slate-900/60 border border-white/10 rounded-[2rem] md:rounded-[3rem] transition-all duration-700 hover:bg-slate-900 hover:border-yellow-500/20 overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col items-center md:items-start text-center md:text-right">
    
    {/* Background Tech Pattern */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" 
      style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
    />

    <div className="relative z-10 w-full">
      {/* Decorative Icon Container */}
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 ${color} bg-slate-800/80 mx-auto md:mx-0`}>
        {icon}
      </div>
      
      <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
        <span className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none group-hover:text-yellow-500 transition-colors">
          {value}
        </span>
      </div>
      
      <h4 className="text-[10px] md:text-xs font-black text-yellow-500 uppercase tracking-[0.3em] mb-3 md:mb-4">{label}</h4>

      <p className="text-slate-400 text-[11px] md:text-sm font-bold leading-relaxed max-w-[240px] md:max-w-none opacity-90 group-hover:opacity-100 transition-opacity">
        {detail}
      </p>

      {/* Progress Decoration */}
      <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full w-0 group-hover:w-full transition-all duration-[1.5s] ease-out ${color.replace('text-', 'bg-')}`}></div>
      </div>
    </div>
    
    {/* Corner Decorative HUD Icons */}
    <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/10 rounded-tl-[2rem] group-hover:border-yellow-500/30 transition-colors"></div>
    <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/5 rounded-full group-hover:bg-yellow-500/20 transition-colors"></div>
  </div>
);

const Testimonials: React.FC<{ partners: any[] }> = ({ partners }) => {
  return (
    <section id="statistics" className="relative py-16 md:py-32 bg-slate-950 overflow-hidden font-['Tajawal'] transition-colors duration-500" dir="rtl">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
              <span className="text-yellow-500 font-black tracking-[0.3em] text-[9px] uppercase">قوة الأداء الهندسي</span>
           </div>
           <h2 className="text-3xl md:text-6xl font-black text-white leading-tight tracking-tighter">
             إنجازاتنا <span className="text-yellow-500 italic">في أرقام</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
           <StatCard 
            label="المنشآت المخدومة" 
            value="200+" 
            color="text-yellow-500"
            detail="منشأة صناعية وبنكية حيوية نخدمها بعقود صيانة دورية معتمدة على مدار الساعة."
            icon={<svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>} 
           />
           <StatCard 
            label="المشاريع المنفذة" 
            value="500+" 
            color="text-blue-500"
            detail="مشروع هندسي متكامل من التصميم البرمجي وحتى التشغيل النهائي الفعلي."
            icon={<svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} 
           />
           <StatCard 
            label="نسبة الاعتمادية" 
            value="99%" 
            color="text-emerald-500"
            detail="نسبة جهوزية الأنظمة تحت إشرافنا المباشر في أصعب الظروف التشغيلية."
            icon={<svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} 
           />
        </div>
        
        <div className="mt-16 md:mt-24 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-12 opacity-30 hover:opacity-100 transition-opacity duration-1000">
           {["ISO 9001", "CAT CERTIFIED", "PERKINS AUTHORIZED", "IEC STANDARDS"].map((item) => (
             <span key={item} className="text-[9px] md:text-[11px] font-black text-white tracking-[0.3em]">{item}</span>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
