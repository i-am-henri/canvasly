import LoginForm from "~/components/auth/login-form";
import Header from "~/components/elements/header";

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="absolute top-0">
                <Header />
            </div>
            <LoginForm />
        </div>
    )
}