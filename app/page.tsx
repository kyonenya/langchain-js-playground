import {
  PDFDocument,
  parsePDF,
  splitToChunkDocuments,
} from '../domain/PDFDocument';
import { isJapaneseString } from '../domain/isJapaneseString';
import { getQAPrompt } from '../domain/promptTemplates';
import { getRelevantDocuments } from '../infra/getRelevantDocuments';
import { Client } from './Client';

export type SubmitAction = (formData: FormData) => Promise<
  | {
      prompt: string;
      relevantDocuments: PDFDocument[];
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

    const pdfDocuments = await parsePDF(file);
    const splitParams = isJapaneseString(pdfDocuments[0].pageContent)
      ? { chunkSize: 1000, chunkOverlap: 100 } // Japanese
      : { chunkSize: 3000, chunkOverlap: 150 }; // English
    const chunckDocuments = await splitToChunkDocuments(
      pdfDocuments,
      splitParams
    );
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
