import { Type } from '@sinclair/typebox';

export const UserParams = Type.Object({
  id: Type.String(),
});

export const UserProgressParams = Type.Object({
  userId: Type.String(),
});

export const CreateUserBody = Type.Object({
  name: Type.String(),
  email: Type.String(),
  role: Type.Union([
    Type.Literal('Learner'),
    Type.Literal('Author'),
    Type.Literal('Admin'),
  ]),
  progress: Type.Optional(Type.Any()),
  portfolio: Type.Optional(Type.Array(Type.Any())),
  badges: Type.Optional(Type.Array(Type.Any())),
});
