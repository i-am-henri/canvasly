"use client"

import { login } from "~/app/(auth)/login/action"
import Button from "../ui/button"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { z } from "zod"
export const initialState = {
    message: undefined,
    error: undefined
}
export default function LoginForm() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [state, formAction] = useFormState(login, initialState)
    const formDataSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(24)
    })
    const { pending, data, method, action } = useFormStatus()
    return (
        <form action={(e: FormData) => {
            setError(undefined)
            const clientParse = formDataSchema.safeParse({
                email: e.get("email"),
                password: e.get("password"),
                username: e.get("username")
            })
            if (!clientParse.success) {
                setError("Validation error. Please check your email, your username and your password.")
                return
            }
            formAction(e)
        }} className=" flex flex-col justify-center  space-y-2 lg:w-[400px]">
            <h2 className="font-medium text-xl">Login</h2>
            <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" placeholder="Username" type="text" name="username" />
            <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" type="email" name="email" placeholder="Email" />
            <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" type="password" name="password" placeholder="Password" />
            <Button disabled={pending} type="submit" className="w-min mt-10">
                Submit
            </Button>
        </form>
    )
}