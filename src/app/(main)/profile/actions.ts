"use server";

import { updateUserProfile } from "@/app/actions/profiles";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  try {
    const openai_api_key = formData.get("openai_api_key") as string;
    const google_api_key = formData.get("google_api_key") as string;

    await updateUserProfile({
      openai_api_key: openai_api_key || undefined,
      google_api_key: google_api_key || undefined,
    });

    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, message: "Failed to update profile. Please try again." };
  }
}