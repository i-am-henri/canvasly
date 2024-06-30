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

// the slides preview
export default function SlidePreview({
    editor
}: {
    editor: FabricJSEditor | undefined
}) {

    const { setContent, content } = useContent()
    // the active slide
    const { slide, setSlide } = useSlideStore()
    // the current targeted element from the store
    const { element, setElement } = useStore()
    // the preview array, with svg strings as content
    const { preview, setPreview } = usePreviewStore()
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
                {preview?.map((p, index) => (
                    <img onClick={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })} id={`data-${index}`} onKeyUp={(e) => changeSlide(editor, { content, setContent }, { slide, setSlide }, +e.currentTarget.id.slice(5), { preview, setPreview })} key={index.toString()} className='rounded-sm px-2 border my-2' src={`data:image/svg+xml;utf8,${encodeURIComponent(p)}`} alt="Preview of the slide." />
                ))}
            </ScrollArea>
        </div>
    )
}