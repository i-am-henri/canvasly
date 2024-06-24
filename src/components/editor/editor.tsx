"use client"

import { type KeyboardEventHandler, type MouseEventHandler, useEffect, useState } from 'react'
import type { fabric } from "fabric"
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
import { useSlideStore } from './logic/slide-store'

export default function Editor({
    teamId,
    slides
}: {
    teamId: string,
    // The presentation as Json
    // Each slide represent one entry in this array
    slides: Prisma.JsonValue[]

}) {
    // the content as a json array
    const { setContent, content } = useContent()
    // the active slide
    const { slide, setSlide } = useSlideStore()
    // the current targeted element from the store
    const { element, setElement } = useStore()
    // creating the first slide, when no slides existing
    if (content.length === 0) {
        setContent([
            {
                version: "5.3.0",
                objects: []
            }
        ])
    }

    // the fabricjs react editor
    const { editor, onReady } = useFabricJSEditor()



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
    // a slide was changed, so we now have a new slide on the top
    editor?.canvas.on("slide:changed", (e) => {
        console.log("event triggered")
        const json = editor.canvas.toJSON()
        const local = content
        local[slide] = json 
        setContent(local)
        editor?.canvas.clear()
    })

    // when pressing backspace, the current element will be deleted
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
        editor?.canvas.clear()
        // The selected element should be now undefined
        setElement(undefined)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = +e.currentTarget.id.slice(5)
        setSlide(id)
        editor?.canvas.fire("slide:changed")
        editor?.canvas.clear()
        editor?.canvas.clearContext(editor?.canvas.getContext())
        console.log(editor?.canvas.toJSON())
        setElement(undefined)
        editor?.canvas.loadFromJSON(content[id], editor?.canvas.renderAll.bind(editor?.canvas))
    }
    
    const handleKeyboardClick: KeyboardEventHandler<HTMLDivElement> = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const id = +e.currentTarget.id.slice(5)
        setSlide(id)
        editor?.canvas.clear()
        editor?.canvas.clearContext(editor?.canvas.getContext())
        
        setElement(undefined)
        editor?.canvas.loadFromJSON(content[id], editor?.canvas.renderAll.bind(editor?.canvas))
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
                    }}>
                        new slide
                    </Button>
                    <div className="flex flex-col space-y-3 mt-3">
                        {content?.map((s, index) => (
                            <div className={cn("px-2 border")} onClick={handleClick} id={`data-${index}`} onKeyUp={handleKeyboardClick} key={index.toString()}>
                                slide
                            </div>
                        ))}
                    </div>
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
