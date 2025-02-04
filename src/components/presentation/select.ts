// utils for handling selections inside the canvas

import type { FabricObject } from 'fabric';
import { create } from 'zustand';
import { getCanvas } from './elements';

// handling selections following:
// on a single selection: display settings for the selected object
// on multiple selections: display settings for all selected objects (e.g. group-deletion)
// on no selection: display settings for the canvas

type State = {
  selection: 'none' | 'single' | 'multiple';
  objects: FabricObject[] | null | FabricObject;
};

type Action = {
  setSelection: (select: State['selection']) => void;
  setObjects: (objects: State['objects']) => void;
};

// store the canvas
export const useCanvasStore = create<State & Action>((set) => ({
  selection: 'none',
  objects: null,
  setObjects: (objects) => set(() => ({ objects: objects })),
  setSelection: (select) => set(() => ({ selection: select })),
}));

// handle the selections
export const handleSelection = () => {
  const canvas = getCanvas();
  if (!canvas) {
    return;
  }

  const selectedObjects = canvas.getActiveObjects();
  canvas.on('selection:created', (e) => {
    if (e.selected.length === 1) {
      handleSingleSelection(e.selected[0]);
    } else {
      handleMultipleSelection(e.selected);
    }
  });

  canvas.on('selection:updated', (e) => {
    if (e.selected.length === 1) {
      handleSingleSelection(e.selected[0]);
    } else {
      handleMultipleSelection(e.selected);
    }
  });

  canvas.on('selection:cleared', () => {
    handleClearSelection();
  });
};

// just handle a single selection
const handleSingleSelection = (e: FabricObject) => {
  const canvas = getCanvas();
  if (!canvas) {
    return;
  }

  const setSelection = useCanvasStore.getState().setSelection;
  const setObjects = useCanvasStore.getState().setObjects;

  setSelection('multiple');
  setObjects(e);
  console.log('Handle the selection of a single object.');
};

// handle mutliple selections
const handleMultipleSelection = (e: FabricObject[]) => {
  const canvas = getCanvas();
  if (!canvas) {
    return;
  }

  const setSelection = useCanvasStore.getState().setSelection;
  const setObjects = useCanvasStore.getState().setObjects;

  setSelection('multiple');
  setObjects(e);
  console.log(`Multiple selections: ${e.length}`);
};

// clear the selections
const handleClearSelection = () => {
  const canvas = getCanvas();
  if (!canvas) {
    return;
  }
  const setSelection = useCanvasStore.getState().setSelection;
  const setObjects = useCanvasStore.getState().setObjects;

  setObjects(null);
  setSelection('none');
};
