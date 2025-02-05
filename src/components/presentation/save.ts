import { useCurrentSlideStore } from './current-slide';
import { useCanvasStore } from './elements';
import { useSlidesStore } from './slides';
import { debounce } from './utils';

export const handleSave = debounce(() => {
  const slides = useSlidesStore.getState().slides;
  const setSlides = useSlidesStore.getState().setSlides;
  const currentSlide = useCurrentSlideStore.getState().currentSlide;

  const canvas = useCanvasStore.getState().canvas;
  if (!canvas) {
    return null;
  }

  // save the canvas
  const data = slides[currentSlide];
  data.object = canvas.getObjects();
  console.log(`Saving the canvas: ${JSON.stringify(data)}`);

  // save the canvas to the current position inside the array
  setSlides(
    slides.map((slide, index) => (index === currentSlide ? data : slide))
  );
}, 1500);
