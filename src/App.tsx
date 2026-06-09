import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Compass, BrainCircuit, Award, Terminal, LayoutDashboard, 
  HelpCircle, User, CreditCard, Users, Mail, Send, Cpu, LogIn, ChevronRight, LogOut, FileText,
  Settings, Sliders, Volume2, Shield, Home, Grid, Briefcase, Clock, Check, Search, MapPin, TrendingUp,
  X, Mic, ShieldCheck
} from "lucide-react";

import Lenis from "lenis";
import LandingPage from "./components/LandingPage";
import CareerCoach from "./components/CareerCoach";
import LivingPortfolio from "./components/LivingPortfolio";
import CareerSimulation from "./components/CareerSimulation";
import InterviewSimulator from "./components/InterviewSimulator";
import SkillGalaxyMap from "./components/SkillGalaxyMap";
import AuthScreen from "./components/AuthScreen";
import EmployerDashboard from "./components/EmployerDashboard";
import PortfolioBuilder from "./components/PortfolioBuilder";
import SpiderBackground from "./components/SpiderBackground";
import ScrollReveal from "./components/ScrollReveal";
import ScrollParallax from "./components/ScrollParallax";
import ThreeDRobotAssistant from "./components/ThreeDRobotAssistant";
import CareerPassport from "./components/CareerPassport";
import { initPassport } from "./utils/passportStore";

