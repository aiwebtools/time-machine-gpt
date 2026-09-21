import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mic, MicOff, Volume2, Square, ImageIcon, Send, Loader2, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import InformationalDisclaimer from '@/components/InformationalDisclaimer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useSpeechInput } from '@/hooks/use-speech-input';
import { streamStory, generateVision, TimeVoice, type ChatMessage } from '@/lib/fatherTime';
import { timeMachineById, type TimeMachineId } from '@/data/timeMachines';

type Turn = ChatMessage & { image?: string };

type TimeMachinePageProps = { machineId?: TimeMachineId };

const FatherTime = ({ machineId = 'father-time' }: TimeMachinePageProps) => {
  const machine = timeMachineById[machineId];
  const [turns, setTurns] = useState<Turn[]>([{ role: 'assistant', content: machine.greeting }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [renderingIndex, setRenderingIndex] = useState<number | null>(null);
  const voiceRef = useRef<TimeVoice | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const { listening, supported: micSupported, toggle: toggleMic } = useSpeechInput((text) => {
    setInput((prev) => (prev ? `${prev} ${text}` : text));
  });

  useEffect(() => {
    document.title = `${machine.name} — Live AI Experience | TIME MACHINE GPT`;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const pageUrl = `${window.location.origin}${machine.path}`;
    description?.setAttribute('content', machine.description);
    canonical?.setAttribute('href', pageUrl);
    ogTitle?.setAttribute('content', `${machine.name} | TIME MACHINE GPT`);
    ogDescription?.setAttribute('content', machine.description);
    ogUrl?.setAttribute('content', pageUrl);
    twitterTitle?.setAttribute('content', `${machine.name} | TIME MACHINE GPT`);
    twitterDescription?.setAttribute('content', machine.description);
    voiceRef.current = new TimeVoice();
    return () => voiceRef.current?.stop();
  }, [machine.description, machine.name]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns]);

  const speak = async (index: number, text: string) => {
    const voice = voiceRef.current;
    if (!voice) return;
    if (speakingIndex === index) {
      voice.stop();
      setSpeakingIndex(null);
      return;
    }
    setSpeakingIndex(index);
    try {
      await voice.speak(machine.id, text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'The voice of time is silent.');
    } finally {
      setSpeakingIndex((current) => (current === index ? null : current));
    }
  };

  const renderVision = async (index: number, text: string) => {
    setRenderingIndex(index);
    try {
      const image = await generateVision(machine.id, text.slice(-1200));
      setTurns((prev) => prev.map((t, i) => (i === index ? { ...t, image } : t)));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'The vision could not be rendered.');
    } finally {
      setRenderingIndex(null);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    voiceRef.current?.stop();
    setSpeakingIndex(null);
    setInput('');
    setBusy(true);

    const history: Turn[] = [...turns, { role: 'user', content: text }];
    setTurns([...history, { role: 'assistant', content: '' }]);
    const replyIndex = history.length;

    try {
      let full = '';
      await streamStory(
        machine.id,
        history.map(({ role, content }) => ({ role, content })),
        (delta) => {
          full += delta;
          setTurns((prev) =>
            prev.map((t, i) => (i === replyIndex ? { ...t, content: full } : t)),
          );
        },
      );
      if (!full.trim()) {
        setTurns((prev) =>
          prev.map((t, i) =>
            i === replyIndex
              ? { ...t, content: 'The time stream flickered. Ask me again, traveler.' }
              : t,
          ),
        );
      } else if (autoSpeak) {
        void speak(replyIndex, full);
      }
    } catch (error) {
      setTurns((prev) => prev.filter((_, i) => i !== replyIndex));
      toast.error(error instanceof Error ? error.message : 'The time machine could not respond.');
    } finally {
      setBusy(false);
    }
  };

  const restart = () => {
    voiceRef.current?.stop();
    setSpeakingIndex(null);
    setTurns([{ role: 'assistant', content: machine.greeting }]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <StarryBackground containerRef={heroRef} />

      <main className="flex-1 relative z-10">
        <section
          ref={(el) => (heroRef.current = el)}
          className="container mx-auto px-4 pt-24 pb-6 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-glow text-time-accent mb-3">
            {machine.heading}
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300">
            {machine.description}
          </p>
        </section>

        <section className="container mx-auto px-3 md:px-6 pb-12 max-w-4xl">
          <div className="rounded-2xl border border-time-accent/30 bg-time-dark/80 backdrop-blur-sm shadow-[0_0_35px_rgba(212,175,55,0.15)] overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-time-accent/20">
              <span className="text-time-accent text-sm font-semibold tracking-wide">
                THE TIME PORTAL IS ACTIVE
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setAutoSpeak((v) => !v)}
                  className={cn(
                    'text-xs border',
                    autoSpeak
                      ? 'bg-time-accent text-time-dark border-time-accent hover:bg-time-accent/90'
                      : 'text-time-accent border-time-accent/40 hover:bg-time-accent/10',
                  )}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  {autoSpeak ? 'Narration on' : 'Narration off'}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={restart}
                  className="text-xs text-time-accent border border-time-accent/40 hover:bg-time-accent/10"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  New journey
                </Button>
              </div>
            </div>

            <div className="h-[48dvh] min-h-[320px] max-h-[560px] md:h-[52dvh] md:min-h-[420px] overflow-y-auto px-3 md:px-5 py-5 space-y-5">
              {turns.map((turn, index) => (
                <div
                  key={index}
                  className={cn(
                    'rounded-xl p-4 border',
                    turn.role === 'user'
                      ? 'ml-auto max-w-[85%] bg-time-accent/10 border-time-accent/30 text-gray-100'
                      : 'max-w-full bg-black/50 border-time-accent/20 text-gray-100',
                  )}
                >
                  {turn.role === 'assistant' && (
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-time-accent mb-2">
                      {machine.narrator}
                    </span>
                  )}
                  <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {turn.content ||
                      (busy && index === turns.length - 1 ? 'Charging the flux of ages…' : '')}
                  </p>

                  {turn.image && (
                    <img
                      src={turn.image}
                      alt={`A vision created during the ${machine.name} journey`}
                      className="mt-4 w-full rounded-lg border border-time-accent/30 aspect-video object-cover"
                      loading="lazy"
                    />
                  )}

                  {turn.role === 'assistant' && turn.content.length > 40 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => speak(index, turn.content)}
                        className="text-xs text-time-accent border border-time-accent/40 hover:bg-time-accent/10"
                      >
                        {speakingIndex === index ? (
                          <>
                            <Square className="h-3.5 w-3.5 mr-1" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3.5 w-3.5 mr-1" /> Hear it
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={renderingIndex === index}
                        onClick={() => renderVision(index, turn.content)}
                        className="text-xs text-time-accent border border-time-accent/40 hover:bg-time-accent/10"
                      >
                        {renderingIndex === index ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Painting…
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-3.5 w-3.5 mr-1" /> See where we stand
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-time-accent/20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4 bg-black/40">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                  placeholder={machine.inputPlaceholder}
                  rows={2}
                  className="resize-none bg-time-dark/70 border-time-accent/30 text-gray-100 placeholder:text-gray-500 focus-visible:ring-time-accent"
                />
                {micSupported && (
                  <Button
                    type="button"
                    onClick={toggleMic}
                    aria-label={listening ? 'Stop listening' : 'Speak your destination'}
                    className={cn(
                      'h-11 w-11 p-0 shrink-0 border',
                      listening
                        ? 'bg-red-600 text-white border-red-500 animate-pulse'
                        : 'bg-time-dark text-time-accent border-time-accent/50 hover:bg-time-accent/10',
                    )}
                  >
                    {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={send}
                  disabled={busy || !input.trim()}
                  className="h-11 px-4 shrink-0 bg-time-accent text-time-dark font-semibold hover:bg-time-accent/90 disabled:opacity-60"
                >
                  {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Stories are long — give {machine.narrator} a moment to write them. Voice narration and
                images are generated as you travel.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-time-accent text-sm underline underline-offset-4">
              Back to Time Machine GPT
            </Link>
          </div>
        </section>

        <InformationalDisclaimer />
      </main>

      <Footer />
    </div>
  );
};

export default FatherTime;
