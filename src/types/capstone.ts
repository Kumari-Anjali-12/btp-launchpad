export interface CapstoneDeliverable {
  title: string;
  description: string;
  path: string;
}

export interface CapstoneCheckpoint {
  id: string;
  title: string;
  description: string;
  hint: string;
}

export interface CapstoneQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CapstoneBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface CapstoneLevel {
  id: string; // 'level-1', 'level-2', 'level-3'
  title: string;
  subtitle: string;
  phase: string; // 'Phase 9.1', 'Phase 9.2', 'Phase 9.3'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  badge: CapstoneBadge;
  objectives: string[];
  deliverables: CapstoneDeliverable[];
  checkpoints: CapstoneCheckpoint[];
  quiz: CapstoneQuizQuestion[];
}

export interface CapstoneProgressState {
  completedCheckpoints: Record<string, boolean>;
  passedQuizzes: Record<string, boolean>;
  quizScores: Record<string, number>;
  unlockedBadges: string[];
  selectedCodeFile?: string;
}
