import { vi } from 'vitest';

vi.mock('@clerk/fastify', () => {
  let _userId: string | null = 'user_123';

  const api = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clerkPlugin: (app: any, _opts: any, done: any) => {
      app.decorateRequest('auth', null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      app.addHook('onRequest', (req: any, _reply: any, next: any) => {
        req.auth = { userId: _userId };
        next();
      });
      done();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAuth: (req: any) => {
      if (req.headers['authorization'] === 'Bearer valid_token') {
        return { userId: 'user_123', primaryEmailAddress: { emailAddress: 'test@example.com' }};
      }
      return { userId: _userId };
    },
    clerkClient: {
      users: {
        getUser: vi.fn(async (id: string) => {
          return {
            id,
            primaryEmailAddress: { emailAddress: 'test@example.com' },
          };
        }),
      },
    },
    __setUserId: (id: string | null) => {
      _userId = id;
    },
  };

  return {
    __esModule: true,
    ...api,
    default: api,
  };
});

vi.mock('@clerk/backend', () => ({
  __esModule: true,
  createClerkClient: () => ({
    users: { getUser: vi.fn(async (id) => ({ id })) },
  }),
}));
