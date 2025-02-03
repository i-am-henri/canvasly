'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/dashboard/command';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { create } from 'zustand';

type State = {
  state: boolean;
};

type Actions = {
  setState: (state: State['state']) => void;
};

export const useCommandStore = create<State & Actions>((set) => ({
  state: false,
  setState: (state) => set(() => ({ state: state })),
}));

import { DialogTitle } from '@radix-ui/react-dialog';
import { useEffect } from 'react';

export function CommandMenu() {
  const { state, setState } = useCommandStore();

  // open command menu on strg + k / command + k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setState(!state);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [state, setState]);

  return (
    <VisuallyHidden>
      <CommandDialog open={state} onOpenChange={setState}>
        <DialogTitle className="hidden">Command Menu</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Create a new presentation</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </VisuallyHidden>
  );
}
