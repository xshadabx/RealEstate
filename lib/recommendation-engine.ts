// AI Recommendation Engine for Real Estate
export interface Property {
  id: number;
  title: string;
  price: string;
  priceValue: number; // Numeric value for calculations
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  features: string[];
  highlights: string[];
  whyMatch: string;
  image: string;
  area: number; // in sq ft
  age: number; // years
  floor: number;
  facing: string;
  amenities: string[];
  nearby: {
    metro: number; // distance in km
    school: number;
    hospital: number;
    mall: number;
    office: number;
  };
}

export interface UserPreferences {
  budget: { min: number; max: number };
  location: string[];
  propertyType: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  features: string[];
  lifestyle: string[];
  priorities: {
    price: number; // 1-10 weight
    location: number;
    amenities: number;
    connectivity: number;
    lifestyle: number;
  };
}

export interface RecommendationScore {
  property: Property;
  score: number;
  reasons: string[];
  matchPercentage: number;
}

// Enhanced property database
export const propertyDatabase: Property[] = [
  {
    id: 1,
    title: "2 BHK Apartment in Koramangala",
    price: "₹55,00,000",
    priceValue: 5500000,
    location: "Koramangala, Bangalore",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 1200,
    age: 5,
    floor: 3,
    facing: "East",
    features: ["Garden", "Balcony", "Gated Community", "Near Metro"],
    highlights: ["5 min to Metro", "Near IT Parks", "Premium Location"],
    whyMatch: "Perfect for IT professionals with metro connectivity",
    image: "/api/placeholder/300/200",
    amenities: ["Swimming Pool", "Gym", "Club House", "Security"],
    nearby: {
      metro: 0.5,
      school: 1.2,
      hospital: 2.0,
      mall: 1.5,
      office: 3.0
    }
  },
  {
    id: 2,
    title: "3 BHK Villa in Whitefield",
    price: "₹85,00,000",
    priceValue: 8500000,
    location: "Whitefield, Bangalore",
    type: "villa",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 2000,
    age: 2,
    floor: 0,
    facing: "North",
    features: ["Garden", "Pool", "Pet-friendly", "Gated Community"],
    highlights: ["Spacious", "Premium Amenities", "Near Schools"],
    whyMatch: "Great for families with children and pets",
    image: "/api/placeholder/300/200",
    amenities: ["Swimming Pool", "Garden", "Parking", "Security", "Club House"],
    nearby: {
      metro: 2.0,
      school: 0.8,
      hospital: 1.5,
      mall: 3.0,
      office: 5.0
    }
  },
  {
    id: 3,
    title: "1 BHK Studio in Indiranagar",
    price: "₹35,00,000",
    priceValue: 3500000,
    location: "Indiranagar, Bangalore",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    area: 600,
    age: 8,
    floor: 5,
    facing: "West",
    features: ["Balcony", "Near Metro", "Modern Kitchen"],
    highlights: ["Budget-friendly", "Great Location", "Modern Design"],
    whyMatch: "Ideal for young professionals starting their career",
    image: "/api/placeholder/300/200",
    amenities: ["Lift", "Security", "Power Backup"],
    nearby: {
      metro: 0.3,
      school: 2.5,
      hospital: 1.0,
      mall: 0.8,
      office: 4.0
    }
  },
  {
    id: 4,
    title: "4 BHK Penthouse in MG Road",
    price: "₹1,20,00,000",
    priceValue: 12000000,
    location: "MG Road, Bangalore",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    area: 3000,
    age: 1,
    floor: 15,
    facing: "South",
    features: ["City View", "Rooftop Garden", "Premium Location", "Luxury Amenities"],
    highlights: ["Luxury Living", "City Center", "Premium Amenities"],
    whyMatch: "Perfect for luxury seekers in the heart of the city",
    image: "/api/placeholder/300/200",
    amenities: ["Swimming Pool", "Gym", "Spa", "Concierge", "Valet Parking"],
    nearby: {
      metro: 0.2,
      school: 1.0,
      hospital: 0.5,
      mall: 0.3,
      office: 2.0
    }
  },
  {
    id: 5,
    title: "2 BHK Apartment in Electronic City",
    price: "₹45,00,000",
    priceValue: 4500000,
    location: "Electronic City, Bangalore",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 1100,
    age: 6,
    floor: 2,
    facing: "East",
    features: ["Near IT Parks", "Gated Community", "Garden"],
    highlights: ["IT Hub", "Good Connectivity", "Value for Money"],
    whyMatch: "Excellent for IT professionals working in Electronic City",
    image: "/api/placeholder/300/200",
    amenities: ["Swimming Pool", "Gym", "Club House", "Security"],
    nearby: {
      metro: 1.5,
      school: 2.0,
      hospital: 3.0,
      mall: 4.0,
      office: 0.5
    }
  },
  {
    id: 6,
    title: "3 BHK Apartment in HSR Layout",
    price: "₹75,00,000",
    priceValue: 7500000,
    location: "HSR Layout, Bangalore",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 1500,
    age: 3,
    floor: 8,
    facing: "North",
    features: ["Garden", "Balcony", "Gated Community", "Near Metro"],
    highlights: ["Modern Design", "Good Connectivity", "Family Friendly"],
    whyMatch: "Great for growing families with good connectivity",
    image: "/api/placeholder/300/200",
    amenities: ["Swimming Pool", "Gym", "Club House", "Security", "Playground"],
    nearby: {
      metro: 1.0,
      school: 1.5,
      hospital: 2.5,
      mall: 2.0,
      office: 6.0
    }
  }
];

