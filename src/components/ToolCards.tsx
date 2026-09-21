import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MessageCircle, ImageIcon, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { timeMachines, externalVersionLabel } from '@/data/timeMachines';

interface ToolCardsProps {
  className?: string;
}

const ToolCards: React.FC<ToolCardsProps> = ({ className }) => (
  <section
    className={cn('py-14 md:py-24 bg-time-dark text-foreground', className)}
    aria-labelledby="other-versions-heading"
  >
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mb-10 md:mb-14">
        <p className="text-time-accent text-xs md:text-sm font-semibold uppercase mb-3">
          Six portals. Six ways through time.
        </p>
        <h2 id="other-versions-heading" className="text-3xl md:text-5xl font-serif font-bold text-glow mb-5">
          Choose Your Time Machine
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
          Every version now runs here with its own live story, spoken narration, microphone input,
          and generated historical visions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
        {timeMachines.map((machine) => (
          <article
            key={machine.id}
            className="group overflow-hidden border border-time-accent/25 bg-time-dark/70 shadow-[0_12px_34px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-time-accent/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_24px_rgba(212,175,55,0.18)]"
          >
            <div className="relative aspect-[3/2] overflow-hidden border-b border-time-accent/20">
              <img
                src={machine.image}
                alt={machine.imageAlt}
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-time-dark to-transparent" />
            </div>

            <div className="p-5 md:p-6 flex flex-col min-h-[310px]">
              <h3 className="text-xl font-serif font-bold text-time-accent leading-snug mb-3">
                {machine.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {machine.cardDescription}
              </p>
              <p className="text-xs leading-relaxed text-foreground/80 border-l-2 border-time-accent/50 pl-3 mb-5">
                <span className="font-semibold text-time-accent">What makes it different:</span>{' '}
                {machine.difference}
              </p>

              <div className="flex items-center gap-4 text-time-accent/80 mt-auto mb-4" aria-label="Available features">
                <span title="Live conversation"><MessageCircle className="h-4 w-4" /></span>
                <span title="Spoken narration"><Volume2 className="h-4 w-4" /></span>
                <span title="Generated visions"><ImageIcon className="h-4 w-4" /></span>
              </div>

              <Button asChild className="h-auto min-h-11 w-full whitespace-normal py-2 text-center text-sm leading-snug bg-time-accent text-time-dark font-bold hover:bg-time-accent/90 btn-glow">
                <Link to={machine.path}>
                  Enter {machine.shortName} — (INSITE VERSION)
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              {machine.externalUrl && (
                <Button asChild variant="outline" className="mt-3 h-auto min-h-11 w-full whitespace-normal py-2 text-center text-sm leading-snug border-time-accent/45 text-time-accent hover:bg-time-accent/10 hover:text-time-accent">
                  <a href={machine.externalUrl} target="_blank" rel="noopener noreferrer">
                    Open {machine.shortName} — {externalVersionLabel(machine.externalPlatform)}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ToolCards;