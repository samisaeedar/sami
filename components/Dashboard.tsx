
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Briefcase, MessageSquare, Settings, 
  Image as ImageIcon, Users, LogOut, X, Plus, Trash2, CheckCircle2, 
  Activity, Save, AlertCircle, Phone, Lock, FolderUp, 
  Loader2, HardDrive, BarChart3, ChevronRight, Edit3, Search, 
  ExternalLink, TrendingUp, Menu, Eye, UserPlus, ShieldAlert,
  ChevronLeft, Key, FileText, Calendar, MapPin, Tag, Star,
  Upload, Clock, RotateCcw, AlertTriangle, FileWarning,
  Server, Globe, Database, Monitor
} from 'lucide-react';
import { db, compressImage } from '../db';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';

type ActivePage = 'analytics' | 'projects' | 'messages' | 'gallery' | 'partners' | 'users' | 'activity' | 'trash' | 'settings';

// --- Sub-Components (Memoized for Performance) ---

const StatCard = memo(({ label, val, color, icon: Icon }: any) => (
  <div className="bg-slate-900/60 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 relative overflow-hidden group">
    <div className="relative z-10">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">{label}</p>
      <div className="flex items-end gap-2 md:gap-3">
        <h3 className="text-2xl md:text-3xl font-black text-white">{val}</h3>
        <div className="mb-1 text-emerald-500 text-[9px] md:text-[10px] font-bold flex items-center gap-0.5">
          <TrendingUp size={10} /> +5%
        </div>
      </div>
    </div>
    <div className={`absolute -right-4 -bottom-4 w-16 md:w-20 h-16 md:h-20 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700`}></div>
    <Icon className="absolute top-5 md:top-6 left-5 md:left-6 text-white/10" size={20} />
  </div>
));

