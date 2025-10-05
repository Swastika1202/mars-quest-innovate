import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, ArrowLeft, Sun, Wind, Battery, AlertCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const SolarFarm = () => {
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
            <Flame className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Solar Farm <span className="text-gradient-mars">Design</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Create an efficient solar energy system accounting for Mars' solar irradiance, 
            dust storms, and day-night cycles to power the colony.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
              Beginner
            </Badge>
            <Badge variant="outline">4,521 participants</Badge>
            <Badge variant="outline">88% average completion</Badge>
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
                  Mars receives only 44% of the solar energy that Earth does, making solar power generation challenging. 
                  Frequent dust storms can block up to 99% of sunlight for weeks or months, and the fine Martian dust 
                  accumulates on solar panels, reducing efficiency by up to 40% per month. The colony needs reliable, 
                  continuous power for life support, heating, water extraction, and manufacturing, requiring innovative 
                  solar farm designs with energy storage and dust mitigation systems.
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
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Solar Efficiency</h2>
            </div>
            <p className="text-muted-foreground">
              Calculate optimal panel placement considering Mars receives only 44% of Earth's solar irradiance.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Dust Management</h2>
            </div>
            <p className="text-muted-foreground">
              Design self-cleaning mechanisms to handle Mars' frequent dust storms that reduce solar efficiency.
            </p>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Battery className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Energy Storage</h2>
            </div>
            <p className="text-muted-foreground">
              Plan battery systems for 24.6-hour Martian day-night cycles and extended dust storm periods.
            </p>
          </Card>
        </section>

        {/* Interesting Facts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Interesting Facts About Solar Power on Mars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="glass-card p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Reduced Solar Energy</h3>
                  <p className="text-muted-foreground">
                    Mars receives 590 watts per square meter at its closest point to the Sun, compared to Earth's 1,361 watts. 
                    This means solar panels need to be 2-3 times larger to generate the same power.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Dust Storm Darkness</h3>
                  <p className="text-muted-foreground">
                    The 2018 global dust storm on Mars blocked so much sunlight that NASA's Opportunity rover, powered by 
                    solar panels, went into hibernation and never recovered. Storms can last 3-4 months.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Cold Advantage</h3>
                  <p className="text-muted-foreground">
                    Solar panels are actually more efficient in cold temperatures. Mars' -60°C average could increase panel 
                    efficiency by 10-15% compared to hot Earth deserts, partially offsetting the reduced sunlight.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Electrostatic Dust</h3>
                  <p className="text-muted-foreground">
                    Martian dust particles are electrostatically charged and stick to surfaces like glue. Passive cleaning 
                    methods don't work well - active systems using vibration or electrostatic repulsion are needed.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Longer Days</h3>
                  <p className="text-muted-foreground">
                    A Martian day (sol) is 24 hours and 39 minutes, slightly longer than Earth's. This means solar panels 
                    can generate power for a bit longer each day, but also need larger battery systems for the longer nights.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Nuclear Backup</h3>
                  <p className="text-muted-foreground">
                    Most Mars mission designs include nuclear power (RTGs) as backup during dust storms. The Perseverance 
                    rover uses a nuclear battery that provides steady power regardless of weather conditions.
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

export default SolarFarm;
