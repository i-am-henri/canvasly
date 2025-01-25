'use client';

import type { LucideIcon } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/dashboard/sidebar';
import { useCommandStore } from './command-menu';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    onClick?: ({ setState }: { setState: (state: boolean) => void }) => void;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const { setState } = useCommandStore();
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            {(item.onClick && (
              <button
                type="button"
                onClick={() => {
                  if (!item.onClick) {
                    return;
                  }
                  item.onClick({ setState: setState });
                }}
                onKeyDown={() => {
                  if (!item.onClick) {
                    return;
                  }
                  item.onClick({ setState });
                }}
              >
                <item.icon />
                <span>{item.title}</span>
              </button>
            )) || (
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
