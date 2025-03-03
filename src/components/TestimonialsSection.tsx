
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  className?: string;
  addToRefs: (el: HTMLElement | null) => void;
}

const TestimonialsSection = ({ className, addToRefs }: TestimonialsSectionProps) => {
  const testimonials = [{
    quote: "The historical accuracy and immersive storytelling transported me back to Ancient Rome in a way no book or documentary ever could.",
    author: "Michael T.",
    location: "History Professor",
    stars: 5
  }, {
    quote: "I was able to experience the Renaissance through the eyes of someone who lived it. The details were incredible!",
    author: "Sarah L.",
    location: "Art Historian",
    stars: 5
  }, {
    quote: "I've used this with my students and they're finally excited about history. It's revolutionized my classroom.",
    author: "David K.",
    location: "High School Teacher",
    stars: 5
  }];

  return (
    <section className={cn("py-20 bg-gradient-to-b from-time-dark via-time-dark to-time-medium relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[url('/lovable-uploads/c73d4e37-b0c3-4d03-9e63-4d000f6b90ad.png')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-time-dark/90 to-time-dark/70 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-time-medium/30 border border-time-accent/30 rounded-full text-time-accent text-sm font-medium mb-4 animate-pulse">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white text-glow">
            What Time Travelers Are Saying
          </h2>
          <p className="text-white/70">
            Hear from historians, educators, and history enthusiasts who have experienced Father Time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={addToRefs} 
              className="reveal relative overflow-hidden backdrop-blur-md bg-time-medium/10 border border-time-accent/20 rounded-xl p-8 transition-all duration-500 hover:bg-time-medium/20 hover:border-time-accent/40 hover:shadow-[0_0_25px_rgba(194,160,110,0.4)] hover:scale-105 group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-time-accent/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:bg-time-accent/10 transition-all duration-700"></div>
              
              <Quote className="w-10 h-10 text-time-accent/60 mb-6 group-hover:text-time-accent transition-colors duration-300" />
              
              <p className="mb-8 text-white/90 italic font-medium leading-relaxed relative z-10">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-time-accent/30 to-time-accent/10 flex items-center justify-center text-white font-serif text-lg border border-time-accent/30 group-hover:border-time-accent/60 transition-all duration-300">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-time-accent group-hover:text-time-accent/90 transition-colors">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-time-accent/70 group-hover:text-time-accent fill-time-accent/70 group-hover:fill-time-accent transition-colors duration-300" />
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-time-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
