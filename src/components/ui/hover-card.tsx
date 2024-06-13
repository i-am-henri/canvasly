"use client"
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { motion } from "framer-motion"
import { cn } from '~/lib/utils';
const HoverCardTrigger = RadixHoverCard.Trigger

const HoverCard = RadixHoverCard.Root

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

function HoverCardContent(props: Props) {
    return (
        <RadixHoverCard.Portal >
            <RadixHoverCard.Content className={cn(props.className, "")} {...props}>
                
            </RadixHoverCard.Content>
        </RadixHoverCard.Portal>
    )
}

export { HoverCardTrigger, HoverCardContent, HoverCard }