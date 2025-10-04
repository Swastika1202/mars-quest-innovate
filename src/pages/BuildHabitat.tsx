import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, ArrowLeft, Shield, Thermometer, Radiation } from "lucide-react";
import { Link } from "react-router-dom";

const BuildHabitat = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
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
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full gradient-mars mb-6">
            <Home className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Build a <span className="text-gradient-mars">Mars Habitat</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Design a sustainable living structure using Martian soil composition and atmospheric data 
            to protect settlers from radiation and extreme temperatures.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">
              Intermediate
            </Badge>
            <Badge variant="outline">2,847 participants</Badge>
            <Badge variant="outline">65% average completion</Badge>
          </div>
        </section>

        {/* Mission Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Radiation Protection</h2>
            </div>
            <p className="text-muted-foreground">
              Design shielding systems using Martian regolith to protect inhabitants from cosmic radiation and solar flares.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Temperature Control</h2>
            </div>
            <p className="text-muted-foreground">
              Engineer insulation systems to maintain habitable temperatures despite Mars' -60°C average.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Radiation className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Structural Integrity</h2>
            </div>
            <p className="text-muted-foreground">
              Calculate load-bearing requirements for Mars' 38% Earth gravity and dust storm conditions.
            </p>
          </Card>
        </section>

        {/* Mission Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Mission Steps</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { step: 1, title: "Analyze Mars Terrain Data", progress: 100 },
              { step: 2, title: "Design Foundation System", progress: 100 },
              { step: 3, title: "Plan Radiation Shielding", progress: 75 },
              { step: 4, title: "Engineer Life Support Integration", progress: 50 },
              { step: 5, title: "3D Habitat Simulation", progress: 0 },
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

        {/* CTA */}
        <section className="text-center">
          <Button size="lg" className="gradient-mars text-white font-semibold px-8">
            Start Mission
          </Button>
        </section>
      </main>
    </div>
  );
};

export default BuildHabitat;
