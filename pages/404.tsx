import type { NextPage } from 'next';
import { SharedLayout } from '@/components';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <SharedLayout title="Find your project mate online">
      <div className="text-center">
        <p className="mb-3 text-7xl">
          4<span className="text-6xl text-primary-color">0</span>4
        </p>
        <p className="mb-6 px-2">
          Sorry! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mx-auto block w-full max-w-max rounded-md border-0 bg-green-900  py-3 px-6 font-semibold text-green-50 opacity-75 shadow transition-all hover:opacity-100 md:w-auto md:text-lg"
        >
          Back to homepage
        </Link>
      </div>
    </SharedLayout>
  );
};

export default NotFound;
