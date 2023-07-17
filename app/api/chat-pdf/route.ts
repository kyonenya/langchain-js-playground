import { OpenAIStream, StreamingTextResponse } from 'ai';
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from 'openai-edge';
import { getQAPrompt } from '../../../domain/promptTemplates';
import { PDFDocumentPlainObject } from '../../../domain/splitPDFToChunkDocuments';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages as ChatCompletionRequestMessage[];
  const relevantDocuments = body.relevantDocuments as PDFDocumentPlainObject[];

  const prompt = await getQAPrompt(
    messages.at(-1)?.content ?? '',
    relevantDocuments
  );

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message, index) =>
      index === messages.length - 1
        ? { ...message, content: prompt } // latest message
        : message
    ),
  });

  // // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // // Respond with the stream
  return new StreamingTextResponse(stream);
}
