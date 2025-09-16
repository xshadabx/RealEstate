import { NextRequest, NextResponse } from 'next/server';
import { AuthService, SECURITY_HEADERS, CORS_CONFIG, User, UserRole } from '../auth';
import { validateInput, validateRateLimit } from '../validation';
import { AuditLogSchema } from '../database/schema';

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Security headers middleware
export function withSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

// CORS middleware
export function withCORS(request: NextRequest, response: NextResponse): NextResponse {
  const origin = request.headers.get('origin');
  
  if (origin && CORS_CONFIG.origin.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', CORS_CONFIG.methods.join(', '));
  response.headers.set('Access-Control-Allow-Headers', CORS_CONFIG.allowedHeaders.join(', '));
  response.headers.set('Access-Control-Max-Age', CORS_CONFIG.maxAge.toString());
  
  return response;
}

// Rate limiting middleware
export function withRateLimit(
  request: NextRequest,
  limitType: 'login' | 'register' | 'passwordReset' | 'api' = 'api'
): NextResponse | null {
  const identifier = getClientIdentifier(request);
  
  if (!validateRateLimit(identifier, limitType)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 900, // 15 minutes
      },
      { status: 429 }
    );
  }
  
  return null;
}

// Authentication middleware
export function withAuth(
  request: NextRequest,
  requiredRoles?: UserRole[]
): { response?: NextResponse; user?: User } {
  const token = AuthService.extractTokenFromRequest(request);
  
  if (!token) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      ),
    };
  }
  
  const payload = AuthService.verifyToken(token);
  
  if (!payload) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      ),
    };
  }
  
  // Check role requirements
  if (requiredRoles && !AuthService.hasRole(payload.role, requiredRoles)) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      ),
    };
  }
  
  // Mock user object (in real app, fetch from database)
  const user: User = {
    id: payload.userId,
    email: payload.email,
    role: payload.role,
    tier: payload.tier as any,
    profile: {
      firstName: 'John',
      lastName: 'Doe',
    },
    preferences: {
      language: 'en',
      notifications: true,
      marketing: false,
    },
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return { user };
}

// Input validation middleware
export function withValidation<T>(
  schema: any,
  data: unknown
): { response?: NextResponse; validatedData?: T } {
  const validation = validateInput(schema, data);
  
  if (!validation.success) {
    return {
      response: NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      ),
    };
  }
  
  return { validatedData: validation.data };
}

// CSRF protection middleware
export function withCSRF(
  request: NextRequest,
  sessionToken: string
): NextResponse | null {
  if (request.method === 'GET' || request.method === 'HEAD') {
    return null; // Skip CSRF for read operations
  }
  
  const csrfToken = request.headers.get('X-CSRF-Token');
  
  if (!csrfToken || csrfToken !== sessionToken) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid CSRF token',
      },
      { status: 403 }
    );
  }
  
  return null;
}

// Audit logging middleware
export function withAuditLog(
  request: NextRequest,
  user: User,
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, any>
): void {
  const auditLog = {
    id: crypto.randomUUID(),
    userId: user.id,
    action,
    resource,
    resourceId,
    details,
    ipAddress: getClientIP(request),
    userAgent: request.headers.get('user-agent') || '',
    timestamp: new Date(),
  };
  
  // In production, save to database
  console.log('Audit Log:', auditLog);
}

// Error handling middleware
export function withErrorHandling(
  error: Error,
  request: NextRequest
): NextResponse {
  console.error('API Error:', error);
  
  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: isDevelopment ? error.message : undefined,
      },
      { status: 400 }
    );
  }
  
  if (error.name === 'UnauthorizedError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    );
  }
  
  if (error.name === 'ForbiddenError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden',
      },
      { status: 403 }
    );
  }
  
  if (error.name === 'NotFoundError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Resource not found',
      },
      { status: 404 }
    );
  }
  
  return NextResponse.json(
    {
      success: false,
      error: isDevelopment ? error.message : 'Internal server error',
    },
    { status: 500 }
  );
}

// Utility functions
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return ip;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

// API response helpers
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  pagination?: APIResponse<T>['pagination']
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    pagination,
  });
}

export function createErrorResponse(
  error: string,
  status: number = 400,
  errors?: string[]
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      errors,
    },
    { status }
  );
}

// Combined middleware wrapper
export function createAPIMiddleware(options: {
  auth?: {
    required: boolean;
    roles?: UserRole[];
  };
  rateLimit?: 'login' | 'register' | 'passwordReset' | 'api';
  validation?: {
    schema: any;
    data: unknown;
  };
  csrf?: {
    required: boolean;
    sessionToken: string;
  };
}) {
  return async (request: NextRequest): Promise<{
    response?: NextResponse;
    user?: User;
    validatedData?: any;
  }> => {
    // Apply rate limiting
    if (options.rateLimit) {
      const rateLimitResponse = withRateLimit(request, options.rateLimit);
      if (rateLimitResponse) {
        return { response: rateLimitResponse };
      }
    }
    
    // Apply CSRF protection
    if (options.csrf?.required) {
      const csrfResponse = withCSRF(request, options.csrf.sessionToken);
      if (csrfResponse) {
        return { response: csrfResponse };
      }
    }
    
    // Apply authentication
    let user: User | undefined;
    if (options.auth?.required) {
      const authResult = withAuth(request, options.auth.roles);
      if (authResult.response) {
        return { response: authResult.response };
      }
      user = authResult.user;
    }
    
    // Apply validation
    let validatedData: any;
    if (options.validation) {
      const validationResult = withValidation(
        options.validation.schema,
        options.validation.data
      );
      if (validationResult.response) {
        return { response: validationResult.response };
      }
      validatedData = validationResult.validatedData;
    }
    
    return { user, validatedData };
  };
}

// Content Security Policy for different contexts
export const CSP_POLICIES = {
  default: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
  strict: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self';",
  upload: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https:;",
};

// Apply CSP based on context
export function withCSP(response: NextResponse, policy: keyof typeof CSP_POLICIES = 'default'): NextResponse {
  response.headers.set('Content-Security-Policy', CSP_POLICIES[policy]);
  return response;
}
