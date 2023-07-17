'use client';

import { useCompletion } from 'ai/react';
import { Fragment, useState } from 'react';
import { PDFDocumentPlainObject } from '../domain/splitPDFToChunkDocuments';
import { SubmitAction } from './page';

export const Client = (props: { submitAction?: SubmitAction }) => {
  const { completion, complete, stop, isLoading } = useCompletion({
    api: '/api/completion',
  });
  const [relevantDocuments, setRelevantDocuments] = useState<
    PDFDocumentPlainObject[]
  >([]);

  return (
    <>
      <form
        action={async (formData) => {
          const { prompt, relevantDocuments } =
            (await props.submitAction?.(formData)) ?? {};
          setRelevantDocuments(relevantDocuments ?? []);
          await complete(prompt ?? '');
        }}
      >
        <h2 className="mb-2 mt-4 font-semibold text-gray-800 dark:text-gray-200">
          Upload PDF file
        </h2>

        <input
          required
          name="pdf-input"
          type="file"
          accept="application/pdf"
          className="mb-4 block max-w-4xl cursor-pointer rounded-sm border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        />

        <div className="mx-auto flex flex-row gap-3">
          <div className="shadow-xs dark:shadow-xs relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white py-[10px] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white md:py-4 md:pl-4">
            <textarea
              required
              name="prompt-textarea"
              tabIndex={0}
              rows={4}
              placeholder="Send a message"
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-3 pr-10 outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 md:pr-12"
            />
            <button
              disabled={false /* TODO */}
              className="absolute bottom-1.5 right-2 rounded-md p-1 text-white transition-colors  enabled:bg-green-500 enabled:hover:bg-green-600 disabled:text-gray-400 disabled:opacity-40 enabled:dark:hover:bg-green-400 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 md:p-2"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="m-1 h-4 w-4 md:m-0"
                  stroke-width="2"
                >
                  <path
                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>

      <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        AI response
      </h2>
      <p className="min-h-[50px] whitespace-pre-line text-lg text-gray-700 dark:text-gray-300">
        {completion}
      </p>
      <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Relevant documents
      </h2>
      <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
        {relevantDocuments.map((doc, i) => (
          <li className="list-disc" key={i}>
            {doc.pageContent.split('\n').map((item, i, arr) => {
              return (
                <Fragment key={i}>
                  {item}
                  {i !== arr.length - 1 && (
                    <span className="text-slate-400 dark:text-slate-400">
                      \n
                    </span>
                  )}
                </Fragment>
              );
            })}
          </li>
        ))}
      </ul>
    </>
  );
};
