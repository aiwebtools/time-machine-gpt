
import React from 'react';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturesSection: React.FC = () => {
  const { addToRefs } = useRevealOnScroll<HTMLDivElement>();
  
  const features: Feature[] = [
    {
      title: "Vivid Historical Narratives",
      description: "Experience detailed first-person accounts that transport you to any time period with remarkable accuracy and immersion.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent">
            <path d="M12 9v4l3 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
    }, 
    {
      title: "Authentic Visualizations",
      description: "View high-quality, historically accurate images of your surroundings that bring the past to life in vivid detail.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent">
            <path d="m4 8 2-2m0 0 2-2M6 6 4 4m2 2 2 2"></path>
            <path d="M14.5 17.5 16 16m0 0 2-2m-2 2-2-2m2 2 2 2"></path>
            <rect width="8" height="8" x="2" y="12" rx="2"></rect>
            <path d="M14 2v4h-4"></path>
            <path d="M20 12V8l-4 4"></path>
            <path d="M14 22v-4h4"></path>
          </svg>
    }, 
    {
      title: "Interactive Learning",
      description: "Ask questions and receive detailed responses from the perspective of someone living in that time period.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent">
            <path d="M5.8 11.3a3 3 0 1 0 1 5.4"></path>
            <path d="M10 6h9a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5"></path>
            <path d="M14 8v5"></path>
            <path d="M17 11h-6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2"></path>
          </svg>
    }, 
    {
      title: "Educational Accuracy",
      description: "All historical content is meticulously researched and fact-checked for educational integrity and authenticity.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-time-accent">
            <path d="M9 10h.01"></path>
            <path d="M15 10h.01"></path>
            <path d="M12 14v2"></path>
            <path d="M9 18h6"></path>
            <path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
            <path d="M9 7V4a3 3 0 1 1 6 0v3"></path>
          </svg>
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-time-medium text-sm font-medium mb-4">
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-time-dark">
            An Unparalleled Time Travel Experience
          </h2>
          <p className="text-gray-600">
            Father Time combines cutting-edge AI with historical accuracy to create the most immersive time travel simulation available.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="reveal p-6 border border-gray-100 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-time-accent/30"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-time-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
