import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { BUTTON_TEXT } from '../Constants/textLabels';

export const ErrorPage = () => {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md border-2 border-[#0f0f0f] bg-white p-8 text-center shadow-[6px_6px_0_0_#0044ff]">
        <p className="font-display text-2xl font-black uppercase">
          Something went wrong
        </p>
        <p className="mt-2 text-sm text-gray-600">
          We couldn’t load this right now. Try again or head back to discovery.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            className="rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] font-display text-xs font-bold uppercase text-white hover:bg-[#0f0f0f]"
            onClick={() => {
              if (window) {
                window.location.reload();
              }
            }}
          >
            {BUTTON_TEXT.retry}
          </Button>
          <Button
            asChild
            variant={'secondary'}
            className="rounded-none border-2 border-[#0f0f0f] font-display text-xs font-bold uppercase"
          >
            <Link href={'/'}>{BUTTON_TEXT.home}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
