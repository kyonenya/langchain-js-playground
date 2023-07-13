import './globals.css';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from 'langchain/dist/document';
import { PromptTemplate } from 'langchain/prompts';
import { Configuration, OpenAIApi } from 'openai';

type PDFMetadata = { loc: { lines: { from: number; to: number } } };

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
  const chunkDocuments = (await splitter.createDocuments(
    pdfDocuments.map((pd) => pd.pageContent),
  )) as Document<PDFMetadata>[];

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const vectorStore = await MemoryVectorStore.fromDocuments(
    chunkDocuments,
    embeddings,
  );
  const question = 'What is the name of your company?'; // 会社名は何ですか？
  // const relevantDocs = (await vectorStore.similaritySearch(
  //   question,
  //   5,
  // )) as Document<PDFMetadata>[];
  // const relevantDocsPageContents = relevantDocs.map((doc) => doc.pageContent);
  const relevantDocsPageContents = [
    `About Procter & Gamble
  P&G serves consumers around the world with one of the strongest portfolios of trusted, quality,
  leadership brands, including Always®, Ambi Pur®, Ariel®, Bounty®, Charmin®, Crest®, Dawn®,
  Downy®, Fairy®, Febreze®, Gain®, Gillette®, Head & Shoulders®, Lenor®, Olay®, Oral-B®,
  Pampers®, Pantene®, SK-II®, Tide®, Vicks®, and Whisper®. The P&G community includes operations`,
    `Executive Officer. “Our team’s strong execution of our strategies and our progress through three quarters
  enable us to raise our fiscal year outlook for sales growth and cash return to shareowners and maintain our
  guidance range for EPS growth despite continued cost and foreign exchange headwinds. We remain
  committed to our integrated strategies of a focused product portfolio of daily use categories where`,
    `11%
  Corporate
  173
  N/A
  (268)
  N/A
  (114)
  N/A
  Total Company
  $20,068
  4%
  $4,288
  5%
  $3,424
  2%
  Three Months Ended March 31, 2023
  Net Sales Drivers
  (1)
  Volume
  Organic
  Volume
  Foreign
  Exchange
  Price
  Mix
  Other
  (2)
  Net Sales
  Beauty
  1%
  —%
  (5)%
  8%
  (1)%
  —%
  3%
  Grooming
  (1)%
  (1)%
  (6)%
  10%
  (2)%
  —%
  1%
  Health Care
  1%
  1%
  (3)%
  6%
  3%
  (1)%
  6%
  Fabric & Home Care
  (5)%
  (5)%
  (4)%
  13%
  1%
  —%
  5%
  Baby, Feminine & Family Care
  (4)%
  (4)%
  (3)%
  8%
  2%
  —%
  3%
  Total Company
  (3)%
  (3)%
  (4)%
  10%
  1%
  —%
  4%
  (1)`,
    `successfully responding to competitive factors such as prices, promotional incentives and trade terms for
  products; (8) the ability to manage and maintain key customer relationships; (9) the ability to protect our
  reputation and brand equity by successfully managing real or perceived issues, including concerns about
  safety, quality, ingredients, efficacy, packaging content, supply chain practices or similar matters that may`,
    `Section 21E of the Securities Exchange Act of 1934. These forward-looking statements generally are
  identified by the words "believe," "project," "expect," "anticipate," "estimate," "intend," "strategy,"
  "future," "opportunity," "plan," "may," "should," "will," "would," "will be," "will continue," "will likely
  result" and similar expressions. Forward-looking statements are based on current expectations and`,
  ];

  const promptTemplate = PromptTemplate.fromTemplate(
    `Given the following extracted parts of a long document and a question, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.

[QUESTION]: Which state/country's law governs the interpretation of the contract?
=========
[CONTENT]: This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.

[CONTENT]: No Waiver. Failure or delay in exercising any right or remedy under this Agreement shall not constitute a waiver of such (or any other)  right or remedy.\n\n11.7 Severability. The invalidity, illegality or unenforceability of any term (or part of a term) of this Agreement shall not affect the continuation  in force of the remainder of the term (if any) and this Agreement.\n\n11.8 No Agency. Except as expressly stated otherwise, nothing in this Agreement shall create an agency, partnership or joint venture of any  kind between the parties.\n\n11.9 No Third-Party Beneficiaries.

[CONTENT]: (b) if Google believes, in good faith, that the Distributor has violated or caused Google to violate any Anti-Bribery Laws (as  defined in Clause 8.5) or that such a violation is reasonably likely to occur,
=========
[FINAL ANSWER]: This Agreement is governed by English law.

[QUESTION]: What did the president say about Michael Jackson?
=========
[CONTENT]: Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans.  \n\nLast year COVID-19 kept us apart. This year we are finally together again. \n\nTonight, we meet as Democrats Republicans and Independents. But most importantly as Americans. \n\nWith a duty to one another to the American people to the Constitution. \n\nAnd with an unwavering resolve that freedom will always triumph over tyranny. \n\nSix days ago, Russia’s Vladimir Putin sought to shake the foundations of the free world thinking he could make it bend to his menacing ways. But he badly miscalculated. \n\nHe thought he could roll into Ukraine and the world would roll over. Instead he met a wall of strength he never imagined. \n\nHe met the Ukrainian people. \n\nFrom President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world. \n\nGroups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland.

[CONTENT]: And we won’t stop. \n\nWe have lost so much to COVID-19. Time with one another. And worst of all, so much loss of life. \n\nLet’s use this moment to reset. Let’s stop looking at COVID-19 as a partisan dividing line and see it for what it is: A God-awful disease.  \n\nLet’s stop seeing each other as enemies, and start seeing each other for who we really are: Fellow Americans.  \n\nWe can’t change how divided we’ve been. But we can change how we move forward—on COVID-19 and other issues we must face together. \n\nI recently visited the New York City Police Department days after the funerals of Officer Wilbert Mora and his partner, Officer Jason Rivera. \n\nThey were responding to a 9-1-1 call when a man shot and killed them with a stolen gun. \n\nOfficer Mora was 27 years old. \n\nOfficer Rivera was 22. \n\nBoth Dominican Americans who’d grown up on the same streets they later chose to patrol as police officers. \n\nI spoke with their families and told them that we are forever in debt for their sacrifice, and we will carry on their mission to restore the trust and safety every community deserves.

[CONTENT]: And a proud Ukrainian people, who have known 30 years  of independence, have repeatedly shown that they will not tolerate anyone who tries to take their country backwards.  \n\nTo all Americans, I will be honest with you, as I’ve always promised. A Russian dictator, invading a foreign country, has costs around the world. \n\nAnd I’m taking robust action to make sure the pain of our sanctions  is targeted at Russia’s economy. And I will use every tool at our disposal to protect American businesses and consumers. \n\nTonight, I can announce that the United States has worked with 30 other countries to release 60 Million barrels of oil from reserves around the world.  \n\nAmerica will lead that effort, releasing 30 Million barrels from our own Strategic Petroleum Reserve. And we stand ready to do more if necessary, unified with our allies.  \n\nThese steps will help blunt gas prices here at home. And I know the news about what’s happening can seem alarming. \n\nBut I want you to know that we are going to be okay.

[CONTENT]: More support for patients and families. \n\nTo get there, I call on Congress to fund ARPA-H, the Advanced Research Projects Agency for Health. \n\nIt’s based on DARPA—the Defense Department project that led to the Internet, GPS, and so much more.  \n\nARPA-H will have a singular purpose—to drive breakthroughs in cancer, Alzheimer’s, diabetes, and more. \n\nA unity agenda for the nation. \n\nWe can do this. \n\nMy fellow Americans—tonight , we have gathered in a sacred space—the citadel of our democracy. \n\nIn this Capitol, generation after generation, Americans have debated great questions amid great strife, and have done great things. \n\nWe have fought for freedom, expanded liberty, defeated totalitarianism and terror. \n\nAnd built the strongest, freest, and most prosperous nation the world has ever known. \n\nNow is the hour. \n\nOur moment of responsibility. \n\nOur test of resolve and conscience, of history itself. \n\nIt is in this moment that our character is formed. Our purpose is found. Our future is forged. \n\nWell I know this nation.
=========
[FINAL ANSWER]: The president did not mention Michael Jackson.

[QUESTION]: {question}
=========
{summaries}
=========
[FINAL ANSWER]:`,
  );
  const prompt = await promptTemplate.format({
    question,
    summaries: relevantDocsPageContents
      .map((content) => `[CONTENT]: ${content}......`)
      .join('\n\n'),
  });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // const response = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt,
  //   temperature: 0,
  //   max_tokens: 100,
  //   top_p: 1,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.0,
  // });

  // console.dir(response.data);
  // const aiResponse = response.data.choices[0].text
  const aiResponse = 'The name of the company is Procter & Gamble.';

  return (
    <main>
      <h1 className="text-center text-3xl text-gray-800 dark:text-gray-200">
        langchain
      </h1>
      <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        AI response
      </h2>
      <p className="text-gray-600 whitespace-pre-line dark:text-gray-300">
        {aiResponse}
      </p>
      <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        relevant documents
      </h2>
      <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
        {relevantDocsPageContents.map((text, i) => (
          <li className="list-disc" key={i}>
            {text}……
          </li>
        ))}
      </ul>
      <h2 className="mb-2 mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        prompt
      </h2>
      <p className="text-gray-600 text-sm whitespace-pre-line dark:text-gray-400">
        {prompt}
      </p>
    </main>
  );
}
