import React from 'react';
import './SolarPanelAnimation.css';

const SolarPanelAnimation: React.FC = () => {
  return (
    <div className="solarpanel-container">
      <img 
        src="/solarpanel.png" 
        alt="Solar Panels on Mars" 
        className="solarpanel-image"
      />
    </div>
  );
};

export default SolarPanelAnimation;
