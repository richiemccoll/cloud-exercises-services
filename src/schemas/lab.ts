import { Type } from "@sinclair/typebox";

export const labSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  valueProp: Type.String(),
  timeEffort: Type.String(),
  prerequisites: Type.Array(Type.String()),
  steps: Type.Array(Type.Any()),
  track: Type.String(),
  phaseId: Type.String(),
  roadmapId: Type.String(),
  difficulty: Type.String(),
  quizzes: Type.Array(Type.Any()),
  description: Type.String(),
  estimatedCost: Type.String(),
  keyConcepts: Type.Array(Type.String()),
});