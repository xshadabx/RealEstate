// Fraud Detection System for Real Estate Listings
export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    email: string;
    verified: boolean;
    joinDate: string;
  };
  features: string[];
  amenities: string[];
  area: number;
  age: number;
  floor: number;
  facing: string;
  postedDate: string;
  lastUpdated: string;
}

export interface FraudAnalysis {
  overallScore: number; // 0-100 (100 = completely genuine)
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  redFlags: FraudFlag[];
  recommendations: string[];
  confidence: number;
}

export interface FraudFlag {
  type: 'PRICING' | 'IMAGES' | 'DESCRIPTION' | 'SELLER' | 'LOCATION' | 'DUPLICATE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  score: number; // Impact on overall score
  evidence: string[];
}

export class FraudDetector {
  private marketRates: { [location: string]: { min: number; max: number } } = {
    'koramangala': { min: 8000, max: 12000 },
    'whitefield': { min: 5000, max: 8000 },
    'indiranagar': { min: 7000, max: 10000 },
    'mg road': { min: 10000, max: 15000 },
    'electronic city': { min: 4000, max: 6000 },
    'hsr layout': { min: 6000, max: 9000 },
    'jayanagar': { min: 5000, max: 8000 },
    'jp nagar': { min: 4500, max: 7000 },
    'btm layout': { min: 4000, max: 6500 },
    'marathahalli': { min: 4500, max: 7000 }
  };

  private suspiciousKeywords = [
    'urgent sale', 'quick sale', 'below market', 'distress sale',
    'no broker', 'direct owner', 'cash only', 'immediate possession',
    'fake', 'duplicate', 'copy', 'stock photo'
  ];

  private genericDescriptions = [
    'beautiful property', 'excellent location', 'prime location',
    'luxury amenities', 'modern design', 'spacious rooms',
    'well connected', 'peaceful environment', 'good investment'
  ];

  public analyzeProperty(listing: PropertyListing): FraudAnalysis {
    const redFlags: FraudFlag[] = [];
    let totalScore = 100;

    // Check pricing anomalies
    const pricingFlags = this.checkPricing(listing);
    redFlags.push(...pricingFlags);
    totalScore -= pricingFlags.reduce((sum, flag) => sum + flag.score, 0);

    // Check image quality and authenticity
    const imageFlags = this.checkImages(listing);
    redFlags.push(...imageFlags);
    totalScore -= imageFlags.reduce((sum, flag) => sum + flag.score, 0);

    // Check description quality
    const descriptionFlags = this.checkDescription(listing);
    redFlags.push(...descriptionFlags);
    totalScore -= descriptionFlags.reduce((sum, flag) => sum + flag.score, 0);

    // Check seller credibility
    const sellerFlags = this.checkSeller(listing);
    redFlags.push(...sellerFlags);
    totalScore -= sellerFlags.reduce((sum, flag) => sum + flag.score, 0);

    // Check location consistency
    const locationFlags = this.checkLocation(listing);
    redFlags.push(...locationFlags);
    totalScore -= locationFlags.reduce((sum, flag) => sum + flag.score, 0);

    // Determine risk level
    const riskLevel = this.determineRiskLevel(totalScore);
    const recommendations = this.generateRecommendations(redFlags, totalScore);
    const confidence = this.calculateConfidence(redFlags);

    return {
      overallScore: Math.max(0, Math.round(totalScore)),
      riskLevel,
      redFlags,
      recommendations,
      confidence
    };
  }

