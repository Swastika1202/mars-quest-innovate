import { MissionCard } from "./MissionCard";
import { Target } from "lucide-react";

const missions = [
  {
    title: "Build a Mars Habitat",
    description: "Design a sustainable living structure using Martian soil composition and atmospheric data to protect settlers from radiation and extreme temperatures.",
    difficulty: "Intermediate" as const,
    progress: 65,
    participants: 2847,
    icon: "habitat" as const,
    dataUsed: ["Terrain Data", "Temperature", "Radiation"],
  },
  {
    title: "Mars Water Extraction",
    description: "Develop a system to extract and purify water from Martian ice deposits using real subsurface ice mapping data from NASA.",
    difficulty: "Advanced" as const,
    progress: 42,
    participants: 1923,
    icon: "water" as const,
    dataUsed: ["Ice Mapping", "Subsurface", "Chemistry"],
  },
  {
    title: "Solar Farm Design",
    description: "Create an efficient solar energy system accounting for Mars' solar irradiance, dust storms, and day-night cycles to power the colony.",
    difficulty: "Beginner" as const,
    progress: 88,
    participants: 4521,
    icon: "energy" as const,
    dataUsed: ["Solar Data", "Atmosphere", "Dust Patterns"],
  },
  {
    title: "Greenhouse Agriculture",
    description: "Plan a Martian greenhouse using atmospheric composition data to grow food in low gravity with limited resources.",
    difficulty: "Intermediate" as const,
    progress: 71,
    participants: 3156,
    icon: "greenhouse" as const,
    dataUsed: ["Atmosphere", "Soil Analysis", "Light Levels"],
  },
];

export const MissionDashboard = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Active Missions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-mars">Challenge</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tackle real Mars settlement challenges using NASA data. Complete missions, earn badges, and contribute to humanity's future on Mars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission) => (
            <MissionCard key={mission.title} {...mission} />
          ))}
        </div>
      </div>
    </section>
  );
};
