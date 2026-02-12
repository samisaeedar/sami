
import React, { useState, useEffect } from 'react';

const GeneratorScheduleCalculator: React.FC = () => {
  const [interval, setInterval] = useState<number>(250);
  const [currentHours, setCurrentHours] = useState<number>(1200);
  const [lastServiceHours, setLastServiceHours] = useState<number>(1000);
  const [dailyUsage, setDailyUsage] = useState<number>(8);

  const [hoursSinceLast, setHoursSinceLast] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [daysToService, setDaysToService] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const used = currentHours - lastServiceHours;
    const sinceLast = used > 0 ? used : 0;
    const remaining = interval - sinceLast;
    const finalRemaining = remaining > 0 ? remaining : 0;
    
    setHoursSinceLast(sinceLast);
    setRemainingHours(finalRemaining);
    setDaysToService(dailyUsage > 0 ? Math.ceil(finalRemaining / dailyUsage) : 0);
    
    const pct = (sinceLast / interval) * 100;
    setPercentage(Math.min(pct, 100));
  }, [interval, currentHours, lastServiceHours, dailyUsage]);

  const getStatusColor = () => {
    if (percentage > 90) return 'text-rose-500';
    if (percentage > 70) return 'text-yellow-500';
    return 'text-emerald-500';
  };

  const getProgressColor = () => {
    if (percentage > 90) return 'bg-rose-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const nextServiceDate = new Date();
  nextServiceDate.setDate(nextServiceDate.getDate() + daysToService);

  return (
    <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group font-['Tajawal'] text-right" dir="rtl">
      <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 opacity-20"></div>
      
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
         <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm">03</span>
         حاسبة المواعيد الدورية للخدمة
      </h3>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 pr-2 uppercase tracking-widest">فترة تبديل الزيت (ساعة)</label>
            <div className="flex gap-2">
              {[250, 400, 500].map(h => (
                <button 
                  key={h} 
                  onClick={() => setInterval(h)}
                  className={`flex-1 py-3 rounded-xl font-black text-xs transition-all border ${interval === h ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-500'}`}
                >
                  {h} ساعة
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 pr-2 uppercase">الساعات الحالية</label>
                <input 
                  type="number" 
                  value={currentHours} 
                  onChange={e => setCurrentHours(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl p-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 pr-2 uppercase">آخر صيانة (ساعة)</label>
                <input 
                  type="number" 
                  value={lastServiceHours} 
                  onChange={e => setLastServiceHours(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl p-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                />
             </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">معدل التشغيل اليومي</label>
              <span className="text-emerald-500 font-black text-xs">{dailyUsage} ساعات</span>
            </div>
            <input 
              type="range" min="1" max="24"
              value={dailyUsage}
              onChange={e => setDailyUsage(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
           <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 text-center relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">وضع كفاءة الزيت والفلتر</p>
                <div className="text-5xl font-black mb-2 flex items-baseline justify-center gap-2">
                  <span className={getStatusColor()}>{remainingHours}</span>
                  <span className="text-xs text-slate-500 font-bold uppercase">ساعة متبقية</span>
                </div>
                
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full mt-6 mb-8 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${getProgressColor()}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-right">
                   <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase">التاريخ المتوقع</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        {remainingHours > 0 ? nextServiceDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) : 'مطلوب صيانة فوراً'}
                      </p>
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black text-slate-500 uppercase">الأيام المتبقية</p>
                      <p className={`text-sm font-black ${getStatusColor()}`}>
                        {remainingHours > 0 ? `حوالي ${daysToService} أيام` : 'تجاوزت الموعد'}
                      </p>
                   </div>
                </div>
              </div>
              
              {/* Background HUD Decoration */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
           </div>
           <button onClick={() => window.location.hash = '#contact'} className="mt-6 w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/10 active:scale-95 transition-all">حجز موعد صيانة وقائية</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorScheduleCalculator;
