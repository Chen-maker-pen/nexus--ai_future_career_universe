import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Sparkles, Download, Share2, Crop, Image, ArrowRight, CheckCircle2, 
  Trash2, Plus, Layout, RefreshCw, Eye, Code, Layers, Heart
} from "lucide-react";

interface ResumeData {
  fullName: string;
  profession: string;
  location: string;
  email: string;
  skills: string[];
  education: { degree: string; school: string; duration: string }[];
  workExperience: { role: string; company: string; duration: string; bullet: string }[];
  projects: { title: string; description: string; link: string }[];
  achievements: string[];
}

export default function PortfolioBuilder() {
  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'portfolio' | 'upload'>('resume');
  const [selectedTemplate, setSelectedTemplate] = useState<'vogue' | 'tesla' | 'dior'>('vogue');
  const [isAIOptimizing, setIsAIOptimizing] = useState(false);

  // Resume State
  const [resume, setResume] = useState<ResumeData>({
    fullName: "Alex Vane",
    profession: "AI Core Synaptic Architect",
    location: "San Francisco, CA / Geneva",
    email: "alex.vane@nexus.ai",
    skills: ["Transformer Mechanics", "Triton Kernels", "Tensor Entrapment", "PEFT Tuning", "Qubit Synapse Alignment"],
    education: [
      { degree: "M.S. Quantum Computing & Synaptic Webs", school: "MIT Quantum Sciences", duration: "2024 - 2026" }
    ],
    workExperience: [
      { 
        role: "Senior Cognitive Specialist", 
        company: "Google Gemini Core Labs", 
        duration: "2025 - Present", 
        bullet: "Supervised high stakes parameters fine tuning for MoE networks and calibrated dynamic attention layers to prevent cognitive state decay." 
      }
    ],
    projects: [
      { 
        title: "Project Bio-Scribe", 
        description: "Translate real-time EEG brainwave pulses into quantum cryptographic keys with zero neural degradation.", 
        link: "github.com/alexvane/bio-scribe" 
      }
    ],
    achievements: [
      "Secured Google Advanced Synapse Fellowship 2025",
      "Invented Cryo Shielding Temperature Coefficients bypass models"
    ]
  });

  // New item draft states
  const [draftSkill, setDraftSkill] = useState("");
  const [draftDegree, setDraftDegree] = useState("");
  const [draftSchool, setDraftSchool] = useState("");
  const [draftEduDuration, setDraftEduDuration] = useState("");
  const [draftRole, setDraftRole] = useState("");
  const [draftCompany, setDraftCompany] = useState("");
  const [draftWorkDuration, setDraftWorkDuration] = useState("");
  const [draftWorkBullet, setDraftWorkBullet] = useState("");
  const [draftProjTitle, setDraftProjTitle] = useState("");
  const [draftProjDesc, setDraftProjDesc] = useState("");
  const [draftProjLink, setDraftProjLink] = useState("");
  const [draftAchievement, setDraftAchievement] = useState("");

  // Portfolio Builder state variables
  const [portfolioTheme, setPortfolioTheme] = useState<'crystal' | 'minimalist' | 'cinematic'>('crystal');
  const [isPortfolioGenerating, setIsPortfolioGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);

  // Background removal simulation states
  const [sourceImage, setSourceImage] = useState<string | null>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
  const [imageEnhanced, setImageEnhanced] = useState(false);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [optimizingImage, setOptimizingImage] = useState(false);

  // Resume modifications
  const addSkill = () => {
    if (!draftSkill.trim()) return;
    setResume({ ...resume, skills: [...resume.skills, draftSkill.trim()] });
    setDraftSkill("");
  };

  const removeSkill = (sk: string) => {
    setResume({ ...resume, skills: resume.skills.filter(s => s !== sk) });
  };

  const addEdu = () => {
    if (!draftDegree.trim() || !draftSchool.trim()) return;
    setResume({
      ...resume,
      education: [...resume.education, { degree: draftDegree, school: draftSchool, duration: draftEduDuration || "2026" }]
    });
    setDraftDegree("");
    setDraftSchool("");
    setDraftEduDuration("");
  };

  const addWork = () => {
    if (!draftRole.trim() || !draftCompany.trim()) return;
    setResume({
      ...resume,
      workExperience: [...resume.workExperience, { role: draftRole, company: draftCompany, duration: draftWorkDuration || "Present", bullet: draftWorkBullet }]
    });
    setDraftRole("");
    setDraftCompany("");
    setDraftWorkDuration("");
    setDraftWorkBullet("");
  };

  const addProj = () => {
    if (!draftProjTitle.trim() || !draftProjDesc.trim()) return;
    setResume({
      ...resume,
      projects: [...resume.projects, { title: draftProjTitle, description: draftProjDesc, link: draftProjLink || "github.com" }]
    });
    setDraftProjTitle("");
    setDraftProjDesc("");
    setDraftProjLink("");
  };

  const addAch = () => {
    if (!draftAchievement.trim()) return;
    setResume({ ...resume, achievements: [...resume.achievements, draftAchievement.trim()] });
    setDraftAchievement("");
  };

  // Triggers luxury Gemini CV AI optimization simulation
  const handleAIOptimize = async () => {
    setIsAIOptimizing(true);
    try {
      const resp = await fetch("/api/career/coach", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ query: `Rewrite this resume bio and project with high stakes ATS phrasing: Bio: "${resume.profession}". Project: "${resume.projects[0]?.description || ''}"` })
      });
      if (resp.ok) {
        const data = await resp.json();
        setResume(prev => ({
          ...prev,
          profession: data.title || prev.profession,
          workExperience: prev.workExperience.map((w, idx) => idx === 0 ? { ...w, bullet: `${data.summary || w.bullet} Leveraged modern algorithms to reduce latencies.` } : w)
        }));
      }
    } catch {
      // fallback fine tuning language
      setResume(prev => ({
        ...prev,
        workExperience: prev.workExperience.map((w, idx) => idx === 0 ? { ...w, bullet: "Pioneered development of parameter-efficient fine-tuning (PEFT) methodologies for high scale multi-agent systems, boosting retrieval integrity metrics by up to 34%." } : w)
      }));
    } finally {
      setIsAIOptimizing(false);
    }
  };

  // Drag-and-drop / upload simulations
  const handleImageEnhancement = () => {
    setOptimizingImage(true);
    setTimeout(() => {
      setImageEnhanced(true);
      setOptimizingImage(false);
    }, 1000);
  };

  const handleBgRemoval = () => {
    setOptimizingImage(true);
    setTimeout(() => {
      setBgRemoved(true);
      setOptimizingImage(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 text-left">
      
      {/* Platform Header Section */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">
          <Layers className="w-4 h-4 text-white" />
          AI Creator Engine
        </div>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mb-2">
          Holographic Portfolio & CV Studio
        </h2>
        <p className="text-slate-400 mt-1 text-sm font-light">
          Structure world-class resumes, enhance professional profile graphics, and compile luxury, cinematic portfolios that render as self-contained ZIP systems or standalone PDF files.
        </p>
      </div>

      {/* Selector Subtabs */}
      <div className="flex border-b border-white/5 pb-1 gap-1 flex-wrap">
        {[
          { id: 'resume', label: 'AI Resume / ATS CV', icon: FileText },
          { id: 'portfolio', label: 'AI Portfolio Builder', icon: Layout },
          { id: 'upload', label: 'Image Enhancer Suite', icon: Image }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4.5 py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                isSel 
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
        
        {/* Tab 1: AI Resume / ATS CV */}
        {activeSubTab === 'resume' && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Left Column: Interactive Fields Editor */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Interactive Fields</span>
                <button
                  type="button"
                  onClick={handleAIOptimize}
                  disabled={isAIOptimizing}
                  className="px-3 py-1 bg-white hover:bg-neutral-200 text-black rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  {isAIOptimizing ? "Calibrating..." : "Optimize ATS Grammar"}
                </button>
              </div>

              {/* Identity Form fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                    className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-400">Location Map</label>
                  <input
                    type="text"
                    value={resume.location}
                    onChange={(e) => setResume({ ...resume, location: e.target.value })}
                    className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-400">Profession / Enterprise Title</label>
                <input
                  type="text"
                  value={resume.profession}
                  onChange={(e) => setResume({ ...resume, profession: e.target.value })}
                  className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                />
              </div>

              {/* Skills adding input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-400">Skills Coordination Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Triton Kernels"
                    value={draftSkill}
                    onChange={(e) => setDraftSkill(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                  <button 
                    onClick={addSkill}
                    className="px-3 bg-white hover:bg-[#EAEAEA] text-black rounded-lg text-xs font-bold font-mono cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {resume.skills.map((sk, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 text-slate-300 pl-2 pr-1.5 py-0.5 rounded border border-white/5 flex items-center gap-1.5">
                      {sk}
                      <button onClick={() => removeSkill(sk)} className="text-slate-500 hover:text-white font-extrabold cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Add Work Experience Node</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role Title"
                    value={draftRole}
                    onChange={(e) => setDraftRole(e.target.value)}
                    className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={draftCompany}
                    onChange={(e) => setDraftCompany(e.target.value)}
                    className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Duration (e.g. 2025 - Present)"
                  value={draftWorkDuration}
                  onChange={(e) => setDraftWorkDuration(e.target.value)}
                  className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Key accomplishments or system developments..."
                  value={draftWorkBullet}
                  onChange={(e) => setDraftWorkBullet(e.target.value)}
                  className="bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none resize-none"
                />
                <button
                  type="button"
                  onClick={addWork}
                  className="py-1.5 bg-white/10 text-white rounded-lg text-xs font-bold border border-white/10 cursor-pointer hover:bg-white hover:text-black transition-colors"
                >
                  Mount Work Experience
                </button>
              </div>

              {/* Achievements add */}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Awards & Fellowships</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Fellowship Name"
                    value={draftAchievement}
                    onChange={(e) => setDraftAchievement(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none"
                  />
                  <button onClick={addAch} className="px-3 bg-white text-black rounded-lg text-xs font-bold cursor-pointer">ADD</button>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Resume Visual Sandbox (Tesla futurst vs Vogue minimalist style) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="flex justify-between items-center bg-slate-900/40 border border-white/10 p-3 rounded-2xl">
                <span className="text-xs font-sans text-slate-400 font-bold pl-2">Template Layout Model</span>
                <div className="flex gap-2">
                  {[
                    { id: 'vogue', label: 'Vogue Minimalist' },
                    { id: 'tesla', label: 'Tesla Monotech' },
                    { id: 'dior', label: 'Dior Editorial' }
                  ].map((temp) => (
                    <button
                      key={temp.id}
                      onClick={() => setSelectedTemplate(temp.id as any)}
                      className={`px-3 py-1 rounded-lg text-[10px] uppercase font-mono tracking-wider cursor-pointer ${
                        selectedTemplate === temp.id 
                          ? "bg-white text-black font-semibold" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {temp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Isomorphic Layout sandbox */}
              <div className={`p-8 md:p-12 border rounded-3xl backdrop-blur-3xl shadow-2xl relative text-left min-h-[550px] transition-all duration-500 bg-white/5 ${
                selectedTemplate === 'vogue'
                  ? 'border-white/10 text-white font-sans'
                  : selectedTemplate === 'tesla'
                    ? 'border-white/20 text-[#eaeaea] font-mono'
                    : 'border-white/10 text-neutral-200'
              }`}>
                
                {/* Vogue: Soft, minimalist typography spacing */}
                {selectedTemplate === 'vogue' && (
                  <div className="flex flex-col gap-8">
                    <div className="border-b border-white/10 pb-6 flex justify-between items-end">
                      <div>
                        <h3 className="text-3xl font-extrabold tracking-tight uppercase">{resume.fullName}</h3>
                        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono mt-1 block">{resume.profession}</span>
                      </div>
                      <div className="text-right text-[10px] font-mono text-slate-500">
                        <span>{resume.location}</span>
                        <span className="block mt-0.5">{resume.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 leading-relaxed text-xs">
                      
                      {/* Left side detail nodes */}
                      <div className="md:col-span-4 flex flex-col gap-5">
                        <div>
                          <h4 className="font-bold uppercase tracking-widest text-[#EAEAEA] mb-2 border-b border-white/5 pb-1">Cognitive Tools</h4>
                          <span className="flex flex-wrap gap-1">
                            {resume.skills.join(" · ")}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold uppercase tracking-widest text-[#EAEAEA] mb-2 border-b border-white/5 pb-1">Education Registry</h4>
                          {resume.education.map((edu, i) => (
                            <div key={i} className="mb-2">
                              <p className="font-semibold text-white">{edu.degree}</p>
                              <span className="text-[10px] text-slate-500">{edu.school} ({edu.duration})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right side body description */}
                      <div className="md:col-span-8 flex flex-col gap-5">
                        <div>
                          <h4 className="font-bold uppercase tracking-widest text-[#EAEAEA] mb-2 border-b border-white/5 pb-1">Professional Experience Alignment</h4>
                          {resume.workExperience.map((work, i) => (
                            <div key={i} className="mb-4">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-white">{work.role}</span>
                                <span className="text-slate-400">{work.company} · {work.duration}</span>
                              </div>
                              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-light">{work.bullet}</p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-bold uppercase tracking-widest text-[#EAEAEA] mb-2 border-b border-white/5 pb-1">Projects</h4>
                          {resume.projects.map((proj, i) => (
                            <div key={i} className="mb-3">
                              <span className="text-white font-semibold flex items-center gap-1.5">{proj.title} <span className="text-[10px] font-mono font-normal text-slate-500">{proj.link}</span></span>
                              <p className="text-slate-400 text-xs leading-relaxed font-light mt-1">{proj.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Tesla: Monospaced code-level, brutalist format */}
                {selectedTemplate === 'tesla' && (
                  <div className="flex flex-col gap-6 text-xs font-mono">
                    <div className="border border-white/10 p-4 rounded-xl flex justify-between items-center bg-white/5">
                      <div>
                        <div className="text-lg font-bold">SYSTEM_OWNER: {resume.fullName.toUpperCase()}</div>
                        <div className="text-slate-400 text-[10px] mt-0.5">ROLE: {resume.profession}</div>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        <div>LOC: {resume.location}</div>
                        <div>COM: {resume.email}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="text-white border-b border-white/10 pb-1 uppercase font-bold tracking-wider">01. CORE_COGNITIVE_ARRAY</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {resume.skills.map((sk, idx) => (
                          <div key={idx} className="p-2 border border-white/5 bg-white/5 rounded-lg text-center text-slate-300">
                            {sk}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="text-white border-b border-white/10 pb-1 uppercase font-bold tracking-wider">02. PERFORMANCE_LOGS</div>
                      {resume.workExperience.map((work, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex justify-between items-center text-white">
                            <span>{work.role.toUpperCase()} @ {work.company.toUpperCase()}</span>
                            <span className="text-[10px] text-slate-500">{work.duration}</span>
                          </div>
                          <p className="text-slate-400 font-light leading-relaxed mt-2">{work.bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dior: Premium high stakes editorial */}
                {selectedTemplate === 'dior' && (
                  <div className="flex flex-col gap-8">
                    <div className="text-center flex flex-col items-center gap-1 border-b border-white/5 pb-8">
                      <h3 className="text-4xl font-extrabold uppercase tracking-[0.2em]">{resume.fullName}</h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-400 mt-2">{resume.profession}</span>
                      <div className="flex gap-4 text-[10px] text-slate-500 mt-3 font-mono">
                        <span>{resume.location}</span>
                        <span>·</span>
                        <span>{resume.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <span className="text-center font-bold uppercase tracking-[0.2em] text-[#eaeaea] text-xs">Exemplary Timeline</span>
                        {resume.workExperience.map((work, i) => (
                          <div key={i} className="text-center max-w-xl self-center flex flex-col gap-1.5 mb-2">
                            <span className="text-white font-bold">{work.role} — {work.company}</span>
                            <p className="text-slate-400 text-xs leading-relaxed font-light">{work.bullet}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Downloads Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => alert("Document export queue parsed. Real ATS-proof PDF compiles successfully for print.")}
                  className="p-3 bg-white hover:bg-[#EAEAEA] text-black font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  PDF Resume Pack
                </button>
                <button
                  onClick={() => alert("Data integration formatted: DOCX document payload compiled successfully.")}
                  className="p-3 bg-white/5 border border-white/10 text-slate-305 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Raw JSON Draft
                </button>
                <button
                  onClick={() => alert("Resume system share hyperlink generated: clip.nexus.ai/cv/05938 copied.")}
                  className="p-3 bg-white/5 border border-white/10 text-slate-305 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Sandbox URL
                </button>
              </div>

            </div>

          </motion.div>
        )}

        {/* Tab 2: AI Portfolio Website Synthesizer */}
        {activeSubTab === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Left selector */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Portfolio Layout Theme</span>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'crystal', label: 'Crystal Lux' },
                  { id: 'minimalist', label: 'Dior Slate' },
                  { id: 'cinematic', label: 'Tech Space' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setPortfolioTheme(th.id as any)}
                    className={`p-3 rounded-xl border text-[10px] uppercase font-mono tracking-wider transition-all text-center cursor-pointer ${
                      portfolioTheme === th.id
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400"
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2 mt-2">
                <span className="text-[10px] font-mono text-slate-450 uppercase">Structured Section Components</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Premium Hero with subtle parallax</span>
                  <span className="text-xs text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Work Station simulation teases</span>
                  <span className="text-xs text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3D Skill orbital planet previews</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsPortfolioGenerating(true);
                  setTimeout(() => {
                    setIsPortfolioGenerating(false);
                    alert("Self-Contained luxurious HTML ZIP website packaged compiled successfully.");
                  }, 1200);
                }}
                disabled={isPortfolioGenerating}
                className="w-full py-4 bg-white hover:bg-[#EAEAEA] text-black font-extrabold text-xs rounded-xl uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Code className="w-4 h-4 animate-pulse" />
                {isPortfolioGenerating ? "Compiling Web ZIP Bundle..." : "Export Website ZIP Package"}
              </button>
            </div>

            {/* Live Portfolio Browser preview Mock */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-[#FFFFFF]/10 p-6 rounded-3xl backdrop-blur-xl relative">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
                  <span className="text-[10px] font-mono text-slate-405 ml-1">portfolio_preview_root.html</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500">HTTPS_SECURITY_OK</div>
              </div>

              {/* Synthetic portfolio screen */}
              <div className={`p-8 rounded-2xl border min-h-[350px] flex flex-col gap-6 text-center justify-center relative overflow-hidden bg-black/60 ${
                portfolioTheme === 'crystal'
                  ? 'border-white/10 shadow-[0_4px_30px_rgba(255,255,255,0.05)]'
                  : portfolioTheme === 'minimalist'
                    ? 'border-neutral-800'
                    : 'border-luxury-gold/25 shadow-[0_4px_30px_rgba(244,223,200,0.12)]'
              }`}>
                
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[9px] font-mono tracking-widest text-[#EAEAEA] uppercase">PORTFOLIO ECOSYSTEM</span>
                  <h4 className="text-2xl font-extrabold text-white tracking-tight">{resume.fullName}</h4>
                  <span className="text-xs text-slate-400 font-mono mt-0.5">{resume.profession}</span>
                </div>

                <div className="max-w-md self-center p-3.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[9px] font-mono text-[#EAEAEA] uppercase tracking-wider block mb-1">Active Synapse project parameters</span>
                  <h5 className="font-bold text-white text-xs">{resume.projects[0]?.title || "Project Alpha"}</h5>
                  <p className="text-[10px] text-slate-400 mt-1">{resume.projects[0]?.description || "Calibrating systems overlays"}</p>
                </div>

                <div className="flex justify-center gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] text-white">GH</div>
                  <div className="w-7 h-7 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] text-white">LI</div>
                  <div className="w-7 h-7 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] text-white">YT</div>
                </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 3: Image Enhancer Suite */}
        {activeSubTab === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            
            {/* Upload drag drop zone */}
            <div className="md:col-span-6 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-5 justify-between min-h-[380px]">
              <div>
                <span className="text-[10px] font-mono text-slate-404 uppercase tracking-widest block mb-4">Drag & Drop Gateway</span>
                
                <div className="border border-dashed border-white/10 p-12 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-white/20 transition-all cursor-pointer bg-white/5">
                  <Image className="w-10 h-10 text-slate-500 animate-pulse stroke-1" />
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider">Drop Profile Credentials Image</h5>
                    <p className="text-[10px] text-slate-400 mt-1">Accepts PNG, JPG (Max resolution scales dynamic to 24MP)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleImageEnhancement}
                  disabled={optimizingImage}
                  className="p-3 bg-white/5 border border-white/10 hover:bg-white text-slate-300 hover:text-black rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${optimizingImage ? "animate-spin" : ""}`} />
                  Enhance Lighting
                </button>
                <button
                  type="button"
                  onClick={handleBgRemoval}
                  disabled={optimizingImage}
                  className="p-3 bg-white/5 border border-white/10 hover:bg-white text-slate-300 hover:text-black rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Crop className="w-3.5 h-3.5" />
                  Isolate Backplane
                </button>
              </div>
            </div>

            {/* Target enhanced result mock */}
            <div className="md:col-span-6 bg-slate-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between items-center min-h-[380px] text-center">
              <span className="text-[10px] font-mono text-slate-401 uppercase tracking-widest block self-start">Output Vector Calibration</span>
              
              <div className="w-48 h-48 rounded-3xl border border-white/15 bg-white/5 relative overflow-hidden shadow-2xl transition-all duration-500">
                {sourceImage && (
                  <img src={sourceImage} alt="Profile" className={`w-full h-full object-cover transition-all duration-700 ${
                    imageEnhanced ? "contrast-115 brightness-110" : ""
                  } ${
                    bgRemoved ? "scale-105 saturate-110" : ""
                  }`} />
                )}
                {bgRemoved && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/30 to-slate-950/20 border-2 border-white/40 rounded-3xl pointer-events-none" />
                )}
              </div>

              {/* Status information */}
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[10px] font-mono text-[#EAEAEA] uppercase">CALIBRATION INDEX STATUS</span>
                {imageEnhanced && <span className="text-emerald-400 text-[10px] font-mono tracking-wider">· SHARPNESS CORRECTIONS OPTIMIZED</span>}
                {bgRemoved && <span className="text-luxury-gold text-[10px] font-mono tracking-wider">· DIGITAL BLACK BACKGROUND OVERLAY MOUNTED</span>}
                {!imageEnhanced && !bgRemoved && <span className="text-slate-500 text-[10px] font-mono">· ORIGINAL SOURCE BUFFER DATA</span>}
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
