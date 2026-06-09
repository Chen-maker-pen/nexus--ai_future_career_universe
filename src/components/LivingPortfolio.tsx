import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Award, Code, CheckCircle, Plus, Sparkles, User, Briefcase, Download, ShieldCheck } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  impactWeight: number;
}

export default function LivingPortfolio() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "a1", title: "Compiled project Bio-Scribe Neural Transducers", category: "AI Development", date: "2026-02-14", impactWeight: 15 },
    { id: "a2", title: "Configured 12-Gate Qubit Superpositions", category: "Hardware Physics", date: "2026-03-22", impactWeight: 20 },
    { id: "a3", title: "Mitigated Server Grid Feedback Bypass", category: "Security Ops", date: "2026-05-01", impactWeight: 12 }
  ]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputCat, setInputCat] = useState("AI Development");

  // Dynamic portfolio analytics and scoring
  const totalBaseScore = achievements.reduce((acc, current) => acc + current.impactWeight, 50);
  const portfolioScore = Math.min(totalBaseScore, 100);
  const readinessRating = Math.round(portfolioScore * 0.94);

  // Time Series Growth Curve Data for Recharts
  const chartData = [
    { name: "Week 1", score: 50 },
    { name: "Week 2", score: 50 + (achievements[0]?.impactWeight || 0) },
    { name: "Week 3", score: 50 + (achievements[0]?.impactWeight || 0) + 5 },
    { name: "Week 4", score: 50 + (achievements[0]?.impactWeight || 0) + (achievements[1]?.impactWeight || 0) },
    { name: "Week 5", score: portfolioScore - 5 },
    { name: "Week 6", score: portfolioScore }
  ];

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newAch: Achievement = {
      id: `a-${Date.now()}`,
      title: inputTitle.trim(),
      category: inputCat,
      date: new Date().toISOString().split("T")[0],
      impactWeight: Math.round(Math.random() * 12) + 8
    };

    setAchievements([newAch, ...achievements]);
    setInputTitle("");
  };

  return (
    <div id="living-portfolio-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
            <Award className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
            Living Bio-Matrix
          </h2>
          <p className="text-luxury-gray mt-2 text-sm font-light">
            An evolving representation of your future expertise. Add achievements to watch your metrics recalibrate.
          </p>
        </div>

        {/* Recruiter portfolio mode toggle */}
        <button
          id="btn-recruiter-toggle"
          onClick={() => setRecruiterMode(!recruiterMode)}
          className={`px-5 py-2.5 rounded-xl border text-xs font-extrabold tracking-wider uppercase font-mono cursor-pointer flex items-center gap-2 duration-300 transition-all ${
            recruiterMode 
              ? "bg-luxury-gold hover:bg-luxury-gold-hover text-black border-luxury-gold shadow-[0_4px_15px_rgba(244,223,200,0.22)]" 
              : "bg-white/5 border-white/10 hover:border-luxury-gold/30 text-luxury-gold"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          {recruiterMode ? "Active: Recruiter View" : "Activate Recruiter View"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {recruiterMode ? (
          /* RECRUITER MODE: Clean premium polished resume layout */
          <motion.div
            key="recruiter-board"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#F4EAE0]/[0.05] backdrop-blur-3xl text-white p-8 md:p-12 rounded-[32px] shadow-2xl border border-white/15 text-left transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-8 gap-6">
              <div>
                <span className="text-xs font-mono text-luxury-gold uppercase tracking-widest font-extrabold">NEXUS SECURE VERIFIED PROFILE</span>
                <h3 className="text-3xl font-extrabold text-white mt-2">Holographic Candidate #2910</h3>
                <p className="text-luxury-gray text-sm mt-1">Interdisciplinary Systems Engineer & Quantum Architect</p>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="px-4 py-2 bg-black/40 rounded-lg text-luxury-white font-mono text-xs border border-white/10">
                  Vetting Score: <strong className="text-luxury-gold font-extrabold">{portfolioScore}%</strong>
                </div>
                <span className="text-[10px] text-luxury-gray mt-1">Verified via Hyper Ledger #20A9</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10">
              <div className="md:col-span-8 flex flex-col gap-8">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray mb-4 border-b border-white/5 pb-1">Verified Project Logs</h4>
                  <div className="flex flex-col gap-6">
                    {achievements.map((a) => (
                      <div key={a.id} className="group">
                        <span className="text-[10px] font-mono text-luxury-gold font-bold">{a.date} | {a.category}</span>
                        <h5 className="font-bold text-white text-md mt-0.5">{a.title}</h5>
                        <p className="text-xs text-luxury-gray mt-1 leading-relaxed">Completed active microgigs inside dynamic sandbox containers with strict consensus validation triggers.</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray mb-4 border-b border-white/5 pb-1 font-sans">Cognitive Certifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <strong className="block text-white font-bold mb-1">Quantum Superdense Encryption</strong>
                      Full hardware simulation capability.
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <strong className="block text-white font-bold mb-1">MoE Weights Fine-Tuning</strong>
                      Verified parameter quantization expert.
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="bg-black/40 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-luxury-gray border-b border-white/5 pb-1">AI Match Matrix</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-luxury-gray">Enterprise Readiness</span>
                      <span className="font-mono font-bold text-white">{readinessRating}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-gold" style={{ width: `${readinessRating}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-luxury-gray">Algorithmic Velocity</span>
                      <span className="font-mono font-bold text-white">{portfolioScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-bronze" style={{ width: `${portfolioScore}%` }} />
                    </div>
                  </div>
                  <button className="w-full py-2 bg-luxury-gold text-black rounded-lg text-xs font-extrabold hover:bg-luxury-gold-hover mt-4 cursor-pointer flex items-center justify-center gap-2 transition-colors border border-luxury-gold">
                    <Download className="w-3.5 h-3.5" /> Direct PDF Export
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* DEFAULT DETAILED IMMERSIVE EXPERIENCE */
          <motion.div
            key="dashboard-board"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
          >
            
            {/* Left: Interactive Score Counters & Live input */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Score Meter Bento Box */}
              <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.01] rounded-full blur-xl" />
                <h3 className="text-white text-md font-mono uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
                  Real-Time AI Portfolio Audit
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/10 p-4 rounded-2xl text-center">
                    <span className="text-4xl font-mono font-extrabold text-luxury-gold">{portfolioScore}</span>
                    <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">Portfolio Strength</span>
                  </div>
                  <div className="bg-black/40 border border-white/10 p-4 rounded-2xl text-center">
                    <span className="text-4xl font-mono font-extrabold text-luxury-bronze">{readinessRating}</span>
                    <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">AI Alignment Index</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-luxury-white mt-5 leading-relaxed">
                  Your current coordinate configuration shows an outstanding <strong>{readinessRating}%</strong> compatibility match with premium enterprise and future sovereign networks.
                </div>
              </div>

              {/* Add Accolade Log Form */}
              <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl">
                <h3 className="text-white text-md font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-luxury-gold" /> Log Custom Accolade
                </h3>
                <form onSubmit={handleAddAchievement} className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider block mb-1.5">Achievement Title</label>
                    <input
                      type="text"
                      id="input-accolade-title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      placeholder="e.g. Mastered Matrix Quantization models..."
                      className="w-full bg-black/40 border border-white/10 focus:border-luxury-gold/50 text-white rounded-xl p-3 text-xs outline-none focus:bg-black/70 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider block mb-1.5">Core Discipline Group</label>
                    <select
                      id="select-accolade-discipline"
                      value={inputCat}
                      onChange={(e) => setInputCat(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 text-xs outline-none cursor-pointer"
                    >
                      <option value="AI Development" className="bg-black">AI Development</option>
                      <option value="Hardware Physics" className="bg-black">Quantum / Hardware Physics</option>
                      <option value="Security Ops" className="bg-black">Sovereign Security Ops</option>
                      <option value="SocioTech Systems" className="bg-black">SocioTech Systems</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    id="btn-accolade-submit"
                    className="w-full py-3 bg-luxury-gold hover:bg-luxury-gold-hover text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer shadow-[0_4px_15px_rgba(244,223,200,0.22)] border border-luxury-gold"
                  >
                    Commit to Tensor Database
                  </button>
                </form>
              </div>

            </div>

            {/* Right: Immersive Recharts curve and active chronological milestones */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Graphic container */}
              <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-luxury-gold uppercase tracking-widest">Skill Growth Vector Projections</span>
                  <span className="text-[10px] text-luxury-gold bg-white/5 px-2.5 py-0.5 rounded-md font-mono border border-white/10">CALIBRATING</span>
                </div>
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C6A98A" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#C6A98A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.03} />
                      <XAxis dataKey="name" stroke="#8C8C8C" fontSize={10} tickLine={false} />
                      <YAxis stroke="#8C8C8C" fontSize={10} tickLine={false} domain={[30, 110]} />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#ffffff1a', borderRadius: '12px', fontSize: '11px', color: '#FAF6F0' }} />
                      <Area type="monotone" dataKey="score" stroke="#C6A98A" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Milestones timeline logs list */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono text-luxury-gray uppercase tracking-wider px-1">Commit Chronometer History</span>
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {achievements.map((a) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 border border-white/10 hover:border-luxury-gold/20 bg-white/5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-luxury-gold">
                            <Code className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-white text-xs font-bold">{a.title}</span>
                            <span className="text-[10px] text-luxury-gray mt-0.5 font-mono">{a.date} · {a.category}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-luxury-gold font-bold">+{a.impactWeight} V</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
