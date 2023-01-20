import Link from 'next/link';
import { Button } from '../Button';
import { ErrorFallbackProps } from './ErrorFallback.interface';

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div
      role="alert"
      className="absolute top-1/2 left-1/2 flex max-w-[70ch] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md bg-red-200 py-6 px-10 text-red-800"
    >
      <h2 className="text-3xl font-bold">Oops!</h2>
      <p className="pt-4 text-center text-sm leading-6">
        It seems something went wrong, Sorry for the inconvenience. <br /> We
        suggest you reload the page or click the <strong>try again</strong>{' '}
        button to resolve the issue.
      </p>
      {process.env.NODE_ENV === 'development' ||
      process.env.APP_STAGING === 'true' ? (
        <pre className="mt-5 bg-white py-3 px-5">{error.message}</pre>
      ) : null}

      <div className="mt-8 flex items-center gap-10">
        <Button
          onClick={resetErrorBoundary}
          isDisabled={false}
          haveAnimation
          className="bg-[#9b1c1c] py-3 px-8 text-[#fff] dark:bg-[#9b1c1c] dark:text-[#fff]"
        >
          Try again
        </Button>

        <Link
          href="/"
          className="rounded-md bg-[#2c1c0f] py-3 px-6 text-base text-orange-500 transition-all hover:opacity-75 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};
