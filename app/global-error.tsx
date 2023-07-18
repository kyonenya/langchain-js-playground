'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from './_components/Button';

/**
 * Error Page (Global)
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="container mx-auto my-auto flex items-center px-6 py-12 lg:py-20">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="text-md font-medium text-rose-500">500 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Internal Server Error
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {error.message ?? 'Sorry, something went wrong.'}
          </p>
          <div className="mt-6 flex w-full items-center justify-center">
            <Button
              variant={{ color: 'danger' }}
              className="w-auto px-5 py-2"
              onClick={reset}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
