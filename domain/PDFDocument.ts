import { Document } from 'langchain/dist/document';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  RecursiveCharacterTextSplitter,
  RecursiveCharacterTextSplitterParams,
} from 'langchain/text_splitter';

export type PDFChunkMetadata = {
  source: string;
  blobType?: string;
  pdf: {
    version: string;
    info: Record<string, unknown>;
    metadata: unknown;
    totalPages: number;
  };
  loc: {
    pageNumber: number;
    lines: { from: number; to: number };
  };
};

// JSON-serializable plain object
export type PDFDocument = Pick<
  InstanceType<typeof Document<PDFChunkMetadata>>,
  'metadata' | 'pageContent'
>;

export const toJSONSerializable = (documents: Document[]) =>
  documents.map((doc) => ({ ...doc })) as PDFDocument[]; // class -> plain object

export const parsePDF = async (filePathOrBlob: string | Blob) => {
  const loader = new PDFLoader(filePathOrBlob, { splitPages: true });
  const pdfDocuments = await loader.load();
  return toJSONSerializable(pdfDocuments);
};

export const splitToChunkDocuments = async (
  documents: PDFDocument[],
  params: Partial<RecursiveCharacterTextSplitterParams>
) => {
  const splitter = new RecursiveCharacterTextSplitter(params);

  return (await splitter.createDocuments(
    documents.map((doc) => doc.pageContent),
    documents.map((doc) => doc.metadata)
  )) as PDFDocument[];
};
