'use client';

import { useCompletion } from 'ai/react';
import type PSPDFKitClass from 'pspdfkit';
import {
  useState,
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { PDFDocument } from '../domain/PDFDocument';
import { readFileAsArrayBuffer } from '../domain/utils';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    completion,
    isLoading: isChatLoading,
    complete,
    setCompletion,
  } = useCompletion({
    api: '/api/completion',
  });
  const [relevantDocuments, setRelevantDocuments] = useState<PDFDocument[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit: typeof PSPDFKitClass;
    if (!container) return;

    (async function () {
      PSPDFKit = (await import('pspdfkit')) as unknown as typeof PSPDFKitClass;
      // PSPDFKit.unload(container);

      const instance = await PSPDFKit.load({
        disableWebAssemblyStreaming: true,
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: './kyonenya2019.pdf',
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });

      const textLineIndex = 0;
      const textLines = await instance.textLinesForPageIndex(textLineIndex);
      textLines.forEach((textLine, textLineIndex) => {
        // console.log(`Content for text line ${textLineIndex}`);
        // console.log(`Text: ${textLine.contents}`);
        // console.log(textLine.contents);
        // console.log(JSON.stringify(textLine.contents));
        // console.log(Array.from(textLine.contents));
        // console.log(`Id: ${textLine.id}`);
        // console.log(`Page index: ${textLine.pageIndex}`);
      });
      const text = textLines.map((textLine) => textLine.contents).join('\n');
      console.log(text);
    })();

    return () => {
      PSPDFKit && PSPDFKit.unload(container);
    };
  }, []);

  return (
    <>
      <Container>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const PSPDFKit = (await import('pspdfkit')) as any;
            const instance = await PSPDFKit.load({
              container: 'body',
              document: await readFileAsArrayBuffer(
                formData.get('pdf-input') as File
              ),
            });
            const textLines = await instance.textLinesForPageIndex(0);
            console.log(textLines);

            setIsFormLoading(true);
            setCompletion('');
            setRelevantDocuments([]);

            // const { prompt, relevantDocuments } =
            //   (await props.submitAction?.(formData)) ?? {};

            // setIsFormLoading(false);
            // setRelevantDocuments(relevantDocuments ?? []);

            // if (!prompt) return;
            // await complete(prompt);
          }}
        >
          <div className="mb-2 flex flex-row items-center space-x-1.5">
            <h2 className="font-semibold">Upload PDF file</h2>
            <span className="text-xs">(～4.5MB)</span>
          </div>

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
                  {isChatLoading && <Loader />}
                </span>
              </button>
            </div>
          </div>
        </form>
      </Container>

      <div className="group min-h-[80px] w-full border-b border-t border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100">
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

      <div ref={containerRef} className="h-[50px]" />
    </>
  );
};
