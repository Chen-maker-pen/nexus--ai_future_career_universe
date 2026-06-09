import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Brain, DollarSign, Calendar, Target, Award, ArrowUpRight, Cpu, Compass } from "lucide-react";
import { CareerRecommendation } from "../types";

export default function CareerCoach() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [careerResult, setCareerResult] = useState<CareerRecommendation | null>(null);

  const presetCareers = [
    { name: "AI Core Synaptic Architect", search: "ai engineer" },
    { name: "Quantum Cognitive Engineer", search: "quantum cognitive engineer" },
    { name: "Bio-Telemetry Specialist", search: "bio telemetry" }
  ];

  const handleSearch = async (targetQuery: string) => {
    if (!targetQuery.trim()) return;
    setLoading(true);
    setCareerResult(null);
    try {
      const response = await fetch("/api/career/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: targetQuery })
      });
      if (response.ok) {
        const data = await response.json();
        setCareerResult(data);
      } else {
        console.error("Coach API returned non-200 response");
      }
    } catch (e) {
      console.error("Error communicating with Career Coach API:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="career-coach-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* Title block */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
          <Brain className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
          AI Career Coach
        </h2>
        <p className="text-luxury-gray mt-2 text-sm md:text-md max-w-2xl font-light">
          Query the Nexus Neural System to extrapolate highly advanced roadmaps, learning trajectories, and salary insights.
        </p>
      </div>

      {/* Grid container: Prompt deck of presets vs Main active display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left pane: Query form & Presets */}
        <div id="coach-inputs-panel" className="lg:col-span-5 bg-[#F4EAE0]/[0.05] backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col gap-6">
          <h3 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-luxury-gold" />
            Initiate Neural Query
          </h3>

          <div className="relative">
            <textarea
              id="coach-query-textarea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I want to become an AI Engineer or map out Quantum Nanotechnology fields..."
              className="w-full min-h-[120px] bg-black/40 hover:bg-black/60 border border-white/10 focus:border-luxury-gold/50 text-white rounded-2xl p-4 text-sm resize-none outline-none transition-all placeholder:text-luxury-gray"
            />
            <button
              id="coach-send-btn"
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="absolute bottom-3 right-3 p-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover disabled:opacity-30 text-black transition-colors cursor-pointer shadow-[0_4px_15px_rgba(244,223,200,0.22)]"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-2 text-left">
            <span className="text-xs font-mono text-luxury-gray uppercase tracking-wider">Presets coordinates</span>
            <div className="flex flex-wrap gap-2">
              {presetCareers.map((c, idx) => (
                <button
                  key={idx}
                  id={`preset-${idx}`}
                  onClick={() => {
                    setQuery(c.name);
                    handleSearch(c.search);
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-luxury-gold/40 bg-white/5 hover:bg-white/10 text-white hover:text-luxury-gold text-xs transition-all cursor-pointer"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right pane: Visualization of roadmap result */}
        <div id="coach-results-panel" className="lg:col-span-7 min-h-[350px] flex flex-col justify-center items-center relative">
          
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center gap-4"
              >
                {/* Advanced Pulsing Matrix Loader */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-luxury-gold/10 border-t-luxury-gold animate-spin" />
                  <div className="absolute w-8 h-8 rounded-full bg-luxury-gold/5 animate-ping" />
                  <Brain className="absolute w-6 h-6 text-luxury-gold" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest animate-pulse">Running Nexus Inference...</span>
                  <span className="text-luxury-gray text-xs">Assembling learning clusters and forecasting market demands</span>
                </div>
              </motion.div>
            )}

            {!loading && !careerResult && (
              <motion.div
                key="empty-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/15 rounded-[32px] bg-luxury-beige/[0.02] backdrop-blur-md"
              >
                <Compass className="w-12 h-12 text-luxury-gray mb-4 stroke-1 animate-pulse" />
                <h4 className="text-white font-semibold text-md mb-2">Orbit Dashboard Idle</h4>
                <p className="text-xs text-luxury-gray max-w-sm">
                  Select a preset coordinate to instantly experience real-time API extraction, or describe your career interests.
                </p>
              </motion.div>
            )}

            {!loading && careerResult && (
              <motion.div
                key="result-prompt"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col gap-6 text-left"
              >
                {/* Quick Info Bar */}
                <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/[0.01] rounded-full blur-2xl" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest">Axiom Result Generated</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">{careerResult.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3  py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
                      Demand: {careerResult.demand}
                    </div>
                  </div>

                  <p className="text-luxury-white text-sm leading-relaxed mb-6">
                    {careerResult.summary}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-luxury-gold">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-luxury-gray uppercase tracking-widest">Est. Reward Base</span>
                        <span className="text-sm font-mono text-white font-bold">{careerResult.salary}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-luxury-bronze">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-luxury-gray uppercase tracking-widest">Optimized Loop</span>
                        <span className="text-sm font-mono text-white font-bold">{careerResult.timeline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-luxury-gold">
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-luxury-gray uppercase tracking-widest">Prerequisites</span>
                        <span className="text-xs text-white truncate max-w-[150px]">{careerResult.skills?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Timeline nodes */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-semibold text-md flex items-center gap-2">
                    <Target className="w-4 h-4 text-luxury-gold" />
                    Interactive Study Roadmap
                  </h4>

                  <div className="relative border-l-2 border-white/5 pl-6 ml-3 py-2 flex flex-col gap-6">
                    {careerResult.roadmap?.map((r, rIdx) => (
                      <div key={r.id || rIdx} className="relative group text-left">
                        {/* Bullet point node */}
                        <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-black border-2 border-luxury-gold group-hover:bg-luxury-gold group-hover:scale-110 transition-all shadow-[0_0_10px_rgba(244,223,200,0.3)] flex items-center justify-center p-0.5" />
                        
                        <div className="bg-[#F4EAE0]/[0.03] backdrop-blur-3xl border border-white/10 hover:border-luxury-gold/30 p-5 rounded-[22px] transition-all duration-300">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-mono text-luxury-gold font-bold uppercase tracking-widest">{r.phase}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/5 text-luxury-gray">{r.duration}</span>
                              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md ${r.difficulty === 'Advanced' ? 'bg-red-950/30 text-red-400 border border-red-900/30' : 'bg-neutral-900 text-luxury-white border border-white/10'}`}>{r.difficulty}</span>
                            </div>
                          </div>

                          <h5 className="text-white text-md font-semibold mb-2">{r.label}</h5>
                          <p className="text-luxury-gray text-xs leading-relaxed mb-4">{r.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {r.skills?.map((sk, skIdx) => (
                              <span key={skIdx} className="text-[10px] font-mono text-luxury-white bg-white/5 border border-white/5 py-1 px-2.5 rounded-xl">
                                #{sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Innovation Projects */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-semibold text-md flex items-center gap-2">
                    <Award className="w-4 h-4 text-luxury-gold" />
                    Recommended Capstone Milestones
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerResult.projects?.map((p, pIdx) => (
                      <div key={pIdx} className="p-5 border border-white/10 bg-[#F4EAE0]/[0.03] backdrop-blur-xl rounded-2xl relative overflow-hidden text-left hover:border-luxury-gold/40 transition-all">
                        <div className="absolute top-2 right-2 text-[9px] font-mono tracking-wider uppercase py-0.5 px-2.5 rounded-full bg-white/5 text-luxury-white border border-white/10">
                          {p.difficulty || "Expert"}
                        </div>
                        <h5 className="font-semibold text-white text-sm mb-2 mt-1 flex items-center gap-1.5">
                          <ArrowUpRight className="w-4 h-4 text-luxury-bronze" />
                          {p.title}
                        </h5>
                        <p className="text-luxury-gray text-xs leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