  private checkPricing(listing: PropertyListing): FraudFlag[] {
    const flags: FraudFlag[] = [];
    const location = listing.location.toLowerCase();
    const pricePerSqFt = listing.price / listing.area;

    // Check if location exists in market rates
    const marketRate = this.marketRates[location];
    if (!marketRate) {
      flags.push({
        type: 'PRICING',
        severity: 'MEDIUM',
        description: 'Location not found in market rate database',
        score: 5,
        evidence: [`Location: ${listing.location}`]
      });
      return flags;
    }

    // Check for unusually low pricing
    if (pricePerSqFt < marketRate.min * 0.7) {
      flags.push({
        type: 'PRICING',
        severity: 'HIGH',
        description: 'Price is unusually low for the area',
        score: 15,
        evidence: [
          `Listed: ₹${pricePerSqFt.toFixed(0)}/sqft`,
          `Market range: ₹${marketRate.min}-${marketRate.max}/sqft`,
          `Below market by ${Math.round(((marketRate.min - pricePerSqFt) / marketRate.min) * 100)}%`
        ]
      });
    }

    // Check for unusually high pricing
    if (pricePerSqFt > marketRate.max * 1.3) {
      flags.push({
        type: 'PRICING',
        severity: 'MEDIUM',
        description: 'Price is unusually high for the area',
        score: 8,
        evidence: [
          `Listed: ₹${pricePerSqFt.toFixed(0)}/sqft`,
          `Market range: ₹${marketRate.min}-${marketRate.max}/sqft`,
          `Above market by ${Math.round(((pricePerSqFt - marketRate.max) / marketRate.max) * 100)}%`
        ]
      });
    }

    return flags;
  }

  private checkImages(listing: PropertyListing): FraudFlag[] {
    const flags: FraudFlag[] = [];

    if (listing.images.length === 0) {
      flags.push({
        type: 'IMAGES',
        severity: 'HIGH',
        description: 'No images provided',
        score: 20,
        evidence: ['Property listing has no images']
      });
    } else if (listing.images.length < 3) {
      flags.push({
        type: 'IMAGES',
        severity: 'MEDIUM',
        description: 'Very few images provided',
        score: 10,
        evidence: [`Only ${listing.images.length} image(s) provided`]
      });
    }

    // Check for suspicious image patterns (simplified)
    const suspiciousImagePatterns = [
      'stock', 'placeholder', 'sample', 'demo', 'fake'
    ];

    for (const image of listing.images) {
      const imageLower = image.toLowerCase();
      for (const pattern of suspiciousImagePatterns) {
        if (imageLower.includes(pattern)) {
          flags.push({
            type: 'IMAGES',
            severity: 'CRITICAL',
            description: 'Suspicious image detected',
            score: 25,
            evidence: [`Image URL contains: ${pattern}`]
          });
        }
      }
    }

    return flags;
  }

  private checkDescription(listing: PropertyListing): FraudFlag[] {
    const flags: FraudFlag[] = [];
    const description = listing.description.toLowerCase();

    // Check for suspicious keywords
    for (const keyword of this.suspiciousKeywords) {
      if (description.includes(keyword)) {
        flags.push({
          type: 'DESCRIPTION',
          severity: 'HIGH',
          description: 'Suspicious keywords found in description',
          score: 15,
          evidence: [`Contains: "${keyword}"`]
        });
      }
    }

    // Check for generic descriptions
    const genericCount = this.genericDescriptions.filter(desc => 
      description.includes(desc)
    ).length;

    if (genericCount > 5) {
      flags.push({
        type: 'DESCRIPTION',
        severity: 'MEDIUM',
        description: 'Description contains too many generic phrases',
        score: 8,
        evidence: [`${genericCount} generic phrases found`]
      });
    }

    // Check description length
    if (listing.description.length < 50) {
      flags.push({
        type: 'DESCRIPTION',
        severity: 'MEDIUM',
        description: 'Description is too short',
        score: 5,
        evidence: [`Only ${listing.description.length} characters`]
      });
    }

    return flags;
  }

  private checkSeller(listing: PropertyListing): FraudFlag[] {
    const flags: FraudFlag[] = [];

    // Check if seller is verified
    if (!listing.seller.verified) {
      flags.push({
        type: 'SELLER',
        severity: 'MEDIUM',
        description: 'Seller is not verified',
        score: 10,
        evidence: ['Seller verification status: Not verified']
      });
    }

    // Check seller join date (recent accounts are suspicious)
    const joinDate = new Date(listing.seller.joinDate);
    const daysSinceJoin = (Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceJoin < 7) {
      flags.push({
        type: 'SELLER',
        severity: 'HIGH',
        description: 'Seller account is very new',
        score: 15,
        evidence: [`Account created ${Math.round(daysSinceJoin)} days ago`]
      });
    }

    // Check for missing contact information
    if (!listing.seller.phone || !listing.seller.email) {
      flags.push({
        type: 'SELLER',
        severity: 'HIGH',
        description: 'Missing contact information',
        score: 12,
        evidence: [
          `Phone: ${listing.seller.phone ? 'Provided' : 'Missing'}`,
          `Email: ${listing.seller.email ? 'Provided' : 'Missing'}`
        ]
      });
    }

    return flags;
  }

