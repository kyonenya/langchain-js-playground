import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const Container = (props: PropsWithChildren<{ className?: string }>) => (
  <div
    className={twMerge(
      'container mx-auto px-4 py-6 md:max-w-2xl lg:max-w-[38rem] lg:px-0 xl:max-w-3xl',
      props.className
    )}
  >
    {props.children}
  </div>
);
