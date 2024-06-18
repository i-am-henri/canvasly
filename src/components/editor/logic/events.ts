import { fabric } from "fabric"
import { FabricJSEditor } from "fabricjs-react"
type fabricjs = typeof fabric


/** Add a rectangle with your properties.
 * @param {FabricJSEditor} editor - the react editor to add it to the canvas
 * @param {fabric.IRectOptions} options - options for the rectangle
 */
export const addRectangle = (editor: FabricJSEditor | undefined, options?: fabric.IRectOptions): void => {
    const rec = new fabric.Rect(options)
    // add the object to the canvas
    editor?.canvas.add(rec)
    // Focus the object in the canvas
    editor?.canvas.setActiveObject(rec)
}

/** Add a circle to your canvas with custom properties.
 * @param editor - the react editor to add it to the canvas
 * @param options - options to customize the circle
 */
export const addCircle = (editor: FabricJSEditor | undefined, options?: fabric.ICircleOptions) => {
    const circle = new fabric.Circle(options)
    // add the object to the canvas
    editor?.canvas.add(circle)
    // Focus the object in the canvas
    editor?.canvas.setActiveObject(circle)
}

/**Add a textarea.
 * @param {string} standart - the default value
 * @param editor - The react editor
 * @param options - Options for the textarea
 */
export const addTextarea = (standart: string, editor: FabricJSEditor | undefined, options?: fabric.ITextboxOptions) => {
    const box = new fabric.Textbox(standart, options)
    // add the object to the canvas
    editor?.canvas.add(box)
    // Focus the object in the canvas
    editor?.canvas.setActiveObject(box)
}
