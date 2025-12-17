import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface ToolCardsProps {
  className?: string;
}

const STORY_WRITER_URL = "https://chatgpt.com/g/g-6942c94dcb08819191863b6d35161f09-time-machine-of-unwritten-history-gpt";
const BOOK_WRITER_URL = "https://chatgpt.com/g/g-67fdcb6a97508191bb1926a1cf8a4624-time-machine-interactive-book-writer-v9";
const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";
const HISTORY_GPT_URL = "https://talk-to-history-gpt.lovable.app/";
const BLACK_HISTORY_URL = "https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine";
const NATIVE_AMERICAN_URL = "https://nativeamerican-timemachine.lovable.app/?via=aiwebtools";

const ToolCards: React.FC<ToolCardsProps> = ({ className }) => {
  const handleOpenStoryWriter = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(STORY_WRITER_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(STORY_WRITER_URL);
  };
  const handleOpenBookWriter = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BOOK_WRITER_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(BOOK_WRITER_URL);
  };
  const handleOpenTimeMachine = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(TIME_MACHINE_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(TIME_MACHINE_URL);
  };
  const handleOpenHistoryGpt = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(HISTORY_GPT_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(HISTORY_GPT_URL);
  };
  const handleOpenBlackHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BLACK_HISTORY_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(BLACK_HISTORY_URL);
  };
  const handleOpenNativeAmerican = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(NATIVE_AMERICAN_URL, '_blank', 'noopener,noreferrer');
    createTimePortalEffect(NATIVE_AMERICAN_URL);
  };

  return (
    <section className={cn("py-12 md:py-20 bg-time-dark text-white", className)} aria-labelledby="other-versions-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-xs md:text-sm font-medium mb-4">
            Explore All Time Machine Tools
          </div>
          <h2 id="other-versions-heading" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6 text-glow">
            Choose Your Time Machine Experience
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Each tool focuses on a unique experience—chat, explore, or create. Pick the one that fits your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                The Original Time Machine GPT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: Explore any historical era with guided scenarios</li>
                <li>Audience: History fans, educators, curious learners</li>
                <li>Difference: Balanced overview with cinematic time-portal effects</li>
              </ul>
              <a
                href={TIME_MACHINE_URL}
                onClick={handleOpenTimeMachine}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open The Original Time Machine GPT"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-time-dark font-medium hover:bg-time-accent/90 transition-colors btn-glow"
              >
                Start Original Time Machine
              </a>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                Talk to History GPT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: Chat conversationally with historical figures</li>
                <li>Audience: Students, interviewers, creators</li>
                <li>Difference: Dialogue-focused, Q&A and roleplay ready</li>
              </ul>
              <a
                href={HISTORY_GPT_URL}
                onClick={handleOpenHistoryGpt}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Talk to History GPT"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-time-dark font-medium hover:bg-time-accent/90 transition-colors btn-glow"
              >
                Open Talk to History GPT
              </a>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                Black History Matters Time Machine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: Explore Black history with curated context</li>
                <li>Audience: Educators, students, researchers</li>
                <li>Difference: Focused timeline, verified sources and events</li>
              </ul>
              <a
                href={BLACK_HISTORY_URL}
                onClick={handleOpenBlackHistory}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Black History Matters Time Machine"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-time-dark font-medium hover:bg-time-accent/90 transition-colors btn-glow"
              >
                Open Black History Time Machine
              </a>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                Native American History Time Machine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: Journey through Native American histories and cultures</li>
                <li>Audience: Learners, teachers, cultural storytellers</li>
                <li>Difference: Respectful framing and era-specific perspectives</li>
              </ul>
              <a
                href={NATIVE_AMERICAN_URL}
                onClick={handleOpenNativeAmerican}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Native American History Time Machine"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-time-dark font-medium hover:bg-time-accent/90 transition-colors btn-glow"
              >
                Open Native American Time Machine
              </a>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                Time Machine of Unwritten History GPT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: An unfiltered cosmic historian revealing lost truths through immersive time travel</li>
                <li>Audience: Truth seekers, historians, curious explorers</li>
                <li>Difference: Unfiltered perspective, hidden histories, cosmic insights</li>
              </ul>
              <a
                href={STORY_WRITER_URL}
                onClick={handleOpenStoryWriter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Time Machine of Unwritten History GPT"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-time-dark font-medium hover:bg-time-accent/90 transition-colors btn-glow"
              >
                Open Unwritten History GPT
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ToolCards;
