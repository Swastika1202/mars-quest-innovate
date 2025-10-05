import React from 'react';
import './AtmosphereAnimation.css';

const AtmosphereAnimation: React.FC = () => {
  return (
    <div className="greenhouse-container">
      <img 
        src="/greenhouse.png" 
        alt="Mars Greenhouse" 
        className="greenhouse-image"
      />
    </div>
  );
};

export default AtmosphereAnimation;
