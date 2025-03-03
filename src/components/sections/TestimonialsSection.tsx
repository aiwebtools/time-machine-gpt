
import React from 'react';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const TestimonialsSection: React.FC = () => {
  const { addToRefs } = useRevealOnScroll<HTMLDivElement>();
  
  const testimonials: Testimonial[] = [
    {
      quote: "The historical accuracy and immersive storytelling transported me back to Ancient Rome in a way no book or documentary ever could.",
      author: "Michael T.",
      location: "History Professor"
    }, 
    {
      quote: "I was able to experience the Renaissance through the eyes of someone who lived it. The details were incredible!",
      author: "Sarah L.",
      location: "Art Historian"
    }, 
    {
      quote: "I've used this with my students and they're finally excited about history. It's revolutionized my classroom.",
      author: "David K.",
      location: "High School Teacher"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={addToRefs} className="reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-time-medium text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            What Time Travelers Are Saying
          </h2>
          <p className="text-gray-600">
            Hear from historians, educators, and history enthusiasts who have experienced Father Time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="reveal glass-effect rounded-xl p-6 transition-transform duration-300 hover:scale-105"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 text-time-accent/70">
                <path d="M13.5 21H9C9 13.5 14.5 10.4987 14.5 10.4987V15C12.5 15.5 12 17 12 18.5H13.5C14.3284 18.5 15 19.1716 15 20V25C15 25.8284 14.3284 26.5 13.5 26.5H8.5C7.67157 26.5 7 25.8284 7 25V20C7 19.1716 7.67157 18.5 8.5 18.5H10C10 16.4826 9.27834 13.4331 7 11C7 11 9 7 15 7C15 7 18 7.09468 18 10.4987C18 13.4987 15 14 13.5 21Z" fill="currentColor" />
                <path d="M27.5 21H23C23 13.5 28.5 10.4987 28.5 10.4987V15C26.5 15.5 26 17 26 18.5H27.5C28.3284 18.5 29 19.1716 29 20V25C29 25.8284 28.3284 26.5 27.5 26.5H22.5C21.6716 26.5 21 25.8284 21 25V20C21 19.1716 21.6716 18.5 22.5 18.5H24C24 16.4826 23.2783 13.4331 21 11C21 11 23 7 29 7C29 7 32 7.09468 32 10.4987C32 13.4987 29 14 27.5 21Z" fill="currentColor" />
              </svg>
              
              <p className="mb-6 text-white/90 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-time-medium flex items-center justify-center text-white font-serif">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/70">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
