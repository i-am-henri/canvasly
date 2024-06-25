"use server"

// biome-ignore lint: don't work otherwise
import { Object } from "fabric/fabric-impl";

export async function update(content: { version: string; objects: Object[]; } | undefined) {
    content
}