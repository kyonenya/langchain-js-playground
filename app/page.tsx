import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
} from 'langchain/text_splitter';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { loadQAMapReduceChain } from 'langchain/chains';

/**
 *
 * @see https://github.com/arafipro/next-langchain-sample
 * @see https://qiita.com/windows222/items/232f05bafa95a9c8874e
 * @see https://colab.research.google.com/drive/1n0qtXXUdHdK376VjFM-rtAR9PWIPjNXi?usp=sharing
 */
export default async function Home() {
  const loader = new PDFLoader('public/pg.pdf', { splitPages: false });
  const pdfDocuments = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 24,
  });
  const chunkDocuments = await splitter.createDocuments(
    pdfDocuments.map((pd) => pd.pageContent),
  );

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const store = await MemoryVectorStore.fromDocuments(
    chunkDocuments,
    embeddings,
  );

  const question = 'What is the name of your company?'; // 会社名は何ですか？
  const relevantDocs = await store.similaritySearch(question);
  const chain = loadQAMapReduceChain(model);
  // const res = await chain.call({
  //   input_documents: relevantDocs,
  //   question,
  // });

  return (
    <main>
      <h1 className="text-center text-3xl">langchain</h1>
      {/* <p className="text-center pt-2">{res.text}</p> */}
    </main>
  );
}
