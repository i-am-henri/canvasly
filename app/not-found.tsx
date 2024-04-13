import Link from "next/link";
import Svg from "./svg";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "404 | source not found",
    description: "We are not able to find the requested source. "
}
export default function NotFound() {
    return (
        <div className="bg-[#272727] flex items-center justify-center flex-col min-h-screen w-full">
            <h2 className="text-2xl">
                404
            </h2>
            <p className="text-[#808080]">The requested page or ressource wasn't found on the server. But should be there? <Link href={"/contact"} className="underline">contact us</Link></p>
            <div className="absolute flex bottom-3 *:text-[#808080]">
          <Link href={"/"}>home</Link>
          <Svg />
          <Link href={"/pricing"}>pricing</Link>
          <Svg />
          <Link className="" href={"/features"}>
            features
          </Link>
        </div>
        </div>
    )
}