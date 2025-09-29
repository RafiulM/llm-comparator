"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Chat from "@/components/chat";
import HeroSection from "@/components/marketing/HeroSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkEnvironmentVariables } from "@/lib/env-check";
import {
  Copy,
  CheckCircle,
  AlertCircle,
  Zap,
  Database,
  Shield,
  ExternalLink,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  const envStatus = checkEnvironmentVariables();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      <main id="comparison-section" className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-5xl">
        {envStatus.allConfigured ? (
          <div className="text-center mb-8">
            <div className="text-4xl sm:text-5xl mb-2">🎉</div>
            <div className="font-bold text-lg sm:text-xl mb-1">All Set!</div>
            <div className="text-sm sm:text-base text-muted-foreground">
              Ready for development
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl sm:text-5xl mb-2">⚠️</div>
              <div className="font-semibold text-lg sm:text-xl mb-1">
                Setup Required
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                Retrieve keys for environment variables
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Clerk */}
              <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
                <div className="flex justify-center mb-3">
                  {envStatus.clerk ? (
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  ) : (
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                  )}
                </div>
                <div className="font-semibold mb-2 text-sm sm:text-base">
                  Clerk Auth
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  {envStatus.clerk ? "✓ Ready" : "Setup required"}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open("https://dashboard.clerk.com", "_blank")
                  }
                  className="w-full text-xs sm:text-sm"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Dashboard
                </Button>
              </div>

              {/* Supabase */}
              <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
                <div className="flex justify-center mb-3">
                  {envStatus.supabase ? (
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  ) : (
                    <Database className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  )}
                </div>
                <div className="font-semibold mb-2 text-sm sm:text-base">
                  Supabase DB
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  {envStatus.supabase ? "✓ Ready" : "Setup required"}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open("https://supabase.com/dashboard", "_blank")
                  }
                  className="w-full text-xs sm:text-sm"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Dashboard
                </Button>
              </div>

              {/* AI */}
              <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 sm:col-span-2 md:col-span-1">
                <div className="flex justify-center mb-3">
                  {envStatus.ai ? (
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  ) : (
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                  )}
                </div>
                <div className="font-semibold mb-2 text-sm sm:text-base">
                  AI SDK
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  {envStatus.ai ? "✓ Ready" : "Optional"}
                </div>
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open("https://platform.openai.com", "_blank")
                    }
                    className="text-xs px-1 sm:px-2"
                  >
                    OpenAI
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open("https://console.anthropic.com", "_blank")
                    }
                    className="text-xs px-1 sm:px-2"
                  >
                    Anthropic
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Chat Section */}
        <SignedIn>
          {envStatus.allConfigured && (
            <div className="mt-6 sm:mt-8">
              <Chat />
            </div>
          )}
        </SignedIn>
      </main>
    </div>
  );
}
