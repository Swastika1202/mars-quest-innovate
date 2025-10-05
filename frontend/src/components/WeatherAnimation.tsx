import React from 'react';
import './WeatherAnimation.css';

const WeatherAnimation: React.FC = () => {
  // Create tiny water droplets with random positions and timings
  const raindrops = Array(100).fill(null).map((_, i) => {
    const left = Math.random() * 100; // Random horizontal position
    const size = Math.random() * 0.8 + 0.5; // Very small size between 0.5-1.3px
    const duration = Math.random() * 0.8 + 0.4; // Slightly faster falling
    const delay = Math.random() * 0.5; // Shorter delay between drops
    
    return (
      <span 
        key={i} 
        style={{
          '--i': i,
          '--left': `${left}%`,
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div className="weather-container">
      <div className="cloud">
        <div className="rain">
          {raindrops}
        </div>
      </div>
    </div>
  );
};

export default WeatherAnimation;
