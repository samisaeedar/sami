
import React, { useState, useEffect } from 'react';

const MaintenanceROICalculator: React.FC = () => {
  const [downtimeCost, setDowntimeCost] = useState<number>(50); 
  const [breakdowns, setBreakdowns] = useState<number>(4); 
  const [contractCost, setContractCost] = useState<number>(1000); 

  const [annualLoss, setAnnualLoss] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const totalHoursLost = breakdowns * 6;
    const loss = totalHoursLost * downtimeCost;
    const save = loss - contractCost;
    
    setAnnualLoss(loss);
    setSavings(save > 0 ? save : 0);
  }, [downtimeCost, breakdowns, contractCost]);

  return (
    <section className="py-12 bg-slate-950 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">الجدوى الاقتصادية</span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">حاسبة <span className="text-yellow-500">خسائر التوقف</span></h2>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">اكتشف مقدار ما توفره منشأتك عند الالتزام بعقود الصيانة الوقائية الاحترافية.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-black text-sm">تكلفة ساعة التوقف ($)</label>
                  <span className="text-yellow-500 font-mono font-bold">{downtimeCost} $</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10"
                  value={downtimeCost}
                  onChange={(e) => setDowntimeCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-black text-sm">عدد الأعطال المتوقعة سنوياً (بدون صيانة)</label>
                  <span className="text-yellow-500 font-mono font-bold">{breakdowns} أعطال</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="1"
                  value={breakdowns}
                  onChange={(e) => setBreakdowns(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-black text-sm">ميزانية الصيانة السنوية المقترحة ($)</label>
                  <span className="text-emerald-400 font-mono font-bold">{contractCost} $</span>
                </div>
                <input 
                  type="range" min="200" max="5000" step="100"
                  value={contractCost}
                  onChange={(e) => setContractCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-[2.5rem] relative overflow-hidden group transition-all">
              <div className="absolute -right-4 -top-4 text-red-500/10 text-9xl font-black select-none group-hover:scale-110 transition-transform">X</div>
              <p className="text-red-500 font-black text-xs uppercase tracking-widest mb-2">الخسارة السنوية المتوقعة</p>
              <h3 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">{annualLoss.toLocaleString()} <span className="text-2xl">$</span></h3>
              <p className="text-slate-500 text-sm">بناءً على متوسط 6 ساعات إصلاح لكل عطل طارئ.</p>
            </div>

            <div className="bg-emerald-500 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden group transition-all">
              <div className="absolute -right-4 -top-4 text-white/10 text-9xl font-black select-none group-hover:scale-110 transition-transform">✓</div>
              <p className="text-slate-950/60 font-black text-xs uppercase tracking-widest mb-2">صافي التوفير مع "العريقي"</p>
              <h3 className="text-5xl md:text-7xl font-black text-slate-950 mb-2 tracking-tighter">{savings.toLocaleString()} <span className="text-2xl">$</span></h3>
              <p className="text-slate-950/50 text-sm font-bold">هذا المبلغ يمكنك استثماره في تطوير منشأتك بدلاً من إهداره في الإصلاحات.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceROICalculator;
