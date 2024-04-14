"use client"
import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas: fabric.Canvas;

    if (canvasRef.current) {
      canvas = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 500
      });

      // Beispiel: Einen Text zur Canvas hinzufügen
      const text = new fabric.Text('Hallo Henri', {
        left: 100,
        top: 100,
        fontSize: 30,
        fill: 'blue',
        fontFamily: "Calibri"
      });
      canvas.on("object:moving", (e) => {
        if (!e.target) {
          return
        }
        e.target.opacity = 0.75;
      })
      canvas.on("object:modified", (e) => {
        if (!e.target) {
          return
        }
        e.target.opacity = 1
      })

      canvas.add(text);
    }

    // Cleanup-Funktion
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  return (
    <ContextMenu>
      <ContextMenuTrigger><canvas ref={canvasRef} className='border' /></ContextMenuTrigger>
      <ContextMenuContent>

        <h2 className='font-bold px-2 py-1.5'>Presentation</h2>
        <hr />
        <ContextMenuItem className='mt-1'>clear all</ContextMenuItem>
        <ContextMenuItem></ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
};

export default FabricCanvas;