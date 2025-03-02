
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

interface AudioPlayerProps {
  autoPlay?: boolean;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  autoPlay = true,
  className 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string>('/time-travel-sound.mp3');
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // Try to autoplay
      const playPromise = audioRef.current.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
            toast.info(
              "Enable audio for the full experience", 
              { 
                description: "Click the sound button to enable the time travel ambiance",
                duration: 5000 
              }
            );
          });
      }
    }
  }, [autoPlay]);
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => {
            console.log('Play prevented:', error);
            toast.error("Couldn't play audio", { description: "Please try again" });
          });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        const newAudioUrl = URL.createObjectURL(file);
        setAudioSrc(newAudioUrl);
        
        if (audioRef.current) {
          audioRef.current.src = newAudioUrl;
          audioRef.current.load();
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              toast.success("New audio loaded successfully");
            })
            .catch(error => {
              console.log('Play prevented:', error);
              setIsPlaying(false);
              toast.error("Couldn't play uploaded audio");
            });
        }
      } else {
        toast.error("Invalid file type", { 
          description: "Please upload an audio file" 
        });
      }
    }
  };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-time-dark/80 backdrop-blur-sm p-2 rounded-full shadow-lg ${className}`}>
      <audio ref={audioRef} loop src={audioSrc} />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleMuteToggle}
        className="text-white hover:bg-time-accent/20"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleUpload}
        className="text-white hover:bg-time-accent/20"
      >
        <Upload size={20} />
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="audio/*" 
        />
      </Button>
    </div>
  );
};

export default AudioPlayer;
