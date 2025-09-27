import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      systemPrompt,
      userContent,
      modelA,
      modelB,
      results,
    } = body;

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("comparison_sessions")
      .insert({
        title,
        system_prompt: systemPrompt,
        user_content: userContent,
        model_a_provider: modelA.provider,
        model_a_name: modelA.name,
        model_a_completion: results.modelA.content,
        model_b_provider: modelB.provider,
        model_b_name: modelB.name,
        model_b_completion: results.modelB.content,
      })
      .select()
      .single();

    if (error) {
      console.error("Session save error:", error);
      return NextResponse.json(
        { error: "Failed to save session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("comparison_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Session fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch sessions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}