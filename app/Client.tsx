'use client';

import { useCompletion } from 'ai/react';
import { useState, Fragment, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { PDFDocumentPlainObject } from '../domain/splitPDFToChunkDocuments';
import { ChatGPTIcon } from './_components/ChatGPTIcon';
import { Loader } from './_components/Loader';
import { Skelton } from './_components/Skelton';
import { SubmitAction } from './page';

const Container = (props: PropsWithChildren<{ className?: string }>) => (
  <div
    className={twMerge(
      'container mx-auto px-4 py-6 md:max-w-2xl lg:max-w-[38rem] lg:px-0 xl:max-w-3xl',
      props.className
    )}
  >
    {props.children}
  </div>
);

export const Client = (props: { submitAction?: SubmitAction }) => {
  const {
    completion,
    isLoading: isChatLoading,
    complete,
  } = useCompletion({
    api: '/api/completion',
  });
  const [relevantDocuments, setRelevantDocuments] = useState<
    PDFDocumentPlainObject[]
  >([]);
  const [isFormLoading, setIsFormLoading] = useState(true);

  return (
    <>
      <Container>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsFormLoading(true);
            setRelevantDocuments([]);

            const formData = new FormData(e.target as HTMLFormElement);
            const { prompt, relevantDocuments } =
              (await props.submitAction?.(formData)) ?? {};
            setIsFormLoading(false);
            setRelevantDocuments(relevantDocuments ?? []);

            await complete(prompt ?? '');
          }}
        >
          <h2 className="mb-2 font-semibold">Upload PDF file</h2>

          <input
            required
            name="pdf-input"
            type="file"
            accept="application/pdf"
            className="mb-4 max-w-4xl cursor-pointer rounded-sm border border-gray-300 bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
          />

          <div className="mx-auto flex flex-row gap-3">
            <div className="relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white py-[10px] shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-none md:py-4 md:pl-4">
              <textarea
                required
                name="prompt-textarea"
                tabIndex={0}
                rows={3}
                placeholder="Send a message"
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-3 pr-10 outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 md:pr-12"
              />
              <button
                disabled={isFormLoading || isChatLoading}
                className="absolute bottom-1.5 right-2 h-8 w-8 rounded-md p-1  text-white transition-colors enabled:bg-green-500 enabled:hover:bg-green-600 disabled:text-gray-400 disabled:opacity-40 enabled:dark:hover:bg-green-400 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 md:p-2"
              >
                <span>
                  {!isChatLoading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="none"
                      strokeWidth="2"
                      className="m-1 h-4 w-4 md:m-0"
                    >
                      <path
                        d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                  {isChatLoading && (
                    <Loader width={25} height={7} className="" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      </Container>

      <div className="group min-h-[80px] w-full border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100">
        <Container>
          <div className="m-auto flex gap-4 px-4 text-base md:gap-6">
            {(isChatLoading || completion) && (
              <div className="relative flex flex-shrink-0 flex-col items-end">
                <div className="w-[30px]">
                  <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-green-500 p-1 text-white">
                    <ChatGPTIcon />
                  </div>
                </div>
              </div>
            )}
            <div className="relative flex flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col gap-3">
                <div className="flex min-h-[20px] flex-col items-start gap-4 overflow-x-auto whitespace-pre-wrap break-words">
                  <div className="w-full break-words">{completion}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {(isFormLoading || relevantDocuments.length > 0) && (
          <h2 className="mb-4 font-semibold">Relevant documents</h2>
        )}
        {relevantDocuments.length === 0 && isFormLoading && (
          <ol className="list-inside space-y-4 pl-4">
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
            <Skelton />
          </ol>
        )}
        {relevantDocuments.length > 0 && (
          <ol className="list-inside list-disc space-y-2 pl-4 text-sm">
            {relevantDocuments.map((doc, i) => (
              <li className="list-decimal" key={i}>
                {doc.pageContent.split('\n').map((item, i, arr) => {
                  return (
                    <Fragment key={i}>
                      {item}
                      {i !== arr.length - 1 && (
                        <span className="text-slate-300 dark:text-slate-400">
                          \n
                        </span>
                      )}
                    </Fragment>
                  );
                })}
              </li>
            ))}
          </ol>
        )}
      </Container>
    </>
  );
};
