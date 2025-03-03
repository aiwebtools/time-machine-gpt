
import React from 'react';
import TimelineAnimation from '@/components/TimelineAnimation';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

interface EraCard {
  era: string;
  years: string;
  description: string;
  image: string;
}

interface TimePeriodSectionProps {
  timeDestinationUrl: string;
}

const TimePeriodSection: React.FC<TimePeriodSectionProps> = ({ timeDestinationUrl }) => {
  const { addToRefs } = useRevealOnScroll<HTMLDivElement>();
  
  const eras: EraCard[] = [
    {
      era: "Ancient World",
      years: "3000 BCE - 500 CE",
      description: "Witness the rise of early civilizations, from Ancient Egypt and Greece to the Roman Empire.",
      image: "bg-[url('/lovable-uploads/7698c4b8-7aaf-4db1-ac4b-de8fc07f9333.png')]"
    }, 
    {
      era: "Middle Ages & Renaissance",
      years: "500 - 1500",
      description: "Experience medieval life, the Byzantine Empire, Islamic Golden Age, and European Renaissance.",
      image: "bg-[url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')]"
    }, 
    {
      era: "Modern Era",
      years: "1500 - Present",
      description: "Explore the Age of Discovery, Industrial Revolution, World Wars, and technological advances.",
      image: "bg-[url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-time-dark to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Travel Across The Ages
          </h2>
          <p className="text-white/80">
            From ancient civilizations to recent history, explore any time period with unprecedented detail and immersion.
          </p>
        </div>
        
        <TimelineAnimation />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {eras.map((era, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="reveal rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className={`h-48 ${era.image} bg-cover bg-center relative`}>
                <div className="absolute inset-0 bg-time-dark/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif font-bold text-shadow">{era.era}</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="text-sm text-time-accent font-medium mb-2">{era.years}</div>
                <p className="text-gray-700">{era.description}</p>
                <a href={timeDestinationUrl} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 border border-time-medium text-time-medium rounded hover:bg-time-medium hover:text-white transition-colors inline-block">
                  Explore This Era
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimePeriodSection;
