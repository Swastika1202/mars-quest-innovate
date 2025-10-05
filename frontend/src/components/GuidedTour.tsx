import React, { useState, useEffect } from 'react';
import { FaTimes, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps: TourStep[] = [
  {
    target: '.navbar-logo',
    title: 'Welcome to Mars Quest Innovate!',
    description: 'Click on the Mars Dashboard logo anytime to return to the home page.',
    position: 'bottom'
  },
  {
    target: '.navbar-home',
    title: 'Home Navigation',
    description: 'Navigate to the home page where you can learn about our mission and features.',
    position: 'bottom'
  },
  {
    target: '.navbar-mars-talk',
    title: 'Mars Talk',
    description: 'Explore educational content about Mars, its environment, and colonization challenges.',
    position: 'bottom'
  },
  {
    target: '.navbar-nasa',
    title: 'NASA Knowledge Hub',
    description: 'Access real NASA data, including missions, satellites, Mars rover photos, and the Astronomy Picture of the Day.',
    position: 'bottom'
  },
  {
    target: '.navbar-mission',
    title: 'Explore Mission',
    description: 'Start your Mars colonization journey! Complete interactive missions like building habitats, extracting water, and setting up solar farms.',
    position: 'bottom'
  },
  {
    target: '.hero-section',
    title: 'Hero Section',
    description: 'This is your starting point. Get inspired and learn about the Mars colonization challenge. See statistics about active students and completed missions.',
    position: 'bottom'
  },
  {
    target: '.hero-start-mission',
    title: 'Start Your Mission Button',
    description: 'Click here to begin your Mars colonization journey! Choose from various missions like building habitats, water extraction, solar farms, and greenhouses.',
    position: 'bottom'
  },
  {
    target: '.hero-join-hub',
    title: 'Join Innovation Hub Button',
    description: 'Join the global community of innovators! Share your solutions, collaborate with peers, and contribute to Mars colonization ideas.',
    position: 'bottom'
  },
  {
    target: '.about-section',
    title: 'About Mars Quest Innovate',
    description: 'Learn about our mission to empower the next generation of space innovators through collaboration, innovation, and cutting-edge technology.',
    position: 'top'
  },
  {
    target: '.features-section',
    title: 'Platform Features',
    description: 'Discover all the amazing features including AI-powered learning, gamified missions, real-time analytics, NASA data integration, leaderboards, and the innovation hub.',
    position: 'top'
  },
  {
    target: '.mission-dashboard',
    title: 'Mission Dashboard',
    description: 'Track your progress across different Mars colonization challenges. Choose from various missions and see your achievements as you complete them.',
    position: 'top'
  },
  {
    target: '.innovation-hub',
    title: 'Innovation Hub',
    description: 'Share your solutions, collaborate with other innovators worldwide, vote on ideas, and get feedback from the community on your Mars colonization concepts.',
    position: 'top'
  }
];

const GuidedTour: React.FC<GuidedTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, transform: '' });
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (isOpen && currentStep < tourSteps.length) {
      // Add a small delay to ensure DOM elements are ready
      const timer = setTimeout(() => {
        updatePositions();
      }, 100);
      
      window.addEventListener('resize', updatePositions);
      window.addEventListener('scroll', updatePositions);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updatePositions);
        window.removeEventListener('scroll', updatePositions);
      };
    }
  }, [isOpen, currentStep]);

  const updatePositions = () => {
    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target);

    if (!element) {
      console.warn(`Tour element not found: ${step.target}`);
      return;
    }

    const rect = element.getBoundingClientRect();
    const tooltipHeight = 250; // Approximate tooltip height
    const tooltipWidth = 384; // max-w-sm = 384px
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Highlight box
    setHighlightPosition({
      top: rect.top + window.scrollY - 8,
      left: rect.left + window.scrollX - 8,
      width: rect.width + 16,
      height: rect.height + 16
    });

    // Tooltip positioning with viewport boundary checks
    let top = 0;
    let left = 0;
    let transform = '';

    switch (step.position) {
      case 'bottom':
        top = rect.bottom + window.scrollY + 20;
        left = rect.left + window.scrollX + rect.width / 2;
        transform = 'translate(-50%, 0)';
        
        // Check if tooltip goes below viewport
        if (rect.bottom + tooltipHeight > viewportHeight) {
          top = rect.top + window.scrollY - 20;
          transform = 'translate(-50%, -100%)';
        }
        break;
      case 'top':
        top = rect.top + window.scrollY - 20;
        left = rect.left + window.scrollX + rect.width / 2;
        transform = 'translate(-50%, -100%)';
        
        // Check if tooltip goes above viewport
        if (rect.top - tooltipHeight < 0) {
          top = rect.bottom + window.scrollY + 20;
          transform = 'translate(-50%, 0)';
        }
        break;
      case 'left':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.left + window.scrollX - 20;
        transform = 'translate(-100%, -50%)';
        
        // Check if tooltip goes off left edge
        if (rect.left - tooltipWidth < 0) {
          left = rect.right + window.scrollX + 20;
          transform = 'translate(0, -50%)';
        }
        break;
      case 'right':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.right + window.scrollX + 20;
        transform = 'translate(0, -50%)';
        
        // Check if tooltip goes off right edge
        if (rect.right + tooltipWidth > viewportWidth) {
          left = rect.left + window.scrollX - 20;
          transform = 'translate(-100%, -50%)';
        }
        break;
    }

    // Ensure left position keeps tooltip in viewport
    const leftOffset = left - (tooltipWidth / 2);
    if (leftOffset < 10) {
      left = tooltipWidth / 2 + 10;
    } else if (leftOffset + tooltipWidth > viewportWidth - 10) {
      left = viewportWidth - tooltipWidth / 2 - 10;
    }

    setTooltipPosition({ top, left, transform });

    // Fast scroll to element
    element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <>
      {/* Highlight Box */}
      <div
        className="absolute z-[9999] pointer-events-none transition-all duration-300"
        style={{
          top: `${highlightPosition.top}px`,
          left: `${highlightPosition.left}px`,
          width: `${highlightPosition.width}px`,
          height: `${highlightPosition.height}px`,
          border: '3px solid rgba(239, 68, 68, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute z-[10000] bg-gray-900 text-white rounded-lg shadow-2xl border-2 border-red-500 max-w-sm"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: tooltipPosition.transform
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <FaTimes size={18} />
        </button>

        <div className="p-5">
          <div className="text-sm text-red-400 font-semibold mb-2">
            Step {currentStep + 1} of {tourSteps.length}
          </div>
          <h3 className="text-xl font-bold mb-2">{tourSteps[currentStep].title}</h3>
          <p className="text-gray-300 mb-4">{tourSteps[currentStep].description}</p>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${
                isFirstStep
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <FaArrowLeft /> Prev
            </button>

            {isLastStep ? (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                <FaCheck /> Finish
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Next <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidedTour;
