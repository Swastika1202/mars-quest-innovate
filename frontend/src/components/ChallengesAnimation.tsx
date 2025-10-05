import React from 'react';
import './ChallengesAnimation.css';

const ChallengesAnimation: React.FC = () => {
  return (
    <div className="challenges-container">
      <img 
        src="/challenges.png" 
        alt="Mars Challenges" 
        className="challenges-image"
      />
    </div>
  );
};

export default ChallengesAnimation;
