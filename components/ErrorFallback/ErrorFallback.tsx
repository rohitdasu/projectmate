import { Button } from '../Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

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
      <Button
        onClick={resetErrorBoundary}
        isDisabled={false}
        haveAnimation
        className="mt-7 py-3 px-8"
      >
        Try again
      </Button>
    </div>
  );
};
