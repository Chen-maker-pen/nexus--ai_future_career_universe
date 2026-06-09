import { jsPDF } from "jspdf";

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 595, 100, "F");
  doc.setFillColor(244, 223, 200);
  doc.rect(0, 97, 595, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(244, 223, 200);
  doc.setFontSize(20);
  doc.text("NEXUS AI", 40, 40);
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 200);
  doc.text(title, 40, 58);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(subtitle, 40, 75);
}

function addSection(doc: jsPDF, y: number, heading: string, body: string[]): number {
  if (y > 700) {
    doc.addPage();
    y = 50;
  }
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text(heading, 40, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9.5);
  body.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 515);
    if (y + wrapped.length * 12 > 780) {
      doc.addPage();
      y = 50;
    }
    doc.text(wrapped, 40, y);
    y += wrapped.length * 12 + 4;
  });
  return y + 10;
}

export function generateNexusProposalPdf(): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  // Cover page
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 595, 842, "F");
  doc.setFillColor(244, 223, 200);
  doc.rect(40, 120, 515, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.text("NEXUS AI", 40, 200);
  doc.setFontSize(16);
  doc.setTextColor(244, 223, 200);
  doc.text("Future Career Universe", 40, 230);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(180, 180, 180);
  const tagline = doc.splitTextToSize(
    "An immersive AI-powered career ecosystem that replaces resume claims with verified proof of readiness.",
    480
  );
  doc.text(tagline, 40, 280);
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Hackathon Proposal & Product Portfolio", 40, 360);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 40, 380);
  doc.text("Powered by Google Gemini AI  |  React  |  Express  |  TypeScript", 40, 400);

  doc.addPage();
  let y = 120;
  addHeader(doc, "EXECUTIVE SUMMARY", "Selection Proposal — Pre-Pitch Document");

  y = addSection(doc, y, "The Problem", [
    "Traditional hiring platforms (LinkedIn, Indeed, CareerBuilder) rely on static resumes, keyword filters, and transactional job listings.",
    "Candidates cannot prove real job readiness. Employers hire based on claims, not evidence. The result: mismatched hires, bias, and wasted interviews.",
  ]);

  y = addSection(doc, y, "Our Solution", [
    "NEXUS AI is a two-sided career operating system where candidates learn, simulate, prove, and get hired — and employers discover talent by verified performance, not PDF keywords.",
    "Tagline: Don't apply. Rehearse. Don't claim. Prove.",
  ]);

  y = addSection(doc, y, "Hero Differentiators (What Makes Us Unique)", [
    "1. VERIFIED CAREER PASSPORT — A live scorecard aggregating interview scores, simulation missions, skill galaxy alignment, and portfolio projects. Employers trust evidence, not claims.",
    "2. BLIND TALENT RADAR — Recruiters discover candidates by skill telemetry and performance metrics first. Identity (name, photo, school) is revealed only after shortlisting — eliminating bias.",
    "3. DAY ONE EMPLOYER CHALLENGE — Employers inject real 2-hour micro-workflows into the simulation engine. Candidates try the actual job before either side commits.",
  ]);

  doc.addPage();
  addHeader(doc, "PLATFORM FEATURES", "Complete Ecosystem Overview");
  y = 120;

  const features = [
    ["AI Career Coach", "Gemini-powered futuristic roadmaps with salary projections, skill paths, and project recommendations in structured JSON."],
    ["Career Workflow Simulation", "Immersive virtual workstations with daily missions, terminal commands, and teammate chat — rehearse the job before applying."],
    ["AI Interview Simulator", "Role-based technical, behavioral, and architectural questions with AI scoring, confidence metrics, and suggested answers."],
    ["3D Skill Galaxy Map", "Interactive rotating skill universe with market demand indexes, salary impact, and mastery tracking."],
    ["Living Portfolio & ATS Resume Builder", "Luxury templates (Vogue, Tesla, Dior), AI optimization, and PDF export for investor-grade professional identity."],
    ["AETHER AI Companion", "Floating 3D robot assistant with voice input, career coaching chat, and contextual guidance across the platform."],
    ["Employer Recruitment Hub", "Job posting engine, hiring analytics, company profile, AI talent discovery, and candidate shortlisting."],
    ["Ecosystem Command Center", "Candidate dashboard with progress metrics, job board, community feed, and subscription tiers."],
  ];

  features.forEach(([title, desc]) => {
    y = addSection(doc, y, title, [desc]);
  });

  doc.addPage();
  addHeader(doc, "TECHNOLOGY & BUSINESS", "Architecture, Stack, and Go-to-Market");
  y = 120;

  y = addSection(doc, y, "Technology Stack", [
    "Frontend: React 19, TypeScript, Tailwind CSS 4, Motion animations, Lenis smooth scroll, Recharts",
    "Backend: Express.js with Vite middleware, Google Gemini API (gemini-3.5-flash) for structured JSON generation",
    "AI Capabilities: Career roadmaps, interview Q&A, answer evaluation, conversational companion, job simulation generation",
    "Resilience: High-fidelity sandbox fallback mode when API key is unavailable — demo-safe for live events",
  ]);

  y = addSection(doc, y, "Two-Sided Business Model", [
    "B2C (Candidates): Free tier with limited AI runs. Nexus Pro Gateway — unlimited interviews, CV generation, passport sharing.",
    "B2B (Employers): Recruitment hub, Blind Talent Radar, Day One Challenges, analytics dashboard, and verified passport shortlisting.",
  ]);

  y = addSection(doc, y, "Competitive Positioning", [
    "LinkedIn / Indeed: Keyword matching and static profiles",
    "Interview prep apps: Isolated practice without employer connection",
    "Portfolio builders: Pretty PDFs without proof of ability",
    "NEXUS AI: End-to-end verified readiness — learn, simulate, prove, get hired",
  ]);

  doc.addPage();
  addHeader(doc, "DEMO FLOW & CONTACT", "90-Second Live Pitch Script");
  y = 120;

  y = addSection(doc, y, "Recommended Demo Sequence", [
    "1. Landing page — 'Build Your Future Beyond The Resume'",
    "2. Quick Seeker login — instant access to candidate ecosystem",
    "3. Career Simulation — complete one mission (job rehearsal)",
    "4. Interview Simulator — answer one question, show AI score rolling into passport",
    "5. Verified Career Passport — display Nexus Score, share link, QR code",
    "6. Switch to Employer — Blind Talent Radar, shortlist anonymous NODE profile",
    "7. Day One Challenge — show employer-posted micro-challenge in simulation",
    "8. Download this proposal PDF from the landing page",
  ]);

  y = addSection(doc, y, "Why NEXUS Wins", [
    "Full ecosystem — not a single-feature tool",
    "Google Gemini integration with structured AI outputs",
    "Three unique differentiators no competitor combines",
    "Production-grade cinematic UI that judges remember",
    "Clear monetization and two-sided market story",
    "Works offline in sandbox mode for reliable live demos",
  ]);

  y += 20;
  doc.setFillColor(244, 223, 200);
  doc.rect(40, y, 515, 60, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text("NEXUS AI — The Career Operating System for 2030", 55, y + 25);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("We replaced the resume with a rehearsal. We replaced claims with proof.", 55, y + 42);

  doc.save(`NEXUS_AI_Proposal_Portfolio_${Date.now()}.pdf`);
}

export function generatePassportPdf(passport: {
  passportId: string;
  ownerName: string;
  targetRole: string;
  nexusScore: number;
  interview: { technical: number; behavioral: number; architectural: number; confidence: number };
  simulation: { missionsCompleted: number; criticalMissionsCompleted: number; dayOneChallengesCompleted: number };
  skills: { name: string; marketDemand: number }[];
}): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 595, 130, "F");
  doc.setFillColor(244, 223, 200);
  doc.rect(0, 127, 595, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(244, 223, 200);
  doc.setFontSize(18);
  doc.text("VERIFIED CAREER PASSPORT", 40, 45);
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(`Passport ID: ${passport.passportId}`, 40, 65);
  doc.text(`Issued: ${new Date().toLocaleDateString()}`, 40, 80);
  doc.text("NEXUS AI — Evidence-Based Professional Credential", 40, 100);

  doc.setFillColor(244, 223, 200);
  doc.rect(40, 160, 200, 80, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text("NEXUS SCORE", 55, 185);
  doc.setFontSize(36);
  doc.text(`${passport.nexusScore}`, 55, 225);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(passport.ownerName, 260, 180);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(passport.targetRole, 260, 198);

  let y = 280;
  const sections = [
    ["INTERVIEW EVIDENCE", [
      `Technical: ${passport.interview.technical}/100`,
      `Behavioral: ${passport.interview.behavioral}/100`,
      `Architectural: ${passport.interview.architectural}/100`,
      `Confidence: ${passport.interview.confidence}/100`,
    ]],
    ["SIMULATION EVIDENCE", [
      `Missions Completed: ${passport.simulation.missionsCompleted}`,
      `Critical Missions: ${passport.simulation.criticalMissionsCompleted}`,
      `Day One Challenges: ${passport.simulation.dayOneChallengesCompleted}`,
    ]],
    ["SKILL ALIGNMENT", passport.skills.map((s) => `${s.name}: ${s.marketDemand}% market demand`)],
  ];

  sections.forEach(([heading, lines]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.text(heading as string, 40, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(9.5);
    (lines as string[]).forEach((line) => {
      doc.text(line, 50, y);
      y += 14;
    });
    y += 12;
  });

  doc.setFillColor(240, 240, 240);
  doc.rect(40, y, 515, 50, "F");
  doc.setFont("helvetica", "italic");
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.text("This passport contains verified platform activity — not self-reported claims.", 50, y + 20);
  doc.text("Verify at: nexus.ai/passport/" + passport.passportId, 50, y + 36);

  doc.save(`NEXUS_Career_Passport_${passport.passportId}.pdf`);
}
