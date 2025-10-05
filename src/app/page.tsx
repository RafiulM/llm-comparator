"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Chat from "@/components/chat";
import { Button } from "@/components/ui/button";
import { checkEnvironmentVariables } from "@/lib/env-check";
import {
  CheckCircle,
  Zap,
  Database,
  Shield,
  ExternalLink,
  ArrowDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

export default function Home() {
  const envStatus = checkEnvironmentVariables();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <span className="font-semibold text-lg">LLM Comparator</span>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Application Section */}
      <section id="dashboard" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Start Comparing AI Models
              </h2>
              <p className="text-xl text-muted-foreground">
                Set up your API keys and begin your AI model evaluation journey
              </p>
              <div className="flex justify-center mt-6">
                <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
              </div>
            </div>

            {/* Setup Dashboard */}
            {envStatus.allConfigured ? (
              <div className="text-center mb-8 p-8 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <div className="text-4xl sm:text-5xl mb-2">🎉</div>
                <div className="font-bold text-lg sm:text-xl mb-1">All Set!</div>
                <div className="text-sm sm:text-base text-muted-foreground mb-4">
                  Your environment is configured and ready for AI model comparisons
                </div>
                <SignedIn>
                  <Button size="lg">
                    Start Comparing
                  </Button>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button size="lg">
                      Sign In to Begin
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            ) : (
              <>
                <div className="text-center mb-8 p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
                  <div className="text-4xl sm:text-5xl mb-2">⚠️</div>
                  <div className="font-semibold text-lg sm:text-xl mb-1">
                    Setup Required
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    Configure your environment variables to start using the LLM Comparator
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Clerk */}
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-800">
                    <div className="flex justify-center mb-4">
                      {envStatus.clerk ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <Shield className="w-8 h-8 text-blue-500" />
                      )}
                    </div>
                    <div className="font-semibold mb-2 text-lg">
                      Clerk Authentication
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {envStatus.clerk ? "✓ Configured" : "Setup required"}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open("https://dashboard.clerk.com", "_blank")
                  }
                      className="w-full"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Clerk Dashboard
                    </Button>
                  </div>

                  {/* Supabase */}
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800">
                    <div className="flex justify-center mb-4">
                      {envStatus.supabase ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <Database className="w-8 h-8 text-green-500" />
                      )}
                    </div>
                    <div className="font-semibold mb-2 text-lg">
                      Supabase Database
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {envStatus.supabase ? "✓ Configured" : "Setup required"}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open("https://supabase.com/dashboard", "_blank")
                      }
                      className="w-full"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Supabase Dashboard
                    </Button>
                  </div>

                  {/* AI Integration */}
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-800">
                    <div className="flex justify-center mb-4">
                      {envStatus.ai ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <Zap className="w-8 h-8 text-purple-500" />
                      )}
                    </div>
                    <div className="font-semibold mb-2 text-lg">
                      AI Integration
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {envStatus.ai ? "✓ Configured" : "Optional"}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open("https://platform.openai.com", "_blank")
                        }
                      >
                        OpenAI
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open("https://console.anthropic.com", "_blank")
                        }
                      >
                        Anthropic
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Chat Section - Only show when authenticated and configured */}
            <SignedIn>
              {envStatus.allConfigured && (
                <div className="mt-12">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">AI Model Comparison Interface</h3>
                    <p className="text-muted-foreground">
                      Start comparing different language models with your prompts
                    </p>
                  </div>
                  <Chat />
                </div>
              )}
            </SignedIn>
          </div>
        </div>
      </section>
    </div>
  );
}
