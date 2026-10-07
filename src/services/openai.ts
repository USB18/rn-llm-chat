import OpenAI from 'openai';
import { Message } from '../types';
import { scrubPII } from '../utils/scrubPII';
import { verifyResponse } from '../utils/verifyResponse';

const MODEL = 'gemini-3.5-flash-lite';
const SYSTEM_PROMPT = 'You are a helpful assistant.';
const HISTORY_LIMIT = 10;

let client: OpenAI | null = null;

// Created on first use so a missing key surfaces as a chat error, not a crash at startup.
function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      dangerouslyAllowBrowser: true,
    });
  }
  return client;
}

export async function sendChat(
  message: string,
  previous: Message[],
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY is empty. Set it in .env and restart Metro.',
    );
  }

  const response = await getClient().chat.completions.create({
    model: MODEL,
    tool_choice: 'auto',
    reasoning_effort: 'medium',
    // stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      // Error bubbles are UI only; the model never said them.
      ...previous
        .filter(m => !m.isError)
        .slice(-HISTORY_LIMIT)
        .map(m => ({ role: m.role, content: scrubPII(m.text) })),
      { role: 'user', content: scrubPII(message) },
    ],
  });

  return verifyResponse(response);
}

type ErrorBody = { error?: { message?: string }; message?: string };

// Gemini wraps errors in an array ([{ error: { message } }]), which the SDK
// can't parse, so its own message is raw JSON. Dig the readable text out.
export function getErrorMessage(e: unknown): string {
  if (e instanceof OpenAI.APIError) {
    const raw = e.error as ErrorBody | ErrorBody[] | undefined;
    const body = Array.isArray(raw) ? raw[0] : raw;
    const message = body?.error?.message ?? body?.message;
    if (typeof message === 'string') {
      return message;
    }
  }
  return e instanceof Error ? e.message : String(e);
}
