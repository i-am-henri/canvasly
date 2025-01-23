import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// get the users of an account
export async function GET() {
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
  // Fetch the users of this account
  const users = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  // Prepare accounts array
  const accounts: {
    name: string;
    id: string;
    image?: string;
  }[] = [];

  for await (const user of users) {
    // Fetch user details from the database
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // Add to accounts array
    if (dbUser) {
      accounts.push({
        name: dbUser.name,
        id: dbUser.id,
        image: dbUser.image || undefined,
      });
    }
  }

  // Return the accounts array
  return new Response(JSON.stringify(accounts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