export class RecommendationEngine {
  private properties: Property[];

  constructor(properties: Property[] = propertyDatabase) {
    this.properties = properties;
  }

  // Main recommendation function
  public getRecommendations(
    userInput: string,
    userPreferences: Partial<UserPreferences> = {}
  ): RecommendationScore[] {
    // Extract preferences from natural language input
    const extractedPrefs = this.extractPreferencesFromText(userInput);
    
    // Merge with existing preferences
    const finalPrefs = this.mergePreferences(userPreferences, extractedPrefs);
    
    // Find matching properties
    const matches = this.findMatchingProperties(finalPrefs);
    
    // Score and rank properties
    const scoredMatches = this.scoreProperties(matches, finalPrefs);
    
    // Return top recommendations
    return scoredMatches.slice(0, 5);
  }

  // Extract preferences from natural language
  private extractPreferencesFromText(input: string): Partial<UserPreferences> {
    const prefs: Partial<UserPreferences> = {};
    const lowerInput = input.toLowerCase();

    // Budget extraction with multiple formats
    const budgetPatterns = [
      /₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l)\s*to\s*₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l)/,
      /under\s*₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l)/,
      /upto\s*₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l)/,
      /₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l)/,
      /₹?(\d+(?:,\d+)*)\s*(?:cr|crore)/
    ];

    for (const pattern of budgetPatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        if (match[2]) {
          // Range format
          const min = parseInt(match[1].replace(/,/g, '')) * 100000;
          const max = parseInt(match[2].replace(/,/g, '')) * 100000;
          prefs.budget = { min, max };
        } else {
          // Single value
          const amount = parseInt(match[1].replace(/,/g, ''));
          const isCrore = lowerInput.includes('cr') || lowerInput.includes('crore');
          const budgetValue = isCrore ? amount * 10000000 : amount * 100000;
          prefs.budget = { min: 0, max: budgetValue };
        }
        break;
      }
    }

    // Property type extraction
    const typeMap: { [key: string]: string[] } = {
      'apartment': ['apartment', 'flat', 'apartments'],
      'villa': ['villa', 'house', 'independent house'],
      'penthouse': ['penthouse', 'duplex'],
      'plot': ['plot', 'land', 'site']
    };

    for (const [type, keywords] of Object.entries(typeMap)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        prefs.propertyType = [type];
        break;
      }
    }

    // Bedrooms extraction
    const bedroomMatch = lowerInput.match(/(\d+)\s*bhk/);
    if (bedroomMatch) {
      prefs.bedrooms = parseInt(bedroomMatch[1]);
    }

    // Location extraction
    const locations = [
      'koramangala', 'whitefield', 'indiranagar', 'mg road', 'electronic city',
      'hsr layout', 'jayanagar', 'jp nagar', 'btm layout', 'marathahalli',
      'hebbal', 'yeshwanthpur', 'rajajinagar', 'malleshwaram'
    ];
    
    const foundLocations = locations.filter(loc => lowerInput.includes(loc));
    if (foundLocations.length > 0) {
      prefs.location = foundLocations;
    }

    // Features extraction
    const featureMap: { [key: string]: string[] } = {
      'Near Metro': ['metro', 'metro station'],
      'Garden': ['garden', 'green'],
      'Pool': ['pool', 'swimming'],
      'Parking': ['parking', 'car'],
      'Gated Community': ['gated', 'security'],
      'Balcony': ['balcony', 'terrace'],
      'Pet-friendly': ['pet', 'pets'],
      'Luxury': ['luxury', 'premium', 'high-end']
    };

    const features = [];
    for (const [feature, keywords] of Object.entries(featureMap)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        features.push(feature);
      }
    }
    if (features.length > 0) {
      prefs.features = features;
    }

    // Lifestyle preferences
    const lifestyleMap: { [key: string]: string[] } = {
      'IT Professional': ['it', 'software', 'tech', 'professional'],
      'Family': ['family', 'children', 'kids'],
      'Young Professional': ['young', 'bachelor', 'single'],
      'Senior Citizen': ['senior', 'retired', 'elderly'],
      'Investor': ['investment', 'rental', 'invest']
    };

    const lifestyle = [];
    for (const [lifestyleType, keywords] of Object.entries(lifestyleMap)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        lifestyle.push(lifestyleType);
      }
    }
    if (lifestyle.length > 0) {
      prefs.lifestyle = lifestyle;
    }

    return prefs;
  }

  // Merge user preferences
  private mergePreferences(
    existing: Partial<UserPreferences>,
    extracted: Partial<UserPreferences>
  ): UserPreferences {
    return {
      budget: extracted.budget || existing.budget || { min: 0, max: 100000000 },
      location: [...(extracted.location || []), ...(existing.location || [])],
      propertyType: [...(extracted.propertyType || []), ...(existing.propertyType || [])],
      bedrooms: extracted.bedrooms || existing.bedrooms || 0,
      bathrooms: extracted.bathrooms || existing.bathrooms || 0,
      parking: extracted.parking || existing.parking || 0,
      features: [...(extracted.features || []), ...(existing.features || [])],
      lifestyle: [...(extracted.lifestyle || []), ...(existing.lifestyle || [])],
      priorities: existing.priorities || {
        price: 5,
        location: 5,
        amenities: 5,
        connectivity: 5,
        lifestyle: 5
      }
    };
  }

  // Find properties that match basic criteria
  private findMatchingProperties(prefs: UserPreferences): Property[] {
    return this.properties.filter(property => {
      // Budget filter
      if (property.priceValue > prefs.budget.max || property.priceValue < prefs.budget.min) {
        return false;
      }

      // Property type filter
      if (prefs.propertyType.length > 0 && !prefs.propertyType.includes(property.type)) {
        return false;
      }

      // Bedrooms filter
      if (prefs.bedrooms > 0 && property.bedrooms !== prefs.bedrooms) {
        return false;
      }

      // Location filter
      if (prefs.location.length > 0) {
        const propertyLocation = property.location.toLowerCase();
        if (!prefs.location.some(loc => propertyLocation.includes(loc))) {
          return false;
        }
      }

      return true;
    });
  }

  // Score properties based on preferences
  private scoreProperties(properties: Property[], prefs: UserPreferences): RecommendationScore[] {
    return properties.map(property => {
      let score = 0;
      const reasons: string[] = [];

      // Price score (lower is better within budget)
      const priceScore = Math.max(0, 10 - ((property.priceValue - prefs.budget.min) / (prefs.budget.max - prefs.budget.min)) * 10);
      score += priceScore * (prefs.priorities.price / 10);
      if (priceScore > 7) reasons.push("Great value for money");

      // Location score
      if (prefs.location.length > 0) {
        const locationMatch = prefs.location.some(loc => 
          property.location.toLowerCase().includes(loc)
        );
        if (locationMatch) {
          score += 10 * (prefs.priorities.location / 10);
          reasons.push("Matches your preferred location");
        }
      }

      // Features score
      const featureMatches = prefs.features.filter(feature => 
        property.features.includes(feature)
      );
      if (featureMatches.length > 0) {
        score += (featureMatches.length / prefs.features.length) * 10 * (prefs.priorities.amenities / 10);
        reasons.push(`Has ${featureMatches.join(', ')}`);
      }

      // Connectivity score (metro proximity)
      if (property.nearby.metro <= 1) {
        score += 8 * (prefs.priorities.connectivity / 10);
        reasons.push("Excellent metro connectivity");
      } else if (property.nearby.metro <= 2) {
        score += 5 * (prefs.priorities.connectivity / 10);
        reasons.push("Good metro connectivity");
      }

      // Lifestyle matching
      if (prefs.lifestyle.includes('IT Professional') && property.nearby.office <= 5) {
        score += 7 * (prefs.priorities.lifestyle / 10);
        reasons.push("Close to IT offices");
      }
      if (prefs.lifestyle.includes('Family') && property.nearby.school <= 2) {
        score += 6 * (prefs.priorities.lifestyle / 10);
        reasons.push("Near good schools");
      }

      // Property age bonus (newer is better)
      if (property.age <= 2) {
        score += 3;
        reasons.push("New construction");
      } else if (property.age <= 5) {
        score += 2;
        reasons.push("Relatively new");
      }

      // Amenities bonus
      if (property.amenities.length >= 4) {
        score += 2;
        reasons.push("Premium amenities");
      }

      const matchPercentage = Math.min(100, (score / 50) * 100);

      return {
        property,
        score,
        reasons,
        matchPercentage
      };
    }).sort((a, b) => b.score - a.score);
  }

  // Generate personalized summary
  public generateSummary(prefs: UserPreferences, recommendations: RecommendationScore[]): string {
    if (recommendations.length === 0) {
      return "I couldn't find properties that match your exact requirements. Could you tell me more about your preferences? For example, what's your budget range and preferred location?";
    }

    const budgetText = prefs.budget ? `under ₹${(prefs.budget.max / 100000).toFixed(0)}L` : '';
    const typeText = prefs.propertyType?.[0] || 'property';
    const bedroomText = prefs.bedrooms ? `${prefs.bedrooms} BHK` : '';
    const locationText = prefs.location?.[0] || '';

    const topMatch = recommendations[0];
    const matchReason = topMatch.reasons[0] || 'matches your requirements';

    return `Based on your preferences for ${bedroomText} ${typeText} ${budgetText} ${locationText ? `in ${locationText}` : ''}, I found ${recommendations.length} great options. The top recommendation ${matchReason} and has a ${Math.round(topMatch.matchPercentage)}% match with your needs. Here are my personalized recommendations:`;
  }
}

// Export singleton instance
export const recommendationEngine = new RecommendationEngine();
