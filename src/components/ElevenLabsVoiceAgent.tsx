
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [isInitialized, setIsInitialized] = useState(false);

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

  return null; // No custom UI, using only the default Eleven Labs widget
};

export default ElevenLabsVoiceAgent;
