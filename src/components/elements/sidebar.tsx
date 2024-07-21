"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { BookTemplate, ChevronsUpDown, Contact, FileText, Files, Home, School } from "lucide-react"
import Link from "next/link"
import { cn } from "~/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useSearchParams, usePathname,  } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

// The link for the sidebar
interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode,
    popoverName: string
    href: string,
    sidebarStyle?: "small" | "big"
}
export const SidebarLink = ({ children, href, popoverName, sidebarStyle, ...props }: LinkProps) => {
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

export const SidebarIcon = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mr-2">
            {children}
        </div>
    )
}

/**
 * The sidebar for the dashboard. On devices which are smaller then 
 * {md} pixel, the sidebar won't be shows, instead we will use
 * a header. 
 * 
 * The sidebar has 2 (two) styles:
 * - small: A version with only the icons and tooltips
 * - big: A version with the names next to the icons
 * 
 * Every change of the style of the sidebar will be saved in the localstorage
 * or in the db.
 * @returns {JSX.Element}
 */
export default function Sidebar(): JSX.Element {
    // the styles of the sidebar
    const [styles, setStyle] = useState<"small" | "big">("big")

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