"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { encrypt, decrypt } from "@/lib/encryption";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Profile doesn't exist, create it
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({ id: userId })
        .select()
        .single();

      if (createError) {
        throw new Error(`Failed to create profile: ${createError.message}`);
      }

      return newProfile;
    }
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  // Decrypt API keys if they exist
  if (data.openai_api_key) {
    data.openai_api_key = decrypt(data.openai_api_key);
  }
  if (data.google_api_key) {
    data.google_api_key = decrypt(data.google_api_key);
  }

  return data;
}

export async function updateUserProfile(formData: {
  openai_api_key?: string;
  google_api_key?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = await createSupabaseServerClient();

  // Encrypt API keys if provided
  const updateData: any = {};
  if (formData.openai_api_key) {
    updateData.openai_api_key = encrypt(formData.openai_api_key);
  }
  if (formData.google_api_key) {
    updateData.google_api_key = encrypt(formData.google_api_key);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  revalidatePath("/profile");
  return data;
}

export async function getDecryptedApiKeys() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("profiles")
    .select("openai_api_key, google_api_key")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch API keys: ${error.message}`);
  }

  return {
    openai_api_key: data.openai_api_key ? decrypt(data.openai_api_key) : null,
    google_api_key: data.google_api_key ? decrypt(data.google_api_key) : null,
  };
}