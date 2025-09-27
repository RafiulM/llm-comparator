import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Zap className={cn(sizeClasses[size], "text-blue-600")} />
      <span className={cn(
        "font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-3xl"
      )}>
        LLM Comparator
      </span>
    </div>
  );
}