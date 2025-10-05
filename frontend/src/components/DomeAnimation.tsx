import React from 'react';
import './DomeAnimation.css';

const DomeAnimation: React.FC = () => {
  return (
    <div className="shelter-container">
      <img 
        src="/shelter.png" 
        alt="Mars Shelter" 
        className="shelter-image"
      />
    </div>
  );
};

export default DomeAnimation;
