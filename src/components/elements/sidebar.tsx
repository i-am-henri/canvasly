"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { BookTemplate, ChevronsUpDown, Contact, FileText, Files, Home, School } from "lucide-react"
import Link from "next/link"
import { cn } from "~/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
export default function Sidebar() {
    // The sidebar:
    // The sidebar has 2 styles: closed (small) and opened (big). The default style if for large devices big, and for small devices small.
    // When you change the style, it will be saved in the localstorage
    const [styles, setStyle] = useState<"opened" | "closed">("opened")

    interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
        children: React.ReactNode,
        popoverName: string
        href: string,
    }
    const SidebarLink = ({ children, href, popoverName, ...props }: LinkProps) => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <Link href={href} {...props} className={cn("flex items-center font-medium hover:bg-neutral-100 px-2 py-1 rounded-sm transition", props.className)}>
                        {children}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {popoverName}
                </TooltipContent>
            </Tooltip>
        )
    }
    const SidebarIcon = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="mr-2">
                {children}
            </div>
        )
    }
    return (
        <div id="sidebar" className="lg:w-[200px] border-r h-full fixed bg-white">
            {/* The org switch */}
            <div className="flex items-center justify-between mx-5 py-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-sm">
                        HN
                    </AvatarFallback>
                </Avatar>
                <h2>henri</h2>
                <ChevronsUpDown size={15} />
            </div>
            <hr />
            <div className="mx-3 flex flex-col space-y-1 my-1">
                <p className="text-neutral-500 mx-2 text-sm">
                    Platform
                </p>
                <SidebarLink popoverName="Home" href={"/dashboard"}>
                    <SidebarIcon><Home size={17} /></SidebarIcon>
                    Home
                </SidebarLink>
                <SidebarLink popoverName="Templates" href={"/dashboard/template"}>
                    <SidebarIcon><BookTemplate size={17} /></SidebarIcon>
                    Templates
                </SidebarLink>
                <SidebarLink popoverName="Teammembers" href={"/dashboard/members"}>
                    <SidebarIcon><Contact size={17} /></SidebarIcon>
                    Members
                </SidebarLink>
                <SidebarLink popoverName="Documents" href={"/dashboard/docs"}>
                    <SidebarIcon><FileText size={17} /></SidebarIcon>
                    Documents
                </SidebarLink>
                <SidebarLink popoverName="Assets" href={"/dashboard/assets"}>
                    <SidebarIcon><Files size={17} /></SidebarIcon>
                    Assets
                </SidebarLink>
            </div>

            <hr />
            <div className="mx-3 flex flex-col space-y-1 my-1">
                <p className="text-neutral-500 mx-2 text-sm">
                    Projects
                </p>
                <SidebarLink popoverName="The School" href={"/dashboard"}>
                    <SidebarIcon><School size={17} /></SidebarIcon>
                    The School
                </SidebarLink>
            </div>
        </div>
    )
}