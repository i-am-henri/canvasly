
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Svg from "./svg";

export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
        <h1 className="text-3xl text-center">We fixed presentations</h1>
        <p className="text-secondary mb-2 text-center text-sm text-[#808080]">For desktops, phones and tablets.</p>
        <div className="flex">
          <svg className="w-10 absolute top-[52vh] hidden sm:block sm:left-[24%] md:left-[30%] lg:left-[37%] xl:left-[40.5%] h-10 mr-5 " viewBox="0 0 155 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.23425 11.4706C2.95888 22.4268 8.74485 52.6144 13.2726 42.4896C16.2053 35.9319 19.7278 29.4742 22.5201 22.9103C26.2267 14.1975 25.6547 22.1938 28.052 27.9103C28.7813 29.6493 34.7482 43.5469 37.0669 36.421C39.6151 28.5898 41.3825 20.9744 47.1616 14.804C51.8581 9.78936 55.4994 19.0694 57.6274 22.4452C63.7019 32.0819 63.3756 29.3529 66.3876 19.3887C67.2051 16.684 74.08 -0.121181 74.4445 0.739637C76.1767 4.83043 77.0939 10.2234 77.8279 14.5769C78.448 18.254 82.5655 42.7245 84.6722 28.9126C85.8721 21.0458 93.565 -1.08979 93.8255 6.86372C93.998 12.1324 91.156 28.7049 97.8623 30.906C101.409 32.07 106.387 27.7962 109.358 26.4984C116.981 23.1681 125.175 20.0126 133.313 18.2148C136.06 17.6079 154.712 17.6977 154.167 12.3122C153.729 7.98598 145.55 -2.07876 143.978 6.12724C142.839 12.072 141.897 17.9113 139.891 23.6523C139.732 24.1086 136.304 33.8258 136.37 33.8296C140.247 34.051 151.87 17.6529 153.037 13.464" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Link href={"/register"}>
            <Button>
              start now
            </Button>
          </Link>
          <Link href="/login">
            <Button className="ml-2">
              login
            </Button>
          </Link>
        </div>
        <div className="absolute flex bottom-3 *:text-[#808080]">
          <Link href={"/"}>home</Link>
          <Svg />
          <Link href={"/pricing"}>pricing</Link>
          <Svg />
          <Link className="" href={"/features"}>
            features
          </Link>
        </div>
      </section>
    </div>
  )
}