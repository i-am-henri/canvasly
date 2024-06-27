"use client"

import { useRouter } from "next/navigation"

export default function PresentationCard({
    id,
    name,
    description,
    team
}: {
    id: string,
    name: string,
    description: string | null,
    team: string
}) {
    const router  = useRouter()
    return (
        <div onClick={() => router.push(`/dashboard/${team}/${id}`)} onKeyUp={() => router.push(`/dashboard/${id}`)} className="border-b min-w-[250px] min-h-[150px] border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] cursor-pointer p-2 rounded-md">
            <h2 className="text-xl">{name}</h2>
            <p>{description}</p>
        </div>
    )
}