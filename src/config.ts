import 'dotenv/config'

import { envSchema } from 'env-schema';
import { Static, Type } from '@sinclair/typebox';

const schema = Type.Object({
  HOST: Type.String({ default: '127.0.0.1' }),
  CLERK_PUBLISHABLE_KEY: Type.String(),
  CLERK_SECRET_KEY: Type.String(),
  LOG_LEVEL: Type.String({ default: 'trace' }),
  PORT: Type.Number({ default: 8080 }),
  ENV: Type.String({ default: 'development' }),
});

export type Config = Static<typeof schema>;

const config = envSchema<Config>({
  schema,
});


export default config;
