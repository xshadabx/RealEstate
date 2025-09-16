"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Star, 
  Target, 
  Zap, 
  Clock, 
  TrendingUp,
  Calendar,
  Users,
  Camera,
  Shield,
  Home,
  CreditCard,
  Truck,
  Gavel,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { 
  TierLevel, 
  TIER_CONFIG, 
  TIER_PRICING, 
  TIER_COLORS, 
  TIER_DESCRIPTIONS,
  SELLER_TIER_CONFIG,
  formatTierPrice,
  getDaysRemaining
} from "@/lib/tier-system";

interface TierStatusCardProps {
  tier: TierLevel;
  userType: 'buyer' | 'seller';
  startDate: Date;
  endDate: Date;
  onUpgrade?: () => void;
  onViewDetails?: () => void;
}

export default function TierStatusCard({ 
  tier, 
  userType, 
  startDate, 
  endDate, 
  onUpgrade,
  onViewDetails 
}: TierStatusCardProps) {
  const daysRemaining = getDaysRemaining(endDate);
  const isExpiringSoon = daysRemaining <= 7;
  const isExpired = daysRemaining <= 0;

  const getTierIcon = (tier: TierLevel) => {
    switch (tier) {
      case 'BRONZE': return <Target className="h-5 w-5" />;
      case 'SILVER': return <Star className="h-5 w-5" />;
      case 'GOLD': return <Crown className="h-5 w-5" />;
      case 'PLATINUM': return <Zap className="h-5 w-5" />;
    }
  };

  const getBenefits = (tier: TierLevel) => {
    if (userType === 'buyer') {
      return TIER_CONFIG[tier];
    } else {
      return SELLER_TIER_CONFIG[tier];
    }
  };

  const benefits = getBenefits(tier);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = Math.max(0, Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100));

  const getKeyBenefits = () => {
    if (userType === 'buyer') {
      const buyerBenefits = benefits as typeof TIER_CONFIG[TierLevel];
      return [
        { key: 'deadlineMonths', label: 'Timeline', value: `${buyerBenefits.deadlineMonths} months` },
        { key: 'aiRecommendations', label: 'AI Recommendations', value: `${buyerBenefits.aiRecommendations}/day` },
        { key: 'propertyMatches', label: 'Property Matches', value: `${buyerBenefits.propertyMatches}/day` },
        { key: 'dedicatedAgent', label: 'Dedicated Agent', value: buyerBenefits.dedicatedAgent ? 'Yes' : 'No' },
      ];
    } else {
      const sellerBenefits = benefits as typeof SELLER_TIER_CONFIG[TierLevel];
      return [
        { key: 'listingPriority', label: 'Listing Priority', value: `Level ${sellerBenefits.listingPriority}` },
        { key: 'featuredDays', label: 'Featured Days', value: `${sellerBenefits.featuredDays} days` },
        { key: 'photoShoots', label: 'Photo Sessions', value: `${sellerBenefits.photoShoots} sessions` },
        { key: 'dedicatedAgent', label: 'Dedicated Agent', value: sellerBenefits.dedicatedAgent ? 'Yes' : 'No' },
      ];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden">
        {/* Tier Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            className="flex items-center gap-1"
            style={{ backgroundColor: TIER_COLORS[tier], color: 'white' }}
          >
            {getTierIcon(tier)}
            {tier}
          </Badge>
        </div>

        {/* Status Alert */}
        {isExpired && (
          <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm font-medium">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Plan Expired - Renew to continue
          </div>
        )}
        {isExpiringSoon && !isExpired && (
          <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm font-medium">
            <Clock className="h-4 w-4 inline mr-1" />
            Plan expires in {daysRemaining} days
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: TIER_COLORS[tier] + '20', color: TIER_COLORS[tier] }}
            >
              {getTierIcon(tier)}
            </div>
            <div>
              <CardTitle className="text-xl capitalize">{tier} Package</CardTitle>
              <p className="text-sm text-muted-foreground">
                {TIER_DESCRIPTIONS[tier]}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Plan Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Plan Progress</span>
              <span className="font-medium">
                {isExpired ? 'Expired' : `${daysRemaining} days remaining`}
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Started: {startDate.toLocaleDateString()}</span>
              <span>Expires: {endDate.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 gap-3">
            {getKeyBenefits().map((benefit) => (
              <div key={benefit.key} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">{benefit.label}:</span>
                <span className="font-medium">{benefit.value}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {onViewDetails && (
              <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1">
                View Details
              </Button>
            )}
            {onUpgrade && tier !== 'PLATINUM' && (
              <Button size="sm" onClick={onUpgrade} className="flex-1">
                Upgrade Plan
              </Button>
            )}
            {isExpired && (
              <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                Renew Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
