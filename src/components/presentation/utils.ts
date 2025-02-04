import { getCanvas } from './elements';
import { updatePreview, updateSlide, useSlidesStore } from './slides';

const changeCanvasContent = () => {
  const canvas = getCanvas();

  canvas;
};

// save the content from the canvas as dataless json and as an svg for the preview
const saveCanvasContent = () => {
  const canvas = getCanvas();

  const dataJSON = canvas?.toDatalessJSON();
  const preview = canvas?.toSVG() as string;

  // get the current slide
  const slides = useSlidesStore.getState().slide;
  const currentSLide = useSlidesStore.getState().currentSlide;

  // add the current slide to the preview on the right index
  useSlidesStore.setState({
    slide: [
      ...slides.slice(0, currentSLide),
      dataJSON,
      ...slides.slice(currentSLide),
    ],
  });

  // add the preview to the right index
  useSlidesStore.setState({
    preview: [
      ...slides.slice(0, currentSLide),
      preview,
      ...slides.slice(currentSLide),
    ],
  });
};

export const slideChange = () => {
  const canvas = getCanvas();
  const data = canvas?.toDatalessJSON();
  const currentSlide = useSlidesStore.getState().currentSlide;

  console.info(
    `Slide changed! We are saving the new slide to the store. You are currently on slide ${currentSlide}`
  );

  updateSlide({
    content: data,
    from: currentSlide,
  });
  updatePreview({
    content: data,
    from: currentSlide,
  });
};
