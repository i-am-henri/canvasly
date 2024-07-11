"use client"
import type { FabricJSEditor } from "fabricjs-react"
import { useStore } from "../editor/logic/element-store"
import Badge from "../ui/badge"
import { Input } from "../ui/input"
import Button from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react"
import { MultiDialog, MultiDialogContent, MultiDialogTrigger } from "../ui/multi-dialog"

/**
 * The sidebar for editing the infomation from the slide or object.
 * @param {FabricJSEditor | undefined} editor - The editor from fabricjs react
 * @returns {JSX.Element}
 */
export default function EditSidebar({ editor }: { editor: FabricJSEditor | undefined }): JSX.Element {
    const { element, setElement } = useStore()
    const [height, setHeight] = useState<number>(0)
    useEffect(() => {
        const windowHeight = window.innerHeight
        const topBarHeight = document.getElementById("topbar")?.clientHeight || 0
        setHeight(windowHeight - topBarHeight - 16)
    })
    return (
        <div className="bg-white border  col-span-2 rounded-md" style={{ height: `${height}px` }}>
            <h2 className="text-2xl font-medium px-2 pt-2">
                Settings
            </h2>
            <div className="px-2 mt-2 ">

                {/* Element defined, you can edit it now */}
                {element && (
                    <div className="space-y-1">
                        {/* Edit the color */}
                        <h2 className="text-lg font-medium">Global Settings:</h2>
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
                                <h2 className="text-lg font-medium">Rectangle Settings:</h2>
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
                <MultiDialog>
                    <MultiDialogTrigger>
                        anderer
                    </MultiDialogTrigger>
                    <MultiDialogContent>
                        der andere Dialog
                    </MultiDialogContent>
                </MultiDialog>
                {/* No element selected, you can now edit the presentations or the slide */}
                {!element && (
                    <div className='flex flex-col space-y-1 pt-2'>
                        <h2 className="text-lg font-medium">Your slide:</h2>
                        {/* Notes for the editor */}
                        <div className="flex justify-between items-center">
                            <p>Editor Notes:</p>

                        </div>
                        {/* The button for deleting this slide */}
                        <div>
                            <Dialog>
                                <DialogTrigger className="px-2 rounded-[8px] flex border-b border-b-red-300 ring-1 ring-red-300 bg-red-200 text-black">
                                    delete this slide
                                </DialogTrigger>
                                <DialogContent className="border-red-300 bg-red-50">
                                    <DialogHeader>Are you sure?</DialogHeader>
                                    <DialogDescription>
                                        You can't revert this action back. Are you absolutely sure?
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose className="mr-3 hover:bg-[#DBDBDB] px-2 rounded-[8px] duration-300">
                                            No, take me bag
                                        </DialogClose>
                                        <DialogClose className="px-2 rounded-[8px] flex border-b border-b-red-300 ring-1 ring-red-300 bg-red-200 text-black">
                                            Delete this Slide
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )}
                <MultiDialog>
                    <MultiDialogTrigger>
                        hey
                    </MultiDialogTrigger>
                    <MultiDialogContent>
                        <div className="text-white">
                            wow das klappt
                        </div>
                    </MultiDialogContent>
                </MultiDialog>
            </div>
        </div>

    )
}