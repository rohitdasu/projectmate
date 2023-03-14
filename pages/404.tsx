import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <SharedLayout title="Find your project mate online" hasContainer>
      <div className="text-center">
        <p className="mb-3 text-7xl">
          4<span className="text-6xl text-orange-400">0</span>4
        </p>
        <p className="mb-6">
          Sorry! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mx-auto block w-full max-w-max rounded-md border-0 bg-[#2c1c0f]  py-3 px-6 font-semibold text-orange-400 opacity-75 shadow ring-orange-800 transition-all hover:opacity-100 focus:ring md:w-auto md:text-lg"
        >
          Back to homepage
        </Link>
      </div>
    </SharedLayout>
  );
};

export default NotFound;
