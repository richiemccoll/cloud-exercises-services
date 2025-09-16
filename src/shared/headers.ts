import { Type } from '@sinclair/typebox';

export const AUTHORIZATION = 'authorization';

export const authorizationHeaderSchema = Type.Object(
  {
    [AUTHORIZATION]: Type.String({ description: 'Bearer token' }),
  },
  {
    description: 'Authorization header with Bearer token',
  }
);

export const authenticatedHeadersSchema = Type.Intersect([
  authorizationHeaderSchema,
])