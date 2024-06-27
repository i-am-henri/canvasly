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
import { saveToDBAction } from './action'
import {changeSlide, createSlide, saveToDB} from "./logic/events"
import EditSidebar from '../elements/edit-sidebar'
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
        editor?.canvas.on("object:added", (e) => {
            saveToDB(editor,
                saveToDBAction,
                {
                    content,
                    setContent
                }
            )
        
        })


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

    

    return (
        <div className="flex flex-col">
            {/* The topbar ("Menubar") */}
            <TopBar editor={editor} teamId={teamId} />
            <div className='w-[calc(100vw-240px)] mx-5 h-screen grid items-start justify-between grid-cols-8 gap-5'>
                {/* The slides Preview */}
                <div className="bg-white border h-screen col-span-1 rounded-md p-2">
                    <Button onClick={() => {
                        createSlide(editor, {
                            content,
                            setContent
                        })
                    }}>
                        new slide
                    </Button>
                    <div className="flex flex-col space-y-3 mt-3">
                        {content?.map((s, index) => (
                            <div className={cn("px-2 border")} onClick={(e) => changeSlide(editor, {content, setContent}, {slide, setSlide}, +e.currentTarget.id.slice(5))} id={`data-${index}`} onKeyUp={(e) => changeSlide(editor, {content, setContent}, {slide, setSlide}, +e.currentTarget.id.slice(5))} key={index.toString()}>
                                slide
                            </div>
                        ))}
                    </div>
                </div>
                {/* The canvas component */}
                <FabricJSCanvas onReady={onReady} className='col-span-6 w-full border h-[calc((100vh-50px)/16*9)]' />

                {/* The setting menu on the right */}
                <EditSidebar editor={editor}/>
            </div>
        </div>
    )
}
