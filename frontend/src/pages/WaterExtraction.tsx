import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplet, ArrowLeft, MapPin, TestTube, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const WaterExtraction = () => {
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
            <Droplet className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mars <span className="text-gradient-mars">Water Extraction</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Develop a system to extract and purify water from Martian ice deposits using real 
            subsurface ice mapping data from NASA.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">
              Advanced
            </Badge>
            <Badge variant="outline">1,923 participants</Badge>
            <Badge variant="outline">42% average completion</Badge>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Ice Mapping</h2>
            </div>
            <p className="text-muted-foreground">
              Use NASA subsurface radar data to locate and analyze ice deposit locations beneath the Martian surface.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <TestTube className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Purification</h2>
            </div>
            <p className="text-muted-foreground">
              Design filtration systems to remove perchlorates and other contaminants from extracted Martian ice.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Energy Efficiency</h2>
            </div>
            <p className="text-muted-foreground">
              Optimize extraction process to minimize energy consumption in Mars' challenging environment.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Mission Steps</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { step: 1, title: "Study NASA Ice Mapping Data", progress: 100 },
              { step: 2, title: "Select Extraction Site", progress: 80 },
              { step: 3, title: "Design Drilling System", progress: 40 },
              { step: 4, title: "Plan Purification Process", progress: 20 },
              { step: 5, title: "Calculate Energy Requirements", progress: 0 },
            ].map((item) => (
              <Card key={item.step} className="glass-card p-5">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    item.progress === 100 ? 'gradient-achievement text-white' : 'bg-muted text-foreground'
                  }`}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold flex-1">{item.title}</h3>
                  <span className="text-sm text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <Button size="lg" className="gradient-mars text-white font-semibold px-8 hover:!bg-[unset] hover:!text-white">
            Start Mission
          </Button>
        </section>
      </main>
    </div>
  );
};

export default WaterExtraction;
