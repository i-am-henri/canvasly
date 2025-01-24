import VerifyForm from '@/components/auth/verify-form';
import Image from 'next/image';
import Link from 'next/link';

export default function Verify() {
  return (
    <div className="grid xl:grid-cols-[525px_1fr_525px]">
      {/* Top Columns */}
      <div className="lg:h-32 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b  border-b-[#d4d4d4]" />
      <div className="lg:h-32 border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Content and middle columns */}
      <div className="lg:h-64 border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />

      <div className="lg:h-[768px] border-b row-span-3 p-5 space-y-5 relative  border-b-[#d4d4d4]">
        <Image alt="Logo" width={40} height={40} src="/logo.svg" />
        <h2 className="text-[24px] leading-7">
          We send you an email to your email address. Please use the code inside
          this email to verify your account. If you don't see the email, please
          check your spam for the code. If you still can't find it, you can
          order a new link{' '}
          <Link className="underline" href="#">
            here
          </Link>
          .
        </h2>
        <VerifyForm />
        <Link
          href={'/'}
          className="underline text-neutral-700 bottom-5 left-5 absolute"
        >
          Go back
        </Link>
      </div>

      {/* Bars on the side. These are the bigger ones. */}
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
