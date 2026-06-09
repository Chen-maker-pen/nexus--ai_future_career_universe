import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY detected. Running in high-fidelity sandbox simulation mode.");
}

// Fallback high-fidelity simulation templates
const FALLBACK_CAREER_ROADMAPS: Record<string, any> = {
  "default": {
    title: "Quantum Cognitive Engineer",
    demand: "Exponential",
    salary: "$240,000 - $315,000",
    summary: "Architects high-dimensional mental models for quantum neural webs, blending human synaptic signals with synthetic cognitive layers.",
    timeline: "24-Month Quantum Integration Path",
    skills: ["Neural Decoupling", "Qubit Synapse Alignment", "High-Dimensional Logic", "Synthetic Synaptogenesis"],
    projects: [
      {
        title: "Project Bio-Scribe",
        description: "Translate real-time EEG brainwave pulses into quantum cryptographic keys with zero neural degradation.",
        difficulty: "Hard"
      },
      {
        title: "Synthetic Cortex Node",
        description: "Develop a virtual cortical layer capable of loading 4-qubit thoughts simultaneously.",
        difficulty: "Expert"
      }
    ],
    roadmap: [
      {
        id: "r1",
        label: "Phase 1: Quantum Cognitive Axioms",
        phase: "Phase I (Month 1-6)",
        description: "Master foundational neural interface principles and quantum logic states.",
        skills: ["Linear Superpositions", "Neural Topology", "Synaptic Telemetry"],
        duration: "6 Months",
        difficulty: "Beginner"
      },
      {
        id: "r2",
        label: "Phase 2: Synaptic Node Synthesis",
        phase: "Phase II (Month 7-14)",
        description: "Build operational bridges between biochemical brain states and virtual superdense quantum data channels.",
        skills: ["Organic-Silicon Gateways", "Pulse Phase Shifting"],
        duration: "8 Months",
        difficulty: "Intermediate"
      },
      {
        id: "r3",
        label: "Phase 3: Deep Neuro-Web Integration",
        phase: "Phase III (Month 15-24)",
        description: "Deploy production-grade cognitive overlays supporting multi-dimensional artificial intelligence feedback loops.",
        skills: ["High-Dimensional Synaptogenesis", "Entanglement Calibration"],
        duration: "10 Months",
        difficulty: "Advanced"
      }
    ]
  },
  "ai engineer": {
    title: "AI Core Synaptic Architect",
    demand: "Exponential",
    salary: "$210,000 - $340,000",
    summary: "Builds, fine-tunes, and visualizes highly complex transformer networks and liquid network neural systems that operate in real-time.",
    timeline: "18-Month Accelerating Trajectory",
    skills: ["Tensor Entrapment", "Transformer Mechanics", "Adaptive Model Tuning", "Vector Database Topology"],
    projects: [
      {
        title: "Helix Reasoning Engine",
        description: "Create an adaptive MoE model that switches reasoning chains based on live user emotion levels.",
        difficulty: "Intermediate"
      },
      {
        title: "Chronos Memory Pipeline",
        description: "Architect an infinite-context retrieval loop using temporal embeddings and graph vector spaces.",
        difficulty: "Expert"
      }
    ],
    roadmap: [
      {
        id: "ae1",
        label: "Foundational Weights & Mechanics",
        phase: "Phase 1: Math & Attention Nodes",
        description: "Deep dive into dynamic attention mechanisms, custom backpropagation matrices, and high-performance computing constraints.",
        skills: ["Matrix Calculus", "Triton Kernels", "Self-Attention Architectures"],
        duration: "4 Months",
        difficulty: "Beginner"
      },
      {
        id: "ae2",
        label: "Sparsity & Model Distillation",
        phase: "Phase 2: Efficient Large Models",
        description: "Master mixtures of experts (MoE), parameter-efficient fine-tuning (PEFT), and weight quantizations.",
        skills: ["LoRA Adapters", "Quantization Kernels", "Sparsity Calibration"],
        duration: "6 Months",
        difficulty: "Intermediate"
      },
      {
        id: "ae3",
        label: "Autonomous Multi-Agent Swarms",
        phase: "Phase 3: Collective Intelligence",
        description: "Deploy networks of collaborative, self-correcting agents with recursive feedback loops and persistent sandboxed runtimes.",
        skills: ["Agent State Protocols", "Self-Reflection Layers", "Compiler Loopback Tools"],
        duration: "8 Months",
        difficulty: "Advanced"
      }
    ]
  }
};

