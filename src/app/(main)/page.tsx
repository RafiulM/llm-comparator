import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowRight, Shield, Key } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">LLM Comparator</h1>
          </div>
          <Navigation />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Compare LLM Models
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Side-by-side comparison of OpenAI and Google Gemini models. 
            Test different prompts and see how each model responds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compare">
              <Button size="lg" className="text-lg">
                Start Comparing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="text-lg">
                <Key className="mr-2 h-5 w-5" />
                Setup API Keys
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Side-by-Side Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compare responses from different LLM models in real-time with a split-screen interface.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-green-600" />
                Secure API Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your API keys are encrypted and stored securely. Each user manages their own keys.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Session History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save and revisit your comparison sessions. Track your experiments over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supported Models */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-2xl mx-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Models</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">OpenAI Models</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• GPT-5 (when available)</li>
              <li>• o3-mini</li>
              <li>• GPT-4o</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-600">Google Gemini Models</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Gemini 2.5 Pro</li>
              <li>• Gemini 2.5 Flash</li>
              <li>• Gemini 2.5 Flash Lite</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}