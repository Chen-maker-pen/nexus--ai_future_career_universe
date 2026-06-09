import { motion } from "motion/react";
import { Sparkles, Terminal, Compass, Briefcase, Award, Zap, Cpu, ShieldCheck, Heart, User, Eye, ArrowRight, Activity, Layers, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ScrollParallax from "./ScrollParallax";

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div id="landing-page-root" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-12 pb-24 bg-black text-white">
      
      {/* Immersive Soft White Luxury Atmospheric Orbs under subtle scroll-parallax multiplier shifts */}
      <ScrollParallax speed={-0.12} className="absolute inset-0 pointer-events-none -z-10 animate-pulse">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-luxury-gold/[0.04] blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-luxury-bronze/[0.04] blur-[130px]" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] rounded-full bg-slate-500/[0.02] blur-[100px]" />
      </ScrollParallax>
 
      {/* Futuristic Header Badge */}
      <ScrollReveal delay={0.1} yOffset={20}>
        <motion.div
          id="nexus-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-gold/20 bg-luxury-beige/[0.05] backdrop-blur-md text-luxury-white text-xs font-mono uppercase tracking-[0.2em] mb-8 cursor-pointer hover:border-luxury-gold/45 hover:bg-luxury-gold/[0.03] transition-all"
          onClick={() => onNavigate("auth")}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
          The Future AI-Powered Career Ecosystem
        </motion.div>
      </ScrollReveal>
  
      {/* Main Display Header */}
      <ScrollReveal delay={0.15} yOffset={25}>
        <h1
          id="landing-headline"
          className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.05]"
        >
          Build Your Future{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-white via-luxury-gold to-luxury-bronze drop-shadow-[0_2px_15px_rgba(244,223,200,0.18)]">
            Beyond The Resume
          </span>
        </h1>
      </ScrollReveal>
 
      <ScrollReveal delay={0.25} yOffset={25}>
        <p
          id="landing-subheadline"
          className="max-w-3xl text-luxury-gray text-md md:text-lg font-sans font-light tracking-wide mb-12 leading-relaxed"
        >
          An immersive AI-powered growth ecosystem designed for the next generation of potential. Discover careers beyond imagination, simulate advanced workstations, map real-time skill alignment, and establish a living professional identity worthy of investor attention.
        </p>
      </ScrollReveal>
 
      {/* Cinematic Action Triggers */}
      <ScrollReveal delay={0.35} yOffset={30}>
        <div
          id="landing-actions"
          className="flex flex-col sm:flex-row gap-5 mb-24 z-10 justify-center items-center"
        >
          <button
            id="btn-journey"
            onClick={() => onNavigate("auth")}
            className="group relative px-9 py-4.5 rounded-xl font-bold bg-luxury-gold text-black hover:bg-luxury-gold-hover shadow-[0_4px_30px_rgba(244,223,200,0.25)] transition-all active:scale-95 duration-200 cursor-pointer overflow-hidden text-xs uppercase tracking-wider border border-luxury-gold-hover"
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-black" />
              AUTHENTICATE IDENTITY ENTRY
            </span>
          </button>
 
          <button
            id="btn-galaxy"
            onClick={() => onNavigate("auth")}
            className="px-9 py-4.5 rounded-xl font-bold bg-transparent border border-white/10 hover:border-luxury-gold/40 hover:bg-white/[0.04] text-white backdrop-blur-md transition-all active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-inner text-xs uppercase tracking-wider"
          >
            <Compass className="w-4 h-4 text-luxury-gold" />
            Launch Interactive Galaxy
          </button>
        </div>
      </ScrollReveal>
 
      {/* Real-time Simulated Core Platform Stats */}
      <ScrollReveal delay={0.45} yOffset={35}>
        <div
          id="landing-stats"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl text-left bg-luxury-beige/[0.04] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[32px] shadow-2xl hover:border-luxury-gold/20 transition-all duration-300"
        >
          <div id="stat-nodes" className="flex flex-col gap-1 border-r border-white/10 pr-4 md:pr-8 last:border-0 last:pr-0">
            <span className="text-2xl md:text-3.5xl font-mono text-white font-extrabold tracking-tight">14,390+</span>
            <span className="text-[10px] text-luxury-gray uppercase tracking-widest font-sans flex items-center gap-1.5 font-medium">
              <Cpu className="w-3.5 h-3.5 text-luxury-gold" /> Cognitive Nodes
            </span>
          </div>
          <div id="stat-sims" className="flex flex-col gap-1 border-r border-white/10 pr-4 md:pr-8 last:border-0 last:pr-0">
            <span className="text-2xl md:text-3.5xl font-mono text-white font-extrabold tracking-tight">99.8%</span>
            <span className="text-[10px] text-luxury-gray uppercase tracking-widest font-sans flex items-center gap-1.5 font-medium">
              <Terminal className="w-3.5 h-3.5 text-luxury-gold" /> Sim Precision
            </span>
          </div>
          <div id="stat-salaries" className="flex flex-col gap-1 border-r border-white/10 pr-4 md:pr-8 last:border-0 last:pr-0">
            <span className="text-2xl md:text-3.5xl font-mono text-white font-extrabold tracking-tight">+$145K</span>
            <span className="text-[10px] text-luxury-gray uppercase tracking-widest font-sans flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-luxury-gold" /> Talent Growth API
            </span>
          </div>
          <div id="stat-members" className="flex flex-col gap-1 last:border-0 last:pr-0">
            <span className="text-2xl md:text-3.5xl font-mono text-luxury-white font-extrabold tracking-tight">Real-Time</span>
            <span className="text-[10px] text-luxury-gray uppercase tracking-widest font-sans flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" /> Neural Calibration
            </span>
          </div>
        </div>
      </ScrollReveal>
 
      {/* Product teaser highlight block */}
      <ScrollReveal delay={0.55} yOffset={40}>
        <div
          id="holographic-card-highlight"
          className="w-full max-w-6xl bg-luxury-beige/[0.02] backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 relative shadow-2xl hover:border-luxury-gold/15 transition-all duration-350 mt-16 text-left"
        >
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-luxury-bronze animate-pulse" />
                <span className="text-[9.5px] font-mono text-luxury-gold uppercase tracking-[0.2em] ml-2">Intelligent Trajectory Backplane v4.1</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Supercharged Career Vectorization</h2>
            </div>
            <div className="text-[10px] font-mono text-luxury-white uppercase tracking-widest px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-right">
              SYSTEM LEVEL: ENTERPRISE COGNITION
            </div>
          </div>
   
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div id="teaser-coach" onClick={() => onNavigate("auth")} className="p-7 rounded-[26px] bg-white/[0.01] border border-white/5 hover:bg-luxury-beige/[0.05] hover:border-luxury-gold/25 transition-all group cursor-pointer duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.02] rounded-full blur-xl pointer-events-none" />
              <Compass className="w-8 h-8 text-luxury-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-white text-sm mb-1 uppercase tracking-wider">AI Career Coach</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">Map premium cognitive roadmap steps utilizing deep generative inference and behavioral logic.</p>
            </div>
            <div id="teaser-simulation" onClick={() => onNavigate("auth")} className="p-7 rounded-[26px] bg-white/[0.01] border border-white/5 hover:bg-luxury-beige/[0.05] hover:border-luxury-gold/25 transition-all group cursor-pointer duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.02] rounded-full blur-xl pointer-events-none" />
              <Terminal className="w-8 h-8 text-luxury-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-white text-sm mb-1 uppercase tracking-wider">Workflow Simulation</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">Operate in fully populated virtual workstations containing teammate prompts, dev cycles, and incident logs.</p>
            </div>
            <div id="teaser-galaxy" onClick={() => onNavigate("auth")} className="p-7 rounded-[26px] bg-white/[0.01] border border-white/5 hover:bg-luxury-beige/[0.05] hover:border-luxury-gold/25 transition-all group cursor-pointer duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.02] rounded-full blur-xl pointer-events-none" />
              <Sparkles className="w-8 h-8 text-luxury-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-white text-sm mb-1 uppercase tracking-wider">3D Skill Galaxy</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">Explore star networks, link relationships, and project global demand indexes inside elegant 3D space.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* NEW SEC: EMOTIONAL MISSION DIFFERENCE STATEMENT */}
      <ScrollReveal delay={0.2} yOffset={45}>
        <div className="w-full max-w-6xl mt-32 text-left space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em]">OUR MANIFESTO</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Careers are dynamic universes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-white to-luxury-gold">not flat pieces of paper.</span>
            </h2>
            <p className="text-luxury-gray font-light text-base leading-relaxed">
              Traditional job boards are broken. They aggregate cold lists of bullet points and make recruitment stressful, anonymous, and transactional. We built NEXUS because human potential is magnificent, multi-dimensional, and continuously evolving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 rounded-[30px] bg-[#0c0c0c]/90 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <Activity className="w-7 h-7 text-luxury-gold" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Beyond Simple Job Hunting</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">
                We don't just match keywords. We empower individuals to map complex ambitions, predict future market demands, and uncover hidden professional capabilities.
              </p>
            </div>

            <div className="p-8 rounded-[30px] bg-[#0c0c0c]/90 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <User className="w-7 h-7 text-luxury-gold" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Living Digital Identity</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">
                Transform static credentials into standard-setting high contrast design portfolios that stream live learning graphs, authenticated telemetry, and immersive narrative reviews.
              </p>
            </div>

            <div className="p-8 rounded-[30px] bg-[#0c0c0c]/90 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <Globe className="w-7 h-7 text-luxury-gold" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Recruitment Redefined</h3>
              <p className="text-xs text-luxury-gray leading-relaxed">
                Provide enterprise recruiters and venture capital networks with multi-dimensional candidate diagnostics rather than outdated blackbox filters. Match by passion and potential.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* NEW SEC: VISUAL COMPARATIVE ANALYSIS GRID (Broken Past vs Nexus Future) */}
      <ScrollReveal delay={0.3} yOffset={45}>
        <div className="w-full max-w-6xl mt-32 text-left">
          <div className="text-center md:text-left mb-12 space-y-2">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em]">INDUSTRY COMPARATIVE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">The Quantum Shift</h2>
            <p className="text-luxury-gray text-xs md:text-sm font-light mt-2">See how NEXUS eliminates conventional hiring friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Old Way */}
            <div className="border border-white/5 bg-neutral-950/40 p-8 md:p-10 rounded-[36px] flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.01] rounded-full blur-xl" />
              <div>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-4">THE TRADITIONAL PARADIGM</span>
                <span className="text-xl md:text-2xl font-bold text-neutral-400 block mb-6">Outdated Transponents</span>
                <ul className="space-y-4 text-xs text-neutral-400">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-mono">✕</span>
                    <span><strong className="text-neutral-300">Resumes are frozen files in time:</strong> No proof of live skill competency or authentic personality layers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-mono">✕</span>
                    <span><strong className="text-neutral-300">Boring list aggregate interfaces:</strong> An overwhelming sea of standard text boxes causing immense screen cognitive fatigue.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-mono">✕</span>
                    <span><strong className="text-neutral-300">Transactional keyword filtering:</strong> Worthy candidates discarded automatically because their file layout lacked specific lexical nouns.</span>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] font-mono text-neutral-600 uppercase mt-4">Typical Recruitment Platforms (LinkedIn, Indeed, CareerBuilder)</p>
            </div>

            {/* The Nexus Way */}
            <div className="border border-luxury-gold/20 bg-[#0c0c0c] p-8 md:p-10 rounded-[36px] flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/[0.03] rounded-full blur-xl" />
              <div>
                <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-[0.2em] block mb-4">THE GALAXY ECOSYSTEM</span>
                <span className="text-xl md:text-2xl font-bold text-white block mb-6">Intelligent Human Growth</span>
                <ul className="space-y-4 text-xs text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-luxury-gold font-mono">✓</span>
                    <span><strong className="text-white">Living Digital Professional Identity:</strong> Portfolios that visualize live growth metrics, simulated challenges, and real code paths.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-luxury-gold font-mono">✓</span>
                    <span><strong className="text-white">Immersive visual telemetry:</strong> Intuitive 3D representations of actual skill weightings, career nodes, and future trends.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-luxury-gold font-mono">✓</span>
                    <span><strong className="text-white">Holistic talent understanding:</strong> Deep character context analyzed accurately, highlighting your actual human potential.</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-[11px] font-mono text-luxury-gold uppercase">THE SECURE NEXUS FRAMEWORK</p>
                <button onClick={() => onNavigate("auth")} className="text-xs font-bold text-white hover:text-luxury-gold transition-colors flex items-center gap-1">
                  START NOW <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER ACTION BANNER */}
      <ScrollReveal delay={0.2} yOffset={30}>
        <div className="w-full max-w-6xl mt-32 text-center p-12 md:p-16 rounded-[44px] bg-gradient-to-tr from-black via-[#080808] to-black border border-white/15 relative overflow-hidden flex flex-col items-center justify-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,223,200,0.03),transparent_70%)] pointer-events-none" />
          <span className="text-[10px] font-mono text-luxury-gold tracking-[0.3em] uppercase">READY FOR LAUNCH</span>
          <h2 className="text-3xl md:text-5xl font-extrabold max-w-3xl text-white tracking-tight leading-tight">
            Step Into Your Career Universe. Explore Beyond Simple Boundaries.
          </h2>
          <p className="text-xs md:text-sm text-luxury-gray max-w-2xl font-light">
            Authenticate your credentials or deploy an employer profile immediately. The Next-generation workspace awaits your calibration.
          </p>
          <button 
            onClick={() => onNavigate("auth")}
            className="px-8 py-4 rounded-xl font-mono text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors uppercase tracking-[0.1em] cursor-pointer"
          >
            INITIALIZE AUTHENTICATION SEC LEVEL 1
          </button>
        </div>
      </ScrollReveal>

    </div>
  );
}

