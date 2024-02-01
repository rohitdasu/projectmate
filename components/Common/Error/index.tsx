import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { BUTTON_TEXT } from '../Constants/textLabels';

export const ErrorPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p className="text-base md:text-lg">Something went wrong</p>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (window) {
              window.location.reload();
            }
          }}
        >
          {BUTTON_TEXT.retry}
        </Button>
        <Button asChild variant={'secondary'}>
          <Link href={'/'}>{BUTTON_TEXT.home}</Link>
        </Button>
      </div>
    </div>
  );
};
