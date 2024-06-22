"use client"

import Button from "../ui/button"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { z } from "zod"
import { createPresentation } from "~/app/dashboard/[team]/new-presentation/action"
export const initialState = {
    message: undefined,
    error: undefined
}
export default function NewPresentationForm({name, teamId}: {name: string | string[] | undefined, teamId: string}) {
    const [error, setError] = useState<string | undefined>(undefined)
    const [state, formAction] = useFormState(createPresentation, initialState)
    const formDataSchema = z.object({
        name: z.string().min(3),
        description: z.string().max(350).optional(),
    })
    const { pending, data, method, action } = useFormStatus()
    return (
        <form action={(e: FormData) => {
            setError(undefined)
            const clientParse = formDataSchema.safeParse({
                name: e.get("name") as string,
                description: e.get("description") as string,
            })
            if (!clientParse.success) {
                setError("Validation error. Please check the provided inputs.")
                return
            }
            formAction(e)
        }} className=" flex flex-col justify-center  space-y-2 lg:w-[500px]">
            <h2 className="font-medium text-xl">Create a new presentation {name && `for the team ${name}`}</h2>
            <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" minLength={3} placeholder="Presentation Name" type="text" name="name" />
            <textarea placeholder="Description" name="description" maxLength={350}  className="border-b min-h-[100px] border-b-[#DBDBDB] field-sizing-content  ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none " />
            <input type="text" name="team" id="" className="hidden" value={teamId} />
            {state.error && (
                <p className="text-red-300">
                    {state?.error}
                </p>
            ) || error && (
                <p className="text-red-300">
                    {error}
                </p>
            )}
            <Button disabled={pending} type="submit" className="w-min mt-10">
                Submit
            </Button>
        </form>
    )
}