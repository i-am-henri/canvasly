"use client"

import type { FabricJSEditor } from 'fabricjs-react'
import { MenuBar, MenuBarContent, MenuBarDivider, MenuBarItem, MenuBarKeyboardIcon, MenuBarMenu, MenuBarSubmenu, MenuBarSubmenuContent, MenuBarSubmenuTrigger, MenuBarTrigger } from '../ui/menubar'
import { addRectangle, addText } from '../editor/logic/events'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Button, { ButtonStyles } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription } from '../ui/dialog'
import { cn } from '~/lib/utils'

export default function TopBar({ editor, teamId }: { editor: FabricJSEditor | undefined, teamId: string }) {
    return (
        <div className='w-[calc(100vw-200px)] h-[50px] flex items-center justify-between' id='topbar'>
            <Link href={`/dashboard/${teamId}`} className='ml-5'>
                <ChevronLeft size={20} />
            </Link>
            <MenuBar>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Objects
                    </MenuBarTrigger>
                    <MenuBarContent >
                        <MenuBarItem onClick={() => {
                            addRectangle(editor, {
                                // the default background color
                                backgroundColor: "transparent",
                                // the standart border radius
                                ry: 10,
                                rx: 10,
                                // size
                                width: 50,
                                height: 50,
                                // The Backgroundcolor when you select the element
                                selectionBackgroundColor: "#1f1fff0c",
                                // the filled color
                                fill: "#000000"
                            })
                        }}>
                            Rectangle
                        </MenuBarItem>
                        <MenuBarItem onClick={() => {
                            editor?.addCircle()
                        }}>
                            Circle
                        </MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Images
                    </MenuBarTrigger>
                    <MenuBarContent>
                        normal
                    </MenuBarContent>
                </MenuBarMenu>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Text
                    </MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarItem onClick={() => {
                            addText("new text", editor, {
                                editable: true,
                                fill: "#1ff",
                                // The Backgroundcolor when you select the element
                                selectionBackgroundColor: "#1f1fff0c",
                                fontFamily: "Calibri",
                                fontSize: 32
                            })
                        }}>
                            normal
                        </MenuBarItem>
                        <MenuBarItem onClick={() => {
                            addText("new text", editor, {
                                editable: true,
                                fill: "#1ff",
                                // The Backgroundcolor when you select the element
                                selectionBackgroundColor: "#1f1fff0c",
                                fontFamily: "Calibri",
                                textAlign: "center",
                                fontSize: 24
                            })
                        }}>
                            smal
                        </MenuBarItem>
                    </MenuBarContent>
                </MenuBarMenu>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Stickers
                    </MenuBarTrigger>
                    <MenuBarContent>
                        <MenuBarItem>
                            the cool one
                        </MenuBarItem>
                        <MenuBarDivider />
                        <MenuBarItem>
                            the next big thing
                        </MenuBarItem>
                        <MenuBarSubmenu>
                            <MenuBarSubmenuTrigger>
                                watch now
                            </MenuBarSubmenuTrigger>
                            <MenuBarSubmenuContent>
                                <MenuBarItem>
                                    <span>submenu</span>
                                    <MenuBarKeyboardIcon text='STRG+P' />
                                </MenuBarItem>
                            </MenuBarSubmenuContent>
                        </MenuBarSubmenu>
                    </MenuBarContent>
                </MenuBarMenu>
            </MenuBar>
            <div className="flex">
                <Dialog>
                    <DialogTrigger className={cn(ButtonStyles(), "mr-5")}>
                        share
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            Share or export your presentation
                        </DialogHeader>
                        <DialogDescription>
                            You can export this presentation as an power point (pptx) file, pdf, or as images. For the last option, you will get a .zip file, with all of the images.
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose className="mr-1 hover:bg-[#DBDBDB] px-2 rounded-[8px] duration-300">
                                Share
                            </DialogClose>
                            <DialogClose className="px-2 rounded-[8px] flex border-b border-b-blue-300 ring-1 ring-blue-300 bg-blue-200 text-black">
                                Export
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}