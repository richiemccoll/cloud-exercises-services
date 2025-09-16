import { Type } from '@sinclair/typebox';

export const RoadmapParams = Type.Object({
  id: Type.String(),
});

export const CreateRoadmapBody = Type.Object({
  title: Type.String(),
  role: Type.String(),
  phases: Type.Array(Type.Any()),
});
