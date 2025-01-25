'use server';

import { db } from '@/lib/db';
import { authActionClient } from '../auth-action';

export const fetchSidebarData = authActionClient.action(
  async ({ ctx: { userId } }) => {
    // fetch the projecst by the users
    const projects = await db.presentation.findMany({
      where: {
        creator: {
          id: userId,
        },
      },
      select: {
        title: true,
        id: true,
      },
    });

    // fetch the projects which are shared with the user
    const sharedProjects = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        presentationsJoined: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });

    return {
      projects,
      sharedProjects: sharedProjects?.presentationsJoined.map(
        (presentation) => {
          return {
            ...presentation,
          };
        }
      ),
    };
  }
);
