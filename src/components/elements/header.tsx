import { ChevronRight, HandCoins } from "lucide-react";
import Link from "next/link";
import Button from "../ui/button";

export default function Header() {
    return (
        <div className="bg-transparent lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px] flex justify-between items-center mt-5 mx-[100px]">
            <h2 className="font-medium">canvasly</h2>
            <nav className="md:flex space-x-3">
                <Link href="/pricing">
                    Pricing
                </Link>
                <Link href="/features">
                    Features
                </Link>
                <Link href="/login">
                    Login
                </Link>
            </nav>
            <Link href="/register">
                <Button variant="primary">
                    Register
                </Button>
            </Link>
        </div>
    )
}