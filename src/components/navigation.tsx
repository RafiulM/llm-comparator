"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Zap, History, Settings } from "lucide-react";

export function Navigation() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    );
  }

  const navItems = [
    {
      href: "/compare",
      label: "Compare",
      icon: Zap,
      active: pathname === "/compare",
    },
    {
      href: "/history",
      label: "History",
      icon: History,
      active: pathname === "/history",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: Settings,
      active: pathname === "/profile",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={item.active ? "default" : "ghost"}
            size="sm"
            className="flex items-center gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}