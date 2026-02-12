
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const MessageBotIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
    <path d="M21 11.5V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2.5" className="opacity-40" />
  </svg>
);

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('areiqi_ai_v4');
    return saved ? JSON.parse(saved) : [
      { 
        role: 'model', 
        text: 'أهلاً بك في العريقي للهندسة الموحدة. أنا مساعدك الرقمي المدمج، يمكنني مساعدتك في استكشاف خدماتنا ومشاريعنا الميدانية أو توجيهك للمهندس المختص. كيف يمكنني خدمتك؟' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('areiqi_ai_v4', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    setInput('');
    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
          systemInstruction: "أنت المساعد الذكي لشركة العريقي للخدمات الهندسية. الشركة متخصصة في أتمتة المصانع، مجموعات التوليد، والطاقة الهجينة. ردودك يجب أن تكون تقنية قصيرة ومفيدة. للطوارئ الميدانية: 777403614.",
          temperature: 0.1,
        },
      });

      const aiText = response.text || "عذراً، لم أستطع معالجة الطلب حالياً.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "حدث خطأ في الاتصال بنظام الذكاء الاصطناعي. يرجى محاولة التواصل عبر الهاتف: 777403614" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-['Tajawal']" dir="rtl">
      {isOpen && (
        <div className="mb-6 w-[85vw] sm:w-[360px] h-[60dvh] max-h-[550px] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-white/5 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          <div className="px-6 py-5 bg-slate-900 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950 shadow-md">
                <MessageBotIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-xs text-white leading-none">مساعد العريقي الذكي</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_5px_#eab308]"></span>
                  <span className="text-[8px] text-slate-400 font-black tracking-widest uppercase">متصل بالنظام</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-900/10">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[88%] text-[11px] font-bold leading-relaxed shadow-sm transition-all ${
                  m.role === 'user' 
                  ? 'bg-yellow-500 text-slate-950 rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="flex gap-1.5 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-white/5">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 rounded-2xl px-4 py-1">
              <input 
                className="flex-1 bg-transparent py-3 outline-none text-[12px] font-bold dark:text-white placeholder:text-slate-400" 
                placeholder="اسأل عن خدماتنا أو مشاريعنا الميدانية..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()} 
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${input.trim() ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 opacity-20'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`relative w-16 h-16 sm:w-18 sm:h-18 bg-slate-950 dark:bg-yellow-500 rounded-[2rem] flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 group border-2 border-white/5 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-[2rem] bg-yellow-500/10 animate-ping pointer-events-none"></div>
        )}
        
        {isOpen ? (
          <span className="text-white dark:text-slate-950 text-2xl font-black">✕</span>
        ) : (
          <div className="relative">
            <MessageBotIcon className="w-8 h-8 sm:w-9 sm:h-9 text-yellow-500 dark:text-slate-950 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-500 border-2 border-slate-950 dark:border-yellow-500 rounded-full shadow-md animate-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingAI;
