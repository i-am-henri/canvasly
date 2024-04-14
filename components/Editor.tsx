"use client"
import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas: fabric.Canvas;

    if (canvasRef.current) {
      canvas = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 1000
      });

      // Beispiel: Einen Text zur Canvas hinzufügen
      const text = new fabric.Text('Hallo Henri', {
        left: 100,
        top: 100,
        fontSize: 30,
        fill: 'blue'
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

  return <canvas className='w-full' ref={canvasRef} />;
};

export default FabricCanvas;