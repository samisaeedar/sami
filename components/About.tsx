
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      {/* عناصر خلفية هندسية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-8 animate-in fade-in zoom-in duration-500">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] uppercase tracking-[0.2em]">هندسة بلا حدود</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
          نحن نرسم <br />
          <span className="text-yellow-500">مسارات الطاقة</span> <br />
          بذكاء هندسي
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium mb-12 max-w-2xl mx-auto">
          في العريقي للخدمات الصناعية والهندسية، لا نكتفي بالإصلاح، بل نعيد تعريف الكفاءة التشغيلية. ندمج الخبرة الميدانية مع أحدث تقنيات التحكم الرقمي لنمنح منشأتكم استقراراً لا يتوقف.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-yellow-500/30 transition-colors shadow-sm hover:shadow-xl">
            <p className="text-4xl font-black text-yellow-500 mb-2">12+</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">عاماً من التميز</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-yellow-500/30 transition-colors shadow-sm hover:shadow-xl">
            <p className="text-4xl font-black text-yellow-500 mb-2">500+</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">مشروع منجز</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-yellow-500/30 transition-colors shadow-sm hover:shadow-xl flex flex-col justify-center items-center">
             <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-950 mb-3 shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
             </div>
             <p className="text-slate-900 dark:text-white font-black text-sm">اعتمادية مطلقة</p>
          </div>
        </div>

        <a 
          href="https://engaliareeki.github.io/web/assets/files/Al-Areiqi_Company_Profile.pdf"
          target="_blank"
          download="Al-Areiqi_Company_Profile.pdf"
          className="group inline-flex items-center gap-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-5 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl hover:shadow-2xl cursor-pointer"
        >
          تحميل الملف التعريفي PDF
          <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </a>
      </div>
    </section>
  );
};

export default About;
