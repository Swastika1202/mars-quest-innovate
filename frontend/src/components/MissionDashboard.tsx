import { MissionCard } from "./MissionCard";
import { Target, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useMissions } from "../hooks/useApi";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { useState } from "react";

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty?: string;
  category?: string;
  requirements?: string[];
}

export const MissionDashboard = () => {
  const [renderError, setRenderError] = useState<Error | null>(null);
  const { data: missions = [], isLoading, error } = useMissions();
  
  const handleRetry = () => {
    setRenderError(null);
    // You might want to add a refetch function here if your useMissions hook supports it
  };

  // Map API mission to MissionCard props
  const mapMissionToCard = (mission: Mission) => {
    // Ensure we have a valid difficulty
    const difficulty = mission.difficulty?.toLowerCase() || 'intermediate';
    const formattedDifficulty = (() => {
      const d = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
      return (['Beginner', 'Intermediate', 'Advanced'] as const).includes(d as any)
        ? d as 'Beginner' | 'Intermediate' | 'Advanced'
        : 'Intermediate';
    })();
    
    // Ensure we have a valid icon
    const validIcons = ['habitat', 'water', 'energy', 'greenhouse'] as const;
    const icon = (() => {
      const missionIcon = mission.category?.toLowerCase() || 'habitat';
      return validIcons.includes(missionIcon as any)
        ? missionIcon as 'habitat' | 'water' | 'energy' | 'greenhouse'
        : validIcons[Math.floor(Math.random() * validIcons.length)];
    })();

    // Ensure we have valid dataUsed array
    let dataUsed: string[] = [];
    if (Array.isArray(mission.requirements)) {
      dataUsed = mission.requirements.slice(0, 3);
    } else if (typeof mission.requirements === 'string') {
      dataUsed = [mission.requirements];
    } else {
      dataUsed = ['Data analysis', 'Scientific research', 'Problem solving'];
    }

    return {
      title: mission.title || 'Untitled Mission',
      description: mission.description || 'No description available.',
      difficulty: formattedDifficulty,
      progress: Math.floor(Math.random() * 40) + 30, // Random progress for demo
      participants: Math.floor(Math.random() * 3000) + 1000, // Random participants for demo
      icon,
      dataUsed,
    };
  };

  // Handle errors
  if (error || renderError) {
    const errorMessage = error?.message || renderError?.message || 'An unknown error occurred';
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
              <Target className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Mission Control</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Mission Failed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We couldn't load the mission data. Please try again later.
            </p>
          </div>
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading missions</AlertTitle>
            <AlertDescription>
              {errorMessage}
              <div className="mt-4">
                <Button 
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // Show loading state
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

  // Main content
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
          {missions.length > 0 ? (
            missions.map((mission) => {
              try {
                const cardProps = mapMissionToCard(mission);
                return (
                  <div key={`mission-${mission.id}`} className="h-full">
                    <MissionCard 
                      title={cardProps.title}
                      description={cardProps.description}
                      difficulty={cardProps.difficulty}
                      progress={cardProps.progress}
                      participants={cardProps.participants}
                      icon={cardProps.icon}
                      dataUsed={cardProps.dataUsed}
                    />
                  </div>
                );
              } catch (err) {
                console.error('Error rendering mission:', mission.id, err);
                return null; // Skip rendering this card if there's an error
              }
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No missions available. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
