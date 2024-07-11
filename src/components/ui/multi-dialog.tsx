"use client"

import { type SetStateAction, createContext, useContext, type Dispatch, useEffect } from "react"
import { create } from "zustand"

const IdContext = createContext<number | undefined>(undefined)

/*
 * The multi dialog.
 * The multi dialog is a dialog, where you can open more dialogs inside. This means, the
 * old dialog gets blurred, and a new dialog is in the focus of the user.
 * 
 * The dialog uses it's inputs like the content, will show nothing, and puts the content
 * into the root of the tree. This means, the dialog will be visible.
 * 
 * The state will be tracked with a zustand store.
 */

// The zustand store
type state = {
    open: boolean,
    openId: number | undefined,
    content: React.ReactNode | undefined
}
type action = {
    setOpen: (state: boolean) => void,
    setOpenId: (state: number | undefined) => void,
    setContent: (state: React.ReactNode | undefined) => void
}
/**
 * A zustand store for tracking the state of the dialog.
 */
export const useMultiDialogStore = create<state & action>((set) => ({
    open: false,
    openId: undefined,
    content: undefined,
    setOpen: (state) => set({ open: state }),
    setOpenId: (state: number | undefined) => set({ openId: state }),
    setContent: (state) => set({ content: state })
}))



// FIXME: The components

/**
 * This is the provider for the multi-dialog.
 * Please use this provider inside of your body. It will render the children, 
 * the dialog and the background for the dialog.
 */
function MultiDialogProvider({ children }: { children: React.ReactNode }) {
    const { open, content, setContent, setOpenId, setOpen } = useMultiDialogStore()
    useEffect(() => {
        console.log(content)
    }, [content])
    return (
        <>
            {children}
            {/* The actuall dialog */}
            {open && content && (
                <>
                    <div className="w-full h-screen flex items-center justify-center fixed z-40 top-0">
                        <div className="w-full h-screen absolute bg-[#00000070] backdrop-brightness-75 " onClick={() => {
                            setContent(undefined)
                            setOpenId(undefined)
                            setOpen(false)
                        }} onKeyDown={() => {
                            setContent(undefined)
                            setOpenId(undefined)
                            setOpen(false)
                        }} />
                        <div className="absolute z-50">
                            {content}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}


/**
 *   This component is only for the look in your codebase, this means, all is nice together.
 */
function MultiDialog({ children }: { children: React.ReactNode }) {
    return (
        <IdContext.Provider value={Math.random()}>
            {children}
        </IdContext.Provider>
    )
}

/**
 * The Multi-dialog trigger, this is a button which will automatic show the dialog.
 */
interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}
function MultiDialogTrigger({ children, ...props }: TriggerProps) {
    const { open, setOpen, setOpenId, openId } = useMultiDialogStore()
    const id = useContext(IdContext)
    useEffect(() => {
        console.log(openId)
    }, [openId])
    return (
        <button type="button" {...props} onClick={(e) => {
            setOpen(!open)
            setOpenId(id)

            // running the onClick prop
            if (props.onClick) {
                props.onClick(e)
            }
        }}>
            {children}
        </button>
    )
}


/**
 * The Multi-dialog content. This component will not render. The content
 * will be used inside an other element, which will be rendered on the root
 * of the react tree.
 */
function MultiDialogContent({ children }: { children: React.ReactNode }) {
    const { open, openId, setContent } = useMultiDialogStore()
    const id = useContext(IdContext)

    useEffect(() => {
        if (open && openId === id) {
            setContent(children)
        }
    }, [children, open, setContent, openId, id])

    return <>
    </>
}

// export all of the components
export { MultiDialog, MultiDialogProvider, MultiDialogTrigger, MultiDialogContent }