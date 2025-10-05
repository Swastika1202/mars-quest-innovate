import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, ArrowLeft, MapPin, TestTube, Zap, AlertCircle, Info } from "lucide-react";
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
                  Water is essential for human survival, but Mars has no liquid water on its surface. While Mars has vast 
                  amounts of water ice at its poles and subsurface deposits, extracting and purifying this water presents 
                  enormous challenges. The ice is often mixed with toxic perchlorates, buried under meters of soil, and 
                  extraction requires significant energy in Mars' extreme cold. A reliable water extraction system is critical 
                  for drinking, agriculture, oxygen production, and rocket fuel manufacturing.
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

        {/* Interesting Facts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Interesting Facts About Mars Water</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Massive Ice Deposits</h3>
                  <p className="text-muted-foreground">
                    Mars' polar ice caps contain enough water ice to cover the entire planet in a layer 35 meters deep. 
                    NASA's Mars Reconnaissance Orbiter has also detected vast underground ice deposits in mid-latitudes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-cyan-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Perchlorate Problem</h3>
                  <p className="text-muted-foreground">
                    Martian soil contains 0.5-1% perchlorates, toxic chemicals that can damage the thyroid. Any water 
                    extracted must be thoroughly purified, requiring advanced filtration systems.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Ancient Rivers</h3>
                  <p className="text-muted-foreground">
                    Mars once had rivers, lakes, and possibly oceans 3.5 billion years ago. Evidence shows water flowed 
                    on the surface for hundreds of millions of years before the atmosphere thinned.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Sublimation Challenge</h3>
                  <p className="text-muted-foreground">
                    Due to Mars' low atmospheric pressure (0.6% of Earth's), water ice sublimates directly to vapor without 
                    becoming liquid. Extraction systems must capture vapor or work in pressurized environments.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Rocket Fuel Production</h3>
                  <p className="text-muted-foreground">
                    Water can be split into hydrogen and oxygen through electrolysis. This oxygen can be used for breathing 
                    and combined with hydrogen to create rocket fuel for the return journey to Earth.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Energy Intensive</h3>
                  <p className="text-muted-foreground">
                    Melting ice on Mars requires significant energy. At -60°C average temperature, heating water ice to 
                    usable temperatures demands efficient solar or nuclear power systems.
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

export default WaterExtraction;
