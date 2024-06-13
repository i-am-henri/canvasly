"use client"
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { cn } from '~/lib/utils';


const ContextMenu = RadixContextMenu.Root
const ContextMenuTrigger = RadixContextMenu.Trigger
interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const ContextMenuContent = ({ children, ...props }: ContextMenuProps) => {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content {...props} className={cn("border border-[#DBDBDB] bg-[#ffffff] text-neutral-700 min-w-[175px] rounded-md p-1", props.className)}  >
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  )
}

const ContextMenuDivider = (props: React.HTMLAttributes<HTMLHRElement>) => {
  return (
    <RadixContextMenu.Separator {...props} className={cn("bg-[#DBDBDB] h-[2px] w-full rounded-full my-1", props.className)}/>
  )
}

// Radio Group
const ContextMenuRadioGrop = RadixContextMenu.RadioGroup
const ContextMenuRadioGroupItem = RadixContextMenu.Item
const ContextMenuRadioGroupItemIndicator = RadixContextMenu.ItemIndicator

const ContextMenuGroup = RadixContextMenu.Group

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  shortcut?: {
    windows: string[],
    apple: string[]
  }
}

const ContextMenuItem = ({children, shortcut, ...props}: ContextMenuItemProps) => {
  const isWin = navigator.userAgent.includes("Win")
  console.log(isWin)
  
  return (
    <RadixContextMenu.Item  {...props as unknown as any} className={cn("hover:bg-[#f5f5f5] rounded-sm outline-none px-2 py-1", props.className)}>
      {children}
      {isWin && shortcut && (
        <span>
          {shortcut.windows}
        </span>
      ) || shortcut && (
        <span>
          {shortcut.apple}
        </span>
      )}
      
    </RadixContextMenu.Item>
  )
}

const ContextMenuLabel = RadixContextMenu.Label

// Submenu
const ContextMenuSubMenu = RadixContextMenu.Sub
const ContextMenuSubMenuTrigger = RadixContextMenu.SubTrigger
const ContextMenuSubMenuContent = ({ children, ...props }: ContextMenuProps) => {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.SubContent className={cn(props.className, "rounded-md border p-2")} {...props}>
        {children}
      </RadixContextMenu.SubContent>
    </RadixContextMenu.Portal>
  )
}

export {
  // Submenu
  ContextMenuSubMenu,
  ContextMenuSubMenuContent,
  ContextMenuSubMenuTrigger,

  ContextMenuLabel,

  ContextMenuDivider,

  // Group
  ContextMenuGroup,
  ContextMenuItem,

  // Radio Group
  ContextMenuRadioGrop,
  ContextMenuRadioGroupItem,
  ContextMenuRadioGroupItemIndicator,

  // The basic context menu
  ContextMenuContent,
  ContextMenu,
  ContextMenuTrigger
}