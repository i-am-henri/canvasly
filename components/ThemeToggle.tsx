"use client"

import { Italic, Moon, Sun } from "lucide-react"
import { Toggle } from "./ui/toggle"
import { useTheme } from "next-themes"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { toast } from "sonner"
export default function ThemeSwitch() {
    const theme = useTheme()
    return (
        <Popover   aria-label="Toggle theme">
            <PopoverTrigger>
                <Moon className="h-5 w-5"/>
            </PopoverTrigger>
            <PopoverContent className="bg-[#1b1b1b] border-[#ffffff48]">
                <p className="cursor-pointer hover:text-[#ffffffe1] transition" onClick={() => {theme.setTheme("light"); toast("light theme", {description: "Switched the theme to the light theme."})}}>light</p>
                <p className="cursor-pointer hover:text-[#ffffffe1] transition"onClick={() => {theme.setTheme("dark"); toast("dark theme", {description: "Switched the theme to the dark theme."})}}>dark</p>
                <hr className="border-[#ffffff48]" />
                <p className="cursor-pointer hover:text-[#ffffffe1] transition" onClick={() => {theme.setTheme("system"); toast("system's theme", {description: "Switched the theme to the theme of the system."})}}>system</p>
            </PopoverContent>
        </Popover>
    )
}