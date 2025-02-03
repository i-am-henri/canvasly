'use client';

import { Home, type LucideIcon, Search } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/dashboard/sidebar';
import { usePathname } from 'next/navigation';
import { useCommandStore } from './command-menu';

const items: {
  title: string;
  url?: string;
  onClick?: ({ setState }: { setState: (state: boolean) => void }) => void;
  icon: LucideIcon;
  isActive?: boolean;
}[] = [
  {
    title: 'Search',
    onClick({ setState }: { setState: (state: boolean) => void }) {
      setState(true);
    },
    icon: Search,
  },
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
];

export function NavMain() {
  const { setState } = useCommandStore();
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.url ? item.url === pathname : false}
          >
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
