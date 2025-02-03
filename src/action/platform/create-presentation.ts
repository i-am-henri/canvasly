'use server';

import { db } from '@/lib/db';
import { createId } from '@paralleldrive/cuid2';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { authActionClient } from '../auth-action';

const singleEmojiRegex = /^\p{Emoji}$/u;
const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(50),
  emoji: z.string().regex(singleEmojiRegex, 'Only a single emoji is allowed'),
});

export const createPresentation = authActionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { emoji, title }, ctx: { userId } }) => {
    // create the new presentation
    const presentation = await db.presentation.create({
      data: {
        id: createId(),
        title,
        userId,
      },
    });

    if (!presentation) {
      throw new Error('Could not create presentation. Unknown error occured.');
    }

    redirect(`/dashboard/${presentation.id}`);
  });
