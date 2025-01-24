'use server';
import { db } from '@/lib/db';
import { createId, init } from '@paralleldrive/cuid2';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { actionClient } from '../action';

const generateCode = init({
  length: 6,
});

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
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

export const signUp = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    // Process the sign in request
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        id: createId(),
        password: hashedPassword,
        emailVerified: false,
      },
    });

    if (!user) {
      throw new Error(
        'Failed to create user. Please try again later or contact support.'
      );
    }

    // create the verification token
    const verification = await db.verification.create({
      data: {
        value: generateCode(),
        id: createId(),
        expiresAt: new Date(Date.now() + 60 * 20 * 1000),
      },
    });

    // sending the email verification code

    redirect('/auth/verify');
  });
