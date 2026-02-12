
import React from 'react';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface WhyUsProps {
  features: Feature[];
}

const WhyUs: React.FC<WhyUsProps> = ({ features }) => {
  const displayFeatures = features && features.length > 0 ? features : [
    { title: "استجابة ميدانية فورية", desc: "فرقنا الهندسية جاهزة للتحرك الفوري لتغطية الأعطال الطارئة في كافة المحافظات على مدار الساعة.", icon: "⚡" },
    { title: "دقة المعايير العالمية", desc: "نطبق أدق بروتوكولات الفحص والقياس باستخدام أجهزة رقمية حديثة تضمن سلامة أصولكم.", icon: "🎯" },
    { title: "حلول تقنية متكاملة", desc: "نحن لا نصلح العطل فحسب، بل نعيد تصميم مسارات الطاقة لرفع الكفاءة وتقليل استهلاك الوقود.", icon: "⚙️" }
  ];

  const techIcons = [
    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 2L3 14h9" className="opacity-40" />
    </svg>,
    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" className="fill-yellow-500/20" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
    </svg>,
    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 00 1.82.33H9a1.65 1.65 0 00 1-1.51V3a2 2 0 012-2 2 2 2 0 0 1 2 2v.09a1.65 1.65 0 00 1 1.51 1.65 1.65 0 00 1.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 00 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ];

  return (
    <div className="font-['Tajawal']" dir="rtl">
      <div className="relative mb-12 md:mb-16 text-right">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-10 md:w-16 bg-yellow-500 shadow-[0_0_8px_#eab308]"></div>
          <span className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Engineering Quality Protocol
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-white tracking-tighter leading-[1.1]">
          لماذا تختار <span className="text-yellow-500 italic">العريقي</span>؟
        </h2>
        
        <p className="mt-6 text-slate-400 text-sm md:text-lg lg:text-xl font-bold max-w-2xl leading-relaxed">
          نحن لا نوفر مجرد صيانة، نحن نبني <span className="text-white">موثوقية تشغيلية</span> مستدامة تضمن استمرارية أعمالكم في أصعب الظروف.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayFeatures.map((f, i) => (
          <div 
            key={i} 
            className="group relative p-8 md:p-10 bg-slate-900/60 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] hover:bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-start h-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500/5 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-500 border border-yellow-500/10 mb-8 group-hover:rotate-6">
                {techIcons[i] || techIcons[0]}
              </div>
              
              <div className="space-y-3 mb-6">
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-yellow-500 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-slate-400 font-bold leading-relaxed opacity-90">
                  {f.desc}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">ID:0{i+1}</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
