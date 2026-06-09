export interface PassportInterviewScores {
  technical: number;
  behavioral: number;
  architectural: number;
  confidence: number;
  sessionsCompleted: number;
}

export interface PassportSimulationStats {
  missionsCompleted: number;
  criticalMissionsCompleted: number;
  dayOneChallengesCompleted: number;
  lastCareer: string;
}

export interface PassportSkillEvidence {
  name: string;
  marketDemand: number;
  status: "locked" | "learning" | "mastered";
}

export interface CareerPassportData {
  passportId: string;
  ownerName: string;
  ownerEmail: string;
  targetRole: string;
  nexusScore: number;
  interview: PassportInterviewScores;
  simulation: PassportSimulationStats;
  skills: PassportSkillEvidence[];
  portfolioProjects: number;
  updatedAt: string;
}

export interface DayOneChallenge {
  id: string;
  employerName: string;
  title: string;
  role: string;
  description: string;
  duration: string;
  difficulty: "Low" | "Medium" | "Critical";
  tasks: { id: string; title: string; description: string }[];
  createdAt: string;
}

export interface BlindTalentProfile {
  anonymousId: string;
  nexusScore: number;
  simulationRate: number;
  interviewScore: number;
  confidenceScore: number;
  topSkills: string[];
  skillHeatmap: Record<string, number>;
  missionsCompleted: number;
  isRevealed: boolean;
  isShortlisted: boolean;
  realName?: string;
  realTitle?: string;
  passportId?: string;
}

const PASSPORT_KEY = "nexus_career_passport";
const CHALLENGES_KEY = "nexus_day_one_challenges";
const BLIND_POOL_KEY = "nexus_blind_talent_pool";

function defaultPassport(name: string, email: string): CareerPassportData {
  const id = `NX-${Date.now().toString(36).toUpperCase()}`;
  return {
    passportId: id,
    ownerName: name,
    ownerEmail: email,
    targetRole: "AI Core Synaptic Architect",
    nexusScore: 72,
    interview: {
      technical: 0,
      behavioral: 0,
      architectural: 0,
      confidence: 0,
      sessionsCompleted: 0,
    },
    simulation: {
      missionsCompleted: 0,
      criticalMissionsCompleted: 0,
      dayOneChallengesCompleted: 0,
      lastCareer: "",
    },
    skills: [
      { name: "Transformer Mechanics", marketDemand: 92, status: "learning" },
      { name: "Tensor Entrapment", marketDemand: 88, status: "learning" },
    ],
    portfolioProjects: 2,
    updatedAt: new Date().toISOString(),
  };
}

function computeNexusScore(data: CareerPassportData): number {
  const interviewAvg =
    data.interview.sessionsCompleted > 0
      ? (data.interview.technical + data.interview.behavioral + data.interview.architectural) / 3
      : 0;
  const simScore = Math.min(data.simulation.missionsCompleted * 8 + data.simulation.dayOneChallengesCompleted * 12, 40);
  const skillScore =
    data.skills.length > 0
      ? data.skills.reduce((s, sk) => s + sk.marketDemand, 0) / data.skills.length * 0.35
      : 0;
  const portfolioScore = Math.min(data.portfolioProjects * 5, 15);
  const confidenceBonus = data.interview.confidence * 0.1;
  return Math.min(Math.round(interviewAvg * 0.35 + simScore + skillScore + portfolioScore + confidenceBonus), 100);
}

