// slides system

import { create } from 'zustand';

// store for the entire slides
// a preview is the canvas as svg and the slide is the canvas as dataless json (canvas?.toDatalessJson())
type State = {
  slide: string[];
  preview: string[];
  currentSlide: number;
};

type Action = {
  setSlide: (slide: State['slide']) => void;
  setCurrentSlide: (currentSlide: State['currentSlide']) => void;
  setPreview: (preview: State['preview']) => void;
};

// store the slides
export const useSlidesStore = create<State & Action>((set) => ({
  slide: [],
  setSlide: (slide) => set(() => ({ slide: slide })),
  currentSlide: 0,
  setCurrentSlide: (currentSlide) =>
    set(() => ({ currentSlide: currentSlide })),
  preview: [],
  setPreview: (preview) => set(() => ({ preview: preview })),
}));

// export the function to get add a single slide
export const addSlide = (content: string, index?: number) => {
  if (index) {
    useSlidesStore.setState({
      slide: [
        ...useSlidesStore.getState().slide.slice(0, index),
        content,
        ...useSlidesStore.getState().slide.slice(index),
      ],
    });
  } else {
    useSlidesStore.setState({
      slide: [...useSlidesStore.getState().slide, content],
    });
  }
};

// function to remove a single slide
export const removeSlide = (index: number) => {
  useSlidesStore.setState({
    slide: useSlidesStore.getState().slide.filter((_, i) => i !== index),
  });
};

// function to reorder a slide
export const reorderSlide = (from: number, to: number) => {
  const slide = useSlidesStore.getState().slide;
  const [removed] = slide.splice(from, 1);
  slide.splice(to, 0, removed);

  useSlidesStore.setState({
    slide,
  });
};
