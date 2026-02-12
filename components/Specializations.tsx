import React, { useState, useEffect, memo } from 'react';
import { IndustrialIcons } from './Icons';
import { db } from '../db';

const Specializations: React.FC = () => {
  const [specs, setSpecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchSpecs = async () => {
      try {
        const data = await db.getSpecializations();
        if (active) {
          setSpecs(data);
          setLoading(false);
        }
      } catch (err) {
        if (active) setLoading(false);
      }
    };
    fetchSpecs();
    return () => { active = false; };
  }, []);

  if (loading && specs.length === 0) return (
    <div className="py-20 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 relative z-10 font-['Tajawal'] gpu" dir="rtl">
      <div className="mb-10 md:mb-16 text-right space-y-3">
         <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-yellow-500"></span>
            <span className="text-[9px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-widest">Engineering Divisions</span>
         </div>
         <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
           قطاعات <span className="text-yellow-500 italic">هندسية</span> دقيقة
         </h2>
         <p className="text-slate-500 dark:text-slate-400 text-xs md:text-base font-bold max-w-xl">
           حلول تشغيلية مصممة بمعايير صناعية صارمة لضمان أعلى مستويات الأداء الميداني.
         </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {specs.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col p-6 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-500/30 gpu"
          >
            <div className="relative mb-6">
                <div className="w-14 h-14 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/10 rounded-xl flex items-center justify-center text-yellow-500 transition-all group-hover:bg-yellow-500 group-hover:text-slate-950 shadow-sm">
                    {IndustrialIcons[item.icon] ? React.createElement(IndustrialIcons[item.icon], { className: "w-7 h-7" }) : <span>⚙️</span>}
                </div>
            </div>

            <div className="flex-1 text-right">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">{item.unit || 'UNIT_X'}</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed opacity-90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Specializations);