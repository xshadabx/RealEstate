import { VerificationStatus } from "@/components/KYCVerificationModal";

export interface PropertyImage {
  id: string;
  url: string;
  file: File;
  embeddings?: number[];
  hash?: string;
  metadata: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  confidence: number;
  similarListings: SimilarListing[];
  recommendations: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface SimilarListing {
  id: string;
  title: string;
  price: number;
  location: string;
  similarity: number;
  imageSimilarity: number;
  textSimilarity: number;
  listingDate: string;
  sellerId: string;
  sellerName: string;
  isVerified: boolean;
  status: 'ACTIVE' | 'SOLD' | 'REMOVED';
}

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBoxes: BoundingBox[];
  extractedData: {
    price?: string;
    location?: string;
    area?: string;
    bedrooms?: string;
    contact?: string;
  };
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
}

export interface ImageEmbedding {
  vector: number[];
  model: string;
  timestamp: number;
}

// Mock OCR Service (Replace with actual OCR service like Google Vision API)
export class OCRService {
  static async extractText(imageFile: File): Promise<OCRResult> {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      text: "2BHK Flat in Vijay Nagar, Indore. Price: ₹35,00,000. Area: 1200 sq ft. Contact: 9876543210",
      confidence: 0.92,
      boundingBoxes: [
        { x: 10, y: 20, width: 200, height: 30, text: "2BHK Flat", confidence: 0.95 },
        { x: 10, y: 60, width: 150, height: 25, text: "Vijay Nagar, Indore", confidence: 0.88 },
        { x: 10, y: 100, width: 120, height: 25, text: "₹35,00,000", confidence: 0.92 },
        { x: 10, y: 140, width: 100, height: 25, text: "1200 sq ft", confidence: 0.90 },
        { x: 10, y: 180, width: 100, height: 25, text: "9876543210", confidence: 0.85 }
      ],
      extractedData: {
        price: "₹35,00,000",
        location: "Vijay Nagar, Indore",
        area: "1200 sq ft",
        bedrooms: "2BHK",
        contact: "9876543210"
      }
    };
  }
}

// Mock Image Embedding Service (Replace with actual CLIP or similar model)
export class ImageEmbeddingService {
  static async generateEmbedding(imageFile: File): Promise<ImageEmbedding> {
    // Simulate embedding generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock 512-dimensional vector
    const vector = Array.from({ length: 512 }, () => Math.random() * 2 - 1);
    
    return {
      vector,
      model: "CLIP-ViT-B-32",
      timestamp: Date.now()
    };
  }

  static calculateSimilarity(embedding1: number[], embedding2: number[]): number {
    // Calculate cosine similarity
    const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
    const magnitude1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val * val, 0));
    
    return dotProduct / (magnitude1 * magnitude2);
  }
}

// Mock FAISS-like vector search
export class VectorSearchService {
  private static embeddings: Map<string, ImageEmbedding> = new Map();
  private static listings: Map<string, any> = new Map();

  static async addEmbedding(listingId: string, embedding: ImageEmbedding, listingData: any) {
    this.embeddings.set(listingId, embedding);
    this.listings.set(listingId, listingData);
  }

  static async searchSimilar(embedding: number[], threshold: number = 0.8, limit: number = 10): Promise<SimilarListing[]> {
    const results: SimilarListing[] = [];
    
    for (const [listingId, storedEmbedding] of this.embeddings) {
      const similarity = ImageEmbeddingService.calculateSimilarity(embedding, storedEmbedding.vector);
      
      if (similarity >= threshold) {
        const listing = this.listings.get(listingId);
        if (listing) {
          results.push({
            id: listingId,
            title: listing.title,
            price: listing.price,
            location: listing.location,
            similarity,
            imageSimilarity: similarity,
            textSimilarity: Math.random() * 0.3 + 0.7, // Mock text similarity
            listingDate: listing.createdAt,
            sellerId: listing.sellerId,
            sellerName: listing.sellerName,
            isVerified: listing.isVerified,
            status: listing.status
          });
        }
      }
    }
    
    return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
  }
}

// Text similarity service
export class TextSimilarityService {
  static calculateSimilarity(text1: string, text2: string): number {
    // Simple Jaccard similarity for demonstration
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  static extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10);
  }
}

