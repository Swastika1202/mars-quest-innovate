import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Trophy, Medal, Zap, Target, Users, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";

const achievements = [
  { icon: Trophy, title: "First Habitat", description: "Complete your first habitat mission", rarity: "Common", unlocked: true, progress: 100 },
  { icon: Medal, title: "Water Expert", description: "Master all water extraction challenges", rarity: "Rare", unlocked: true, progress: 100 },
  { icon: Zap, title: "Solar Pioneer", description: "Design 5 solar farm systems", rarity: "Rare", unlocked: true, progress: 100 },
  { icon: Award, title: "Innovation Leader", description: "Get 1000+ votes on a solution", rarity: "Epic", unlocked: false, progress: 73 },
  { icon: Star, title: "Community Hero", description: "Help 50 other students", rarity: "Epic", unlocked: false, progress: 45 },
  { icon: Target, title: "Perfect Mission", description: "Complete any mission with 100% score", rarity: "Legendary", unlocked: false, progress: 88 },
  { icon: Users, title: "Team Player", description: "Collaborate on 10 group projects", rarity: "Common", unlocked: false, progress: 30 },
  { icon: Rocket, title: "Mars Pioneer", description: "Complete 50 missions", rarity: "Legendary", unlocked: false, progress: 12 },
];

const rarityColors = {
  Common: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  Rare: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Epic: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Legendary: "bg-accent/20 text-accent border-accent/30",
};

const Achievements = () => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = 12340;

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
          <div className="inline-flex p-4 rounded-full gradient-achievement mb-6">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Your <span className="text-gradient-achievement">Achievements</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track your progress and unlock rewards as you complete missions and contribute to the Mars community
          </p>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{unlockedCount}/{achievements.length}</div>
            <div className="text-muted-foreground">Achievements Unlocked</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{totalPoints.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Points</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">38</div>
            <div className="text-muted-foreground">Missions Completed</div>
          </Card>
        </section>

        {/* Achievements Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">All Achievements</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">All</Badge>
              <Badge variant="outline" className="cursor-pointer">Unlocked</Badge>
              <Badge variant="outline" className="cursor-pointer">In Progress</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={achievement.title}
                  className={`glass-card p-6 ${achievement.unlocked ? 'hover:scale-105' : 'opacity-70'} transition-all`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${achievement.unlocked ? 'gradient-achievement' : 'bg-muted'}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={`${rarityColors[achievement.rarity]} border text-xs`}>
                      {achievement.rarity}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                  {achievement.unlocked ? (
                    <div className="text-accent font-semibold flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Unlocked
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-semibold">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* Next Achievement */}
        <section className="max-w-3xl mx-auto">
          <Card className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Next Achievement</h2>
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation Leader</h3>
            <p className="text-muted-foreground mb-4">Get 1000+ votes on a solution (730/1000)</p>
            <Progress value={73} className="h-3 mb-6" />
            <Button className="gradient-mars text-white font-semibold">
              View Your Solutions
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Achievements;
