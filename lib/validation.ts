import { z } from 'zod';
import { AuthService } from './auth';

// Common validation schemas
export const EmailSchema = z.string()
  .email('Invalid email format')
  .min(1, 'Email is required')
  .max(255, 'Email is too long')
  .transform(email => email.toLowerCase().trim());

export const PasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .refine(
    (password) => {
      const validation = AuthService.validatePassword(password);
      return validation.valid;
    },
    {
      message: 'Password must contain uppercase, lowercase, number, and special character',
    }
  );

export const PhoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number is too long')
  .refine(
    (phone) => AuthService.validatePhoneNumber(phone),
    'Invalid phone number format'
  )
  .transform(phone => phone.replace(/\D/g, '')); // Remove non-digits

export const NameSchema = z.string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .transform(name => AuthService.sanitizeInput(name));

export const AddressSchema = z.object({
  street: z.string().min(1, 'Street address is required').max(200, 'Street address is too long'),
  city: z.string().min(1, 'City is required').max(100, 'City name is too long'),
  state: z.string().min(1, 'State is required').max(100, 'State name is too long'),
  country: z.string().min(1, 'Country is required').max(100, 'Country name is too long'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code is too long'),
}).transform(data => ({
  street: AuthService.sanitizeInput(data.street),
  city: AuthService.sanitizeInput(data.city),
  state: AuthService.sanitizeInput(data.state),
  country: AuthService.sanitizeInput(data.country),
  postalCode: AuthService.sanitizeInput(data.postalCode),
}));

// Authentication schemas
export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
  captcha: z.string().optional(), // For rate limiting protection
});

export const RegisterSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: z.string(),
  firstName: NameSchema,
  lastName: NameSchema,
  phone: PhoneSchema.optional(),
  role: z.enum(['BUYER', 'SELLER']).default('BUYER'),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']).default('BRONZE'),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  captcha: z.string().optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export const PasswordResetRequestSchema = z.object({
  email: EmailSchema,
  captcha: z.string().optional(),
});

export const PasswordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: PasswordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: PasswordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

// Property schemas
export const PropertyCreateSchema = z.object({
  title: z.string()
    .min(1, 'Property title is required')
    .max(200, 'Title is too long')
    .transform(title => AuthService.sanitizeInput(title)),
  
  description: z.string()
    .min(1, 'Property description is required')
    .max(5000, 'Description is too long')
    .transform(desc => AuthService.sanitizeInput(desc)),
  
  price: z.number()
    .positive('Price must be positive')
    .max(10000000000, 'Price is too high'), // 10 billion max
  
  currency: z.string().default('INR'),
  
  propertyType: z.enum(['APARTMENT', 'VILLA', 'HOUSE', 'PLOT', 'COMMERCIAL', 'OFFICE', 'SHOP']),
  listingType: z.enum(['SALE', 'RENT']),
  
  location: AddressSchema.extend({
    coordinates: z.object({
      latitude: z.number().min(-90).max(90, 'Invalid latitude'),
      longitude: z.number().min(-180).max(180, 'Invalid longitude'),
    }),
    landmarks: z.array(z.string().max(100)).max(10).optional(),
  }),
  
  details: z.object({
    bedrooms: z.number().min(0).max(20, 'Invalid number of bedrooms'),
    bathrooms: z.number().min(0).max(20, 'Invalid number of bathrooms'),
    balconies: z.number().min(0).max(10).optional(),
    parking: z.number().min(0).max(10).optional(),
    builtUpArea: z.number().positive('Built-up area must be positive').max(100000, 'Area is too large'),
    carpetArea: z.number().positive().max(100000).optional(),
    superBuiltUpArea: z.number().positive().max(100000).optional(),
    floor: z.number().min(-5).max(100).optional(),
    totalFloors: z.number().min(1).max(100).optional(),
    age: z.number().min(0).max(200).optional(),
    furnishing: z.enum(['FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED']).optional(),
    facing: z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST', 'NORTH_EAST', 'NORTH_WEST', 'SOUTH_EAST', 'SOUTH_WEST']).optional(),
  }),
  
  features: z.array(z.string().max(100)).max(50).optional(),
  amenities: z.array(z.string().max(100)).max(50).optional(),
  
  ownership: z.object({
    type: z.enum(['FREEHOLD', 'LEASEHOLD', 'COOPERATIVE']),
    documents: z.array(z.string().url()).max(20).optional(),
    legalStatus: z.enum(['CLEAR', 'PENDING', 'DISPUTED']).default('CLEAR'),
  }),
  
  financial: z.object({
    maintenanceCharges: z.number().min(0).optional(),
    propertyTax: z.number().min(0).optional(),
    registrationCharges: z.number().min(0).optional(),
    stampDuty: z.number().min(0).optional(),
    brokerage: z.number().min(0).max(100).optional(),
  }).optional(),
});

