import { fabric } from "fabric"
import type { FabricJSEditor } from "fabricjs-react"
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

/**Add a text. This is for headlines. This text is editable!
 * @param {string} standart - the default text
 * @param editor - the react editor
 * @param options - options to customize text
 */
export const addText = (standart: string, editor: FabricJSEditor | undefined, options?: fabric.ITextOptions) => {
    const text = new fabric.IText(standart, options)
    // add the object to the canvas
    editor?.canvas.add(text)
    // Focus the object in the canvas
    editor?.canvas.setActiveObject(text)
}

/**Add an image to the canvas.
 * @param {string} url - the image url
 * @param editor - the react editor
 * @param options - options for the image editor
 */
export const addImage = (url: string, editor: FabricJSEditor | undefined, options?: fabric.IImageOptions) => {
    const img = fabric.Image.fromURL(url, (myImg) => {
        //i create an extra var for to change some image properties
        const img1 = myImg.set({ left: 0, top: 0 , width:1920,height:1080});
        editor?.canvas.add(img1); 
       })

}