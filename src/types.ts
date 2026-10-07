export type AttachmentKind = 'image' | 'video';

export type Attachment = {
  id: string;
  kind: AttachmentKind;
  uri: string;
  fileName?: string;
  width?: number;
  height?: number;
  /** Video length in seconds. */
  duration?: number;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  isError?: boolean;
  attachments?: Attachment[];
};
