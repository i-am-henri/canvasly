import type { Prisma } from "@prisma/client"
// biome-ignore lint: donÄt work otherwise
import { Object } from "fabric/fabric-impl";
import { create } from "zustand"

type state = {
    content: { version: string; objects: Object[]; } | undefined,
}
type action = {
    setContent: (state: state["content"]) => void 
}
/**The content for the slides. */
export const useContent = create<state & action>((set) => ({
    content: undefined,
    setContent: (content) => set(() => ({ content: content })),
}))