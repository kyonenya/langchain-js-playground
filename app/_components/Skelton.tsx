import { twMerge } from 'tailwind-merge';

/**
 * Skelton
 *
 * @see https://flowbite.com/docs/components/skeleton/#default-skeleton
 */
export const Skelton = (props: { className?: string }) => {
  return (
    <div role="status" className={twMerge('animate-pulse', props.className)}>
      {/* <div className="mb-4 h-2.5 max-w-[40%] rounded-full bg-gray-200 dark:bg-gray-700"></div> */}
      <div className="mb-2.5 h-2 max-w-[82.5%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[90%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[75%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[67.5%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 max-w-[75%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      {/* <div className="h-2 max-w-[70%] rounded-full bg-gray-200 dark:bg-gray-700"></div> */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
