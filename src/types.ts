export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface RoadmapNode {
  id: string;
  label: string;
  phase: string;
  description: string;
  skills: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CareerRecommendation {
  title: string;
  demand: 'Exponential' | 'High' | 'Moderate' | 'Emerging';
  salary: string;
  summary: string;
  timeline: string;
  skills: string[];
  projects: { title: string; description: string; difficulty: string }[];
  roadmap: RoadmapNode[];
}

export interface SimTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'Low' | 'Medium' | 'Critical';
  status: 'pending' | 'active' | 'completed';
}

export interface SimMessage {
  speaker: string;
  role: 'Tech Lead' | 'AI Pair Programmer' | 'Product Manager' | 'CTO';
  text: string;
  avatarSeed: string;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'Technical' | 'Behavioral' | 'Architectural';
  sampleAnswerHint: string;
}

export interface InterviewEvaluation {
  overallScore: number;
  confidenceScore: number;
  grammarAndTone: string;
  strengths: string[];
  gaps: string[];
  suggestedAnswer: string;
}

export interface GalaxyNode {
  id: string;
  name: string;
  x: number;
  y: number;
  level: number;
  category: 'AI / ML' | 'Quantum Compute' | 'BioTech / Cybernetics' | 'SocioTech' | 'Core Engineering';
  status: 'locked' | 'learning' | 'mastered';
  description: string;
  connections: string[]; // related node IDs
  salaryImpact: string;
  marketDemand: string;
}
