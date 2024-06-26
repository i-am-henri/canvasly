"use client"
import type { FabricJSEditor } from "fabricjs-react"
import { useStore } from "../editor/logic/element-store"
import Badge from "../ui/badge"
import { Input } from "../ui/input"

// The sidebar to edit an Element
export default function EditSidebar({ editor }: { editor: FabricJSEditor | undefined }) {
    const { element, setElement } = useStore()

    const height = (): number => {
        const windowHeight = window.innerHeight
        const topBarHeight = document.getElementById("topbar")?.clientHeight || 0
        return windowHeight - topBarHeight - 16
    }
    return (
        <div className="bg-white border  col-span-2 rounded-md" style={{ height: `${height()}px` }}>
            <h2 className="text-2xl px-2 pt-2">
                Settings
            </h2>
            <div className="px-2 mt-2 ">

                {/* Element defined, you can edit it now */}
                {element && (
                    <div className="space-y-1">
                        {/* Edit the color */}
                        <h2 className="text-lg">Global Settings:</h2>
                        <div className="flex justify-between">
                            <p>Color:</p>
                            <Input className="rounded-md border border-[#DBDBDB]" type="color" placeholder={element.fill as string} defaultValue={element.fill as string} onInput={(e) => {
                                element.set({
                                    fill: e.currentTarget.value
                                })
                                editor?.canvas.renderAll()
                            }} />
                        </div>

                        {/* The element is an rectangle, custom settings for this */}
                        {element.type === "rect" && (
                            <div className="flex flex-col space-y-1 pt-2">
                                <h2 className="text-lg">Rectangle Settings:</h2>
                                <div className="flex justify-between items-center">
                                    <p>Border Radius:</p>
                                    <Input className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#000] w-[100px]" type="number" placeholder="5" defaultValue={(element as fabric.Rect).ry} onInput={(e) => {
                                        const activeElement: fabric.Rect = element as fabric.Rect
                                        activeElement.set({
                                            ry: +e.currentTarget.value
                                        })
                                        editor?.canvas.renderAll()
                                    }} />
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* No element selected, you can now edit the presentations */}
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

    )
}