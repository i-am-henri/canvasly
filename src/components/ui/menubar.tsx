import * as RadixMenuBar from "@radix-ui/react-menubar"
import { ChevronRight, LucideProps } from "lucide-react"
import type React from "react"
import { cn } from "~/lib/utils"

const MenuBar = ({ children }: { children: React.ReactNode, }) => (
    <RadixMenuBar.Root>
        {children}
    </RadixMenuBar.Root>
)
interface MenuBarTrigger extends RadixMenuBar.MenubarTriggerProps {
    children: React.ReactNode
}
const MenuBarTrigger = ({ children, ...props }: MenuBarTrigger) => {
    return (
        <RadixMenuBar.Trigger {...props} className={cn("px-3 hover:bg-[#f5f5f5] rounded-[8px] transition py-1", props.className)}>
            {children}
        </RadixMenuBar.Trigger>
    )
}

const MenuBarMenu = RadixMenuBar.Menu

interface MenuBarContentProps extends RadixMenuBar.MenubarContentProps {
    children: React.ReactNode
}
const MenuBarContent = ({ children, ...props }: MenuBarContentProps) => {
    return (
        <RadixMenuBar.Portal>
            <RadixMenuBar.Content {...props} className={cn("border rounded-md p-2 bg-white mt-1 min-w-[200px]", props.className)}>
                {children}
            </RadixMenuBar.Content>
        </RadixMenuBar.Portal>
    )
}

interface MenuBarItemProps extends RadixMenuBar.MenubarItemProps, React.RefAttributes<HTMLDivElement> {
    children: React.ReactNode
}
const MenuBarItem = ({ children, ...props }: MenuBarItemProps) => {
    return (
        <RadixMenuBar.Item {...props} className={cn("px-2 cursor-pointer py-1 hover:bg-[#f5f5f5] transition rounded-sm flex justify-between items-center", props.className)} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            {children}
        </RadixMenuBar.Item>
    )
}
const MenuBarDivider = () => (
    <hr className="border-t-2 my-2 border-t-[#f5f5f5]" />
)
interface MenuBarKeyboardIconProps extends React.HTMLAttributes<HTMLDivElement>{
    text: string
}
/**Go right Icon for the trigger of a submenu */
const MenuBarKeyboardIcon = ({ text,...props }: MenuBarKeyboardIconProps) => {
    return (
        <div {...props} className={cn("bg-[#e1e1e1] rounded-[4px] text-sm border-b border-b-[#d1d1d1] ring-1 ring-[#d1d1d1] px-2", props.className)}>
            {text}
        </div>
    )
}
// The submenu
const MenuBarSubmenu = RadixMenuBar.Sub
interface MenuBarSubmenuTriggerProps extends RadixMenuBar.MenubarSubTriggerProps, React.RefAttributes<HTMLDivElement> {
    children: React.ReactNode
}
const MenuBarSubmenuTrigger = ({ children, ...props }: MenuBarSubmenuTriggerProps) => {
    return (
        <RadixMenuBar.SubTrigger {...props} className={cn("px-2 group cursor-pointer py-1 hover:bg-[#f5f5f5] transition rounded-sm flex justify-between items-center", props.className)}>
            <div>
                {children}
            </div>
            <ChevronRight  className={cn("group-hover:translate-x-1 transition")} size={17} />
        </RadixMenuBar.SubTrigger>
    )
}
interface MenuBarSubmenuContentProps extends RadixMenuBar.MenubarSubContentProps {
    children: React.ReactNode
}
const MenuBarSubmenuContent = ({ children, ...props }: MenuBarSubmenuContentProps) => {
    return (
        <RadixMenuBar.Portal>
            <RadixMenuBar.SubContent {...props} className={cn("border rounded-md p-2 bg-white mt-1 min-w-[200px]", props.className)}>
                {children}
            </RadixMenuBar.SubContent>
        </RadixMenuBar.Portal>
    )
}
interface MenuBarSubmenuIconProps extends Omit<LucideProps, "ref">, React.RefAttributes<SVGSVGElement> { }
/**Go right Icon for the trigger of a submenu */
const MenuBarSubmenuIcon = ({ ...props }: MenuBarSubmenuIconProps) => {
    return (
        <ChevronRight {...props} className={cn("", props.className)} />
    )
}
export {
    // Default components
    MenuBar,
    MenuBarContent,
    MenuBarTrigger,
    MenuBarMenu,
    MenuBarItem,
    // The keyboard icon for the item element (optional)
    MenuBarKeyboardIcon,
    // Divider
    MenuBarDivider,
    // Submenu
    MenuBarSubmenu,
    MenuBarSubmenuTrigger,
    MenuBarSubmenuContent,
    MenuBarSubmenuIcon
}