import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Zap,
  GitCompare,
  BarChart3,
  Download,
  Shield,
  History
} from "lucide-react";

const features = [
  {
    icon: GitCompare,
    title: "Multi-LLM Comparison",
    description: "Test your prompts across multiple language models simultaneously including GPT-4, Claude, Gemini, and more."
  },
  {
    icon: Zap,
    title: "Parallel Processing",
    description: "Get results from all selected models in record time with optimized parallel API calls and smart caching."
  },
  {
    icon: BarChart3,
    title: "Automated Scoring",
    description: "Receive detailed performance metrics including coherence, relevance, readability, and response quality scores."
  },
  {
    icon: Download,
    title: "Export Reports",
    description: "Generate professional PDF or CSV reports to share your findings with team members and stakeholders."
  },
  {
    icon: Shield,
    title: "Secure API Management",
    description: "Your API keys are encrypted and stored securely with enterprise-grade security and privacy controls."
  },
  {
    icon: History,
    title: "Comparison History",
    description: "Access all your past comparisons, track performance trends, and build a knowledge base over time."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Powerful Features for
            <br />
            Smart Model Selection
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everything you need to evaluate, compare, and choose the right AI model 
            for your specific use cases.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm bg-background/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your AI model evaluation process?
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
            <span>Join thousands of developers and researchers</span>
            <span className="text-xs">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}