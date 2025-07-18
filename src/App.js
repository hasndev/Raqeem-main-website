import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Menu, X, Code, Bot, Layout, Cloud, GraduationCap, PenTool, BrainCircuit, Users, Send, Phone, MapPin, Mail, Languages, Building, GitBranch, Linkedin, Twitter, Instagram } from 'lucide-react';

// --- i18n (Internationalization) Content ---
const content = {
  en: {
    lang: 'EN',
    dir: 'ltr',
    mission: {
      line1: 'Build Software.',
      line2: 'Build People.',
      line3: 'Lead the Future.',
    },
    nav: {
        about: 'About Us',
        solutions: 'Solutions',
        academy: 'Academy',
        contact: 'Contact Us',
    },
    hero: {
      ctaProject: 'Start a Project',
      ctaAcademy: 'Join the Academy',
    },
    about: {
        title: 'About Raqeem',
        story: {
            title: 'Our Story',
            content: 'Born in Maysan, Iraq, Raqeem is an ambitious startup created to bridge the gap between advanced technology and local market needs. We operate on a unique, integrated "Solutions & Academy" model. We don\'t just build innovative software; we build the people who will lead Iraq\'s digital future.'
        },
        mission: {
            title: 'Our Vision & Mission',
            content: 'Our vision is to be the leading catalyst for digital transformation in Iraq. Our mission is to deliver high-quality software solutions while developing the next generation of tech professionals through advanced, practical training.'
        }
    },
    solutions: {
      title: 'We Build Software That Drives Innovation',
      cards: [
        { icon: 'Code', title: 'Web & Mobile Apps', description: 'Crafting responsive, high-performance applications for all platforms.' },
        { icon: 'BrainCircuit', title: 'AI Solutions', description: 'Integrating intelligent algorithms to automate processes and derive insights.' },
        { icon: 'Building', title: 'Government Systems', description: 'Developing secure, scalable, and efficient digital infrastructure for public services.' },
        { icon: 'PenTool', title: 'UI/UX & Cloud', description: 'Designing intuitive interfaces and deploying robust cloud-native solutions.' },
      ],
    },
    academy: {
      title: 'Train With Us. Launch Your Career.',
      tabs: [
        { name: 'Web Development', icon: 'GitBranch', description: 'Master front-end and back-end technologies to build modern, full-stack web applications.', cta: 'Apply Now' },
        { name: 'Mobile Development', icon: 'Code', description: 'Learn to build beautiful and performant native mobile apps for iOS and Android.', cta: 'Apply Now' },
        { name: 'AI & Data Science', icon: 'Bot', description: 'Dive into the world of artificial intelligence, machine learning, and data analytics.', cta: 'Apply Now' },
      ],
    },
    contact: {
      title: 'Let\'s Build Together',
      description: 'Have a project in mind or want to join our academy? We’d love to hear from you.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Your Message',
        upload: 'Attach a file (optional)',
        send: 'Send Message',
      },
      info: {
        address: 'Maysan, Iraq',
        email: 'contact@raqeem.iq',
        phone: '+964 782 171 7773',
        mapLinkText: 'View on Google Maps',
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Raqeem. All Rights Reserved.`,
    },
  },
  ar: {
    lang: 'AR',
    dir: 'rtl',
    mission: {
      line1: 'نبني البرمجيات.',
      line2: 'نبني الإنسان.',
      line3: 'نقود المستقبل.',
    },
    nav: {
        about: 'من نحن',
        solutions: 'الحلول',
        academy: 'الأكاديمية',
        contact: 'تواصل معنا',
    },
    hero: {
      ctaProject: 'ابدأ مشروعاً',
      ctaAcademy: 'انضم للأكاديمية',
    },
    about: {
        title: 'عن رقيم',
        story: {
            title: 'قصتنا',
            content: 'وُلدت رقيم في ميسان، العراق، كشركة ناشئة طموحة لسد الفجوة بين التكنولوجيا المتقدمة واحتياجات السوق المحلية. نعمل بنموذج فريد ومتكامل يجمع بين "الحلول والأكاديمية". نحن لا نكتفي ببناء برمجيات مبتكرة فحسب، بل نبني أيضًا الإنسان الذي سيقود مستقبل العراق الرقمي.'
        },
        mission: {
            title: 'رؤيتنا ورسالتنا',
            content: 'رؤيتنا هي أن نكون المحفز الرائد للتحول الرقمي في العراق. ورسالتنا هي تقديم حلول برمجية عالية الجودة مع تطوير الجيل القادم من محترفي التكنولوجيا من خلال تدريب عملي متقدم.'
        }
    },
    solutions: {
      title: 'نبني برمجيات تقود الابتكار',
      cards: [
        { icon: 'Code', title: 'تطبيقات الويب والموبايل', description: 'صياغة تطبيقات سريعة الاستجابة وعالية الأداء لجميع المنصات.' },
        { icon: 'BrainCircuit', title: 'حلول الذكاء الاصطناعي', description: 'دمج خوارزميات ذكية لأتمتة العمليات واستخلاص الرؤى.' },
        { icon: 'Building', title: 'الأنظمة الحكومية', description: 'تطوير بنية تحتية رقمية آمنة وقابلة للتطوير وفعالة للخدمات العامة.' },
        { icon: 'PenTool', title: 'تصميم وتطوير سحابي', description: 'تصميم واجهات سهلة الاستخدام ونشر حلول سحابية قوية.' },
      ],
    },
    academy: {
      title: 'تدرّب معنا. أطلق مسيرتك المهنية.',
      tabs: [
        { name: 'مسار تطوير الويب', icon: 'GitBranch', description: 'أتقن تقنيات الواجهات الأمامية والخلفية لبناء تطبيقات ويب حديثة ومتكاملة.', cta: 'سجل الآن' },
        { name: 'مسار تطوير الموبايل', icon: 'Code', description: 'تعلم بناء تطبيقات جوال أصلية جميلة وعالية الأداء لأنظمة iOS و Android.', cta: 'سجل الآن' },
        { name: 'مسار الذكاء الاصطناعي', icon: 'Bot', description: 'انغمس في عالم الذكاء الاصطناعي وتعلم الآلة وتحليلات البيانات.', cta: 'سجل الآن' },
      ],
    },
    contact: {
      title: 'لنبدأ البناء معاً',
      description: 'هل لديك مشروع في ذهنك أو ترغب في الانضمام إلى أكاديميتنا؟ يسعدنا أن نسمع منك.',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        upload: 'إرفاق ملف (اختياري)',
        send: 'إرسال الرسالة',
      },
      info: {
        address: 'ميسان، العراق',
        email: 'contact@raqeem.iq',
        phone: '+964 782 171 7773',
        mapLinkText: 'عرض على خرائط جوجل',
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} رقيم. جميع الحقوق محفوظة.`,
    },
  },
};

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [texts, setTexts] = useState(content.en);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    setTexts(content[newLang]);
    document.documentElement.lang = newLang;
    document.documentElement.dir = content[newLang].dir;
  };

  return (
    <LanguageContext.Provider value={{ language, texts, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

const Icon = ({ name, ...props }) => {
    const icons = {
        Code, Bot, Layout, Cloud, GraduationCap, PenTool, BrainCircuit, Users, GitBranch,
    };
    const IconComponent = icons[name];
    return IconComponent ? <IconComponent {...props} /> : null;
};

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

const MainContent = () => {
    const { texts } = useLanguage();

    return (
        <div className="bg-[#0a0a0a] text-gray-200 font-sans" dir={texts.dir}>
            <div className="absolute inset-0 overflow-hidden -z-0">
                <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-gradient-to-tr from-[#6610f2]/20 to-transparent rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-gradient-to-bl from-[#ffd60a]/10 to-transparent rounded-full animate-pulse-slow-delayed"></div>
            </div>
            
            <div className="relative z-10">
                <Header />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <SolutionsSection />
                    <AcademySection />
                    <ContactSection />
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </div>
    );
};

const Header = () => {
    const { texts, toggleLanguage } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', text: texts.nav.about },
        { href: '#solutions', text: texts.nav.solutions },
        { href: '#academy', text: texts.nav.academy },
        { href: '#contact', text: texts.nav.contact },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-lg shadow-lg shadow-indigo-500/10' : 'bg-transparent'}`}>
            <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
                <motion.div whileHover={{ scale: 1.05 }} className="text-3xl font-bold tracking-wider text-white">
                    Raqeem<span className="text-[#ffd60a]">.</span>
                </motion.div>
                
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">{link.text}</a>
                    ))}
                    <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 border border-gray-600 rounded-full text-sm hover:bg-gray-800 transition-colors">
                        <Languages size={16} />
                        <span>{texts.lang}</span>
                    </button>
                </nav>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-[#111] absolute top-full left-0 w-full"
                    >
                        <nav className="flex flex-col items-center gap-4 py-6">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">{link.text}</a>
                            ))}
                            <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} className="flex items-center gap-2 mt-4 px-4 py-2 border border-gray-600 rounded-full text-base hover:bg-gray-800 transition-colors">
                                <Languages size={18} />
                                <span>{texts.lang}</span>
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const HeroSection = () => {
    const { texts } = useLanguage();
    const mission = [texts.mission.line1, texts.mission.line2, texts.mission.line3];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="min-h-screen flex items-center justify-center container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                    className="text-center md:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        {mission.map((line, index) => (
                            <motion.span key={index} variants={itemVariants} className="block">
                                {line}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.div 
                        variants={itemVariants} 
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(102, 16, 242, 0.5)' }} whileTap={{ scale: 0.95 }} className="bg-[#6610f2] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                            {texts.hero.ctaProject} <ArrowUpRight />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 214, 10, 0.5)' }} whileTap={{ scale: 0.95 }} className="bg-transparent border-2 border-[#ffd60a] text-[#ffd60a] font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                            {texts.hero.ctaAcademy} <GraduationCap />
                        </motion.button>
                    </motion.div>
                </motion.div>
                <div className="flex items-center justify-center">
                    <AnimatedVisual />
                </div>
            </div>
        </section>
    );
};

