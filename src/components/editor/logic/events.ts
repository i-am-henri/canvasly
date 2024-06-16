import { fabric } from "fabric"
import { FabricJSEditor } from "fabricjs-react"
type fabricjs = typeof fabric


/**Add a rectangle with your properties.
 * @param editor - the react editor to add it to the canvas
 * @param options - options for the rectangle
 */
export const addRectangle = (editor: FabricJSEditor | undefined, options?: fabric.IRectOptions): void => {
    const rec = new fabric.Rect(options)
    editor?.canvas.add(rec)
    editor?.canvas.setActiveObject(rec)
}

export const getElement = (editor: FabricJSEditor | undefined) => {
    console.log(editor?.canvas.item(0))
}