import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from 'next-themes';
import { User, UserRole } from '../auth';
import { Property, Inquiry, Transaction } from '../database/schema';

// Mock data generators
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'user-123',
  email: 'test@example.com',
  role: 'BUYER',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
  },
  preferences: {
    language: 'en',
    notifications: true,
    marketing: false,
  },
  tier: 'SILVER',
  isVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockProperty = (overrides: Partial<Property> = {}): Property => ({
  id: 'property-123',
  title: 'Beautiful 3BHK Apartment',
  description: 'A stunning apartment in the heart of the city',
  price: 5000000,
  currency: 'INR',
  propertyType: 'APARTMENT',
  listingType: 'SALE',
  status: 'ACTIVE',
  location: {
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400001',
    coordinates: {
      latitude: 19.0760,
      longitude: 72.8777,
    },
  },
  details: {
    bedrooms: 3,
    bathrooms: 2,
    builtUpArea: 1200,
    carpetArea: 1000,
  },
  ownership: {
    type: 'FREEHOLD',
    legalStatus: 'CLEAR',
  },
  seo: {
    slug: 'beautiful-3bhk-apartment',
  },
  analytics: {
    views: 100,
    inquiries: 5,
    favorites: 10,
    shares: 2,
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockInquiry = (overrides: Partial<Inquiry> = {}): Inquiry => ({
  id: 'inquiry-123',
  propertyId: 'property-123',
  userId: 'user-123',
  type: 'GENERAL',
  message: 'I am interested in this property',
  status: 'NEW',
  priority: 'MEDIUM',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockTransaction = (overrides: Partial<Transaction> = {}): Transaction => ({
  id: 'transaction-123',
  propertyId: 'property-123',
  buyerId: 'user-123',
  sellerId: 'user-456',
  type: 'SALE',
  amount: 5000000,
  currency: 'INR',
  status: 'PENDING',
  paymentStatus: 'PENDING',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

// Test wrapper with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Security testing utilities
export const createMockRequest = (overrides: Partial<Request> = {}): Request => {
  const mockRequest = new Request('https://example.com/api/test', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer mock-token',
      ...overrides.headers,
    },
    ...overrides,
  });
  
  return mockRequest;
};

export const createMockNextRequest = (overrides: any = {}): any => ({
  method: 'GET',
  url: 'https://example.com/api/test',
  headers: new Map([
    ['authorization', 'Bearer mock-token'],
    ['content-type', 'application/json'],
  ]),
  ip: '127.0.0.1',
  ...overrides,
});

// Validation testing utilities
export const createInvalidEmail = (): string => 'invalid-email';
export const createWeakPassword = (): string => '123';
export const createValidPassword = (): string => 'SecurePass123!';
export const createValidEmail = (): string => 'test@example.com';

// Rate limiting testing utilities
export const createRateLimitTestCases = () => [
  {
    name: 'should allow requests within limit',
    requests: 5,
    limit: 10,
    expected: true,
  },
  {
    name: 'should block requests exceeding limit',
    requests: 15,
    limit: 10,
    expected: false,
  },
  {
    name: 'should reset after time window',
    requests: 5,
    limit: 10,
    timeWindow: 0, // Expired
    expected: true,
  },
];

// Database testing utilities
export const createTestDatabase = () => {
  const users = new Map<string, User>();
  const properties = new Map<string, Property>();
  const inquiries = new Map<string, Inquiry>();
  const transactions = new Map<string, Transaction>();
  
  return {
    users,
    properties,
    inquiries,
    transactions,
    
    // Helper methods
    addUser: (user: User) => users.set(user.id, user),
    getUser: (id: string) => users.get(id),
    deleteUser: (id: string) => users.delete(id),
    
    addProperty: (property: Property) => properties.set(property.id, property),
    getProperty: (id: string) => properties.get(id),
    deleteProperty: (id: string) => properties.delete(id),
    
    addInquiry: (inquiry: Inquiry) => inquiries.set(inquiry.id, inquiry),
    getInquiry: (id: string) => inquiries.get(id),
    deleteInquiry: (id: string) => inquiries.delete(id),
    
    addTransaction: (transaction: Transaction) => transactions.set(transaction.id, transaction),
    getTransaction: (id: string) => transactions.get(id),
    deleteTransaction: (id: string) => transactions.delete(id),
    
    // Clear all data
    clear: () => {
      users.clear();
      properties.clear();
      inquiries.clear();
      transactions.clear();
    },
  };
};

// API testing utilities
export const createMockAPIResponse = <T>(data: T, status: number = 200) => ({
  success: true,
  data,
  status,
});

export const createMockAPIError = (error: string, status: number = 400) => ({
  success: false,
  error,
  status,
});

// Performance testing utilities
export const measurePerformance = async <T>(
  fn: () => Promise<T>,
  name: string
): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;
  
  console.log(`${name} took ${duration.toFixed(2)}ms`);
  
  return { result, duration };
};

// Accessibility testing utilities
export const createAccessibilityTestCases = () => [
  {
    name: 'should have proper heading hierarchy',
    test: (container: HTMLElement) => {
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return headings.length > 0;
    },
  },
  {
    name: 'should have alt text for images',
    test: (container: HTMLElement) => {
      const images = container.querySelectorAll('img');
      return Array.from(images).every(img => img.hasAttribute('alt'));
    },
  },
  {
    name: 'should have proper form labels',
    test: (container: HTMLElement) => {
      const inputs = container.querySelectorAll('input, textarea, select');
      return Array.from(inputs).every(input => {
        const id = input.getAttribute('id');
        const label = container.querySelector(`label[for="${id}"]`);
        return label !== null;
      });
    },
  },
];

// Security testing utilities
export const createSecurityTestCases = () => [
  {
    name: 'should prevent XSS attacks',
    maliciousInput: '<script>alert("xss")</script>',
    expected: 'should be sanitized',
  },
  {
    name: 'should prevent SQL injection',
    maliciousInput: "'; DROP TABLE users; --",
    expected: 'should be parameterized',
  },
  {
    name: 'should validate input length',
    longInput: 'a'.repeat(10000),
    expected: 'should be rejected',
  },
];

// Privacy testing utilities
export const createPrivacyTestCases = () => [
  {
    name: 'should anonymize user data on deletion',
    test: (user: User) => {
      // Test anonymization logic
      return user.email.includes('anonymized');
    },
  },
  {
    name: 'should respect data retention policies',
    test: (data: any, createdAt: Date) => {
      // Test retention logic
      const age = Date.now() - createdAt.getTime();
      return age < 365 * 24 * 60 * 60 * 1000; // 1 year
    },
  },
  {
    name: 'should generate proper data exports',
    test: (exportData: any) => {
      return exportData.user && exportData.exportDate;
    },
  },
];

// Mock functions for external services
export const createMockEmailService = () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationEmail: jest.fn().mockResolvedValue({ success: true }),
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }),
});

export const createMockSmsService = () => ({
  sendSms: jest.fn().mockResolvedValue({ success: true }),
  sendVerificationSms: jest.fn().mockResolvedValue({ success: true }),
});

export const createMockFileStorage = () => ({
  upload: jest.fn().mockResolvedValue({ url: 'https://example.com/file.jpg' }),
  delete: jest.fn().mockResolvedValue({ success: true }),
  getSignedUrl: jest.fn().mockResolvedValue('https://example.com/signed-url'),
});

// Test environment setup
export const setupTestEnvironment = () => {
  // Mock environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.DATABASE_URL = 'test-database-url';
  
  // Mock console methods to reduce noise in tests
  const originalConsole = { ...console };
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  
  return {
    restore: () => {
      Object.assign(console, originalConsole);
    },
  };
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
