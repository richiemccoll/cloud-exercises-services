import { Type } from '@sinclair/typebox';

export const QuizParams = Type.Object({
  id: Type.String(),
});

export const CreateQuizBody = Type.Object({
  projectId: Type.String(),
  questions: Type.Array(Type.Any()),
});
