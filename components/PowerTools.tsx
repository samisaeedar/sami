
import React, { useState } from 'react';

const PowerTools: React.FC = () => {
  const [kva, setKva] = useState<number>(100);
  const [load, setLoad] = useState<number>(75);

  const kw = (kva * 0.8).toFixed(1);
  const fuelEst = (kva * 0.22 * (load / 100)).toFixed(1); 

  // Calculate percentages for tooltip positioning
  const kvaPercent = ((kva - 10) / (2000 - 10)) * 100;
  const loadPercent = ((load - 10) / (100 - 10)) * 100;

  return (
    <section id="tools" className="py-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">المختبر الرقمي</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">أدوات <span className="text-yellow-500">التقدير الهندسي</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">أدوات مساعدة لتقدير احتياجات منشأتك من الطاقة واستهلاك الوقود بشكل تقريبي.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tool 01: KVA to KW */}
          <div className="bg-white dark:bg-slate-950 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500 opacity-20"></div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-sm">01</span>
               محول القدرة (KVA ⇄ KW)
            </h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-400">القدرة الظاهرة (KVA)</label>
                  <span className="text-yellow-500 font-mono font-bold text-xl">{kva} KVA</span>
                </div>
                
                <div className="relative pt-6">
                  {/* Floating Tooltip */}
                  <div 
                    className="absolute -top-4 px-2 py-1 bg-yellow-500 text-slate-950 text-[10px] font-black rounded-md shadow-lg transition-all duration-150 pointer-events-none transform -translate-x-1/2 whitespace-nowrap z-20"
                    style={{ left: `${kvaPercent}%`, right: 'auto' }}
                  >
                    {kva} KVA
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-yellow-500"></div>
                  </div>
                  
                  <input 
                    type="range" min="10" max="2000" step="10"
                    value={kva}
                    onChange={(e) => setKva(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">القدرة الفعلية (معامل قدرة 0.8)</p>
                 <p className="text-4xl font-black text-slate-900 dark:text-white">{kw} <span className="text-lg text-yellow-500">KW</span></p>
              </div>
            </div>
          </div>

          {/* Tool 02: Fuel Consumption */}
          <div className="bg-white dark:bg-slate-950 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 opacity-20"></div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">02</span>
               تقدير استهلاك الوقود
            </h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-400">معدل الحمل الحالي (%)</label>
                  <span className="text-blue-500 font-mono font-bold text-xl">{load}%</span>
                </div>
                
                <div className="relative pt-6">
                  {/* Floating Tooltip */}
                  <div 
                    className="absolute -top-4 px-2 py-1 bg-blue-500 text-white text-[10px] font-black rounded-md shadow-lg transition-all duration-150 pointer-events-none transform -translate-x-1/2 whitespace-nowrap z-20"
                    style={{ left: `${loadPercent}%`, right: 'auto' }}
                  >
                    {load}%
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-500"></div>
                  </div>

                  <input 
                    type="range" min="10" max="100" step="5"
                    value={load}
                    onChange={(e) => setLoad(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">الاستهلاك التقديري (لتر/ساعة)</p>
                 <p className="text-4xl font-black text-slate-900 dark:text-white">{fuelEst} <span className="text-lg text-blue-500">L/h</span></p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10 text-[10px] text-slate-400 font-bold">* هذه الأرقام تقديرية وقد تختلف بناءً على نوع المحرك وحالته الميكانيكية والظروف البيئية.</p>
      </div>
    </section>
  );
};

export default PowerTools;
