"use client"
import React, { useEffect, useState } from 'react'
import { fabric } from "fabric"
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

// The events
import { addCircle, addImage, addRectangle, addText, addTextarea } from "./logic/events"

import { useStore } from "./logic/element-store"
import { cn } from '~/lib/utils'
import Badge from '../ui/badge'
import {useKeyPress} from "~/hooks/useKey"
export default function Editor() {
    // The active slide
    const [activeSlide, setActiveSlide] = useState()

    // the fabricjs react editor
    const { editor, onReady } = useFabricJSEditor()

    // the current targeted element from the store
    const { element, setElement } = useStore()

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

    // checks if you press backspace and an element is selected
    useKeyPress({
        keyPressItems: [
            {
                keys: [
                    "Backspace",
                ],
                event: () => {
                    if (element) {
                        editor?.canvas.remove(element)
                    }
                }
            }
        ]
    })

    // setting settings for the canvas
    if (editor) {
        editor.canvas.selection = false
    }

    return (
        <div className="flex flex-col">
            {/* The topbar */}
            <div className='w-[calc(100vw-200px)] h-[50px]'>
                <Button variant={"secondary"} onClick={() => addRectangle(editor, {
                    backgroundColor: "#282828",
                    scaleX: 100,
                    scaleY: 100
                })}>add rectangle</Button>
                
                <Button variant={"secondary"} onClick={() => addCircle(editor, {
                    backgroundColor: "#282828",
                })}>add circle</Button>
                <Button variant={"secondary"} onClick={() => addTextarea("new text", editor, {
                    backgroundColor: "#1f1",
                    editable: true,
                })}>add text</Button>
                
                <Button variant={"secondary"} onClick={() => addImage("https://cdn.pixabay.com/photo/2024/05/26/00/40/lizard-8787888_1280.jpg", editor, {
                    backgroundColor: "#1f1",
                })}>add image</Button>
            </div>
            <div className='w-[calc(100vw-240px)] mx-5 h-screen grid items-start justify-between grid-cols-8 gap-5'>
                {/* The slides Preview */}
                <div className="bg-white border h-screen col-span-1 rounded-md p-2">
                </div>
                {/* The canvas component */}
                <FabricJSCanvas onReady={onReady} className='col-span-6 w-full border h-[calc((100vh-50px)/16*9)]' />

                {/* The setting menu on the right */}
                <div className="bg-white border h-screen col-span-1 rounded-md">
                    <h2 className="text-2xl px-2 pt-2">
                        Settings
                    </h2>
                    <hr />
                    <div className="px-2">
                        {element && (
                            <p>
                                <p className='text-neutral-500'>Background-Color</p>
                                <p style={{backgroundColor: element.backgroundColor}}>{element.backgroundColor}</p>
                            </p>
                        )}
                        {!element && (
                            <div className='flex flex-col'>
                                {/* Speaker notes and settings for the slide */}
                                <p className='text-neutral-500'>Speaker Notes</p>
                                <p>no notes :/</p>
                                <hr />
                                <p className="neutral-500 text-sm">
                                    status
                                </p>
                                <Badge variant={"secondary"}>
                                    not ready
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
