import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

interface ToolCardsProps {
  className?: string;
}

const STORY_WRITER_URL = "https://chatgpt.com/g/g-67fdcb6a97508191bb1926a1cf8a4624-time-machine-interactive-story-writer-v9";

const ToolCards: React.FC<ToolCardsProps> = ({ className }) => {
  const handleOpenStoryWriter = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(STORY_WRITER_URL);
  };

  return (
    <section className={cn("py-12 md:py-20 bg-time-dark text-white", className)} aria-labelledby="other-versions-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-xs md:text-sm font-medium mb-4">
            Explore Other Versions
          </div>
          <h2 id="other-versions-heading" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6 text-glow">
            Time Machine Interactive Story Writer V9
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Create immersive, branching historical adventures. Ideal for educators, creators, and history enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Card className="backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 hover:bg-time-medium/30 hover:border-time-accent/30 transition-all group">
            <CardHeader>
              <CardTitle className="text-time-accent group-hover:text-time-accent/90 transition-colors">
                Interactive Story Writer V9
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Purpose: Generate interactive historical stories</li>
                <li>Audience: Teachers, students, creators, storytellers</li>
                <li>Highlights: Branching paths, educational prompts, era-accurate tone</li>
              </ul>
              <a
                href={STORY_WRITER_URL}
                onClick={handleOpenStoryWriter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Time Machine Interactive Story Writer V9"
                className="mt-6 inline-block px-5 py-3 rounded-md bg-time-accent text-white font-medium hover:bg-time-accent/90 transition-colors"
              >
                Open Story Writer V9
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ToolCards;
