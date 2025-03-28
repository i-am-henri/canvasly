import RegisterForm from '@/components/auth/register-form';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="grid xl:grid-cols-[525px_1fr_525px]">
      {/* Top Columns */}
      <div className="lg:h-32 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 hidden xl:block  border-b  border-b-[#d4d4d4]" />
      <div className="lg:h-32 hidden xl:block  border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Content and middle columns */}
      <div className="lg:h-64 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />

      <div className="lg:h-[768px] border-b row-span-3 p-5 space-y-5 relative  border-b-[#d4d4d4]">
        <Image alt="Logo" width={40} height={40} src="/logo.svg" />
        <h2 className="text-[24px] leading-7">
          Create a new account. By doing that, you agree to our{' '}
          <Link href="/tos" className="underline mx-1">
            TOS
          </Link>
          and{' '}
          <Link href={'/privacy-policy'} className="underline mx-1">
            Privacy Policy
          </Link>
          . We are using cookies to store every sensible authentication
          information. We do not using cookies for tracking. You data is safe,
          and would never be given to third party providers. If you already have
          an account, you can{' '}
          <Link className="underline" href="/auth/login">
            login
          </Link>{' '}
          yourself.
        </h2>
        <RegisterForm />
        <Link
          href={'/'}
          className="underline text-neutral-700 bottom-5 left-5 absolute"
        >
          Go back
        </Link>
      </div>

      {/* Bars on the side. These are the bigger ones. */}
      <div className="lg:h-64 hidden xl:block  border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 hidden xl:block  border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-64 hidden xl:block  border-b border-l border-l-[#d4d4d4] border-b-[#d4d4d4]" />

      {/* Bottom Columns */}
      <div className="lg:h-32 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
      <div className="lg:h-32 hidden xl:block  border-b border-r border-r-[#d4d4d4] border-b-[#d4d4d4]" />
    </div>
  );
}
