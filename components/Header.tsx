
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Settings, 
  Briefcase, 
  Sparkles, 
  LayoutGrid, 
  PhoneCall, 
  ShieldCheck, 
  X, 
  ChevronLeft,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

interface HeaderProps {
  logoUrl?: string;
  onPageChange?: (page: 'home' | 'all-projects') => void;
  currentPage?: 'home' | 'all-projects' | 'project-details' | '404' | 'gallery-archive';
  onLogoClick?: () => void;
  onDashboardClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, onPageChange, currentPage, onLogoClick, onDashboardClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    setIsDark(initialTheme);
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { label: 'الرئيسية', id: 'home', icon: Home },
    { label: 'الخدمات الهندسية', id: 'specializations', icon: Settings },
    { label: 'سجل المشاريع', id: 'portfolio', icon: Briefcase },
    { label: 'لماذا العريقي؟', id: 'why-us', icon: Sparkles },
    { label: 'المعرض الميداني', id: 'gallery', icon: LayoutGrid },
    { label: 'مركز التواصل', id: 'contact-hub', icon: PhoneCall },
  ];

  const handleLogoTouch = () => {
    const now = Date.now();
    if (now - lastClickTime.current < 500) {
      clickCount.current += 1;
    } else {
      clickCount.current = 1;
    }
    lastClickTime.current = now;

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      onLogoClick?.();
    } else if (currentPage !== 'home') {
      onPageChange?.('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    if (currentPage !== 'home') {
      onPageChange?.('home');
      setTimeout(() => scrollToElement(id), 300);
    } else {
      scrollToElement(id);
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled 
          ? 'py-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-2xl' 
          : 'py-4 bg-transparent'
        }`} 
        dir="rtl"
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-4 cursor-pointer group" onClick={handleLogoTouch}>
            <div className={`transition-all duration-500 bg-white p-1.5 shadow-2xl border border-slate-100 dark:border-transparent ${scrolled ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 rounded-2xl'}`}>
              <img src={logoUrl || 'https://engaliareeki.github.io/web/assets/images/logo.png'} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-right">
              <h1 className={`font-black text-slate-900 dark:text-white leading-none ${scrolled ? 'text-lg' : 'text-2xl'}`}>العريقي</h1>
              {!scrolled && <span className="text-yellow-600 dark:text-yellow-500 text-[9px] font-black uppercase tracking-widest mt-1 opacity-70">الخدمات الصناعية والهندسية</span>}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/5">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleLinkClick(link.id)} className="px-5 py-2.5 rounded-xl text-[12px] font-black transition-all duration-300 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/5">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-10 h-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-500 shadow-sm transition-all hover:scale-105 active:scale-95">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(true)} className="lg:hidden w-11 h-11 bg-yellow-500 rounded-xl flex items-center justify-center shadow-xl border border-yellow-400 transition-all hover:scale-105 active:scale-95">
              <Menu size={22} className="text-slate-950" />
            </button>
          </div>
        </div>
      </header>

      {/* Modern Side Navigation Menu - Optimized for Fit */}
      <div className={`fixed inset-0 z-[2000] lg:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`} dir="rtl">
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
        
        {/* Sidebar Panel - Optimized for Height */}
        <div className={`absolute top-0 right-0 h-full w-[300px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/5 transition-transform duration-500 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Header Action Bar - Compact */}
          <div className="p-6 pb-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white p-1.5 rounded-xl shadow-lg border border-slate-100">
                <img src={logoUrl || 'https://engaliareeki.github.io/web/assets/images/logo.png'} className="w-full h-full object-contain" alt="Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-black text-lg leading-none">القائمة</span>
                <span className="text-yellow-500 text-[8px] font-black uppercase tracking-widest mt-0.5 opacity-60">Al-Areiqi Engineering</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-90"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Navigation Links - Tightened Spacing */}
          <nav className="flex-1 overflow-hidden px-4 py-2 space-y-0.5 flex flex-col justify-center">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link.id)} 
                className={`group w-full text-right px-4 py-2.5 rounded-2xl font-black transition-all duration-300 flex items-center justify-between relative overflow-hidden active:scale-[0.98] ${
                  currentPage === link.id 
                  ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    currentPage === link.id 
                    ? 'bg-yellow-500 text-slate-950 shadow-[0_0_15px_rgba(234,179,8,0.25)]' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-yellow-500 group-hover:bg-yellow-500/10'
                  }`}>
                    <link.icon size={16} />
                  </div>
                  <span className="text-xs tracking-tight">{link.label}</span>
                </div>
                
                <ChevronLeft size={14} className={`transition-all duration-300 ${
                  currentPage === link.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
                }`} />

                {/* Industrial HUD Accent */}
                {currentPage === link.id && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-yellow-500 rounded-l-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Menu Action (Dashboard) - Compacted */}
          <div className="p-6 pt-2 shrink-0">
            <div className="bg-slate-50 dark:bg-white/[0.03] rounded-[1.75rem] p-4 space-y-3 border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 opacity-60 px-1">
                <ShieldCheck size={12} className="text-yellow-500" />
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Admin Authorization</span>
              </div>
              <button 
                onClick={() => { setIsOpen(false); onLogoClick?.(); }} 
                className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-3 rounded-2xl font-[1000] text-[11px] flex items-center justify-center gap-2.5 shadow-xl transition-all hover:scale-[1.02] active:scale-95 group/btn"
              >
                <span className="tracking-tight">لوحة التحكم</span>
                <div className="w-6 h-6 bg-white/10 dark:bg-slate-950/10 rounded-lg flex items-center justify-center transition-transform group-hover/btn:rotate-12">
                  <Settings size={12} />
                </div>
              </button>
            </div>
            
            <p className="mt-6 text-center text-[7px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em] select-none">
              RELIABILITY_V9.1 // 2025
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Header;
