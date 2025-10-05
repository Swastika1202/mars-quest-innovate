import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Rocket, Home, Droplet, Flame, Sprout, Target, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const missions = [
  {
    title: "Build a Mars Habitat",
    path: "/build-habitat",
    icon: Home,
    difficulty: "Intermediate",
    color: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  },
  {
    title: "Mars Water Extraction",
    path: "/water-extraction",
    icon: Droplet,
    difficulty: "Advanced",
    color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
  },
  {
    title: "Solar Farm Design",
    path: "/solar-farm",
    icon: Flame,
    difficulty: "Beginner",
    color: "bg-orange-500/20 border-orange-500/30 text-orange-400",
  },
  {
    title: "Greenhouse Agriculture",
    path: "/greenhouse",
    icon: Sprout,
    difficulty: "Intermediate",
    color: "bg-green-500/20 border-green-500/30 text-green-400",
  },
];

const StartMission = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full gradient-mars mb-6">
            <Rocket className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Start Your <span className="text-gradient-mars">Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose a challenge and use real NASA Mars data to solve critical problems for humanity's future on Mars.
          </p>
        </section>

        {/* Mission Selection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Missions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {missions.map((mission) => {
              const Icon = mission.icon;
              return (
                <Link key={mission.path} to={mission.path}>
                  <Card className="glass-card p-6 hover:scale-105 transition-all group cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-lg ${mission.color} border`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <Badge variant="outline">{mission.difficulty}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {mission.title}
                    </h3>
                    <Button variant="ghost" className="mt-4 text-primary hover:text-primary">
                      Begin Mission →
                    </Button>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Start */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Start a Mission?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real NASA Data</h3>
              <p className="text-muted-foreground">
                Work with authentic Mars datasets including terrain, temperature, and atmospheric composition.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Community</h3>
              <p className="text-muted-foreground">
                Collaborate with thousands of students worldwide solving the same challenges.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Recognition</h3>
              <p className="text-muted-foreground">
                Unlock achievements, climb leaderboards, and showcase your innovations to the community.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StartMission;
