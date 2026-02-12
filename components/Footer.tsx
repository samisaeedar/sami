
import React from 'react';

interface FooterProps {
  logoUrl?: string;
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ logoUrl, onAdminClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#020617] pt-16 pb-10 overflow-hidden border-t border-slate-100 dark:border-yellow-500/20 font-['Tajawal'] transition-colors duration-500" dir="rtl">
      
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div className="relative w-16 h-16 bg-white rounded-2xl p-2 shadow-2xl transition-all border border-slate-100 dark:border-white/10">
                <img src={logoUrl || 'https://engaliareeki.github.io/web/assets/images/logo.png'} className="w-full h-full object-contain" alt="Logo" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">العريقي <span className="text-yellow-500">للهندسة</span></h3>
                <p className="text-[10px] md:text-[12px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">Industrial Engineering Excellence</p>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg font-bold leading-relaxed max-w-[400px]">
              الحلول المتكاملة تبدأ من الثقة. نوفر أعلى معايير الجودة في هندسة الأتمتة ونظم القدرة الكهربائية في كافة محافظات الجمهورية.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Left Section - Engineer Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-[3rem] shadow-xl overflow-hidden group transition-all duration-500">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-[1.5rem] flex items-center justify-center text-yellow-500 border border-slate-200 dark:border-white/10 relative shrink-0 shadow-inner">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-[#020617]"></span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Senior Field Engineer</p>
                      <h4 className="text-slate-900 dark:text-white font-black text-2xl md:text-3xl leading-none">م. علي العريقي</h4>
                      <p className="text-yellow-600 dark:text-yellow-500 font-bold text-sm mt-1.5 opacity-80">خبير نظم التحكم والقدرة</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a href="https://wa.me/967777403614" target="_blank" className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg border border-white/20">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/engaliareeki" target="_blank" className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg border border-white/20">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col text-center sm:text-right">
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1.5 animate-pulse">Emergency Direct Line</span>
                    <a href="tel:+967777403614" className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black tracking-tighter hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors" dir="ltr">777 403 614</a>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-right">
             <button 
               onClick={onAdminClick}
               className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 italic hover:text-yellow-500 transition-colors cursor-pointer"
             >
               Reliability Engineered // v10.0 Enterprise Titanium
             </button>
             <p className="text-slate-600 dark:text-slate-500 text-sm font-bold">© {currentYear} العريقي للخدمات الصناعية الهندسية. كافة الحقوق محفوظة.</p>
          </div>

          <div className="flex items-center gap-5 group cursor-default">
             <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-slate-200 dark:border-white/10 pl-5 md:pl-0 md:pr-5">
                <p className="text-[9px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.5em] group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">Digital System Architect</p>
                <p className="text-slate-900 dark:text-white font-black text-2xl md:text-3xl tracking-tighter leading-none mt-1.5 transition-transform group-hover:scale-105 origin-left md:origin-right">
                   Sami <span className="text-yellow-500">Al-Areiqi</span>
                </p>
             </div>
             <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-all duration-500 group-hover:bg-yellow-500 group-hover:text-slate-950 group-hover:scale-110 shadow-lg">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
