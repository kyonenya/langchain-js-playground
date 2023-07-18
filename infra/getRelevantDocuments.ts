import { Document } from 'langchain/dist/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PDFChunkMetadata } from '../domain/splitPDFToChunkDocuments';

const openAIApiKey = process.env.OPENAI_API_KEY;

export const sampleRelevantDocuments: Document<PDFChunkMetadata>[] = [
  {
    pageContent:
      'RCM19\n] a free-form conversational dataset\nand performs worst (13 F1 below an ELMo baseline) on QuAC [\nCHI\n+\n18\n] a dataset which requires modeling structured\ndialog acts and answer span selections of teacher-student interactions. On DROP [\nDWD\n+\n19\n], a dataset testing discrete\nreasoning and numeracy in the context of reading comprehension, GPT-3 in a few-shot setting outperforms the fine-tuned\nBERT baseline from the original paper but is still well below both human performance and state-of-the-art approaches\nwhich augment neural networks with symbolic systems [\nRLL\n+\n19\n]. On SQuAD 2.0 [\nRJL18\n], GPT-3 demonstrates its\nfew-shot learning capabilities, improving by almost 10 F1 (to 69.8) compared to a zero-shot setting. This allows it to\nslightly outperform the best fine-tuned result in the original paper. On RACE [\nLXL\n+\n17\n], a multiple choice dataset of\nmiddle school and high school english examinations, GPT-3 performs relatively weakly and is only competitive with\nthe earliest work utilizing contextual representations and is still 45% behind SOTA.\n3.7    SuperGLUE\nIn order to better aggregate results on NLP tasks and compare to popular models such as BERT and RoBERTa in a\nmore systematic way, we also evaluate GPT-3 on a standardized collection of datasets, the SuperGLUE benchmark\n[\nWPN\n+\n19\n] [\nWPN\n+\n19\n] [\nCLC\n+\n19\n] [\nDMST19\n] [\nRBG11\n] [\nKCR\n+\n18\n] [\nZLL\n+\n18\n] [\nDGM06\n] [\nBHDD\n+\n06\n] [\nGMDD07\n]\n[\nBDD\n+\n09\n] [\nPCC18\n] [\nPHR\n+\n18\n]. GPT-3’s test-set performance on the SuperGLUE dataset is shown in Table 3.8. In the\nfew-shot setting, we used 32 examples for all tasks, sampled randomly from the training set. For all tasks except WSC\n18',
    metadata: {
      source: 'blob',
      blobType: 'application/pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.5',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: '',
          Author: '',
          Subject: '',
          Keywords: '',
          Creator: 'LaTeX with hyperref package',
          Producer: 'pdfTeX-1.40.17',
          CreationDate: 'D:20200724000408Z',
          ModDate: 'D:20200724000408Z',
          Trapped: { name: 'False' },
        },
        metadata: null,
        totalPages: 75,
      },
      loc: { pageNumber: 18, lines: { from: 100, to: 177 } },
    },
  },
  {
    pageContent:
      '•\nLanguage modeling:\nWe found the 4 Wikipedia language modeling benchmarks measured in GPT-2, plus the\nChildren’s Book Test dataset, to be almost entirely contained in our training data. Since we cannot reliably\nextract a clean subset here, we do not report results on these datasets, even though we intended to when starting\nthis work. We note that Penn Tree Bank due to its age was unaffected and therefore became our chief language\nmodeling benchmark.\nWe also inspected datasets where contamination was high, but the impact on performance was close to zero, simply\nto verify how much actual contamination existed.  These appeared to often contain false positives.  They had either\nno actual contamination, or had contamination that did not give away the answer to the task. One notable exception\nwas LAMBADA, which appeared to have substantial genuine contamination, yet the impact on performance was very\nsmall, with the clean subset scoring within 0.5% of the full dataset. Also, strictly speaking, our fill-in-the-blank format\nprecludes the simplest form of memorization. Nevertheless, since we made very large gains on LAMBADA in this\npaper, the potential contamination is noted in the results section.\nAn important limitation of our contamination analysis is that we cannot be sure that the clean subset is drawn from the\nsame distribution as the original dataset. It remains possible that memorization inflates results but at the same time\nis precisely counteracted by some statistical bias causing the clean subset to be easier.  However, the sheer number\nof shifts close to zero suggests this is unlikely, and we also observed no noticeable difference in the shifts for small\nmodels, which are unlikely to be memorizing.\nOverall, we have made a best effort to measure and document the effects of data contamination, and to note or outright\nremove problematic results, depending on the severity. Much work remains to be done to address this important and\nsubtle issue for the field in general, both when designing benchmarks and when training models. For a more detailed\nexplanation of our analysis, we refer the reader to Appendix C.\n5    Limitations\nGPT-3 and our analysis of it have a number of limitations. Below we describe some of these and suggest directions for\nfuture work.\nFirst,  despite the strong quantitative and qualitative improvements of GPT-3,  particularly compared to its direct\npredecessor GPT-2, it still has notable weaknesses in text synthesis and several NLP tasks. On text synthesis, although\nthe overall quality is high, GPT-3 samples still sometimes repeat themselves semantically at the document level, start to\nlose coherence over sufficiently long passages, contradict themselves, and occasionally contain non-sequitur sentences\nor paragraphs. We will release a collection of 500 uncurated unconditional samples to help provide a better sense of',
    metadata: {
      source: 'blob',
      blobType: 'application/pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.5',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: '',
          Author: '',
          Subject: '',
          Keywords: '',
          Creator: 'LaTeX with hyperref package',
          Producer: 'pdfTeX-1.40.17',
          CreationDate: 'D:20200724000408Z',
          ModDate: 'D:20200724000408Z',
          Trapped: { name: 'False' },
        },
        metadata: null,
        totalPages: 75,
      },
      loc: { pageNumber: 33, lines: { from: 1, to: 31 } },
    },
  },
  {
    pageContent:
      'defined only once. We also show that in the few-shot setting, GPT-3 can generate synthetic news articles which human\nevaluators have difficulty distinguishing from human-generated articles.\nAt the same time, we also find some tasks on which few-shot performance struggles, even at the scale of GPT-3. This\nincludes natural language inference tasks like the ANLI dataset, and some reading comprehension datasets like RACE\nor QuAC. By presenting a broad characterization of GPT-3’s strengths and weaknesses, including these limitations, we\nhope to stimulate study of few-shot learning in language models and draw attention to where progress is most needed.\nA heuristic sense of the overall results can be seen in Figure 1.3, which aggregates the various tasks (though it should\nnot be seen as a rigorous or meaningful benchmark in itself).\n5',
    metadata: {
      source: 'blob',
      blobType: 'application/pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.5',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: '',
          Author: '',
          Subject: '',
          Keywords: '',
          Creator: 'LaTeX with hyperref package',
          Producer: 'pdfTeX-1.40.17',
          CreationDate: 'D:20200724000408Z',
          ModDate: 'D:20200724000408Z',
          Trapped: { name: 'False' },
        },
        metadata: null,
        totalPages: 75,
      },
      loc: { pageNumber: 5, lines: { from: 30, to: 38 } },
    },
  },
  {
    pageContent:
      'Figure 3.9: Performance of GPT-3 on ANLI Round 3.\nResults are on the dev-set, which has only 1500 examples\nand therefore has high variance (we estimate a standard deviation of 1.2%). We find that smaller models hover around\nrandom chance, while few-shot GPT-3 175B closes almost half the gap from random chance to SOTA. Results for\nANLI rounds 1 and 2 are shown in the appendix.\nwhether the second sentence logically follows from the first, contradicts the first sentence, or is possibly true (neutral).\nSuperGLUE includes an NLI dataset, RTE, which evaluates the binary version of the task. On RTE, only the largest\nversion of GPT-3 performs convincingly better than random (56%) in any evaluation setting, but in a few-shot setting\nGPT-3 performs similarly to a single-task fine-tuned BERT Large.   We also evaluate on the recently introduced\nAdversarial Natural Language Inference (ANLI) dataset [\nNWD\n+\n19\n]. ANLI is a difficult dataset employing a series of\nadversarially mined natural language inference questions in three rounds (R1, R2, and R3). Similar to RTE, all of our\nmodels smaller than GPT-3 perform at almost exactly random chance on ANLI, even in the few-shot setting (\n∼\n33%\n),\nwhereas GPT-3 itself shows signs of life on Round 3. Results for ANLI R3 are highlighted in Figure 3.9 and full results\nfor all rounds can be found in Appendix H. These results on both RTE and ANLI suggest that NLI is still a very difficult\ntask for language models and they are only just beginning to show signs of progress.\n3.9    Synthetic and Qualitative Tasks\nOne way to probe GPT-3’s range of abilities in the few-shot (or zero- and one-shot) setting is to give it tasks which\nrequire it to perform simple on-the-fly computational reasoning, recognize a novel pattern that is unlikely to have\noccurred in training, or adapt quickly to an unusual task. We devise several tasks to test this class of abilities. First, we\ntest GPT-3’s ability to perform arithmetic. Second, we create several tasks that involve rearranging or unscrambling the\nletters in a word, tasks which are unlikely to have been exactly seen during training. Third, we test GPT-3’s ability to\nsolve SAT-style analogy problems few-shot. Finally, we test GPT-3 on several qualitative tasks, including using new\nwords in a sentence, correcting English grammar, and news article generation. We will release the synthetic datasets\nwith the hope of stimulating further study of test-time behavior of language models.\n3.9.1    Arithmetic\nTo test GPT-3’s ability to perform simple arithmetic operations without task-specific training, we developed a small\nbattery of 10 tests that involve asking GPT-3 a simple arithmetic problem in natural language:\n•\n2 digit addition (2D+)\n– The model is asked to add two integers sampled uniformly from\n[0\n,\n100)\n, phrased in\nthe form of a question, e.g. “Q: What is 48 plus 76? A: 124.”\n•\n2 digit subtraction (2D-)\n– The model is asked to subtract two integers sampled uniformly from\n[0\n,\n100)\n; the',
    metadata: {
      source: 'blob',
      blobType: 'application/pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.5',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: '',
          Author: '',
          Subject: '',
          Keywords: '',
          Creator: 'LaTeX with hyperref package',
          Producer: 'pdfTeX-1.40.17',
          CreationDate: 'D:20200724000408Z',
          ModDate: 'D:20200724000408Z',
          Trapped: { name: 'False' },
        },
        metadata: null,
        totalPages: 75,
      },
      loc: { pageNumber: 21, lines: { from: 1, to: 49 } },
    },
  },
  {
    pageContent:
      'Figure 4.1: GPT-3 Training Curves\nWe measure model performance during training on a deduplicated validation\nsplit of our training distribution. Though there is some gap between training and validation performance, the gap grows\nonly minimally with model size and training time, suggesting that most of the gap comes from a difference in difficulty\nrather than overfitting.\nalthough models did perform moderately better on data that overlapped between training and testing, this did not\nsignificantly impact reported results due to the small fraction of data which was contaminated (often only a few percent).\nGPT-3 operates in a somewhat different regime. On the one hand, the dataset and model size are about two orders of\nmagnitude larger than those used for GPT-2, and include a large amount of Common Crawl, creating increased potential\nfor contamination and memorization. On the other hand, precisely due to the large amount of data, even GPT-3 175B\ndoes not overfit its training set by a significant amount, measured relative to a held-out validation set with which it was\ndeduplicated (Figure 4.1). Thus, we expect that contamination is likely to be frequent, but that its effects may not be as\nlarge as feared.\nWe initially tried to address the issue of contamination by proactively searching for and attempting to remove any overlap\nbetween our training data and the development and test sets of all benchmarks studied in this paper. Unfortunately, a\nbug resulted in only partial removal of all detected overlaps from the training data. Due to the cost of training, it wasn’t\nfeasible to retrain the model.  To address this, we investigate in detail how the remaining detected overlap impacts\nresults.\nFor each benchmark, we produce a ‘clean’ version which removes all potentially leaked examples, defined roughly as\nexamples that have a 13-gram overlap with anything in the pretraining set (or that overlap with the whole example when\nit is shorter than 13-grams). The goal is to very conservatively flag anything that could potentially be contamination,\nso as to produce a clean subset that is free of contamination with high confidence. The exact procedure is detailed in\nAppendix C.\nWe then evaluate GPT-3 on these clean benchmarks, and compare to the original score.  If the score on the clean\nsubset is similar to the score on the entire dataset, this suggests that contamination, even if present, does not have a\nsignificant effect on reported results.  If the score on the clean subset is lower, this suggests contamination may be\ninflating the results. The results are summarized in Figure 4.2. Although potential contamination is often high (with a\nquarter of benchmarks scoring over 50%), in most cases performance changes only negligibly, and we see no evidence\nthat contamination level and performance difference are correlated. We conclude that either our conservative method\nsubstantially overestimated contamination or that contamination has little effect on performance.',
    metadata: {
      source: 'blob',
      blobType: 'application/pdf',
      pdf: {
        version: '1.10.100',
        info: {
          PDFFormatVersion: '1.5',
          IsAcroFormPresent: false,
          IsXFAPresent: false,
          Title: '',
          Author: '',
          Subject: '',
          Keywords: '',
          Creator: 'LaTeX with hyperref package',
          Producer: 'pdfTeX-1.40.17',
          CreationDate: 'D:20200724000408Z',
          ModDate: 'D:20200724000408Z',
          Trapped: { name: 'False' },
        },
        metadata: null,
        totalPages: 75,
      },
      loc: { pageNumber: 31, lines: { from: 1, to: 30 } },
    },
  },
];

export const getRelevantDocuments = async ({
  question,
  documents,
  limit,
  mock = false,
}: {
  question: string;
  documents: Document<PDFChunkMetadata>[];
  limit: number;
  mock?: boolean;
}) => {
  if (mock) return sampleRelevantDocuments;

  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );
  return (await vectorStore.similaritySearch(
    question,
    limit
  )) as Document<PDFChunkMetadata>[];
};
