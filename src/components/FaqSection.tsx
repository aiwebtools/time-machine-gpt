
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  className?: string;
  addToRefs?: (el: HTMLElement | null) => void;
}

const FaqSection = ({ className, addToRefs }: FaqSectionProps) => {
  const faqs = [
    {
      question: "What is Time Machine GPT?",
      answer: "Time Machine GPT is an advanced AI-powered platform that allows you to immerse yourself in historical events and eras through interactive storytelling. It combines historically accurate information with engaging narratives to create a time travel experience."
    },
    {
      question: "How accurate is the historical content?",
      answer: "Our content is meticulously researched and based on historical records, academic sources, and expert knowledge. While we aim for the highest accuracy, we also create immersive experiences that may include some creative elements to bring history to life."
    },
    {
      question: "Can I visit any time period?",
      answer: "Time Machine GPT allows you to explore a vast range of historical periods from ancient civilizations to modern history. You can specify a time period, event, or historical figure you're interested in, and the AI will guide your journey through that era."
    },
    {
      question: "Is Time Machine GPT suitable for educational purposes?",
      answer: "Absolutely! Time Machine GPT is an excellent educational tool for students, teachers, and history enthusiasts. It makes learning history engaging and interactive, helping users develop a deeper understanding of historical events and their context."
    },
    {
      question: "Can I explore possible future scenarios?",
      answer: "Yes, Time Machine GPT can also create speculative journeys into potential futures based on current trends, scientific projections, and historical patterns. These futures are presented as possibilities rather than predictions."
    },
    {
      question: "How do I start my time travel journey?",
      answer: "Simply click on the 'Start Your Journey' button, specify the time period or historical event you wish to explore, and Father Time will guide you through an immersive experience tailored to your interests."
    }
  ];

  return (
    <section 
      ref={addToRefs} 
      className={cn("py-20 bg-gradient-to-b from-time-medium to-time-dark relative overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[url('/lovable-uploads/e798e2e5-5c6b-43ab-9e0b-24319bbab7ac.png')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-time-medium/90 to-time-dark/70 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white text-glow">
            Frequently Asked Questions
          </h2>
          <p className="text-white/70">
            Everything you need to know about your journey through time.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="reveal bg-time-medium/10 border border-time-accent/20 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-time-medium/20 hover:border-time-accent/40"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-white hover:text-time-accent hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