// Main duplicate detection engine
export class DuplicateDetectionEngine {
  static async detectDuplicates(
    images: PropertyImage[],
    propertyData: {
      title: string;
      description: string;
      price: number;
      location: string;
      area: number;
    },
    verificationStatus: VerificationStatus
  ): Promise<DuplicateDetectionResult> {
    const results: DuplicateDetectionResult = {
      isDuplicate: false,
      confidence: 0,
      similarListings: [],
      recommendations: [],
      riskLevel: 'LOW'
    };

    try {
      // Process images for OCR and embeddings
      const imageResults = await Promise.all(
        images.map(async (image) => {
          const [ocrResult, embedding] = await Promise.all([
            OCRService.extractText(image.file),
            ImageEmbeddingService.generateEmbedding(image.file)
          ]);
          
          return {
            image,
            ocrResult,
            embedding
          };
        })
      );

      // Search for similar images
      const allSimilarListings: SimilarListing[] = [];
      
      for (const result of imageResults) {
        const similarListings = await VectorSearchService.searchSimilar(
          result.embedding.vector,
          0.75, // Lower threshold for initial search
          20
        );
        allSimilarListings.push(...similarListings);
      }

      // Remove duplicates and calculate overall similarity
      const uniqueListings = new Map<string, SimilarListing>();
      for (const listing of allSimilarListings) {
        const existing = uniqueListings.get(listing.id);
        if (!existing || listing.similarity > existing.similarity) {
          uniqueListings.set(listing.id, listing);
        }
      }

      results.similarListings = Array.from(uniqueListings.values())
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      // Calculate text similarity
      const propertyText = `${propertyData.title} ${propertyData.description} ${propertyData.location}`;
      for (const listing of results.similarListings) {
        const listingText = `${listing.title} ${listing.location}`;
        listing.textSimilarity = TextSimilarityService.calculateSimilarity(propertyText, listingText);
      }

      // Determine if it's a duplicate
      const highSimilarityListings = results.similarListings.filter(
        listing => listing.imageSimilarity > 0.85 || listing.textSimilarity > 0.8
      );

      if (highSimilarityListings.length > 0) {
        results.isDuplicate = true;
        results.confidence = Math.max(...highSimilarityListings.map(l => l.similarity));
        
        // Determine risk level
        if (results.confidence > 0.95) {
          results.riskLevel = 'CRITICAL';
        } else if (results.confidence > 0.9) {
          results.riskLevel = 'HIGH';
        } else if (results.confidence > 0.8) {
          results.riskLevel = 'MEDIUM';
        } else {
          results.riskLevel = 'LOW';
        }
      }

      // Generate recommendations
      results.recommendations = this.generateRecommendations(results, verificationStatus);

      return results;
    } catch (error) {
      console.error('Duplicate detection failed:', error);
      return {
        isDuplicate: false,
        confidence: 0,
        similarListings: [],
        recommendations: ['Unable to process images. Please try again.'],
        riskLevel: 'LOW'
      };
    }
  }

  private static generateRecommendations(
    result: DuplicateDetectionResult,
    verificationStatus: VerificationStatus
  ): string[] {
    const recommendations: string[] = [];

    if (result.isDuplicate) {
      if (result.riskLevel === 'CRITICAL') {
        recommendations.push('This listing appears to be a duplicate of an existing property.');
        recommendations.push('Please verify that this is a different property or contact support.');
      } else if (result.riskLevel === 'HIGH') {
        recommendations.push('Similar listings found. Please ensure this is a unique property.');
        recommendations.push('Consider adding more unique photos or updating the description.');
      } else {
        recommendations.push('Some similar properties found. Please review and confirm uniqueness.');
      }
    } else {
      recommendations.push('No duplicate listings detected. Your property appears to be unique.');
    }

    // Add verification-based recommendations
    if (verificationStatus.overallStatus === 'UNVERIFIED') {
      recommendations.push('Complete KYC verification to boost your listing visibility.');
    } else if (verificationStatus.overallStatus === 'KYC_VERIFIED') {
      recommendations.push('Your KYC is verified. Consider RERA certification for better trust.');
    } else if (verificationStatus.overallStatus === 'RERA_CERTIFIED') {
      recommendations.push('Excellent! Your RERA certification will boost listing credibility.');
    }

    return recommendations;
  }

  static async addListingToIndex(
    listingId: string,
    images: PropertyImage[],
    listingData: any
  ): Promise<void> {
    try {
      for (const image of images) {
        const embedding = await ImageEmbeddingService.generateEmbedding(image.file);
        await VectorSearchService.addEmbedding(listingId, embedding, listingData);
      }
    } catch (error) {
      console.error('Failed to add listing to search index:', error);
    }
  }
}

// Utility functions
export const generateImageHash = async (file: File): Promise<string> => {
  // Simple hash generation for demonstration
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const validateImageQuality = (file: File): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    issues.push('Image size exceeds 10MB limit');
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    issues.push('Only JPEG, PNG, and WebP images are allowed');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

export const extractImageMetadata = (file: File): Promise<PropertyImage['metadata']> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        format: file.type
      });
    };
    
    img.src = url;
  });
};

