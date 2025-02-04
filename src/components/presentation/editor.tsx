'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/dashboard/menubar';
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
import {
  addCircle,
  addRectangle,
  addText,
  addTriangle,
  useCanvasStore,
} from './elements';

export default function PresentationEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas } = useCanvasStore();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 960,
      height: 540,
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [setCanvas]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // register the events for the preview and live editor

    return () => {
      canvas.off('mouse:down');
    };
  }, [canvas]);

  // clear the canvas if the canvas ref changes
  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.clear();

    canvas.renderAll();
  }, [canvas]);

  return (
    <div className="flex flex-col w-full">
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
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
