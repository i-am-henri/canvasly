import { fabric } from "fabric"
import type { FabricJSEditor } from "fabricjs-react"
import { useContent } from "./content-store"


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
        //create an extra var for to change some image properties
        const img1 = myImg.set({ left: 0, top: 0, width: 1920, height: 1080 });
        editor?.canvas.add(img1);
    })
}

/** Function to update an existing slide.
 * @param editor - the react editor
 * @param content - the content store
 * @param indexToUpdate - the slide which should be updated
 * @param newContent - the new content
 */
export const changeSlide = (
    editor: FabricJSEditor | undefined,
    // the content store 
    content: {
        setContent: (state: {
            version: string;
            objects: fabric.Object[];
        }[]) => void,
        content: {
            version: string;
            objects: fabric.Object[]
        }[]
    },
    // the slide store
    slide: {
        setSlide: (state: number) => void,
        slide: number
    },
    // the new slide
    newIndex: number,

    preview: {
        setPreview: (state: string[]) => void,
        preview: string[]
    }
) => {
    if (!editor || !editor.canvas) {
        console.error("Editor or canvas is not defined");
        return;
    }

    // updating the content array
    const updatedContent = content.content.map((prensentation, index) =>
        index === slide.slide ? editor.canvas.toJSON() : prensentation
    );
    content.setContent(updatedContent);

    // updating the preview
    const updatedPreview = preview.preview.map((pr, index) =>
        index === slide.slide ? editor.canvas.toSVG() : pr 
    );
    console.log(updatedPreview)
    preview.setPreview(updatedPreview)

    slide.setSlide(newIndex)
    

    editor?.canvas.clear()
    editor?.canvas.loadFromJSON(content.content[newIndex], editor.canvas.renderAll.bind(editor.canvas))
}

/** Function to create a new slide. First creating the new slide in the array, then changing the default slide with the changeSlide() method.
 * @param editor - the react editor
 */
export const createSlide = (
    editor: FabricJSEditor | undefined,
    content: {
        setContent: (state: {
            version: string;
            objects: fabric.Object[];
        }[]) => void,
        content: {
            version: string;
            objects: fabric.Object[]
        }[]
    },
    preview: {
        setPreview: (state: string[]) => void,
        preview: string[]
    }
) => {

    // updating the content array

    const newSlide = {
        version: "5.3.0",
        objects: []
    };

    const updatedContent = [...content.content, newSlide];

    content.setContent(updatedContent);

    // updating the preview array

    const updatedPreview = [...preview.preview, defaultSVG];
    console.log("updated preview: ", updatedPreview)

    preview.setPreview(updatedPreview)
}

/**
 * @param editor - The react editor
 * @param severFunction - the server action
 */
export const saveToDB = (editor: FabricJSEditor | undefined, serverFunction: (content: { version: string; objects: fabric.Object[]; }[]) => void, content: {
    setContent: (state: {
        version: string;
        objects: fabric.Object[];
    }[]) => void,
    content: {
        version: string;
        objects: fabric.Object[]
    }[]
}) => {
    const timeout = setTimeout(async () => {
        serverFunction(content.content)
    })
    return () => {
        clearTimeout(timeout);
    }
}

/**
 * The default svg for the preview.
 */
export const defaultSVG: string = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1009" height="528" viewBox="0 0 1009 528" xml:space="preserve">
<desc>Created with Fabric.js 5.3.0</desc>
<defs>
</defs>
</svg>`