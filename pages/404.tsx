import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: NextPage = () => {
  return (
    <SharedLayout
      title="Page not found"
      topBar={false}
      bottomBar={false}
      leftSidebar={false}
    >
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8">
        <section className="flex flex-col items-center justify-center gap-4">
          <ShieldAlert className="h-20 w-20 md:h-32 md:w-32" />
          <p className="text-center text-base md:text-lg">
            Sorry! The page you are looking for does not exist.
          </p>
        </section>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </SharedLayout>
  );
};

export default NotFound;