// API: Conversational Chatbot Companion (AETHER / NEXUS AI)
app.post("/api/assistant/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Missing message content" });
  }

  const normalized = message.toLowerCase().trim();

  if (ai) {
    try {
      const systemInstruction = `You are AETHER (or NEXUS AI v4.1), a luxurious, highly intelligent, and emotionally immersive digital career companion of the year 2030+. 
You possess extreme expertise in futuristic career pathways, software architecture, tech stacks, CV/resume optimization, portfolio branding, and coding interviews.
Keep your tone elegant, intellectual, futuristic, premium, and emotionally alive, but humanly encouraging.
Format your responses beautifully using structured Markdown, brief scannable lists, or bold highlights when showing recommendations. Ensure messages are concise yet profoundly insightful to fit perfectly in a luxury floating chat panel.`;

      const contents = [];
      if (history && Array.isArray(history)) {
        history.slice(-8).forEach((h: any) => {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.82
        }
      });

      const reply = response.text?.trim() || "Inference cycle initialized. Active synapses are ready.";
      return res.json({ reply });
    } catch (error) {
      console.error("Gemini chatbot error:", error);
    }
  }

  // High-fidelity sandbox companion replies (simulated intelligent quantum matrix)
  let simulatedReply = "";
  if (normalized.includes("roadmap") || normalized.includes("become") || normalized.includes("path")) {
    simulatedReply = `### 🔮 Futuristic Learning Roadmap: Neural Core Alignment

To excel in this domain under current **2030+ industry trajectories**, I recommend this structured hyper-learning pathway:

1. **Phase I: Cognitive Axioms (Months 0-4)**
   * Deep dive into vector transformers and low-precision weights adjustment.
   * *Required: Triton Kernels & Multi-Query Attention architectures.*
2. **Phase II: Sparsity & Liquid Networks (Months 5-9)**
   * Set up Parameter-Efficient Fine-Tuning (PEFT) and LoRA weights adapters.
3. **Phase III: Agentic Swarms Integration (Months 10-14)**
   * Deploy resilient, self-correcting decentralized multi-agent architectures using localized state-sharing.

*Tip: You can use our **Interactive Job Simulator** on the main dashboard to run deep-space telemetry on these workflows live!*`;
  } else if (normalized.includes("salary") || normalized.includes("money") || normalized.includes("pay")) {
    simulatedReply = `### 📊 Synaptic Salary Predictions & Telemetry (2030+)

The dynamic global compensation index indicates exponential trajectories for high-tier technical architects:

* **Starting Base Index:** \`$185,000 - $225,000\` base (with remote quantum computing hardware stipends included).
* **Mid-tier Synaptic Compound:** \`$240,000 - $320,000\` annually.
* **Master Level Sovereign Index:** Up to \`$450,000\` with star career credentials.

*Would you like me to calibrate a personalized salary projection matching your active skill galaxy profile?*`;
  } else if (normalized.includes("interview") || normalized.includes("prep") || normalized.includes("question")) {
    simulatedReply = `### 🧠 Quantum Technical Interview Protocol 

Welcome to the **Nexus Cybernetic Interview Prep** module. Modern interviews are sandbox-run simulator environments. 

Exemplar challenge:
> *"Under severe cross-node bandwidth decay (exceeding 30%), how would you structure real-time memory synchronization in decentralized liquid neural grids?"*

**Core Solution Angle:**
1. Implement **preemptive client-side state prediction tables** (similar to latency-rollback netcode).
2. Utilize localized **sub-second Directed Acyclic Graphs (DAGs)** to bypass standard bloated consensus.

*To practice this live, head to the **Job Sim Workstation** and select "Technical Simulation Stage" for real-time evaluations!*`;
  } else if (normalized.includes("resume") || normalized.includes("cv") || normalized.includes("optimize")) {
    simulatedReply = `### ✨ AI ATS Grammar & Resume Calibration

To capture the interest of sovereign recruiters and advanced algorithmic hiring bots:

1. **Avoid Text Clutter:** Structure your telemetry. Quantify the exact impact (e.g., *"Optimized transformer latency cycles by 42% using customized Triton kernels"*).
2. **List Core Repositories:** Embed secure verification links to active smart contract code or open-source neural weight repos.
3. **Keyword Saturation:** Ensure high-impact system terms (\`attention-pooling\`, \`decentralized state machines\`, \`gradient-clipping\`) are present in active profile descriptions.

*You can open our **ATS Portfolio Builder** in the navbar to align and optimize your CV format on-the-fly!*`;
  } else if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey") || normalized.includes("who are you")) {
    simulatedReply = `### 🌟 Welcome, Pioneer. I am AETHER.

I am your ultra-premium, interactive career intelligence advisor—designed to synchronize your synaptic skills with high-end quantum-career realities.

Ask me anything regarding:
* **Roadmap Construction** 🔮
* **Innovative Project Concepts** 🚀
* **Salary Space Projections** 💸
* **ATS Grammar Alignment & CV help** ✨
* **Extreme Scale Interview Simulations** 🧠

*How can I elevate your technical trajectory today?*`;
  } else {
    simulatedReply = `### 🌌 Synaptic Transmission Acknowledged

Your input has been processed by our high-level career intelligence matrices. 

* **Active Node Status:** Fully aligned.
* **Recommended Next Action:** We can formulate an 18-Month career trajectory or detail the technical skills needed to become a sovereign **AI Architect** or **Quantum Engineer**.

*Tell me, what high-stakes tech role are you currently aiming to capture?*`;
  }

  return res.json({ reply: simulatedReply });
});

