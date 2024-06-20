"use client"
import Header from "~/components/elements/header";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import DashboardImage from "~/../public/dashboard.webp"
import Badge from "~/components/ui/badge";
import Annonce from "~/components/ui/annonce";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Header */}
      <Header />
      {/* Hero section */}
      <section className="lg:w-[900px] xl:w-[1000px] space-y-4 2xl:w-[1100px]">
        <div className="mt-32">
          <Annonce>
            added a bunch of comps
          </Annonce>
          <Balancer className="text-5xl font-medium text-black">
            The better Option to Make Slides.
          </Balancer>
          <p className="text-neutral-700 w-[75%]">
            We provide an online presentation designer, for you and your team. You can export your presentation later to formats like pptx for power point.
          </p>
        </div>
        <Image src={DashboardImage} alt="the dashboard" width={"1000"} height={1000} />
      </section>
      <section className="lg:w-[900px] xl:w-[1000px] space-y-4 2xl:w-[1100px] flex items-center flex-col mt-16">
        <h3 className="text-xl font-medium">used by famous companys</h3>
        <Badge variant={"primary"} size={"small"}>
          in progress
        </Badge>
        <div className="flex justify-between w-full">
          <h2 className="text-xl text-neutral-700">google</h2>
          <h2 className="text-xl text-neutral-700">amazon</h2>
          <h2 className="text-xl text-neutral-700">google</h2>
          <h2 className="text-xl text-neutral-700">amazon</h2>
          <h2 className="text-xl text-neutral-700">twitter</h2>
        </div>
      </section>
    </main>
  );
}
