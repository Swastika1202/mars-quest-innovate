import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lightbulb, ThumbsUp, MessageCircle, Star, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const innovations = [
  {
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

const InnovationHubPage = () => {
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
            <Badge className="cursor-pointer hover:bg-primary/20 transition-colors">All Categories</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">Habitat</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">Water</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">Energy</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">Agriculture</Badge>
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

        {/* Innovations Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Trending Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovations.map((innovation) => (
              <Card key={innovation.title} className="glass-card p-6 hover:scale-105 transition-all group">
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
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <section className="text-center">
          <Card className="glass-card p-12">
            <h2 className="text-3xl font-bold mb-4">Share Your Innovation</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a groundbreaking idea for Mars settlement? Submit your solution and get feedback from the global community.
            </p>
            <Button size="lg" className="gradient-mars text-white font-semibold px-8">
              Submit Solution
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default InnovationHubPage;
