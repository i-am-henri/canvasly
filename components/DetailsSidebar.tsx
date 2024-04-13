"use client"
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"
type Item = {
    link: string,
    name: string,
    icon: React.ReactNode
}
interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    title: string;
    items: Array<Item>;
}
export default function DetailsSidebar({ icon, title, items, ...props }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <details className="flex items-center justify-between px-[10px] py-[6px]">
            <summary onClick={() => setOpen(!open)} className="flex items-center justify-between">
                <div className="flex cursor-pointer">
                    <motion.div style={{ rotate: open ? 90 : 0 }} className="transition duration-300 mr-1">
                        <ChevronRight className="h-5 w-5" />
                    </motion.div>
                    <span >{title}</span>
                </div>
                <div className="flex">
                    <Plus className="h-5 w-5" />
                </div>
            </summary>
            <div className="flex flex-col">
                {
                    items.map((item) => (
                        <Link className="flex  text-sm font-medium text-[#e1e1e1] border-0 border-[#ffffff0c] m-[2px] hover:m-0  hover:border-2 rounded-xl  hover:bg-gray-100 dark:hover:bg-[#191a1c]  transition duration-300" href={item.link} key={item.name}>
                            {item.icon}
                            {item.name}
                        </Link>
                    ))
                }
            </div>
        </details>
    )
}