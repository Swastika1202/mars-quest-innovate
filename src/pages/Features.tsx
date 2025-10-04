import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Lightbulb, GraduationCap, Users, Shield, Globe } from 'lucide-react';
import { User, BookOpen, UploadCloud } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap className="h-8 w-8 text-red-400" />,
    title: "Interactive Learning",
    description: "Engage with dynamic lessons about Mars' climate, habitats, and challenges.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-red-400" />,
    title: "Mission Simulations",
    description: "Participate in virtual missions like building habitats, extracting water, and setting up solar farms.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-red-400" />,
    title: "Innovation Hub",
    description: "Submit your solutions to Mars-related problems and collaborate with peers.",
  },
  {
    icon: <Users className="h-8 w-8 text-red-400" />,
    title: "Gamification & Leaderboards",
    description: "Earn badges, track progress, and compete with other students on leaderboards.",
  },
  {
    icon: <Shield className="h-8 w-8 text-red-400" />,
    title: "AI-Powered Challenges",
    description: "Tackle complex problems with AI assistance and get personalized feedback.",
  },
  {
    icon: <Globe className="h-8 w-8 text-red-400" />,
    title: "Global Community",
    description: "Connect with students and experts worldwide to share ideas and knowledge.",
  },
  {
    icon: <User className="h-8 w-8 text-red-400" />,
    title: "User Authentication & Profile",
    description: "Securely sign up, sign in, and manage your personal profile with customizable details.",
  },
  {
    icon: <Users className="h-8 w-8 text-red-400" />,
    title: "Community Collaboration",
    description: "Create or join communities to collaborate on challenges and share innovative solutions.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-red-400" />,
    title: "Detailed Solution Viewing",
    description: "Explore in-depth details of student-submitted solutions, including descriptions and links.",
  },
  {
    icon: <UploadCloud className="h-8 w-8 text-red-400" />,
    title: "Solution Submission",
    description: "Easily submit your own groundbreaking ideas and reports to the Innovation Hub.",
  },
];

const Features: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-5xl bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-red-400 mb-6">Our Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 p-6 flex flex-col items-center text-center space-y-4 transform hover:scale-105 transition-transform duration-300">
                <div className="p-3 bg-gray-900 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-red-300">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Features;

