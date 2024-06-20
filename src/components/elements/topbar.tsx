"use client"

import type {  FabricJSEditor } from 'fabricjs-react'
import { MenuBar, MenuBarContent, MenuBarDivider, MenuBarItem, MenuBarKeyboardIcon, MenuBarMenu, MenuBarSubmenu, MenuBarSubmenuContent, MenuBarSubmenuTrigger, MenuBarTrigger } from '../ui/menubar'

export default function TopBar({editor}: {editor: FabricJSEditor | undefined}) {
    return (
        <div className='w-[calc(100vw-200px)] h-[50px] flex items-center justify-center'>
            <MenuBar>
                <MenuBarMenu>
                    <MenuBarTrigger>
                        Objects
                    </MenuBarTrigger>
                    <MenuBarContent>
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