"use client"
import { FabricJSCanvas } from "fabricjs-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "~/components/ui/button";
const App = dynamic(() => import("~/components/editor/editor"), { ssr: false })

export default function HomePage() {
  return (
    <main className="flex flex-col  w-full items-center">
      {/* Header */}
      <div className="rounded-full mt-4 p-2 w-[700px] border border-neutral-300 flex justify-between">
        <h2>canvasly</h2>
        <nav className="flex space-x-2">
          <Link className="text-neutral-800" href={"/pricing"}>pricing</Link>
          <Link className="text-neutral-800" href={"/features"}>features</Link>
          <Link className="text-neutral-800" href={"/login"}>login</Link>
        </nav>
      </div>
      {/* Hero section */}
      <section className="md:w-[600px] lg:w-[700px] h-[calc(100vh-40vh)] items-start flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-black">Your presentations, reimagend</h2>
        <p>We provide an online web app, to create automated slides</p>
          <Button.Root>
            <Button.Label>
              hey
            </Button.Label>
          </Button.Root>
      </section>
    </main>
  );
}
