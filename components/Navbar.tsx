"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Home, Compass, PlusCircle, MessageSquare, User, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function getNavItems(pathname: string) {
  const isBuyer = pathname.startsWith("/buyer");
  const isSeller = pathname.startsWith("/seller");
  const prefix = isBuyer ? "/buyer" : isSeller ? "/seller" : "";

  if (isSeller) {
    // JSON: Seller navbar -> Home, Create, Messages, E-SIP, Profile
    return [
      { href: `${prefix}`, label: "Home", icon: Home },
      { href: `${prefix}/create`, label: "Create", icon: PlusCircle },
      { href: `${prefix}/messages`, label: "Messages", icon: MessageSquare },
      { href: `${prefix}/e-sip`, label: "E-SIP", icon: PiggyBank },
      { href: `${prefix}/profile`, label: "Profile", icon: User },
    ];
  }

  // JSON: Buyer navbar -> Home, Explore, Messages, E-SIP, Profile (no Create)
  if (isBuyer) {
    return [
      { href: `${prefix}`, label: "Home", icon: Home },
      { href: `${prefix}/explore`, label: "Explore", icon: Compass },
      { href: `${prefix}/messages`, label: "Messages", icon: MessageSquare },
      { href: `${prefix}/e-sip`, label: "E-SIP", icon: PiggyBank },
      { href: `${prefix}/profile`, label: "Profile", icon: User },
    ];
  }

  // Global (unauth/landing) -> original items minus Create (Create is seller-only)
  return [
    { href: `/`, label: "Home", icon: Home },
    { href: `/explore`, label: "Explore", icon: Compass },
    { href: `/e-sip`, label: "E-SIP", icon: PiggyBank },
    { href: `/messages`, label: "Messages", icon: MessageSquare },
    { href: `/profile`, label: "Profile", icon: User },
  ];
}

export default function Navbar() {
  const pathname = usePathname();
  const items = getNavItems(pathname);

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          YourBrand
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-1 h-0.5 bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}


