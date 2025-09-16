import { Type } from '@sinclair/typebox';
import { projectSchema } from '../../schemas/projects.js';

export const projectDetailParamsSchema = Type.Object({
  id: Type.String(),
});

export const labDetailParamsSchema = Type.Object({
  id: Type.String(),
  labId: Type.String(),
});

export const listProjectsResponseSchema = Type.Array(projectSchema);
