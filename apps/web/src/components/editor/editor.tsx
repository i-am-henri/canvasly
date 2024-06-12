import * as React from 'react';
import { useState } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import tshrit from './assets/tshirt.json';
//to get points from svg;
//https://shinao.github.io/PathToPoints/
//https://github.com/Shinao/PathToPoints
export default function App() {
  const { tpoly } = tshrit;
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  var group = new fabric.Group();
  editor?.canvas.add(group);
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const img = document.createElement('img');
  img.src = deleteIcon;
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'blue';
  fabric.Object.prototype.cornerStyle = 'circle';

  const onAddCircle = () => {
    //console.log(editor);
    editor?.addCircle();
  };
  let color = 55;
  const onAddLine = () => {
    //console.log(editor);
    editor?.addLine();
  };
  const onAddRectangle = () => {
    color += 100;
    const rect = new fabric.Rect({
      top: 100,
      left: 20,
      width: 50,
      height: 50,
      borderColor: 'black',
      fill: "#282828",
    });
    console.log(rect);
    editor?.canvas.add(rect);
  };
  const renderIcon = (ctx: any, left: any, top: any, styleOverride: any, fabricObject: any) => {
    var size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
  const onDelete = () => {
    editor?.deleteSelected();
    console.log(selectedObjects);
  };
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    render: renderIcon,
  });

  const onAddImage = () => {
    console.log('tpoly:', tpoly);
    var tspoly = new fabric.Polygon(tpoly, {
      left: 37,
      top: 140,
      angle: 0,
      fill: 'white',
      objectCaching: false,
    });
    editor?.canvas.add(tspoly);
  };
  const handleGroupDrop = (e: any) => {
    editor?.canvas.forEachObject((i) => {
      editor?.canvas.remove(i);
      editor?.canvas.renderAll();
    });
    editor?.canvas.add(group);
    editor?.canvas.renderAll();
    editor?.canvas.renderAll();
    console.log('handleGroupDrop:group:', group);
    console.log('handleGroupDrop:canvas:', editor?.canvas);
  };
  return (
    <div>
      <div>
        <button onClick={onAddCircle}>Add Circle</button>
        <button onClick={onAddLine}>Add Line</button>
        <button onClick={onAddRectangle}>Add Rectangle</button>
        <button onClick={onAddImage}>Add Image</button>
        <button onClick={onDelete}>Delete</button>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        <canvas id="canvas" width="300" height="300"></canvas>
      </div>
    </div>
  )
}
