import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, User, Users, Mail, Lock, Sparkles, ArrowRight, Github, Chrome, Linkedin, CheckCircle2, Globe, Orbit, Building
} from "lucide-react";

interface AuthScreenProps {
  onAuthSuccess: (user: { name: string; email: string; role: 'employer' | 'employee'; onboardingData?: any }) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  // States: 'role-select' | 'credentials' | 'signup' | 'forgot' | 'verify' | 'onboarding'
  const [step, setStep] = useState<'role-select' | 'login' | 'signup' | 'forgot' | 'verify' | 'onboarding'>('role-select');
  const [selectedRole, setSelectedRole] = useState<'employer' | 'employee' | null>(null);
  
  // Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Onboarding parameters
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [primaryInterest, setPrimaryInterest] = useState("AI / ML Engineering");
  const [targetTitle, setTargetTitle] = useState("AI Core Synaptic Architect");
  const [bioSnippet, setBioSnippet] = useState("Architecting deep neural networks and cognitive quantum logic flows.");

  const avatars = [
    { seed: "quantum", label: "Quantum Avatar", color: "from-slate-705 to-slate-900" },
    { seed: "cyber", label: "Cybernetics Overlord", color: "from-zinc-800 to-slate-950" },
    { seed: "editorial", label: "Dior Luxury Minimalist", color: "from-neutral-900 to-black" }
  ];

  const handleRoleSelect = (role: 'employer' | 'employee') => {
    setSelectedRole(role);
    setStep('login');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please identify with valid system credentials.");
      return;
    }
    
