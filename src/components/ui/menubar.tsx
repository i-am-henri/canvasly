import * as RadixMenuBar from "@radix-ui/react-menubar"
import type React from "react"
import { Scope } from "@radix-ui/react-context";
const MenuBar = ({children}: {children: React.ReactNode, }) => (
    <RadixMenuBar.Root>
        <RadixMenuBar.Menu>
            {children}
        </RadixMenuBar.Menu>
    </RadixMenuBar.Root>
)
const MenuBarTrigger = RadixMenuBar.Trigger

const MenuBarContent = ({children}: {children: React.ReactNode}) => {
    return (
        <div>

        </div>
    )
}
export {MenuBar, MenuBarContent, MenuBarTrigger}