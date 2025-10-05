import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuildHabitat from "./pages/BuildHabitat";
import WaterExtraction from "./pages/WaterExtraction";
import SolarFarm from "./pages/SolarFarm";
import Greenhouse from "./pages/Greenhouse";
import StartMission from "./pages/StartMission";
import InnovationHubPage from "./pages/InnovationHub";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import LearningPage from "./pages/LearningPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage"; // Import CommunityPage
import SolutionDetails from "./pages/SolutionDetails"; // Import SolutionDetails page
import NasaKnowledge from "./pages/NasaKnowledge"; // Import NasaKnowledge page
import SubmitSolutionPage from "./pages/SubmitSolutionPage";
import { useState, useEffect } from 'react';
import { AuthProvider } from "@/context/AuthContext";

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
          <>
            <AuthProvider>
              <BrowserRouter>
                <Navbar />
                <div className="animate-slide-in-from-top-fade-in"> {/* Add padding-top for fixed navbar */}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<Index />} />
                    <Route path="/explore-mission" element={<div>Explore Mission Page Placeholder</div>} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} /> {/* Add a new route for SignUp */}
                    <Route path="/build-habitat" element={<BuildHabitat />} />
                    <Route path="/water-extraction" element={<WaterExtraction />} />
                    <Route path="/solar-farm" element={<SolarFarm />} />
                    <Route path="/greenhouse" element={<Greenhouse />} />
                    <Route path="/start-mission" element={<StartMission />} />
                    <Route path="/innovation-hub" element={<InnovationHubPage />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/learn-about-mars" element={<LearningPage />} />
                    <Route path="/profile" element={<ProfilePage />} /> {/* New route for ProfilePage */}
                    <Route path="/community" element={<CommunityPage />} /> {/* New route for CommunityPage */}
                    <Route path="/solution/:id" element={<SolutionDetails />} /> {/* Route for SolutionDetails */}
                    <Route path="/submit-solution" element={<SubmitSolutionPage />} /> {/* New route for SubmitSolutionPage */}
                    <Route path="/nasa-knowledge" element={<NasaKnowledge />} /> {/* New route for NasaKnowledge */}
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </AuthProvider>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
