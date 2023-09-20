import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Common/Button';
import { ErrorFallbackProps } from './ErrorFallback.interface';

export const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      role="alert"
      className="absolute left-1/2 top-1/2 flex w-11/12 max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md bg-red-200 px-4 py-6 text-red-800 sm:px-10"
    >
      <h2 className="text-3xl font-bold">Oops!</h2>
      <p className="pt-4 text-center text-sm leading-6">
        It seems something went wrong, Sorry for the inconvenience. <br /> We
        suggest you reload the page or click the <strong>try again</strong>{' '}
        button to resolve the issue.
      </p>
      {process.env.NODE_ENV === 'development' ||
      process.env.APP_STAGING === 'true' ? (
        <pre className="mt-5 whitespace-pre-line bg-white px-5 py-3">
          {error.message}
        </pre>
      ) : null}

      <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
        <Button
          onClick={resetErrorBoundary}
          isDisabled={false}
          haveAnimation
          className="bg-[#9b1c1c] px-8 py-3 text-[#fff]"
        >
          Try again
        </Button>

        <Link
          href="/"
          className="rounded-md bg-[#2c1c0f] px-6 py-3 text-orange-400 transition-all hover:opacity-75 focus:ring"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};
