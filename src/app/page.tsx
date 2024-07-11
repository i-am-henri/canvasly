"use client"
import Header from "~/components/elements/header";
import Balancer from "react-wrap-balancer";
import Annonce from "~/components/ui/annonce";
import Dashboard from "~/../public/image.png"
import Img from "next/image"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Header */}
      <Header />
      {/* Hero section */}
      <section className="lg:w-[900px] xl:w-[1000px] space-y-4 2xl:w-[1100px]">
        <div className="mt-44">
          <Balancer className="text-5xl font-medium text-black">
            The better Option to make Slides.
          </Balancer>
          <p className="text-neutral-700 w-[75%]">
            We provide an online presentation designer, for you and your team. You can export your presentation later to formats like pptx for power point, pdf or as images.
          </p>
        </div>
        <Img className="border rounded-md" src={Dashboard} alt="A screenshot from our dashboard." />
        <section>
          <h2 className="text-3xl font-medium">Made for your team.</h2>
        </section>
      </section>
    </main>
  );
}
