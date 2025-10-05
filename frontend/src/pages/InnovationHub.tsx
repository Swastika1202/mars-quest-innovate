import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Lightbulb, ThumbsUp, MessageCircle, Star, Search, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const innovations = [
  {
    id: "ih1",
    title: "3D-Printed Habitat from Regolith",
    author: "Sarah Chen",
    school: "MIT",
    votes: 1247,
    comments: 89,
    category: "Habitat",
    description: "A revolutionary approach using Martian soil and automated 3D printing to create radiation-resistant structures.",
    featured: true,
  },
  {
    id: "ih2",
    title: "Bio-Dome Air Recycling System",
    author: "Alex Kumar",
    school: "Stanford",
    votes: 892,
    comments: 63,
    category: "Life Support",
    description: "Closed-loop atmospheric system using engineered algae to convert CO₂ and produce oxygen efficiently.",
    featured: false,
  },
  {
    id: "ih3",
    title: "Underground Ice Mining Robot",
    author: "Maya Rodriguez",
    school: "Caltech",
    votes: 1105,
    comments: 74,
    category: "Water",
    description: "Autonomous rover design for extracting subsurface ice deposits with minimal energy consumption.",
    featured: false,
  },
  {
    id: "ih4",
    title: "Modular Greenhouse System",
    author: "James Park",
    school: "UC Berkeley",
    votes: 723,
    comments: 51,
    category: "Agriculture",
    description: "Expandable hydroponic farming modules that adapt to colony growth and resource availability.",
    featured: false,
  },
  {
    id: "ih5",
    title: "Solar Panel Dust Cleaner",
    author: "Zara Ahmed",
    school: "Georgia Tech",
    votes: 654,
    comments: 42,
    category: "Energy",
    description: "Electrostatic dust removal system that maintains solar panel efficiency during Martian dust storms.",
    featured: false,
  },
  {
    id: "ih6",
    title: "Mars Brick Manufacturing",
    author: "Oliver Zhang",
    school: "ETH Zurich",
    votes: 891,
    comments: 67,
    category: "Construction",
    description: "Process to create durable building materials from compressed Martian regolith using minimal energy.",
    featured: false,
  },
];

const topRatedSolutions = [
  { id: "1", author: "Emma Zhang", school: "MIT", title: "AI-Powered Habitat Design", votes: 2341, category: "Habitat" },
  { id: "2", author: "Lucas Silva", school: "Stanford", title: "Quantum Water Filter", votes: 2198, category: "Water" },
  { id: "3", author: "Aisha Patel", school: "Caltech", title: "Self-Repairing Solar Cells", votes: 2087, category: "Energy" },
  { id: "4", author: "Jordan Lee", school: "UC Berkeley", title: "Vertical Farming Tower", votes: 1956, category: "Agriculture" },
  { id: "5", author: "Sofia Rossi", school: "ETH Zurich", title: "Regolith 3D Printer", votes: 1834, category: "Construction" },
];

const InnovationHubPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const filteredInnovations = (() => {
    if (activeCategory === "All Categories") {
      return innovations;
    } else if (activeCategory === "Trending") {
      return innovations.filter(innovation => innovation.featured);
    } else {
      return innovations.filter(innovation => innovation.category === activeCategory);
    }
  })();

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
            <Lightbulb className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Innovation <span className="text-gradient-mars">Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover, vote on, and collaborate with innovative Mars settlement solutions from students worldwide
          </p>

          {/* Search & Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search innovations..." 
                className="pl-10 glass-card border-border/50"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Badge
              className={`cursor-pointer transition-colors ${
                activeCategory === "All Categories" ? "bg-primary/20 text-primary" : "hover:bg-primary/20"
              }`}
              onClick={() => setActiveCategory("All Categories")}
            >
              All Categories
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer transition-colors ${
                activeCategory === "Trending" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory("Trending")}
            >
              Trending
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer transition-colors ${
                activeCategory === "Habitat" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory("Habitat")}
            >
              Habitat
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer transition-colors ${
                activeCategory === "Water" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory("Water")}
            >
              Water
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer transition-colors ${
                activeCategory === "Energy" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory("Energy")}
            >
              Energy
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer transition-colors ${
                activeCategory === "Agriculture" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveCategory("Agriculture")}
            >
              Agriculture
            </Badge>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <div className="text-muted-foreground">Total Solutions</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">8,932</div>
            <div className="text-muted-foreground">Active Students</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">127</div>
            <div className="text-muted-foreground">Featured This Month</div>
          </Card>
        </section>

        {/* Tabs for All Solutions and Top Rated */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="all">All Solutions</TabsTrigger>
            <TabsTrigger value="top" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Top Rated
            </TabsTrigger>
          </TabsList>

          {/* All Solutions Tab */}
          <TabsContent value="all">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {activeCategory === "Trending" && <TrendingUp className="h-6 w-6 text-primary" />}
                  {activeCategory === "All Categories"
                    ? "All Solutions"
                    : activeCategory === "Trending"
                    ? "Trending Solutions"
                    : `${activeCategory} Solutions`}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInnovations.map((innovation) => (
                  <Card key={innovation.id} className="glass-card p-6 hover:scale-105 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-accent/20 text-accent border-accent/30 border">
                        {innovation.category}
                      </Badge>
                      {innovation.featured && (
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs font-semibold">Featured</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                      {innovation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {innovation.description}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {innovation.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{innovation.author}</div>
                        <div className="text-xs text-muted-foreground">{innovation.school}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{innovation.votes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{innovation.comments}</span>
                        </button>
                      </div>
                      <Link to={`/solution/${innovation.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Top Rated Tab */}
          <TabsContent value="top">
            <section>
              <h2 className="text-2xl font-bold mb-6">Top Rated Student Solutions</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
                {topRatedSolutions.map((solution, idx) => (
                  <Card key={solution.id} className="glass-card p-6 hover:scale-[1.02] transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
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
              </div>
            </section>
          </TabsContent>
        </Tabs>


        {/* Submit CTA */}
        <section className="text-center">
          <Card className="glass-card p-12">
            <h2 className="text-3xl font-bold mb-4">Share Your Innovation</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a groundbreaking idea for Mars settlement? Submit your solution and get feedback from the global community.
            </p>
            <Link to="/submit-solution">
              <Button size="lg" className="gradient-mars text-white font-semibold px-8">
                Submit Solution
              </Button>
            </Link>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default InnovationHubPage;
