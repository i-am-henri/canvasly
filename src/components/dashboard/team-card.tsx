"use client"

import { useRouter } from "next/navigation"

export default function TeamCard({
    id,
    name,
    description
}: {
    id: string,
    name: string,
    description: string | null
}) {
    const router  = useRouter()
    return (
        <div onClick={() => router.push(`/dashboard/${id}`)} onKeyUp={() => router.push(`/dashboard/${id}`)} className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] cursor-pointer p-2 rounded-md">
            <h2 className="text-xl">{name}</h2>
            <p>{description}</p>
        </div>
    )
}