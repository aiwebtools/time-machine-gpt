
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createTimePortalEffect } from '@/utils/timeEffects';

const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

const About = () => {
  const handleStartJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(TIME_MACHINE_URL);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-time-dark to-time-medium">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-10 shadow-xl">
          <h1 className="font-serif text-4xl md:text-5xl text-time-accent mb-6 text-center text-shadow-enhanced">
            Greetings, Traveler!
          </h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/90 text-lg mb-8 font-medium">
              I am <span className="text-time-accent font-bold">Father Time</span>, powered by <span className="text-time-accent font-bold">GPT-4o</span>. Step forth and immerse yourself in an extraordinary, educational journey through the <span className="text-time-accent font-bold">fabric of time</span>. Whether you seek the distant echoes of the past, the unfolding reality of the present, or the boundless possibilities of the future, I am your guide. This is more than a simulation—it is time travel like never before.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">About Time Machine GPT</h2>
            <p className="text-white/90">
              Time Machine GPT, created by <span className="text-time-accent font-bold">AiWebTools.Ai</span>, invites you to embark on a <span className="text-time-accent font-bold">thrilling voyage</span> through history's grand tapestry, where events are not merely studied but <span className="text-time-accent font-bold">lived</span>. Through my guidance, you will witness history unfold, feel its pulse, and navigate the choices that shape humanity's destiny.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">Who We Are</h2>
            <p className="text-white/90">
              Time Machine GPT is more than a digital archive; it is a <span className="text-time-accent font-bold">portal to the past and a window to the future</span>. Our mission is to bring history to life with <span className="text-time-accent font-bold">vivid storytelling, immersive simulations, and breathtaking visual recreations</span>. Whether you wish to stand among the great civilizations of antiquity, witness the dawn of technological revolutions, or peer into the yet-to-be-written chronicles of the future, Time Machine GPT is your key.
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">What Awaits You</h2>
            <p className="text-white/90 mb-4">
              Through our meticulously crafted time travel experiences, we offer:
            </p>
            
            <ul className="space-y-4 text-white/90 list-disc pl-6">
              <li>
                <span className="font-medium text-time-accent">Authentic Time Travel Narratives</span> – Step into deeply immersive, historically accurate accounts of pivotal moments in time, brought to life with <span className="font-bold">rich details</span>.
              </li>
              <li>
                <span className="font-medium text-time-accent">Futuristic Visions</span> – Explore the crossroads of <span className="font-bold">two potential futures</span>: one a utopia filled with promise, the other a dystopian cautionary tale.
              </li>
              <li>
                <span className="font-medium text-time-accent">Sensory & Visual Journeys</span> – High-definition imagery, immersive descriptions, and interactive storytelling ensure you <span className="font-bold">don't just read history—you live it</span>.
              </li>
              <li>
                <span className="font-medium text-time-accent">Guidance from Father Time</span> – A wise and mysterious storyteller, I shall lead you through the currents of time, ensuring <span className="font-bold">an unforgettable and enlightening experience</span>.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">Our Vision</h2>
            <p className="text-white/90">
              History is more than a <span className="font-bold">chronicle of events</span>—it is a <span className="font-bold">teacher, a warning, and a guide</span>. By stepping into the shoes of those who came before, you will gain <span className="font-bold">a deeper understanding of humanity's journey</span> and the choices that shape our fate. Likewise, by venturing into possible futures, you will face the <span className="font-bold">ultimate test of wisdom</span>: which path shall we take—<span className="font-bold">prosperity or peril</span>?
            </p>
            
            <h2 className="font-serif text-2xl text-time-accent mt-8 mb-4">The Portal Awaits</h2>
            <p className="text-white/90">
              Every journey through time begins with <span className="font-bold">a single step</span>. Whether you yearn to witness the rise and fall of empires, the turning points of modern civilization, or the vast unknown of the future, <span className="font-bold">I stand ready to take you there</span>.
            </p>
            
            <p className="text-white/90 mt-8 font-medium text-center italic">
              Your adventure through time begins <span className="font-bold">now</span>. Will you <span className="font-bold">dare</span> to step beyond the boundaries of time itself?
            </p>
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <a 
              href={TIME_MACHINE_URL}
              onClick={handleStartJourney}
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
