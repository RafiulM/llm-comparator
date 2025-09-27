import { createSupabaseServerClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Zap, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your history</h1>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  
  const { data: sessions, error } = await supabase
    .from("comparison_sessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error loading history</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No comparison sessions yet</h1>
          <p className="text-muted-foreground mb-6">
            Start comparing AI models to see your history here
          </p>
          <Link href="/compare">
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Start Comparing
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Comparison History</h1>
        <p className="text-muted-foreground">
          Review your previous AI model comparisons
        </p>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">
                    {session.title || "Untitled Comparison"}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {session.model_a_name} vs {session.model_b_name}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{session.model_a_provider}</Badge>
                  <Badge variant="outline">{session.model_b_provider}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">System Prompt</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.system_prompt || "No system prompt"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">User Content</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {session.user_content || "No user content"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/history/${session.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/compare?session=${session.id}`}>
                    <Button size="sm">
                      <Zap className="mr-1 h-3 w-3" />
                      Load Session
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}