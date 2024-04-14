"use client"
import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function Editor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let canvas: fabric.Canvas;

  if (canvasRef.current) {
    canvas = new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 800
    });

    // Beispiel: Einen Text zur Canvas hinzufügen
    const text = new fabric.Text('Hello Fabric', {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: 'red'
    });
    canvas.add(text);
  }
  })
  return (
    <canvas ref={canvasRef} />
  )
}