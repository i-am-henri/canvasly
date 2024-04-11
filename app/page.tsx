import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
        <h1 className="text-3xl">We fixed presentations</h1>
        <p className="text-secondary mb-2 text-sm">For desktops, phones and tablets.</p>
        <div className="flex">
          <Link href={"/register"}>
            <Button>
              start now
            </Button>
          </Link>
          <Link href="/login">
            <Button className="ml-2">
              login
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}