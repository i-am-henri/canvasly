import RegisterForm from "~/components/auth/register-form";
import Header from "~/components/elements/header";
import Button from "~/components/ui/button";

export default function Register({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="absolute top-0">
                <Header />
            </div>
            <RegisterForm />
        </div>
    )
}