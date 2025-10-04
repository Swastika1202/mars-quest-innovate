import { MissionCard } from "./MissionCard";
import { Target, Loader2, AlertCircle } from "lucide-react";
import { useMissions } from "../hooks/useApi";
import { Alert, AlertDescription } from "./ui/alert";

export const MissionDashboard = () => {
  const { data: missions, isLoading, error } = useMissions();

  // Helper function to map API mission to component props
  const mapMissionToCard = (mission: any) => ({
    title: mission.title,
    description: mission.description,
    difficulty: mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1),
    progress: Math.floor(Math.random() * 40) + 30, // Random progress for demo
    participants: Math.floor(Math.random() * 3000) + 1000, // Random participants for demo
    icon: mission.category as const,
    dataUsed: mission.requirements.slice(0, 3), // Use first 3 requirements as data used
  });

  if (isLoading) {
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
              Loading Mars missions from NASA data...
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
          </div>
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load missions. Please check your connection and try again.
              <br />
              <span className="text-sm text-muted-foreground">
                Error: {error.message}
              </span>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

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
          {missions?.map((mission) => (
            <MissionCard key={mission.id} {...mapMissionToCard(mission)} />
          ))}
        </div>
      </div>
    </section>
  );
};
