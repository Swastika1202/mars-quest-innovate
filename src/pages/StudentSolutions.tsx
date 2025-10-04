import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Award, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const topSolutions = [
  { id: "1", author: "Emma Zhang", school: "MIT", title: "AI-Powered Habitat Design", votes: 2341, category: "Habitat" },
  { id: "2", author: "Lucas Silva", school: "Stanford", title: "Quantum Water Filter", votes: 2198, category: "Water" },
  { id: "3", author: "Aisha Patel", school: "Caltech", title: "Self-Repairing Solar Cells", votes: 2087, category: "Energy" },
  { id: "4", author: "Jordan Lee", school: "UC Berkeley", title: "Vertical Farming Tower", votes: 1956, category: "Agriculture" },
  { id: "5", author: "Sofia Rossi", school: "ETH Zurich", title: "Regolith 3D Printer", votes: 1834, category: "Construction" },
];

const recentSolutions = [
  { id: "6", author: "Alex Kim", school: "Georgia Tech", title: "Mars Dust Storm Predictor", time: "2 hours ago", category: "Weather" },
  { id: "7", author: "Nina Kowalski", school: "Oxford", title: "Atmospheric CO₂ Converter", time: "5 hours ago", category: "Life Support" },
  { id: "8", author: "Ryan O'Connor", school: "Cambridge", title: "Emergency Medical Pod", time: "8 hours ago", category: "Healthcare" },
  { id: "9", author: "Yuki Tanaka", school: "Tokyo Tech", title: "Lightweight Rover Design", time: "12 hours ago", category: "Transportation" },
];

const StudentSolutions = () => {
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
            <Users className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Student <span className="text-gradient-mars">Solutions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse innovative Mars settlement solutions created by students around the world
          </p>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="top" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="top" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top" className="space-y-4">
            {topSolutions.map((solution, idx) => (
              <Card key={solution.title} className="glass-card p-6 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    idx === 0 ? 'gradient-achievement text-white' :
                    idx === 1 ? 'bg-gray-400 text-white' :
                    idx === 2 ? 'bg-orange-600 text-white' :
                    'bg-muted text-foreground'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {solution.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-semibold">{solution.author}</div>
                            <div className="text-xs text-muted-foreground">{solution.school}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-2">{solution.category}</Badge>
                        <div className="text-2xl font-bold text-primary">{solution.votes}</div>
                        <div className="text-xs text-muted-foreground">votes</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/solution/${solution.id}`}>
                    <Button size="sm" variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Solution
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            {topSolutions.slice().reverse().map((solution) => (
              <Card key={solution.title} className="glass-card p-6 hover:scale-[1.02] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {solution.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{solution.author}</div>
                        <div className="text-xs text-muted-foreground">{solution.school}</div>
                      </div>
                    </div>
                    <Badge>{solution.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{solution.votes}</div>
                    <div className="text-xs text-muted-foreground">votes</div>
                    <div className="text-sm text-accent mt-2">↑ 24% today</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/solution/${solution.id}`}>
                    <Button size="sm" variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Solution
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentSolutions.map((solution) => (
              <Card key={solution.title} className="glass-card p-6 hover:scale-[1.02] transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {solution.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{solution.author}</div>
                        <div className="text-xs text-muted-foreground">{solution.school}</div>
                      </div>
                    </div>
                    <Badge>{solution.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{solution.time}</div>
                    <Badge variant="outline" className="mt-2">New</Badge>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/solution/${solution.id}`}>
                    <Button size="sm" variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Solution
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Link to="/submit-solution">
            <Button size="lg" className="gradient-mars text-white font-semibold px-8 hover:text-white">
              Submit Your Solution
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default StudentSolutions;
