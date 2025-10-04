import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, ArrowLeft, Leaf, Droplets, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Greenhouse = () => {
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
            <Sprout className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Greenhouse <span className="text-gradient-mars">Agriculture</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Plan a Martian greenhouse using atmospheric composition data to grow food in low gravity 
            with limited resources.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">
              Intermediate
            </Badge>
            <Badge variant="outline">3,156 participants</Badge>
            <Badge variant="outline">71% average completion</Badge>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Crop Selection</h2>
            </div>
            <p className="text-muted-foreground">
              Choose crops optimized for Mars' 38% gravity and limited growing space to maximize nutrition.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Water Recycling</h2>
            </div>
            <p className="text-muted-foreground">
              Design closed-loop hydroponic systems to recycle 98% of water and minimize resource consumption.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Light Systems</h2>
            </div>
            <p className="text-muted-foreground">
              Engineer LED grow lights to supplement reduced Martian sunlight and optimize photosynthesis.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Mission Steps</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { step: 1, title: "Study Martian Soil Composition", progress: 100 },
              { step: 2, title: "Select Optimal Crops", progress: 85 },
              { step: 3, title: "Design Hydroponic System", progress: 70 },
              { step: 4, title: "Plan Lighting & Temperature", progress: 55 },
              { step: 5, title: "Calculate Yield Projections", progress: 30 },
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
          <Button size="lg" className="gradient-mars text-white font-semibold px-8">
            Start Mission
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Greenhouse;
