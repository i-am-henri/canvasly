import Header from "~/components/elements/header";
import Button from "~/components/ui/button";

export default function Register() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="absolute top-0">
                <Header />
            </div>
            <form className=" flex flex-col justify-center  space-y-2 lg:w-[400px]">
                <h2 className="text-xl font-medium">Register</h2>
                <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" placeholder="Username" type="text" name="username"  />
                <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" type="email" name="email" placeholder="Email" />
                <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" type="password" name="password" placeholder="Password" />
                <input className="border-b border-b-[#DBDBDB] ring-1 ring-[#DBDBDB] px-2 py-1 rounded-sm outline-none" type="password" name="repassword" placeholder="Repeat Password" />
                <Button type="submit"  className="w-min mt-10"> 
                    Submit
                </Button>
            </form>
        </div>
    )
}