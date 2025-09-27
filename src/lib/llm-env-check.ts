export function checkLLMEnvironmentVariables() {
  const required = {
    clerk: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
    },
    supabase: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    encryption: {
      API_ENCRYPTION_KEY: !!process.env.API_ENCRYPTION_KEY,
    },
  };

  const optional = {
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
  };

  const allRequired = Object.values(required).every((section) =>
    Object.values(section).every((value) => value === true)
  );

  return {
    required,
    optional,
    allConfigured: allRequired,
    missing: Object.entries(required)
      .flatMap(([section, vars]) =>
        Object.entries(vars)
          .filter(([, value]) => !value)
          .map(([key]) => `${section}.${key}`)
      )
      .join(", "),
  };
}