const Pagination = memo(({ current, total, onChange }: { current: number, total: number, onChange: (p: number) => void }) => {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button disabled={current === 1} onClick={() => onChange(current - 1)} className="w-9 h-9 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center disabled:opacity-20 hover:bg-yellow-500 hover:text-slate-950 transition-all"><ChevronRight size={18} /></button>
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)} className={`w-9 h-9 rounded-xl font-black text-xs transition-all ${current === p ? 'bg-yellow-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{p}</button>
      ))}
      <button disabled={current === total} onClick={() => onChange(current + 1)} className="w-9 h-9 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center disabled:opacity-20 hover:bg-yellow-500 hover:text-slate-950 transition-all"><ChevronLeft size={18} /></button>
    </div>
  );
});

const Dashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [user, setUser] = useState<any>(null);
  const [activePage, setActivePage] = useState<ActivePage>('analytics');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [trash, setTrash] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  
  const [showModal, setShowModal] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const addToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  useEffect(() => {
    const unsub = db.onAuthChange(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsubs = [
      db.listenProjects(setProjects),
      db.listenMessages(setMessages),
      db.listenGallery(setGallery),
      db.listenPartners(setPartners),
      db.listenUsers(setUsers),
      db.listenSettings(setSettings),
      db.listenActivity(setLogs),
      db.listenTrash(setTrash)
    ];
    setTimeout(() => setLoading(false), 500);
    return () => unsubs.forEach(fn => fn());
  }, [user]);

  const hasPermission = useCallback((section: string, action: string) => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    if (user.role === 'VIEWER' && action !== 'view') return false;
    const perms = user.permissions || {};
    if (perms.all) return true;
    const sectionKey = section.endsWith('s') ? section : section + 's';
    return perms[sectionKey]?.includes(action) || perms[sectionKey]?.includes('all');
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await db.login(loginForm.user, loginForm.pass);
      addToast("تم تأكيد الهوية الرقمية");
    } catch (err: any) { addToast(err.message, "error"); }
    finally { setIsLoggingIn(false); }
  };

  const handleSaveModal = async () => {
    if (!showModal) return;
    const { store, mode, data } = showModal;
    const action = mode === 'add' ? 'add' : 'edit';
    if (!hasPermission(store, action)) return addToast("لا تملك صلاحية لهذه العملية", "error");
    
    try {
      if (mode === 'add') await db.addItem(store, data);
      else await db.updateItem(store, data.id, data);
      addToast("تمت المزامنة بنجاح");
      setShowModal(null);
      setPreviewUrl(null);
    } catch (err) { addToast("فشل في حفظ البيانات", "error"); }
  };

  const handleDelete = useCallback(async (store: string, id: any) => {
    if (!hasPermission(store, 'delete')) return addToast("غير مصرح لك بالحذف", "error");
    if (!window.confirm("هل أنت متأكد؟ سيتم نقل السجل إلى سلة المحذوفات.")) return;
    await db.deleteItem(store, id);
    addToast("تم النقل إلى سلة المحذوفات", "info");
  }, [hasPermission, addToast]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !showModal) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const compressed = await compressImage(file);
    setShowModal({ ...showModal, data: { ...showModal.data, image: compressed, logo: compressed } });
  };

  const dataToFilter = useMemo(() => {
    switch(activePage) {
      case 'projects': return projects;
      case 'messages': return messages;
      case 'users': return users;
      case 'partners': return partners;
      case 'activity': return logs;
      case 'trash': return trash;
      default: return [];
    }
  }, [activePage, projects, messages, users, partners, logs, trash]);

  const filteredItems = useMemo(() => {
    return dataToFilter.filter(item => 
      Object.values(item).some(v => String(v).toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [dataToFilter, searchQuery]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const navItems = [
    { id: 'analytics', label: 'اللوحة الرئيسية', icon: BarChart3 },
    { id: 'projects', label: 'إدارة المشاريع', icon: Briefcase },
    { id: 'gallery', label: 'معرض الوسائط', icon: ImageIcon },
    { id: 'messages', label: 'مركز التواصل', icon: MessageSquare },
    { id: 'partners', label: 'قائمة الشركاء', icon: ExternalLink },
    { id: 'users', label: 'الموظفين والصلاحيات', icon: Users, hide: user?.role === 'EDITOR' },
    { id: 'activity', label: 'سجل النشاطات', icon: Clock, hide: user?.role === 'EDITOR' },
    { id: 'trash', label: 'المحذوفات', icon: Trash2, hide: user?.role === 'EDITOR' },
    { id: 'settings', label: 'الإعدادات المتقدمة', icon: Settings },
  ];

  if (!user) {
    return (
      <div className="fixed inset-0 z-[10000] bg-slate-950 flex items-center justify-center p-6 font-['Tajawal']" dir="rtl">
        <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500">
           <div className="text-center mb-10">
              <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(234,179,8,0.3)]"><Lock size={32} className="text-slate-950" /></div>
              <h1 className="text-white text-3xl font-black tracking-tight">المصادقة الهندسية</h1>
              <p className="text-slate-500 text-[10px] font-black mt-2 tracking-[0.4em] uppercase">Enterprise Secure Terminal</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">ACCESS_ID</label><input className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-yellow-500 transition-all" placeholder="Username" value={loginForm.user} onChange={e => setLoginForm({...loginForm, user: e.target.value})} /></div>
              <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">SECURE_KEY</label><input type="password" className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-yellow-500 transition-all" placeholder="••••••••" value={loginForm.pass} onChange={e => setLoginForm({...loginForm, pass: e.target.value})} /></div>
              <button disabled={isLoggingIn} className="w-full bg-yellow-500 text-slate-950 py-4 rounded-2xl font-[1000] text-sm mt-4 shadow-2xl transition-all active:scale-95 disabled:opacity-50">{isLoggingIn ? "جاري التحقق..." : "دخول النظام"}</button>
           </form>
           <button onClick={onClose} className="w-full mt-8 text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-all">TERMINATE_PROCESS</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-950 flex overflow-hidden font-['Tajawal'] text-right" dir="rtl">
      
      {/* Drawer Overlay */}
      <div className={`fixed inset-0 z-[10001] bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      
      {/* Enhanced Sidebar */}
      <aside className={`fixed lg:relative z-[10002] h-full w-72 bg-slate-900 border-l lg:border-l-0 border-white/5 flex flex-col shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg"><ShieldCheck size={22} className="text-slate-950" /></div>
              <div><h2 className="text-white font-black text-sm leading-none">أدمن بانل</h2><p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">v10.0 Enterprise</p></div>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-500"><X size={20} /></button>
        </div>
        <nav className="flex-1 p-4 md:p-6 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.filter(i => !i.hide).map(item => (
            <button key={item.id} onClick={() => { setActivePage(item.id as any); setIsSidebarOpen(false); setCurrentPage(1); }} className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl font-black transition-all text-xs ${activePage === item.id ? 'bg-yellow-500 text-slate-950 shadow-xl' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={18} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5 space-y-4">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-yellow-500 font-black text-xs border border-white/5">{user.name[0]}</div>
              <div className="flex flex-col"><span className="text-white font-black text-[11px] truncate max-w-[120px]">{user.name}</span><span className="text-yellow-500/60 text-[8px] font-bold uppercase tracking-widest">{user.role}</span></div>
           </div>
           <button onClick={() => db.logout()} className="w-full flex items-center justify-center gap-3 p-4 bg-rose-500/10 text-rose-500 rounded-2xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all"><LogOut size={16} /> خروج آمن</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative flex flex-col no-scrollbar bg-slate-950">
        {/* Topbar */}
        <header className="sticky top-0 z-[1000] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-5 md:py-7 flex justify-between items-center">
           <div className="flex items-center gap-5">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white/5 text-yellow-500 rounded-xl"><Menu size={20} /></button>
              <div className="flex flex-col"><span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Dashboard / {activePage}</span><h1 className="text-xl md:text-3xl font-[1000] text-white mt-1">إدارة {navItems.find(i=>i.id===activePage)?.label}</h1></div>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-left px-6 border-l border-white/10"><span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">System_Health</span><span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Operational</span></div>
              <button onClick={onClose} className="p-3 bg-white/5 text-slate-400 hover:text-rose-500 rounded-xl transition-all"><X size={24} /></button>
           </div>
        </header>

        <div className="p-6 md:p-12 max-w-[1400px] mx-auto w-full flex-1">
          {loading ? (
             <div className="h-full flex flex-col items-center justify-center gap-4 pt-20">
                <Loader2 size={48} className="text-yellow-500 animate-spin" />
                <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">Synchronizing_Enterprise_Vault</p>
             </div>
          ) : (
            <div className="h-full">
              {activePage === 'analytics' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    <StatCard label="المشاريع الميدانية" val={projects.length} color="#eab308" icon={Briefcase} />
                    <StatCard label="رسائل التواصل" val={messages.length} color="#3b82f6" icon={MessageSquare} />
                    <StatCard label="الشركاء والعملاء" val={partners.length} color="#10b981" icon={ExternalLink} />
                    <StatCard label="المستخدمين" val={users.length} color="#f43f5e" icon={Users} />
                  </div>
                  <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                    <div className="lg:col-span-2 bg-slate-900/60 p-8 md:p-10 rounded-[2.5rem] border border-white/5">
                      <h4 className="text-white text-sm font-black mb-10 flex items-center gap-3"><Activity size={18} className="text-yellow-500" /> تحليل النشاط الرقمي</h4>
                       <div className="h-64 md:h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{n:'س',v:12},{n:'ح',v:25},{n:'ن',v:18},{n:'ث',v:30},{n:'ر',v:22},{n:'خ',v:35},{n:'ج',v:15}]}>
                              <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/><stop offset="95%" stopColor="#eab308" stopOpacity={0}/></linearGradient></defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                              <XAxis dataKey="n" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '10px' }} />
                              <Area type="monotone" dataKey="v" stroke="#eab308" strokeWidth={4} fill="url(#grad)" />
                            </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                    <div className="space-y-8">
                       <div className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center h-full">
                          <h4 className="text-white text-xs font-black mb-8 self-start">توزع موارد النظام</h4>
                          <div className="relative w-48 h-48 md:w-56 md:h-56">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart><Pie data={[{n:'P',v:projects.length,c:'#eab308'},{n:'M',v:messages.length,c:'#3b82f6'}]} innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="v">{[0,1].map((e, i) => <Cell key={i} fill={['#eab308','#3b82f6'][i]} />)}</Pie></PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <Database size={28} className="text-slate-700 mb-2" />
                              <span className="text-white font-black text-2xl">94%</span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {(['projects', 'messages', 'users', 'partners', 'activity', 'trash'] as any[]).includes(activePage) && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div><h2 className="text-2xl font-black text-white">{navItems.find(i=>i.id===activePage)?.label}</h2><p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2">عرض {filteredItems.length} سجل مكتشف</p></div>
                    <div className="flex w-full md:w-auto gap-4">
                      <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500" size={16} />
                        <input className="w-full bg-slate-900 border border-white/5 rounded-2xl p-3.5 pr-12 text-white text-xs outline-none focus:border-yellow-500 transition-all font-bold" placeholder="بحث ذكي في السجلات..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
                      </div>
                      {['projects', 'users', 'partners'].includes(activePage) && hasPermission(activePage, 'add') && (
                        <button onClick={() => {
                          const initialData = activePage === 'projects' ? { title: '', category: 'أتمتة', description: '', location: '', client_name: '', end_date: '', featured: false, image: '', status: 'published' } : activePage === 'users' ? { name: '', username: '', password: '', role: 'EDITOR', status: 'active', permissions: {} } : { name: '', logo: '', website: '' };
                          setShowModal({ store: activePage, mode: 'add', data: initialData });
                        }} className="bg-yellow-500 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-xs flex items-center gap-3 hover:bg-white transition-all active:scale-95 shadow-xl shadow-yellow-500/10"><Plus size={20} /> إضافة</button>
                      )}
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-3xl">
                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-right min-w-[800px]">
                        <thead>
                          <tr className="bg-white/5">
                            {activePage === 'projects' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">المشروع</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الحالة</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الموقع</th></>}
                            {activePage === 'messages' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">المرسل</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الاتصال</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الرسالة</th></>}
                            {activePage === 'users' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الموظف</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الدور</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الحالة</th></>}
                            {activePage === 'activity' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">المستخدم</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">العملية</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الوقت</th></>}
                            {activePage === 'trash' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">العنصر</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">المصدر الأصلي</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">تاريخ الحذف</th></>}
                            {activePage === 'partners' && <><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الشريك</th><th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">الرابط</th></>}
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">العمليات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedItems.map(item => (
                            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-all group/row">
                              {activePage === 'projects' && (
                                <>
                                  <td className="p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0"><img src={item.image} className="w-full h-full object-cover" /></div><div className="flex flex-col"><span className="text-white font-black text-xs group-hover/row:text-yellow-500 transition-colors">{item.title}</span><span className="text-slate-500 text-[9px] font-bold mt-1 uppercase tracking-tighter">{item.category}</span></div></td>
                                  <td className="p-6"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${item.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'}`}>{item.status}</span></td>
                                  <td className="p-6"><div className="flex items-center gap-2 text-slate-400 text-xs font-bold"><MapPin size={12} className="text-yellow-500" /> {item.location || 'N/A'}</div></td>
                                </>
                              )}
                              {activePage === 'users' && (
                                <>
                                  <td className="p-6 flex items-center gap-4"><div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-yellow-500 font-black text-xs border border-white/5">{item.name[0]}</div><div className="flex flex-col"><span className="text-white font-black text-xs">{item.name}</span><span className="text-slate-600 text-[9px] font-mono mt-0.5">{item.username}</span></div></td>
                                  <td className="p-6"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${item.role === 'ADMIN' || item.role === 'SUPER_ADMIN' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>{item.role}</span></td>
                                  <td className="p-6"><div className={`flex items-center gap-2 text-[10px] font-black ${item.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`}><div className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} /> {item.status === 'active' ? 'نشط' : 'موقف'}</div></td>
                                </>
                              )}
                              {activePage === 'activity' && (
                                <>
                                  <td className="p-6"><div className="flex flex-col"><span className="text-white font-black text-xs">{item.user}</span><span className="text-slate-500 text-[9px] uppercase tracking-widest">{item.role}</span></div></td>
                                  <td className="p-6"><div className="flex items-center gap-3"><span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.action === 'دخول' ? 'bg-emerald-500/20 text-emerald-500' : item.action === 'حذف مؤقت' ? 'bg-rose-500/20 text-rose-500' : 'bg-blue-500/20 text-blue-500'}`}>{item.action}</span><span className="text-slate-400 text-xs font-bold max-w-[200px] truncate">{item.details}</span></div></td>
                                  <td className="p-6 text-slate-500 text-[10px] font-mono">{new Date(item.createdAt).toLocaleString('ar-YE')}</td>
                                </>
                              )}
                              {activePage === 'trash' && (
                                <>
                                  <td className="p-6 font-black text-white text-xs">{item.title || item.name || `Record_${item.id}`}</td>
                                  <td className="p-6"><span className="px-2 py-1 bg-white/5 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.originalStore}</span></td>
                                  <td className="p-6 text-slate-500 text-[10px] font-mono">{new Date(item.deletedAt).toLocaleString('ar-YE')}</td>
                                </>
                              )}
                              {activePage === 'messages' && (
                                <>
                                  <td className="p-6 font-black text-white text-xs">{item.name}</td>
                                  <td className="p-6"><a href={`tel:${item.phone}`} className="text-emerald-500 text-xs font-mono font-bold hover:underline transition-all tracking-tighter">{item.phone}</a></td>
                                  <td className="p-6 text-slate-400 text-[11px] max-w-sm truncate font-bold">{item.message}</td>
                                </>
                              )}
                              {activePage === 'partners' && (
                                <>
                                  <td className="p-6 flex items-center gap-4"><div className="w-12 h-10 bg-white/5 rounded-xl flex items-center justify-center p-2"><img src={item.logo || item.image} className="max-w-full max-h-full object-contain" /></div><span className="text-white font-black text-xs">{item.name}</span></td>
                                  <td className="p-6 text-slate-500 text-[11px] font-mono truncate max-w-xs">{item.website || 'N/A'}</td>
                                </>
                              )}
                              <td className="p-6">
                                <div className="flex items-center justify-center gap-1.5">
                                  {activePage === 'trash' ? (
                                    <button onClick={() => { db.addItem(item.originalStore, item, false); db.deleteItem('trash', item.id, false); addToast("تمت استعادة السجل", "success"); }} className="p-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"><RotateCcw size={18} /></button>
                                  ) : (
                                    <>
                                      {hasPermission(activePage, 'edit') && !['activity', 'messages'].includes(activePage) && <button onClick={() => setShowModal({ store: activePage, mode: 'edit', data: item })} className="p-2.5 text-slate-400 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl transition-all"><Edit3 size={18} /></button>}
                                      {hasPermission(activePage, 'delete') && <button onClick={() => handleDelete(activePage, item.id)} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>}
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredItems.length === 0 && <div className="p-32 text-center flex flex-col items-center gap-6 text-slate-700 animate-in fade-in zoom-in"><div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5"><Search size={48} /></div><div><p className="font-black text-2xl text-slate-500">لا توجد سجلات مطابقة</p><p className="text-[10px] uppercase tracking-[0.5em] mt-2">Zero_Data_Found</p></div></div>}
                    </div>
                  </div>
                  <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
                </div>
              )}

              {activePage === 'gallery' && (
                <div className="space-y-12">
                   <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                      <div><h2 className="text-3xl font-[1000] text-white">معرض العمليات</h2><p className="text-slate-500 text-[10px] font-black uppercase mt-2 tracking-widest">Visual Assets Database</p></div>
                      {hasPermission('gallery', 'add') && (
                        <button onClick={() => {
                          const inp = document.createElement('input'); inp.type='file'; inp.multiple=true; inp.onchange=async(e:any)=>{
                            if(e.target.files){ setLoading(true); await db.uploadMediaBatch('gallery', Array.from(e.target.files)); addToast("تم رفع الوسائط بنجاح"); setLoading(false); }
                          }; inp.click();
                        }} className="bg-yellow-500 text-slate-950 px-10 py-4 rounded-2xl font-[1000] text-sm flex items-center gap-4 hover:bg-white transition-all shadow-3xl shadow-yellow-500/10 active:scale-95"><FolderUp size={24} /> رفع وسائط جديدة</button>
                      )}
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
                    {gallery.map(item => (
                      <div key={item.id} className="aspect-square bg-slate-900 rounded-[2rem] overflow-hidden relative group border border-white/5 shadow-xl">
                         <img src={item.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125" loading="lazy" />
                         <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                            <button onClick={() => handleDelete('gallery', item.id)} className="p-4 bg-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-90"><Trash2 size={24} /></button>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePage === 'settings' && (
                <div className="max-w-3xl space-y-10 animate-in fade-in duration-500">
                   <div className="bg-slate-900/60 p-10 md:p-14 rounded-[3.5rem] border border-white/5 space-y-12 shadow-3xl">
                      <div className="flex items-center justify-between border-b border-white/5 pb-10">
                        <div className="flex items-center gap-4"><div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500"><Settings size={28} /></div><h3 className="text-white font-[1000] text-2xl tracking-tight">إعدادات النظام السيادية</h3></div>
                        <button onClick={() => addToast("تم تفعيل التغييرات")} className="bg-yellow-500 text-slate-950 px-8 py-3.5 rounded-2xl font-[1000] text-sm shadow-2xl active:scale-95 hover:bg-white transition-all"><Save size={20} className="inline ml-3" /> حفظ التغييرات</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase pr-2 tracking-widest">Site_Identity_URI</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-[11px] font-mono focus:border-yellow-500 transition-all outline-none" value={settings.logo} onChange={e => db.updateSettings({ logo: e.target.value })} /></div>
                         <div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase pr-2 tracking-widest">Maintenance_Protocol</label>
                           <button onClick={() => db.updateSettings({ maintenanceMode: !settings.maintenanceMode })} className={`w-full p-5 rounded-2xl font-black text-xs flex items-center justify-between border transition-all ${settings.maintenanceMode ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.15)]' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'}`}>
                             <span className="flex items-center gap-3">{settings.maintenanceMode ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />} {settings.maintenanceMode ? "وضع الصيانة نشط" : "النظام متاح للعموم"}</span><div className={`w-2 h-2 rounded-full ${settings.maintenanceMode ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                           </button>
                         </div>
                      </div>
                      <div className="space-y-4"><label className="text-[10px] font-black text-slate-500 uppercase pr-2 tracking-widest">Global_Announcement_Banner</label><textarea rows={3} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white font-bold text-xs focus:border-yellow-500 outline-none resize-none" placeholder="اكتب إعلاناً سيظهر في أعلى الموقع لجميع الزوار..." value={settings.announcement} onChange={e => db.updateSettings({ announcement: e.target.value })} /></div>
                      <div className="p-8 bg-yellow-500/5 border border-yellow-500/10 rounded-[2rem] flex items-start gap-6"><ShieldAlert className="text-yellow-500 shrink-0 mt-1" size={24} /><div><h5 className="text-yellow-500 font-black text-sm mb-2">تنبيه بروتوكول الأمان</h5><p className="text-[11px] text-slate-400 font-bold leading-relaxed">أي تغيير في هذه الإعدادات سيتم تسجيله فوراً في سجل النشاطات الرقمي وسيؤثر بشكل لحظي على جميع جلسات المستخدمين الحالية.</p></div></div>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Enterprise Multi-Functional Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_100px_150px_rgba(0,0,0,0.7)] flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-2xl bg-yellow-500 flex items-center justify-center text-slate-950 shadow-lg"><Database size={22} /></div><h3 className="text-xl font-black text-white">{showModal.mode === 'add' ? 'إضافة سجل جديد' : 'تعديل السجل الرقمي'}</h3></div>
              <button onClick={() => { setShowModal(null); setPreviewUrl(null); }} className="p-3 text-slate-500 hover:text-white transition-all"><X size={28} /></button>
            </div>
            <div className="p-8 md:p-12 overflow-y-auto no-scrollbar space-y-10">
               {showModal.store === 'projects' && (
                 <>
                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">عنوان المهمة الهندسية</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs focus:border-yellow-500 outline-none" value={showModal.data.title} onChange={e => setShowModal({...showModal, data: {...showModal.data, title: e.target.value}})} /></div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">حالة المشروع</label><select className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-black text-xs focus:border-yellow-500 outline-none" value={showModal.data.status} onChange={e => setShowModal({...showModal, data: {...showModal.data, status: e.target.value}})}><option value="published">منشور</option><option value="draft">مسودة</option><option value="archived">مؤرشف</option></select></div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">القطاع</label><select className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-black text-xs" value={showModal.data.category} onChange={e => setShowModal({...showModal, data: {...showModal.data, category: e.target.value}})}><option>أتمتة</option><option>طاقة</option><option>صيانة</option><option>توليد</option><option>لوحات</option></select></div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">الموقع الميداني</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs" value={showModal.data.location} onChange={e => setShowModal({...showModal, data: {...showModal.data, location: e.target.value}})} /></div>
                   </div>
                   <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">التوثيق الفني للمشروع</label><textarea rows={3} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs resize-none focus:border-yellow-500 outline-none" value={showModal.data.description} onChange={e => setShowModal({...showModal, data: {...showModal.data, description: e.target.value}})} /></div>
                 </>
               )}
               {showModal.store === 'users' && (
                 <>
                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">الاسم التشغيلي</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs" value={showModal.data.name} onChange={e => setShowModal({...showModal, data: {...showModal.data, name: e.target.value}})} /></div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">المستوى الوظيفي</label><select className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-black text-xs" value={showModal.data.role} onChange={e => setShowModal({...showModal, data: {...showModal.data, role: e.target.value}})}><option value="EDITOR">محرر بيانات</option><option value="ADMIN">مدير عمليات</option><option value="VIEWER">مشاهد تقارير</option></select></div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">معرف الدخول (ID)</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs" value={showModal.data.username} onChange={e => setShowModal({...showModal, data: {...showModal.data, username: e.target.value}})} /></div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">مفتاح التشفير (Password)</label><input type="password" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs" value={showModal.data.password} onChange={e => setShowModal({...showModal, data: {...showModal.data, password: e.target.value}})} /></div>
                   </div>
                 </>
               )}
               {showModal.store === 'partners' && (
                 <>
                   <div className="space-y-4"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">الاسم التجاري للمؤسسة</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs" value={showModal.data.name} onChange={e => setShowModal({...showModal, data: {...showModal.data, name: e.target.value}})} /></div>
                   <div className="space-y-4"><label className="text-[10px] font-black text-slate-500 uppercase pr-2">الرابط الرقمي</label><input className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold text-xs font-mono" value={showModal.data.website} onChange={e => setShowModal({...showModal, data: {...showModal.data, website: e.target.value}})} /></div>
                 </>
               )}
               
               {/* Global Visual Asset Picker */}
               {(showModal.store !== 'users') && (
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase pr-2">التوثيق المرئي الرئيسي</label>
                    <div className="h-48 md:h-64 bg-slate-950 rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center relative overflow-hidden group/img cursor-pointer hover:border-yellow-500/40 transition-all">
                       {(previewUrl || showModal.data.image || showModal.data.logo) ? (
                         <img src={previewUrl || showModal.data.image || showModal.data.logo} className="w-full h-full object-cover" />
                       ) : <div className="flex flex-col items-center text-slate-700 gap-4"><Upload size={40} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">INITIATE_UPLOAD</span></div>}
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileSelect} />
                       <div className="absolute inset-0 bg-yellow-500/90 transition-all flex items-center justify-center opacity-0 group-hover/img:opacity-100 text-slate-950 font-[1000] text-sm pointer-events-none">تبديل الملف الرقمي</div>
                    </div>
                 </div>
               )}
            </div>
            <div className="p-8 border-t border-white/5 flex gap-5 bg-white/[0.02]">
              <button onClick={() => { setShowModal(null); setPreviewUrl(null); }} className="flex-1 bg-white/5 text-slate-400 py-5 rounded-2xl font-black text-xs hover:text-white transition-all uppercase tracking-widest">Cancel</button>
              <button onClick={handleSaveModal} className="flex-[2] bg-yellow-500 text-slate-950 py-5 rounded-2xl font-[1000] text-sm hover:bg-white transition-all active:scale-95 shadow-3xl shadow-yellow-500/10 uppercase tracking-widest">Execute_Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Global Status Notifications */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-[100000] flex flex-col gap-3 w-[90%] md:w-auto">
        {toasts.map(t => (
          <div key={t.id} className={`px-8 py-5 rounded-[1.5rem] shadow-3xl flex items-center gap-5 animate-in slide-in-from-bottom-5 border-l-4 ${t.type === 'error' ? 'bg-slate-900 border-rose-500 text-rose-500' : 'bg-slate-900 border-yellow-500 text-yellow-500'}`}>
             {t.type === 'error' ? <ShieldAlert size={22} /> : <CheckCircle2 size={22} />}
             <span className="text-xs font-black tracking-tight">{t.msg}</span>
             <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="mr-auto text-slate-600 hover:text-white transition-colors"><X size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Dashboard);
