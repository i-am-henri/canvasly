'use server';

import { db } from '@/lib/db';
import { createSession } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { actionClient } from '../action';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .max(50, {
      message: 'Password is not allowed to be longer than 50 characters.',
    })
    .trim(),
});

export const signIn = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log('Sign in...');
    // Process the sign in request
    // checking if the user already has a session, if not a new one will be created
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    console.log('User found:', JSON.stringify(user));
    console.log('Email:', email);
    console.log('Password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // create a session
    await createSession({ userId: user.id });

    console.log('checks done');
  });
