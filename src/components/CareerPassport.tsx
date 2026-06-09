import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck, Download, Copy, Check, QrCode,
  BrainCircuit, Terminal, Compass, Award, Sparkles
} from "lucide-react";
import { getPassport, CareerPassportData } from "../utils/passportStore";
import { generatePassportPdf } from "../utils/generateProposalPdf";

export default function CareerPassport() {
  const [passport, setPassport] = useState<CareerPassportData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassport(getPassport());
  }, []);

  const shareUrl = passport
    ? `${window.location.origin}/?passport=${passport.passportId}`
    : "";

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!passport) {
    return (
      <div className="w-full max-w-4xl mx-auto py-16 px-4 text-center">
        <ShieldCheck className="w-12 h-12 text-luxury-gold mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-white mb-2">No Passport Issued</h2>
        <p className="text-slate-400 text-sm">Complete simulations, interviews, and skill mapping to generate your verified credential.</p>
      </div>
    );
  }

  const interviewAvg =
    passport.interview.sessionsCompleted > 0
      ? Math.round(
          (passport.interview.technical + passport.interview.behavioral + passport.interview.architectural) / 3
        )
      : null;

  return (
    <div id="career-passport-root" className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      <div className="text-center md:text-left">
        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Credential — Not a Resume
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
          Career Passport
        </h2>
        <p className="text-luxury-gray mt-2 text-sm max-w-2xl font-light">
          Live evidence scorecard aggregating every simulation, interview, skill node, and portfolio project inside NEXUS.
        </p>
      </div>

      {/* Main passport card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#0c0c0c] via-[#111] to-[#0a0a0a] border border-luxury-gold/25 rounded-[36px] p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          {/* Nexus Score */}
          <div className="flex flex-col items-center md:items-start gap-2 min-w-[160px]">
            <div className="w-36 h-36 rounded-full border-4 border-luxury-gold/40 bg-black/60 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(244,223,200,0.1)]">
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest">Nexus Score</span>
              <span className="text-5xl font-extrabold text-white">{passport.nexusScore}</span>
              <span className="text-[9px] text-slate-500 font-mono">/ 100</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 text-center md:text-left">
              ID: {passport.passportId}
            </span>
          </div>

          {/* Identity */}
          <div className="flex-grow space-y-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{passport.ownerName}</h3>
              <p className="text-luxury-gold text-sm font-mono mt-1">{passport.targetRole}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Interview Avg", value: interviewAvg ? `${interviewAvg}/100` : "—", icon: BrainCircuit },
                { label: "Missions Done", value: passport.simulation.missionsCompleted, icon: Terminal },
                { label: "Day One Tests", value: passport.simulation.dayOneChallengesCompleted, icon: Sparkles },
                { label: "Skills Mapped", value: passport.skills.length, icon: Compass },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5">
                    <Icon className="w-3.5 h-3.5 text-luxury-gold mb-1.5" />
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[9px] text-slate-500 font-mono uppercase">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Evidence blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-4 h-4 text-luxury-gold" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Interview Evidence</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Technical", score: passport.interview.technical },
                { label: "Behavioral", score: passport.interview.behavioral },
                { label: "Architectural", score: passport.interview.architectural },
                { label: "Confidence", score: passport.interview.confidence },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-mono">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-luxury-gold rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white w-8 text-right">
                      {item.score > 0 ? item.score : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-luxury-gold" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Simulation Evidence</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">Total Missions</span>
                <span className="text-sm font-bold text-white">{passport.simulation.missionsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">Critical Missions</span>
                <span className="text-sm font-bold text-emerald-400">{passport.simulation.criticalMissionsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-400">Day One Challenges</span>
                <span className="text-sm font-bold text-luxury-gold">{passport.simulation.dayOneChallengesCompleted}</span>
              </div>
              {passport.simulation.lastCareer && (
                <p className="text-[9px] text-slate-500 font-mono pt-2 border-t border-white/5">
                  Last sim: {passport.simulation.lastCareer}
                </p>
              )}
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-luxury-gold" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Skill Alignment</span>
            </div>
            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              {passport.skills.map((skill) => (
                <div key={skill.name} className="flex justify-between items-center gap-2">
                  <span className="text-[9px] text-slate-300 truncate flex-1">{skill.name}</span>
                  <span className="text-[9px] font-mono text-emerald-400 shrink-0">{skill.marketDemand}%</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
              <Award className="w-3 h-3 text-luxury-gold" />
              <span className="text-[9px] text-slate-400">{passport.portfolioProjects} portfolio projects</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-8 relative z-10">
          <button
            onClick={() => generatePassportPdf(passport)}
            className="px-5 py-3 bg-luxury-gold text-black text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-2 hover:bg-luxury-gold-hover transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export Passport PDF
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-3 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Link Copied!" : "Copy Share Link"}
          </button>
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl">
            <QrCode className="w-4 h-4 text-slate-500" />
            <span className="text-[9px] font-mono text-slate-500 truncate max-w-[200px]">{shareUrl}</span>
          </div>
        </div>
      </motion.div>

      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">Why This Beats a Resume</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            LinkedIn shows what you claim. Your Career Passport shows what you did — verified interview scores,
            completed simulation missions, and skill demand alignment. Employers in Blind Talent Radar see this
            telemetry before your identity is revealed.
          </p>
        </div>
      </div>
    </div>
  );
}
