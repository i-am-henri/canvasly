"use client"

import type { FabricJSEditor } from "fabricjs-react"
import { changeSlide, createSlide } from "../editor/logic/events"
import { ScrollArea } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useContent } from "../editor/logic/content-store"
import { useSlideStore } from "../editor/logic/slide-store"
import { usePreviewStore } from "../editor/logic/preview-store"
import { useRef, useState } from "react"
import { swap } from "~/lib/swap"
// the slides preview
export default function SlidePreview({
    editor
}: {
    editor: FabricJSEditor | undefined
}) {
    // the slide which has been dragged
    const dragSlide = useRef<number>(0)
    // the slide, where the old slide has been dragged
    const draggedOverSlide = useRef<number>(0)

    const { setContent, content } = useContent()
    // the active slide
    const { slide, setSlide } = useSlideStore()
    // the preview array, with svg strings as content
    const { preview, setPreview } = usePreviewStore()


    function handleSort() {
    }

    return (
        <div className="bg-white border h-screen col-span-1 rounded-md p-2">
            <Tooltip>
                <TooltipTrigger onClick={() => {
                    createSlide(editor, {
                        content,
                        setContent
                    }, {
                        preview,
                        setPreview
                    })
                }}>
                    new slide
                </TooltipTrigger>
                <TooltipContent>
                    Create new slide.
                </TooltipContent>
            </Tooltip>
            <ScrollArea className="flex flex-col">
                {preview.map((p, index) => (
                    <img

                        // the setings for dragging
                        draggable
                        onDragStart={() => { dragSlide.current = index }}
                        onDragEnter={() => { draggedOverSlide.current = index }}
                        onDragEnd={(e) => {
                            setPreview(swap(preview, dragSlide.current, draggedOverSlide.current))
                            setContent(swap(content, dragSlide.current, draggedOverSlide.current))
                            setSlide(draggedOverSlide.current)
                        }}
                        onDragOver={(e) => e.preventDefault()}

                        // generous settings
                        key={index.toString()}

                        onClick={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}
                        onKeyUp={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}

                        id={`data-${index}`}
                        className='rounded-sm px-2 border my-2 bg-white cursor-grab'
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(p)}`}
                        alt="Preview of the slide." />

                ))}
            </ScrollArea>
        </div>
    )
}