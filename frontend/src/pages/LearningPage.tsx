
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { nasaApi, MarsPhoto } from '@/services/api';

interface Chapter {
  title: string;
  narration: string;
  type: 'climate' | 'challenge' | 'habitat';
  animation: string; // Placeholder for animation description/identifier
  badge?: string;
  funFact?: string;
}

const chapters: Chapter[] = [
  {
    title: "Welcome to Mars, Future Explorer!",
    narration: "Hello, Earthlings! I am Mars, your red neighbor. Ready to embark on a journey to discover my secrets?",
    type: "climate",
    animation: "Welcome to Mars"
  },
  {
    title: "My Chilly Climate",
    narration: "Brrr! It's quite cold here. My average temperature is about -63 degrees Celsius. Hope you brought a warm suit!",
    type: "climate",
    animation: "Cold temperatures animation"
  },
  {
    title: "My Thin Veil: The Atmosphere",
    narration: "I have a very thin atmosphere, mostly carbon dioxide. It can barely hold onto heat, making me a frozen world.",
    type: "climate",
    animation: "Thin atmosphere animation"
  },
  {
    title: "My Fiery Dance: Dust Storms",
    narration: "Sometimes, I kick up a fuss with massive dust storms that can last for months, painting my skies an even deeper red.",
    type: "climate",
    animation: "Dust storm animation"
  },
  {
    title: "Mars Survival Story",
    narration: "Living here isn't easy! Besides the cold and thin air, there's radiation and perchlorate in my soil. But don't worry, we can overcome these!",
    type: "challenge",
    animation: "Complete Mars survival story",
    badge: "Survival Expert Badge"
  },
  {
    title: "Growing Our Food: The Greenhouse",
    narration: "And for food, we'll construct advanced greenhouses, using my soil and recycled water to grow fresh produce.",
    type: "habitat",
    animation: "Greenhouse animation",
    badge: "Green Thumb Badge"
  },
  {
    title: "Powering Our Future: Solar Panels",
    narration: "Energy is key! Vast arrays of solar panels will capture my abundant sunlight, fueling our Martian home.",
    type: "habitat",
    animation: "Solar panel animation",
    funFact: "Mars receives about half the sunlight Earth does."
  },
  {
    title: "Mars: Your New Adventure Awaits!",
    narration: "You've learned a lot, future explorer! With ingenuity and teamwork, we can make Mars a second home. The journey has just begun!",
    type: "habitat",
    animation: "Futuristic habitat city",
    badge: "Mars Pioneer Badge"
  }
];

const LearningPage: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [marsImage, setMarsImage] = useState<MarsPhoto | null>(null);
  const currentChapter = chapters[currentChapterIndex];

  // Fetch Mars image when component mounts
  useEffect(() => {
    const fetchMarsImage = async () => {
      try {
        const image = await nasaApi.getRandomPhoto();
        setMarsImage(image);
      } catch (error) {
        console.error('Failed to fetch Mars image:', error);
      }
    };
    fetchMarsImage();
  }, []);

  const handleNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const progress = ((currentChapterIndex + 1) / chapters.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-red-400">MarsConnect: Learn About Mars</CardTitle>
        </CardHeader>
        <CardContent key={currentChapterIndex} className="space-y-6 transition-opacity duration-700 ease-in-out opacity-100">
          <Progress value={progress} className="w-full h-3 bg-red-700" />
          <p className="text-lg text-center text-gray-300">Chapter {currentChapterIndex + 1} of {chapters.length}: {currentChapter.title}</p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4 relative">
              <h2 className="text-2xl font-semibold text-red-300">Mars Speaks:</h2>
              <div className="relative p-4 rounded-lg">
                <p className="text-xl leading-relaxed italic relative z-10">
                  "{currentChapter.narration}"
                </p>
              </div>
              {currentChapter.funFact && (
                <div className="bg-red-700/30 p-3 rounded-lg text-red-200">
                  <span className="font-bold">Fun Fact:</span> {currentChapter.funFact}
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center h-[400px] bg-gray-700/50 rounded-lg p-4 relative overflow-hidden">
              {/* Animation Area */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Welcome to Mars - Chapter 1 */}
                {currentChapterIndex === 0 && (
                  <div className="welcome-animation">
                    <div className="space-background">
                      <div className="star star-1"></div>
                      <div className="star star-2"></div>
                      <div className="star star-3"></div>
                      <div className="star star-4"></div>
                      <div className="star star-5"></div>
                    </div>
                    <div className="mars-planet">
                      <div className="planet-core"></div>
                      <div className="planet-surface"></div>
                      <div className="welcome-text animate-pulse">🚀</div>
                    </div>
                    <div className="mars-glow-ring"></div>
                  </div>
                )}

                {/* Cold Climate - Chapter 2 */}
                {currentChapterIndex === 1 && (
                  <div className="cold-climate-animation">
                  </div>
                )}
                {/* Thin Atmosphere - Chapter 3 */}
                {currentChapterIndex === 2 && (
                  <div className="atmosphere-animation">
                  </div>
                )}

                {/* Dust Storms - Chapter 4 */}
                {currentChapterIndex === 3 && (
                  <div className="dust-storm-animation">
                  </div>
                )}

                {/* Survival Challenge - Chapter 5 */}
                {currentChapterIndex === 4 && (
                  <div className="survival-animation">
                  </div>
                )}

                {/* Mars Survival Story - Chapter 6 */}
                {currentChapterIndex === 5 && (
                  <div className="mars-survival-story">
                  </div>
                )}

                {/* Greenhouse - Chapter 7 */}
                {currentChapterIndex === 6 && (
                  <div className="greenhouse-animation">
                  </div>
                )}

                {/* Solar Panels - Chapter 8 */}
                {currentChapterIndex === 7 && (
                  <div className="solar-animation">
                  </div>
                )}

                {/* Final Chapter - Chapter 9 */}
                {currentChapterIndex === 8 && (
                  <div className="future-animation">
                  </div>
                )}

                {/* Animation Description */}
                <div className="absolute bottom-2 left-2 text-xs text-gray-400 opacity-70">
                  {currentChapter.animation}
                </div>
              </div>
            </div>
          </div>

          {currentChapter.badge && (
            <div className="text-center text-yellow-300 text-xl font-bold">
              🎉 New Badge Unlocked: {currentChapter.badge}! 🎉
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button onClick={handlePrevious} disabled={currentChapterIndex === 0} className="bg-red-500 hover:bg-red-600">Previous</Button>
            <Button onClick={handleNext} disabled={currentChapterIndex === chapters.length - 1} className="bg-red-500 hover:bg-red-600">Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPage;
