"use client"
import React, { useEffect, useState } from 'react'
import { fabric } from "fabric"
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import * as Menubar from '@radix-ui/react-menubar';
export default function Editor() {
    const [activeSlide, setActiveSlide] = useState()

    const { editor, onReady, selectedObjects } = useFabricJSEditor()


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
    }
    const onAddRectangle = () => {
        editor?.addRectangle()
    }

    return (
        <div className='w-full flex flex-col'>
            {/* The top bar */}
            <div className="w-full flex justify-between">
                <Link href="/dashboard">
                    <ChevronLeft />
                </Link>
                {/* Div for adding new elements */}
                <div className="flex space-x-3 mx-2">

                    <Button variant='secondary' onClick={onAddCircle}>Add circle</Button>
                    <Button variant='secondary' onClick={onAddRectangle}>Add Rectangle</Button>
                    <Button variant='secondary' onClick={() => addText({ color: "#1f9f" })}>Add Text</Button>
                    <Button variant='secondary' onClick={addImage}>Add Image</Button>
                </div>
                <div className='flex'>
                    <Button variant='primary'> 
                        share
                    </Button>
                </div>
            </div>
            <div className="flex">
                {/* The small slide view */}
                <ScrollArea className="flex flex-col">
                    <div className="border">
                        first slide
                    </div>
                    <div className="border">
                        first slide
                    </div>
                </ScrollArea>
                {/* The editor canvas */}
                <FabricJSCanvas className="border" onReady={onReady} />
                {/* When clicking on a element, you can configure it with this element */}
                <div className='min-h-screen flex flex-col items-start border '>
                    The height: 1000px
                </div>
            </div>
        </div>
    )
}
