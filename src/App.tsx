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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
