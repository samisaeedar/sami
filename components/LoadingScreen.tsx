
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  logoUrl: string;
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoUrl, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusLogs = [
    "INITIALIZING POWER GRID...",
    "SYNCING PLC CONTROLLERS...",
    "ANALYZING CIRCUIT TOPOLOGY...",
    "OPTIMIZING ENERGY FLOW...",
    "SECURE LINK ESTABLISHED",
    "SYSTEM READY"
  ];

  useEffect(() => {
    if (!isVisible) return;

    // محاكاة تحميل رقمي سريع وديناميكي
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() * 15;
        return Math.min(prev + step, 100);
      });
    }, 100);

    const logInterval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % statusLogs.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [isVisible]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-110'}`} dir="rtl">
      
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)`,
          backgroundSize: '50px 50px' 
        }} 
      />

      {/* Animated HUD Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-yellow-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] border border-dashed border-yellow-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute w-full h-[1px] bg-yellow-500/20 shadow-[0_0_20px_#eab308] animate-scanner-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Logo Container */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-[2rem] bg-yellow-500/20 blur-3xl animate-pulse"></div>
          
          {/* Corner Brackets */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-500 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-500 animate-pulse"></div>

          <div className="relative w-32 h-32 md:w-44 md:h-44 bg-white rounded-[2rem] p-5 shadow-[0_0_60px_rgba(234,179,8,0.3)] flex items-center justify-center overflow-hidden">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
            {/* Inner Scanning Bar */}
            <div className="absolute inset-x-0 h-[3px] bg-yellow-500 shadow-[0_0_15px_#eab308] animate-loading-scan"></div>
          </div>
        </div>

        {/* Loading Progress Stats */}
        <div className="mt-16 text-center w-full max-w-[300px] md:max-w-md">
          <div className="flex justify-between items-end mb-3">
             <div className="text-right">
                <p className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Booting_System</p>
                <p className="text-white font-mono text-[11px] h-4 opacity-60 transition-all duration-300">
                  {statusLogs[statusIndex]}
                </p>
             </div>
             <div className="text-left">
                <span className="text-4xl md:text-5xl font-black text-white font-mono tabular-nums">
                  {Math.floor(progress)}<span className="text-yellow-500 text-xl">%</span>
                </span>
             </div>
          </div>

          {/* Progress Bar Container */}
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
             <div 
               className="h-full bg-yellow-500 shadow-[0_0_15px_#eab308] transition-all duration-200 ease-out"
               style={{ width: `${progress}%` }}
             ></div>
             {/* Shimmer on bar */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast"></div>
          </div>

          <div className="mt-6 flex justify-between items-center opacity-40">
             <span className="text-[8px] font-black text-white uppercase tracking-widest">AL-AREIQI_v9.1_ENGINE</span>
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i < (progress/20) ? 'bg-yellow-500' : 'bg-white/20'}`}></div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanner-full {
          0% { transform: translateY(-50vh); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(50vh); opacity: 0; }
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scanner-full {
          animation: scanner-full 3s linear infinite;
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s linear infinite;
        }
        @keyframes loading-scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-loading-scan {
          animation: loading-scan 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
