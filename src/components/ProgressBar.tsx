
import React, { useEffect } from 'react';

const ProgressBar: React.FC = () => {
  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar');
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalHeight = docHeight - windowHeight;
      const progress = scrollPosition / totalHeight * 100;
      
      if (progressBar instanceof HTMLElement) {
        progressBar.style.width = `${progress}%`;
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="progress-container">
      <div className="progress-bar"></div>
    </div>
  );
};

export default ProgressBar;
