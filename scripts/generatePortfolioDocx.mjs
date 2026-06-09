import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} from "docx";

const gold = "1a1a1a";
const accent = "2d2d2d";

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 280, after: 140 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        size: 22,
        color: "333333",
        bold: opts.bold,
        italics: opts.italics,
      }),
    ],
  });
}

function bullet(text, boldLead = "") {
  const children = [
    new TextRun({ text: "• ", size: 22, color: "333333" }),
  ];
  if (boldLead) {
    children.push(new TextRun({ text: boldLead, size: 22, bold: true, color: "111111" }));
    children.push(new TextRun({ text: text.replace(boldLead, ""), size: 22, color: "333333" }));
  } else {
    children.push(new TextRun({ text, size: 22, color: "333333" }));
  }
  return new Paragraph({ spacing: { after: 80 }, children });
}

function tagline(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text,
        size: 26,
        italics: true,
        color: "555555",
      }),
    ],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" },
    },
  });
}

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        // COVER
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 200 },
          children: [
            new TextRun({
              text: "NEXUS AI",
              bold: true,
              size: 72,
              color: gold,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "Future Career Universe",
              size: 36,
              color: accent,
            }),
          ],
        }),
        tagline("We replaced the resume with a rehearsal. We replaced claims with proof."),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: "Hackathon Project Portfolio",
              size: 24,
              color: "888888",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: `June 2026  |  Powered by Google Gemini AI`,
              size: 20,
              color: "999999",
            }),
          ],
        }),

        divider(),

        // ELEVATOR PITCH
        heading("Elevator Pitch (30 Seconds)"),
        body(
          "NEXUS AI is the career operating system for 2030 — an immersive, AI-powered ecosystem where candidates learn, simulate real jobs, prove their skills, and get hired based on verified evidence. Employers discover talent through bias-free skill telemetry, not keyword filters on a PDF. LinkedIn shows what people claim. NEXUS shows what they did."
        ),

        divider(),

        // PROBLEM
        heading("The Problem Judges Care About"),
        bullet("2.1 billion workers worldwide rely on static resumes that freeze talent in time — no live proof of ability."),
        bullet("87% of recruiters admit keyword filters discard qualified candidates before a human ever reads their profile."),
        bullet("Interview prep tools exist in isolation — they don't connect practice to hiring outcomes."),
        bullet("Bias in hiring persists because identity (name, photo, school) is visible before skill evidence."),
        bullet("Candidates apply blindly; employers hire blindly. Both sides lose."),

        divider(),

        // SOLUTION
        heading("Our Solution"),
        body(
          "NEXUS AI is a two-sided career platform that transforms hiring from a guess into a verified pipeline:"
        ),
        bullet("Candidates rehearse real jobs in AI-powered simulations, pass scored interviews, map skills in a 3D galaxy, and earn a Verified Career Passport — a live credential stronger than any resume."),
        bullet("Employers post Day One micro-challenges, discover talent through Blind Talent Radar (skills first, identity later), and shortlist from verified passport scores."),
        bullet("Everything is powered by Google Gemini for structured roadmaps, interview generation, answer evaluation, and conversational career coaching."),

        divider(),

        // HERO DIFFERENTIATORS
        heading("Three Features No Other Platform Has"),
        body("These are our judge-winning differentiators — not commodity features every team ships:", { bold: true }),

        heading("1. Verified Career Passport", HeadingLevel.HEADING_2),
        body(
          "A single live scorecard employers trust more than a PDF. Every simulation mission, interview score, skill galaxy node, and portfolio project rolls into one shareable credential with a Nexus Score (0–100)."
        ),
        bullet("Interview Simulator → Technical: 87/100, Behavioral: 82/100, Confidence: 90/100"),
        bullet("Career Simulation → 3 critical missions completed, Day One challenge passed"),
        bullet("Skill Galaxy → Transformer Mechanics: 92% market demand alignment"),
        bullet("Exportable PDF + shareable link for recruiters"),
        body("Why it wins: LinkedIn shows claims. NEXUS shows evidence.", { italics: true }),

        heading("2. Blind Talent Radar", HeadingLevel.HEADING_2),
        body(
          "Recruiters discover candidates by verified skill telemetry and performance metrics first. Names, photos, and schools stay hidden as anonymous nodes (e.g., NODE-7X4A) until the employer shortlists — then identity and Career Passport unlock."
        ),
        bullet("Skill heatmaps: AI/ML 96%, Systems 89%, Simulation 85%"),
        bullet("Nexus Score, interview score, mission completion rate visible pre-identity"),
        bullet("One-click shortlist reveals full profile + passport"),
        body("Why it wins: Solves real hiring bias with a product-native feature, not a policy slide.", { italics: true }),

        heading("3. Day One Employer Challenge", HeadingLevel.HEADING_2),
        body(
          "Employers inject their real 2-hour micro-workflow into the simulation engine. Candidates complete the actual job tasks before applying. Results feed directly into their Career Passport."
        ),
        bullet("Example: 'API Latency Debug Sprint' — profile bottleneck, deploy hotfix, validate staging"),
        bullet("Employer publishes challenge → candidate accepts in Sim Lab → completion verified"),
        body("Why it wins: Don't apply. Rehearse. Try the job before either side commits.", { italics: true }),

        divider(),

        // FULL PLATFORM
        heading("Complete Platform Features"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "F4DFC8", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Module", bold: true, size: 20 })] })],
                }),
                new TableCell({
                  shading: { fill: "F4DFC8", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "What It Does", bold: true, size: 20 })] })],
                }),
              ],
            }),
            ...[
              ["AI Career Coach", "Gemini-generated roadmaps, salary projections, skills, and project ideas"],
              ["Career Workflow Simulation", "Immersive virtual workstation with missions, terminal, team chat"],
              ["AI Interview Simulator", "Role-based Q&A with AI scoring, confidence metrics, suggested answers"],
              ["3D Skill Galaxy Map", "Interactive rotating skill universe with market demand indexes"],
              ["Living Portfolio & ATS Builder", "Luxury resume templates, AI optimization, PDF export"],
              ["AETHER AI Companion", "3D floating robot with voice input and career coaching chat"],
              ["Employer Recruitment Hub", "Job posts, analytics, company profile, talent discovery"],
              ["Ecosystem Command Center", "Progress dashboard, job board, community, subscription tiers"],
            ].map(
              ([mod, desc]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mod, bold: true, size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20 })] })] }),
                  ],
                })
            ),
          ],
        }),

        divider(),

        // TECH STACK
        heading("Technology Stack"),
        bullet("Frontend: React 19, TypeScript, Tailwind CSS 4, Motion, Lenis, Recharts"),
        bullet("Backend: Express.js + Vite, Google Gemini API (gemini-3.5-flash)"),
        bullet("AI: Structured JSON roadmaps, interview Q&A, answer evaluation, conversational companion"),
        bullet("Resilience: High-fidelity sandbox fallback — demo-safe without API key"),
        bullet("Export: jsPDF for Career Passport and full proposal documents"),

        divider(),

        // IMPACT METRICS
        heading("Impact & Scale Story"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Metric", bold: true, size: 20 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true, size: 20 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Why Judges Notice", bold: true, size: 20 })] })] }),
              ],
            }),
            ...[
              ["Platform Modules", "11 integrated", "Full ecosystem, not a single-feature demo"],
              ["AI API Endpoints", "5 Gemini-powered", "Real AI integration, not mock chat"],
              ["Two-Sided Market", "Candidates + Employers", "Clear B2B + B2C business model"],
              ["Differentiators", "3 unique features", "Passport, Blind Radar, Day One — unreplicable combo"],
              ["Demo Reliability", "Sandbox fallback mode", "Works offline at live events"],
            ].map(
              ([m, v, w]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m, size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: v, bold: true, size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: w, size: 20 })] })] }),
                  ],
                })
            ),
          ],
        }),

        divider(),

        // WHY WE WIN
        heading("Why NEXUS Wins This Hackathon"),
        bullet("Full ecosystem — 11 modules in one product vs. teams shipping one chatbot"),
        bullet("Google Gemini native — structured AI outputs across coach, interview, simulation, companion"),
        bullet("Three unreplicable differentiators bundled together"),
        bullet("Production-grade cinematic UI — dark luxury design judges remember"),
        bullet("Two-sided marketplace with clear monetization (Nexus Pro Gateway)"),
        bullet("Solves a $200B+ global hiring inefficiency with evidence-based credentials"),
        bullet("Live demo arc: simulate → score → passport → blind shortlist in 90 seconds"),

        divider(),

        // DEMO SCRIPT
        heading("90-Second Live Demo Script"),
        bullet("1. Landing page — 'Build Your Future Beyond The Resume'"),
        bullet("2. Quick Seeker login — instant candidate access"),
        bullet("3. Sim Lab — accept Day One Employer Challenge, complete one mission"),
        bullet("4. AI Interview — answer one question, show score rolling into passport"),
        bullet("5. Career Passport — display Nexus Score, export PDF, copy share link"),
        bullet("6. Switch to Recruiter — Blind Talent Radar, shortlist NODE profile, reveal identity"),
        bullet("7. Hand judges the Proposal PDF downloaded from landing page"),

        divider(),

        // COMPETITIVE
        heading("Competitive Positioning"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Platform", bold: true, size: 20 })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "What They Optimize For", bold: true, size: 20 })] })] }),
              ],
            }),
            ...[
              ["LinkedIn / Indeed", "Keywords, connections, static profiles"],
              ["Interview prep apps", "Isolated practice, no employer link"],
              ["Portfolio builders", "Pretty PDFs, zero proof of ability"],
              ["NEXUS AI", "Verified readiness — learn, simulate, prove, get hired"],
            ].map(
              ([p, o]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: p, bold: p.includes("NEXUS"), size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: o, size: 20 })] })] }),
                  ],
                })
            ),
          ],
        }),

        divider(),

        // TAGLINES
        heading("Judge-Ready Taglines"),
        bullet('"Don\'t apply. Rehearse."'),
        bullet('"LinkedIn is a billboard. NEXUS is a driving license — pass the test before anyone believes you."'),
        bullet('"We don\'t replace the resume. We replace trust in the resume."'),
        bullet('"Hire from evidence, not keywords."'),

        divider(),

        // BUSINESS MODEL
        heading("Business Model"),
        bullet("B2C — Nexus Pro Gateway: unlimited AI interviews, CV generation, passport sharing"),
        bullet("B2B — Employer hub: Blind Talent Radar, Day One Challenges, analytics, shortlisting"),
        bullet("Market: global career tech + HR tech intersection ($30B+ and growing)"),

        divider(),

        // CLOSING
        heading("Closing Statement for Judges"),
        body(
          "NEXUS AI is not another job board or resume tool. It is the first career operating system where human potential is measured by what you do — not what you write. We built the infrastructure for evidence-based hiring: candidates prove readiness, employers discover talent without bias, and both sides make decisions from verified data. The future of work doesn't need better resumes. It needs better proof."
        ),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "NEXUS AI — Future Career Universe",
              bold: true,
              size: 28,
              color: gold,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Live Demo: http://localhost:3000",
              size: 20,
              color: "666666",
            }),
          ],
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
const outPath = path.join(process.cwd(), "NEXUS_AI_Project_Portfolio.docx");
fs.writeFileSync(outPath, buffer);
console.log(`Created: ${outPath}`);
