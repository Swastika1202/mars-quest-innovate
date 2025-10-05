import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft, Shield, Thermometer, Radiation, AlertCircle, Info } from "lucide-react";
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
                  Mars presents extreme challenges for human habitation: deadly cosmic radiation (2.5 times higher than on Earth), 
                  temperatures averaging -60°C with swings from -125°C to 20°C, an atmosphere 100 times thinner than Earth's, 
                  frequent dust storms that can last months, and only 38% of Earth's gravity. Any habitat must protect settlers 
                  from these harsh conditions while providing life support, being constructible with limited resources, and 
                  sustainable for long-term colonization.
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

        {/* Interesting Facts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Interesting Facts About Mars Habitats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Regolith Shielding</h3>
                  <p className="text-muted-foreground">
                    A 2-3 meter layer of Martian soil (regolith) on top of habitats can reduce radiation exposure by 50%, 
                    making it one of the most practical shielding solutions using local materials.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Underground Living</h3>
                  <p className="text-muted-foreground">
                    Mars has lava tubes that could house entire cities. These natural caves provide built-in radiation 
                    protection and stable temperatures, potentially housing up to 10,000 people.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">3D Printing Habitats</h3>
                  <p className="text-muted-foreground">
                    NASA's 3D-Printed Habitat Challenge showed that habitats can be constructed using Martian regolith 
                    mixed with water ice, reducing the need to transport building materials from Earth by 90%.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Pressurization Challenge</h3>
                  <p className="text-muted-foreground">
                    Mars habitats need to maintain 1 atmosphere of pressure while the outside is 0.6% of Earth's. 
                    This is like having a balloon inflated to 100 times the outside pressure - requiring incredibly strong materials.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Dust Problem</h3>
                  <p className="text-muted-foreground">
                    Martian dust is extremely fine (like talcum powder) and electrostatically charged, making it stick to 
                    everything. It can damage equipment, clog seals, and is potentially toxic to humans if inhaled.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-cyan-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Gravity Effects</h3>
                  <p className="text-muted-foreground">
                    At 38% of Earth's gravity, long-term health effects are unknown. Habitats may need centrifuge modules 
                    or other artificial gravity systems to prevent bone density loss and muscle atrophy.
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

export default BuildHabitat;
