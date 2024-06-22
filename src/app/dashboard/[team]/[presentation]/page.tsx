import Editor from "~/components/editor/editor"

export default async function Presentation({
    params
}: {
    params: {
        presentation: string
    }
}) {
    // fetchs the presentation data
    
    return (
        <Editor />
    )
}