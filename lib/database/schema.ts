import { z } from 'zod';
import { UserRole } from '../auth';

// Base schemas for validation
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string().min(60), // bcrypt hash length
  role: z.enum(['ADMIN', 'AGENT', 'BUYER', 'SELLER', 'PROPERTY_MANAGER']),
  profile: z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    phone: z.string().optional(),
    avatar: z.string().url().optional(),
    dateOfBirth: z.date().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
    }).optional(),
  }),
  preferences: z.object({
    language: z.string().default('en'),
    notifications: z.boolean().default(true),
    marketing: z.boolean().default(false),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']).default('BRONZE'),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  emailVerifiedAt: z.date().optional(),
  phoneVerifiedAt: z.date().optional(),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  price: z.number().positive(),
  currency: z.string().default('INR'),
  propertyType: z.enum(['APARTMENT', 'VILLA', 'HOUSE', 'PLOT', 'COMMERCIAL', 'OFFICE', 'SHOP']),
  listingType: z.enum(['SALE', 'RENT']),
  status: z.enum(['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'INACTIVE']).default('ACTIVE'),
  
  // Location details
  location: z.object({
    address: z.string().min(1).max(500),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(20),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
    landmarks: z.array(z.string()).optional(),
  }),
  
  // Property details
  details: z.object({
    bedrooms: z.number().min(0).max(20),
    bathrooms: z.number().min(0).max(20),
    balconies: z.number().min(0).max(10).optional(),
    parking: z.number().min(0).max(10).optional(),
    builtUpArea: z.number().positive(), // in sq ft
    carpetArea: z.number().positive().optional(), // in sq ft
    superBuiltUpArea: z.number().positive().optional(), // in sq ft
    floor: z.number().optional(),
    totalFloors: z.number().optional(),
    age: z.number().min(0).optional(), // in years
    furnishing: z.enum(['FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED']).optional(),
    facing: z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST', 'NORTH_EAST', 'NORTH_WEST', 'SOUTH_EAST', 'SOUTH_WEST']).optional(),
  }),
  
  // Features and amenities
  features: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  
  // Media
  images: z.array(z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false),
    order: z.number().default(0),
  })).default([]),
  
  // Virtual tour
  virtualTour: z.object({
    url: z.string().url().optional(),
    type: z.enum(['360', 'VIDEO', 'AR']).optional(),
  }).optional(),
  
  // Ownership and legal
  ownership: z.object({
    type: z.enum(['FREEHOLD', 'LEASEHOLD', 'COOPERATIVE']),
    documents: z.array(z.string()).optional(),
    legalStatus: z.enum(['CLEAR', 'PENDING', 'DISPUTED']).default('CLEAR'),
  }),
  
  // Financial details
  financial: z.object({
    maintenanceCharges: z.number().min(0).optional(),
    propertyTax: z.number().min(0).optional(),
    registrationCharges: z.number().min(0).optional(),
    stampDuty: z.number().min(0).optional(),
    brokerage: z.number().min(0).optional(),
  }).optional(),
  
  // SEO and visibility
  seo: z.object({
    slug: z.string().min(1).max(200),
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
  }),
  
  // Analytics
  analytics: z.object({
    views: z.number().default(0),
    inquiries: z.number().default(0),
    favorites: z.number().default(0),
    shares: z.number().default(0),
  }).default({}),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  expiresAt: z.date().optional(),
});

export const AgentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  license: z.string().min(1).max(100),
  company: z.string().min(1).max(200).optional(),
  specializations: z.array(z.string()).optional(),
  experience: z.number().min(0).optional(), // in years
  languages: z.array(z.string()).optional(),
  serviceAreas: z.array(z.string()).optional(),
  commission: z.number().min(0).max(100).optional(), // percentage
  rating: z.number().min(0).max(5).default(0),
  totalTransactions: z.number().min(0).default(0),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const InquirySchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  userId: z.string().uuid(),
  agentId: z.string().uuid().optional(),
  type: z.enum(['GENERAL', 'VIEWING', 'PRICE_NEGOTIATION', 'DOCUMENTATION', 'OTHER']),
  message: z.string().min(1).max(2000),
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).default('NEW'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  response: z.string().max(2000).optional(),
  scheduledAt: z.date().optional(),
  resolvedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  buyerId: z.string().uuid(),
  sellerId: z.string().uuid(),
  agentId: z.string().uuid().optional(),
  type: z.enum(['SALE', 'RENT']),
  amount: z.number().positive(),
  currency: z.string().default('INR'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'FAILED']).default('PENDING'),
  paymentStatus: z.enum(['PENDING', 'PARTIAL', 'COMPLETED', 'FAILED', 'REFUNDED']).default('PENDING'),
  
  // Transaction details
  details: z.object({
    downPayment: z.number().min(0).optional(),
    loanAmount: z.number().min(0).optional(),
    loanProvider: z.string().optional(),
    registrationFees: z.number().min(0).optional(),
    stampDuty: z.number().min(0).optional(),
    brokerage: z.number().min(0).optional(),
    legalFees: z.number().min(0).optional(),
    otherCharges: z.number().min(0).optional(),
  }).optional(),
  
  // Documents
  documents: z.array(z.object({
    id: z.string().uuid(),
    type: z.string(),
    url: z.string().url(),
    uploadedAt: z.date(),
  })).optional(),
  
  // Timeline
  milestones: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
    dueDate: z.date().optional(),
    completedAt: z.date().optional(),
  })).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
});

export const ReviewSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  userId: z.string().uuid(),
  agentId: z.string().uuid().optional(),
  type: z.enum(['PROPERTY', 'AGENT', 'SERVICE']),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(200).optional(),
  comment: z.string().min(1).max(2000),
  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  helpful: z.number().default(0),
  notHelpful: z.number().default(0),
  response: z.string().max(2000).optional(),
  responseAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().uuid().optional(),
  details: z.record(z.any()).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  timestamp: z.date(),
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type Agent = z.infer<typeof AgentSchema>;
export type Inquiry = z.infer<typeof InquirySchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type AuditLog = z.infer<typeof AuditLogSchema>;

// Database indexes for performance
export const DATABASE_INDEXES = {
  users: [
    { fields: ['email'], unique: true },
    { fields: ['role'] },
    { fields: ['tier'] },
    { fields: ['isActive'] },
    { fields: ['createdAt'] },
  ],
  properties: [
    { fields: ['status'] },
    { fields: ['propertyType'] },
    { fields: ['listingType'] },
    { fields: ['location.city'] },
    { fields: ['location.state'] },
    { fields: ['price'] },
    { fields: ['createdAt'] },
    { fields: ['publishedAt'] },
    { fields: ['seo.slug'], unique: true },
  ],
  inquiries: [
    { fields: ['propertyId'] },
    { fields: ['userId'] },
    { fields: ['agentId'] },
    { fields: ['status'] },
    { fields: ['createdAt'] },
  ],
  transactions: [
    { fields: ['propertyId'] },
    { fields: ['buyerId'] },
    { fields: ['sellerId'] },
    { fields: ['agentId'] },
    { fields: ['status'] },
    { fields: ['createdAt'] },
  ],
  reviews: [
    { fields: ['propertyId'] },
    { fields: ['userId'] },
    { fields: ['agentId'] },
    { fields: ['type'] },
    { fields: ['rating'] },
    { fields: ['isVerified'] },
    { fields: ['createdAt'] },
  ],
  auditLogs: [
    { fields: ['userId'] },
    { fields: ['action'] },
    { fields: ['resource'] },
    { fields: ['timestamp'] },
  ],
};
