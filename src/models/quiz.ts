// Quiz, Question, Answer, Badge, Submission models
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

export interface Badge {
  id: string;
  userId: string;
  type: string;
  criteria: string;
  awardedDate: string;
}

export interface Submission {
  id: string;
  userId: string;
  stepId?: string;
  quizId?: string;
  answers: Answer[];
  completed: boolean;
  submittedAt: string;
}