export default function App() {
  const [currentView, _setCurrentView] = useState("landing");
  const [viewLoading, setViewLoading] = useState(false);
  
  // Custom navigation wrapper to trigger a gorgeous iOS/Apple-style Page Calibration Transition
  const setCurrentView = (view: string) => {
    setViewLoading(true);
    setTimeout(() => {
      _setCurrentView(view);
      
      // Delay to ensure DOM completes rendering then trigger instant momentum scroll state reset
      setTimeout(() => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0 });
        }
      }, 50);
      
      setViewLoading(false);
    }, 850); // Luxurious cinematic timing
  };

  const [activeNotification, setActiveNotification] = useState<string | null>(
    "NEXUS CORE: Immersive luxury monochrome design backplane initialized."
  );
  
  // Custom chatbot side drawer
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantLogs, setAssistantLogs] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Welcome, Pioneer. I am AETHER, your custom career companion. Ask me anything about high-tier tech roadmaps, CV optimization, simulated salaries, or interviews." }
  ]);
  const [assistantLoading, setAssistantLoading] = useState(false);

  // Advanced Interactive Voice & Speech States
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any active speeches
    window.speechSynthesis.cancel();

    // Clean markdown descriptors from verbal feedback
    const plainText = text
      .replace(/#+\s+/g, '')
      .replace(/\*+/g, '')
      .replace(/`+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(plainText);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Microsoft Zira") || v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setActiveNotification("SPEECH TELEMETRY: Voice input interface not supported on this node.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        stopSpeaking();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setAssistantInput(transcript);
          handleAssistantSubmit(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Helper parser for local markdown rendering
  const parseBoldAndInlineCode = (text: string) => {
    const parts = [];
    let currentWord = "";
    let i = 0;
    
    while (i < text.length) {
      if (text.startsWith("**", i)) {
        if (currentWord) {
          parts.push(<span key={i + "_text"}>{currentWord}</span>);
          currentWord = "";
        }
        const endIdx = text.indexOf("**", i + 2);
        if (endIdx !== -1) {
          const boldText = text.substring(i + 2, endIdx);
          parts.push(<strong key={i + "_bold"} className="font-semibold text-white">{boldText}</strong>);
          i = endIdx + 2;
        } else {
          currentWord += "**";
          i += 2;
        }
      } else if (text.startsWith("`", i)) {
        if (currentWord) {
          parts.push(<span key={i + "_text"}>{currentWord}</span>);
          currentWord = "";
        }
        const endIdx = text.indexOf("`", i + 1);
        if (endIdx !== -1) {
          const codeText = text.substring(i + 1, endIdx);
          parts.push(
            <code key={i + "_code"} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-[#F4DFC8]">
              {codeText}
            </code>
          );
          i = endIdx + 1;
        } else {
          currentWord += "`";
          i += 1;
        }
      } else {
        currentWord += text[i];
        i++;
      }
    }
    if (currentWord) {
      parts.push(<span key={i + "_end"}>{currentWord}</span>);
    }
    return parts.length > 0 ? parts : text;
  };

  const formatMarkdownToJSX = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={lineIdx} className="text-xs font-mono font-extrabold text-luxury-gold uppercase tracking-wider mt-4 mb-2 first:mt-0">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={lineIdx} className="text-sm font-mono font-extrabold text-white uppercase tracking-widest mt-5 mb-3">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const cleanLine = line.replace(/^\s*[\*\-]\s+/, "");
        return (
          <li key={lineIdx} className="list-none flex items-start gap-1.5 text-slate-300 text-[11px] leading-relaxed my-1">
            <span className="text-luxury-gold font-mono mt-1 text-[7px]">▶</span>
            <span>{parseBoldAndInlineCode(cleanLine)}</span>
          </li>
        );
      }
      const numMatch = line.trim().match(/^\d+\.\s+(.*)/);
      if (numMatch) {
         return (
           <div key={lineIdx} className="flex items-start gap-2 text-slate-300 text-[11px] leading-relaxed my-1 pl-1">
             <span className="text-luxury-gold font-mono font-bold text-[9px]">{line.trim().match(/^\d+\./)?.[0]}</span>
             <span>{parseBoldAndInlineCode(numMatch[1])}</span>
           </div>
         );
      }
      if (line.trim() === "") return <div key={lineIdx} className="h-2" />;
      return (
        <p key={lineIdx} className="text-slate-300 text-[11px] leading-relaxed my-2">
          {parseBoldAndInlineCode(line)}
        </p>
      );
    });
  };

  // Auth User State
  const [user, setUser] = useState<{ name: string; email: string; role: 'employer' | 'employee'; onboardingData?: any } | null>(null);

  // Candidate Dashboard specific states
  const [activeDashboardTab, setActiveDashboardTab] = useState<'overview' | 'jobs'>('overview');
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("nexus_applied_jobs");
    return saved ? JSON.parse(saved) : ["j1"];
  });
  const [candidateJobSearch, setCandidateJobSearch] = useState("");
  const [candidateJobFilter, setCandidateJobFilter] = useState<'all' | 'remote' | 'hybrid' | 'on-site'>('all');

  // Authenticated user settings modal simulation
  const [authOpen, setAuthOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Alex Vane",
    email: "chitn0188@gmail.com",
    avatarSeed: "alex"
  });

  // System Configurations State
  const [configs, setConfigs] = useState({
    themePreset: 'monochrome',      // 'monochrome' | 'holographic-cyan' | 'cosmic-violet'
    aiComplexity: 'supreme-pro',    // 'supreme-pro' | 'flash' | 'adaptive'
    audioHz: 440,                   // 432 | 440 | 528
    ambientTeasing: true,
    privacyStrict: 'military-grade', // 'military-grade' | 'fully-transparent'
    telemetryStreaming: true
  });

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(false);

  // Automatically close alert notification banner after several seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveNotification(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // --- CINEMATIC SMOOTH SCROLL & GLOBAL INTERACTIVE TRACKS ---
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorBlobRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Lenis Luxurious Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious expo curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.3,
    });

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    // Callback on scroll events
    lenis.on("scroll", () => {
      updateScrollProgress();
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    (window as any).lenis = lenis;

    // Listen to native resize for accuracy
    window.addEventListener("scroll", updateScrollProgress);
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  // Track cursor position for ambient spring backlighting and hover reactions (Direct DOM)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      if (cursorBlobRef.current) {
        cursorBlobRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isPickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.classList.contains("cursor-pointer");

      if (isPickable) {
        cursorGlowRef.current?.classList.add("hovered");
        cursorDotRef.current?.classList.add("hovered");
      } else {
        cursorGlowRef.current?.classList.remove("hovered");
        cursorDotRef.current?.classList.remove("hovered");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Helper functions for modern footer navigation with automatic premium demo login bypass
  const handleFooterNav = (view: string) => {
    if (!user) {
      // Auto login as a beautiful pre-configured seeker/candidate profile
      const demoUser = {
        name: "Alex Vane",
        email: "chitn0188@gmail.com",
        role: "employee" as const,
        onboardingData: {
          interest: "AI / ML Engineering",
          title: "AI Core Synaptic Architect",
          bio: "Architecting deep neural networks and cognitive quantum logic flows.",
          avatar: { seed: "editorial", label: "Dior Luxury Minimalist", color: "from-neutral-900 to-black" }
        }
      };
      setUser(demoUser);
      setUserProfile({
        name: demoUser.name,
        email: demoUser.email,
        avatarSeed: "alex"
      });
      setCurrentView(view);
      setActiveNotification("AUTO SYNC: Authenticated Seeker Demo for flawless navigation.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (user.role !== "employee") {
      // Automatically switch developer identity block
      setUser({
        name: "Alex Vane",
        email: "chitn0188@gmail.com",
        role: "employee",
        onboardingData: {
          interest: "AI / ML Engineering",
          title: "AI Core Synaptic Architect",
          bio: "Architecting deep neural networks and cognitive quantum logic flows.",
          avatar: { seed: "editorial", label: "Dior Luxury Minimalist", color: "from-neutral-900 to-black" }
        }
      });
      setUserProfile({
        name: "Alex Vane",
        email: "chitn0188@gmail.com",
        avatarSeed: "alex"
      });
      setCurrentView(view);
      setActiveNotification("IDENTITY SHIFT: Calibrated to Candidate Career Deck.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterEmployerNav = (view: string) => {
    if (!user) {
      // Auto login as a beautiful recruiter profile
      const demoRecruiter = {
        name: "Director Vance",
        email: "recruitment@aetheria.intelligence",
        role: "employer" as const
      };
      setUser(demoRecruiter);
      setUserProfile({
        name: demoRecruiter.name,
        email: demoRecruiter.email,
        avatarSeed: "recruiter"
      });
      setCurrentView(view);
      setActiveNotification("AUTO SYNC: Authenticated Recruiter Console for flawless navigation.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (user.role !== "employer") {
      // Automatically switch to recruiter identity block
      setUser({
        name: "Director Vance",
        email: "recruitment@aetheria.intelligence",
        role: "employer"
      });
      setUserProfile({
        name: "Director Vance",
        email: "recruitment@aetheria.intelligence",
        avatarSeed: "recruiter"
      });
      setCurrentView(view);
      setActiveNotification("IDENTITY SHIFT: Calibrated to Enterprise Recruiting Hub.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (authenticatedUser: { name: string; email: string; role: 'employer' | 'employee'; onboardingData?: any }) => {
    setUser(authenticatedUser);
    setUserProfile({
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      avatarSeed: authenticatedUser.role === 'employer' ? "recruiter" : "alex"
    });

    if (authenticatedUser.role === 'employee') {
      initPassport(
        authenticatedUser.name,
        authenticatedUser.email,
        authenticatedUser.onboardingData?.targetTitle
      );
    }

    if (authenticatedUser.role === 'employer') {
      setCurrentView("recruiter");
    } else {
      setCurrentView("dashboard");
    }
    setActiveNotification(`AUTHENTICATED SUCCESS: Loaded secure node for ${authenticatedUser.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("landing");
    setActiveNotification("NEXUS SESSION TERMINATED: Grid standby state active.");
  };

  const handleAssistantSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== "string" && e) {
      e.preventDefault();
    }
    const userPrompt = typeof e === "string" ? e : assistantInput.trim();
    if (!userPrompt) return;

    // Stop speaking when user submits a new prompt
    stopSpeaking();

    // Append user message
    setAssistantLogs(prev => [...prev, { role: "user", text: userPrompt }]);
    if (typeof e !== "string") {
      setAssistantInput("");
    }
    setAssistantLoading(true);

    // Filter and map recent history for context continuity
    const historyPayload = assistantLogs.slice(-6).map(log => ({
      role: log.role === "user" ? "user" : "assistant",
      text: log.text
    }));

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt, history: historyPayload })
      });
      if (response.ok) {
        const data = await response.json();
        const rawText = data.reply;
        setAssistantLogs(prev => [...prev, { role: "assistant", text: rawText }]);
        
        // Speak response aloud if user activated voice
        if (voiceEnabled) {
          speakText(rawText);
        }
      } else {
        setAssistantLogs(prev => [...prev, { role: "assistant", text: "Inference cycle error. Recovering node parameters, system operational." }]);
      }
    } catch (err) {
      setAssistantLogs(prev => [...prev, { role: "assistant", text: "Slight connection interference. Sandbox local simulations active." }]);
    } finally {
      setAssistantLoading(false);
    }
  };

  // Premium Page Transition Configs (Apple/Linear Blur-Fade Style)
  const pageRevealTransition = {
    initial: { opacity: 0, filter: "blur(12px)", y: 20 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(8px)", y: -20 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans relative antialiased flex flex-col justify-between overflow-x-hidden">
      
      {/* LUXURIOUS AMBIENT CURSOR INTERACTION GLOWS */}
      <div
        ref={cursorGlowRef}
        id="custom-luxury-cursor-glow"
        className="hidden md:block pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold/30 bg-luxury-gold/[0.012] mix-blend-difference z-[9999]"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={cursorDotRef}
        id="custom-luxury-cursor-dot"
        className="hidden md:block pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-luxury-gold z-[10000]"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={cursorBlobRef}
        id="custom-luxury-cursor-blob"
        className="hidden md:block pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-luxury-gold/[0.018] blur-[110px] z-[1]"
        style={{ transform: "translate3d(-300px, -300px, 0)" }}
      />

      {/* Subtle luxury scroll progress tracker */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/[0.03] z-[101] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-white transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Calibration Page Transition Loader */}
      <AnimatePresence>
        {viewLoading && (
          <motion.div
            id="global-cinematic-loader"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/75 z-[100] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border border-luxury-gold/20"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.75, 0.25] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border-t border-r border-luxury-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
              </div>

              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[9px] font-mono tracking-[0.25em] text-luxury-gold uppercase block"
                >
                  NEXUS SYSTEMS INTEGRATION
                </motion.span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-xs font-semibold uppercase tracking-wider font-display"
                >
                  Aligning Quantum Trajectories...
                </motion.p>
              </div>

              <div className="w-24 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-luxury-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive 3D Spider Canvas Background Effect */}
      <SpiderBackground />
      
      {/* GLOBAL LUXURY MONOCHROME LIGHTING */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* GLOBAL NOTIFICATION ALERT HEADER BANNER */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            id="global-alert-banner"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -45 }}
            className="w-full bg-[#050505] text-white font-mono text-[9px] md:text-xs py-2.5 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2 relative z-50 uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            {activeNotification}
            <button
              onClick={() => setActiveNotification(null)}
              className="absolute right-4 hover:text-[#eaeaea] font-mono ml-4 cursor-pointer text-[10px]"
            >
              [DISMISS]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MASTER LUXURY FLOATING GLASS NAVIGATION HEADER */}
      <header className="sticky top-4 z-40 mx-4 md:mx-8 max-w-7xl lg:mx-auto bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-2xl flex items-center justify-between shadow-2xl shadow-black/80 transition-all duration-300">
        
        {/* Brand logo */}
        <div 
          onClick={() => {
            if (user) {
              if (user.role === 'employer') {
                setCurrentView("recruiter");
              } else {
                setCurrentView("dashboard");
              }
            } else {
              setCurrentView("landing");
            }
          }} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
            <span className="font-mono font-black text-sm">N</span>
          </div>
          <span className="font-sans font-extrabold tracking-[0.15em] text-white text-md md:text-lg">
            NEXUS <span className="text-slate-400 font-normal">AI</span>
          </span>
        </div>

        {/* Navigation Core */}
        {user ? (
          user.role === 'employer' ? (
            /* Employer Horizontal Controls */
            <nav className="hidden lg:flex items-center gap-2 bg-neutral-900/60 border border-white/10 p-1 rounded-2xl">
              <button
                onClick={() => setCurrentView("recruiter")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === "recruiter" ? "bg-white text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Recruitment Hub
              </button>
            </nav>
          ) : (
            /* Employee Horizontal Controls */
            <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/40 border border-white/10 p-1 rounded-2xl">
              {[
                { id: "dashboard", label: "Overview", icon: LayoutDashboard },
                { id: "portfolio-builder", label: "CV Studio", icon: FileText },
                { id: "portfolio", label: "Living Bio", icon: Award },
                { id: "coach", label: "AI Coach", icon: Cpu },
                { id: "simulation", label: "Sim Lab", icon: Terminal },
                { id: "interview", label: "AI Interview", icon: BrainCircuit },
                { id: "galaxy", label: "Skill Galaxy", icon: Compass },
                { id: "passport", label: "Career Passport", icon: ShieldCheck }
              ].map((lnk) => {
                const IconComp = lnk.icon;
                const isSel = currentView === lnk.id;
                return (
                  <button
                    key={lnk.id}
                    onClick={() => setCurrentView(lnk.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                      isSel 
                        ? "bg-white text-black" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    {lnk.label}
                  </button>
                );
              })}
            </nav>
          )
        ) : (
          /* Unauth view triggers - Luxury Rounded Glass Buttons with Smooth Transitions */
          <nav className="hidden lg:flex items-center gap-3">
            <button
              id="nav-link-home"
              onClick={() => setCurrentView("landing")}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all duration-300 cursor-pointer border ${
                currentView === "landing"
                  ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  : "bg-white/0 border-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10 hover:scale-[1.02]"
              }`}
            >
              <Home className="w-3.5 h-3.5 text-inherit" />
              <span>Home Backplane</span>
            </button>
            <button
              id="nav-link-talent"
              onClick={() => setCurrentView("auth")}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all duration-300 cursor-pointer border ${
                currentView === "auth"
                  ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  : "bg-white/0 border-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10 hover:scale-[1.02]"
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-inherit" />
              <span>Predictive Talent Matrix</span>
            </button>
          </nav>
        )}

        {/* Top-Right Meta Controls */}
        <div className="flex items-center gap-4">
          <button
            id="header-btn-settings"
            onClick={() => setSettingsOpen(true)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 flex items-center justify-center cursor-pointer transition-colors"
            title="System Settings"
          >
            <Settings className="w-4 h-4 text-white hover:rotate-45 transition-transform" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">
                  {user.role === 'employer' ? "Enterprise Authority" : "Active Candidate"}
                </span>
                <span className="text-xs font-bold text-white max-w-[120px] truncate">{userProfile.name}</span>
              </div>
              
              <button
                onClick={() => setAuthOpen(true)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 border border-white/10 bg-neutral-900/60 hover:border-white/20 rounded-xl hover:bg-neutral-800 text-xs font-semibold text-slate-300 flex items-center gap-2 cursor-pointer transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          ) : (
            /* Premium Sign In Button Redesign */
            <button
              id="header-btn-auth"
              onClick={() => setCurrentView("auth")}
              className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-zinc-200 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
            >
              <User className="w-3.5 h-3.5 text-black" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* CORE GRAPHICAL CONSOLE MAIN CONTAINER */}
      <main className="flex-grow w-full relative min-h-[80vh]">
        <AnimatePresence mode="wait">
          
          {currentView === "landing" && (
            <motion.div
              key="landing"
              {...pageRevealTransition}
            >
              <LandingPage onNavigate={(view) => {
                if (view === "auth") {
                  setCurrentView("auth");
                } else if (!user) {
                  // Direct clean routing to access selection screen if unauthenticted
                  setCurrentView("auth");
                } else {
                  setCurrentView(view);
                }
              }} />
            </motion.div>
          )}

          {currentView === "auth" && (
            <motion.div
              key="auth"
              {...pageRevealTransition}
            >
              <AuthScreen onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          )}

          {currentView === "recruiter" && user?.role === 'employer' && (
            <motion.div
              key="recruiter"
              {...pageRevealTransition}
            >
              <EmployerDashboard />
            </motion.div>
          )}

          {currentView === "portfolio-builder" && user?.role === 'employee' && (
            <motion.div
              key="portfolio-builder"
              {...pageRevealTransition}
            >
              <PortfolioBuilder />
            </motion.div>
          )}

          {currentView === "coach" && user?.role === 'employee' && (
            <motion.div
              key="coach"
              {...pageRevealTransition}
            >
              <CareerCoach />
            </motion.div>
          )}

          {currentView === "portfolio" && user?.role === 'employee' && (
            <motion.div
              key="portfolio"
              {...pageRevealTransition}
            >
              <LivingPortfolio />
            </motion.div>
          )}

          {currentView === "simulation" && user?.role === 'employee' && (
            <motion.div
              key="simulation"
              {...pageRevealTransition}
            >
              <CareerSimulation />
            </motion.div>
          )}

          {currentView === "interview" && user?.role === 'employee' && (
            <motion.div
              key="interview"
              {...pageRevealTransition}
            >
              <InterviewSimulator />
            </motion.div>
          )}

          {currentView === "galaxy" && user?.role === 'employee' && (
            <motion.div
              key="galaxy"
              {...pageRevealTransition}
            >
              <SkillGalaxyMap />
            </motion.div>
          )}

          {currentView === "passport" && user?.role === 'employee' && (
            <motion.div
              key="passport"
              {...pageRevealTransition}
            >
              <CareerPassport />
            </motion.div>
          )}

          {currentView === "dashboard" && user?.role === 'employee' && (
            /* MULTIPAGE INTEGRATION BENTO DECK: Represents Dashboard, Community, Pricing, Analytics */
            <motion.div
              key="dashboard"
              {...pageRevealTransition}
              className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 text-left"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Interactive Candidate Console</span>
                <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
                  <LayoutDashboard className="w-8 md:w-10 h-8 md:h-10 text-white" />
                  Ecosystem Command Center
                </h2>
                <p className="text-slate-400 mt-2 text-sm font-light">
                  A comprehensive overview of your active learning coordinates, community threads, dynamic pricing, and system feedback logs.
                </p>
              </div>

              {/* Slider selector for tabs */}
              <div className="flex border-b border-white/5 pb-1 gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveDashboardTab('overview')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    activeDashboardTab === 'overview'
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "bg-[#09090b]/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Ecosystem Overview
                </button>
                <button
                  onClick={() => setActiveDashboardTab('jobs')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    activeDashboardTab === 'jobs'
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "bg-[#09090b]/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Quantum Opportunity Matrix
                  {(() => {
                    const savedJobs = JSON.parse(localStorage.getItem("nexus_jobs") || "[]");
                    const count = savedJobs.length;
                    return count > 0 ? (
                      <span className="ml-1 text-[10px] bg-red-600 text-white font-mono px-1.5 py-0.5 rounded-full font-extrabold">
                        {count}
                      </span>
                    ) : null;
                  })()}
                </button>
              </div>

              {activeDashboardTab === 'overview' ? (
                /* Bento Grid overview layout */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* 1. Quick Stats & System telemetry alerts */}
                  <div className="md:col-span-8 bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col gap-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono text-white uppercase tracking-widest">Active Trajectory Sourcing Matrix</span>
                      <span className="text-[9px] bg-white/5 text-[#EAEAEA] font-mono px-2 py-0.5 rounded-md border border-white/10">ONLINE_STATE</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white max-w-lg leading-snug">Quantum AI Architect trajectory matching established.</h3>
                    
                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-5 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Velocity Growth</span>
                        <span className="text-lg font-mono font-extrabold text-white mt-0.5">+14.2%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Weekly Missions</span>
                        <span className="text-lg font-mono font-extrabold text-[#eaeaea] mt-0.5">8 / 10</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Index Vetting Score</span>
                        <span className="text-lg font-mono font-extrabold text-white mt-0.5">Top 4%</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Subscription plans & High-yield nodes (Pricing view) */}
                  <div className="md:col-span-4 bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-6 relative">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-white font-mono uppercase tracking-wider">
                        <CreditCard className="w-3.5 h-3.5" /> High Stakes Node Upgrade
                      </div>
                      <h4 className="text-white font-bold text-lg">Nexus Pro Gateway</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">Unlock unthrottled Gemini reasoning models for customizable CV outputs and unlimited interview runs.</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                      <div>
                        <span className="text-xl font-mono text-white font-extrabold">$29</span>
                        <span className="text-[10px] text-slate-500"> / mo</span>
                      </div>
                      <button className="px-4 py-2 bg-white hover:bg-[#EAEAEA] text-black text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer">
                        Upgrade Node
                      </button>
                    </div>
                  </div>

                  {/* 3. Community logs & Thread updates */}
                  <div className="md:col-span-6 bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl hover:border-white/20 transition-all duration-300 flex flex-col gap-4">
                    <h3 className="text-white text-md font-semibold flex items-center gap-2">
                      <Users className="w-4.5 h-4.5 text-white" />
                      Interactive Community Feed
                    </h3>
                    
                    <div className="flex flex-col gap-3">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs flex flex-col gap-1.5 text-left">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-400 font-semibold selection:bg-white selection:text-black">@Elena_Quantum</span>
                          <span className="text-slate-500">2 hours ago</span>
                        </div>
                        <p className="text-slate-300">Just aligned my third synaptic node inside the galaxy map! Demand predictions went up to 98%.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs flex flex-col gap-1.5 text-left font-sans">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-400 font-semibold selection:bg-white selection:text-black">@Marcus_AI_Synth</span>
                          <span className="text-slate-500">Yesterday</span>
                        </div>
                        <p className="text-slate-303">The simulated tech interview with the AI interviewer was intense. The confidence meter analytics caught my speech pauses completely.</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. About & Contact helpdesk */}
                  <div className="md:col-span-6 bg-neutral-900/30 border border-white/10 p-6 rounded-3xl shadow-xl hover:border-white/20 transition-all duration-300 flex flex-col gap-4 text-left justify-between">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-white text-md font-semibold flex items-center gap-2">
                        <HelpCircle className="w-4.5 h-4.5 text-white" />
                        Platform Contact & Help Center
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        NEXUS AI is a forward-looking prototype designed to expedite career transition paths using real-time generative insights. If you notice any telemetry misalignment states, submit reports directly below.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer">
                        <Mail className="w-4 h-4 text-white" /> Support Contact
                      </button>
                      <button className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer" onClick={() => setCurrentView("portfolio-builder")}>
                        <Compass className="w-4 h-4 text-white" /> Build ATS Resume
                      </button>
                      <button className="p-3.5 bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer" onClick={() => setCurrentView("passport")}>
                        <ShieldCheck className="w-4 h-4" /> View Career Passport
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* Opportunity Matrix available jobs board */
                <div className="flex flex-col gap-6 w-full">
                  
                  {/* Dynamic Interactive Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/[0.02] border border-white/15 p-4 rounded-3xl">
                    <div className="md:col-span-7 relative">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search future roles, tools or required skills..."
                        value={candidateJobSearch}
                        onChange={(e) => setCandidateJobSearch(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 focus:border-white/35 text-xs text-white p-3.5 pl-11 rounded-2xl outline-none"
                      />
                    </div>
                    
                    <div className="md:col-span-5 flex gap-2">
                      {(['all', 'remote', 'hybrid', 'on-site'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setCandidateJobFilter(mode)}
                          className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                            candidateJobFilter === mode
                              ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                              : "bg-black/60 border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {mode === 'all' ? "All" : mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Jobs Listing Grid */}
                  {(() => {
                    // Always read from local storage to allow real-time sync with recruiters
                    const savedJobs = JSON.parse(localStorage.getItem("nexus_jobs") || "[]");
                    const filtered = savedJobs.filter((job: any) => {
                      const matchesSearch = 
                        job.title.toLowerCase().includes(candidateJobSearch.toLowerCase()) ||
                        job.department.toLowerCase().includes(candidateJobSearch.toLowerCase()) ||
                        (job.skillsRequired && job.skillsRequired.some((s: string) => s.toLowerCase().includes(candidateJobSearch.toLowerCase()))) ||
                        job.description.toLowerCase().includes(candidateJobSearch.toLowerCase());
                      
                      const matchesFilter = candidateJobFilter === 'all' || job.workMode === candidateJobFilter;
                      
                      return matchesSearch && matchesFilter;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4">
                          <Briefcase className="w-10 h-10 text-slate-600 animate-bounce" />
                          <p className="text-sm text-slate-400">No synchronized enterprise opportunities match your search coordinates.</p>
                          <button 
                            onClick={() => { setCandidateJobSearch(""); setCandidateJobFilter("all"); }}
                            className="px-4 py-2 bg-white/5 border border-white/15 text-slate-300 text-xs font-bold uppercase rounded-xl hover:text-white hover:bg-white/10 cursor-pointer"
                          >
                            Reset System Filters
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map((job: any) => {
                          const isApplied = appliedJobIds.includes(job.id);
                          return (
                            <div 
                              key={job.id} 
                              className="group relative bg-[#07070a]/90 hover:bg-[#0c0c12]/95 border border-white/10 p-6 rounded-[32px] transition-all duration-300 shadow-2xl flex flex-col justify-between min-h-[300px]"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-3xl group-hover:bg-white/[0.03] transition-colors" />
                              
                              <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                                      {job.department}
                                    </span>
                                    <h4 className="text-lg md:text-xl font-bold font-sans text-white group-hover:text-white transition-colors leading-snug">
                                      {job.title}
                                    </h4>
                                  </div>
                                  <span className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                                    job.workMode === 'remote' 
                                      ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-400' 
                                      : job.workMode === 'hybrid'
                                        ? 'bg-amber-950/25 border-amber-500/30 text-amber-400'
                                        : 'bg-cyan-950/25 border-cyan-500/30 text-cyan-400'
                                  }`}>
                                    {job.workMode}
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-slate-405 font-light items-center">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{job.location}</span>
                                  </div>
                                  <span className="text-slate-600">•</span>
                                  <div className="flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="font-mono font-bold text-[#fafafa]">{job.salaryRange}</span>
                                  </div>
                                </div>

                                <p className="text-xs text-slate-400 leading-relaxed font-light mt-1">
                                  {job.description}
                                </p>
                              </div>

                              <div className="mt-6 border-t border-white/5 pt-5 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {job.skillsRequired?.map((skill: string, idx: number) => (
                                    <span 
                                      key={idx} 
                                      className="text-[9px] font-mono text-slate-300 font-semibold bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>

                                <button
                                  onClick={() => {
                                    if (isApplied) return;
                                    const updatedApplies = [...appliedJobIds, job.id];
                                    setAppliedJobIds(updatedApplies);
                                    localStorage.setItem("nexus_applied_jobs", JSON.stringify(updatedApplies));
                                    setActiveNotification(`ALIGNMENT TRANSMITTED: Applied instantly to ${job.title}. Recruiter Vance has been alerted.`);
                                  }}
                                  disabled={isApplied}
                                  className={`w-full py-3.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                                    isApplied 
                                      ? "bg-white/[0.04] border border-white/10 text-emerald-400 cursor-not-allowed flex items-center justify-center gap-2 font-semibold" 
                                      : "bg-white text-black hover:bg-zinc-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
                                  }`}
                                >
                                  {isApplied ? (
                                    <>
                                      <Check className="w-4 h-4 stroke-[2.5]" />
                                      ✓ APPLICATION ACTIVE
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-3.5 h-3.5" />
                                      SIGNATORY INITIATE APPLY
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* LUXURIOUS FUTURISTIC FOOTER */}
      <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 px-6 md:px-12 overflow-hidden mt-16 font-sans">
        
        {/* Animated ambient background element within the footer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle slow moving stars of varying sizes */}
          <div className="absolute w-[500px] h-[500px] -top-64 -left-64 bg-white/[0.02] rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-[300px] h-[300px] -bottom-32 -right-32 bg-white/[0.01] rounded-full blur-3xl" />
          
          {/* Tiny twinkling stars */}
          <div className="absolute top-12 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-ping duration-1000" />
          <div className="absolute top-24 right-1/3 w-[1.5px] h-[1.5px] bg-white/30 rounded-full animate-pulse" />
          <div className="absolute bottom-16 left-1/2 w-[2px] h-[2px] bg-white/45 rounded-full animate-pulse" />
          <div className="absolute top-36 right-12 w-0.5 h-0.5 bg-white/10 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Footer Grid: Brand Left + 3 Columns Links + Newsletter Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
            
            {/* COLUMN 1: BRAND PROFILE (Spans 4 columns) */}
            <div className="lg:col-span-4 flex flex-col items-start text-left gap-6">
              {/* Brand Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <span className="font-mono text-sm font-black">N</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-sm uppercase tracking-[0.2em] font-display">
                    NEXUS AI
                  </span>
                  <span className="text-[10px] text-slate-500 tracking-wider">Future Career Universe</span>
                </div>
              </div>

              {/* Slogan & Description */}
              <div className="flex flex-col gap-2.5">
                <p className="text-sm text-zinc-300 font-normal leading-relaxed max-w-sm">
                  An AI-powered futuristic ecosystem for careers, portfolios, talent discovery, and intelligent professional growth.
                </p>
                <span className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  “Build Your Future With AI.”
                </span>
              </div>

              {/* Live Statistics */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-mono font-bold text-white">12,483</span>
                  <span className="text-[10px] text-slate-500">Future professionals building active nodes</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: QUICK LINKS (Spans 2 columns) */}
            <div className="lg:col-span-2 flex flex-col items-start font-sans text-left gap-4">
              <span className="text-sm font-bold tracking-[0.1em] uppercase text-white font-display border-b border-white/10 pb-1.5 w-full">
                Ecosystem
              </span>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400 font-medium w-full">
                <li>
                  <button onClick={() => { setCurrentView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveNotification("Ecosystem features calibrated for dynamic search rendering."); }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("coach")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    AI Career Coach
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("portfolio-builder")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Portfolio Builder
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("galaxy")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Skill Galaxy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("simulation")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Career Simulation
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveNotification("Sub-second global gateway alignment loaded."); }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveNotification("Nexus AI v2.5.0: Designed globally with decentralized cognitive models."); }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveNotification("Telemetry desk available at support@nexusai.com"); }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: EMPLOYER CONSOLE (Spans 2 columns) */}
            <div className="lg:col-span-2 flex flex-col items-start text-left gap-4">
              <span className="text-sm font-bold tracking-[0.1em] uppercase text-white font-display border-b border-white/10 pb-1.5 w-full">
                Employers
              </span>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400 font-medium w-full font-sans">
                <li>
                  <button onClick={() => handleFooterEmployerNav("recruiter")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Post a Job
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterEmployerNav("recruiter")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Find Talent
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterEmployerNav("recruiter")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Employer Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => { 
                    if (user?.role === "employer") {
                      setCurrentView("recruiter");
                      setActiveNotification("Recruitment AI alignment matrix loaded.");
                    } else {
                      handleFooterEmployerNav("recruiter");
                    }
                  }} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Recruitment AI
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterEmployerNav("recruiter")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Hiring Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterEmployerNav("recruiter")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Company Profile
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: EMPLOYEES / TALENT (Spans 2 columns) */}
            <div className="lg:col-span-2 flex flex-col items-start text-left gap-4">
              <span className="text-sm font-bold tracking-[0.1em] uppercase text-white font-display border-b border-white/10 pb-1.5 w-full">
                Talent Hub
              </span>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400 font-medium w-full font-sans">
                <li>
                  <button onClick={() => handleFooterNav("portfolio")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Build Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("portfolio-builder")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    AI Resume Builder
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("galaxy")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Career Roadmap
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("interview")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Interview Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("dashboard")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Skill Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => handleFooterNav("coach")} className="hover:text-white transition-colors cursor-pointer text-left py-0.5">
                    Learning Journey
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 5: NEWSLETTER & UPDATES (Spans 2 columns) */}
            <div className="lg:col-span-2 flex flex-col items-start text-left gap-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-white font-display border-b border-white/10 pb-1.5 w-full">
                Updates
              </span>
              <div className="flex flex-col gap-3.5 w-full">
                <span className="text-[11px] text-slate-400 leading-normal font-sans">
                  Get AI Career Insights & Future Updates
                </span>
                
                {/* Modern Glass Newsletter subscription */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newsletterEmail) return;
                    setNewsletterStatus(true);
                    setNewsletterEmail("");
                    setActiveNotification("Subscription confirmed. Welcome to the Nexus cosmic alignment updates!");
                  }}
                  className="flex flex-col gap-2 w-full"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-xl outline-none focus:border-white/30 tracking-wide font-sans placeholder-slate-500 transition-all text-center"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-2 bg-white hover:bg-zinc-200 text-black text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer animate-shimmer"
                  >
                    Subscribe
                  </button>
                </form>

                {/* Status Message */}
                {newsletterStatus && (
                  <span className="text-[10px] text-emerald-400 font-mono tracking-normal leading-tight">
                    ✓ Connected to neural updates feed.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Sparkles Divider with Glowing Orb Effect */}
          <div className="relative my-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            
            {/* Pulsing AI Assistant Orb in the Divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center relative group">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse absolute" />
                <div className="w-4 h-4 rounded-full bg-white/5 blur-sm animate-ping absolute" />
              </div>
            </div>
          </div>

          {/* LOWER FOOTER: CONTACTS + SOCIAL SHIELD / MARGIN CONTROL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-xs text-slate-500 text-left items-center font-sans">
            
            {/* Contact Information & Community links */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] text-slate-450 uppercase tracking-widest font-mono font-bold">Contact Coordinates</span>
              <div className="flex flex-col gap-1 text-xs text-slate-400 font-sans">
                <span className="hover:text-white transition-colors cursor-pointer">support@nexusai.com</span>
                <span>Kuala Lumpur, Malaysia (Available Worldwide)</span>
              </div>
              <div className="flex items-center gap-2.5 mt-1">
                <button 
                  onClick={() => setActiveNotification("Connecting Secure Discord Gateway protocol...")}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-mono border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Discord Community
                </button>
                <button 
                  onClick={() => setActiveNotification("Syncing Telegram secure feedback channel...")}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-mono border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Telegram Channel
                </button>
              </div>
            </div>

            {/* SOCIAL MEDIA SECTION */}
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-[11px] text-slate-455 uppercase tracking-widest font-mono font-bold">Orbital Synchronicity</span>
              <div className="flex items-center gap-3">
                {/* 1. GitHub */}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                {/* 2. LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                {/* 3. Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.04.14-4.85.148-3.252 1.69-4.77 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                {/* 4. YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163s-.232-1.64-.946-2.36c-.908-.952-1.926-.956-2.392-1.013C16.824 2.56 12 2.56 12 2.56s-4.823 0-8.16.23c-.466.057-1.484.061-2.392 1.013C.734 4.523.502 6.163.502 6.163S.268 8.13.268 10.093v1.815c0 1.963.234 3.93.234 3.93s.232 1.64.946 2.36c.907.952 2.103.922 2.634 1.022c1.92.185 8.16.242 8.16.242s4.825-.008 8.162-.245c.466-.056 1.484-.06 2.392-1.012c.714-.72.946-2.36.946-2.36s.234-1.967.234-3.93v-1.815c0-1.964-.23-3.93-.23-3.93zM9.545 15.568V8.16L16.03 11.86l-6.485 3.708z"/></svg>
                </a>
                {/* 5. TikTok */}
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74a7.195 7.195 0 0 1-1.03-1.22v7.04c-.01 3.28-1.52 6.57-4.72 7.7a7.873 7.873 0 0 1-7.05-1a8.156 8.156 0 0 1-3.5-6.89c-.08-3.23 1.34-6.49 4.31-7.73a7.803 7.803 0 0 1 7.29.58V1.03c-.01-.34-.02-.67-.01-1.01zM11.66 18c1.69.05 3.27-1.14 3.51-2.82.28-2.12-1.21-4.22-3.34-4.47-2.12-.25-4.22 1.25-4.47 3.37-.25 2.12 1.25 4.21 3.37 4.46.31.04.62.05.93.06z"/></svg>
                </a>
                {/* 6. X/Twitter */}
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* 7. Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full bg-white/5 hover:bg-white border border-white/10 hover:border-white text-slate-400 hover:text-black hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            {/* Legal Section */}
            <div className="flex flex-col items-start md:items-end justify-start gap-2 text-xs text-slate-400 md:text-right w-full">
              <span className="text-[11px] text-slate-455 uppercase tracking-widest font-mono font-bold">Standard Directives</span>
              <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <button onClick={() => setActiveNotification("Encrypted Privacy node validated.")} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
                <button onClick={() => setActiveNotification("Terms of Service node active.")} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
                <button onClick={() => setActiveNotification("Telemetry cookie parameters aligned.")} className="hover:text-white transition-colors cursor-pointer">Cookie Policy</button>
                <button onClick={() => setActiveNotification("Security Shield status: Military Grade Active.")} className="hover:text-white transition-colors cursor-pointer">Security</button>
                <button onClick={() => setActiveNotification("Contrast & voice control parameters aligned.")} className="hover:text-white transition-colors cursor-pointer">Accessibility</button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright brand information */}
          <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 text-center">
            <span>© 2026 NEXUS AI — Future Career Universe. All rights reserved.</span>
            <div className="flex items-center gap-2 text-[10px] text-slate-550 uppercase tracking-widest">
              <span>SYSTEM CYBER COHESION ALPHA</span>
              <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full" />
              <span>SECURE PROTOCOL</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 5. FLOATING CINEMATIC AI ASSISTANT OVERLAY FOCUS DESTRUCT */}
      <AnimatePresence>
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              stopSpeaking();
              setAssistantOpen(false);
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[3.5px] z-[9990] transition-all pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* FLOATING AI ASSISTANT SPEECH ORB PANEL */}
      <div className="fixed bottom-6 left-6 z-[9995] flex flex-col items-start gap-3 select-none pointer-events-none">
        
        {/* Floating conversational luxury glassmorphism panel */}
        <AnimatePresence>
          {assistantOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-[calc(100vw-32px)] sm:w-[440px] h-[80vh] sm:h-[580px] bg-[#020202]/92 border border-[#F4DFC8]/20 rounded-[28px] shadow-[0_32px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(244,223,200,0.06)] backdrop-blur-3xl text-left flex flex-col relative overflow-hidden pointer-events-auto select-text"
            >
              {/* Luxury Tech-Core Grid backdrop inside panel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(244,223,200,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(244,223,200,0.012)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none -z-10" />
              <div className="absolute top-0 right-1/4 w-44 h-44 bg-luxury-gold/[0.05] rounded-full blur-[90px] pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-white/[0.02] rounded-full blur-[80px] pointer-events-none -z-10" />

              {/* CRYSTAL HUD HEADER */}
              <div className="flex justify-between items-center border-b border-white/5 px-6 py-4.5 bg-black/[0.15]">
                <div className="flex items-center gap-3">
                  {/* Glowing Animated Virtual Avatar Sphere */}
                  <div className="relative w-8 h-8 rounded-full border border-[#F4DFC8]/30 flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
                    <span className="absolute inset-0 rounded-full bg-luxury-gold/15 animate-pulse" />
                    <Sparkles className="w-4 h-4 text-luxury-gold animate-spin" style={{ animationDuration: "14s" }} />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black animate-ping" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-mono font-extrabold text-white tracking-widest uppercase flex items-center gap-1.5">
                      AETHER AI
                      <span className="text-[8px] px-1 bg-[#F4DFC8]/10 text-luxury-gold rounded font-normal uppercase leading-none border border-[#F4DFC8]/15 tracking-snug">v4.1</span>
                    </h4>
                    <p className="text-[9px] font-mono text-[#F4DFC8]/75 tracking-wider mt-0.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      NEURAL SYSTEM ACTIVE
                    </p>
                  </div>
                </div>
                
                {/* Voice feedback, minimize, close buttons panel */}
                <div className="flex items-center gap-3">
                  {/* Speak toggle */}
                  <button
                    onClick={() => {
                      if (voiceEnabled) {
                        stopSpeaking();
                        setVoiceEnabled(false);
                      } else {
                        setVoiceEnabled(true);
                        speakText("Voice mode active. Synthesizer online.");
                      }
                    }}
                    title={voiceEnabled ? "Mute Companion voice feedback" : "Activate Companion voice feedback"}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${voiceEnabled ? 'bg-luxury-gold/10 border-[#F4DFC8]/40 text-luxury-gold' : 'border-white/5 text-slate-500 hover:text-white hover:border-white/10'}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      stopSpeaking();
                      setAssistantOpen(false);
                    }} 
                    className="p-1.5 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:border-white/10 transition-all cursor-pointer"
                    title="Minimize"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* LIVE SPEAKING / LISTENING WAVEFORM MODULE */}
              {(isSpeaking || isListening) && (
                <div className="px-6 py-2 bg-neutral-950/40 border-b border-white/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : 'bg-luxury-gold animate-pulse'}`} />
                    <span className="text-[9.5px] font-mono tracking-widest text-[#F4DFC8] uppercase">
                      {isListening ? "Listening with secure mic telemetry..." : "Streaming synthetic verbal audio..."}
                    </span>
                  </div>
                  {/* Pulsing visual spectrum audio equalizer waveform */}
                  <div className="flex items-center gap-[2px] h-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.span
                        key={i}
                        className={`w-[2px] ${isListening ? 'bg-rose-500' : 'bg-[#F4DFC8]'} rounded-full`}
                        animate={{
                          height: [4, Math.floor(Math.random() * 12 + 4), 4]
                        }}
                        transition={{
                          duration: 0.45 + i * 0.05,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* CHAT OUTPUT LOGS */}
              <div className="flex-grow overflow-y-auto flex flex-col gap-4 p-6 scrollbar-thin">
                {assistantLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col max-w-[85%] ${log.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div 
                      className={`p-4 rounded-[18px] text-[11.5px] leading-relaxed shadow-lg ${
                        log.role === 'user' 
                          ? 'bg-gradient-to-tr from-[#F4DFC8] to-[#e4cfb8] text-black rounded-tr-sm font-medium selection:bg-black/10' 
                          : 'bg-white/[0.015] border border-[#F4DFC8]/10 text-gray-200 rounded-tl-sm backdrop-blur-md selection:bg-white/10'
                      }`}
                    >
                      {log.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{log.text}</p>
                      ) : (
                        <div className="markdown-body space-y-1">
                          {formatMarkdownToJSX(log.text)}
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-1.5 px-1">
                      {log.role === 'user' ? 'Secure Client User' : 'Aether Core Engine'}
                    </span>
                  </motion.div>
                ))}
                
                {assistantLoading && (
                  <div className="flex items-center gap-3.5 pl-2 py-1 self-start">
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full border border-luxury-gold/30 animate-ping" />
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#F4DFC8] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#F4DFC8] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#F4DFC8] animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="text-[9px] font-mono text-luxury-gray tracking-wider ml-1 uppercase">Resolving Neural Vectors...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* COGNITIVE PATHWAY QUICK SUGGESTIONS */}
              <div className="px-6 pb-2">
                <p className="text-[8.5px] font-mono text-[#F4DFC8]/40 uppercase tracking-widest mb-2 px-0.5">Interactive Trajectory Axioms</p>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto scrollbar-thin py-0.5">
                  <button
                    type="button"
                    onClick={() => handleAssistantSubmit("Provide a futuristic learning career roadmap to become an AI Core Engineer")}
                    className="px-3 py-1 text-[9px] font-mono bg-white/[0.02] hover:bg-[#F4DFC8]/10 hover:text-luxury-gold text-slate-300 border border-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1 active:scale-95 text-left"
                  >
                    🔮 AI Career Roadmap
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAssistantSubmit("Give me top strategic resume tips, keywords and optimized layout format")}
                    className="px-3 py-1 text-[9px] font-mono bg-white/[0.02] hover:bg-[#F4DFC8]/10 hover:text-luxury-gold text-slate-300 border border-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1 active:scale-95 text-left"
                  >
                    ✨ Synthesize CV layout
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAssistantSubmit("Run a virtual quantum interview simulation and ask me a hard architecture question")}
                    className="px-3 py-1 text-[9px] font-mono bg-white/[0.02] hover:bg-[#F4DFC8]/10 hover:text-luxury-gold text-slate-300 border border-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1 active:scale-95 text-left"
                  >
                    🧠 Interview Simulation
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAssistantSubmit("Predict starting trajectory salary limits for Technical Architects in 2030")}
                    className="px-3 py-1 text-[9px] font-mono bg-white/[0.02] hover:bg-[#F4DFC8]/10 hover:text-luxury-gold text-slate-300 border border-white/5 rounded-full transition-all cursor-pointer flex items-center gap-1 active:scale-95 text-left"
                  >
                    💸 Salary Comp Predictions
                  </button>
                </div>
              </div>

              {/* FUTURIST INTERLUDE INPUT CONSOLE */}
              <div className="p-4 border-t border-white/5 bg-black/[0.2]">
                <form onSubmit={handleAssistantSubmit} className="flex gap-2 items-center">
                  {/* Voice input mic button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isListening) {
                        setIsListening(false);
                      } else {
                        startListening();
                      }
                    }}
                    title="Activate Secure Voice Input transcription"
                    className={`p-3 rounded-xl border transition-all pointer-events-auto flex items-center justify-center cursor-pointer ${
                      isListening 
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-500 animate-pulse' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="text"
                    id="assistant-chat-input"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder={isListening ? "Listening natively..." : "Deploy companion inquiry vectors..."}
                    className="flex-grow bg-neutral-950/90 border border-[#F4DFC8]/15 text-xs text-white p-3 rounded-xl outline-none focus:border-[#F4DFC8]/45 transition-all font-sans placeholder:text-slate-600 py-3 pointer-events-auto"
                    disabled={isListening}
                  />

                  <button 
                    type="submit" 
                    id="assistant-submit-btn"
                    className="p-3 bg-white hover:bg-[#ececec] text-black rounded-xl transition-all cursor-pointer flex items-center justify-center font-bold pointer-events-auto"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE TALENT CONTEXT ASSISTANT CHAT BADGE */}
        {!assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            onClick={() => setAssistantOpen(true)}
            className="bg-[#020202]/95 border border-[#F4DFC8]/30 hover:border-[#F4DFC8]/80 text-[#F4DFC8] font-mono text-[9px] uppercase tracking-widest px-3.5 py-2 rounded-2xl cursor-pointer pointer-events-auto shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mb-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>AI Chatbot · Click to Ask</span>
          </motion.div>
        )}

        {/* ULTRA-PREMIUM INTERACTIVE AI FLOATING ASSISTANT ORB */}
        <div className="pointer-events-auto">
          <ThreeDRobotAssistant onClick={() => setAssistantOpen(!assistantOpen)} isOpen={assistantOpen} />
        </div>
      </div>

      {/* SETTINGS / PROFILE MODAL */}
      <AnimatePresence>
        {authOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#050505] border border-white/10 p-6 rounded-2xl shadow-2xl text-left flex flex-col gap-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-white uppercase tracking-widest font-bold">Profile Identity Node</span>
                <button onClick={() => setAuthOpen(false)} className="text-slate-500 hover:text-white font-mono text-xs cursor-pointer">[CLOSE]</button>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-lg flex items-center justify-center font-bold">
                  {userProfile.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-bold font-sans">{userProfile.name}</span>
                  <span className="text-slate-500 text-xs font-mono mt-0.5">{userProfile.email}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block mb-1">Custom Display Name</label>
                  <input
                    type="text"
                    id="profile-name-input"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block mb-1">Registered Verification Email</label>
                  <input
                    type="text"
                    id="profile-email-input"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/10 text-xs text-slate-500 p-2.5 rounded-lg outline-none pointer-events-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setAuthOpen(false)}
                className="w-full py-3 bg-white hover:bg-[#eaeaea] text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer mt-2"
              >
                Sync Profile Credentials
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LUXURIOUS SYSTEM SETTINGS CONFIGURATIONAL MODAL */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#050505] border border-white/10 p-6 rounded-2xl shadow-2xl text-left flex flex-col gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-white uppercase tracking-widest font-bold flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-white" />
                  System Options Config Core
                </span>
                <button 
                  onClick={() => setSettingsOpen(false)} 
                  className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer transition-colors"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {/* Setting 1: Theme Presets */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Visual Emittance Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'monochrome', label: 'Monochrome Lux' },
                      { id: 'holographic-cyan', label: 'Holo Cyan' },
                      { id: 'cosmic-violet', label: 'Cosmic Violet' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setConfigs({ ...configs, themePreset: theme.id });
                          setActiveNotification(`Nexus configuration updated: ${theme.label} active.`);
                        }}
                        className={`p-2.5 rounded-xl border text-[10px] uppercase font-mono tracking-wider transition-all text-center cursor-pointer ${
                          configs.themePreset === theme.id
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400"
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setting 2: AI Agent Intelligence complexity */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Neural Optimizer Engine</label>
                  <select
                    value={configs.aiComplexity}
                    onChange={(e) => {
                      setConfigs({ ...configs, aiComplexity: e.target.value });
                      setActiveNotification(`Cognitive model engine calibrated: ${e.target.value.toUpperCase()}`);
                    }}
                    className="bg-neutral-950 border border-white/10 text-xs text-white p-3 rounded-lg outline-none focus:border-white/20 w-full cursor-pointer"
                  >
                    <option value="supreme-pro">Gemini 2.5 Pro Ultra (Advanced Reasoning)</option>
                    <option value="flash">Gemini 2.5 Flash Pipeline (Sub-second Feedbacks)</option>
                    <option value="adaptive">Quantum Autonomous Adaptive Core</option>
                  </select>
                </div>

                {/* Setting 3: Synaptic Audio Tuner */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Cosmic Frequency Balancer</label>
                    <span className="text-xs font-mono text-cyan-400">{configs.audioHz} Hz</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hz: 432, label: '432 Hz Solfeggio' },
                      { hz: 440, label: '440 Hz Concert' },
                      { hz: 528, label: '528 Hz Bio-Repair' }
                    ].map((opt) => (
                      <button
                        key={opt.hz}
                        type="button"
                        onClick={() => {
                          setConfigs({ ...configs, audioHz: opt.hz });
                          setActiveNotification(`Audio synthesizer frequency calibrated to ${opt.hz}Hz.`);
                        }}
                        className={`p-2 rounded-xl border text-[9px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
                          configs.audioHz === opt.hz
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Swatches */}
                <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                        Interactive Ambient Audio
                      </span>
                      <span className="text-[10px] text-slate-400 font-light mt-0.5">Synthesize ambient micro-sound feedback algorithms.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfigs({ ...configs, ambientTeasing: !configs.ambientTeasing })}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${configs.ambientTeasing ? 'bg-white' : 'bg-neutral-800'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-black transition-transform ${configs.ambientTeasing ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        Quantum Privacy Shield
                      </span>
                      <span className="text-[10px] text-slate-400 font-light mt-0.5">Scramble all outgoing coordinate buffers natively.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfigs({ ...configs, privacyStrict: configs.privacyStrict === 'military-grade' ? 'fully-transparent' : 'military-grade' })}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${configs.privacyStrict === 'military-grade' ? 'bg-white' : 'bg-neutral-800'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-black transition-transform ${configs.privacyStrict === 'military-grade' ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(false);
                    setActiveNotification("System options locked and synchronized.");
                  }}
                  className="w-full py-3 bg-white hover:bg-[#eaeaea] text-black font-extrabold text-xs rounded-xl uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Apply System Configurations
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
