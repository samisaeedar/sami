
import React from 'react';

interface NotFoundProps {
  onBackHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBackHome }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-['Tajawal']" dir="rtl">
      {/* Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '50px 50px' 
        }} 
      />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl animate-in fade-in zoom-in duration-700">
        {/* Warning Icon with HUD elements */}
        <div className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl animate-pulse rounded-full"></div>
          <div className="relative w-32 h-32 bg-slate-900 border-2 border-red-500/30 rounded-[2.5rem] flex items-center justify-center text-red-500 shadow-2xl">
            <svg className="w-16 h-16 animate-[bounce_2s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {/* HUD Decoration */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-red-500/20 rounded-tr-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-red-500/20 rounded-bl-xl"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
            Error Code: 404_CONNECTION_LOST
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            عذراً، المسار <br />
            <span className="text-red-500">غير موجود</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto">
            يبدو أن الصفحة التي تحاول الوصول إليها قد تم نقلها أو أنها لم تكن موجودة في المخطط الهندسي للموقع.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBackHome}
            className="bg-yellow-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-3 group"
          >
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path d="M11 19l-7-7 7-7" />
            </svg>
            <span>العودة للقاعدة الرئيسية</span>
          </button>
          
          <a 
            href="tel:+967777403614"
            className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md"
          >
            الإبلاغ عن عطل فني
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-[10px] text-slate-700 font-mono tracking-widest uppercase">
        Al-Areiqi Engineering Group // Operational Integrity Control
      </div>
    </div>
  );
};

export default NotFound;
