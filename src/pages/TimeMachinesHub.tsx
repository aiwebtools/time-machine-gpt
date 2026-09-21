import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ImageIcon, MessageCircle, Volume2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InformationalDisclaimer from '@/components/InformationalDisclaimer';
import { Button } from '@/components/ui/button';
import { timeMachines, externalVersionLabel } from '@/data/timeMachines';

const PAGE_TITLE = 'All Six Time Machines | TIME MACHINE GPT';
const PAGE_DESCRIPTION =
  'Browse all six Time Machines in one place — Father Time, the Original Time Machine, Talk to History, Black History Matters, Native American History, and Unwritten History — and pick your journey.';

const TimeMachinesHub = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const pageUrl = `${window.location.origin}/time-machines`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', PAGE_DESCRIPTION);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', PAGE_TITLE);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', PAGE_DESCRIPTION);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', PAGE_TITLE);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', PAGE_DESCRIPTION);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative z-10">
        <section className="container mx-auto px-4 pt-24 pb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-glow text-time-accent mb-4">
            ALL SIX TIME MACHINES
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300">
            Every journey in one place. Pick a portal, read what makes it different, and travel
            instantly — or open the original external version of that tool.
          </p>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
            {timeMachines.map((machine) => (
              <article
                key={machine.id}
                className="group flex flex-col overflow-hidden border border-time-accent/25 bg-time-dark/70 shadow-[0_12px_34px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-time-accent/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_24px_rgba(212,175,55,0.18)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden border-b border-time-accent/20">
                  <img
                    src={machine.image}
                    alt={machine.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-time-dark to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="mb-3 text-xl font-serif font-bold leading-snug text-time-accent">
                    {machine.name}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {machine.cardDescription}
                  </p>
                  <p className="mb-5 border-l-2 border-time-accent/50 pl-3 text-xs leading-relaxed text-foreground/80">
                    <span className="font-semibold text-time-accent">What makes it different:</span>{' '}
                    {machine.difference}
                  </p>

                  <div className="mb-4 mt-auto flex items-center gap-4 text-time-accent/80" aria-label="Available features">
                    <span title="Live conversation"><MessageCircle className="h-4 w-4" /></span>
                    <span title="Spoken narration"><Volume2 className="h-4 w-4" /></span>
                    <span title="Generated visions"><ImageIcon className="h-4 w-4" /></span>
                  </div>

                  <Button asChild className="w-full bg-time-accent font-bold text-time-dark hover:bg-time-accent/90 btn-glow">
                    <Link to={machine.path}>
                      Enter {machine.shortName} — (INSITE VERSION)
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {machine.externalUrl && (
                    <Button asChild variant="outline" className="mt-3 w-full border-time-accent/45 text-time-accent hover:bg-time-accent/10 hover:text-time-accent">
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

          <div className="mt-8 text-center">
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

export default TimeMachinesHub;
