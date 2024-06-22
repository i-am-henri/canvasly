import type { Prisma } from "@prisma/client"
import { create } from "zustand"

type state = {
    content: Prisma.JsonArray | undefined,
}
type action = {
    setContent: (state: state["content"]) => void 
}
/**The content for the slides. */
export const useStore = create<state & action>((set) => ({
    content: undefined,
    setContent: (content) => set(() => ({ content: content })),
}))