'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/dashboard/sidebar';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavSharedProjects } from '@/components/nav-shared-projects';
import { useSidebarData } from '@/hooks/fetch/useSidebarData';
import {} from 'lucide-react';
import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Skeleton } from './dashboard/skeleton';
import { UserMenu } from './user-menu';

const fetchSchema = z.object({
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    })
  ),
  sharedProjects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    })
  ),
});

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { isLoading, error, data } = useSidebarData();
  if (error || data?.serverError) {
    throw new Error('Error occured!');
  }

  if (isLoading) {
    return (
      <Sidebar className="border-r-0" {...props}>
        <SidebarHeader>
          <UserMenu />
          <NavMain />
        </SidebarHeader>
        <SidebarContent>
          {[1, 2, 3, 4].map((entry) => (
            <Skeleton key={entry} className="w-56 h-[20px] rounded-md mx-3" />
          ))}
          <NavSecondary className="mt-auto" />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  // parsing the provided data
  const parse = fetchSchema.safeParse(data?.data);

  if (!parse.success) {
    toast.error(
      'Error while loading the data for the sidebar. Schema is not matching... Try to refresh or contact us.'
    );
    return (
      <p className="text-red-500">
        Error while loading the data for the sidebar. Schema is not matching...
        Try to refresh or contact us.
      </p>
    );
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <UserMenu />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={parse.data.projects} />
        <NavSharedProjects sharedProjects={parse.data.sharedProjects} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
