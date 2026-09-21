const BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const headers = {
  "Content-Type": "application/json",
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
};

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type TimeMachinePersona =
  | "father-time"
  | "original"
  | "talk-history"
  | "black-history"
  | "native-history"
  | "unwritten-history";

export class TimeMachineServiceError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TimeMachineServiceError";
    this.status = status;
  }
}

export function isCreditLimitError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const status = error instanceof TimeMachineServiceError ? error.status : 0;
  return (
    status === 402 ||
    status === 429 ||
    /credit|quota|billing|payment|insufficient|usage limit|rate limit/i.test(error.message)
  );
}

async function readSSE(
  body: ReadableStream<Uint8Array>,
  onEvent: (payload: any) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      for (const line of part.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          onEvent(JSON.parse(data));
        } catch {
          /* ignore partial frames */
        }
      }
    }
  }
}

/** Streams Father Time's story. Calls onDelta with each new piece of text. */
export async function streamStory(
  persona: TimeMachinePersona,
  messages: ChatMessage[],
  onDelta: (text: string) => void,
): Promise<void> {
  const res = await fetch(`${BASE}/father-time-chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({ persona, messages }),
  });

  if (!res.ok || !res.body) {
    const info = await res.json().catch(() => ({}));
    throw new TimeMachineServiceError(info.error ?? "The time machine could not respond.", res.status);
  }

  await readSSE(res.body, (payload) => {
    if (payload?.type === "response.output_text.delta" && payload.delta) {
      onDelta(payload.delta as string);
    }
  });
}

/** Renders a 16:9 image of the current scene. Returns a data URL. */
export async function generateVision(
  persona: TimeMachinePersona,
  prompt: string,
): Promise<string> {
  const res = await fetch(`${BASE}/father-time-image`, {
    method: "POST",
    headers,
    body: JSON.stringify({ persona, prompt }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.image) {
    throw new TimeMachineServiceError(data.error ?? "The vision could not be rendered.", res.status);
  }
  return data.image as string;
}

/** Splits long narration into TTS-sized pieces at sentence boundaries. */
export function chunkForSpeech(text: string, maxWords = 300): string[] {
  const clean = text.replace(/[*_#`]/g, "");
  const wordCount = (s: string) => (s.match(/\S+/g) ?? []).length;
  const sentences = clean.match(/[^.!?]+[.!?]*\s*/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  const flush = () => {
    if (current.trim()) chunks.push(current.trim());
    current = "";
  };
  for (const sentence of sentences) {
    if (wordCount(sentence) > maxWords) {
      flush();
      const words = sentence.match(/\S+/g) ?? [];
      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
      }
      continue;
    }
    if (current && wordCount(current) + wordCount(sentence) > maxWords) flush();
    current += sentence;
  }
  flush();
  return chunks;
}

export class TimeVoice {
  private ctx: AudioContext | null = null;
  private sources: AudioBufferSourceNode[] = [];
  private controller: AbortController | null = null;
  private playhead = 0;
  private stopped = false;

  stop() {
    this.stopped = true;
    this.controller?.abort();
    this.controller = null;
    this.sources.forEach((s) => {
      try {
        s.stop();
      } catch {
        /* already stopped */
      }
    });
    this.sources = [];
    this.playhead = 0;
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }

  async speak(persona: TimeMachinePersona, text: string) {
    this.stop();
    this.stopped = false;
    const ctx = new AudioContext({ sampleRate: 24000 });
    this.ctx = ctx;
    if (ctx.state === "suspended") await ctx.resume().catch(() => {});
    this.controller = new AbortController();
    const signal = this.controller.signal;

    for (const chunk of chunkForSpeech(text)) {
      if (this.stopped) return;
      const res = await fetch(`${BASE}/father-time-voice`, {
        method: "POST",
        headers,
        body: JSON.stringify({ persona, text: chunk }),
        signal,
      });
      if (!res.ok || !res.body) {
        const info = await res.json().catch(() => ({}));
        throw new TimeMachineServiceError(info.error ?? "The voice of time is silent right now.", res.status);
      }

      let pending = new Uint8Array(0);
      await readSSE(res.body, (payload) => {
        if (payload?.type !== "speech.audio.delta" || !payload.audio) return;
        if (this.stopped || !this.ctx) return;
        const binary = atob(payload.audio);
        const incoming = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) incoming[i] = binary.charCodeAt(i);
        const bytes = new Uint8Array(pending.length + incoming.length);
        bytes.set(pending);
        bytes.set(incoming, pending.length);
        const usable = bytes.length - (bytes.length % 2);
        pending = bytes.slice(usable);
        if (usable === 0) return;
        const samples = new Int16Array(bytes.buffer, 0, usable / 2);
        const floats = Float32Array.from(samples, (s) => s / 32768);
        const buffer = ctx.createBuffer(1, floats.length, 24000);
        buffer.copyToChannel(floats, 0);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        this.playhead =
          this.playhead === 0
            ? ctx.currentTime + 0.08
            : Math.max(this.playhead, ctx.currentTime);
        source.start(this.playhead);
        this.playhead += buffer.duration;
        this.sources.push(source);
      });
    }
  }
}
