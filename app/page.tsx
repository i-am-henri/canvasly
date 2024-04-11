import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
        <h1 className="text-3xl">We fixed presentations</h1>
        <p className="text-secondary mb-2 text-sm">For desktops, phones and tablets.</p>
        <div className="flex">
          <Button>
            start now
          </Button>
          <Button className="ml-2">
            login
          </Button>
        </div>
      </section>
    </div>
  )
}