import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, BookOpen, Send, Sparkles, Volume2, Mic, CheckCircle, BrainCircuit, RefreshCw, BarChart2 } from "lucide-react";
import { InterviewQuestion, InterviewEvaluation } from "../types";

export default function InterviewSimulator() {
  const [targetCareer, setTargetCareer] = useState("Quantum Systems Architect");
  const [activeSession, setActiveSession] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  // Audio animation visual state triggers
  const [micActive, setMicActive] = useState(false);

  const startInterview = async () => {
    setLoadingQuestions(true);
    setActiveSession(true);
    setEvaluation(null);
    setCurrentIndex(0);
    try {
      const response = await fetch("/api/career/interview/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career: targetCareer })
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      }
    } catch (e) {
      console.error("Failed loading interview questions:", e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const submitResponse = async () => {
    if (!answerInput.trim()) return;
    setSubmittingAnswer(true);
    setEvaluation(null);
    const activeQuestion = questions[currentIndex]?.text || "";
    try {
      const response = await fetch("/api/career/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQuestion,
          answer: answerInput
        })
      });
      if (response.ok) {
        const data = await response.json();
        setEvaluation(data);
      }
    } catch (e) {
      console.error("Failed submitting answer to evaluation API:", e);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const nextQuestion = () => {
    setEvaluation(null);
    setAnswerInput("");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed session
      setActiveSession(false);
    }
  };

  return (
    <div id="interview-simulator-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8 min-h-[85vh]">
      
      {/* Title block */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
          <BrainCircuit className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold animate-pulse" />
          AI Interview Simulator
        </h2>
        <p className="text-luxury-gray mt-2 text-sm max-w-2xl font-light">
          Simulate a real-world board-level interview. Practice deep technical and behavioral cycles under real-time audio telemetry evaluation.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!activeSession ? (
          /* CONFIGURATION ENCLOSURE: Select career & start */
          <motion.div
            key="config-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto w-full bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] shadow-2xl flex flex-col items-center text-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/[0.01] rounded-full blur-2xl" />
            <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-luxury-gold shadow-inner">
              <Mic className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Initiate Mock Vetting Deck</h3>
              <p className="text-xs text-luxury-gray max-w-md">Align your communication metrics. Selecting customized roles boots custom, highly accurate interview questionnaires.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <select
                id="select-interview-career"
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="flex-grow bg-black/40 border border-white/10 focus:border-luxury-gold/50 text-white rounded-xl p-3.5 text-sm outline-none cursor-pointer"
              >
                <option value="Quantum Systems Architect" className="bg-black">Quantum Systems Architect</option>
                <option value="AI Core Synaptic Architect" className="bg-black">AI Core Synaptic Architect</option>
                <option value="Bio-Telemetry Specialist" className="bg-black">Bio-Telemetry Specialist</option>
              </select>

              <button
                id="btn-start-interview"
                onClick={startInterview}
                className="px-6 py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-hover text-black font-extrabold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(244,223,200,0.22)] border border-luxury-gold"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                Boot Session
              </button>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE INTERCO INTERACTION BOARD */
          <motion.div
            key="active-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
          >
            
            {/* Left side: AI Interlocutor Wave & Active Question dialog */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-mono text-luxury-gray tracking-wider">
                  QUESTION {currentIndex + 1} OF {questions.length}
                </div>

                {/* Animated Intercom audio curve indicators */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-white/5">
                  <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest mb-4">AI Interlocutor Voice Frequency</span>
                  <div className="flex gap-1 items-center h-10">
                    <div className="w-1.5 h-6 bg-luxury-gold/30 rounded-full animate-pulse" />
                    <div className="w-1.5 h-8 bg-luxury-gold/60 rounded-full animate-bounce" />
                    <div className="w-1.5 h-10 bg-luxury-gold rounded-full animate-pulse" />
                    <div className="w-1.5 h-5 bg-luxury-gold/20 rounded-full animate-bounce" />
                    <div className="w-1.5 h-10 bg-luxury-gold rounded-full animate-pulse" />
                    <div className="w-1.5 h-7 bg-luxury-bronze/70 rounded-full animate-bounce animate-delay-150" />
                    <div className="w-1.5 h-4 bg-luxury-gold/10 rounded-full animate-pulse" />
                  </div>
                </div>

                {loadingQuestions ? (
                  <span className="text-sm font-mono text-luxury-gray uppercase tracking-wide animate-pulse">Retrieving question assets...</span>
                ) : (
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-luxury-gold border border-white/10">
                      {questions[currentIndex]?.category || "Core"} Assessment
                    </span>
                    <p className="text-white text-md font-semibold font-sans mt-3 leading-relaxed">
                      "{questions[currentIndex]?.text}"
                    </p>
                    <p className="text-luxury-gray text-xs italic mt-2">
                      💡 hint: Mention "{questions[currentIndex]?.sampleAnswerHint}" for higher alignments.
                    </p>
                  </div>
                )}
              </div>

              {/* User Answer interactive controller */}
              <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col gap-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase font-mono tracking-widest text-luxury-gray font-bold">Your Professional Response</label>
                  <button
                    id="btn-simulate-speech"
                    onClick={() => {
                      setMicActive(!micActive);
                      if (!micActive) {
                        setAnswerInput(`We can mitigate latent loop errors of ${targetCareer} profiles by utilizing temporal quantization caches and syncing local worker pipelines continuously.`);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                      micActive 
                        ? "bg-red-950/40 text-red-400 border-red-900/30 animate-pulse" 
                        : "bg-white/5 border-white/10 text-luxury-gray hover:text-white"
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                    {micActive ? "Speech Active" : "Simulate Speech Input"}
                  </button>
                </div>

                <textarea
                  id="interview-answer-textarea"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Draft your detailed answer, referencing custom architectural criteria..."
                  className="w-full min-h-[140px] bg-black/40 hover:bg-black/60 border border-white/10 focus:border-luxury-gold/50 text-white rounded-2xl p-4 text-xs resize-none outline-none transition-all placeholder:text-zinc-700 font-sans leading-relaxed"
                />

                <button
                  id="btn-submit-answer"
                  onClick={submitResponse}
                  disabled={submittingAnswer || !answerInput.trim()}
                  className="w-full py-3.5 bg-luxury-gold hover:bg-luxury-gold-hover text-black font-extrabold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(244,223,200,0.22)] border border-luxury-gold disabled:opacity-30 disabled:hover:bg-luxury-gold"
                >
                  {submittingAnswer ? "Evaluating Resonance Meter..." : "Submit Answer For Real Audit"}
                </button>
              </div>

            </div>

            {/* Right side: API Audit Evaluation response */}
            <div className="lg:col-span-6 min-h-[300px] flex flex-col justify-center items-center">
              <AnimatePresence mode="wait">
                {submittingAnswer && (
                  <motion.div
                    key="eval-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center p-12 gap-3"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-luxury-gold animate-spin" />
                    <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest animate-pulse">Running Neural Audits...</span>
                  </motion.div>
                )}

                {!submittingAnswer && !evaluation && (
                  <motion.div
                    key="eval-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center justify-center p-12 border border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-md text-center"
                  >
                    <BarChart2 className="w-10 h-10 text-luxury-gray mb-3 stroke-1 animate-pulse" />
                    <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Evaluation Deck Offline</h4>
                    <p className="text-xs text-luxury-gray max-w-xs mt-1">Submit your response to see detailed scores, areas of strengths, gaps, and stellar suggested answers.</p>
                  </motion.div>
                )}

                {!submittingAnswer && evaluation && (
                  <motion.div
                    key="eval-done"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col gap-6"
                  >
                    
                    {/* Scores Bento */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl text-center">
                        <span className="text-4xl font-mono font-extrabold text-luxury-gold">{evaluation.overallScore}</span>
                        <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">Overall Core Score</span>
                      </div>
                      <div className="p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl text-center">
                        <span className="text-4xl font-mono font-extrabold text-luxury-white">{evaluation.confidenceScore}</span>
                        <span className="text-[10px] text-luxury-gray uppercase tracking-widest block mt-1">Tone Confidence rating</span>
                      </div>
                    </div>

                    {/* Feedback block */}
                    <div className="bg-[#F4EAE0]/[0.05] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-xl flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-luxury-gray uppercase tracking-widest block border-b border-white/5 pb-1.5">Constructive Analytics</span>
                        <p className="text-luxury-white text-xs leading-relaxed mt-2">{evaluation.grammarAndTone}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1.5 text-xs text-left">
                          <span className="text-luxury-white font-bold font-sans flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-luxury-gold" /> Key Strengths
                          </span>
                          {evaluation.strengths?.map((st, i) => (
                            <span key={i} className="text-luxury-gray text-[11px] leading-relaxed pl-1">· {st}</span>
                          ))}
                        </div>

                        <div className="flex flex-col gap-1.5 text-xs text-left">
                          <span className="text-red-400 font-bold font-sans flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-red-400" /> Key Gaps
                          </span>
                          {evaluation.gaps?.map((gp, i) => (
                            <span key={i} className="text-luxury-gray text-[11px] leading-relaxed pl-1">· {gp}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 border-t border-white/5 pt-4 text-left">
                        <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest block">Exemplary Suggested Alignment</span>
                        <p className="text-luxury-white text-xs italic leading-relaxed mt-2 bg-black/40 border border-white/10 p-4 rounded-2xl">
                          "{evaluation.suggestedAnswer}"
                        </p>
                      </div>

                      <button
                        id="btn-next-question"
                        onClick={nextQuestion}
                        className="w-full py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition-all uppercase tracking-wider font-mono border border-white/10 mt-2 cursor-pointer"
                      >
                        Advance Question Cycle
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
