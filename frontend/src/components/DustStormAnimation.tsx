import React, { useEffect, useRef, useCallback } from 'react';
import './DustStormAnimation.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const DustStormAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 500); // More particles
    particles.current = Array(particleCount).fill(null).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1, // Slightly larger particles
      speedX: (Math.random() - 0.5) * 3,
      speedY: Math.random() * 2 + 1,
      color: `rgba(200, 100, 50, ${Math.random() * 0.7 + 0.3})` // More opaque
    }));
  }, []);

  // Animation loop
  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear with semi-transparent black for motion trail
      ctx.fillStyle = 'rgba(20, 10, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add some wind effect (sinusoidal movement)
        particle.speedX += Math.sin(particle.y * 0.01) * 0.1;

        // Reset particles that go off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;

        // Draw particle with shadow for depth
        ctx.shadowColor = 'rgba(200, 100, 50, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  // Setup effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    const updateSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize particles with new size
      initParticles(rect.width, rect.height);
    };

    updateSize();
    startAnimation();

    // Handle window resize
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initParticles, startAnimation]);

  return (
    <div className="dust-storm-container">
      <canvas 
        ref={canvasRef} 
        className="dust-storm-canvas"
        width={800}
        height={400}
      />
    </div>
  );
};

export default DustStormAnimation;
