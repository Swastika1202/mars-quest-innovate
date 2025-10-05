import { Button } from "@/components/ui/button";
import { Rocket, Users } from "lucide-react";
import marsHero from "@/assets/mars-hero.jpg";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${marsHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient-mars">MarsConnect</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/90">
            Student Innovation Hub for Mars Settlement
          </p>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Join thousands of students using real NASA Mars data to solve humanity's greatest challenge:
          building sustainable habitats on the Red Planet. Complete missions, innovate solutions, and shape the future of space exploration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/start-mission">
            <Button size="lg" className="gradient-mars text-white font-semibold px-8 py-6 text-lg hero-start-mission">
              <Rocket className="mr-2 h-5 w-5" />
              Start Your Mission
            </Button>
          </Link>
          <Link to="/community">
            <Button size="lg" variant="outline" className="border-2 border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg hero-join-hub">
              <Users className="mr-2 h-5 w-5" />
              Join Innovation Hub
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-gradient-mars mb-2">12,547</div>
            <div className="text-muted-foreground">Active Students</div>
          </div>
          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-gradient-mars mb-2">847</div>
            <div className="text-muted-foreground">Missions Completed</div>
          </div>
          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-gradient-mars mb-2">3,294</div>
            <div className="text-muted-foreground">Solutions Shared</div>
          </div>
        </div>
      </div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};
