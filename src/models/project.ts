// Project model
export interface Project {
  id: string;
  title: string;
  description: string;
  valueProp: string;
  estimatedCost: string;
  timeEffort: string;
  prerequisites: string[];
  steps: Step[];
  track: 'low' | 'high' | 'none';
  phaseId: string;
  roadmapId?: string;
  difficulty: string;
  keyConcepts: string;
  quizzes: Quiz[];
}

export interface Step {
  id: string;
  projectId: string;
  order: number;
  content: string;
  hints: string[];
  assets: Asset[];
  checklist: string[];
}

export type Asset = {
  type: 'image' | 'code' | 'link';
  value: string;
};

export interface Quiz {
  id: string;
  projectId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  answers: Answer[];
  explanation: string;
}

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
}
