import { create } from "zustand"

type state = {
    preview: string[],
}
type action = {
    setPreview: (state: state["preview"]) => void 
}
/**The targeted item. */
export const usePreviewStore = create<state & action>((set) => ({
    preview: [],
    setPreview: (preview) => set(() => {
        console.log(preview)
        return ({ preview })
    }),
}))