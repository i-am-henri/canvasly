'use client';

import { ChevronDown, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/dashboard/sidebar';
import { useActiveUser } from '@/hooks/useActiveUser';
import Image from 'next/image';

export function UserMenu() {
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
              Settings
            </DropdownMenuLabel>
            <DropdownMenuItem>Notifcations</DropdownMenuItem>
            <DropdownMenuItem>Projects</DropdownMenuItem>
            <DropdownMenuItem>Add-ons</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
