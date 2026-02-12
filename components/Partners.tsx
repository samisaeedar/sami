
import React from 'react';

const CLIENT_LOGOS = [
  { name: 'Al-Hada Hospital', url: 'https://placehold.co/400x150/020617/eab308?text=HADA+HOSPITAL' },
  { name: 'Central Bank', url: 'https://placehold.co/400x150/020617/eab308?text=CENTRAL+BANK' },
  { name: 'Yemen Steel', url: 'https://placehold.co/400x150/020617/eab308?text=YEMEN+STEEL' },
  { name: 'Saba Fond', url: 'https://placehold.co/400x150/020617/eab308?text=SABA+FOND' },
  { name: 'Aden Port', url: 'https://placehold.co/400x150/020617/eab308?text=ADEN+PORT' },
  { name: 'Yemen Mobile', url: 'https://placehold.co/400x150/020617/eab308?text=YEMEN+MOBILE' },
  { name: 'Blue Sea Co', url: 'https://placehold.co/400x150/020617/eab308?text=BLUE+SEA' },
  { name: 'Golden Factory', url: 'https://placehold.co/400x150/020617/eab308?text=GOLDEN+FAC' },
  { name: 'Al-Amal Bank', url: 'https://placehold.co/400x150/020617/eab308?text=AL-AMAL+BANK' },
  { name: 'Sky Power', url: 'https://placehold.co/400x150/020617/eab308?text=SKY+POWER' },
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden border-t border-white/5 font-['Tajawal'] transition-colors duration-500" dir="rtl">
      <div className="container mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
           <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
           <span className="text-yellow-500 font-black tracking-[0.3em] text-[9px] uppercase">شراكات استراتيجية</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          فخورون <span className="text-yellow-500 italic">بعملائنا</span>
        </h2>
        <p className="text-slate-400 mt-6 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          نخدم كبرى المؤسسات البنكية، الصناعية، والخدمية في الجمهورية اليمنية بأعلى معايير الجودة المعتمدة.
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center py-8">
        {/* Deep Gradient Overlays for smooth scrolling edges */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-96 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-96 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee-continuous whitespace-nowrap items-center py-4">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
              <div key={idx} className="mx-6 md:mx-10 flex-shrink-0 group">
                <div className="relative w-40 md:w-64 h-20 md:h-32 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center p-6 transition-all duration-500 hover:bg-white/[0.05] hover:border-yellow-500/30 hover:scale-105 overflow-hidden">
                  {/* Subtle Background Glow for each logo card */}
                  <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/[0.02] transition-colors duration-500"></div>
                  
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="max-w-full max-h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 object-contain relative z-10"
                  />
                  
                  {/* Radar Scanning Line Effect for Tech Feel */}
                  <div className="absolute inset-0 w-full h-px bg-yellow-500/10 -translate-y-full group-hover:translate-y-[200px] transition-transform duration-[2s] pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-continuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-continuous {
          animation: marquee-continuous 50s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-marquee-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;
