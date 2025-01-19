import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid xl:grid-cols-[525px_1fr_525px]">
      {/* Top Columns */}
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Content and middle columns */}
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />

      <div className="lg:h-screen border-b border-r row-span-6 p-5 space-y-5 border-r-[#d4d4d4] border-b-[#d4d4d4]">
        <Image alt="Logo" width={40} height={40} src="/logo.svg" />
        <h3 className="text-[24px] leading-7">
          Create outstanding presentations with a simple online tool - Canvasly
          is designed for maximum of creativity, pared with AI for content, and
          premium templates for your design. Create what you want, what you
          think, and what you need - free for everyone.
        </h3>
      </div>
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
    </div>
  );
}
