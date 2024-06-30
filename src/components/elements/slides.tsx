"use client"

import type { FabricJSEditor } from "fabricjs-react"
import { changeSlide, createSlide } from "../editor/logic/events"
import Button from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useContent } from "../editor/logic/content-store"
import { useSlideStore } from "../editor/logic/slide-store"
import { useStore } from "../editor/logic/element-store"
import { usePreviewStore } from "../editor/logic/preview-store"
import { DndContext, useDraggable, useDroppable, type UniqueIdentifier } from "@dnd-kit/core"
import { ReactSortable } from "react-sortablejs";
import { useRef, useState } from "react"
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

    const idArr: { id: UniqueIdentifier, name: string }[] = []

    preview.forEach((p, index) => {
        idArr.push({
            id: index,
            name: `item-${index}`
        })
    })

    function swap<T>(arr: T[], index1: number, index2: number): T[] {
        const array = arr
        if (index1 >= 0 && index1 < array.length && index2 >= 0 && index2 < array.length) {
            // biome-ignore lint: because the index is defined
            const temp = array[index1]!;
            // biome-ignore lint: because the index is defined
            array[index1] = array[index2]!;
            array[index2] = temp;
        } else {
            console.error('Einer der angegebenen Indizes ist außerhalb des gültigen Bereichs.');
        }
        return array
    }

    function handleSort() {
        setPreview(swap(preview, dragSlide.current, draggedOverSlide.current))
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
                    <div key={index.toString()} className="relative flex space-x-3 border rounded p-2 bg-gray-100"
                        draggable
                        onDragStart={() => {dragSlide.current = index}}
                        onDragEnter={() => {draggedOverSlide.current = index}}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <img
                            key={index.toString()}
                            onClick={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}
                            id={`data-${index}`}
                            onKeyUp={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}
                            className='rounded-sm px-2 border my-2 bg-white'
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(p)}`}
                            alt="Preview of the slide." />
                    </div>

                ))}
            </ScrollArea>
        </div>
    )
}