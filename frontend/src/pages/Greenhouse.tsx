import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, ArrowLeft, Leaf, Droplets, Sun, AlertCircle, Info } from "lucide-react";
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

        {/* Problem Statement */}
        <section className="mb-12">
          <Card className="glass-card p-8 border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Growing food on Mars is essential for long-term colonization, but presents unique challenges: 38% of Earth's 
                  gravity affects plant growth, Martian soil contains toxic perchlorates, the thin atmosphere provides almost 
                  no CO₂ for photosynthesis, and limited sunlight (44% of Earth's) requires supplemental lighting. Water is 
                  scarce and must be recycled efficiently. A successful greenhouse must produce nutritious food year-round 
                  while using minimal resources in a completely controlled environment.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Key Challenges */}
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

        {/* Interesting Facts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Interesting Facts About Mars Agriculture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">The Martian Potato</h3>
                  <p className="text-muted-foreground">
                    NASA and the International Potato Center tested growing potatoes in Mars-like soil conditions. Potatoes 
                    are ideal because they're nutritious, grow quickly, and can tolerate harsh conditions better than most crops.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Low Gravity Growth</h3>
                  <p className="text-muted-foreground">
                    Plants grown in Mars' 38% gravity may grow taller and weaker. Research on the ISS shows plants can adapt, 
                    but may need support structures and careful breeding to develop stronger stems in low gravity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Hydroponics vs Soil</h3>
                  <p className="text-muted-foreground">
                    Hydroponic systems use 90% less water than traditional soil farming and grow crops 30-50% faster. 
                    This makes them ideal for Mars where water is precious and space is limited.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Toxic Martian Soil</h3>
                  <p className="text-muted-foreground">
                    Martian regolith contains perchlorates at 0.5-1% concentration, which are toxic to humans. The soil must 
                    be washed or crops grown in imported/manufactured soil to avoid contamination.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">LED Grow Lights</h3>
                  <p className="text-muted-foreground">
                    Plants only use specific wavelengths of light for photosynthesis (mainly red and blue). LED systems can 
                    provide exactly these wavelengths, using 40% less energy than traditional grow lights.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Crop Diversity</h3>
                  <p className="text-muted-foreground">
                    NASA recommends growing lettuce, tomatoes, peppers, strawberries, and herbs for Mars missions. These 
                    provide essential vitamins, grow relatively quickly, and boost crew morale with fresh food.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Greenhouse;
