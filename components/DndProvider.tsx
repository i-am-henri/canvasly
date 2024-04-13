"use client"
import { DndContext } from "@dnd-kit/core";

export default function DndProvider({children}: {children: React.ReactNode}) {
  return (
    <DndContext>
      {children}
    </DndContext>
  )
}