import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, Droplet, Home, Sprout, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MissionCardProps {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  participants: number;
  icon: "habitat" | "water" | "energy" | "greenhouse";
  dataUsed: string[];
}

const iconMap = {
  habitat: Home,
  water: Droplet,
  energy: Flame,
  greenhouse: Sprout,
};

const pathMap: Record<string, string> = {
  habitat: "/build-habitat",
  water: "/water-extraction",
  energy: "/solar-farm",
  greenhouse: "/greenhouse",
  default: "/" // Fallback to home if no matching route
};

const difficultyColors = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30"
};

export const MissionCard = ({ 
  title, 
  description, 
  difficulty, 
  progress, 
  participants,
  icon,
  dataUsed 
}: MissionCardProps) => {
  const Icon = iconMap[icon] || Home; // Fallback to Home icon if not found
  const path = pathMap[icon] || pathMap.default; // Use the default path if icon not found
  
  return (
    <Link to={path}>
      <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <Badge className={`${difficultyColors[difficulty]} border`}>
          {difficulty}
        </Badge>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

      {/* Data Sources */}
      <div className="flex flex-wrap gap-2 mb-4">
        {dataUsed.map((data) => (
          <span 
            key={data}
            className="text-xs px-2 py-1 rounded bg-secondary/50 text-secondary-foreground/80"
          >
            {data}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-semibold">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {participants.toLocaleString()} participants
        </span>
        <Button variant="ghost" size="sm" className="group-hover:text-primary">
          Start Mission
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
    </Link>
  );
};