export const PropertyUpdateSchema = PropertyCreateSchema.partial();

export const PropertySearchSchema = z.object({
  query: z.string().max(200).optional(),
  propertyType: z.array(z.enum(['APARTMENT', 'VILLA', 'HOUSE', 'PLOT', 'COMMERCIAL', 'OFFICE', 'SHOP'])).optional(),
  listingType: z.enum(['SALE', 'RENT']).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minBedrooms: z.number().min(0).optional(),
  maxBedrooms: z.number().min(0).optional(),
  minBathrooms: z.number().min(0).optional(),
  maxBathrooms: z.number().min(0).optional(),
  minArea: z.number().min(0).optional(),
  maxArea: z.number().min(0).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  features: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'date_desc', 'area_desc', 'relevance']).default('date_desc'),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Inquiry schemas
export const InquiryCreateSchema = z.object({
  propertyId: z.string().uuid('Invalid property ID'),
  type: z.enum(['GENERAL', 'VIEWING', 'PRICE_NEGOTIATION', 'DOCUMENTATION', 'OTHER']).default('GENERAL'),
  message: z.string()
    .min(1, 'Message is required')
    .max(2000, 'Message is too long')
    .transform(msg => AuthService.sanitizeInput(msg)),
  scheduledAt: z.date().optional(),
});

export const InquiryUpdateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  response: z.string().max(2000).optional(),
  scheduledAt: z.date().optional(),
});

// Review schemas
export const ReviewCreateSchema = z.object({
  propertyId: z.string().uuid('Invalid property ID'),
  agentId: z.string().uuid('Invalid agent ID').optional(),
  type: z.enum(['PROPERTY', 'AGENT', 'SERVICE']),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().max(200).optional(),
  comment: z.string()
    .min(1, 'Comment is required')
    .max(2000, 'Comment is too long')
    .transform(comment => AuthService.sanitizeInput(comment)),
});

export const ReviewUpdateSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  title: z.string().max(200).optional(),
  comment: z.string().max(2000).optional(),
});

// User profile schemas
export const ProfileUpdateSchema = z.object({
  firstName: NameSchema.optional(),
  lastName: NameSchema.optional(),
  phone: PhoneSchema.optional(),
  avatar: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
  address: AddressSchema.optional(),
  preferences: z.object({
    language: z.string().optional(),
    notifications: z.boolean().optional(),
    marketing: z.boolean().optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
  }).optional(),
});

// File upload schemas
export const FileUploadSchema = z.object({
  file: z.instanceof(File),
  type: z.enum(['image', 'document', 'video']),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).optional(),
});

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Generic ID validation
export const IdSchema = z.string().uuid('Invalid ID format');

// Search query validation
export const SearchQuerySchema = z.object({
  q: z.string().max(200).optional(),
  filters: z.record(z.any()).optional(),
  pagination: PaginationSchema.optional(),
});

// Validation helper functions
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = AuthService.sanitizeInput(value) as T[keyof T];
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeObject(value);
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

// Rate limiting validation
export function validateRateLimit(identifier: string, action: string): boolean {
  return AuthService.checkRateLimit(identifier, action as any);
}

// CSRF token validation
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length > 0;
}

// Input length validation
export function validateInputLength(input: string, min: number, max: number): boolean {
  return input.length >= min && input.length <= max;
}

// URL validation
export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Coordinate validation
export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
