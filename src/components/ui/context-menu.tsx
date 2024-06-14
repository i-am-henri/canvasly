"use client"
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { ChevronRight } from 'lucide-react';
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
  },
}


/***An item in the context menu. */
const ContextMenuItem = ({children, shortcut, ...props}: ContextMenuItemProps) => {
  const isWin = navigator.userAgent.includes("Win")
  
  return (
    <RadixContextMenu.Item  {...props as unknown as any} className={cn("hover:bg-[#f5f5f5] flex justify-between cursor-pointer rounded-sm outline-none px-2 py-1", props.className)}>
      {children}
      {isWin && shortcut && (
        <code className='font-normal flex items-center justify-center text-[10px] '>
          {shortcut.windows}
        </code>
      ) || shortcut && (
        <code className='font-normal flex items-center justify-center text-[10px] '>
          {shortcut.apple}
        </code>
      )}
      
    </RadixContextMenu.Item>
  )
}

const ContextMenuLabel = RadixContextMenu.Label

// Submenu
const ContextMenuSubMenu = RadixContextMenu.Sub
interface ContextMenuSubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  asItem?: boolean
}
const ContextMenuSubMenuTrigger = ({children, asItem = false,...props}: ContextMenuSubMenuProps) => {
  return (
    <RadixContextMenu.SubTrigger {...props} className={asItem? "hover:bg-[#f5f5f5] flex justify-between items-center cursor-pointer rounded-sm outline-none px-2 py-1": ""}>
      {children}
      <ChevronRight size={15} />
    </RadixContextMenu.SubTrigger>
  )
}

const ContextMenuSubMenuContent = ({ children, ...props }: ContextMenuProps) => {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.SubContent {...props} className={cn("rounded-md border border-[#DBDBDB] min-w-[150px] bg-white p-2", props.className)} >
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