const AnimatedVisual = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } }}
            className="w-full max-w-md aspect-square relative"
        >
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#6610f2', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#ffd60a', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <motion.circle cx="200" cy="200" r="180" stroke="url(#grad1)" strokeWidth="4" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }} />
                <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}>
                    <motion.circle cx="200" cy="60" r="15" fill="#6610f2" animate={{ y: [60, 70, 60], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
                    <motion.rect x="320" y="190" width="30" height="30" rx="5" fill="#ffd60a" animate={{ x: [320, 310, 320], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} />
                    <motion.path d="M 80 300 L 100 320 L 80 340 Z" fill="#6610f2" animate={{ x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} />
                </motion.g>
                 <motion.g animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>
                    <Code size={48} x="176" y="176" className="text-[#6610f2]/50" />
                    <Users size={48} x="80" y="120" className="text-[#ffd60a]/50" />
                    <BrainCircuit size={48} x="270" y="250" className="text-white/30" />
                </motion.g>
            </svg>
        </motion.div>
    );
};

const AnimatedSection = ({ children, id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id={id} ref={ref} className="container mx-auto px-4 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }}>
                {children}
            </motion.div>
        </section>
    );
};

const AboutSection = () => {
    const { texts } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <AnimatedSection id="about">
            <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="flex justify-center">
                     <div className="w-full max-w-sm aspect-square relative">
                        <svg viewBox="0 0 400 400" className="w-full h-full">
                            <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}>
                                <motion.path d="M 200, 50 a 150,150 0 1,1 0,300 a 150,150 0 1,1 0,-300" fill="none" stroke="rgba(102, 16, 242, 0.4)" strokeWidth="2" strokeDasharray="5 10" />
                                <motion.path d="M 200, 100 a 100,100 0 1,1 0,200 a 100,100 0 1,1 0,-200" fill="none" stroke="rgba(255, 214, 10, 0.4)" strokeWidth="2" strokeDasharray="1 8" />
                            </motion.g>
                            <Building size={64} x="168" y="168" className="text-white/70" />
                        </svg>
                     </div>
                </motion.div>

                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <h3 className="text-3xl font-bold mb-3 text-[#ffd60a]">{texts.about.story.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{texts.about.story.content}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}>
                        <h3 className="text-3xl font-bold mb-3 text-[#ffd60a]">{texts.about.mission.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{texts.about.mission.content}</p>
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const SolutionsSection = () => {
    const { texts } = useLanguage();

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' } })
    };

    return (
        <AnimatedSection id="solutions">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{texts.solutions.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {texts.solutions.cards.map((card, i) => (
                    <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(102, 16, 242, 0.2), 0 10px 10px -5px rgba(102, 16, 242, 0.1)' }} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 transition-all duration-300 cursor-pointer">
                        <div className="mb-4">
                            <Icon name={card.icon} size={40} className="text-[#6610f2]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                        <p className="text-gray-400">{card.description}</p>
                    </motion.div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const AcademySection = () => {
    const { texts } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <AnimatedSection id="academy">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{texts.academy.title}</h2>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8 border-b border-gray-800">
                    {texts.academy.tabs.map((tab, index) => (
                        <button key={index} onClick={() => setActiveTab(index)} className={`px-4 py-3 text-sm md:text-base font-medium transition-colors duration-300 relative ${activeTab === index ? 'text-[#ffd60a]' : 'text-gray-400 hover:text-white'}`}>
                            {tab.name}
                            {activeTab === index && (
                                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd60a]" layoutId="underline" />
                            )}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }} className="text-center bg-gray-900/30 p-8 md:p-12 rounded-2xl">
                        <div className="flex justify-center mb-4">
                            <Icon name={texts.academy.tabs[activeTab].icon} size={48} className="text-[#ffd60a]" />
                        </div>
                        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">{texts.academy.tabs[activeTab].description}</p>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#ffd60a] text-black font-bold py-3 px-8 rounded-full transition-all duration-300">
                            {texts.academy.tabs[activeTab].cta}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </AnimatedSection>
    );
};

const ContactSection = () => {
    const { texts } = useLanguage();

    return (
        <AnimatedSection id="contact">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">{texts.contact.title}</h2>
                <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">{texts.contact.description}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
                <form className="space-y-6">
                    <div className="relative">
                        <input type="text" id="name" className="peer block w-full bg-transparent border-b-2 border-gray-600 focus:border-[#6610f2] pt-4 pb-2 text-lg text-white outline-none" placeholder=" " />
                        <label htmlFor="name" className="absolute top-4 start-0 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-[#6610f2] peer-focus:text-sm">{texts.contact.form.name}</label>
                    </div>
                    <div className="relative">
                        <input type="email" id="email" className="peer block w-full bg-transparent border-b-2 border-gray-600 focus:border-[#6610f2] pt-4 pb-2 text-lg text-white outline-none" placeholder=" " />
                        <label htmlFor="email" className="absolute top-4 start-0 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-[#6610f2] peer-focus:text-sm">{texts.contact.form.email}</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="subject" className="peer block w-full bg-transparent border-b-2 border-gray-600 focus:border-[#6610f2] pt-4 pb-2 text-lg text-white outline-none" placeholder=" " />
                        <label htmlFor="subject" className="absolute top-4 start-0 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-[#6610f2] peer-focus:text-sm">{texts.contact.form.subject}</label>
                    </div>
                    <div className="relative">
                        <textarea id="message" rows="4" className="peer block w-full bg-transparent border-b-2 border-gray-600 focus:border-[#6610f2] pt-4 pb-2 text-lg text-white outline-none" placeholder=" "></textarea>
                        <label htmlFor="message" className="absolute top-4 start-0 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-[#6610f2] peer-focus:text-sm">{texts.contact.form.message}</label>
                    </div>
                    <div>
                        <label htmlFor="file-upload" className="text-gray-400">{texts.contact.form.upload}</label>
                        <input type="file" id="file-upload" className="block w-full text-sm text-gray-400 file:me-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6610f2]/20 file:text-[#6610f2] hover:file:bg-[#6610f2]/30 mt-2"/>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(102, 16, 242, 0.5)' }} whileTap={{ scale: 0.95 }} className="w-full bg-[#6610f2] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                        {texts.contact.form.send} <Send size={18} />
                    </motion.button>
                </form>

                <div className="flex flex-col justify-between">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54229.86686465698!2d47.15235465!3d31.84223585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fe7eb23f8f9f7db%3A0xab6a556afbaa1ebd!2sAmarah%2C%20Maysan%20Governorate!5e0!3m2!1sen!2siq!4v1752819044029!5m2!1sen!2siq" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div className="mt-8 space-y-4 text-lg">
                        <a href={`mailto:${texts.contact.info.email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                            <Mail size={24} className="text-[#ffd60a]" />
                            <span>{texts.contact.info.email}</span>
                        </a>
                        <a href={`tel:${texts.contact.info.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                            <Phone size={24} className="text-[#ffd60a]" />
                            <span>{texts.contact.info.phone}</span>
                        </a>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Footer = () => {
    const { texts } = useLanguage();
    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-bj-773m/' },
        { icon: Twitter, href: '#' },
        { icon: Instagram, href: '#' },
    ];

    return (
        <footer className="bg-gray-900/50 border-t border-gray-800">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-400 text-sm text-center md:text-left">{texts.footer.copyright}</p>
                <div className="flex items-center gap-6">
                    {socialLinks.map((link, i) => (
                        <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6610f2] transition-colors">
                            <link.icon size={24} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

const WhatsAppButton = () => {
    return (
        <motion.a 
            href="https://wa.me/9647821717773"
            target="_blank" 
            rel="noopener noreferrer" 
            className="fixed bottom-6 end-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
        </motion.a>
    );
};

export default App;
