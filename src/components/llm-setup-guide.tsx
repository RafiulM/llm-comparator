"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Database, 
  Shield, 
  ExternalLink, 
  Key,
  Lock
} from "lucide-react";
import { checkLLMEnvironmentVariables } from "@/lib/llm-env-check";
import { useToast } from "@/hooks/use-toast";

export function LLMSetupGuide() {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  const envStatus = checkLLMEnvironmentVariables();

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      toast({
        title: "Copied!",
        description: "Environment variable copied to clipboard",
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const generateEncryptionKey = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Environment Status
          </CardTitle>
          <CardDescription>
            Check your current configuration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {envStatus.allConfigured ? (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                All required environment variables are configured! Your LLM Comparator is ready to use.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                Missing required variables: {envStatus.missing}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Required Configuration */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Authentication (Clerk)
            </CardTitle>
            <CardDescription>
              Set up user authentication for your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Clerk Publishable Key</span>
                {envStatus.required.clerk.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Configured
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Missing
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Clerk Secret Key</span>
                {envStatus.required.clerk.CLERK_SECRET_KEY ? (
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Configured
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Missing
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open("https://dashboard.clerk.com", "_blank")}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Clerk Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database (Supabase)
            </CardTitle>
            <CardDescription>
              Configure your PostgreSQL database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Supabase URL</span>
                {envStatus.required.supabase.NEXT_PUBLIC_SUPABASE_URL ? (
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Configured
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Missing
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Supabase Anon Key</span>
                {envStatus.required.supabase.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Configured
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Missing
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Supabase Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Encryption Key
            </CardTitle>
            <CardDescription>
              Generate a secure encryption key for API keys
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Encryption Key</span>
              {envStatus.required.encryption.API_ENCRYPTION_KEY ? (
                <Badge variant="secondary" className="text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-red-600">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
            
            {!envStatus.required.encryption.API_ENCRYPTION_KEY && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`API_ENCRYPTION_KEY=${generateEncryptionKey()}`}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted font-mono"
                  />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(generateEncryptionKey(), "encryption-key")}
                  >
                    {copied === "encryption-key" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Copy this key and add it to your .env.local file
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Optional API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Optional API Keys
          </CardTitle>
          <CardDescription>
            These will be configured per-user in the profile settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">OpenAI API Key</div>
                <div className="text-sm text-muted-foreground">
                  For GPT models (users configure their own)
                </div>
              </div>
              <Badge variant="outline">User Configured</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Google Gemini API Key</div>
                <div className="text-sm text-muted-foreground">
                  For Gemini models (users configure their own)
                </div>
              </div>
              <Badge variant="outline">User Configured</Badge>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Users will add their own API keys in the profile settings. These are encrypted and stored securely.
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            What to do after setting up your environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Complete the environment configuration above</li>
            <li>Run database migrations: <code className="bg-muted px-2 py-1 rounded">npm run db:migrate</code></li>
            <li>Start the development server: <code className="bg-muted px-2 py-1 rounded">npm run dev</code></li>
            <li>Sign up for an account and configure your API keys in profile settings</li>
            <li>Start comparing AI models!</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}