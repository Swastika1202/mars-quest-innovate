import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <Card className="glass-card p-12 text-center relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex p-4 rounded-full gradient-mars mb-6">
              <Rocket className="h-12 w-12 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Shape the Future of <span className="text-gradient-mars">Mars?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of students using real NASA data to solve humanity's greatest challenge. 
              Your innovations could help establish the first human settlement on Mars.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-mars text-white font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity">
                Start Your First Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg">
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Real NASA data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Global community</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
