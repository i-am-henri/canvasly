import { create } from "zustand"

type state = {
    element: fabric.Object | undefined | null,
}
type action = {
    setElement: (state: state["element"]) => void 
}

export const useStore = create<state & action>((set) => ({
    element: undefined,
    setElement: (element) => set(() => ({ element: element })),
}))