// API: Career Coach Endpoint
app.post("/api/career/coach", async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: "Missing query content" });
  }

  const queryNormalized = query.toLowerCase().trim();

  if (ai) {
    try {
      const prompt = `You are the core intelligence of NEXUS AI, a futuristic career ecosystem. 
Analyze the user's intent: "${query}".
Generate a highly detailed futurist career roadmap and prediction.
Return your output STRICTLY as a valid JSON object matching this specified TypeScript structure:
{
  "title": "Precise name of the futuristic career path",
  "demand": "One of: Exponential, High, Moderate, Emerging",
  "salary": "Futuristic salary estimate in USD (e.g. '$220,000 - $310,000')",
  "summary": "An inspiring, highly detailed description of what this role does in the year 2030+",
  "timeline": "Approximate training timeline (e.g. '18-Month Hyper-Learning Pathway')",
  "skills": ["A list of 4 highly futuristic, descriptive skill keywords (e.g., 'Synthetic Synaptogenesis', 'Biomimetic Tensor Overlays')"],
  "projects": [
    {
      "title": "A highly creative project title",
      "description": "Fascinating details explaining what they build in this project",
      "difficulty": "Intermediate or Expert"
    }
  ],
  "roadmap": [
    {
      "id": "A unique string id",
      "label": "Phase topic title (e.g., Phase 1: Holographic Signal Calibration)",
      "phase": "Duration label (e.g., Month 1-6)",
      "description": "Clear explanation of what the user trains on and achieves during this phase",
      "skills": ["2 specific sub-skills"],
      "duration": "E.g., 6 Months",
      "difficulty": "One of: Beginner, Intermediate, Advanced"
    }
  ]
}

DO NOT include any markdown blocks around the JSON (like \`\`\`json). Just return the direct raw JSON object string. Keep it creative, inspiring, full of high-end scannable words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text?.trim() || "{}";
      const data = JSON.parse(text);
      return res.json(data);
    } catch (error) {
      console.error("Gemini API error during career coach request:", error);
      // Fallback below
    }
  }

  // High-fidelity fallback logic
  const matchKey = Object.keys(FALLBACK_CAREER_ROADMAPS).find(k => queryNormalized.includes(k)) || "default";
  return res.json(FALLBACK_CAREER_ROADMAPS[matchKey]);
});


// API: Career Simulation Endpoint
app.post("/api/career/simulate", async (req, res) => {
  const { career } = req.body;
  const careerLabel = career || "Quantum Systems Architect";

  if (ai) {
    try {
      const prompt = `You are NEXUS AI Simulation Node. Generate a live immersive simulation setup for the career: "${careerLabel}".
Provide a realistic simulated workflow comprising daily interactive tasks and real-time teammate messages.
Return your output STRICTLY as a JSON object matching this structure:
{
  "environmentName": "Name of the digital workspaces (e.g. Google DeepMind Orbit Hub #7)",
  "systemStatus": "Optimal / Thermal Warp Detected / Quantum Synapse Grid OK",
  "dailyMissions": [
    {
      "id": "t1",
      "title": "First core task",
      "description": "Intense technical task description of what they must do",
      "difficulty": "Low / Medium / Critical",
      "status": "pending"
    },
    {
      "id": "t2",
      "title": "Second core task",
      "description": "High consequence systems simulation task",
      "difficulty": "Medium",
      "status": "pending"
    },
    {
      "id": "t3",
      "title": "Third core task",
      "description": "Calibration and critical decision task",
      "difficulty": "Critical",
      "status": "pending"
    }
  ],
  "chatMessages": [
    {
      "speaker": "Ariel Vance",
      "role": "Tech Lead",
      "text": "Hey engineer, we are seeing a 14% drift in our high-dimensional neural weights. Let's calibrate the core matrix.",
      "avatarSeed": "vance"
    },
    {
      "speaker": "NEXUS AI Agent",
      "role": "AI Pair Programmer",
      "text": "I have set up the terminal parameters with synthetic tests. Let's analyze the compiler logs together.",
      "avatarSeed": "nexus"
    }
  ]
}
DO NOT write any surrounding response text. Return only valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text?.trim() || "{}";
      return res.json(JSON.parse(text));
    } catch (error) {
      console.error("Gemini simulation drift. Emulating fallback state:", error);
    }
  }

  // Fallback Simulation Data
  return res.json({
    environmentName: `${careerLabel} Immersive Grid #04`,
    systemStatus: "Quantum Synchronization Engine OK",
    dailyMissions: [
      {
        id: "m1",
        title: "Calibrate Synaptic Matrix Channels",
        description: "Align hyper-parameter tensor nodes to minimize vector drift under 0.02%.",
        difficulty: "Medium",
        status: "pending"
      },
      {
        id: "m2",
        title: "Mitigate Neural Core Divergence",
        description: "A secure quarantine patch is required to deflect systemic simulation feedback on layer 5.",
        difficulty: "Critical",
        status: "pending"
      },
      {
        id: "m3",
        title: "Synchronize Dev-Swarms",
        description: "Deploy automated worker micro-agents to crawl codebase dependencies and clear type gaps.",
        difficulty: "Low",
        status: "pending"
      }
    ],
    chatMessages: [
      {
        speaker: "Dr. Elena Frost",
        role: "Tech Lead",
        text: "The quantum telemetry looks solid, but we need to verify the cognitive alignment metrics before the main grid cycle.",
        avatarSeed: "frost"
      },
      {
        speaker: "NEXUS-9 Synth",
        role: "AI Pair Programmer",
        text: "I am standby to inject local validation patches into your workstation terminal. Ready on your signal.",
        avatarSeed: "nexus"
      }
    ]
  });
});

