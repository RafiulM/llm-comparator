import { createSupabaseServerClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Zap, Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { userId } = await auth();
  if (!userId) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  
  const { data: session, error } = await supabase
    .from("comparison_sessions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !session) {
    notFound();
  }

  // Verify the session belongs to the current user
  if (session.user_id !== userId) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-6">
        <Link href="/history">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {session.title || "Untitled Comparison"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {session.model_a_name} vs {session.model_b_name}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">System Prompt</h4>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">{session.system_prompt || "No system prompt"}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">User Content</h4>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">{session.user_content || "No user content"}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Model A</h4>
                <div className="flex items-center gap-2">
                  <Badge>{session.model_a_provider}</Badge>
                  <span className="text-sm">{session.model_a_name}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Model B</h4>
                <div className="flex items-center gap-2">
                  <Badge>{session.model_b_provider}</Badge>
                  <span className="text-sm">{session.model_b_name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Model A: {session.model_a_name}</span>
                <Badge>{session.model_a_provider}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">
                  {session.model_a_completion || "No response generated"}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Model B: {session.model_b_name}</span>
                <Badge>{session.model_b_provider}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">
                  {session.model_b_completion || "No response generated"}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href={`/compare?session=${session.id}`}>
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Load This Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}