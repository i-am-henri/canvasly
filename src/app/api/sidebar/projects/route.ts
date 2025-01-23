import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// get the projects of an user
export async function GET() {
  // Fetch the users of this account
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user) {
    return NextResponse.json(
      {
        status: 'Unauthorized',
      },
      {
        status: 421,
      }
    );
  }

  // Return the projects array
  return new Response(
    JSON.stringify({
      hey: 'hey',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
