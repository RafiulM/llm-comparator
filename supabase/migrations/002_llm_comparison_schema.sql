-- Migration for LLM Comparison Application
-- Creates profiles and comparison_sessions tables with proper RLS policies

-- Drop existing profiles table if it exists (from example migration)
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table for user API keys and profile data
CREATE TABLE public.profiles (
    id TEXT PRIMARY KEY, -- Uses the user_id from Clerk as the Primary Key
    openai_api_key TEXT, -- Encrypted at application level
    google_api_key TEXT, -- Encrypted at application level
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comparison_sessions table for storing LLM comparison sessions
CREATE TABLE public.comparison_sessions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id TEXT NOT NULL DEFAULT (auth.jwt() ->> 'sub') REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT,
    system_prompt TEXT,
    user_content TEXT,
    model_a_provider TEXT NOT NULL,
    model_a_name TEXT NOT NULL,
    model_a_completion TEXT,
    model_b_provider TEXT NOT NULL,
    model_b_name TEXT NOT NULL,
    model_b_completion TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparison_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Users can only access their own profile
CREATE POLICY "Allow individual user to access their own profile"
ON public.profiles FOR ALL
USING ((auth.jwt() ->> 'sub') = id)
WITH CHECK ((auth.jwt() ->> 'sub') = id);

-- RLS Policies for comparison_sessions table
-- Users can only access their own sessions
CREATE POLICY "Allow individual user to access their own sessions"
ON public.comparison_sessions FOR ALL
USING ((auth.jwt() ->> 'sub') = user_id)
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

-- Create indexes for performance optimization
CREATE INDEX idx_comparison_sessions_user_id ON public.comparison_sessions(user_id);
CREATE INDEX idx_comparison_sessions_created_at ON public.comparison_sessions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();