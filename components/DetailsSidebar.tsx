"use client"
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "next-themes";
export type Item = {
    link: string,
    name: string,
    icon: React.ReactNode
}
type Action = {
    icon: React.ReactNode;
    tooltip: string,
    link: string
}
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    title: string;
    items: Array<Item>;
    action: Array<Action>
}
export default function DetailsSidebar({ icon, title, items, action, ...props }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const theme = useTheme()

    return (
        <details className="flex items-center justify-between px-[10px] py-[6px]">
            <summary onClick={() => setOpen(!open)} className="flex items-center mb-1 justify-between">
                <div className="flex cursor-pointer">
                    <motion.div style={{ rotate: open ? 90 : 0 }} color={theme.theme === "dark" ? "#e1e1e1" : "#272727"} className="transition duration-300 mr-1">
                        <ChevronRight className="h-5 w-5" />
                    </motion.div>
                    <span className="text-sm dark:text-[#e1e1e1] dark:hover:text-white transititon duration-300 select-none">{title}</span>
                </div>
                <div className="flex">
                    {
                        action.map((action) => (
                            <Tooltip key={action.link}>
                                <TooltipTrigger><Link href={action.link} color={theme.theme === "dark" ? "#e1e1e1" : "#272727"}>{action.icon}</Link></TooltipTrigger>
                                <TooltipContent>
                                    {action.tooltip}
                                </TooltipContent>
                            </Tooltip>
                        ))
                    }
                </div>
            </summary>
            <div className="flex flex-col">
                {
                    items.map((item) => (
                        <Link className="flex px-2 py-1 text-sm items-center font-medium text-[#e1e1e1] border-0 border-[#ffffff0c] m-[2px] hover:m-0  hover:border-2 rounded-xl  hover:bg-gray-100 dark:hover:bg-[#191a1c]  transition duration-300" href={item.link} key={item.name}>
                            {item.icon}
                            <span className="ml-1">{item.name}</span>
                        </Link>
                    ))
                }
            </div>
        </details>
    )
}