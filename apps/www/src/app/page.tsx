import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid xl:grid-cols-[525px_1fr_525px]">
      {/* Top Columns */}
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b  border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Content and middle columns */}
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />

      <div className="lg:h-[1024px] border-b row-span-4 p-5 space-y-5  border-b-[#d4d4d4]">
        <Image alt="Logo" width={40} height={40} src="/logo.svg" />
        <h3 className="text-[24px] leading-7">
          Create outstanding presentations with a simple online tool - Canvasly
          is designed for maximum of creativity, pared with AI for content, and
          premium templates for your design. Create what you want, what you
          think, and what you need - free for everyone.
        </h3>
        <div className="flex items-center justify-center h-80 group cursor-pointer">
          {/* Image stack */}
          <Image
            alt="Dashboard Image 1"
            src="/images/dashboard1.png"
            className="absolute z-10 border-2 border-[#efefef] rounded-lg rotate-[-4deg] transition group-hover:scale-105"
            width={310}
            height={310}
          />
          <Image
            alt="Dashboard Image 2"
            className="absolute z-20 border-2 border-[#efefef] rounded-lg rotate-[-1deg] transition group-hover:scale-105"
            src="/images/dashboard2.png"
            width={300}
            height={300}
          />
          <Image
            alt="Dashboard Image 3"
            className="absolute z-30 border-2 border-[#efefef] rounded-lg rotate-[6deg] transition group-hover:scale-105"
            src="/images/dashboard3.png"
            width={300}
            height={300}
          />
          <div className="backdrop-blur-md group-hover:bg-[#000000b4] transition text-white cursor-pointer absolute z-40 bg-[#0000008a] rounded-xl py-2 px-5">
            See More
          </div>
        </div>
        <h3 className="text-[24px] leading-7">
          A powerful editor pared with a great UX and UI. Canvasly is carefully
          designed and programmed, to work perfect on every device.
        </h3>
        <div className="flex space-x-5 items-center">
          <Link
            href="/auth/register"
            className="px-5 py-2 bg-neutral-200 hover:bg-neutral-300 transition"
            type="button"
          >
            Start Now
          </Link>
          <Link href="/auth/register">Sign In</Link>
        </div>
        <h3 className="text-[24px] leading-7">
          For students and everyone else.
        </h3>
        <h3 className="text-[24px] leading-7">
          Canvasly is free - and there’s a reason for this. Not everyone can
          afford $10 per month for an presentation editor, but Canvasly is made
          for everyone. So it’s free to use.
        </h3>
        <footer className="flex items-center justify-between">
          <p>
            Made by{' '}
            <Link href="https://henri.is" target="_blank" className="underline">
              henri
            </Link>
            .
          </p>
          <div className="flex items-center space-x-5">
            <Link className="underline" href="/tos">
              TOS
            </Link>
            <Link className="underline" href="/privacy-policy">
              Pricacy Policy
            </Link>
          </div>
        </footer>
      </div>

      {/* Bars on the side. These are the bigger ones. */}
      <div className="lg:h-64 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Bottom Columns */}
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
    </div>
  );
}
