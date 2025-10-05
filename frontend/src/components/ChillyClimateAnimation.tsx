import React from 'react';
import './ChillyClimateAnimation.css';

const ChillyClimateAnimation: React.FC = () => {
  return (
    <div className="winter-container">
      <img 
        src="/winter.png" 
        alt="Mars Winter" 
        className="winter-image"
      />
    </div>
  );
};

export default ChillyClimateAnimation;
