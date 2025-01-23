'use client';

import { fetchSidebarData } from '@/action/sidebar';
import { useQuery } from '@tanstack/react-query';

export const useSidebarData = () => {
  return useQuery({
    queryKey: ['SidebarData'],
    queryFn: () => fetchSidebarData(),
  });
};
