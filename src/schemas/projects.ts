import { Type } from "@sinclair/typebox";
import { labSchema } from "./lab.js";

export const projectSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  slug: Type.String(),
  title: Type.String(),
  description: Type.String(),
  image: Type.String({ format: 'uri' }),
  tags: Type.Array(Type.String()),
  timeEffort: Type.String(),
  difficulty: Type.String(),
  phaseIds: Type.Array(Type.String()),
  labs: Type.Array(labSchema),
  roadmapId: Type.String(),
  prerequisites: Type.Array(Type.String()),
  outcomes: Type.Array(Type.String()),
});