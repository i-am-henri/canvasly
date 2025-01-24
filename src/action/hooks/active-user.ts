'use server';

import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authActionClient } from '../auth-action';

export const fetchActiveUser = authActionClient.action(
  async ({ ctx: { userId } }) => {
    // get the user cookie
    const activeUserId = (await cookies()).get('active-user')?.value;

    if (userId !== activeUserId) {
      // set the cookie and redirect the user
      (await cookies()).set('active-user', userId);
      redirect(`/dashboard/${userId}`);
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return {
      ...user,
    };
  }
);
