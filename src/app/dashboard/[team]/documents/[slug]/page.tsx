export default async function Document({
    params
}: {
    params: {
        slug: string
    }
}) {
    return (
        <div>
            {params.slug}
        </div>
    )
}