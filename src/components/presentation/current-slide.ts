// store to keep track of the current slide

import { toast } from 'sonner';
import { create } from 'zustand';
import { useCanvasStore } from './elements';
import { useSlidesStore } from './slides';

type State = {
  currentSlide: number;
};

type Action = {
  setCurrentSlide: (currentSlide: State['currentSlide']) => void;
};

// store the canvas
export const useCurrentSlideStore = create<State & Action>((set) => ({
  currentSlide: 0,
  setCurrentSlide: (currentSlide) =>
    set(() => ({ currentSlide: currentSlide })),
}));

export const changeSlide = (slide: number) => {
  const slides = useSlidesStore.getState().slides;

  if (slide > slides.length) {
    toast.error('Slide not found. Please try again later or contact us!');
    return;
  }

  const canvas = useCanvasStore.getState().canvas;
  if (!canvas) {
    return;
  }
  canvas.clear();

  const setCurrentSlide = useCurrentSlideStore.getState().setCurrentSlide;
  setCurrentSlide(slide);

  // load the canvas from the current slide
  console.log(`New slide: ${JSON.stringify(slides[slide])}`);
  for (const object of slides[slide].object) {
    canvas.add(object);
  }
  canvas.renderAll();
  console.log('Loading the canvas...');
};

export const createSlide = () => {
  const slides = useSlidesStore.getState().slides;
  const setSlides = useSlidesStore.getState().setSlides;

  setSlides([
    ...slides,
    {
      progress: 'not-started',
      createdAt: new Date(),
      updatedAt: new Date(),
      object: [],
    },
  ]);

  changeSlide(slides.length);
};
