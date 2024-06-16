"use client"
import React, { useEffect } from 'react'
import {fabric} from "fabric"
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

export default function Editor() {
    const { editor, onReady, selectedObjects } = useFabricJSEditor()


    /**Method to add a text to the canvas. You can specify the text with the props. */
    const addText = ({color}: {color: string}) => {
        const text = new fabric.Text("hey", {
            fontFamily: "Calibri",
            borderColor: "#272727",
            hasBorders: true,
            backgroundColor: color
        })
        editor?.canvas.add(text)
    }
    const onAddCircle = () => {
        editor?.addCircle()
    }
    const onAddRectangle = () => {
        editor?.addRectangle()
    }

    return (
        <div>
            <button onClick={onAddCircle}>Add circle</button>
            <button onClick={onAddRectangle}>Add Rectangle</button>
            <button onClick={() => addText({color: "#1f9f"})}>Add Text</button>
            <FabricJSCanvas className="border" onReady={onReady} />
        </div>
    )
}
