'use client';

import { ChevronDown, Plus, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/dashboard/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/dashboard/sidebar';
import { useActiveUser } from '@/hooks/useActiveUser';
import Image from 'next/image';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    image?: string;
    email: string;
    id: string;
  }[];
}) {
  console.log(teams);
  const { data, isLoading, error } = useActiveUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error || data.serverError || !data.data) {
    throw new Error('Could not fetch user.');
  }

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {(data.data?.image && (
                  <Image
                    src={data.data.image}
                    alt="Logo of user"
                    width={12}
                    height={12}
                    className="size-3"
                  />
                )) || <User className="size-3" />}
              </div>
              <span className="truncate font-semibold">{data.data.name}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => null}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {(team.image && (
                    <Image
                      src={team.image}
                      alt="Logo of user"
                      width={12}
                      height={12}
                      className="size-3"
                    />
                  )) || <User className="size-3" />}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
