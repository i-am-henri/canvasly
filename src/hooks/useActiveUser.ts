// get the active user

'use client';

import { fetchActiveUser } from '@/action/hooks/active-user';
import { useQuery } from '@tanstack/react-query';

export const useActiveUser = () => {
  return useQuery({
    queryKey: ['ActiveUser'],
    queryFn: () => fetchActiveUser(),
  });
};
