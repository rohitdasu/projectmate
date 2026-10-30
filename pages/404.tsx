import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

const NotFound: NextPage = () => {
  return (
    <SharedLayout title="Page not found">
      <div className="flex min-h-dvh flex-col items-center justify-center px-5 py-12">
        <section className="w-full max-w-xl border-2 border-[#0f0f0f] bg-white p-8 text-center shadow-[7px_7px_0_0_#0044ff] md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-[#0f0f0f] bg-[#eaf0ff] text-[#0044ff]">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
            404 · Wrong turn
          </p>
          <h1 className="font-display text-3xl font-black uppercase md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
            Sorry! The page you are looking for does not exist.
          </p>
          <Button
            asChild
            className="mt-8 h-auto rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] px-5 py-3 font-display text-xs font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> {BUTTON_TEXT.goHome}
            </Link>
          </Button>
        </section>
      </div>
    </SharedLayout>
  );
};

export default NotFound;
