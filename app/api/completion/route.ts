import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

/**
 * Completion API Routes
 * @see https://sdk.vercel.ai/docs/guides/openai#use-the-completion-api
 */

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    prompt,
    max_tokens: 524, // ex. 2644 characters
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
