"use client"
import React, { useEffect, useState } from 'react'
import { fabric } from "fabric"
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { addRectangle } from "./logic/events"
import { useStore } from "./logic/element-store"
import { cn } from '~/lib/utils'

export default function Editor() {
    // The active slide
    const [activeSlide, setActiveSlide] = useState()

    // the fabricjs editor
    const { editor, onReady, selectedObjects } = useFabricJSEditor()
    const { element, setElement } = useStore()
    console.log(selectedObjects)
    // listen to the selection events and handling the store
    useEffect(() => {
        editor?.canvas.on("selection:created", (e) => {
            const activeElement = editor?.canvas.getActiveObject()
            setElement(activeElement)
        })
        editor?.canvas.on("selection:cleared", (e) => {
            setElement(null)
        })
        editor?.canvas.on("selection:updated", (e) => {
            const activeElement = editor?.canvas.getActiveObject()
            setElement(activeElement)
        })
    })

    /**Method to add a text to the canvas. You can specify the text with the props. */
    const addText = ({ color }: { color: string }) => {
        const text = new fabric.Text("hey", {
            fontFamily: "Calibri",
            borderColor: "#272727",
            hasBorders: true,
            backgroundColor: color
        })
        editor?.canvas.add(text)
    }
    const addImage = () => {
        const img = new fabric.Image("./my_image.jpg")
        editor?.canvas.add(img)
    }
    const onAddCircle = () => {
        editor?.addCircle()
        console.log(editor?.canvas.item(0))
    }
    if (editor) {
        editor.canvas.selection = false
    }
    return (
        <div className="flex flex-col">
            {/* The topbar */}
            <div className='w-[calc(100vw-200px)] h-[50px]'>
                hey
            </div>
            <div className='w-[calc(100vw-200px)] h-screen grid grid-cols-6'>
                <div className="col-span-1 bg-red-500">
                    <button onClick={() => addRectangle(editor, {
                        backgroundColor: "#282828",
                        scaleX: 100,
                        scaleY: 100
                    })}>add reactangle</button>
                </div>
                <FabricJSCanvas onReady={onReady} className='col-span-4 w-full h-[calc((100vh-50px)/16*9)]' />
                <div className="bg-green-500 col-span-1">
                    the settings
                </div>
            </div>
        </div>
    )
}
