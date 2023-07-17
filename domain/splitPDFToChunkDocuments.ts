import { Document } from 'langchain/dist/document';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  RecursiveCharacterTextSplitter,
  RecursiveCharacterTextSplitterParams,
} from 'langchain/text_splitter';

export type PDFChunkMetadata = {
  source: string;
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
export type PDFDocumentPlainObject = Pick<
  InstanceType<typeof Document<PDFChunkMetadata>>,
  'metadata' | 'pageContent'
>;

export const splitPDFToChunkDocuments = async (
  filePathOrBlob: string | Blob,
  params: Partial<RecursiveCharacterTextSplitterParams>
) => {
  const loader = new PDFLoader(filePathOrBlob, { splitPages: true });
  const pdfDocuments = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter(params);

  return (await splitter.createDocuments(
    pdfDocuments.map((doc) => doc.pageContent),
    pdfDocuments.map((doc) => doc.metadata)
  )) as Document<PDFChunkMetadata>[];
};
