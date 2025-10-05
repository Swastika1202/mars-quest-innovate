import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Star, Lightbulb } from "lucide-react";
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
  },
  {
    title: "Bio-Dome Air Recycling System",
    author: "Alex Kumar",
    school: "Stanford",
    votes: 892,
    comments: 63,
    category: "Life Support",
    description: "Closed-loop atmospheric system using engineered algae to convert CO₂ and produce oxygen efficiently.",
  },
  {
    title: "Underground Ice Mining Robot",
    author: "Maya Rodriguez",
    school: "Caltech",
    votes: 1105,
    comments: 74,
    category: "Water",
    description: "Autonomous rover design for extracting subsurface ice deposits with minimal energy consumption.",
  },
];

export const InnovationHub = () => {
  return (
    <section className="py-20 px-4 innovation-hub">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
            <Lightbulb className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Innovation Hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Student <span className="text-gradient-mars">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover, vote on, and collaborate with innovative Mars settlement solutions from students worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {innovations.map((innovation, idx) => (
            <Card key={innovation.title} className="glass-card p-6 hover:scale-105 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <Badge className="bg-accent/20 text-accent border-accent/30 border">
                  {innovation.category}
                </Badge>
                {idx === 0 && (
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

        <div className="text-center mt-12">
          <Link to="/innovation-hub">
            <Button size="lg" variant="outline" className="border-2 border-accent/50 hover:bg-accent/10">
              Explore All Solutions
            </Button>
          </Link>
          <Link to="/learn-about-mars" className="ml-4">
            <Button size="lg" className="gradient-mars text-white font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity">
              Learn About Mars
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
