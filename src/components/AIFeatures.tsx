import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mentor Guidance",
    description: "Get personalized hints and suggestions from your AI mentor as you tackle complex Mars challenges.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description: "Receive instant analysis on your solutions with data-driven recommendations for improvement.",
  },
  {
    icon: TrendingUp,
    title: "Smart Progress Tracking",
    description: "AI-powered insights track your learning journey and suggest optimal next missions.",
  },
  {
    icon: Sparkles,
    title: "Innovation Scoring",
    description: "Advanced algorithms evaluate creativity, feasibility, and impact of your Mars solutions.",
  },
];

export const AIFeatures = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="text-gradient-mars">AI Mentors</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intelligent guidance and personalized learning paths help you master Mars settlement challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="glass-card p-6 text-center hover:scale-105 transition-transform group"
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
