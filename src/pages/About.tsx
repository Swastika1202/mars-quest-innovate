import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-red-400 mb-6">About MarsConnect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-gray-300">
          <p>
            MarsConnect is an innovative educational platform dedicated to inspiring the next generation of space explorers, scientists, and engineers. Our mission is to make learning about Mars and space exploration engaging, interactive, and accessible to students worldwide.
          </p>
          <p>
            The platform was conceived with the vision of bridging the gap between complex scientific concepts and interactive, gamified learning experiences. We believe that by immersing students in the challenges and triumphs of Mars exploration, we can foster a deeper understanding of STEM subjects and encourage creative problem-solving.
          </p>
          <p>
            MarsConnect was founded in <strong>2025</strong> by a team of passionate educators, technologists, and space enthusiasts. We are committed to continuously updating our content and features to reflect the latest advancements in space science and educational technology.
          </p>
          <p>
            Through interactive missions, a dynamic learning page, an innovation hub for student solutions, and gamified elements like leaderboards and badges, MarsConnect aims to provide a comprehensive and exciting journey for every aspiring Martian.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;

