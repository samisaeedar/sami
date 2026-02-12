
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="py-16 md:py-24 bg-transparent relative overflow-hidden font-['Tajawal']" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-5">
        <div className="mb-12 md:mb-16 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-lg mb-4 border border-yellow-500/20">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-yellow-500 font-black text-[9px] uppercase tracking-[0.3em]">Knowledge_Base_v2</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-[1000] text-white leading-none">
            بروتوكولات <span className="text-yellow-500 italic">الدعم الفني</span>
          </h2>
          <p className="mt-4 text-slate-400 font-bold text-sm md:text-lg max-w-xl leading-relaxed">إجابات تقنية مباشرة حول خدماتنا الهندسية ومعايير الجودة لدينا.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div 
              key={index}
              className={`group transition-all duration-500 rounded-[1.5rem] md:rounded-[2.5rem] border ${
                activeIndex === index 
                ? 'border-yellow-500/40 bg-slate-900 shadow-2xl scale-[1.01]' 
                : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-yellow-500/20 shadow-sm'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-5 py-6 md:px-8 md:py-8 flex items-center justify-between text-right outline-none"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`hidden sm:flex w-12 h-12 rounded-2xl items-center justify-center border font-black text-[10px] transition-all duration-500 ${
                    activeIndex === index 
                    ? 'bg-yellow-500 border-yellow-500 text-slate-950' 
                    : 'bg-slate-800 border-white/10 text-slate-500'
                  }`}>
                    PR-{101 + index}
                  </div>
                  <span className={`text-base md:text-xl font-[1000] transition-colors duration-500 ${
                    activeIndex === index ? 'text-white' : 'text-slate-400'
                  }`}>
                    {item.question}
                  </span>
                </div>
                
                <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  activeIndex === index ? 'bg-yellow-500 text-slate-950 rotate-180' : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}>
                  <svg className="w-4 h-4 md:w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M19 9l-7 7-7-7"/></svg>
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <div className="px-5 pb-8 md:px-24 md:pb-10">
                  <div className="relative pt-4 border-t border-white/10">
                    <p className="text-slate-200 font-bold text-sm md:text-lg leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
