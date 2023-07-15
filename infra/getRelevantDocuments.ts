import { Document } from 'langchain/dist/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PDFChunkMetadata } from '../domain/splitPDFToChunkDocuments';

const openAIApiKey = process.env.OPENAI_API_KEY;

export const sampleRelavantDocuments: Document<PDFChunkMetadata>[] = [
  {
    pageContent:
      'About Procter &amp; Gamble\nP&amp;G serves consumers around the world with one of the strongest portfolios of trusted, quality, \nleadership  brands,  including  Always®,  Ambi  Pur®,  Ariel®,  Bounty®,  Charmin®,  Crest®,  Dawn®, \nDowny®,  Fairy®,  Febreze®,  Gain®,  Gillette®,  Head  &amp;  Shoulders®,  Lenor®,  Olay®,  Oral-B®, \nPampers®, Pantene®, SK-II®, Tide®, Vicks®, and Whisper®. The P&amp;G community includes operations',
    metadata: {
      source: 'public/pg.pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.4',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: 'FY2223 Q3 JFM 8-K Exhibit 99.1',
          Author: 'anonymous',
          Creator: 'Workiva',
          Producer: 'Wdesk Fidelity Content Translations Version 007.006.039',
          CreationDate: "D:20230420233332+00'00'",
          ModDate: "D:20230420233332+00'00'",
        },
        metadata: null,
        totalPages: 15,
      },
      loc: { pageNumber: 7, lines: { from: 1, to: 5 } },
    },
  },
  {
    pageContent:
      'Executive Officer. “Our team’s strong execution of our strategies and our progress through three quarters \nenable us to raise our fiscal year outlook for sales growth and cash return to shareowners and maintain our \nguidance range for EPS growth despite continued cost and foreign exchange headwinds. We remain \ncommitted  to  our  integrated  strategies  of  a  focused  product  portfolio  of  daily  use  categories  where',
    metadata: {
      source: 'public/pg.pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.4',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: 'FY2223 Q3 JFM 8-K Exhibit 99.1',
          Author: 'anonymous',
          Creator: 'Workiva',
          Producer: 'Wdesk Fidelity Content Translations Version 007.006.039',
          CreationDate: "D:20230420233332+00'00'",
          ModDate: "D:20230420233332+00'00'",
        },
        metadata: null,
        totalPages: 15,
      },
      loc: { pageNumber: 1, lines: { from: 59, to: 62 } },
    },
  },
  {
    pageContent:
      '11%\nCorporate\n173\nN/A\n(268)\nN/A\n(114)\nN/A\nTotal Company\n$20,068\n4%\n$4,288\n5%\n$3,424\n2%\nThree Months Ended March 31, 2023\nNet Sales Drivers \n(1)\nVolume\nOrganic \nVolume\nForeign \nExchange\nPrice\nMix\nOther \n(2)\nNet Sales\nBeauty\n1%\n—%\n(5)%\n8%\n(1)%\n—%\n3%\nGrooming\n(1)%\n(1)%\n(6)%\n10%\n(2)%\n—%\n1%\nHealth Care\n1%\n1%\n(3)%\n6%\n3%\n(1)%\n6%\nFabric &amp; Home Care\n(5)%\n(5)%\n(4)%\n13%\n1%\n—%\n5%\nBaby, Feminine &amp; Family Care\n(4)%\n(4)%\n(3)%\n8%\n2%\n—%\n3%\nTotal Company\n(3)%\n(3)%\n(4)%\n10%\n1%\n—%\n4%\n(1)',
    metadata: {
      source: 'public/pg.pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.4',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: 'FY2223 Q3 JFM 8-K Exhibit 99.1',
          Author: 'anonymous',
          Creator: 'Workiva',
          Producer: 'Wdesk Fidelity Content Translations Version 007.006.039',
          CreationDate: "D:20230420233332+00'00'",
          ModDate: "D:20230420233332+00'00'",
        },
        metadata: null,
        totalPages: 15,
      },
      loc: { pageNumber: 9, lines: { from: 55, to: 131 } },
    },
  },
  {
    pageContent:
      'successfully responding to competitive factors such as prices, promotional incentives and trade terms for \nproducts; (8) the ability to manage and maintain key customer relationships; (9) the ability to protect our \nreputation and brand equity by successfully managing real or perceived issues, including concerns about \nsafety, quality, ingredients, efficacy, packaging content, supply chain practices or similar matters that may',
    metadata: {
      source: 'public/pg.pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.4',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: 'FY2223 Q3 JFM 8-K Exhibit 99.1',
          Author: 'anonymous',
          Creator: 'Workiva',
          Producer: 'Wdesk Fidelity Content Translations Version 007.006.039',
          CreationDate: "D:20230420233332+00'00'",
          ModDate: "D:20230420233332+00'00'",
        },
        metadata: null,
        totalPages: 15,
      },
      loc: { pageNumber: 6, lines: { from: 1, to: 4 } },
    },
  },
  {
    pageContent:
      'Section 21E of the Securities Exchange Act of 1934. These forward-looking statements generally are \nidentified  by  the  words  "believe,"  "project,"  "expect,"  "anticipate,"  "estimate,"  "intend,"  "strategy," \n"future," "opportunity," "plan," "may," "should," "will," "would," "will be," "will continue," "will likely \nresult"  and  similar  expressions.  Forward-looking  statements  are  based  on  current  expectations  and',
    metadata: {
      source: 'public/pg.pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.4',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: 'FY2223 Q3 JFM 8-K Exhibit 99.1',
          Author: 'anonymous',
          Creator: 'Workiva',
          Producer: 'Wdesk Fidelity Content Translations Version 007.006.039',
          CreationDate: "D:20230420233332+00'00'",
          ModDate: "D:20230420233332+00'00'",
        },
        metadata: null,
        totalPages: 15,
      },
      loc: { pageNumber: 5, lines: { from: 6, to: 9 } },
    },
  },
];

export const getRelevantDocuments = async (
  query: string,
  documents: Document<PDFChunkMetadata>[],
  k = 5
) => {
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );
  return (await vectorStore.similaritySearch(
    query,
    k
  )) as Document<PDFChunkMetadata>[];
};
