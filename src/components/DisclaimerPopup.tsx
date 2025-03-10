
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DisclaimerPopupProps {
  onAccept: () => void;
  isOpen: boolean;
}

const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ onAccept, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onAccept}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2",
              "rounded-xl border-2 border-time-accent/30 bg-gradient-to-br from-slate-900 to-slate-800",
              "p-6 shadow-[0_0_30px_rgba(194,160,110,0.2)] text-white overflow-hidden"
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-time-accent/30 via-time-accent to-time-accent/30" />
            
            <button onClick={onAccept} className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="font-serif text-2xl font-bold mb-3 bg-gradient-to-r from-time-accent to-white bg-clip-text text-transparent">
              Time Travel Notice
            </h2>
            
            <p className="mb-5 text-slate-200 leading-relaxed">
              By proceeding, you acknowledge that your journey through time is for educational and entertainment purposes only. 
              Time Machine GPT provides a simulated experience of historical events.
            </p>
            
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAccept}
                className={cn(
                  "relative overflow-hidden py-3 px-8 rounded-full font-medium",
                  "bg-gradient-to-r from-time-accent via-amber-500 to-time-accent",
                  "text-slate-900 shadow-lg shadow-time-accent/20",
                  "transition-all duration-300 animate-glow",
                  "hover:shadow-time-accent/40 hover:text-slate-800",
                  "outline-none focus:ring-2 focus:ring-time-accent/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                )}
              >
                <span className="relative z-10">I AGREE</span>
                <span className="absolute inset-0 bg-white/20 animate-shimmer" />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerPopup;
