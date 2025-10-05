import React from 'react';
import './Chapter1Animation.css';

const Chapter1Animation: React.FC = () => {
  return (
    <div className="chapter1-container">
      <h1 className="chapter-title">
        Chapter 1 of 8: Welcome to Mars, Future Explorer!
      </h1>
      
      <div className="holographic-box">
        <div className="space-scene">
          {/* Stars background */}
          <div className="stars"></div>
          
          {/* Mars Planet */}
          <div className="mars-planet">
            <div className="planet-core"></div>
            <div className="planet-surface"></div>
          </div>
          
          {/* Rocket Orbit */}
          <div className="rocket-orbit">
            <div className="rocket">🚀</div>
          </div>
          
          {/* Additional decorative stars */}
          <div className="twinkling-stars">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="twinkle" 
                style={{
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--size': `${Math.random() * 3 + 1}px`,
                  '--delay': `${Math.random() * 2}s`,
                  '--duration': `${Math.random() * 3 + 2}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter1Animation;
