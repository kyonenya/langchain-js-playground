import {
  cloneElement,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex w-full items-center justify-center rounded-md p-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 disabled:cursor-not-allowed',
  variants: {
    color: {
      default:
        'bg-[#edf2f7] enabled:hover:bg-gray-200 disabled:opacity-60 dark:bg-gray-700 dark:text-gray-300 enabled:dark:hover:bg-gray-600 ',
      warning:
        'bg-[#edf2f7] font-semibold text-red-500 enabled:hover:bg-gray-200 disabled:opacity-60 dark:bg-gray-700 dark:text-rose-500 enabled:dark:hover:bg-gray-600',
      emerald:
        'bg-emerald-500 text-white enabled:hover:bg-emerald-600 disabled:opacity-40 dark:bg-emerald-600 enabled:hover:dark:bg-emerald-500',
      blue: 'bg-blue-500 text-white enabled:hover:bg-blue-600 disabled:opacity-40 dark:bg-sky-600 enabled:hover:dark:bg-sky-500',
      danger:
        'bg-red-500 text-white enabled:hover:bg-red-600 disabled:opacity-40 dark:bg-red-600 enabled:dark:hover:bg-red-500',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

/**
 * Button (with Icon)
 *
 * You can add left and right icons to the Button component using the leftIcon and rightIcon props respectively.
 * @see https://chakra-ui.com/docs/components/button#button-with-icon
 */
export const Button = forwardRef(function _Button(
  {
    variant,
    leftIcon,
    rightIcon,
    children,
    ...props
  }: {
    variant?: VariantProps<typeof button>;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
  } & ComponentProps<'button'>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={twMerge(button(variant), props.className)}
      ref={ref}
    >
      {leftIcon &&
        cloneElement(leftIcon, {
          className: twMerge('mr-2 h-5 w-5', leftIcon.props.className),
        })}
      {children}
      {rightIcon &&
        cloneElement(rightIcon, {
          className: twMerge('ml-2 h-5 w-5', rightIcon.props.className),
        })}
    </button>
  );
});
