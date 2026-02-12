
import React, { useState, useEffect, useCallback, memo, useMemo, Suspense, lazy } from 'react';
import { Settings } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Specializations from './components/Specializations';
import LoadingScreen from './components/LoadingScreen';
import WhyUs from './components/WhyUs';
import EngineeringGallery from './components/EngineeringGallery';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';
import FloatingAI from './components/FloatingAI';
import ScrollToTop from './components/ScrollToTop';
import EngineeringProcess from './components/EngineeringProcess';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import ClientQuotes from './components/ClientQuotes';
import { db } from './db';

// Lazy Loaded Sections for Performance Optimization
const AllProjects = lazy(() => import('./components/AllProjects'));
const ProjectDetailView = lazy(() => import('./components/ProjectDetailView'));
const GalleryArchive = lazy(() => import('./components/GalleryArchive'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const NotFound = lazy(() => import('./components/NotFound'));

type PageType = 'home' | 'all-projects' | 'project-details' | '404' | 'gallery-archive';

const SectionWrapper = memo(({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <section 
    id={id} 
    className={`relative py-12 md:py-16 overflow-hidden border-b border-slate-100 dark:border-white/[0.02] gpu ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent opacity-20 z-20"></div>
    <div className="relative z-10 container mx-auto px-4 md:px-8">
      {children}
    </div>
  </section>
));

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      await db.initializeDefaults();
      db.initNotifications();
    };
    init();

    const unsubs = [
      db.listenSettings(setSiteSettings),
      db.listenProjects(setProjects),
      db.listenGallery(setGallery),
      db.listenPartners(() => {}) // Keeping internal listeners clean
    ];
    
    const timer = setTimeout(() => setIsAppReady(true), 1000);

    return () => {
      unsubs.forEach(unsub => unsub());
      clearTimeout(timer);
    };
  }, []);

  const openProjectDetails = useCallback((project: any) => {
    setSelectedProject(project);
    setCurrentPage('project-details');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBackFromDetails = useCallback(() => {
    setCurrentPage('home');
    setSelectedProject(null);
  }, []);

  const handlePageChange = useCallback((page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleDashboard = useCallback(() => setShowDashboard(prev => !prev), []);

  if (isAppReady && siteSettings.maintenanceMode && !showDashboard) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
          <Settings className="w-8 h-8 text-slate-950" />
        </div>
        <h1 className="text-white text-2xl font-black mb-3">الموقع تحت الصيانة الدورية</h1>
        <p className="text-slate-500 max-w-md font-bold text-sm mb-8">نقوم حالياً بتحديث المنصة لضمان أفضل أداء تشغيلي.</p>
        <button onClick={toggleDashboard} className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">System Authentication</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 relative">
      <LoadingScreen logoUrl={siteSettings.logo || 'https://engaliareeki.github.io/web/assets/images/logo.png'} isVisible={!isAppReady} />
      
      <div className={`flex-grow transition-opacity duration-300 ${isAppReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          onLogoClick={toggleDashboard} 
          logoUrl={siteSettings.logo} 
          onPageChange={handlePageChange} 
          currentPage={currentPage} 
        />
        
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen logoUrl={siteSettings.logo} isVisible={true} />}>
            {currentPage === 'home' ? (
              <>
                <Hero heroImageUrl={siteSettings.heroImage} />
                <SectionWrapper id="specializations">
                  <Specializations />
                </SectionWrapper>
                
                <div className="bg-slate-50/30 dark:bg-slate-900/10">
                  <SectionWrapper id="portfolio" className="!pb-0">
                    <Portfolio projects={projects} onViewAll={() => handlePageChange('all-projects')} onProjectClick={openProjectDetails} />
                  </SectionWrapper>
                  <SectionWrapper id="gallery" className="!pt-0">
                    <EngineeringGallery 
                      galleryItems={gallery} 
                      logoUrl={siteSettings.logo || ''} 
                      onOpenArchive={() => handlePageChange('gallery-archive')}
                    />
                  </SectionWrapper>
                </div>

                <div className="dark bg-slate-950">
                  <SectionWrapper id="why-us">
                    <WhyUs features={[]} />
                  </SectionWrapper>
                  <SectionWrapper id="steps" className="!pt-0">
                    <EngineeringProcess steps={[
                      { t: "التحليل الميداني", d: "دراسة شاملة للموقع وتحديد المتطلبات التقنية بدقة.", icon: "🔍", n: "01" },
                      { t: "التصميم البرمجي", d: "تطوير أكواد التحكم واختيار المكونات الكهربائية المناسبة.", icon: "💻", n: "02" },
                      { t: "التنفيذ والتركيب", d: "تركيب المعدات وإجراء التوصيلات وفق المعايير العالمية.", icon: "⚡", n: "03" },
                      { t: "التشغيل والتدريب", d: "بدء الإنتاج الفعلي وتدريب طاقمكم على التشغيل الصحيح.", icon: "🚀", n: "04" }
                    ]} />
                  </SectionWrapper>
                  <SectionWrapper id="statistics" className="!py-0">
                    <Testimonials partners={[]} />
                  </SectionWrapper>
                  <Partners />
                  <ClientQuotes testimonials={[
                    { id: 1, name: "م. خالد عبدالله", position: "مدير الصيانة", company: "مصنع الإسمنت الوطني", content: "فريق العريقي أثبت كفاءة منقطعة النظير في أتمتة خطوط الإنتاج لدينا.", rating: 5, avatar: "🏗️" },
                    { id: 2, name: "أ. محمد صالح", position: "المدير التنفيذي", company: "مجموعة هائل سعيد", content: "الاعتمادية والسرعة في التنفيذ هي ما يميز المهندس علي وفريقه.", rating: 5, avatar: "⚡" }
                  ]} />
                  <SectionWrapper id="faq">
                    <FAQ faqs={[
                      { question: 'ما هي المناطق التي تغطيها خدماتكم؟', answer: 'نغطي كافة محافظات الجمهورية اليمنية مع جاهزية تامة للتحرك الميداني السريع.' },
                      { question: 'هل توفرون ضمانات على قطع الغيار؟', answer: 'نعم، كافة قطع الغيار المستخدمة أصلية ومشمولة بضمان الشركة المصنعة بالإضافة لضمان التركيب.' }
                    ]} />
                  </SectionWrapper>
                  <SectionWrapper id="contact-hub">
                    <Contact />
                    <ContactInfo />
                  </SectionWrapper>
                </div>
              </>
            ) : currentPage === 'all-projects' ? (
              <AllProjects projects={projects} onBack={() => handlePageChange('home')} onProjectClick={openProjectDetails} />
            ) : currentPage === 'project-details' ? (
              <ProjectDetailView project={selectedProject} allProjects={projects} onProjectClick={openProjectDetails} onBack={handleBackFromDetails} />
            ) : currentPage === 'gallery-archive' ? (
              <GalleryArchive galleryItems={gallery} logoUrl={siteSettings.logo || ''} onBack={() => handlePageChange('home')} />
            ) : (
              <NotFound onBackHome={() => handlePageChange('home')} />
            )}
          </Suspense>
        </main>
        <Footer onAdminClick={toggleDashboard} logoUrl={siteSettings.logo} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="pointer-events-auto"><FloatingAI /></div>
        <div className="pointer-events-auto"><ScrollToTop /></div>
      </div>
      
      {showDashboard && (
        <Suspense fallback={<div className="fixed inset-0 bg-slate-950 z-[10005]" />}>
          <Dashboard onClose={() => setShowDashboard(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
