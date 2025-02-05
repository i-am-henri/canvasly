'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/dashboard/menubar';
import useCalculatedWidth from '@/hooks/use-calculated-width';
import { Canvas } from 'fabric';
import {
  Circle,
  LayoutList,
  List,
  RectangleEllipsis,
  Star,
  Triangle,
  Type,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useCurrentSlideStore } from './current-slide';
import {
  addCircle,
  addRectangle,
  addText,
  addTriangle,
  useCanvasStore,
} from './elements';
import Image from './image';
import { handleSave } from './save';
import { handleSelection, useSelectionStore } from './select';
import { MultipleSelection, NoSelection, SingleSelection } from './selection';
import SlidesView from './slidesView';

export default function PresentationEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas } = useCanvasStore();
  const { objects, singleObject, selection } = useSelectionStore();
  const { currentSlide } = useCurrentSlideStore();

  const width = useCalculatedWidth();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const fabricCanvas = new Canvas(canvasRef.current, {
      height: 540,
      width: width,
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [setCanvas, width]);

  // clear the canvas if the canvas ref changes
  useEffect(() => {
    if (!canvas) {
      return;
    }

    handleSelection();

    canvas.on('object:added', () => handleSave());
    canvas.on('object:modified', () => handleSave());
    canvas.on('object:moving', () => handleSave());
    canvas.on('object:removed', () => handleSave());
    canvas.on('object:resizing', () => handleSave());
    canvas.on('object:scaling', () => handleSave());
    canvas.on('object:rotating', () => handleSave());

    canvas.renderAll();
  }, [canvas]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full block lg:hidden">
        <SlidesView />
      </div>
      <div className="flex gap-4 flex-row">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Elements</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={addRectangle} className="flex gap-2">
                <RectangleEllipsis className="h-4 w-4" /> <span>Rectangle</span>
              </MenubarItem>
              <MenubarItem onClick={addCircle} className="flex gap-2">
                <Circle className="h-4 w-4" /> <span>Circle</span>
              </MenubarItem>
              <MenubarItem onClick={addTriangle} className="flex gap-2">
                <Triangle className="h-4 w-4" /> <span>Triangle</span>
              </MenubarItem>
              <MenubarItem className="flex gap-2">
                <Star className="h-4 w-4" /> <span>Star</span>
              </MenubarItem>
              <Image />
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Text & Headings</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={addText} className="flex gap-2">
                <Type className="h-4 w-4" /> <span>Text</span>
              </MenubarItem>
              <MenubarItem className="flex gap-2">
                <Circle className="h-4 w-4" /> <span>Heading</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="flex gap-2">
                <LayoutList className="h-4 w-4" /> <span>Bullet List</span>
              </MenubarItem>
              <MenubarItem className="flex gap-2">
                <List className="h-4 w-4" /> <span>List</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <p>You are on the {currentSlide} slide.</p>
      <canvas ref={canvasRef} className="border border-border rounded-md" />
      {(selection === 'single' && singleObject && <SingleSelection />) ||
        (selection === 'multiple' && objects && <MultipleSelection />) ||
        (selection === 'none' && !objects && !singleObject && <NoSelection />)}
    </div>
  );
}
