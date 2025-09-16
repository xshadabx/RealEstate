"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, 
  X, 
  Clock, 
  Star, 
  Users, 
  Camera, 
  Gavel, 
  TrendingUp,
  Shield,
  Home,
  CreditCard,
  Truck,
  Crown,
  Zap,
  Target
} from "lucide-react";
import { 
  TierLevel, 
  TIER_CONFIG, 
  TIER_PRICING, 
  TIER_COLORS, 
  TIER_DESCRIPTIONS,
  SELLER_TIER_CONFIG,
  formatTierPrice 
} from "@/lib/tier-system";

interface TierSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'buyer' | 'seller';
  onTierSelect: (tier: TierLevel) => void;
  currentTier?: TierLevel;
}

export default function TierSelectionModal({ 
  isOpen, 
  onClose, 
  userType, 
  onTierSelect,
  currentTier 
}: TierSelectionModalProps) {
  const [selectedTier, setSelectedTier] = useState<TierLevel | null>(currentTier || null);

  const tiers: TierLevel[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

  const getTierIcon = (tier: TierLevel) => {
    switch (tier) {
      case 'BRONZE': return <Target className="h-6 w-6" />;
      case 'SILVER': return <Star className="h-6 w-6" />;
      case 'GOLD': return <Crown className="h-6 w-6" />;
      case 'PLATINUM': return <Zap className="h-6 w-6" />;
    }
  };

  const getBenefitIcon = (benefit: string) => {
    switch (benefit) {
      case 'deadlineMonths': return <Clock className="h-4 w-4" />;
      case 'prioritySupport': return <Shield className="h-4 w-4" />;
      case 'aiRecommendations': return <TrendingUp className="h-4 w-4" />;
      case 'propertyMatches': return <Home className="h-4 w-4" />;
      case 'virtualTours': return <Camera className="h-4 w-4" />;
      case 'priceNegotiation': return <CreditCard className="h-4 w-4" />;
      case 'legalAssistance': return <Gavel className="h-4 w-4" />;
      case 'marketInsights': return <TrendingUp className="h-4 w-4" />;
      case 'exclusiveListings': return <Star className="h-4 w-4" />;
      case 'dedicatedAgent': return <Users className="h-4 w-4" />;
      case 'homeInspection': return <Shield className="h-4 w-4" />;
      case 'loanPreApproval': return <CreditCard className="h-4 w-4" />;
      case 'movingAssistance': return <Truck className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  const getBenefitText = (key: string, value: any) => {
    if (userType === 'buyer') {
      switch (key) {
        case 'deadlineMonths': return `Find home within ${value} months`;
        case 'prioritySupport': return 'Priority customer support';
        case 'aiRecommendations': return `${value} AI recommendations per day`;
        case 'propertyMatches': return `${value} property matches per day`;
        case 'virtualTours': return `${value} virtual tours per month`;
        case 'priceNegotiation': return 'Price negotiation assistance';
        case 'legalAssistance': return 'Legal documentation help';
        case 'marketInsights': return 'Market trend insights';
        case 'exclusiveListings': return 'Access to exclusive listings';
        case 'dedicatedAgent': return 'Dedicated property agent';
        case 'homeInspection': return 'Free home inspection';
        case 'loanPreApproval': return 'Loan pre-approval assistance';
        case 'movingAssistance': return 'Moving and relocation help';
        default: return key;
      }
    } else {
      // Seller benefits
      switch (key) {
        case 'listingPriority': return `Priority ${value} listing`;
        case 'featuredDays': return `${value} days featured listing`;
        case 'photoShoots': return `${value} professional photo sessions`;
        case 'virtualTours': return `${value} virtual tour creation`;
        case 'marketingSupport': return 'Marketing campaign support';
        case 'priceOptimization': return 'Price optimization analysis';
        case 'legalAssistance': return 'Legal documentation help';
        case 'marketAnalysis': return 'Market analysis report';
        case 'exclusiveBuyerNetwork': return 'Access to exclusive buyer network';
        case 'dedicatedAgent': return 'Dedicated selling agent';
        case 'stagingAssistance': return 'Home staging assistance';
        case 'closingSupport': return 'Closing process support';
        default: return key;
      }
    }
  };

  const getBenefits = (tier: TierLevel) => {
    if (userType === 'buyer') {
      return TIER_CONFIG[tier];
    } else {
      return SELLER_TIER_CONFIG[tier];
    }
  };

  const handleSelectTier = () => {
    if (selectedTier) {
      onTierSelect(selectedTier);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold">
                  Choose Your {userType === 'buyer' ? 'Buyer' : 'Seller'} Package
                </h2>
                <p className="text-muted-foreground mt-1">
                  Select the tier that matches your timeline and needs
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tier Cards */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tiers.map((tier) => {
                  const benefits = getBenefits(tier);
                  const isSelected = selectedTier === tier;
                  const isCurrentTier = currentTier === tier;
                  
                  return (
                    <motion.div
                      key={tier}
                      whileHover={{ y: -4 }}
                      className="relative"
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'ring-2 ring-primary shadow-lg' 
                            : 'hover:shadow-md'
                        } ${isCurrentTier ? 'bg-primary/5' : ''}`}
                        onClick={() => setSelectedTier(tier)}
                      >
                        {isCurrentTier && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-green-500 text-white">
                              Current Plan
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: TIER_COLORS[tier] + '20', color: TIER_COLORS[tier] }}
                          >
                            {getTierIcon(tier)}
                          </div>
                          <CardTitle className="text-xl font-bold capitalize">
                            {tier}
                          </CardTitle>
                          <div className="text-3xl font-bold text-primary">
                            {formatTierPrice(TIER_PRICING[tier])}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {TIER_DESCRIPTIONS[tier]}
                          </p>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          {Object.entries(benefits).map(([key, value]) => {
                            if (typeof value === 'boolean') {
                              return value ? (
                                <div key={key} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span>{getBenefitText(key, value)}</span>
                                </div>
                              ) : (
                                <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <X className="h-4 w-4" />
                                  <span>{getBenefitText(key, value)}</span>
                                </div>
                              );
                            } else {
                              return (
                                <div key={key} className="flex items-center gap-2 text-sm">
                                  {getBenefitIcon(key)}
                                  <span>{getBenefitText(key, value)}</span>
                                </div>
                              );
                            }
                          })}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSelectTier}
                  disabled={!selectedTier || selectedTier === currentTier}
                  className="min-w-[200px]"
                >
                  {selectedTier === currentTier 
                    ? 'Current Plan' 
                    : `Upgrade to ${selectedTier || 'Select Tier'}`
                  }
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
