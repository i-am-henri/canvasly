"use client"
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { FabricJSCanvas } from "fabricjs-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HoverCard, HoverCardTrigger } from "~/components/ui/hover-card";
const App = dynamic(() => import("~/components/editor/editor"), { ssr: false })
import { motion } from "framer-motion"
import { MenuBar, MenuBarContent, MenuBarTrigger } from "~/components/ui/menubar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuDivider, ContextMenuSubMenu, ContextMenuSubMenuTrigger, ContextMenuTrigger, ContextMenuSubMenuContent } from "~/components/ui/context-menu";
import { ContextMenuSubContent } from "@radix-ui/react-context-menu";
export default function HomePage() {
  return (
    <main className="flex flex-col bg-white  w-full items-center">
      {/* Header */}
      <ContextMenu>
        <ContextMenuTrigger className="rounded-full mt-4 p-2 w-[700px] border border-neutral-300 flex justify-between">
          <h2>canvasly</h2>
          <nav className="flex space-x-2">
            <Link className="text-neutral-800" href={"/pricing"}>pricing</Link>
            <Link className="text-neutral-800" href={"/features"}>features</Link>
            <Link className="text-neutral-800" href={"/login"}>login</Link>
          </nav>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem shortcut={{
            windows: ["Strg", "P"],
            apple: ["Com", "P"]
          }}>
            hey
          </ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuSubMenu>
            <ContextMenuSubMenuTrigger asItem>
              submenu
            </ContextMenuSubMenuTrigger>
            <ContextMenuSubMenuContent>
              <ContextMenuItem>
                heyyy
              </ContextMenuItem>
            </ContextMenuSubMenuContent>
          </ContextMenuSubMenu>
        </ContextMenuContent>
      </ContextMenu>
      {/* Hero section */}
      <section className="md:w-[600px] lg:w-[700px] h-[calc(100vh-40vh)] items-start flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-black">Your presentations, reimagend</h2>
        <p>We provide an online web app, to create automated slides</p>
        <Button>
          hey
        </Button>
        <HoverCard>
          <HoverCardTrigger>
            hey
          </HoverCardTrigger>
          <HoverCardContent className="">
            sd
          </HoverCardContent>
        </HoverCard>
        <MenuBar>
          <MenuBarTrigger>
            <a>hey</a>
          </MenuBarTrigger>
          <MenuBarContent>
            wow
          </MenuBarContent>
        </MenuBar>
      </section>
    </main>
  );
}
