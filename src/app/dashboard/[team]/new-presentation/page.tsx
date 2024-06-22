import NewPresentationForm from "~/components/dashboard/new-presentation-form";

export default function NewPresentation({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const teamName = searchParams?.team

    return (
        <div className="min-h-screen flex items-center justify-center">
            <NewPresentationForm name={teamName} />
        </div>
    )

}