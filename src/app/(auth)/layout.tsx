import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">LLM Comparator</h1>
          <p className="text-muted-foreground">Compare AI models side-by-side</p>
        </div>
        {children}
      </div>
    </div>
  );
}