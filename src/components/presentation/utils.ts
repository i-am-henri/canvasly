import { getCanvas } from './elements';
import { updatePreview, updateSlide, useSlidesStore } from './slides';

// save the slide content and the preview image
export const slideChange = () => {
  const canvas = getCanvas();
  const data = canvas?.toDatalessJSON();
  const svgData = canvas?.toSVG() as string;
  const currentSlide = useSlidesStore.getState().currentSlide;

  console.info(
    `Slide changed! We are saving the new slide to the store. You are currently on slide ${currentSlide}`
  );

  updateSlide({
    content: JSON.stringify(data),
    from: currentSlide,
  });
  updatePreview({
    content: svgData,
    from: currentSlide,
  });
};

// export the intial types for fabricjs
export const initialSvg = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"960\" height=\"540\" viewBox=\"0 0 960 540\" xml:space=\"preserve\">\n<desc>Created with Fabric.js 6.5.4</desc>\n<defs>\n</defs>\n</svg>`;
export const initialData = `{"version":"6.5.4","objects":[]}`;
