
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createTimePortalEffect } from '@/utils/timeEffects';

// This is your ElevenLabs API key - typically this should be handled server-side
// but since this is client-only, we'll use it directly as provided
const ELEVEN_LABS_API_KEY = "sk_d4ba415b39332fdbfc89f2ee1eb32967ed650b6c1b71b4a2";

interface ElevenLabsVoiceAgentProps {
  className?: string;
  agentId?: string;
}

const ElevenLabsVoiceAgent = ({ 
  className,
  agentId = "lVve4L6TI9TtoX33JfAI" // Default agent ID
}: ElevenLabsVoiceAgentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const TIME_MACHINE_URL = "https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt";

  // Initialize the widget once the component mounts
  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.getElementById('elevenlabs-convai-script');
    
    if (!existingScript) {
      // If we haven't initialized the widget yet
      if (!isInitialized) {
        // Create the container for the widget if it doesn't exist
        let widgetContainer = document.getElementById('elevenlabs-convai-container');
        if (!widgetContainer) {
          widgetContainer = document.createElement('div');
          widgetContainer.id = 'elevenlabs-convai-container';
          document.body.appendChild(widgetContainer);
          
          // Add the widget element
          const widgetElement = document.createElement('elevenlabs-convai');
          widgetElement.setAttribute('agent-id', agentId);
          
          // Set the API key via data attribute
          widgetElement.setAttribute('data-api-key', ELEVEN_LABS_API_KEY);
          
          widgetContainer.appendChild(widgetElement);
          
          // Create and add the script element
          const script = document.createElement('script');
          script.id = 'elevenlabs-convai-script';
          script.src = 'https://elevenlabs.io/convai-widget/index.js';
          script.async = true;
          script.type = 'text/javascript';
          
          script.onload = () => {
            console.log('ElevenLabs Convai widget script loaded');
            setIsInitialized(true);
          };
          
          document.body.appendChild(script);
        }
      }
    }
    
    // Cleanup function
    return () => {
      // We're not removing the script on unmount since it might be needed elsewhere
    };
  }, [agentId, isInitialized]);

  // Toggle the widget visibility
  const toggleWidget = () => {
    if (!isOpen) {
      // If widget is being opened, play the time travel effect first
      createTimePortalEffect(TIME_MACHINE_URL);
      return;
    }
    
    setIsOpen(prev => !prev);
    
    // Find the widget container and toggle its visibility
    const widgetContainer = document.getElementById('elevenlabs-convai-container');
    if (widgetContainer) {
      if (isOpen) {
        widgetContainer.style.display = 'none';
      } else {
        widgetContainer.style.display = 'block';
        
        // Dispatch a custom event that the widget script can listen for
        const event = new CustomEvent('elevenlabs-convai-open');
        document.dispatchEvent(event);
      }
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="bg-time-accent/90 text-white px-3 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium">Time Machine Live Hotline</span>
          </div>
        )}
        <button
          onClick={toggleWidget}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-time-accent text-white shadow-lg hover:bg-time-accent/90 transition-all duration-300 animate-pulse hover:animate-none"
          aria-label={isOpen ? "Close voice assistant" : "Open voice assistant"}
        >
          {isOpen ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </button>
      </div>
      <style>
        {`
          /* Custom styles for the ElevenLabs widget */
          #elevenlabs-convai-container {
            position: fixed;
            bottom: 5rem;
            right: 1.5rem;
            z-index: 49;
            display: ${isOpen ? 'block' : 'none'};
          }
        `}
      </style>
    </div>
  );
};

export default ElevenLabsVoiceAgent;
