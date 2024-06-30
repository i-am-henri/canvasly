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
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable"
import { DndContext, useDroppable, type UniqueIdentifier } from "@dnd-kit/core"
import { Skeleton } from "../ui/skeleton"

// the slides preview
export default function SlidePreview({
    editor
}: {
    editor: FabricJSEditor | undefined
}) {

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
    // <div div className = "grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2" >
    //                 <Skeleton className="h-8 w-full rounded-sm" />
    //                 <Skeleton className="h-8 w-full rounded-sm" />
    //                 <Skeleton className="size-8 shrink-0 rounded-sm" />
    //                 <Skeleton className="size-8 shrink-0 rounded-sm" />
    //             </div >


    // <img
    //                             onClick={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}
    //                             id={`data-${index}`}
    //                             onKeyUp={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })}
    //                             className='rounded-sm px-2 border my-2 bg-white'
    //                             src={`data:image/svg+xml;utf8,${encodeURIComponent(p)}`}
    //                             alt="Preview of the slide." />

    function Droppable({
        id,
        children
    }: {
        id: string | number,
        children: React.ReactNode
    }) {
        const { setNodeRef } = useDroppable({
            id: id,
        });

        return (
            <div ref={setNodeRef}>
                {children}
            </div>
        );
    }
    return (
        <div className="bg-white border h-screen col-span-1 rounded-md p-2">
            <Tooltip>
                <TooltipTrigger>
                    <Button onClick={() => {
                        createSlide(editor, {
                            content,
                            setContent
                        }, {
                            preview,
                            setPreview
                        })
                    }}>
                        new slide
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Create new slide.
                </TooltipContent>
            </Tooltip>
            <ScrollArea className="flex flex-col">
                <DndContext
                    autoScroll
                    onDragEnd={(e) => {
                        console.log("drag was ended", e)
                    }}
                >
                    {preview?.map((p, index) => (
                        <Droppable key={index.toString()} id={index}>
                            Droppable container id: ${index}
                        </Droppable>
                    ))}
                </DndContext>
            </ScrollArea>
        </div>
    )
}