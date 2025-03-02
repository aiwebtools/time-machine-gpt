
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-time-dark to-time-medium">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-10 shadow-xl">
          <h1 className="font-serif text-4xl md:text-5xl text-time-accent mb-6 text-center text-shadow-enhanced">
            About Time Machine GPT
          </h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/90 text-lg mb-8 italic">
              Time Machine GPT, created by AiWebTools.Ai, invites you to immerse yourself in a journey with Father Time—where history is not merely read, but experienced.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">Who We Are</h2>
            <p className="text-white/90">
              Time Machine GPT is more than a digital archive; it is an interactive gateway to the past and a visionary glimpse into the future. Our mission is to transport you across the ages through vivid, historically accurate storytelling, immersive narratives, and breathtaking visual recreations. Whether you wish to stand among the great civilizations of antiquity, witness the dawn of a new technological age, or explore the yet-to-be-written future, Time Machine GPT is your guide.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">What We Offer</h2>
            <p className="text-white/90 mb-4">
              Through our meticulously researched historical experiences, we offer:
            </p>
            
            <ul className="space-y-4 text-white/90 list-disc pl-6">
              <li>
                <span className="font-medium text-time-accent">Authentic Time Travel Narratives</span> – Dive into deeply immersive, historically precise accounts of pivotal moments in time, brought to life with intricate details.
              </li>
              <li>
                <span className="font-medium text-time-accent">Futuristic Visions</span> – Navigate the two potential paths of the future: one of utopian promise, the other of dystopian caution.
              </li>
              <li>
                <span className="font-medium text-time-accent">Visual and Sensory Journeys</span> – High-quality imagery, vivid descriptions, and interactive experiences ensure you don't just read about history—you feel it.
              </li>
              <li>
                <span className="font-medium text-time-accent">Guidance by Father Time</span> – A wise and mysterious storyteller, Father Time narrates your journey, ensuring an educational and awe-inspiring experience.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">Our Vision</h2>
            <p className="text-white/90">
              We believe that history is more than a record of the past—it is a teacher, a warning, and a source of inspiration. By allowing visitors to step into the lives, events, and atmospheres of different eras, we empower them to understand humanity's journey with greater depth and perspective. Similarly, by offering glimpses into possible futures, we provide the ultimate test of wisdom: to choose a path that leads to prosperity and not destruction.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">Step into the Portal</h2>
            <p className="text-white/90">
              Every journey begins with a single step. Whether you seek the echoes of ancient empires, the turning points of modern civilization, or the uncharted realms of the future, Time Machine GPT awaits.
            </p>
            
            <p className="text-white/90 mt-8 font-medium text-center italic">
              Your time-travel adventure begins now. Will you dare to step beyond the limits of time?
            </p>
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <a 
              href={TIME_MACHINE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-time-accent text-white rounded-full hover:bg-time-accent/90 transition-colors text-lg font-medium animate-pulse hover:animate-none"
            >
              <span className="mr-2">START YOUR JOURNEY THROUGH TIME NOW</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 14 0"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
