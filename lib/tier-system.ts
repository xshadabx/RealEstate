export type TierLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface TierBenefits {
  deadlineMonths: number;
  prioritySupport: boolean;
  aiRecommendations: number; // per day
  propertyMatches: number; // per day
  virtualTours: number; // per month
  priceNegotiation: boolean;
  legalAssistance: boolean;
  marketInsights: boolean;
  exclusiveListings: boolean;
  dedicatedAgent: boolean;
  homeInspection: boolean;
  loanPreApproval: boolean;
  movingAssistance: boolean;
}

export interface UserTier {
  level: TierLevel;
  benefits: TierBenefits;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  price: number; // in rupees
}

export const TIER_CONFIG: Record<TierLevel, TierBenefits> = {
  BRONZE: {
    deadlineMonths: 6,
    prioritySupport: false,
    aiRecommendations: 5,
    propertyMatches: 10,
    virtualTours: 2,
    priceNegotiation: false,
    legalAssistance: false,
    marketInsights: false,
    exclusiveListings: false,
    dedicatedAgent: false,
    homeInspection: false,
    loanPreApproval: false,
    movingAssistance: false,
  },
  SILVER: {
    deadlineMonths: 4,
    prioritySupport: true,
    aiRecommendations: 15,
    propertyMatches: 25,
    virtualTours: 5,
    priceNegotiation: true,
    legalAssistance: false,
    marketInsights: true,
    exclusiveListings: false,
    dedicatedAgent: false,
    homeInspection: false,
    loanPreApproval: true,
    movingAssistance: false,
  },
  GOLD: {
    deadlineMonths: 3,
    prioritySupport: true,
    aiRecommendations: 30,
    propertyMatches: 50,
    virtualTours: 10,
    priceNegotiation: true,
    legalAssistance: true,
    marketInsights: true,
    exclusiveListings: true,
    dedicatedAgent: true,
    homeInspection: true,
    loanPreApproval: true,
    movingAssistance: false,
  },
  PLATINUM: {
    deadlineMonths: 2,
    prioritySupport: true,
    aiRecommendations: 50,
    propertyMatches: 100,
    virtualTours: 20,
    priceNegotiation: true,
    legalAssistance: true,
    marketInsights: true,
    exclusiveListings: true,
    dedicatedAgent: true,
    homeInspection: true,
    loanPreApproval: true,
    movingAssistance: true,
  },
};

export const TIER_PRICING: Record<TierLevel, number> = {
  BRONZE: 0, // Free tier
  SILVER: 2999, // ₹2,999/month
  GOLD: 5999, // ₹5,999/month
  PLATINUM: 9999, // ₹9,999/month
};

export const TIER_COLORS: Record<TierLevel, string> = {
  BRONZE: '#CD7F32',
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  PLATINUM: '#E5E4E2',
};

export const TIER_DESCRIPTIONS: Record<TierLevel, string> = {
  BRONZE: 'Perfect for first-time buyers exploring options',
  SILVER: 'Ideal for serious buyers with specific requirements',
  GOLD: 'Best for buyers who want premium service and faster results',
  PLATINUM: 'Ultimate package for urgent buyers with highest priority',
};

// Seller tier benefits (complementary to buyer tiers)
export const SELLER_TIER_CONFIG: Record<TierLevel, {
  listingPriority: number; // 1-4, higher is better
  featuredDays: number; // days property stays featured
  photoShoots: number; // professional photo sessions
  virtualTours: number; // 360° virtual tours
  marketingSupport: boolean;
  priceOptimization: boolean;
  legalAssistance: boolean;
  marketAnalysis: boolean;
  exclusiveBuyerNetwork: boolean;
  dedicatedAgent: boolean;
  stagingAssistance: boolean;
  closingSupport: boolean;
}> = {
  BRONZE: {
    listingPriority: 1,
    featuredDays: 7,
    photoShoots: 1,
    virtualTours: 0,
    marketingSupport: false,
    priceOptimization: false,
    legalAssistance: false,
    marketAnalysis: false,
    exclusiveBuyerNetwork: false,
    dedicatedAgent: false,
    stagingAssistance: false,
    closingSupport: false,
  },
  SILVER: {
    listingPriority: 2,
    featuredDays: 14,
    photoShoots: 2,
    virtualTours: 1,
    marketingSupport: true,
    priceOptimization: true,
    legalAssistance: false,
    marketAnalysis: true,
    exclusiveBuyerNetwork: false,
    dedicatedAgent: false,
    stagingAssistance: false,
    closingSupport: false,
  },
  GOLD: {
    listingPriority: 3,
    featuredDays: 30,
    photoShoots: 3,
    virtualTours: 2,
    marketingSupport: true,
    priceOptimization: true,
    legalAssistance: true,
    marketAnalysis: true,
    exclusiveBuyerNetwork: true,
    dedicatedAgent: true,
    stagingAssistance: true,
    closingSupport: true,
  },
  PLATINUM: {
    listingPriority: 4,
    featuredDays: 60,
    photoShoots: 5,
    virtualTours: 3,
    marketingSupport: true,
    priceOptimization: true,
    legalAssistance: true,
    marketAnalysis: true,
    exclusiveBuyerNetwork: true,
    dedicatedAgent: true,
    stagingAssistance: true,
    closingSupport: true,
  },
};

export function getTierByDeadline(deadlineMonths: number): TierLevel {
  if (deadlineMonths <= 2) return 'PLATINUM';
  if (deadlineMonths <= 3) return 'GOLD';
  if (deadlineMonths <= 4) return 'SILVER';
  return 'BRONZE';
}

export function calculateTierMatch(buyerTier: TierLevel, sellerTier: TierLevel): number {
  const tierValues = { BRONZE: 1, SILVER: 2, GOLD: 3, PLATINUM: 4 };
  const buyerValue = tierValues[buyerTier];
  const sellerValue = tierValues[sellerTier];
  
  // Perfect match gets 100%, close matches get high scores
  const difference = Math.abs(buyerValue - sellerValue);
  return Math.max(0, 100 - (difference * 25));
}

export function getTierRecommendation(userType: 'buyer' | 'seller', urgency: 'low' | 'medium' | 'high' | 'urgent'): TierLevel {
  if (userType === 'buyer') {
    switch (urgency) {
      case 'urgent': return 'PLATINUM';
      case 'high': return 'GOLD';
      case 'medium': return 'SILVER';
      case 'low': return 'BRONZE';
    }
  } else {
    // For sellers, urgency might mean they want to sell quickly
    switch (urgency) {
      case 'urgent': return 'PLATINUM';
      case 'high': return 'GOLD';
      case 'medium': return 'SILVER';
      case 'low': return 'BRONZE';
    }
  }
}

export function formatTierPrice(price: number): string {
  if (price === 0) return 'Free';
  return `₹${price.toLocaleString()}/month`;
}

export function getDaysRemaining(endDate: Date): number {
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
