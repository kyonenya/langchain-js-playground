import { getQAPrompt } from '../domain/promptTemplates';
import {
  PDFDocumentPlainObject,
  splitPDFToChunkDocuments,
} from '../domain/splitPDFToChunkDocuments';
import { getRelevantDocuments } from '../infra/getRelevantDocuments';
import { Client } from './Client';

export type SubmitAction = (formData: FormData) => Promise<
  | {
      prompt: string;
      relevantDocuments: PDFDocumentPlainObject[];
    }
  | undefined
>;

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
      chunkSize: 3000,
      chunkOverlap: 150,
    });
    const relevantDocuments = await getRelevantDocuments({
      question,
      documents: chunckDocuments,
      limit: 5,
      // mock: true,
    });
    const prompt = await getQAPrompt(question, relevantDocuments);

    return {
      prompt,
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
