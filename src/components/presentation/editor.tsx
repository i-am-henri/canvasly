'use client';

import { Canvas } from 'fabric';
import { useEffect, useRef, useState } from 'react';

export default function PresentationEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

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
  }, []);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    return () => {
      canvas.off('mouse:down');
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.clear();

    canvas.renderAll();
  }, [canvas]);

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
