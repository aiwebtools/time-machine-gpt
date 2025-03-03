
import React from 'react';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

interface DemoSectionProps {
  timeDestinationUrl: string;
}

const DemoSection: React.FC<DemoSectionProps> = ({ timeDestinationUrl }) => {
  const { addToRefs } = useRevealOnScroll<HTMLDivElement>();
  
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-time-accent/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-time-accent/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={addToRefs} className="reveal order-2 lg:order-1">
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-2 text-sm text-gray-500">Father Time GPT</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-time-medium flex items-center justify-center text-white font-medium">
                    FT
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 text-gray-700">
                      <p className="font-medium text-time-dark mb-1">Great Scott! User, what date would you like to teleport to, & where do you want to go?</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 text-gray-700">
                      <p>I'd like to visit Ancient Rome during the time of Julius Caesar, around 44 BCE.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-time-medium flex items-center justify-center text-white font-medium">
                    FT
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 text-gray-700">
                      <p className="font-medium text-time-dark mb-1">
                        🏛️ Welcome to Rome, 44 BCE!
                      </p>
                      <p className="mb-2">
                        The air is thick with the sounds of a bustling empire—the rhythmic clang of metal from the blacksmith's forge, the low murmurs of traders haggling over exotic silks, and the distant roar of a crowd in the great Forum Romanum. You stand amidst the beating heart of Imperial Rome, a city that exudes power, ambition, and intrigue.
                      </p>
                      <p className="mb-2">
                        Towering marble temples, decorated with intricate friezes, stretch toward the sky, while grand statues of Roman deities overlook the bustling streets. The roads, paved with well-worn stone, are alive with movement—senators in pristine white togas embroidered with purple trim stride purposefully toward the Senate House.
                      </p>
                      <p className="mb-2">
                        🗡️ The Ides of March Approaches...
                        The streets of Rome hum with tension, whispers creeping through the alleys like a venomous serpent coiling in the shadows. The year is 44 BCE, and Caesar, fresh from his conquests, now holds absolute power.
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        [Historical narrative continues...]
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-200">
                        <img alt="Roman Forum visualization" className="object-cover w-full h-full" src="/lovable-uploads/c73d4e37-b0c3-4d03-9e63-4d000f6b90ad.png" />
                      </div>
                      <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-200">
                        <img alt="Roman street visualization" className="object-cover w-full h-full" src="/lovable-uploads/e798e2e5-5c6b-43ab-9e0b-24319bbab7ac.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={addToRefs} className="reveal order-1 lg:order-2 space-y-6">
            <div className="inline-block px-3 py-1 bg-time-accent/10 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium">
              Immersive Experience
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-time-dark">
              See Historical Events Through Your Own Eyes
            </h2>
            
            <p className="text-gray-600">
              Father Time doesn't just tell you about history—it transports you there. Experience detailed narratives that make you feel present at pivotal moments, complemented by vivid imagery that brings the past to life.
            </p>
            
            <ul className="space-y-3">
              {["Receive detailed, historically accurate narratives", 
                "View photorealistic images of historical settings", 
                "Ask questions and receive responses from historical perspectives", 
                "Learn about daily life, culture, and significant events"].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent mr-2 flex-shrink-0">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            
            <a href={timeDestinationUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-time-medium text-white rounded-md font-medium hover:bg-time-dark transition-colors mt-8 inline-block">
              Try It Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
