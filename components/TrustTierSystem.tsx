"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Star, Crown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrustTier = 'UNVERIFIED' | 'VERIFIED' | 'PREMIUM' | 'TRUSTED';

export interface VerificationDetails {
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  reraStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationDate: string;
  expiryDate: string;
  documentsVerified: number;
  totalDocuments: number;
  trustScore: number;
  listingCount: number;
  responseRate: number;
  avgRating: number;
}

export const TRUST_TIERS = {
  UNVERIFIED: {
    label: 'Unverified',
    icon: AlertTriangle,
    variant: 'destructive' as const,
    className: 'bg-red-100 text-red-800 border-red-200',
    score: 0,
  },
  VERIFIED: {
    label: 'Verified',
    icon: Shield,
    variant: 'secondary' as const,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    score: 25,
  },
  PREMIUM: {
    label: 'Premium',
    icon: Star,
    variant: 'secondary' as const,
    className: 'bg-purple-100 text-purple-800 border-purple-200',
    score: 50,
  },
  TRUSTED: {
    label: 'Trusted',
    icon: Crown,
    variant: 'secondary' as const,
    className: 'bg-green-100 text-green-800 border-green-200',
    score: 100,
  },
} as const;

interface TrustBadgeProps {
  tier: TrustTier;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}


export function TrustBadge({ tier, size = 'md', onClick, className }: TrustBadgeProps) {
  // Simple implementation to avoid runtime errors
  const labels = {
    UNVERIFIED: 'Unverified',
    VERIFIED: 'Verified', 
    PREMIUM: 'Premium',
    TRUSTED: 'Trusted'
  };
  
  const safeTier = tier || 'UNVERIFIED';
  const label = labels[safeTier] || 'Unverified';

  return (
    <Badge
      variant="secondary"
      className={cn(
        'flex items-center gap-1 font-medium cursor-pointer transition-all hover:scale-105 text-xs px-2 py-1',
        className
      )}
      onClick={onClick}
    >
      <Shield className="h-3 w-3" />
      {label}
    </Badge>
  );
}

// Trust tier utility functions
export function getTrustTierColor(tier: TrustTier): string {
  const colors = {
    UNVERIFIED: 'bg-red-100 text-red-800 border-red-200',
    VERIFIED: 'bg-blue-100 text-blue-800 border-blue-200',
    PREMIUM: 'bg-purple-100 text-purple-800 border-purple-200',
    TRUSTED: 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[tier] || colors.UNVERIFIED;
}

export function getTrustTierIcon(tier: TrustTier) {
  return Shield;
}

export function getTrustTierLabel(tier: TrustTier): string {
  const labels = {
    UNVERIFIED: 'Unverified',
    VERIFIED: 'Verified',
    PREMIUM: 'Premium',
    TRUSTED: 'Trusted'
  };
  return labels[tier] || labels.UNVERIFIED;
}

// Trust tier progression helper
export function getNextTrustTier(currentTier: TrustTier): TrustTier | null {
  const progression: TrustTier[] = ['UNVERIFIED', 'VERIFIED', 'PREMIUM', 'TRUSTED'];
  const safeTier = currentTier && progression.includes(currentTier) ? currentTier : 'UNVERIFIED';
  const currentIndex = progression.indexOf(safeTier);
  return currentIndex < progression.length - 1 ? progression[currentIndex + 1] : null;
}

// Trust score calculation (example implementation)
export function calculateTrustScore(tier: TrustTier): number {
  const scores = {
    UNVERIFIED: 0,
    VERIFIED: 25,
    PREMIUM: 50,
    TRUSTED: 100,
  };
  const safeTier = tier && scores.hasOwnProperty(tier) ? tier : 'UNVERIFIED';
  return scores[safeTier];
}

// Default export for backward compatibility
export default {
  TrustBadge,
  TRUST_TIERS,
  getTrustTierColor,
  getTrustTierIcon,
  getTrustTierLabel,
  getNextTrustTier,
  calculateTrustScore,
};
