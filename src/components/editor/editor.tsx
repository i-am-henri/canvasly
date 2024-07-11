"use client"

import { useEffect } from 'react'
import { FabricJSCanvas, type FabricJSEditor, useFabricJSEditor } from 'fabricjs-react'
import { useStore } from "./logic/element-store"
import { useKeyPress } from "~/hooks/useKey"
import TopBar from '../elements/topbar'
import type { Prisma } from '@prisma/client'
import { useContent } from './logic/content-store'
import EditSidebar from '../elements/edit-sidebar'
import SlidePreview from '../elements/slides'
import { usePreviewStore } from './logic/preview-store'

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
    const { element, setElement } = useStore()

    // the preview array, with svg strings as content
    const { preview, setPreview } = usePreviewStore()


    // creating the first slide, when no slides existing
    if (content.length === 0) {
        setContent([
            {
                version: "5.3.0",
                objects: []
            }
        ])
        setPreview([`<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="684" height="528" viewBox="0 0 684 528" xml:space="preserve">
        <desc>Created with Fabric.js 5.3.0</desc>
        <defs>
        </defs>
        </svg>`])
        
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
    }

    

    return (
        <div className="flex flex-col" >
            {/* The topbar ("Menubar") */}
            <TopBar editor={editor} teamId={teamId} />
            <div className='w-[calc(100vw-240px)] mx-5  grid items-start justify-between grid-cols-8 gap-5' >
                {/* The slides Preview */}
                <SlidePreview editor={editor} />
                {/* The canvas component */}
                <FabricJSCanvas onReady={onReady} className='col-span-5 w-full border h-[calc((100vh-50px)/16*9)]' />

                {/* The setting menu on the right */}
                <EditSidebar editor={editor} />
            </div>
        </div>
    )
}
