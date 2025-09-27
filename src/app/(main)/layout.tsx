import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <a href="/" className="text-xl font-bold hover:text-primary transition-colors">
              LLM Comparator
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <Navigation />
            <UserButton afterSignOutUrl="/" />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}