import { Type } from '@sinclair/typebox';

export const profileSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  type: Type.String(),
})
