"use client"
import type { FabricJSEditor } from "fabricjs-react"
import { useStore } from "../editor/logic/element-store"
import Badge from "../ui/badge"
import { Input } from "../ui/input"

// The sidebar to edit an Element
export default function EditSidebar({ editor }: { editor: FabricJSEditor | undefined }) {
    const { element, setElement } = useStore()
    return (
        <div className="bg-white border h-screen col-span-1 rounded-md">
            <h2 className="text-2xl px-2 pt-2">
                Settings
            </h2>
            <hr />
            <div className="px-2">

                {/* Element defined, you can edit it now */}
                {element && (
                    <p>
                        <div className="flex">
                            <p>Background Color:</p>
                            <Input type="color" defaultValue={element.backgroundColor} onInput={(e) => {
                                element.set({
                                    backgroundColor: e.currentTarget.value
                                })
                                editor?.canvas.renderAll()
                            }} />
                        </div>
                    </p>
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