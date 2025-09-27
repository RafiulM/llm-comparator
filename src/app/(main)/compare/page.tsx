"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Zap, Save, Eye, EyeOff } from "lucide-react";
import { compareModels } from "@/app/actions/comparison";
import { useRouter, useSearchParams } from "next/navigation";

const OPENAI_MODELS = [
  { value: "gpt-5", label: "GPT-5" },
  { value: "o3-mini", label: "o3-mini" },
  { value: "gpt-4o", label: "GPT-4o" },
];

const GEMINI_MODELS = [
  { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite" },
];

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionLoading, setSessionLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    systemPrompt: "You are a helpful AI assistant.",
    userContent: "",
    modelA: { provider: "openai", name: "gpt-4o" },
    modelB: { provider: "google", name: "gemini-2.5-flash" },
  });

  // Load session data if session ID is provided
  useEffect(() => {
    const sessionId = searchParams.get('session');
    if (sessionId) {
      loadSession(sessionId);
    }
  }, [searchParams]);

  const loadSession = async (sessionId: string) => {
    setSessionLoading(true);
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (response.ok) {
        const { data } = await response.json();
        setFormData({
          systemPrompt: data.system_prompt || "You are a helpful AI assistant.",
          userContent: data.user_content || "",
          modelA: {
            provider: data.model_a_provider as "openai" | "google",
            name: data.model_a_name,
          },
          modelB: {
            provider: data.model_b_provider as "openai" | "google",
            name: data.model_b_name,
          },
        });
        setSessionTitle(data.title || "");
        
        // Set results if completions exist
        if (data.model_a_completion || data.model_b_completion) {
          setResults({
            modelA: {
              content: data.model_a_completion || "",
            },
            modelB: {
              content: data.model_b_completion || "",
            },
          });
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      setError("Failed to load session data");
    } finally {
      setSessionLoading(false);
    }
  };

  const [results, setResults] = useState<{
    modelA: { content: string; usage?: any; error?: string };
    modelB: { content: string; usage?: any; error?: string };
  } | null>(null);

  const handleCompare = async () => {
    if (!formData.userContent.trim()) {
      setError("Please enter some content to compare.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await compareModels({
        systemPrompt: formData.systemPrompt,
        userContent: formData.userContent,
        modelA: formData.modelA,
        modelB: formData.modelB,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setResults(result);
        setShowResults(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSession = async () => {
    if (!results || !sessionTitle.trim()) return;

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: sessionTitle,
          systemPrompt: formData.systemPrompt,
          userContent: formData.userContent,
          modelA: formData.modelA,
          modelB: formData.modelB,
          results,
        }),
      });

      if (response.ok) {
        router.push("/history");
      }
    } catch (err) {
      setError("Failed to save session");
    }
  };

  if (sessionLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading session data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare LLM Models</h1>
        <p className="text-muted-foreground">
          Test different AI models side-by-side with the same prompts
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* System Prompt */}
          <div>
            <label className="text-sm font-medium mb-2 block">System Prompt</label>
            <Textarea
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              placeholder="Enter system prompt..."
              className="min-h-[80px]"
            />
          </div>

          {/* User Content */}
          <div>
            <label className="text-sm font-medium mb-2 block">User Content</label>
            <Textarea
              value={formData.userContent}
              onChange={(e) => setFormData({ ...formData, userContent: e.target.value })}
              placeholder="Enter your prompt or content..."
              className="min-h-[120px]"
            />
          </div>

          {/* Model Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Model A</label>
              <div className="space-y-2">
                <Select
                  value={formData.modelA.provider}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    modelA: { ...formData.modelA, provider: value as "openai" | "google" } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="google">Google Gemini</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={formData.modelA.name}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    modelA: { ...formData.modelA, name: value } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.modelA.provider === "openai" ? OPENAI_MODELS : GEMINI_MODELS).map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Model B</label>
              <div className="space-y-2">
                <Select
                  value={formData.modelB.provider}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    modelB: { ...formData.modelB, provider: value as "openai" | "google" } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="google">Google Gemini</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={formData.modelB.name}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    modelB: { ...formData.modelB, name: value } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.modelB.provider === "openai" ? OPENAI_MODELS : GEMINI_MODELS).map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Action Button */}
          <Button
            onClick={handleCompare}
            disabled={loading}
            className="w-full md:w-auto"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Compare Models
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && results && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Results</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Session title (optional)"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                className="w-64"
              />
              <Button
                onClick={handleSaveSession}
                disabled={!sessionTitle.trim()}
                variant="outline"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Session
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Model A Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Model A: {formData.modelA.name}</span>
                  <Badge variant="secondary">{formData.modelA.provider}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.modelA.error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{results.modelA.error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                      {results.modelA.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Model B Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Model B: {formData.modelB.name}</span>
                  <Badge variant="secondary">{formData.modelB.provider}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.modelB.error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{results.modelB.error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                      {results.modelB.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}