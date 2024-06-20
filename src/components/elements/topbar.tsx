"use client"

import type {  FabricJSEditor } from 'fabricjs-react'
import { MenuBar, MenuBarContent, MenuBarDivider, MenuBarItem, MenuBarKeyboardIcon, MenuBarMenu, MenuBarSubmenu, MenuBarSubmenuContent, MenuBarSubmenuTrigger, MenuBarTrigger } from '../ui/menubar'
import { addRectangle, addText } from '../editor/logic/events'

export default function TopBar({editor}: {editor: FabricJSEditor | undefined}) {
    return (
        <div className='w-[calc(100vw-200px)] h-[50px] flex items-center justify-center'>
            <MenuBar>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Objects
                    </MenuBarTrigger>
                    <MenuBarContent onClick={() => {
                        addRectangle(editor, {
                            // the default background color
                            backgroundColor: "transparent",
                            //border radius
                            rx: 10,
                            ry: 10,
                            // size
                            width: 50,
                            height: 50,
                            // The Backgroundcolor when you select the element
                            selectionBackgroundColor: "#1f1fff0c",
                            // the filled color
                            fill: "#1f1"
                        })
                    }}>
                        normal
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
        </div>
    )
}