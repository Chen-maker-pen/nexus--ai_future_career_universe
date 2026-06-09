import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Play, Command, Send, AlertTriangle, Check, RefreshCw, Server, Users, ArrowRight } from "lucide-react";
import { SimTask, SimMessage } from "../types";

export default function CareerSimulation() {
  const [selectedCareer, setSelectedCareer] = useState("Quantum Cognitive Engineer");
  const [isSimulating, setIsSimulating] = useState(false);
  const [systemSync, setSystemSync] = useState(64);
  const [cpuLoad, setCpuLoad] = useState(42);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "INITIALIZING COGNITIVE SANDBOX DECK...",
    "COGNITIVE INTERFACE SEGREGATION SEQUENCE ACTIVE...",
    "READY TO INITIATE LIVE PROTOCOLS ON THE ACTIVE GRID."
  ]);
  const [commandInput, setCommandInput] = useState("");
  const [activeTasks, setActiveTasks] = useState<SimTask[]>([]);
  const [messages, setMessages] = useState<SimMessage[]>([]);

  // Simulation Pre-sets based on Career selection
  const handleStartSimulation = async () => {
    setIsSimulating(true);
    setTerminalOutput(prev => [...prev, `>> LOADED SYSTEM PARAMETERS FOR ELITE CAREER TRAJECTORY: [${selectedCareer.toUpperCase()}] ...`]);
    try {
      const response = await fetch("/api/career/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career: selectedCareer })
      });
      if (response.ok) {
        const data = await response.json();
        setActiveTasks(data.dailyMissions || []);
        setMessages(data.chatMessages || []);
        setSystemSync(82);
        setTerminalOutput(prev => [
          ...prev,
          `>> SECURE ARCHITECTURE MOUNTED: ${data.environmentName}`,
          `>> STAGES COMMITTED: ${data.systemStatus}`,
          ">> CONCURRENT COGNITIVE CHANNELS SYNCHRONIZED."
        ]);
      }
    } catch (e) {
      console.error("Simulation generation error:", e);
    }
  };

  // Simulate solving an active task
  const resolveTask = (taskId: string) => {
    setActiveTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        setTerminalOutput(old => [
          ...old,
          `>> DEPLOYING COMPREHENSIVE KERNEL PATCH: ${t.title.toUpperCase()}...`,
          ">> REPROGRAMMING NEURAL SYSTOLIC REGISTERS...",
          `>> SYSTEM PATCH SUCCESSFULLY COMMITTED ✅`
        ]);
        return { ...t, status: "completed" };
      }
      return t;
    }));
    setSystemSync(prev => Math.min(prev + 12, 100));
  };

  // Custom terminal commands simulation
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    let responseText = `Command not recognized: "${cmd}". Type "help" for system modules.`;

    if (cmd === "help") {
      responseText = "System Modules: \n- 'diagnostics': Runs deep telemetry calibration.\n- 'purge': Wipes temporary compiler matrices.\n- 'sync': Elevates orbital gateway coordination.";
    } else if (cmd === "diagnostics") {
      responseText = `Diagnostics Complete: CPU load at ${cpuLoad}%. System synchronization alignment level: ${systemSync}%. All micro-kernels operating within normal bounds.`;
      setCpuLoad(Math.round(Math.random() * 20) + 10);
    } else if (cmd === "purge") {
      responseText = "Temporary memory registers purged. Recovered 4.2 Gigaweights and restored compiler throughput.";
    } else if (cmd === "sync") {
      setSystemSync(100);
      responseText = "Orbital Alignment protocol triggered: System Sync established at 100%. Master Grid Operational.";
    }

    setTerminalOutput(prev => [...prev, `user@nexus:~$ ${commandInput}`, responseText]);
    setCommandInput("");
  };

  return (
    <div id="career-simulation-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* Title block */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
          <Terminal className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
          Quantum Workstation Sim
        </h2>
        <p className="text-luxury-gray mt-2 text-sm md:text-md max-w-2xl font-light">
          Immerse yourself directly inside authentic, high-impact enterprise workflows. Solve critical incidents, collaborate with autonomous networks, and solidify your professional superiority.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSimulating ? (
          /* CONFIGURATION VIEW: Let user choose career & boot up */
          <motion.div
            key="config-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto w-full bg-luxury-beige/[0.04] backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] shadow-2xl flex flex-col items-center text-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-luxury-gold/[0.01] rounded-full blur-xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-luxury-gold/[0.01] rounded-full blur-xl" />

            <div className="w-16 h-16 rounded-full bg-luxury-gold/5 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Server className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold font-sans text-white">Load High-Fidelity Professional Trajectory</h3>
              <p className="text-xs text-luxury-gray max-w-md leading-relaxed">
                Calibrate your skills with custom automated challenges. Every route populates real team logs, synaptic priority backlogs, and authentic enterprise micro-kernels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <select
                id="select-career-simulation"
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="flex-grow bg-black/60 border border-white/10 focus:border-luxury-gold/40 text-white rounded-xl p-3.5 text-sm outline-none cursor-pointer"
              >
                <option value="Quantum Cognitive Engineer" className="bg-black">Quantum Cognitive Engineer</option>
                <option value="AI Core Synaptic Architect" className="bg-black">AI Core Synaptic Architect</option>
                <option value="Bio-Telemetry Specialist" className="bg-black">Bio-Telemetry Specialist</option>
              </select>

              <button
                id="btn-boot-sim"
                onClick={handleStartSimulation}
                className="px-6 py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(244,223,200,0.22)] border border-luxury-gold"
              >
                <Play className="w-4 h-4 fill-black text-black" />
                Boot Grid
              </button>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE INTERACTIVE WORKSPACE TERMINAL */
          <motion.div
            key="active-sim-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
          >
            
            {/* Left: Terminal panel / Log sequence */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Core Terminal Component */}
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center bg-black/95 border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-luxury-gold animate-pulse" />
                    <span className="text-xs font-mono text-luxury-gold font-bold uppercase tracking-wider">Nexus Console V9.1 · Connected</span>
                  </div>
                  <div className="text-[10px] text-luxury-gray font-mono">CANDIDATE_GATEWAY_ACTIVE</div>
                </div>

                <div className="p-5 min-h-[300px] max-h-[350px] overflow-y-auto flex flex-col gap-2 font-mono text-luxury-white text-xs">
                  {terminalOutput.map((log, idx) => (
                    <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                      {log}
                    </div>
                  ))}
                </div>

                {/* Input prompt */}
                <form onSubmit={handleCommandSubmit} className="flex border-t border-white/5 bg-black/40 p-3 items-center">
                  <span className="text-xs font-mono text-luxury-bronze mr-2 ml-1">user@nexus:~$</span>
                  <input
                    type="text"
                    id="sim-terminal-input"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Enter command... (help, diagnostics, purge, sync)"
                    className="flex-grow bg-transparent text-xs text-white outline-none border-none placeholder:text-zinc-705 font-mono"
                  />
                  <button type="submit" id="btn-terminal-submit" className="p-2 rounded-lg hover:bg-white/5 text-luxury-gold">
                    <Command className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Status indicator meters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 border border-white/10 bg-luxury-beige/[0.04] backdrop-blur-xl rounded-[22px] shadow-md">
                  <span className="text-xs text-luxury-gray font-mono uppercase tracking-widest block mb-1">System Synchronization</span>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-2 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-gold" style={{ width: `${systemSync}%` }} />
                    </div>
                    <span className="text-sm font-mono text-luxury-gold font-bold">{systemSync}%</span>
                  </div>
                </div>

                <div className="p-5 border border-white/10 bg-luxury-beige/[0.04] backdrop-blur-xl rounded-[22px] shadow-md">
                  <span className="text-xs text-luxury-gray font-mono uppercase tracking-widest block mb-1">CPU Quantum Thread Load</span>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-2 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-luxury-bronze" style={{ width: `${cpuLoad}%` }} />
                    </div>
                    <span className="text-sm font-mono text-luxury-bronze font-bold">{cpuLoad}%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Daily Incidents & Comms with teammate prompts */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Daily incidents backlog */}
              <div className="bg-[#F4EAE0]/[0.04] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-xl">
                <h3 className="text-white text-md font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-4.5 h-4.5 text-luxury-gold" />
                  Daily Incident Decoupler
                </h3>

                <div className="flex flex-col gap-4">
                  {activeTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                        t.status === "completed" 
                          ? "bg-white/[0.01] border-white/5 text-luxury-gray" 
                          : "bg-white/5 border-white/10 hover:bg-white/[0.07] text-white animate-pulse"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-mono font-bold uppercase ${t.difficulty === 'Critical' ? 'text-red-400' : 'text-luxury-gray'}`}>
                            Difficulty: {t.difficulty}
                          </span>
                          <span className={`text-xs font-semibold mt-0.5 ${t.status === "completed" ? "line-through text-luxury-gray" : "text-white"}`}>
                            {t.title}
                          </span>
                        </div>
                        {t.status === "completed" ? (
                          <div className="p-1 rounded-full bg-luxury-beige/10 text-luxury-gold border border-luxury-gold/20">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <button
                            id={`btn-solve-task-${t.id}`}
                            onClick={() => resolveTask(t.id)}
                            className="px-2 py-1.5 rounded-lg bg-luxury-gold hover:bg-luxury-gold-hover text-black text-[10px] uppercase font-mono tracking-wider font-extrabold cursor-pointer transition-colors shadow-[0_4px_10px_rgba(244,223,200,0.2)] border border-luxury-gold"
                          >
                            Execute Resolve
                          </button>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${t.status === "completed" ? "text-luxury-gray" : "text-white/80"}`}>
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teammate Comms Node */}
              <div className="bg-[#F4EAE0]/[0.04] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-xl">
                <h3 className="text-white text-md font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-luxury-gold" />
                  Grid Comms Node
                </h3>

                <div className="flex flex-col gap-4">
                  {messages.map((m, idx) => (
                    <div key={idx} className="flex gap-3 leading-relaxed text-left border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                      <div className="w-8.5 h-8.5 rounded-xl bg-white/5 border border-white/15 text-luxury-gold font-mono text-xs uppercase flex items-center justify-center font-bold">
                        {m.speaker.slice(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                          <span className="text-xs text-white font-semibold">{m.speaker}</span>
                          <span className="text-[9px] uppercase font-mono text-luxury-gold bg-white/10 border border-white/10 px-1.5 py-0.2 rounded-md">
                            {m.role}
                          </span>
                        </div>
                        <p className="text-luxury-white text-xs mt-1.5 font-light">
                          "{m.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
