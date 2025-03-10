
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  className?: string;
  addToRefs?: (el: HTMLElement | null) => void;
}

const FaqSection = ({
  className,
  addToRefs
}: FaqSectionProps) => {
  const faqs = [{
    question: "What is Time Machine GPT?",
    answer: "Time Machine GPT is an advanced AI-powered platform that allows you to immerse yourself in historical events and eras through interactive storytelling. It combines historically accurate information with engaging narratives to create a time travel experience."
  }, {
    question: "How accurate is the historical content?",
    answer: "Our content is meticulously researched and based on historical records, academic sources, and expert knowledge. While we aim for the highest accuracy, we also create immersive experiences that may include some creative elements to bring history to life."
  }, {
    question: "Can I visit any time period?",
    answer: "Time Machine GPT allows you to explore a vast range of historical periods from ancient civilizations to modern history. You can specify a time period, event, or historical figure you're interested in, and the AI will guide your journey through that era."
  }, {
    question: "Is Time Machine GPT suitable for educational purposes?",
    answer: "Absolutely! Time Machine GPT is an excellent educational tool for students, teachers, and history enthusiasts. It makes learning history engaging and interactive, helping users develop a deeper understanding of historical events and their context."
  }, {
    question: "Can I explore possible future scenarios?",
    answer: "Yes, Time Machine GPT can also create speculative journeys into potential futures based on current trends, scientific projections, and historical patterns. These futures are presented as possibilities rather than predictions."
  }, {
    question: "How do I start my time travel journey?",
    answer: "Simply click on the 'Start Your Journey' button, specify the time period or historical event you wish to explore, and Father Time will guide you through an immersive experience tailored to your interests."
  }];

  return (
    <section ref={addToRefs} className={cn("py-20 bg-gradient-to-b from-time-medium to-time-dark relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[url('/lovable-uploads/e798e2e5-5c6b-43ab-9e0b-24319bbab7ac.png')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-time-medium/90 to-time-dark/70 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-12 font-bold">
          Frequently Asked <span className="text-time-accent">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-time-accent/20">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-time-accent/20 last:border-b-0">
                <AccordionTrigger className="text-white hover:text-time-accent text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
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
