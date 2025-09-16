import { NextRequest, NextResponse } from 'next/server';
import { 
  withSecurityHeaders, 
  withCORS, 
  withRateLimit, 
  withAuth, 
  withValidation,
  withErrorHandling,
  createAPIMiddleware,
  createSuccessResponse,
  createErrorResponse,
  withCSP
} from '@/lib/api/middleware';
import { PropertySearchSchema, PropertyCreateSchema } from '@/lib/validation';
import { UserRole } from '@/lib/auth';
import { createMockProperty } from '@/lib/testing/test-utils';

// Mock database (replace with real database in production)
const mockProperties = [
  createMockProperty({
    id: '1',
    title: 'Luxury 3BHK Apartment in Mumbai',
    price: 15000000,
    location: {
      address: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postalCode: '400051',
      coordinates: { latitude: 19.0596, longitude: 72.8295 },
    },
  }),
  createMockProperty({
    id: '2',
    title: 'Modern 2BHK Villa in Bangalore',
    price: 8500000,
    location: {
      address: 'Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      postalCode: '560066',
      coordinates: { latitude: 12.9698, longitude: 77.7500 },
    },
  }),
];

// GET /api/properties - Search and list properties
export async function GET(request: NextRequest) {
  try {
    // Apply security middleware
    const middleware = createAPIMiddleware({
      rateLimit: 'api',
      validation: {
        schema: PropertySearchSchema,
        data: Object.fromEntries(request.nextUrl.searchParams),
      },
    });

    const { response, validatedData } = await middleware(request);
    if (response) {
      return withSecurityHeaders(withCORS(request, response));
    }

    const { query, propertyType, minPrice, maxPrice, city, page = 1, limit = 20 } = validatedData!;

    // Filter properties based on search criteria
    let filteredProperties = mockProperties;

    if (query) {
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (propertyType && propertyType.length > 0) {
      filteredProperties = filteredProperties.filter(property =>
        propertyType.includes(property.propertyType)
      );
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price >= minPrice
      );
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price <= maxPrice
      );
    }

    if (city) {
      filteredProperties = filteredProperties.filter(property =>
        property.location.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    const response = createSuccessResponse(
      paginatedProperties,
      'Properties retrieved successfully',
      {
        page,
        limit,
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / limit),
      }
    );

    return withSecurityHeaders(withCORS(request, withCSP(response, 'default')));

  } catch (error) {
    return withErrorHandling(error as Error, request);
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Apply security middleware
    const middleware = createAPIMiddleware({
      auth: {
        required: true,
        roles: ['SELLER', 'AGENT', 'ADMIN'],
      },
      rateLimit: 'api',
      validation: {
        schema: PropertyCreateSchema,
        data: body,
      },
      csrf: {
        required: true,
        sessionToken: request.headers.get('X-CSRF-Token') || '',
      },
    });

    const { response, user, validatedData } = await middleware(request);
    if (response) {
      return withSecurityHeaders(withCORS(request, response));
    }

    // Create new property
    const newProperty = {
      id: crypto.randomUUID(),
      ...validatedData,
      status: 'ACTIVE' as const,
      analytics: {
        views: 0,
        inquiries: 0,
        favorites: 0,
        shares: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In production, save to database
    mockProperties.push(newProperty);

    // Audit log
    console.log(`Property created by user ${user!.id}: ${newProperty.id}`);

    const response = createSuccessResponse(
      newProperty,
      'Property created successfully',
      undefined
    );

    return withSecurityHeaders(withCORS(request, withCSP(response, 'upload')));

  } catch (error) {
    return withErrorHandling(error as Error, request);
  }
}

// OPTIONS - Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  return withCORS(request, response);
}
