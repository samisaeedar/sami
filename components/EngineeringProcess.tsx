
import React from 'react';

interface Step {
  n: string;
  t: string;
  d: string;
  icon: string;
}

interface EngineeringProcessProps {
  steps: Step[];
}

const EngineeringProcess: React.FC<EngineeringProcessProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="font-['Tajawal']" dir="rtl">
      <div className="text-center mb-10">
        <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[9px] mb-2 block">Our Methodology</span>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          مسـار <span className="text-yellow-500">الجـودة</span> الهندسـية
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-3xl border border-white/10 flex items-center justify-center text-2xl md:text-3xl shadow-md group-hover:border-yellow-500 transition-all mb-4 relative">
              {s.icon || '⚙️'}
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-slate-950 font-black text-[9px]">{i+1}</span>
            </div>
            <h3 className="text-sm font-black text-white mb-2">{s.t}</h3>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed line-clamp-2">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineeringProcess;
