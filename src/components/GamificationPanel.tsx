import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Zap } from "lucide-react";
import badgeMars from "@/assets/badge-mars.png";

const achievements = [
  {
    icon: Trophy,
    title: "First Habitat",
    description: "Complete your first habitat mission",
    rarity: "Common",
    unlocked: true,
  },
  {
    icon: Medal,
    title: "Water Expert",
    description: "Master all water extraction challenges",
    rarity: "Rare",
    unlocked: true,
  },
  {
    icon: Award,
    title: "Innovation Leader",
    description: "Get 1000+ votes on a solution",
    rarity: "Epic",
    unlocked: false,
  },
  {
    icon: Zap,
    title: "Mars Pioneer",
    description: "Complete 50 missions",
    rarity: "Legendary",
    unlocked: false,
  },
];

const leaderboard = [
  { rank: 1, name: "Emma Zhang", points: 15420, missions: 47 },
  { rank: 2, name: "Lucas Silva", points: 14890, missions: 43 },
  { rank: 3, name: "Aisha Patel", points: 13750, missions: 41 },
  { rank: 4, name: "You", points: 12340, missions: 38 },
  { rank: 5, name: "Jordan Lee", points: 11920, missions: 35 },
];

const rarityColors = {
  Common: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  Rare: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Epic: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Legendary: "bg-accent/20 text-accent border-accent/30",
};

export const GamificationPanel = () => {
  return (
    <section className="py-20 px-4 bg-background/40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Earn <span className="text-gradient-achievement">Achievements</span>
              </h2>
              <p className="text-muted-foreground">
                Unlock badges and rewards as you complete missions and contribute solutions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.title}
                    className={`glass-card p-5 ${achievement.unlocked ? 'hover:scale-105' : 'opacity-60'} transition-all`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'gradient-achievement' : 'bg-muted'}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge className={`${rarityColors[achievement.rarity]} border text-xs`}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <h3 className="font-bold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-3 text-xs text-accent font-semibold">✓ Unlocked</div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-gradient-mars">Leaderboard</span>
              </h2>
              <p className="text-muted-foreground">
                Compete with students worldwide and climb the ranks
              </p>
            </div>

            <Card className="glass-card p-6">
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      entry.name === 'You' 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'bg-background/30'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      entry.rank === 1 ? 'gradient-achievement text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">{entry.missions} missions</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
