import {
  PDFDocumentPlainObject,
  splitPDFToChunkDocuments,
} from '../domain/splitPDFToChunkDocuments';
import { getRelevantDocuments } from '../infra/getRelevantDocuments';
import { Client } from './Client';

export type SubmitAction = (formData: FormData) => Promise<
  | {
      relevantDocuments: PDFDocumentPlainObject[];
    }
  | undefined
>;

/**
 *
 * @see https://github.com/arafipro/next-langchain-sample
 * @see https://qiita.com/windows222/items/232f05bafa95a9c8874e
 * @see https://colab.research.google.com/drive/1n0qtXXUdHdK376VjFM-rtAR9PWIPjNXi?usp=sharing
 * @see https://flowbite.com/docs/typography/text/#pre-line
 */
export default async function Home() {
  const submitAction: SubmitAction = async (formData) => {
    'use server';
    const file = formData.get('pdf-input');
    const question = formData.get('prompt-textarea');
    if (
      !file ||
      typeof file === 'string' || // -> File
      typeof question !== 'string'
    )
      return;

    const chunckDocuments = await splitPDFToChunkDocuments(file, {
      chunkSize: 512,
      chunkOverlap: 24,
    });
    const relevantDocuments = await getRelevantDocuments({
      question,
      documents: chunckDocuments,
      limit: 5,
      // mock: true,
    });

    return {
      relevantDocuments: relevantDocuments.map((doc) => ({ ...doc })), // serialize
    };
  };

  return (
    <main className="py-4 md:py-6">
      <h1 className="text-center text-3xl text-gray-800 dark:text-gray-200">
        PDF Question AI
      </h1>
      <Client submitAction={submitAction} />
    </main>
  );
}
