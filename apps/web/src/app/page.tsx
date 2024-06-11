"use client"
import { FabricJSCanvas } from "fabricjs-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const App = dynamic(() => import("~/components/editor/editor"), {ssr: false})

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <App />
    </main>
  );
}