    // Validate inputs depending on role
    if (selectedRole === 'employee') {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg("First Name and Second Name (Last Name) are required coordinates.");
        return;
      }
    } else {
      if (!companyName.trim() || !recruiterName.trim()) {
        setErrorMsg("Company Name and Recruiter Name are required coordinates.");
        return;
      }
    }

    setErrorMsg("");
    setLoading(true);

    // Simulate luxury loading sync
    setTimeout(() => {
      setLoading(false);
      if (selectedRole === 'employee') {
        setStep('onboarding');
      } else {
        const computedEmployerName = recruiterName.trim() ? `${recruiterName.trim()} (${companyName.trim()})` : companyName.trim();
        // Clear login credentials to mock session and pass enterprise payload
        onAuthSuccess({
          name: computedEmployerName || "Director Vance",
          email: email,
          role: 'employer'
        });
      }
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("All quantum access credentials are mandatory.");
      return;
    }

    if (selectedRole === 'employee') {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg("First Name and Second Name are required coordinates for Talent accounts.");
        return;
      }
    } else {
      if (!companyName.trim() || !recruiterName.trim()) {
        setErrorMsg("Company Name and Recruiter Name are required coordinates for Employer accounts.");
        return;
      }
    }

    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep('verify');
    }, 1000);
  };

  const completeOnboarding = () => {
    const computedEmployeeName = firstName.trim() ? `${firstName.trim()} ${lastName.trim()}` : "Alex Vane";
    onAuthSuccess({
      name: computedEmployeeName || "Alex Vane",
      email: email || "alex@nexus.ai",
      role: selectedRole || 'employee',
      onboardingData: {
        interest: primaryInterest,
        title: targetTitle,
        bio: bioSnippet,
        avatar: avatars[avatarIndex]
      }
    });
  };

  // Quick social connect action simulation
  const triggerSocialAuth = (provider: string) => {
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      const role = selectedRole || 'employee';
      if (role === 'employee') {
        setFirstName("Alex_");
        setLastName(`${provider}_User`);
        setEmail(`auth@${provider.toLowerCase()}.com`);
        setStep('onboarding');
      } else {
        onAuthSuccess({
          name: `Director Vance (${provider} Group)`,
          email: `recruitment@${provider.toLowerCase()}.com`,
          role: 'employer'
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4 md:p-8 relative">
      
      {/* Dynamic Vector Ambient Backplane */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        
        {/* Step 1: Cinematic Mode / Role Selection */}
        {step === 'role-select' && (
          <motion.div
            key="role-select"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl w-full flex flex-col items-center gap-10 text-center"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400 font-extrabold px-3 py-1 rounded bg-white/5 border border-white/5 self-center">
                Identity Synapse Authorization
              </span>
              <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white font-extrabold">
                Select Your Universe Access Mode
              </h2>
              <p className="text-slate-400 text-sm max-w-xl self-center font-light leading-relaxed">
                Unlock specialized cognitive models customized for premium strategic hires or AI-guided developer evolution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mt-2">
              
              {/* Employer Selection */}
              <motion.div
                id="select-role-employer"
                onClick={() => handleRoleSelect('employer')}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative bg-[#F4EAE0]/[0.04] border border-white/10 hover:border-luxury-gold/40 rounded-[32px] p-8 backdrop-blur-3xl text-left cursor-pointer transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[300px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/[0.02] rounded-full blur-2xl group-hover:bg-luxury-gold/10 transition-colors" />
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold font-bold text-lg shadow-inner">
                    <Users className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2 font-sans group-hover:text-luxury-gold transition-colors">
                      Recruitment Portal
                    </h3>
                    <p className="text-xs text-luxury-gray leading-relaxed font-light">
                      Unlock advanced predictive analytics, smart candidate roadmaps, custom job descriptions, and high stakes talent acquisition dashboards.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-gold mt-8 group-hover:translate-x-1.5 transition-transform">
                  INITIALIZE RECRUITER CORE <ArrowRight className="w-4 h-4 text-luxury-gold" />
                </div>
              </motion.div>

              {/* Employee Selection */}
              <motion.div
                id="select-role-employee"
                onClick={() => handleRoleSelect('employee')}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative bg-[#F4EAE0]/[0.04] border border-white/10 hover:border-luxury-gold/40 rounded-[32px] p-8 backdrop-blur-3xl text-left cursor-pointer transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[300px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/[0.02] rounded-full blur-2xl group-hover:bg-luxury-gold/10 transition-colors" />
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold font-bold text-lg shadow-inner">
                    <User className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2 font-sans group-hover:text-luxury-gold transition-colors">
                      Career Ecosystem
                    </h3>
                    <p className="text-xs text-luxury-gray leading-relaxed font-light">
                      Operate in simulated futuristic workstations, calibrate 3D skill galaxies, optimize intelligent resume layouts, and consult of neural companion nodes.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-gold mt-8 group-hover:translate-x-1.5 transition-transform">
                  BOOT PERSONAL UNIVERSE <ArrowRight className="w-4 h-4 text-luxury-gold" />
                </div>
              </motion.div>

            </div>

            {/* Quick Demo System Bypass Action Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 p-5 bg-white/[0.02] border border-white/5 rounded-2xl max-w-xl w-full">
              <span className="text-xs font-mono text-zinc-400">💡 Quick-Entry Sandbox:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAuthSuccess({
                      name: "Alex Vane",
                      email: "chitn0188@gmail.com",
                      role: "employee",
                      onboardingData: {
                        interest: "AI / ML Engineering",
                        title: "AI Core Synaptic Architect",
                        bio: "Architecting deep neural networks and cognitive quantum logic flows.",
                        avatar: avatars[0]
                      }
                    });
                  }}
                  className="px-4.5 py-2 bg-luxury-gold text-black hover:bg-luxury-gold-hover text-[11px] font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[0_4px_15px_rgba(244,223,200,0.22)] border border-luxury-gold"
                >
                  Quick Seeker Profile
                </button>
                <button
                  onClick={() => {
                    onAuthSuccess({
                      name: "Director Vance",
                      email: "recruitment@aetheria.intelligence",
                      role: "employer"
                    });
                  }}
                  className="px-4.5 py-2 bg-white/5 border border-white/15 hover:border-luxury-gold/40 hover:bg-white/[0.08] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Quick Recruiter Profile
                </button>
              </div>
            </div>

          </motion.div>
        )}

        {/* Step 2: Glass Credential Access (Login Form) */}
        {step === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md bg-[#F4EAE0]/[0.05] border border-white/10 backdrop-blur-3xl rounded-[32px] p-8 shadow-2xl relative text-left"
          >
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
            
            <button 
              onClick={() => setStep('role-select')}
              className="text-xs font-mono text-luxury-gray hover:text-white transition-colors mb-6 cursor-pointer"
            >
              ← SYSTEM ACCIDENT BYPASS
            </button>

            <div className="flex flex-col gap-2 mb-8">
              <span className="text-[10px] font-mono tracking-widest text-[#EAEAEA] uppercase">
                {selectedRole === 'employer' ? "Recruiter Vault" : "Employee Grid"}
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white">Access Gateway</h3>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {/* Role-Specific Name Fields */}
              {selectedRole === 'employee' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Alex"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Second Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Vane"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Aetheria Intelligence"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Recruiter Signature Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Director Vance"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@nexus.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-11 rounded-xl outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Security Phrase</label>
                  <button 
                    type="button"
                    onClick={() => setStep('forgot')}
                    className="text-[10px] font-mono text-slate-500 hover:text-white cursor-pointer"
                  >
                    FORGOT?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 focus:border-luxury-gold/55 text-xs text-white p-3.5 pl-11 rounded-xl outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-luxury-gold text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2 hover:bg-luxury-gold-hover shadow-[0_4px_20px_rgba(244,223,200,0.22)] border border-luxury-gold"
              >
                {loading ? "Authenticating Grid Matrix..." : "Acknowledge Signatory"}
              </button>
            </form>

            <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Synchronous Federated Auth</span>
              
              <div className="grid grid-cols-3 gap-3 w-full">
                <button 
                  onClick={() => triggerSocialAuth('GitHub')}
                  className="p-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <Github className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => triggerSocialAuth('Google')}
                  className="p-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <Chrome className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => triggerSocialAuth('LinkedIn')}
                  className="p-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-slate-400 mt-2">
                New to Nexus AI?{" "}
                <button 
                  onClick={() => setStep('signup')}
                  className="text-white font-semibold underline cursor-pointer"
                >
                  Create Identity Grid
                </button>
              </span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Signup Grid */}
        {step === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md bg-black/60 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl relative text-left"
          >
            <button 
              onClick={() => setStep('login')}
              className="text-xs font-mono text-slate-500 hover:text-white mb-6 cursor-pointer"
            >
              ← ENTRY GATEWAY
            </button>

            <div className="flex flex-col gap-2 mb-8">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Initiate Core Directory
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white">Create Identity Node</h3>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
              {/* Role-Specific Name Fields */}
              {selectedRole === 'employee' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Alex"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Second Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Vane"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Aetheria Intelligence"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Recruiter Signature Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Director Vance"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-10 rounded-xl outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Communication Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@nexus.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-11 rounded-xl outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Define Security Phrase</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Choose premium password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 pl-11 rounded-xl outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2 hover:bg-[#EAEAEA]"
              >
                {loading ? "Aligning Star Coordinates..." : "Provision Access Protocol"}
              </button>
            </form>

            <span className="block text-center text-xs text-slate-400 mt-6 pt-4 border-t border-white/5">
              Acknowledge current signatory?{" "}
              <button 
                onClick={() => setStep('login')}
                className="text-white font-semibold underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          </motion.div>
        )}

        {/* Step 4: Forgot Password / System Phase Recovery */}
        {step === 'forgot' && (
          <motion.div
            key="forgot"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-black/60 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl relative text-left"
          >
            <button onClick={() => setStep('login')} className="text-xs font-mono text-slate-500 hover:text-white mb-6 cursor-pointer">← GATEWAY</button>
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#EAEAEA] uppercase">Sync Drift Recovery</span>
              <h3 className="text-2xl font-bold tracking-tight text-white">Reset Token</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Enter registered access email addresses. A recovery hash link matches will issue sub-secondly.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="name@nexus.ai"
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
              />
              <button 
                onClick={() => {
                  setErrorMsg("");
                  setStep('login');
                }}
                className="w-full py-3.5 bg-white text-black font-bold text-xs rounded-xl uppercase transition-colors"
              >
                Broadcast Recovery Signal
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Email Verification */}
        {step === 'verify' && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md bg-black/60 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl relative text-center flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl animate-pulse">
              <Orbit className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Verification Queued</span>
              <h3 className="text-2xl font-bold text-white leading-tight">Verification Key Dispatched</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed mt-1">
                A telemetry verify packet has been projected directly to <span className="text-white font-semibold font-mono">{email || "your provided email"}</span>.
              </p>
            </div>

            <button
              onClick={() => {
                const role = selectedRole || 'employee';
                if (role === 'employee') {
                  setStep('onboarding');
                } else {
                  const computedEmployerName = recruiterName.trim() ? `${recruiterName.trim()} (${companyName.trim()})` : companyName.trim();
                  onAuthSuccess({
                    name: computedEmployerName || "Director Vance",
                    email: email,
                    role: 'employer'
                  });
                }
              }}
              className="w-full py-3.5 bg-white text-black font-semibold text-xs rounded-xl uppercase tracking-wider hover:bg-[#EAEAEA]"
            >
              Verify Instantly (Simulate Match)
            </button>
          </motion.div>
        )}

        {/* Step 6: Interactive Luxury Onboarding Flow (Employees) */}
        {step === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl bg-[#050505]/80 border border-white/10 backdrop-blur-3xl rounded-[40px] p-8 md:p-10 shadow-2xl relative text-left"
          >
            <div className="absolute top-1/4 right-[5%] w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">Configuration Sequence</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">Onboarding Alignment</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">ALEX_ALIGN_P1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Select Synapse Sector</label>
                  <select
                    value={primaryInterest}
                    onChange={(e) => setPrimaryInterest(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                  >
                    <option className="bg-neutral-950" value="AI / ML Engineering">AI / ML Engineering</option>
                    <option className="bg-neutral-950" value="Quantum Computing & Systems">Quantum Computing & Systems</option>
                    <option className="bg-neutral-950" value="BioTech / Cybernetic Overlays">BioTech / Cybernetic Overlays</option>
                    <option className="bg-neutral-950" value="Brutalist Design & UIUX">Brutalist Design & UIUX</option>
                    <option className="bg-neutral-950" value="High Stakes Cybersecurity">High Stakes Cybersecurity</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Primary Role Title</label>
                  <input
                    type="text"
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    placeholder="e.g. AI Core Synaptic Architect"
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Signature Biography Snippet</label>
                  <textarea
                    rows={3}
                    value={bioSnippet}
                    onChange={(e) => setBioSnippet(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Avatar Selector Panel */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider block">Calibrate Identity Vector</span>
                
                <div className="grid grid-cols-1 gap-3">
                  {avatars.map((av, idx) => (
                    <div
                      key={idx}
                      onClick={() => setAvatarIndex(idx)}
                      className={`p-3.5 border rounded-2xl cursor-pointer transition-all duration-350 flex items-center justify-between ${
                        avatarIndex === idx 
                          ? "bg-white/10 border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.08)]" 
                          : "bg-white/5 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${av.color} border border-white/10`} />
                        <span className="text-xs font-semibold text-white">{av.label}</span>
                      </div>
                      {avatarIndex === idx && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl mt-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> Recommended path matches based on indices
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Connecting this sector triggers localized training, real-time demand indexes updates, and aligns profile grids directly with enterprise search protocols.
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={completeOnboarding}
              className="w-full py-4 bg-white text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all mt-8 hover:bg-[#EAEAEA] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              INITIALIZE SYNERGY HUB <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