export function getPassport(): CareerPassportData | null {
  try {
    const raw = localStorage.getItem(PASSPORT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function initPassport(name: string, email: string, targetRole?: string): CareerPassportData {
  const existing = getPassport();
  if (existing && existing.ownerEmail === email) {
    if (targetRole) existing.targetRole = targetRole;
    existing.ownerName = name;
    savePassport(existing);
    syncToBlindPool(existing);
    return existing;
  }
  const passport = defaultPassport(name, email);
  if (targetRole) passport.targetRole = targetRole;
  savePassport(passport);
  syncToBlindPool(passport);
  return passport;
}

export function savePassport(data: CareerPassportData): void {
  data.nexusScore = computeNexusScore(data);
  data.updatedAt = new Date().toISOString();
  localStorage.setItem(PASSPORT_KEY, JSON.stringify(data));
  syncToBlindPool(data);
}

export function recordInterviewScore(
  category: "Technical" | "Behavioral" | "Architectural",
  overallScore: number,
  confidenceScore: number
): void {
  const passport = getPassport();
  if (!passport) return;
  const key = category === "Technical" ? "technical" : category === "Behavioral" ? "behavioral" : "architectural";
  passport.interview[key] = Math.max(passport.interview[key], overallScore);
  passport.interview.confidence = Math.max(passport.interview.confidence, confidenceScore);
  passport.interview.sessionsCompleted += 1;
  savePassport(passport);
}

export function recordMissionComplete(difficulty: "Low" | "Medium" | "Critical", career: string): void {
  const passport = getPassport();
  if (!passport) return;
  passport.simulation.missionsCompleted += 1;
  if (difficulty === "Critical") passport.simulation.criticalMissionsCompleted += 1;
  passport.simulation.lastCareer = career;
  savePassport(passport);
}

export function recordDayOneChallengeComplete(): void {
  const passport = getPassport();
  if (!passport) return;
  passport.simulation.dayOneChallengesCompleted += 1;
  savePassport(passport);
}

export function recordSkillEvidence(name: string, marketDemand: number, status: "locked" | "learning" | "mastered"): void {
  const passport = getPassport();
  if (!passport) return;
  const idx = passport.skills.findIndex((s) => s.name === name);
  const entry = { name, marketDemand, status };
  if (idx >= 0) passport.skills[idx] = entry;
  else passport.skills.push(entry);
  savePassport(passport);
}

export function getDayOneChallenges(): DayOneChallenge[] {
  try {
    const raw = localStorage.getItem(CHALLENGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through */
  }
  const defaults: DayOneChallenge[] = [
    {
      id: "doc1",
      employerName: "Aetheria Intelligence",
      title: "API Latency Debug Sprint",
      role: "AI Core Synaptic Architect",
      description: "Fix a 340ms regression in the inference pipeline before the production deploy window closes.",
      duration: "2 hours",
      difficulty: "Critical",
      tasks: [
        { id: "dt1", title: "Profile Bottleneck Layer", description: "Identify which transformer layer causes the latency spike using profiler telemetry." },
        { id: "dt2", title: "Deploy Hotfix Patch", description: "Ship a quantized kernel patch and validate sub-100ms inference on staging." },
      ],
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(defaults));
  return defaults;
}

export function saveDayOneChallenge(challenge: DayOneChallenge): void {
  const all = getDayOneChallenges().filter((c) => c.id !== challenge.id);
  all.unshift(challenge);
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(all));
}

export function deleteDayOneChallenge(id: string): void {
  const all = getDayOneChallenges().filter((c) => c.id !== id);
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(all));
}

function defaultBlindPool(): BlindTalentProfile[] {
  return [
    {
      anonymousId: "NODE-7X4A",
      nexusScore: 94,
      simulationRate: 97,
      interviewScore: 91,
      confidenceScore: 88,
      topSkills: ["Transformer Mechanics", "MoE Architectures", "Triton Kernels"],
      skillHeatmap: { "AI/ML": 96, "Systems": 89, "Leadership": 72 },
      missionsCompleted: 12,
      isRevealed: false,
      isShortlisted: false,
      realName: "Elena Rostova",
      realTitle: "Senior AI & Synaptic Engineer",
    },
    {
      anonymousId: "NODE-3K9B",
      nexusScore: 88,
      simulationRate: 85,
      interviewScore: 86,
      confidenceScore: 82,
      topSkills: ["Quantum Logic", "Neural Decoupling", "DAG Consensus"],
      skillHeatmap: { "Quantum": 92, "Security": 84, "Architecture": 87 },
      missionsCompleted: 9,
      isRevealed: false,
      isShortlisted: false,
      realName: "Marcus Vance",
      realTitle: "Holographic Lead Architect",
    },
    {
      anonymousId: "NODE-1M2C",
      nexusScore: 82,
      simulationRate: 78,
      interviewScore: 79,
      confidenceScore: 76,
      topSkills: ["Cryo Shielding", "Leak Detection", "Cryptography"],
      skillHeatmap: { "Security": 90, "Physics": 81, "Compliance": 74 },
      missionsCompleted: 7,
      isRevealed: false,
      isShortlisted: false,
      realName: "Sienna Drake",
      realTitle: "Cryo Shield Security Specialist",
    },
  ];
}

export function getBlindTalentPool(): BlindTalentProfile[] {
  try {
    const raw = localStorage.getItem(BLIND_POOL_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through */
  }
  const defaults = defaultBlindPool();
  localStorage.setItem(BLIND_POOL_KEY, JSON.stringify(defaults));
  return defaults;
}

function syncToBlindPool(passport: CareerPassportData): void {
  const pool = getBlindTalentPool();
  const anonId = `NODE-${passport.passportId.slice(-4)}`;
  const interviewAvg =
    passport.interview.sessionsCompleted > 0
      ? Math.round(
          (passport.interview.technical + passport.interview.behavioral + passport.interview.architectural) / 3
        )
      : passport.nexusScore - 10;
  const existing = pool.find((p) => p.passportId === passport.passportId);
  const profile: BlindTalentProfile = {
    anonymousId: existing?.anonymousId || anonId,
    nexusScore: passport.nexusScore,
    simulationRate: Math.min(passport.simulation.missionsCompleted * 12 + 40, 100),
    interviewScore: interviewAvg || passport.nexusScore - 5,
    confidenceScore: passport.interview.confidence || 70,
    topSkills: passport.skills.slice(0, 4).map((s) => s.name),
    skillHeatmap: {
      "AI/ML": passport.skills[0]?.marketDemand || 75,
      Systems: passport.skills[1]?.marketDemand || 70,
      Simulation: Math.min(passport.simulation.missionsCompleted * 15, 95),
    },
    missionsCompleted: passport.simulation.missionsCompleted,
    isRevealed: existing?.isRevealed || false,
    isShortlisted: existing?.isShortlisted || false,
    realName: passport.ownerName,
    realTitle: passport.targetRole,
    passportId: passport.passportId,
  };
  const filtered = pool.filter((p) => p.passportId !== passport.passportId);
  filtered.unshift(profile);
  localStorage.setItem(BLIND_POOL_KEY, JSON.stringify(filtered));
}

export function shortlistBlindCandidate(anonymousId: string): BlindTalentProfile | null {
  const pool = getBlindTalentPool();
  const idx = pool.findIndex((p) => p.anonymousId === anonymousId);
  if (idx < 0) return null;
  pool[idx].isShortlisted = true;
  pool[idx].isRevealed = true;
  localStorage.setItem(BLIND_POOL_KEY, JSON.stringify(pool));
  return pool[idx];
}

export function parseMarketDemand(demand: string): number {
  const match = demand.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 75;
}
