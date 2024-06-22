import type { Prisma } from "@prisma/client"
// biome-ignore lint: donÄt work otherwise
import { Object } from "fabric/fabric-impl";
import { create } from "zustand"
import { update } from "./action";

type state = {
    content: { version: string; objects: Object[]; } | undefined,
}
type action = {
    setContent: (state: state["content"]) => void 
}



/**The content for the slides. */
export const useContent = create<state & action>((set) => ({
    content: undefined,
    setContent: async (content) => {
        set(() => ({ content: content }))
        await update(content)
    },
}))