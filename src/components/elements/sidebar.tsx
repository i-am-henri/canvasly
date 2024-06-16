"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { BookTemplate, ChevronsUpDown, Contact, FileText, Files, Home, School } from "lucide-react"
import Link from "next/link"
import { cn } from "~/lib/utils"
export default function Sidebar() {
    // The sidebar:
    // The sidebar has 2 styles: closed (small) and opened (big). The default style if for large devices big, and for small devices small.
    // When you change the style, it will be saved in the localstorage
    const [styles, setStyle] = useState<"opened" | "closed">("opened")

    interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
        children: React.ReactNode,
        href: string
    }
    const SidebarLink = ({ children, href, ...props }: LinkProps) => {
        return (
            <Link href={href} {...props} className={cn("flex items-center font-medium hover:bg-neutral-100 px-2 py-1 rounded-sm transition", props.className)}>
                {children}
            </Link>
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
        <div className="lg:w-[200px] border h-full">
            {/* The org switch */}
            <div className="flex items-center justify-between mx-5">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
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
                <SidebarLink href={"/dashboard"}>
                    <SidebarIcon><Home size={17} /></SidebarIcon>
                    Home
                </SidebarLink>
                <SidebarLink href={"/dashboard/template"}>
                    <SidebarIcon><BookTemplate size={17} /></SidebarIcon>
                    Templates
                </SidebarLink>
                <SidebarLink href={"/dashboard/members"}>
                    <SidebarIcon><Contact size={17} /></SidebarIcon>
                    Members
                </SidebarLink>
                <SidebarLink href={"/dashboard/docs"}>
                    <SidebarIcon><FileText size={17} /></SidebarIcon>
                    Documents
                </SidebarLink>
                <SidebarLink href={"/dashboard/assets"}>
                    <SidebarIcon><Files size={17} /></SidebarIcon>
                    Assets
                </SidebarLink>
            </div>

            <hr />
            <div className="mx-3 flex flex-col space-y-1 my-1">
                <p className="text-neutral-500 mx-2 text-sm">
                    Projects
                </p>
                <SidebarLink href={"/dashboard"}>
                    <SidebarIcon><School size={17} /></SidebarIcon>
                    The School
                </SidebarLink>
            </div>
        </div>
    )
}