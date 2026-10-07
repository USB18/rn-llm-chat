import { z } from 'zod';

// The parts of a chat completion we rely on. Extra provider fields are ignored.
const ChatResponseSchema = z.object({
  choices: z
    .array(
      z.object({
        finish_reason: z.string().nullish(),
        message: z.object({
          content: z.string().nullish(),
        }),
      }),
    )
    .min(1),
});

// Checks the response has the expected shape, then applies content rules:
// not blocked by a safety filter, not empty, and flags answers cut off by the length limit.
export function verifyResponse(response: unknown): string {
  const parsed = ChatResponseSchema.safeParse(response);
  if (!parsed.success) {
    console.warn(
      'Unexpected chat response shape:',
      z.prettifyError(parsed.error),
    );
    throw new Error(
      'The model returned an unexpected response. Please try again.',
    );
  }

  const { finish_reason, message } = parsed.data.choices[0];
  const content = message.content?.trim();

  if (finish_reason === 'content_filter') {
    throw new Error(
      "The response was blocked by the provider's safety filter.",
    );
  }
  if (!content) {
    throw new Error('The model returned an empty response. Please try again.');
  }
  if (finish_reason === 'length') {
    return `${content}\n\n[Response was cut off because it reached the length limit.]`;
  }
  return content;
}
