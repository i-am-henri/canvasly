// add elements to the canvas with the helpers

import { type Canvas, Circle, IText, Rect, Triangle } from 'fabric';
import { create } from 'zustand';

type State = {
  canvas: Canvas | null;
};

type Action = {
  setCanvas: (canvas: State['canvas']) => void;
};

// store the canvas
export const useCanvasStore = create<State & Action>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set(() => ({ canvas: canvas })),
}));

// get the canvas from the store
export const getCanvas = () => {
  const canvas = useCanvasStore.getState().canvas;
  if (!canvas) {
    return null;
  }
  return canvas;
};

// add a basic rectangle
export const addRectangle = () => {
  const rect = new Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'black',
  });

  const canvas = getCanvas();
  canvas?.add(rect);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

// add a basic triangle
export const addTriangle = () => {
  const triangle = new Triangle({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'black',
  });

  const canvas = getCanvas();
  canvas?.add(triangle);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

// add a basic circle
// TODO: fix the circle
export const addCircle = () => {
  const circle = new Circle({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: '',
    stroke: 'green',
    strokeWidth: 2,
  });

  const canvas = getCanvas();
  canvas?.add(circle);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

// texts

export const addText = () => {
  const text = new IText('Hello World', {
    left: 100,
    top: 100,
    fontFamily: 'Arial',
    fill: 'black',
  });

  const canvas = getCanvas();
  canvas?.add(text);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

export const addHeading = () => {
  const text = new IText('Hello World', {
    left: 100,
    top: 100,
    fill: 'black',
    fontFamily: 'Arial',
    fontSize: 50,
    fontWeight: 'bold',
  });

  const canvas = getCanvas();
  canvas?.add(text);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

// TODO: fix the bullet list
export const addBulletList = () => {
  const text = new IText('- ', {
    left: 100,
    top: 100,
    fill: 'black',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  });

  const canvas = getCanvas();
  canvas?.add(text);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};

// TODO: fix the list
export const addList = () => {
  const text = new IText('- ', {
    left: 100,
    top: 100,
    fill: 'black',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  });

  const canvas = getCanvas();
  canvas?.add(text);
  canvas?.renderAll();

  useCanvasStore.setState({
    canvas,
  });
};
