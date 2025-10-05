import React from 'react';
import './WelcomeAnimation.css';

const WelcomeAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="welcome-animation">
        <div className="space-background">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
        </div>
        
        <div className="mars-orbit">
          <div className="rocket-container">
            <div className="rocket">🚀</div>
          </div>
        </div>
        
        <div className="mars-planet">
          <div className="planet-core"></div>
          <div className="planet-surface"></div>
          <div className="welcome-text">Mars</div>
        </div>
        
        <div className="mars-glow-ring"></div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