  private checkLocation(listing: PropertyListing): FraudFlag[] {
    const flags: FraudFlag[] = [];

    // Check for location inconsistencies
    const titleLocation = listing.title.toLowerCase();
    const descriptionLocation = listing.description.toLowerCase();
    const location = listing.location.toLowerCase();

    if (!titleLocation.includes(location.split(',')[0]) && 
        !descriptionLocation.includes(location.split(',')[0])) {
      flags.push({
        type: 'LOCATION',
        severity: 'MEDIUM',
        description: 'Location mismatch between title/description and listed location',
        score: 8,
        evidence: [
          `Title: ${listing.title}`,
          `Listed location: ${listing.location}`
        ]
      });
    }

    return flags;
  }

  private determineRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (score >= 80) return 'LOW';
    if (score >= 60) return 'MEDIUM';
    if (score >= 40) return 'HIGH';
    return 'CRITICAL';
  }

  private generateRecommendations(flags: FraudFlag[], score: number): string[] {
    const recommendations: string[] = [];

    if (score < 50) {
      recommendations.push('⚠️ High risk detected. Proceed with extreme caution.');
    }

    const criticalFlags = flags.filter(f => f.severity === 'CRITICAL');
    if (criticalFlags.length > 0) {
      recommendations.push('🚨 Critical issues found. Avoid this listing.');
    }

    const highFlags = flags.filter(f => f.severity === 'HIGH');
    if (highFlags.length > 0) {
      recommendations.push('⚠️ Multiple high-risk issues detected. Verify all details.');
    }

    // Specific recommendations based on flag types
    const pricingFlags = flags.filter(f => f.type === 'PRICING');
    if (pricingFlags.length > 0) {
      recommendations.push('💰 Verify pricing with local market rates and get property valuation.');
    }

    const imageFlags = flags.filter(f => f.type === 'IMAGES');
    if (imageFlags.length > 0) {
      recommendations.push('📸 Request more images and verify property details in person.');
    }

    const sellerFlags = flags.filter(f => f.type === 'SELLER');
    if (sellerFlags.length > 0) {
      recommendations.push('👤 Verify seller identity and request proper documentation.');
    }

    recommendations.push('📋 Always verify property documents, ownership papers, and legal clearances.');
    recommendations.push('🏠 Schedule a physical visit before making any commitments.');

    return recommendations;
  }

  private calculateConfidence(flags: FraudFlag[]): number {
    // Confidence decreases with more flags and higher severity
    let confidence = 100;
    
    for (const flag of flags) {
      switch (flag.severity) {
        case 'LOW':
          confidence -= 5;
          break;
        case 'MEDIUM':
          confidence -= 10;
          break;
        case 'HIGH':
          confidence -= 20;
          break;
        case 'CRITICAL':
          confidence -= 30;
          break;
      }
    }

    return Math.max(0, confidence);
  }

  // Check for duplicate listings
  public checkDuplicates(listings: PropertyListing[]): { [key: string]: PropertyListing[] } {
    const duplicates: { [key: string]: PropertyListing[] } = {};
    
    for (let i = 0; i < listings.length; i++) {
      for (let j = i + 1; j < listings.length; j++) {
        const listing1 = listings[i];
        const listing2 = listings[j];
        
        // Check for similar titles and prices
        const titleSimilarity = this.calculateSimilarity(listing1.title, listing2.title);
        const priceDifference = Math.abs(listing1.price - listing2.price) / listing1.price;
        
        if (titleSimilarity > 0.8 && priceDifference < 0.1) {
          const key = `${listing1.id}_${listing2.id}`;
          duplicates[key] = [listing1, listing2];
        }
      }
    }
    
    return duplicates;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }
}

// Export singleton instance
export const fraudDetector = new FraudDetector();
