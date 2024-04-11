import  Link  from "next/link";
import Svg from "../svg";

export default function Features() {
    return (
        <div className="w-full min-h-screen items-center justify-center flex flex-col" style={{ minHeight: "100dvh" }}>
            <h2 className="text-3xl">0€</h2>
            <p className="text-[#808080]">But with limitations.</p>
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