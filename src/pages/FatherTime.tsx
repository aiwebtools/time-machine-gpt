import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CalendarClock,
  ImageIcon,
  Loader2,
  MapPin,
  Mic,
  MicOff,
  RotateCcw,
  Rocket,
  Square,
  UserRound,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import InformationalDisclaimer from '@/components/InformationalDisclaimer';
import PortalCelebration from '@/components/time-machine/PortalCelebration';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageActions,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSpeechInput } from '@/hooks/use-speech-input';
import {
  streamStory,
  generateVision,
  isCreditLimitError,
  TimeVoice,
  type ChatMessage,
} from '@/lib/fatherTime';
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
  const [showCreditFallback, setShowCreditFallback] = useState(false);
  const [year, setYear] = useState('');
  const [destination, setDestination] = useState('');
  const [focus, setFocus] = useState('');
  const [burst, setBurst] = useState<{ key: number; variant: 'launch' | 'message' | 'arrival' }>({
    key: 0,
    variant: 'message',
  });
  const voiceRef = useRef<TimeVoice | null>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const latestReplyRef = useRef<HTMLDivElement | null>(null);

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
  }, [machine.description, machine.name, machine.path]);

  useEffect(() => {
    composerRef.current?.focus();
  }, [machine.id]);

  const celebrate = (variant: 'launch' | 'message' | 'arrival') => {
    setBurst({ key: Date.now(), variant });
  };

  const revealLatestReply = () => {
    window.setTimeout(() => {
      latestReplyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

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
      if (isCreditLimitError(error) && machine.externalUrl) setShowCreditFallback(true);
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
      celebrate('arrival');
    } catch (error) {
      if (isCreditLimitError(error) && machine.externalUrl) setShowCreditFallback(true);
      toast.error(error instanceof Error ? error.message : 'The vision could not be rendered.');
    } finally {
      setRenderingIndex(null);
    }
  };

  const send = async (messageText = input, effect: 'launch' | 'message' = 'message') => {
    const text = messageText.trim();
    if (!text || busy) return;
    voiceRef.current?.stop();
    setSpeakingIndex(null);
    setInput('');
    setBusy(true);
    celebrate(effect);

    const history: Turn[] = [...turns, { role: 'user', content: text }];
    setTurns([...history, { role: 'assistant', content: '' }]);
    const replyIndex = history.length;
    revealLatestReply();

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
      celebrate('arrival');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The time machine could not respond.';
      setTurns((prev) =>
        prev.map((turn, index) =>
          index === replyIndex
            ? { ...turn, content: `The portal could not answer: ${message}` }
            : turn,
        ),
      );
      if (isCreditLimitError(error) && machine.externalUrl) setShowCreditFallback(true);
      toast.error(message);
    } finally {
      setBusy(false);
      window.setTimeout(() => composerRef.current?.focus(), 80);
    }
  };

  const initializeJourney = () => {
    const yearValue = year.trim();
    const placeValue = destination.trim();
    if (!yearValue || !placeValue || busy) return;
    const focusValue = focus.trim();
    const openingPrompt = `Take me to ${yearValue}, in ${placeValue}.${
      focusValue ? ` I want to experience ${focusValue}.` : ''
    }`;
    void send(openingPrompt, 'launch');
  };

  const restart = () => {
    voiceRef.current?.stop();
    setSpeakingIndex(null);
    setTurns([{ role: 'assistant', content: machine.greeting }]);
    setInput('');
    setYear('');
    setDestination('');
    setFocus('');
    setShowCreditFallback(false);
    window.setTimeout(() => composerRef.current?.focus(), 80);
  };

  const journeyStarted = turns.some((turn) => turn.role === 'user');

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

        <section className="container mx-auto px-3 md:px-6 pb-12 max-w-5xl">
          <div className="travel-chat-shell relative overflow-hidden rounded-lg border border-journey-gold/45 bg-journey-surface/95 shadow-[0_20px_60px_hsl(var(--background)/0.9),0_0_38px_hsl(var(--journey-gold)/0.15)] backdrop-blur-sm">
            <PortalCelebration burstKey={burst.key} variant={burst.variant} />

            <div className="flex flex-col gap-3 border-b border-journey-gold/25 bg-journey-raised/90 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-journey-gold opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-journey-gold" />
                </span>
                <div className="text-left">
                  <span className="block text-sm font-semibold text-journey-gold">Time portal active</span>
                  <span className="block text-xs text-muted-foreground">Coordinates ready for {machine.narrator}</span>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setAutoSpeak((v) => !v)}
                  className={cn(
                    'h-11 w-full border text-xs sm:h-9 sm:w-auto',
                    autoSpeak
                      ? 'border-journey-gold bg-journey-gold text-journey-gold-foreground hover:bg-journey-gold/90'
                      : 'border-journey-gold/40 text-journey-gold hover:bg-journey-gold/10',
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
                  className="h-11 w-full border border-journey-gold/40 text-xs text-journey-gold hover:bg-journey-gold/10 sm:h-9 sm:w-auto"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  New journey
                </Button>
              </div>
            </div>

            <Conversation className="h-[52dvh] min-h-[390px] max-h-[680px] bg-journey-surface md:h-[58dvh] md:min-h-[500px]">
              <ConversationContent className="gap-6 px-4 py-6 md:px-7">
              {turns.map((turn, index) => (
                <Message
                  key={index}
                  from={turn.role}
                  ref={index === turns.length - 1 && turn.role === 'assistant' ? latestReplyRef : undefined}
                  className={cn(
                    'animate-fade-in',
                    turn.role === 'user' ? 'max-w-[88%] sm:max-w-[75%]' : 'max-w-full',
                  )}
                >
                  <MessageContent
                    className={cn(
                      'text-[15px] leading-7 md:text-base',
                      turn.role === 'user'
                        ? 'border border-journey-gold bg-journey-gold px-4 py-3 text-journey-gold-foreground shadow-[0_8px_24px_hsl(var(--journey-gold)/0.16)]'
                        : 'w-full overflow-visible border-l-2 border-journey-gold/70 pl-4 text-foreground',
                    )}
                  >
                    {turn.role === 'assistant' && (
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-journey-gold">
                        {machine.narrator}
                      </span>
                    )}
                    {turn.content ? (
                      <MessageResponse className="font-medium text-foreground [&_p]:my-3 [&_p]:text-foreground [&_li]:text-foreground first:[&_p]:mt-0 last:[&_p]:mb-0">
                        {turn.content}
                      </MessageResponse>
                    ) : busy && index === turns.length - 1 ? (
                      <Shimmer className="text-sm font-medium">Charging the flux of ages…</Shimmer>
                    ) : null}

                    {turn.image && (
                      <div className="mt-4 overflow-hidden rounded-md border border-journey-gold/40 shadow-[0_12px_32px_hsl(var(--background)/0.8)]">
                        <img
                          src={turn.image}
                          alt={`A vision created during the ${machine.name} journey`}
                          className="aspect-video w-full object-cover animate-fade-in"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </MessageContent>

                  {turn.role === 'assistant' && turn.content.length > 40 && (
                    <MessageActions className="grid w-full grid-cols-2 gap-2 sm:flex">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => speak(index, turn.content)}
                        className="h-11 border border-journey-gold/40 text-xs text-journey-gold hover:bg-journey-gold/10 sm:h-9"
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
                        className="h-11 border border-journey-gold/40 text-xs text-journey-gold hover:bg-journey-gold/10 sm:h-9"
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
                    </MessageActions>
                  )}
                </Message>
              ))}
              </ConversationContent>
              <ConversationScrollButton className="border-journey-gold/40 bg-journey-raised text-journey-gold hover:bg-journey-gold/10" />
            </Conversation>

            <div className="border-t border-journey-gold/25 bg-journey-raised p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-5">
              {showCreditFallback && machine.externalUrl && (
                <div className="mb-4 border border-journey-gold/55 bg-journey-gold/10 p-4 text-left shadow-[0_10px_28px_hsl(var(--background)/0.5)]" role="status">
                  <p className="font-semibold text-journey-gold">This INSITE VERSION has reached its AI usage limit.</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/85">
                    Your journey does not have to stop. Continue with the original {machine.externalPlatform} version in a new window.
                  </p>
                  <Button asChild className="mt-3 h-auto min-h-11 w-full whitespace-normal bg-journey-gold py-2 text-center font-bold text-journey-gold-foreground hover:bg-journey-gold/90 sm:w-auto">
                    <a href={machine.externalUrl} target="_blank" rel="noopener noreferrer">
                      Try original {machine.externalPlatform} version
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
              {!journeyStarted && (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    initializeJourney();
                  }}
                  className="mb-4 rounded-md border border-journey-gold/35 bg-journey-surface p-4 shadow-[inset_0_1px_0_hsl(var(--journey-gold)/0.14),0_12px_28px_hsl(var(--background)/0.6)]"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-journey-gold/40 bg-journey-gold/10 text-journey-gold">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-base font-semibold text-foreground">Initialize your journey</h2>
                      <p className="text-xs leading-5 text-muted-foreground">Set two coordinates, then open the portal.</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-left text-xs font-semibold text-journey-gold">
                      Year or era
                      <span className="relative mt-1.5 block">
                        <CalendarClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-composer-muted" />
                        <Input
                          value={year}
                          onChange={(event) => setYear(event.target.value)}
                          placeholder="Example: 1963"
                          className="h-12 border-journey-gold/50 bg-composer pl-10 text-base text-composer-foreground placeholder:text-composer-muted focus-visible:ring-journey-gold"
                        />
                      </span>
                    </label>
                    <label className="text-left text-xs font-semibold text-journey-gold">
                      Destination
                      <span className="relative mt-1.5 block">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-composer-muted" />
                        <Input
                          value={destination}
                          onChange={(event) => setDestination(event.target.value)}
                          placeholder="Example: Washington, D.C."
                          className="h-12 border-journey-gold/50 bg-composer pl-10 text-base text-composer-foreground placeholder:text-composer-muted focus-visible:ring-journey-gold"
                        />
                      </span>
                    </label>
                  </div>
                  <label className="mt-3 block text-left text-xs font-semibold text-journey-gold">
                    Person, event, or moment <span className="font-normal text-muted-foreground">(optional)</span>
                    <span className="relative mt-1.5 block">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-composer-muted" />
                      <Input
                        value={focus}
                        onChange={(event) => setFocus(event.target.value)}
                        placeholder="What do you want to witness?"
                        className="h-12 border-journey-gold/50 bg-composer pl-10 text-base text-composer-foreground placeholder:text-composer-muted focus-visible:ring-journey-gold"
                      />
                    </span>
                  </label>
                  <Button
                    type="submit"
                    disabled={busy || !year.trim() || !destination.trim()}
                    className="mt-4 h-12 w-full border border-journey-gold bg-journey-gold font-bold text-journey-gold-foreground shadow-[0_8px_0_hsl(var(--journey-gold)/0.25),0_14px_28px_hsl(var(--journey-gold)/0.14)] transition-transform hover:bg-journey-gold/90 active:translate-y-1 active:shadow-none"
                  >
                    <Rocket className="h-5 w-5" /> Initialize time portal
                  </Button>
                </form>
              )}

              <PromptInput
                onSubmit={({ text }) => send(text)}
                className="[&_[data-slot=input-group]]:border-journey-gold/55 [&_[data-slot=input-group]]:bg-composer [&_[data-slot=input-group]]:shadow-[0_10px_26px_hsl(var(--background)/0.5),inset_0_1px_0_hsl(var(--foreground)/0.55)]"
              >
                <PromptInputTextarea
                  ref={composerRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={journeyStarted ? machine.inputPlaceholder : 'Or describe your journey in your own words…'}
                  className="min-h-24 bg-composer px-4 py-4 text-base leading-6 text-composer-foreground placeholder:text-composer-muted focus-visible:ring-0"
                />
                <PromptInputFooter className="border-t border-journey-gold/20 px-3 py-2">
                  <PromptInputTools>
                    {micSupported && (
                      <PromptInputButton
                        type="button"
                        size="sm"
                        onClick={toggleMic}
                        tooltip={listening ? 'Stop listening' : 'Speak your destination'}
                        className={cn(
                          'h-10 border px-3 text-composer-foreground',
                          listening
                            ? 'border-destructive bg-destructive text-destructive-foreground animate-pulse'
                            : 'border-composer-muted/30 bg-background/10 hover:bg-background/20',
                        )}
                      >
                        {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        <span>{listening ? 'Listening' : 'Speak'}</span>
                      </PromptInputButton>
                    )}
                  </PromptInputTools>
                  <PromptInputSubmit
                    status={busy ? 'streaming' : 'ready'}
                    disabled={busy || !input.trim()}
                    className="h-11 w-11 border border-journey-gold bg-journey-gold text-journey-gold-foreground shadow-[0_5px_12px_hsl(var(--journey-gold)/0.28)] hover:bg-journey-gold/90"
                  />
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
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
