import { verifySession } from '@/lib/dal';
import { createMiddleware, createSafeActionClient } from 'next-safe-action';

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await verifySession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return next({
    ctx: {
      userId: session.userId,
    },
  });
});

export const authActionClient = createSafeActionClient({
  handleServerError: (e) => {
    return {
      errorMessage: e.message,
    };
  },
}).use(authMiddleware);
