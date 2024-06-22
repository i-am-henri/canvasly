"use server"

// biome-ignore lint: donÄt work otherwise
import { Object } from "fabric/fabric-impl";

export async function update(content: { version: string; objects: Object[]; } | undefined) {
    content
}