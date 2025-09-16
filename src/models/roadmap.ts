// Roadmap and Phase models
export interface Roadmap {
  id: string;
  title: string;
  role: string;
  phases: Phase[];
}

export interface Phase {
  id: string;
  roadmapId: string;
  title: string;
  projects: Project[];
}

import type { Project } from './project.js';
