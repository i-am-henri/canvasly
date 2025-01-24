'use server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { actionClient } from '../action';

const formSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Code must be 6 characters long.',
    })
    .max(6, {
      message: 'Code must be 6 characters long.',
    }),
});

export const verifyToken = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { code } }) => {
    // Process the code
    const verification = await db.verification.findUnique({
      where: {
        value: code,
      },
    });

    if (!verification) {
      throw new Error('Invalid code');
    }

    if (verification.used) {
      throw new Error('Code already used');
    }

    // update the verification token
    const updatedVerification = await db.verification.update({
      where: {
        id: verification.id,
      },
      data: {
        used: true,
      },
    });

    if (!updatedVerification) {
      throw new Error('Could not update the verification token');
    }

    redirect('/auth/login');
  });
