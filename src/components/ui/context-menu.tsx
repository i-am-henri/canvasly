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
      <RadixContextMenu.Content className={cn(props.className, "rounded-md border p-2")} {...props} >
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  )
}

const ContextMenuSeperator = RadixContextMenu.Separator

// Radio Group
const ContextMenuRadioGrop = RadixContextMenu.RadioGroup
const ContextMenuRadioGroupItem = RadixContextMenu.Item
const ContextMenuRadioGroupItemIndicator = RadixContextMenu.ItemIndicator

// Group
const ContextMenuGroup = RadixContextMenu.Group
const ContextMenuItem = RadixContextMenu.Item

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

  ContextMenuSeperator,

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