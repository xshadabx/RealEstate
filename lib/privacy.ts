import { User } from './auth';
import { Property, Inquiry, Transaction, Review } from './database/schema';

export type PrivacyRegion = 'EU' | 'US_CA' | 'US_OTHER' | 'OTHER';

export interface PrivacyPreferences {
  region: PrivacyRegion;
  gdprConsent: boolean;
  ccpaConsent: boolean;
  marketingConsent: boolean;
  analyticsConsent: boolean;
  cookieConsent: boolean;
  dataProcessingConsent: boolean;
  consentDate: Date;
  consentVersion: string;
}

export interface DataRetentionPolicy {
  userData: number; // days
  propertyData: number; // days
  inquiryData: number; // days
  transactionData: number; // years
  auditLogs: number; // years
  analyticsData: number; // months
}

export interface DataSubjectRequest {
  id: string;
  userId: string;
  type: 'ACCESS' | 'PORTABILITY' | 'DELETION' | 'RECTIFICATION' | 'RESTRICTION';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  requestedAt: Date;
  completedAt?: Date;
  data?: any;
  reason?: string;
}

// Default retention policies (in days/years)
export const DEFAULT_RETENTION_POLICIES: DataRetentionPolicy = {
  userData: 2555, // 7 years
  propertyData: 1095, // 3 years
  inquiryData: 365, // 1 year
  transactionData: 7, // 7 years
  auditLogs: 7, // 7 years
  analyticsData: 24, // 24 months
};

export class PrivacyService {
  /**
   * Determine user's privacy region based on location
   */
  static determinePrivacyRegion(userLocation?: string): PrivacyRegion {
    if (!userLocation) return 'OTHER';
    
    const location = userLocation.toLowerCase();
    
    // EU countries
    const euCountries = [
      'austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech republic',
      'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
      'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta',
      'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia',
      'spain', 'sweden', 'united kingdom', 'uk'
    ];
    
    if (euCountries.some(country => location.includes(country))) {
      return 'EU';
    }
    
    // US states
    if (location.includes('california') || location.includes('ca')) {
      return 'US_CA';
    }
    
    if (location.includes('united states') || location.includes('usa') || location.includes('us')) {
      return 'US_OTHER';
    }
    
    return 'OTHER';
  }

  /**
   * Check if user has given required consent
   */
  static hasRequiredConsent(preferences: PrivacyPreferences, region: PrivacyRegion): boolean {
    switch (region) {
      case 'EU':
        return preferences.gdprConsent && preferences.dataProcessingConsent;
      case 'US_CA':
        return preferences.ccpaConsent;
      default:
        return preferences.dataProcessingConsent;
    }
  }

  /**
   * Generate privacy policy URL based on region
   */
  static getPrivacyPolicyURL(region: PrivacyRegion): string {
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    
    switch (region) {
      case 'EU':
        return `${baseURL}/privacy/gdpr`;
      case 'US_CA':
        return `${baseURL}/privacy/ccpa`;
      default:
        return `${baseURL}/privacy`;
    }
  }

  /**
   * Check if data should be retained based on retention policy
   */
  static shouldRetainData(
    dataType: keyof DataRetentionPolicy,
    createdAt: Date,
    retentionPolicy: DataRetentionPolicy = DEFAULT_RETENTION_POLICIES
  ): boolean {
    const retentionPeriod = retentionPolicy[dataType];
    const now = new Date();
    const dataAge = now.getTime() - createdAt.getTime();
    
    // Convert retention period to milliseconds
    let retentionMs: number;
    if (dataType === 'transactionData' || dataType === 'auditLogs') {
      retentionMs = retentionPeriod * 365 * 24 * 60 * 60 * 1000; // years to ms
    } else if (dataType === 'analyticsData') {
      retentionMs = retentionPeriod * 30 * 24 * 60 * 60 * 1000; // months to ms
    } else {
      retentionMs = retentionPeriod * 24 * 60 * 60 * 1000; // days to ms
    }
    
    return dataAge < retentionMs;
  }