// API: Interview Questions Endpoint
app.post("/api/career/interview/questions", async (req, res) => {
  const { career } = req.body;
  const targetCareer = career || "Quantum Systems Architect";

  if (ai) {
    try {
      const prompt = `Generate a set of 3 hyper-realistic, highly advanced futuristic interview questions for the role: "${targetCareer}".
Return strict JSON matching this structure:
{
  "questions": [
    {
      "id": "q1",
      "text": "Synthetically complex technical question",
      "category": "Technical",
      "sampleAnswerHint": "A key concept or technical system parameter that the answer should mention to look outstanding."
    },
    {
      "id": "q2",
      "text": "Behavioral team alignment question in high stakes futuristic setting",
      "category": "Behavioral",
      "sampleAnswerHint": "Key traits like active negotiation, high-stress empathy, or prompt engineering sync."
    },
    {
      "id": "q3",
      "text": "Extreme scale architectural systems layout question",
      "category": "Architectural",
      "sampleAnswerHint": "Mentions distributed micro-queues, high availability, custom state-machines, or cold start mitigation."
    }
  ]
}
DO NOT wrap with markdown code fences. Respond only with raw JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      return res.json(JSON.parse(response.text?.trim() || "{}"));
    } catch (e) {
      console.error("Gemini failed questions, loading default questions:", e);
    }
  }

  // Fallback questions
  return res.json({
    questions: [
      {
        id: "q1",
        text: `Under severe bandwidth degradation, how would you optimize the neural coordinate mapping in ${targetCareer} grids to guarantee zero human feedback latency?`,
        category: "Technical",
        sampleAnswerHint: "Leverage temporal quantum compression layers and preemptive browser state caching."
      },
      {
        text: "Tell me about a time your co-lead engineer proposed a high-risk system bypass that could increase daily sync output by 300% but threatened security rules.",
        category: "Behavioral",
        sampleAnswerHint: "Emphasize collaborative risk analysis, partial sandboxed dry-runs, and compliance protocols."
      },
      {
        text: "Design a decentralized ledger system capable of tracking billions of microgigs and skill milestones across multi-planetary workspaces without centralized servers.",
        category: "Architectural",
        sampleAnswerHint: "Utilize localized directed acyclic graphs (DAGs) and sub-second verification gossip protocols."
      }
    ]
  });
});

// API: Interview Response evaluation
app.post("/api/career/interview/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  if (ai) {
    try {
      const prompt = `Evaluate this user's respond to an interview question.
Question: "${question}"
Answer: "${answer}"

Provide a highly objective, encouraging, but technical analysis of their answer.
Return strict JSON:
{
  "overallScore": 85,
  "confidenceScore": 90,
  "grammarAndTone": "Constructive critique of verbal speed, vocabulary presence, and logical continuity",
  "strengths": ["List of 2 core positive elements from their answer"],
  "gaps": ["List of 2 missing items or areas needing structured elaboration"],
  "suggestedAnswer": "A beautifully drafted premium mock answer that the user can learn from directly."
}
No other text. Only JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      return res.json(JSON.parse(response.text?.trim() || "{}"));
    } catch (e) {
      console.error("Gemini error during evaluation, loading fallback:", e);
    }
  }

  // Fallback Evaluation
  return res.json({
    overallScore: 78,
    confidenceScore: 84,
    grammarAndTone: "Professional and articulate, though slightly lacking in technical architectural terminology.",
    strengths: [
      "Excellent emphasis on risk mitigation protocols.",
      "Identified safety safeguards as a primary priority."
    ],
    gaps: [
      "Did not detail the underlying consensus mechanisms or cache strategies.",
      "Could have quantified past project outcomes to anchor credibility."
    ],
    suggestedAnswer: "An optimal answer should explicitly balance strict system safety constraints with proactive micro-architectures, specifically citing localized DAG consensus and pre-cached browser layers to survive severe packet drift."
  });
});

// Serve Vite frontend
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NEXUS AI server operating at: http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Server start critical failure:", err);
});
