
import React from 'react';
import { BookOpen, Image, MessageSquareText, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesProps {
  className?: string;
  addToRefs: (el: HTMLElement | null) => void;
}

const Features = ({ className, addToRefs }: FeaturesProps) => {
  const features = [{
    title: "Vivid Historical Narratives",
    description: "Experience detailed first-person accounts that transport you to any time period with remarkable accuracy and immersion.",
    icon: <BookOpen className="text-time-accent h-6 w-6" />
  }, {
    title: "Authentic Visualizations",
    description: "View high-quality, historically accurate images of your surroundings that bring the past to life in vivid detail.",
    icon: <Image className="text-time-accent h-6 w-6" />
  }, {
    title: "Interactive Learning",
    description: "Ask questions and receive detailed responses from the perspective of someone living in that time period.",
    icon: <MessageSquareText className="text-time-accent h-6 w-6" />
  }, {
    title: "Educational Accuracy",
    description: "All historical content is meticulously researched and fact-checked for educational integrity and authenticity.",
    icon: <GraduationCap className="text-time-accent h-6 w-6" />
  }];

  return (
    <section className={cn("py-20 bg-time-dark text-white", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium mb-4">
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-glow">
            An Unparalleled Time Travel Experience
          </h2>
          <p className="text-white/70">
            Father Time combines cutting-edge AI with historical accuracy to create the most immersive time travel simulation available.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="reveal backdrop-blur-sm bg-time-dark/40 border border-time-accent/10 p-6 rounded-xl transition-all duration-300 hover:bg-time-medium/30 hover:border-time-accent/30 hover:shadow-[0_0_15px_rgba(194,160,110,0.3)] hover:scale-105 group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-time-dark/50 rounded-lg border border-time-accent/20 group-hover:border-time-accent/40 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-time-accent group-hover:text-time-accent/90 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
