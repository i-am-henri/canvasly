// store to keep track of the slides on the local machine

import type { FabricObject } from 'fabric';
import { create } from 'zustand';

type Slide = {
  progress: 'not-started' | 'in-progress' | 'done';
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  object: FabricObject[];
};

type State = {
  slides: Slide[];
};

type Action = {
  setSlides: (slides: State['slides']) => void;
};

// store the canvas
export const useSlidesStore = create<State & Action>((set) => ({
  slides: [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      object: [],
      progress: 'not-started',
    },
  ],
  setSlides: (slides) => set(() => ({ slides: slides })),
}));
