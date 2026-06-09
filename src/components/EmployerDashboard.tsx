import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, Sparkles, Plus, Send, CheckCircle2, ChevronRight, BarChart2, 
  Target, Zap, Briefcase, FileText, Globe, GraduationCap, Users, Trash2, Heart
} from "lucide-react";
import { jsPDF } from "jspdf";

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  salaryRange: string;
  workMode: 'remote' | 'hybrid' | 'on-site';
  schedule: 'full-time' | 'internship';
  skillsRequired: string[];
  description: string;
  deadline: string;
}

export default function EmployerDashboard() {
  // Navigation: 'analytics' | 'hiring' | 'talent' | 'company'
  const [activeTab, setActiveTab] = useState<'analytics' | 'hiring' | 'talent' | 'company'>('analytics');

  // Company Profile State
  const [companyDetails, setCompanyDetails] = useState({
    name: "Aetheria Intelligence Node",
    tagline: "High-dimensional neural compute & cognitive architecture systems",
    about: "Aetheria is an hyper-scalable software and deep cognitive research enterprise creating multi-modal transformer complexes and superdense entanglement registers for global Fortune 50 clients.",
    mission: "To eliminate logical friction states between human synaptic thought and synthetic systems engineering parameters.",
    culture: "Autonomous, brutalist transparency, continuous vector calibration, luxurious intellectual curiosity.",
    website: "https://aetheria.intelligence",
    officeGallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
    ],
    achievements: ["Delivered world's first multi-dimensional reasoning synapse cluster v1", "Top 10 Quantum Compute Developer Choice Awards 2026"]
  });

  // Hiring Posts State
  const [jobPosts, setJobPosts] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem("nexus_jobs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    const defaultJobs = [
      {
        id: "j1",
        title: "AI Core Synaptic Architect",
        department: "Cognitive Engineering Group",
        location: "San Francisco, CA / Remote",
        salaryRange: "$240,000 - $310,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Transformer Mechanics", "Tensor Entrapment", "PyTorch Matrix Tuning"],
        description: "Direct engineering overlay on liquid-network cognitive structures. Focuses heavily on reducing model weight decay parameters and micro-attention tuning cycles.",
        deadline: "2026-07-15"
      },
      {
        id: "j2",
        title: "Quantum Cryo-Security Engineer",
        department: "Failsafe Decoupling team",
        location: "Geneva, Switzerland / Hybrid",
        salaryRange: "$195,000 - $265,000",
        workMode: "hybrid",
        schedule: "full-time",
        skillsRequired: ["Qubit Cryo Shielding", "Preemptive Quantum Leak Detection"],
        description: "Supervise deep physical cryo containment units housing our 64-qubit cryptographic processing grid. Perfect compliance safeguards architecture.",
        deadline: "2026-06-30"
      },
      {
        id: "j3",
        title: "Holographic UX Spatial Designer",
        department: "Brutalist Experience lab",
        location: "Kyoto, Japan / Remote",
        salaryRange: "$175,000 - $220,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Spatial Viewport Projection", "Zero-G Interface Physics", "Holographic Emissives"],
        description: "Craft next-generation responsive spatial displays projecting multidimensional candidate metrics. Work heavily with light wave interference matrices to resolve cognitive eye fatigue.",
        deadline: "2026-08-10"
      },
      {
        id: "j4",
        title: "Neuromorphic Infrastructure Director",
        department: "Cognitive Engineering Group",
        location: "Austin, TX / On-Site",
        salaryRange: "$280,000 - $350,005",
        workMode: "on-site",
        schedule: "full-time",
        skillsRequired: ["SpiNNaker Systems", "Analog Threshold Silicon", "Synaptic Bus Routing"],
        description: "Lead deployment of neuromorphic brain-silicon compute cores. You will scale 10,000-layer spiking neural network chassis arrays in secure bunker grids.",
        deadline: "2026-09-01"
      },
      {
        id: "j5",
        title: "Bio-Cybernetics Ethics Officer",
        department: "Failsafe Decoupling team",
        location: "Paris, France / Remote",
        salaryRange: "$160,040 - $210,000",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Synaptic Autonomy Ethics", "Bypass Loop Safeguards", "Cognitive Sovereignty Auditing"],
        description: "Draft alignment protocols governing synthetic thought synthesis. Protect consumer neural buffers from persistent enterprise advertising injections and override states.",
        deadline: "2026-10-12"
      },
      {
        id: "j6",
        title: "Deep Space Algorithmic Strategist",
        department: "Cognitive Engineering Group",
        location: "Singapore Grid Node / Hybrid",
        salaryRange: "$310,000 - $420,000",
        workMode: "hybrid",
        schedule: "full-time",
        skillsRequired: ["Relativistic Arbitrage", "Lag-Tolerant Models", "Telemetry Aggregation"],
        description: "Optimize high stakes trades using lag-tolerant intelligence models synchronized over lunar laser transceivers. Leverage orbital relays with extreme latency mitigation.",
        deadline: "2026-12-05"
      },
      {
        id: "j7",
        title: "Synthetic Genetics Protocol Lead",
        department: "Cybernetics Bio-Grid",
        location: "Boston, MA / On-Site",
        salaryRange: "$225,000 - $290,000",
        workMode: "on-site",
        schedule: "full-time",
        skillsRequired: ["CRISPR Compiler Tools", "Base-Pair Wave-Interference", "Metabolic Logic Gates"],
        description: "Direct computer-assisted gene compiling arrays. Your software will compile customizable somatic upgrades for extreme marine deep-sea environments and radiation shields.",
        deadline: "2026-08-25"
      },
      {
        id: "j8",
        title: "Quantum Entanglement Comms Architect",
        department: "Failsafe Decoupling team",
        location: "Seoul, South Korea / Remote",
        salaryRange: "$185,000 - $250,100",
        workMode: "remote",
        schedule: "full-time",
        skillsRequired: ["Quantum State Decoherence Safeguards", "Bell State Synthesis", "Sub-space Ingress"],
        description: "Deploy zero-latency secure quantum entanglement radio-frequency bridges linking neural satellite arrays to global enterprise nodes.",
        deadline: "2026-11-20"
      }
    ];
    localStorage.setItem("nexus_jobs", JSON.stringify(defaultJobs));
    return defaultJobs;
  });

  // Form states for creating new jobs
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Cognitive Engineering Group");
  const [newLoc, setNewLoc] = useState("");
  const [newSalary, setNewSalary] = useState("$180,000 - $240,000");
  const [newMode, setNewMode] = useState<'remote' | 'hybrid' | 'on-site'>('remote');
  const [newSchedule, setNewSchedule] = useState<'full-time' | 'internship'>('full-time');
  const [newSkillsStr, setNewSkillsStr] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [aisynthesizing, setAisynthesizing] = useState(false);

  // Simulated AI Candidates
  const [candidatesList, setCandidatesList] = useState([
    {
      id: "c1",
      name: "Elena Rostova",
      title: "Senior AI & Synaptic Engineer",
      matchScore: 98.7,
      gpaAndSchool: "M.S. MIT Quantum Sciences",
      skills: ["Tensor Entrapment", "Transformer Mechanics", "PyTorch Matrix Tuning", "Neural Decoupling"],
      bio: "Highly specialized in developing self-reflection and parameter distillation layers in distributed systems. Completed 14 production model alignments.",
      isSaved: true
    },
    {
      id: "c2",
      name: "Marcus Vance",
      title: "Holographic Lead Architect",
      matchScore: 94.2,
      gpaAndSchool: "Stanford CS Core Graduate",
      skills: ["High-Dimensional Logic", "Synthetic Synaptogenesis", "Linear Superpositions"],
      bio: "Created decentralized topological graph retrieval pipelines for multi-agent grids. Leverages WebAssembly compiler loops.",
      isSaved: true
    },
    {
      id: "c3",
      name: "Sienna Drake",
      title: "Cryo Shield Security Specialist",
      matchScore: 91.8,
      gpaAndSchool: "ETH Zurich Security Labs",
      skills: ["Qubit Cryo Shielding", "Preemptive Quantum Leak Detection", "Decoupled Cryptography"],
      bio: "Physical system researcher specializing in temperature coefficient models to resist side-channel qubit state interception.",
      isSaved: false
    }
  ]);

  const toggleSaveCandidate = (id: string) => {
    setCandidatesList(prev => prev.map(c => c.id === id ? { ...c, isSaved: !c.isSaved } : c));
  };

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const exportSavedCandidatesPDF = () => {
    const saved = candidatesList.filter(c => c.isSaved);
    if (saved.length === 0) {
      alert("No stored candidates found. Please save target candidates using the Heart icon prior to export.");
      return;
    }

    setPdfGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate dark background of header
      doc.rect(0, 0, 595, 140, "F");

      // Header Accent line
      doc.setFillColor(244, 223, 200); // gold
      doc.rect(0, 137, 595, 3, "F");

      // Title & Subtitle inside PDF
      doc.setFont("helvetica", "bold");
      doc.setTextColor(244, 223, 200);
      doc.setFontSize(22);
      doc.text("AETHER CORE RECRUITMENT SYSTEM", 40, 55);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(248, 250, 252);
      doc.setFontSize(10);
      doc.text("HIGH-DIMENSIONAL TALENT MATRIX SELECTION", 40, 75);

      doc.setTextColor(148, 163, 184);
      doc.text(`Export Timestamp: ${new Date().toLocaleString()}`, 40, 95);
      doc.text(`Total Candidates Synced: ${saved.length}`, 40, 110);

      let yOffset = 180;

      saved.forEach((cand, idx) => {
        // Page boundary safety
        if (yOffset > 650) {
          doc.addPage();
          // Paint simple page header
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, 595, 50, "F");
          doc.setFillColor(244, 223, 200);
          doc.rect(0, 48, 595, 2, "F");
          doc.setFont("helvetica", "bold");
          doc.setTextColor(244, 223, 200);
          doc.setFontSize(12);
          doc.text("AETHER CANDIDATE EVALUATION LOG", 40, 30);
          yOffset = 80;
        }

        // Draw profile card block
        doc.setDrawColor(226, 232, 240);
        doc.setFillColor(250, 250, 250);
        doc.rect(35, yOffset, 525, 155, "F");
        doc.rect(35, yOffset, 525, 155, "D");

        // Mini Match badge inside PDF card
        doc.setFillColor(15, 118, 110); // green matching block
        doc.rect(455, yOffset + 15, 85, 25, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.text(`${cand.matchScore}% MATCH`, 465, yOffset + 31);

        // Name
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.text(cand.name, 50, yOffset + 30);

        // Title
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.text(cand.title, 50, yOffset + 48);

        // School/GPA
        doc.setFont("helvetica", "italic");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.text(cand.gpaAndSchool, 50, yOffset + 63);

        // Bio split for clean line wrapping
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(9.5);
        const bioText = cand.bio;
        const splitBio = doc.splitTextToSize(bioText, 495);
        doc.text(splitBio, 50, yOffset + 85);

        // Core Skills Title
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.text("ALIGNED SKILLS:", 50, yOffset + 130);

        // Skills mapped horizontally with bullet
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 118, 110);
        doc.setFontSize(9);
        const skillsLine = cand.skills.join("  |  ");
        doc.text(skillsLine, 145, yOffset + 130);

        yOffset += 180;
      });

      // Save document
      doc.save(`Aether_Saved_Talent_Summary_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF engine failure:", err);
      alert("Encountered PDF rendering issue. Local telemetry fallback loaded.");
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const skillsArr = newSkillsStr
      ? newSkillsStr.split(",").map(s => s.trim()).filter(Boolean)
      : ["Cognitive Design", "Quantum Topology"];

    const newJob: JobPost = {
      id: `j_${Date.now()}`,
      title: newTitle,
      department: newDept,
      location: newLoc || "Silicon Valley Grid",
      salaryRange: newSalary,
      workMode: newMode,
      schedule: newSchedule,
      skillsRequired: skillsArr,
      description: newDescription,
      deadline: "2026-08-30"
    };

    const updatedJobs = [newJob, ...jobPosts];
    setJobPosts(updatedJobs);
    localStorage.setItem("nexus_jobs", JSON.stringify(updatedJobs));
    // reset form
    setNewTitle("");
    setNewLoc("");
    setNewSkillsStr("");
    setNewDescription("");
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobPosts.filter(j => j.id !== id);
    setJobPosts(updatedJobs);
    localStorage.setItem("nexus_jobs", JSON.stringify(updatedJobs));
  };

  // Triggers luxury simulated AI Job Description synthesis
  const handleAISynthesize = async () => {
    if (!newTitle.trim()) return;
    setAisynthesizing(true);
    
    try {
      // Call our career prediction server route to extrapolate a highly advanced, luxurious description outline
      const response = await fetch("/api/career/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `Provide a luxurious 2-sentence recruitment description and 3 required tools for an elite role: ${newTitle}` })
      });
      if (response.ok) {
        const data = await response.json();
        setNewDescription(`${data.summary || ""} This elite role requires immediate alignment with ${data.skills?.join(", ") || "advanced quantum workflows"}.`);
        setNewSkillsStr(data.skills?.join(", ") || "Model Calibration, Quantum Logic, Cognitive Synthesis");
      } else {
        setNewDescription(`We are seeking an elite ${newTitle} to architect high stakes logical parameters. Deep alignment across enterprise nodes and continuous self-reflection frameworks is mandatory.`);
      }
    } catch {
      setNewDescription(`We are seeking an elite ${newTitle} to architect high stakes logical parameters. Deep alignment across enterprise nodes and continuous self-reflection frameworks is mandatory.`);
    } finally {
      setAisynthesizing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 text-left">
      
      {/* Dynamic Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 matches-glow">
          <Building className="w-4 h-4 text-white" />
          Enterprise Recruiter Deck
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mb-2">
          Nexus Recruiting Core
        </h2>
        <p className="text-slate-400 mt-1 text-sm font-light">
          Configure company culture models, deploy high stakes recruitment job posts, and let AI discovery recommend candidate vectors with high synaptic match rates.
        </p>
      </div>

      {/* Luxury Minimal Selector Tabs */}
      <div className="flex border-b border-white/5 pb-1 gap-1 flex-wrap">
        {[
          { id: 'analytics', label: 'Candidate Analytics', icon: BarChart2 },
          { id: 'hiring', label: 'Hiring Post Engine', icon: Briefcase },
          { id: 'talent', label: 'AI Talent Discovery', icon: Target },
          { id: 'company', label: 'Company Profile Hub', icon: Building }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4.5 py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-white text-black shadow-lg" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        
        {/* Tab 1: Analytics Screen */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            
            {/* Quick stats grid */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Active Job Listings", value: jobPosts.length, change: "Optimal Match Pipeline", active: true },
                { label: "Total Applications Received", value: "1,492", change: "+14.8% over last index", active: false },
                { label: "Mean Synaptic Match", value: "89.4%", change: "High Congruence Threshold", active: false },
                { label: "Average Relocation Index", value: "98.2%", change: "Globally Scalable Talent", active: true }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-slate-900/40 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-xl">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">{stat.label}</span>
                  <p className="text-4xl font-mono font-extrabold text-white">{stat.value}</p>
                  <span className={`text-[10px] font-mono mt-2 block ${stat.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                    · {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Custom SVG telemetry Chart */}
            <div className="md:col-span-8 bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-xl relative flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Recruitment Pipeline Matrix</span>
                <h4 className="text-white font-bold text-lg">Candidate Sourcing Telemetry</h4>
              </div>

              {/* Graphical representation */}
              <div className="h-64 w-full flex items-end justify-between px-4 pb-2 border-b border-white/5 pt-8">
                {[
                  { label: "Synaptic AI", height: "h-[85%]", val: "542" },
                  { label: "Quantum Devs", height: "h-[65%]", val: "318" },
                  { label: "Cybernetics", height: "h-[45%]", val: "192" },
                  { label: "Interface Des", height: "h-[50%]", val: "223" },
                  { label: "BioTech Sec", height: "h-[30%]", val: "105" }
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 w-1/5 group">
                    <span className="text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity mb-1">{bar.val}</span>
                    <div className="w-12 bg-white/10 hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-t-lg transition-all duration-300 relative overflow-hidden">
                      <div className={`w-full ${bar.height} bg-white rounded-t-lg`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider text-center block mt-1 truncate w-full">{bar.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>SYSTEM CYCLE REVELATION #059</span>
                <span>DATA INTEGRATION STYLING</span>
              </div>
            </div>

            {/* AI Insights panel */}
            <div className="md:col-span-4 bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Cognitive Recruiting Recommendation</span>
                <h4 className="text-white font-bold text-md flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-white" /> AI System Recommendation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light mt-1">
                  Our intelligence predicts a 14% high stakes shortage of experienced <strong>Cryo-Security Engineers</strong> in late Q3. We recommend raising starting compensations bounds or activating targeted headhunting campaigns on our Skill Galaxy network.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Active talent pool density</span>
                <span className="text-xl font-mono text-white font-extrabold">98.4 / 100</span>
                <p className="text-[10px] text-slate-500 mt-1">High readiness score detected globally.</p>
              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 2: Hiring Post Engine */}
        {activeTab === 'hiring' && (
          <motion.div
            key="hiring"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Create job form in glass panel */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-4">Post New Coordinate Node</span>
              
              <form onSubmit={handleCreateJob} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Target Role Title</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AI Core Synaptic Architect"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="flex-grow bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAISynthesize}
                      disabled={!newTitle.trim() || aisynthesizing}
                      className="px-3 bg-white/5 border border-white/10 hover:bg-white text-slate-300 hover:text-black rounded-xl text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {aisynthesizing ? "Synthesizing..." : "AI"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Department</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none"
                    >
                      <option value="Cognitive Engineering Group">Cognitive Group</option>
                      <option value="Failsafe Decoupling team">Failsafe Team</option>
                      <option value="Brutalist Experience lab">UI/UX Labs</option>
                      <option value="Cybernetics Bio-Grid">Bio-Cybernetics</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Comp Range</label>
                    <input
                      type="text"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Work Mode</label>
                    <select
                      value={newMode}
                      onChange={(e) => setNewMode(e.target.value as any)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="on-site">On-Site</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Schedule Type</label>
                    <select
                      value={newSchedule}
                      onChange={(e) => setNewSchedule(e.target.value as any)}
                      className="bg-slate-950 border border-white/10 text-xs text-white p-3 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Required Skills (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="LoRA, Triton Kernels, PEFT"
                    value={newSkillsStr}
                    onChange={(e) => setNewSkillsStr(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Job Description (Recruitment Axioms)</label>
                  <textarea
                    rows={4}
                    placeholder="Define roles, work guidelines, or strategic milestones..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-[#EAEAEA] text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  Publish Recruiting Target
                </button>
              </form>
            </div>

            {/* List of active published jobs */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Deployed Active Hiring Targets ({jobPosts.length})</span>
              
              <div className="flex flex-col gap-4">
                {jobPosts.map((job) => (
                  <div key={job.id} className="p-6 bg-slate-900/40 border border-white/10 rounded-3xl hover:border-white/20 transition-all flex flex-col gap-4 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          {job.department}
                        </span>
                        <h4 className="text-xl font-bold text-white mt-2.5">{job.title}</h4>
                      </div>
                      <button 
                        onClick={() => deleteJob(job.id)}
                        className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-330 leading-relaxed font-light">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {job.skillsRequired.map((sk, i) => (
                        <span key={i} className="text-[9px] font-mono bg-white/5 text-slate-300 px-2.5 py-1 rounded-md border border-white/5">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-2 text-left">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Compensation Map</span>
                        <p className="text-xs font-mono text-white mt-0.5 font-bold">{job.salaryRange}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Work Model</span>
                        <p className="text-xs font-mono text-white mt-0.5 font-bold capitalize">{job.workMode}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Schedule</span>
                        <p className="text-xs font-mono text-white mt-0.5 font-bold capitalize">{job.schedule}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 3: AI Talent Discovery */}
        {activeTab === 'talent' && (
          <motion.div
            key="talent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">AI-Recommended Profiles</span>
                <h4 className="text-white font-bold text-lg">Top Aligned Talent Coordinates</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
                  {candidatesList.length} TOTAL SYNCED · {candidatesList.filter(c => c.isSaved).length} SAVED
                </span>
                <button
                  onClick={exportSavedCandidatesPDF}
                  disabled={pdfGenerating}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-tr from-[#F4DFC8] to-[#e4cfb8] hover:scale-[1.03] active:scale-[0.97] text-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(244,223,200,0.15)] disabled:opacity-50"
                >
                  <FileText className="w-3.5 h-3.5 text-black" />
                  {pdfGenerating ? "Synthesizing PDF..." : "Export Formatted PDF Summary"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {candidatesList.map((cand) => (
                <div key={cand.id} className="bg-slate-900/40 border border-[#F4DFC8]/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[440px] hover:border-[#F4DFC8]/35 transition-all group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-white font-bold text-xs select-none shadow-sm">
                        {cand.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 shadow-inner">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          {cand.matchScore}% Match
                        </div>
                        <button
                          onClick={() => toggleSaveCandidate(cand.id)}
                          className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                            cand.isSaved 
                              ? "bg-rose-500/15 border-rose-500/40 text-rose-500" 
                              : "bg-white/5 border-white/5 text-slate-400 hover:text-rose-400 hover:border-rose-400/30"
                          }`}
                          title={cand.isSaved ? "Unsave candidate profile" : "Save candidate profile"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${cand.isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                        </button>
                      </div>
                    </div>
 
                    <div>
                      <h4 className="text-xl font-bold text-white font-sans">{cand.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{cand.title}</p>
                      <span className="text-[9px] text-[#EAEAEA] font-mono mt-1 block tracking-wider">{cand.gpaAndSchool}</span>
                    </div>
 
                    <p className="text-xs text-slate-300 leading-relaxed font-light my-2">
                      {cand.bio}
                    </p>
 
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((sk, i) => (
                        <span key={i} className="text-[9px] font-mono bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
 
                  <div className="border-t border-white/5 pt-4 mt-6 flex gap-2">
                    <button
                      onClick={() => alert(`Contact request project code successfully initiated to ${cand.name}.`)}
                      className="flex-grow py-2.5 bg-white text-black hover:bg-[#EAEAEA] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Request Interlock Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 4: Company Profile Hub */}
        {activeTab === 'company' && (
          <motion.div
            key="company"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            
            {/* Form details */}
            <div className="md:col-span-12 lg:col-span-7 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-4">Edit Core Company Profile Grid</span>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Enterprise Node Name</label>
                    <input
                      type="text"
                      value={companyDetails.name}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Global Website Gateway</label>
                    <input
                      type="text"
                      value={companyDetails.website}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, website: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Company Tagline Headline</label>
                  <input
                    type="text"
                    value={companyDetails.tagline}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, tagline: e.target.value })}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">About Enterprise</label>
                  <textarea
                    rows={3}
                    value={companyDetails.about}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, about: e.target.value })}
                    className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Structured Mission</label>
                    <textarea
                      rows={2}
                      value={companyDetails.mission}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, mission: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none resize-none leading-relaxed"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-mono text-slate-400">Team Cultural Axioms</label>
                    <textarea
                      rows={2}
                      value={companyDetails.culture}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, culture: e.target.value })}
                      className="bg-white/5 border border-white/10 focus:border-white/30 text-xs text-white p-3 rounded-xl outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert("Company profile changes synced to master nodes successfully.")}
                  className="py-3 bg-white text-black font-semibold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  Commit Profile State Updates
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-2">Holographic Public Preview</span>
                
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xl shadow-inner">
                    AE
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white font-sans">{companyDetails.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono italic">{companyDetails.website}</span>
                  </div>
                </div>

                <h5 className="text-xs text-white font-bold tracking-tight italic mt-1 font-sans">
                  "{companyDetails.tagline}"
                </h5>

                <p className="text-xs text-slate-330 leading-relaxed font-light">
                  {companyDetails.about}
                </p>

                <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 mt-2">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Mission Objectives</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-1">{companyDetails.mission}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">Culture Profile</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-1">{companyDetails.culture}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Gallery Backplane</span>
                <div className="grid grid-cols-2 gap-2">
                  {companyDetails.officeGallery.map((url, i) => (
                    <img key={i} src={url} alt="Office" className="w-full h-16 object-cover rounded-lg border border-white/10" />
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
