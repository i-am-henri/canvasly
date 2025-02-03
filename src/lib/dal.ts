import 'server-only';

import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { db } from './db';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie) as { userId?: string };

  if (!session?.userId) {
    redirect('/auth/login');
  }

  return { isAuth: true, userId: session.userId as string };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.userId,
      },
    });

    return user;
  } catch (error) {
    throw new Error('Could not fetch user!');
  }
});
