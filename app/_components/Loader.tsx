import { twMerge } from 'tailwind-merge';

export const Loader = (props: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-gray-700 dark:fill-white', props.className)}
    >
      <circle opacity="0.3" cx="2" cy="8" r="2">
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1s"
          values="0.3;1;0.3"
          repeatCount="indefinite"
        />
      </circle>
      <circle opacity="0.3" cx="8" cy="8" r="2">
        <animate
          attributeName="opacity"
          begin="0.2s"
          dur="1s"
          values="0.3;1;0.3"
          repeatCount="indefinite"
        />
      </circle>
      <circle opacity="0.3" cx="14" cy="8" r="2">
        <animate
          attributeName="opacity"
          begin="0.4s"
          dur="1s"
          values="0.3;1;0.3"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
