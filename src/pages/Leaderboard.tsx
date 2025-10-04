import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Globe, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const globalLeaderboard = [
  { rank: 1, name: "Emma Zhang", country: "USA", school: "MIT", points: 15420, missions: 47, avatar: "EZ" },
  { rank: 2, name: "Lucas Silva", country: "Brazil", school: "Stanford", points: 14890, missions: 43, avatar: "LS" },
  { rank: 3, name: "Aisha Patel", country: "India", school: "Caltech", points: 13750, missions: 41, avatar: "AP" },
  { rank: 4, name: "You", country: "USA", school: "Your School", points: 12340, missions: 38, avatar: "YO" },
  { rank: 5, name: "Jordan Lee", country: "Canada", school: "UBC", points: 11920, missions: 35, avatar: "JL" },
  { rank: 6, name: "Sofia Rossi", country: "Italy", school: "ETH Zurich", points: 11540, missions: 34, avatar: "SR" },
  { rank: 7, name: "Chen Wei", country: "China", school: "Tsinghua", points: 11230, missions: 33, avatar: "CW" },
  { rank: 8, name: "Maya Rodriguez", country: "Mexico", school: "UNAM", points: 10890, missions: 32, avatar: "MR" },
  { rank: 9, name: "Oliver Zhang", country: "UK", school: "Oxford", points: 10560, missions: 31, avatar: "OZ" },
  { rank: 10, name: "Nina Kowalski", country: "Poland", school: "Warsaw Tech", points: 10340, missions: 30, avatar: "NK" },
];

const schoolLeaderboard = [
  { rank: 1, school: "MIT", students: 847, points: 425890, missions: 2341 },
  { rank: 2, school: "Stanford", students: 732, points: 398540, missions: 2156 },
  { rank: 3, school: "Caltech", students: 621, points: 367230, missions: 1987 },
  { rank: 4, school: "UC Berkeley", students: 789, points: 356780, missions: 1923 },
  { rank: 5, school: "ETH Zurich", students: 542, points: 334560, missions: 1854 },
];

const Leaderboard = () => {
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
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-mars">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Compete with students worldwide and climb the ranks by completing missions and sharing innovations
          </p>
        </section>

        {/* User Rank Card */}
        <section className="mb-12 max-w-3xl mx-auto">
          <Card className="glass-card p-6 bg-primary/10 border-primary/30">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full gradient-achievement flex items-center justify-center">
                <span className="text-3xl font-bold text-white">#4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">Your Rank</h3>
                <p className="text-muted-foreground">You're in the top 1% of all students!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">12,340</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="school" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Schools
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card className="glass-card p-6">
              <div className="space-y-3">
                {globalLeaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      entry.name === 'You' 
                        ? 'bg-primary/10 border-2 border-primary/30 scale-105' 
                        : 'bg-background/30 hover:bg-background/50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                      entry.rank === 1 ? 'gradient-achievement text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {entry.rank}
                    </div>

                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {entry.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.school} • {entry.country}
                      </div>
                    </div>
                    
                    <div className="hidden sm:block text-center">
                      <div className="text-sm font-semibold">{entry.missions}</div>
                      <div className="text-xs text-muted-foreground">missions</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{entry.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="school">
            <Card className="glass-card p-6">
              <div className="space-y-3">
                {schoolLeaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-all"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                      entry.rank === 1 ? 'gradient-achievement text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-bold text-xl">{entry.school}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.students} active students • {entry.missions} missions completed
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{entry.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">total points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="glass-card p-6">
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Weekly Challenge</h3>
                <p className="text-muted-foreground mb-6">
                  Complete 3 missions this week to appear on the weekly leaderboard
                </p>
                <Badge className="gradient-mars text-white px-4 py-2">
                  Resets in 4 days
                </Badge>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <section className="text-center mt-12">
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Climb the Ranks</h2>
            <p className="text-muted-foreground mb-6">
              Complete more missions, submit innovative solutions, and help other students to earn points and improve your rank.
            </p>
            <Button size="lg" className="gradient-mars text-white font-semibold px-8">
              Start a Mission
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Leaderboard;
