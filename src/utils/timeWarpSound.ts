let activeContext: AudioContext | null = null;

const tone = (
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  duration: number,
  from: number,
  to: number,
  volume: number,
  type: OscillatorType,
) => {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(to, 1), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.08, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
};

export const stopTimeWarpSound = () => {
  if (!activeContext) return;
  void activeContext.close().catch(() => undefined);
  activeContext = null;
};

export const playTimeWarpSound = () => {
  stopTimeWarpSound();
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  activeContext = ctx;
  const master = ctx.createGain();
  const compressor = ctx.createDynamicsCompressor();
  const now = ctx.currentTime + 0.02;
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.3, now + 0.12);
  master.gain.setValueAtTime(0.3, now + 1.55);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.25);
  master.connect(compressor);
  compressor.connect(ctx.destination);

  tone(ctx, master, now, 0.42, 72, 145, 0.2, 'sawtooth');
  tone(ctx, master, now + 0.18, 1.4, 105, 920, 0.12, 'sine');
  tone(ctx, master, now + 0.62, 0.95, 190, 1480, 0.08, 'triangle');
  tone(ctx, master, now + 1.48, 0.72, 980, 155, 0.16, 'sawtooth');
  tone(ctx, master, now + 1.82, 0.35, 1320, 260, 0.12, 'sine');

  window.setTimeout(() => {
    if (activeContext === ctx) stopTimeWarpSound();
  }, 2500);
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}