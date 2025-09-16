"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Home, Compass, PlusCircle, MessageSquare, User, PiggyBank, Building2, Bot, Shield, MapPin, List } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

function getNavItems(pathname: string, userType: string | null) {
  // If authenticated, always use the user's context regardless of current pathname
  if (userType === 'buyer' || userType === 'seller') {
    const prefix = userType === 'buyer' ? "/buyer" : "/seller";

    if (userType === 'seller') {
      // Seller navbar with consistent order
      return [
        { href: `${prefix}`, label: "Home", icon: Home },
        { href: `${prefix}/create`, label: "Create", icon: PlusCircle },
        { href: `${prefix}/e-sip`, label: "E-SIP", icon: PiggyBank },
        { href: "/map-insights", label: "Map Insights", icon: MapPin },
        { href: "/ai-demo", label: "Aisha", icon: Bot },
        { href: "/listings", label: "Listings", icon: List },
        { href: `${prefix}/messages`, label: "Messages", icon: MessageSquare },
        { href: "/trust-profile", label: "Personal Profile", icon: User },
      ];
    }

    if (userType === 'buyer') {
      // Buyer navbar with exact order requested: Home, Explore, E-SIP, Map Insights, Aisha, Listings, Messages, Personal Profile
      return [
        { href: `${prefix}`, label: "Home", icon: Home },
        { href: `${prefix}/explore`, label: "Explore", icon: Compass },
        { href: `${prefix}/e-sip`, label: "E-SIP", icon: PiggyBank },
        { href: "/map-insights", label: "Map Insights", icon: MapPin },
        { href: "/ai-demo", label: "Aisha", icon: Bot },
        { href: "/listings", label: "Listings", icon: List },
        { href: `${prefix}/messages`, label: "Messages", icon: MessageSquare },
        { href: "/trust-profile", label: "Personal Profile", icon: User },
      ];
    }
  }

  // Global (unauth/landing) navbar - only shown when not authenticated
  return [
    { href: `/`, label: "Login", icon: Home },
    { href: `/explore`, label: "Explore", icon: Compass },
    { href: `/e-sip`, label: "E-SIP", icon: PiggyBank },
    { href: `/map-insights`, label: "Map Insights", icon: MapPin },
    { href: `/ai-demo`, label: "Aisha", icon: Bot },
    { href: `/listings`, label: "Listings", icon: List },
    { href: `/messages`, label: "Messages", icon: MessageSquare },
    { href: `/profile`, label: "Profile", icon: User },
  ];
}

export default function Navbar() {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);

  // Get user type from localStorage on component mount and when it changes
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const items = getNavItems(pathname, userType);

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
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}


