import { create } from "zustand"

type state = {
    slide: number,
}
type action = {
    setSlide: (state: state["slide"]) => void 
}
/**The targeted item. */
export const useSlideStore = create<state & action>((set) => ({
    slide: 0,
    setSlide: (slide) => set(() => {
        console.log(slide)
        return ({ slide: slide })
    }),
}))