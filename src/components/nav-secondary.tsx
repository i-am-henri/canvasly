'use client';
import {
  Blocks,
  Calendar,
  type LucideIcon,
  MessageCircleQuestion,
  Settings2,
  Trash2,
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/dashboard/sidebar';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const items: {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: ReactNode;
}[] = [
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings2,
  },
  {
    title: 'Templates',
    url: '#',
    icon: Blocks,
  },
  {
    title: 'Trash',
    url: '#',
    icon: Trash2,
  },
  {
    title: 'Help',
    url: '#',
    icon: MessageCircleQuestion,
  },
];

export function NavSecondary({
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
