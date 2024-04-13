import Link from "next/link";

export default function NoPresentations() {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col w-full">
            <h2 className="text-2xl">You have no presentations at the time.</h2>
            <p className="text-[#808080]">You can create a presentation <Link href={"/dashboard/new"} className="underline">here</Link>.</p>
        </div>
    )
}