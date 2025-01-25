import 'server-only';
import { createId } from '@paralleldrive/cuid2';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './db';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export function encrypt(payload: {
  sessionId: string;
  expiresAt: Date;
  userId: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (err) {
    console.error('Error decrypting session:', err);
    redirect('/auth/login');
  }
}

export async function createSession({ userId }: { userId: string }) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // create a session
  const data = await db.session.create({
    data: {
      id: createId(),
      expiresAt,
      userId,
    },
  });

  const sessionId = data.id;

  const session = await encrypt({ sessionId, expiresAt, userId });

  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
