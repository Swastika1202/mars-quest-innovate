import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, User, School, Lightbulb, TrendingUp, CalendarDays } from 'lucide-react';

// Placeholder data - in a real application, this would come from an API
const allSolutions = [
  {
    id: "1",
    author: "Emma Zhang",
    school: "MIT",
    title: "AI-Powered Habitat Design",
    votes: 2341,
    category: "Habitat",
    description: "An advanced AI-driven system for designing and optimizing Martian habitats. It incorporates real-time environmental data to ensure structural integrity and habitability, utilizing local regolith for construction materials.",
    fullContent: "Detailed schematics, material analysis, AI algorithms used, and simulation results. This solution focuses on maximizing space efficiency and minimizing resource consumption. Future plans include integration with autonomous construction robots.",
    dateSubmitted: "2025-09-10",
    imageUrl: "/placeholder.svg", // Placeholder image URL
  },
  {
    id: "2",
    author: "Lucas Silva",
    school: "Stanford",
    title: "Quantum Water Filter",
    votes: 2198,
    category: "Water",
    description: "A revolutionary quantum-based filtration system capable of purifying Martian water ice of perchlorates and other contaminants with unprecedented efficiency and minimal energy use.",
    fullContent: "Explanation of quantum filtration principles, experimental setup, purification rates, and energy consumption metrics. The design is compact and scalable for various mission sizes.",
    dateSubmitted: "2025-09-15",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    author: "Aisha Patel",
    school: "Caltech",
    title: "Self-Repairing Solar Cells",
    votes: 2087,
    category: "Energy",
    description: "Novel solar panel technology with integrated self-repairing polymers that can mend micro-fractures and dust abrasion, significantly extending operational lifespan on Mars.",
    fullContent: "Material science behind self-repairing polymers, efficiency ratings under Martian conditions, and cost-benefit analysis. Includes long-term durability predictions.",
    dateSubmitted: "2025-09-20",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "4",
    author: "Jordan Lee",
    school: "UC Berkeley",
    title: "Vertical Farming Tower",
    votes: 1956,
    category: "Agriculture",
    description: "A multi-tiered vertical farming system optimized for Martian greenhouses, using aeroponics and LED lighting to grow high-yield crops with minimal water and space.",
    fullContent: "Agricultural methodologies, nutrient delivery systems, light spectrum optimization, and crop yield forecasts. Focuses on redundancy and automation for critical life support.",
    dateSubmitted: "2025-09-22",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    author: "Sofia Rossi",
    school: "ETH Zurich",
    title: "Regolith 3D Printer",
    votes: 1834,
    category: "Construction",
    description: "An autonomous 3D printer capable of utilizing Martian regolith to construct durable structures, reducing reliance on Earth-supplied materials for Mars colonization.",
    fullContent: "Robotics and additive manufacturing principles, regolith composition analysis for printing, structural integrity tests, and deployment strategies for initial colonization.",
    dateSubmitted: "2025-09-25",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "6",
    author: "Alex Kim",
    school: "Georgia Tech",
    title: "Mars Dust Storm Predictor",
    votes: 1,
    category: "Weather",
    description: "An AI-powered system that predicts the onset and trajectory of Martian dust storms with high accuracy, enabling better mission planning and asset protection.",
    fullContent: "Machine learning models, atmospheric data input, prediction accuracy metrics, and integration with mission control systems. Crucial for long-term manned missions.",
    dateSubmitted: "2025-10-01",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "7",
    author: "Nina Kowalski",
    school: "Oxford",
    title: "Atmospheric CO₂ Converter",
    votes: 1,
    category: "Life Support",
    description: "A compact and highly efficient device to convert Martian atmospheric CO₂ into breathable oxygen and reusable carbon compounds for fuel and materials.",
    fullContent: "Chemical engineering processes, energy requirements for conversion, waste product management, and scalability for larger habitats. Essential for self-sufficiency.",
    dateSubmitted: "2025-10-02",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "8",
    author: "Ryan O'Connor",
    school: "Cambridge",
    title: "Emergency Medical Pod",
    votes: 1,
    category: "Healthcare",
    description: "A self-contained medical unit designed for rapid deployment in emergency situations on Mars, equipped with AI diagnostics and automated treatment systems.",
    fullContent: "Medical technology integration, AI diagnostic capabilities, autonomous treatment protocols, and emergency response simulations for common Martian injuries/illnesses.",
    dateSubmitted: "2025-10-03",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "9",
    author: "Yuki Tanaka",
    school: "Tokyo Tech",
    title: "Lightweight Rover Design",
    votes: 1,
    category: "Transportation",
    description: "An ultra-lightweight, high-maneuverability rover designed for extensive Martian surface exploration, capable of navigating challenging terrains and collecting diverse samples.",
    fullContent: "Robotics, material science for lightweight construction, navigation algorithms, and scientific instrumentation for sample collection and analysis.",
    dateSubmitted: "2025-10-04",
    imageUrl: "/placeholder.svg",
  },
];

const SolutionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = allSolutions.find((s) => s.id === id);

  if (!solution) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
        <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-red-400">Solution Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-300 mb-6">The solution you are looking for does not exist.</p>
            <Link to="/student-solutions">
              <Button className="bg-red-600 hover:bg-red-700">Back to Solutions</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50 mb-6">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student-solutions">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Solutions
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="w-full max-w-5xl mx-auto bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-red-400 mb-2">{solution.title}</CardTitle>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {solution.author}</span>
              <span className="flex items-center gap-1"><School className="h-4 w-4" /> {solution.school}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {solution.dateSubmitted}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">{solution.category}</Badge>
              <Badge variant="outline" className="flex items-center gap-1"><TrendingUp className="h-4 w-4" /> {solution.votes} Votes</Badge>
            </div>

            {solution.imageUrl && (
              <img src={solution.imageUrl} alt={solution.title} className="w-full h-auto rounded-lg object-cover mb-4" />
            )}
            
            <h3 className="text-2xl font-semibold text-red-300">Overview</h3>
            <p className="text-lg leading-relaxed text-gray-300">{solution.description}</p>

            {solution.fullContent && (
              <>
                <h3 className="text-2xl font-semibold text-red-300 mt-6">Detailed Information</h3>
                <p className="text-lg leading-relaxed text-gray-300">{solution.fullContent}</p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SolutionDetails;

