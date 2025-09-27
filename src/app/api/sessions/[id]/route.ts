import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("comparison_sessions")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Session fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch session" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify the session belongs to the current user
    if (data.user_id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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