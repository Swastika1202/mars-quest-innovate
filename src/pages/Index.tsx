import { Hero } from "@/components/Hero";
import { MissionDashboard } from "@/components/MissionDashboard";
import { DataShowcase } from "@/components/DataShowcase";
import { InnovationHub } from "@/components/InnovationHub";
import { GamificationPanel } from "@/components/GamificationPanel";
import { AIFeatures } from "@/components/AIFeatures";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <MissionDashboard />
      <DataShowcase />
      <InnovationHub />
      <AIFeatures />
      <GamificationPanel />
      <CTASection />
    </div>
  );
};

export default Index;
