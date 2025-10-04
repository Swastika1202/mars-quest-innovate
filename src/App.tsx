import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuildHabitat from "./pages/BuildHabitat";
import WaterExtraction from "./pages/WaterExtraction";
import SolarFarm from "./pages/SolarFarm";
import Greenhouse from "./pages/Greenhouse";
import StartMission from "./pages/StartMission";
import InnovationHubPage from "./pages/InnovationHub";
import StudentSolutions from "./pages/StudentSolutions";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import LearningPage from "./pages/LearningPage";
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            {/* Optionally keep a blank screen or a loading spinner here */}
          </div>
        ) : (
          <div className="animate-slide-in-from-top-fade-in">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/build-habitat" element={<BuildHabitat />} />
                <Route path="/water-extraction" element={<WaterExtraction />} />
                <Route path="/solar-farm" element={<SolarFarm />} />
                <Route path="/greenhouse" element={<Greenhouse />} />
                <Route path="/start-mission" element={<StartMission />} />
                <Route path="/innovation-hub" element={<InnovationHubPage />} />
                <Route path="/student-solutions" element={<StudentSolutions />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/learn-about-mars" element={<LearningPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
