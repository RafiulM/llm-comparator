"use server";

import { auth } from "@clerk/nextjs/server";
import { getDecryptedApiKeys } from "@/app/actions/profiles";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ComparisonRequest {
  systemPrompt: string;
  userContent: string;
  modelA: { provider: "openai" | "google"; name: string };
  modelB: { provider: "openai" | "google"; name: string };
}

export async function compareModels({
  systemPrompt,
  userContent,
  modelA,
  modelB,
}: ComparisonRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get user's API keys
    const apiKeys = await getDecryptedApiKeys();
    
    if (!apiKeys.openai_api_key && (modelA.provider === "openai" || modelB.provider === "openai")) {
      throw new Error("OpenAI API key not configured. Please add it in your profile settings.");
    }
    
    if (!apiKeys.google_api_key && (modelA.provider === "google" || modelB.provider === "google")) {
      throw new Error("Google Gemini API key not configured. Please add it in your profile settings.");
    }

    // Create parallel requests for both models
    const [resultA, resultB] = await Promise.allSettled([
      generateCompletion(modelA, systemPrompt, userContent, apiKeys),
      generateCompletion(modelB, systemPrompt, userContent, apiKeys),
    ]);

    return {
      modelA: {
        content: resultA.status === "fulfilled" ? resultA.value.content : "",
        error: resultA.status === "rejected" ? resultA.reason.message : undefined,
        usage: resultA.status === "fulfilled" ? resultA.value.usage : undefined,
      },
      modelB: {
        content: resultB.status === "fulfilled" ? resultB.value.content : "",
        error: resultB.status === "rejected" ? resultB.reason.message : undefined,
        usage: resultB.status === "fulfilled" ? resultB.value.usage : undefined,
      },
    };
  } catch (error) {
    console.error("Comparison error:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred during comparison",
    };
  }
}

async function generateCompletion(
  model: { provider: "openai" | "google"; name: string },
  systemPrompt: string,
  userContent: string,
  apiKeys: { openai_api_key: string | null; google_api_key: string | null }
) {
  if (model.provider === "openai") {
    if (!apiKeys.openai_api_key) {
      throw new Error("OpenAI API key not available");
    }

    const openai = new OpenAI({
      apiKey: apiKeys.openai_api_key,
    });

    const response = await openai.chat.completions.create({
      model: model.name,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return {
      content: response.choices[0]?.message?.content || "",
      usage: response.usage,
    };
  } else if (model.provider === "google") {
    if (!apiKeys.google_api_key) {
      throw new Error("Google Gemini API key not available");
    }

    const genAI = new GoogleGenerativeAI(apiKeys.google_api_key);
    const modelInstance = genAI.getGenerativeModel({ model: model.name });

    const result = await modelInstance.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `System: ${systemPrompt}` },
            { text: `User: ${userContent}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const response = await result.response;
    
    return {
      content: response.text() || "",
      usage: {
        prompt_tokens: response.usageMetadata?.promptTokenCount || 0,
        completion_tokens: response.usageMetadata?.candidatesTokenCount || 0,
        total_tokens: response.usageMetadata?.totalTokenCount || 0,
      },
    };
  } else {
    throw new Error(`Unsupported provider: ${model.provider}`);
  }
}