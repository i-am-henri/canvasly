import { auth } from '@/lib/auth';
import { createMiddleware, createSafeActionClient } from 'next-safe-action';
import { headers } from 'next/headers';

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  return next({
    ctx: {
      sessionId: session.session.id,
      userId: session.user.id,
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
