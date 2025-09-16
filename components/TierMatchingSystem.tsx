"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  Target, 
  Star, 
  Crown, 
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Calendar,
  Home,
  DollarSign
} from "lucide-react";
import { 
  TierLevel, 
  TIER_CONFIG, 
  SELLER_TIER_CONFIG,
  calculateTierMatch,
  getTierByDeadline
} from "@/lib/tier-system";

interface TierMatchingSystemProps {
  buyerTier: TierLevel;
  sellerTier: TierLevel;
  onTierChange?: (buyerTier: TierLevel, sellerTier: TierLevel) => void;
}

export default function TierMatchingSystem({ 
  buyerTier, 
  sellerTier, 
  onTierChange 
}: TierMatchingSystemProps) {
  const [selectedBuyerTier, setSelectedBuyerTier] = useState<TierLevel>(buyerTier);
  const [selectedSellerTier, setSelectedSellerTier] = useState<TierLevel>(sellerTier);

  const matchScore = calculateTierMatch(selectedBuyerTier, selectedSellerTier);
  const isPerfectMatch = matchScore === 100;
  const isGoodMatch = matchScore >= 75;
  const isFairMatch = matchScore >= 50;

  const getMatchColor = () => {
    if (isPerfectMatch) return 'text-green-600 bg-green-50';
    if (isGoodMatch) return 'text-blue-600 bg-blue-50';
    if (isFairMatch) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getMatchIcon = () => {
    if (isPerfectMatch) return <CheckCircle className="h-5 w-5" />;
    if (isGoodMatch) return <Star className="h-5 w-5" />;
    if (isFairMatch) return <Target className="h-5 w-5" />;
    return <Clock className="h-5 w-5" />;
  };

  const getMatchDescription = () => {
    if (isPerfectMatch) return 'Perfect match! Both parties have aligned timelines and expectations.';
    if (isGoodMatch) return 'Good match! Slight timeline differences but compatible goals.';
    if (isFairMatch) return 'Fair match. Some timeline adjustments may be needed.';
    return 'Poor match. Significant timeline or priority differences.';
  };

  const tiers: TierLevel[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

  const getTierIcon = (tier: TierLevel) => {
    switch (tier) {
      case 'BRONZE': return <Target className="h-4 w-4" />;
      case 'SILVER': return <Star className="h-4 w-4" />;
      case 'GOLD': return <Crown className="h-4 w-4" />;
      case 'PLATINUM': return <Zap className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: TierLevel) => {
    switch (tier) {
      case 'BRONZE': return 'bg-amber-100 text-amber-800';
      case 'SILVER': return 'bg-gray-100 text-gray-800';
      case 'GOLD': return 'bg-yellow-100 text-yellow-800';
      case 'PLATINUM': return 'bg-purple-100 text-purple-800';
    }
  };

  const handleBuyerTierChange = (tier: TierLevel) => {
    setSelectedBuyerTier(tier);
    onTierChange?.(tier, selectedSellerTier);
  };

  const handleSellerTierChange = (tier: TierLevel) => {
    setSelectedSellerTier(tier);
    onTierChange?.(selectedBuyerTier, tier);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Tier Matching System</h2>
        <p className="text-muted-foreground">
          See how buyer and seller tiers work together for optimal property matches
        </p>
      </div>

      {/* Tier Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buyer Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Buyer Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {tiers.map((tier) => (
                <Button
                  key={tier}
                  variant={selectedBuyerTier === tier ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBuyerTierChange(tier)}
                  className="flex items-center gap-2"
                >
                  {getTierIcon(tier)}
                  {tier}
                </Button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Timeline:</strong> {TIER_CONFIG[selectedBuyerTier].deadlineMonths} months</p>
              <p><strong>Priority:</strong> {selectedBuyerTier === 'PLATINUM' ? 'Highest' : selectedBuyerTier === 'GOLD' ? 'High' : selectedBuyerTier === 'SILVER' ? 'Medium' : 'Standard'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Seller Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Seller Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {tiers.map((tier) => (
                <Button
                  key={tier}
                  variant={selectedSellerTier === tier ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSellerTierChange(tier)}
                  className="flex items-center gap-2"
                >
                  {getTierIcon(tier)}
                  {tier}
                </Button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Listing Priority:</strong> Level {SELLER_TIER_CONFIG[selectedSellerTier].listingPriority}</p>
              <p><strong>Featured Days:</strong> {SELLER_TIER_CONFIG[selectedSellerTier].featuredDays} days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className={`border-2 ${isPerfectMatch ? 'border-green-200' : isGoodMatch ? 'border-blue-200' : isFairMatch ? 'border-yellow-200' : 'border-red-200'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getMatchIcon()}
                Match Analysis
              </CardTitle>
              <Badge className={`${getMatchColor()} text-lg font-bold px-3 py-1`}>
                {Math.round(matchScore)}% Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{getMatchDescription()}</p>
            
            {/* Timeline Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">Buyer Timeline</div>
                <div className="text-2xl font-bold text-primary">
                  {TIER_CONFIG[selectedBuyerTier].deadlineMonths}m
                </div>
                <div className="text-sm text-muted-foreground">to find property</div>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">Seller Priority</div>
                <div className="text-2xl font-bold text-green-600">
                  Level {SELLER_TIER_CONFIG[selectedSellerTier].listingPriority}
                </div>
                <div className="text-sm text-muted-foreground">listing priority</div>
              </div>
            </div>

            {/* Benefits Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Buyer Benefits
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {TIER_CONFIG[selectedBuyerTier].aiRecommendations} AI recommendations/day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {TIER_CONFIG[selectedBuyerTier].propertyMatches} property matches/day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {TIER_CONFIG[selectedBuyerTier].dedicatedAgent ? 'Dedicated agent' : 'Standard support'}
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Seller Benefits
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {SELLER_TIER_CONFIG[selectedSellerTier].featuredDays} days featured listing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {SELLER_TIER_CONFIG[selectedSellerTier].photoShoots} photo sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {SELLER_TIER_CONFIG[selectedSellerTier].dedicatedAgent ? 'Dedicated agent' : 'Standard support'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            {!isPerfectMatch && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {matchScore < 50 && (
                    <li>• Consider upgrading to a higher tier for better matching</li>
                  )}
                  {matchScore >= 50 && matchScore < 75 && (
                    <li>• Timeline alignment is good, minor adjustments may be needed</li>
                  )}
                  {matchScore >= 75 && matchScore < 100 && (
                    <li>• Great match! Consider premium features for faster results</li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
