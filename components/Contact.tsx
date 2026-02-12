
import React, { useState } from 'react';
// Use db instead of supabase as the engine uses IndexedDB (db.ts)
import { db } from '../db';
import { Send, User, Phone, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, msg: '' });

    if (formData.phone.length < 9) {
      setStatus({ type: 'error', msg: 'خطأ: يرجى إدخال رقم هاتف صحيح (9 أرقام على الأقل)' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Use db.sendMessage instead of supabase
      const result = await db.sendMessage(formData);
      if (result.success) {
        setStatus({ type: 'success', msg: 'تم إرسال بروتوكول الطلب بنجاح. سيتم توجيه فني مختص إليك.' });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: 'حدث خطأ في المزامنة السحابية. يرجى المحاولة لاحقاً.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'فشل في الاتصال بالبوابة الهندسية.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="py-12 md:py-20 font-['Tajawal']" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Industrial Container */}
        <div className="relative bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] border-[1px] border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-yellow-500/20">
          
          {/* Technical Status Bar */}
          <div className="bg-yellow-500 px-6 md:px-10 py-4 flex items-center justify-between shadow-2xl relative z-10">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-slate-950" />
                 <span className="text-[9px] md:text-[11px] font-[1000] text-slate-950 uppercase tracking-[0.3em]">SECURE_REQUEST_CHANNEL</span>
               </div>
               <div className="hidden sm:flex gap-1.5 border-r border-slate-950/20 pr-4">
                  <div className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-pulse shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-950/30 rounded-full"></div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black text-slate-950/60 uppercase">Operational Status:</span>
               <span className="text-[10px] font-black text-slate-950 bg-white/30 px-2 py-0.5 rounded uppercase">Online</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 md:p-16 relative">
            {/* Background HUD Decor */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/5 rounded-tl-[3rem] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/5 rounded-br-[3rem] pointer-events-none"></div>

            <div className="mb-10 md:mb-14 text-right">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-[2px] w-12 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></div>
                 <span className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Direct_Field_Interface</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter leading-none mb-4">
                قناة <span className="text-yellow-500 italic">الدعم</span> المباشر
              </h2>
              <p className="text-slate-500 font-bold text-sm md:text-lg max-w-xl leading-relaxed">
                أرسل مواصفات مشروعك أو طبيعة العطل الفني، وسيتم تحليل طلبك وتخصيص أفضل الكفاءات الهندسية للرد عليك.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 relative z-10">
              {status.type && (
                <div className={`p-6 rounded-2xl border flex items-center gap-5 animate-in slide-in-from-top-4 duration-500 ${
                  status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${status.type === 'success' ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'}`}>
                    {status.type === 'success' ? <ShieldCheck size={20} /> : <div className="font-black">!</div>}
                  </div>
                  <p className="font-black text-xs md:text-sm tracking-tight leading-relaxed">{status.msg}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Input Name */}
                <div className="space-y-3 group">
                  <div className="flex justify-between px-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-yellow-500 transition-colors">Client_ID / الاسم</label>
                    <User size={12} className="text-slate-600 group-focus-within:text-yellow-500 transition-colors" />
                  </div>
                  <div className="relative">
                    <input 
                      required 
                      placeholder="أدخل اسمك أو اسم المؤسسة" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="w-full bg-slate-900/60 p-5 rounded-2xl border border-white/5 focus:border-yellow-500/50 focus:bg-slate-900 transition-all font-bold text-sm text-white placeholder:text-slate-600 outline-none shadow-inner"
                    />
                    <div className="absolute bottom-0 right-4 left-4 h-px bg-yellow-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>

                {/* Input Phone */}
                <div className="space-y-3 group">
                  <div className="flex justify-between px-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-yellow-500 transition-colors">Comm_Link / الهاتف</label>
                    <Phone size={12} className="text-slate-600 group-focus-within:text-yellow-500 transition-colors" />
                  </div>
                  <div className="relative">
                    <input 
                      required 
                      type="tel" 
                      placeholder="77x xxx xxx" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      className="w-full bg-slate-900/60 p-5 rounded-2xl border border-white/5 focus:border-yellow-500/50 focus:bg-slate-900 transition-all font-bold text-sm text-white placeholder:text-slate-600 text-right outline-none shadow-inner" 
                    />
                    <div className="absolute bottom-0 right-4 left-4 h-px bg-yellow-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Input Message */}
              <div className="space-y-3 group">
                <div className="flex justify-between px-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-yellow-500 transition-colors">Tech_Specifications / التفاصيل</label>
                  <MessageSquare size={12} className="text-slate-600 group-focus-within:text-yellow-500 transition-colors" />
                </div>
                <div className="relative">
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    placeholder="اشرح طبيعة الخدمة المطلوبة أو المشكلة الفنية..." 
                    className="w-full bg-slate-900/60 p-6 rounded-[2rem] border border-white/5 focus:border-yellow-500/50 focus:bg-slate-900 transition-all font-bold text-sm text-white placeholder:text-slate-600 resize-none outline-none shadow-inner"
                  ></textarea>
                  <div className="absolute bottom-0 right-8 left-8 h-px bg-yellow-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
              
              <button 
                disabled={isSubmitting} 
                className="group relative w-full h-16 md:h-24 bg-yellow-500 hover:bg-white text-slate-950 font-[1000] rounded-2xl md:rounded-[3rem] transition-all active:scale-[0.98] disabled:opacity-50 shadow-2xl flex items-center justify-center gap-5 overflow-hidden border border-white/10"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-lg md:text-2xl uppercase tracking-tighter">جاري المعالجة...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-5">
                    <span className="text-lg md:text-2xl uppercase tracking-tighter">إرسال بروتوكول الطلب</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-yellow-500 transition-transform group-hover:translate-x-[-10px] group-hover:rotate-12 shadow-xl">
                      <Send size={20} className="md:w-6 md:h-6" />
                    </div>
                  </div>
                )}
                
                {/* Visual Scanning Effect on Button Hover */}
                <div className="absolute inset-0 w-2 h-full bg-white/20 -translate-x-full group-hover:translate-x-[1000px] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </button>

              <div className="flex items-center justify-center gap-2 opacity-30 mt-4">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">End_to_End_Encryption: Enabled</span>
                 <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
