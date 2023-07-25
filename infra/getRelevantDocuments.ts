import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PDFDocument, toJSONSerializable } from '../domain/PDFDocument';
import { sampleRelevantDocuments } from './getRelevantDocuments.sample';

const openAIApiKey = process.env.OPENAI_API_KEY;

export const getRelevantDocuments = async ({
  question,
  documents,
  limit,
  mock = false,
}: {
  question: string;
  documents: PDFDocument[];
  limit: number;
  mock?: boolean;
}) => {
  if (mock) return sampleRelevantDocuments;

  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );
  const relevantDocuments = await vectorStore.similaritySearch(question, limit);
  return toJSONSerializable(relevantDocuments);
};
