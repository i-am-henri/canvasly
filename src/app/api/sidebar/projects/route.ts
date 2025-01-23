import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// get the projects of an user
export async function GET() {
  // Fetch the users of this account
  const users = await auth.api.getSession({
    headers: await headers(),
  });

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
