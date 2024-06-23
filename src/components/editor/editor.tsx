"use client"

import React, { useEffect, useState } from 'react'
import { fabric } from "fabric"
import { FabricJSCanvas, type FabricJSEditor, useFabricJSEditor } from 'fabricjs-react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Button from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'


import { useStore } from "./logic/element-store"
import { cn } from '~/lib/utils'
import Badge from '../ui/badge'
import { useKeyPress } from "~/hooks/useKey"
import TopBar from '../elements/topbar'
import type { Prisma } from '@prisma/client'
import { useContent } from './logic/content-store'
import type { Object as FabricObject } from 'fabric/fabric-impl'

export default function Editor({
    teamId,
    slides
}: {
    teamId: string,
    // The presentation as Json
    // Each slide represent one entry in this array
    slides: Prisma.JsonValue[]

}) {

    const { setContent, content } = useContent()

    if (content.length === 0) {
        setContent([
            {
                version: "5.3.0",
                objects: []
            }
        ])
    }


    // The active slide (0 is the initial state, so the first slide)
    const [activeSlide, setActiveSlide] = useState(0)
    // clearing the canvas when switching from the slides

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
        // Don't allow selections on the canvas
        editor.canvas.selection = false
        // TODO: implement a function for not allowing to move elements outside of the canvas
    }









    /**Function to handle the creation of a new slide. */
    function handleNewSlide() {
        // create the new slide
        setContent([
            ...content,
            {
                version: "5.3.0",
                objects: []
            }
        ])
        setActiveSlide((e) => e + 1)
        editor?.canvas.clear()
        // The selected element should be now undefined
        setElement(undefined)
    }
    function replaceFirst(array: { version: string; objects: FabricObject[]; }[], change: { version: string; objects: FabricObject[]; }, index: number,): { version: string; objects: FabricObject[]; }[] {
        const copiedArray = array
        if (index !== -1) {
            copiedArray[index] = change
        }
        return copiedArray;
    }

    if (editor) {
        editor?.canvas.on("object:added", () => {
            console.log("added object")
            content[activeSlide] = editor.canvas.toJSON()
        })
    }
    useEffect(() => {
        const elements = document.querySelectorAll(".slide") as NodeListOf<HTMLDivElement>
        for (const element of elements) {
            element.addEventListener("click", (e) => {
                element.id.
            })
        }
    })

    function handleSlideClick(index: number) {
        setActiveSlide(index)

        editor?.canvas.clear()
        editor?.canvas.clearContext(editor?.canvas.getContext())
        // The selected element should be now undefined
        setElement(undefined)

        if (editor) {
            console.log(activeSlide)
            editor?.canvas.loadFromJSON(activeSlide === 0 ? {
                version: "5.3.0",
                objects: []
            } : {
                version: "5.3.0",
                objects: [
                    {
                        "type": "i-text",
                        "version": "5.3.0",
                        "originX": "left",
                        "originY": "top",
                        "left": 0,
                        "top": 0,
                        "width": 84.88,
                        "height": 27.12,
                        "fill": "#1ff",
                        "stroke": null,
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeDashOffset": 0,
                        "strokeLineJoin": "miter",
                        "strokeUniform": false,
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "skewX": 0,
                        "skewY": 0,
                        "fontFamily": "Calibri",
                        "fontWeight": "normal",
                        "fontSize": 24,
                        "text": "new text",
                        "underline": false,
                        "overline": false,
                        "linethrough": false,
                        "textAlign": "center",
                        "fontStyle": "normal",
                        "lineHeight": 1.16,
                        "textBackgroundColor": "",
                        "charSpacing": 0,
                        "styles": [],
                        "direction": "ltr",
                        "path": null,
                        "pathStartOffset": 0,
                        "pathSide": "left",
                        "pathAlign": "baseline"
                    }
                ]
            }, editor?.canvas.renderAll.bind(editor?.canvas))
        }
    }

    return (
        <div className="flex flex-col">
            {/* The topbar ("Menubar") */}
            <TopBar editor={editor} teamId={teamId} />
            <div className='w-[calc(100vw-240px)] mx-5 h-screen grid items-start justify-between grid-cols-8 gap-5'>
                {/* The slides Preview */}
                <div className="bg-white border h-screen col-span-1 rounded-md p-2">
                    <Button onClick={() => {
                        handleNewSlide()
                        console.log(content)
                    }}>
                        new slide
                    </Button>
                    {content?.map((s, index) => (
                        <div className="slide" onClick={(e) => {
                            handleSlideClick(index)
                        }} onKeyUp={() => handleSlideClick(index)} id={`data-${index}`} data-index={index} key={index.toString()}>
                            slide
                        </div>
                    ))}
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
                                <p style={{ backgroundColor: element.backgroundColor }}>{element.backgroundColor}</p>
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