  /**
   * Anonymize user data for GDPR compliance
   */
  static anonymizeUserData(user: User): Partial<User> {
    return {
      id: user.id, // Keep ID for referential integrity
      email: `anonymized-${user.id}@deleted.local`,
      profile: {
        firstName: 'Anonymized',
        lastName: 'User',
      },
      preferences: {
        language: 'en',
        notifications: false,
        marketing: false,
      },
      tier: 'BRONZE',
      isVerified: false,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
  }

  /**
   * Anonymize property data
   */
  static anonymizePropertyData(property: Property): Partial<Property> {
    return {
      id: property.id,
      title: 'Property Listing Removed',
      description: 'This property listing has been removed for privacy reasons.',
      price: 0,
      location: {
        address: 'Address Removed',
        city: 'City Removed',
        state: 'State Removed',
        country: 'Country Removed',
        postalCode: '00000',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      details: {
        bedrooms: 0,
        bathrooms: 0,
        builtUpArea: 0,
      },
      ownership: {
        type: 'FREEHOLD',
        legalStatus: 'CLEAR',
      },
      seo: {
        slug: `removed-${property.id}`,
      },
      createdAt: property.createdAt,
      updatedAt: new Date(),
    };
  }

  /**
   * Generate data export for user (GDPR Article 20)
   */
  static generateDataExport(user: User, userData: {
    properties: Property[];
    inquiries: Inquiry[];
    transactions: Transaction[];
    reviews: Review[];
  }): any {
    return {
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
        preferences: user.preferences,
        tier: user.tier,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      properties: userData.properties.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        details: property.details,
        createdAt: property.createdAt,
      })),
      inquiries: userData.inquiries.map(inquiry => ({
        id: inquiry.id,
        type: inquiry.type,
        message: inquiry.message,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      })),
      transactions: userData.transactions.map(transaction => ({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt,
      })),
      reviews: userData.reviews.map(review => ({
        id: review.id,
        type: review.type,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      })),
      exportDate: new Date(),
      exportVersion: '1.0',
    };
  }

  /**
   * Check if user can request data deletion
   */
  static canRequestDeletion(user: User, userData: {
    transactions: Transaction[];
  }): { canDelete: boolean; reason?: string } {
    // Check for active transactions
    const activeTransactions = userData.transactions.filter(
      t => t.status === 'PENDING' || t.status === 'IN_PROGRESS'
    );
    
    if (activeTransactions.length > 0) {
      return {
        canDelete: false,
        reason: 'Cannot delete account with active transactions. Please complete or cancel all transactions first.',
      };
    }
    
    // Check for recent transactions (within 30 days)
    const recentTransactions = userData.transactions.filter(
      t => {
        const daysSinceCompletion = (Date.now() - t.completedAt!.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceCompletion < 30;
      }
    );
    
    if (recentTransactions.length > 0) {
      return {
        canDelete: false,
        reason: 'Cannot delete account with recent transactions. Please wait 30 days after transaction completion.',
      };
    }
    
    return { canDelete: true };
  }

  /**
   * Generate cookie consent banner data
   */
  static generateCookieConsent(region: PrivacyRegion): {
    title: string;
    message: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    categories: Array<{
      id: string;
      name: string;
      description: string;
      required: boolean;
      enabled: boolean;
    }>;
  } {
    const baseCategories = [
      {
        id: 'necessary',
        name: 'Necessary',
        description: 'Essential cookies for website functionality',
        required: true,
        enabled: true,
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Help us understand how visitors interact with our website',
        required: false,
        enabled: false,
      },
      {
        id: 'marketing',
        name: 'Marketing',
        description: 'Used to deliver relevant advertisements',
        required: false,
        enabled: false,
      },
    ];

    switch (region) {
      case 'EU':
        return {
          title: 'Cookie Consent',
          message: 'We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
          acceptAll: 'Accept All',
          rejectAll: 'Reject All',
          customize: 'Customize',
          categories: baseCategories,
        };
      case 'US_CA':
        return {
          title: 'Your Privacy Choices',
          message: 'We use cookies and similar technologies. You can choose to accept or reject non-essential cookies.',
          acceptAll: 'Accept All',
          rejectAll: 'Reject All',
          customize: 'Manage Preferences',
          categories: baseCategories,
        };
      default:
        return {
          title: 'Cookie Notice',
          message: 'This website uses cookies to improve your experience.',
          acceptAll: 'Accept',
          rejectAll: 'Decline',
          customize: 'Settings',
          categories: baseCategories,
        };
    }
  }

  /**
   * Validate data processing consent
   */
  static validateConsent(consent: PrivacyPreferences): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (!consent.consentDate) {
      errors.push('Consent date is required');
    }
    
    if (!consent.consentVersion) {
      errors.push('Consent version is required');
    }
    
    if (consent.region === 'EU' && !consent.gdprConsent) {
      errors.push('GDPR consent is required for EU users');
    }
    
    if (consent.region === 'US_CA' && !consent.ccpaConsent) {
      errors.push('CCPA consent is required for California users');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Schedule data deletion based on retention policy
   */
  static scheduleDataDeletion(
    dataType: keyof DataRetentionPolicy,
    dataId: string,
    createdAt: Date,
    retentionPolicy: DataRetentionPolicy = DEFAULT_RETENTION_POLICIES
  ): Date {
    const retentionPeriod = retentionPolicy[dataType];
    const deletionDate = new Date(createdAt);
    
    if (dataType === 'transactionData' || dataType === 'auditLogs') {
      deletionDate.setFullYear(deletionDate.getFullYear() + retentionPeriod);
    } else if (dataType === 'analyticsData') {
      deletionDate.setMonth(deletionDate.getMonth() + retentionPeriod);
    } else {
      deletionDate.setDate(deletionDate.getDate() + retentionPeriod);
    }
    
    return deletionDate;
  }
}

// Privacy compliance hooks for React components
export const usePrivacyCompliance = (region: PrivacyRegion) => {
  const consent = PrivacyService.generateCookieConsent(region);
  const policyURL = PrivacyService.getPrivacyPolicyURL(region);
  
  return {
    consent,
    policyURL,
    hasRequiredConsent: (preferences: PrivacyPreferences) =>
      PrivacyService.hasRequiredConsent(preferences, region),
  };
};
