import { Card } from "@/components/ui/card";
import { Thermometer, Mountain, Wind, Zap } from "lucide-react";

const dataPoints = [
  {
    icon: Thermometer,
    label: "Temperature",
    value: "-63°C",
    subtitle: "Average Surface",
    color: "text-blue-400",
  },
  {
    icon: Mountain,
    label: "Terrain",
    value: "21.9 km",
    subtitle: "Olympus Mons Height",
    color: "text-orange-400",
  },
  {
    icon: Wind,
    label: "Atmosphere",
    value: "95.3%",
    subtitle: "CO₂ Composition",
    color: "text-cyan-400",
  },
  {
    icon: Zap,
    label: "Solar Power",
    value: "590 W/m²",
    subtitle: "Peak Irradiance",
    color: "text-yellow-400",
  },
];

export const DataShowcase = () => {
  return (
    <section className="py-20 px-4 bg-background/40">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real NASA <span className="text-gradient-mars">Mars Data</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access authentic Martian environmental data to solve real-world challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataPoints.map((data) => {
            const Icon = data.icon;
            return (
              <Card 
                key={data.label}
                className="glass-card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className={`inline-flex p-4 rounded-full bg-background/50 mb-4 ${data.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{data.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{data.label}</div>
                <div className="text-xs text-muted-foreground/60">{data.subtitle}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
