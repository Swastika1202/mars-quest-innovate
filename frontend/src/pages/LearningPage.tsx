
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
    title: "The Challenge: Surviving My Surface",
    narration: "Living here isn't easy! Besides the cold and thin air, there's radiation and perchlorate in my soil. But don't worry, we can overcome these!",
    type: "challenge",
    animation: "Survival challenges visualization"
  },
  {
    title: "Building Our First Home: The Dome",
    narration: "To survive, we need shelter. Imagine building sturdy domes, protecting us from the harsh environment.",
    type: "habitat",
    animation: "Dome habitat animation"
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
  const currentChapter = chapters[currentChapterIndex];

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

            <div className="flex-1 flex items-center justify-center min-h-[200px] bg-gray-700/50 rounded-lg p-4">
              {/* Placeholder for animation */}
              <p className="text-gray-400 text-center text-xl">
                {currentChapter.type === 'climate' && 'Weather Animation Placeholder: '}
                {currentChapter.type === 'habitat' && 'Habitat Animation Placeholder: '}
                {currentChapter.type === 'challenge' && 'Challenge Visualization Placeholder: '}
                {currentChapter.animation}
              </p>
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
