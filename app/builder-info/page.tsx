"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { 
  Building, 
  Star, 
  Users, 
  Calendar, 
  MapPin, 
  Award, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Sparkles,
  BarChart3,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Download,
  Upload
} from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import { successAnimation } from "@/lib/lottie-animations";

interface Project {
  id: string;
  name: string;
  location: string;
  status: 'Completed' | 'Under Construction' | 'Planned';
  units: number;
  completionDate: string;
  rating: number;
  priceRange: string;
  image: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  project: string;
  verified: boolean;
}

interface BuilderProfile {
  name: string;
  reraNumber: string;
  establishedYear: number;
  totalProjects: number;
  completedProjects: number;
  underConstruction: number;
  plannedProjects: number;
  averageRating: number;
  totalReviews: number;
  legalStatus: 'Clean' | 'Pending' | 'Issues';
  certifications: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function BuilderInfoPage() {
  const { t } = useLanguage();
  const [selectedBuilder, setSelectedBuilder] = useState("ABC Developers");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockBuilderProfile: BuilderProfile = {
    name: "ABC Developers",
    reraNumber: "MP/01/2023/001234",
    establishedYear: 2015,
    totalProjects: 25,
    completedProjects: 18,
    underConstruction: 5,
    plannedProjects: 2,
    averageRating: 4.3,
    totalReviews: 247,
    legalStatus: 'Clean',
    certifications: ['RERA Registered', 'ISO 9001:2015', 'Green Building Certified'],
    contact: {
      phone: "+91 98765 43210",
      email: "info@abcdevelopers.com",
      website: "www.abcdevelopers.com",
      address: "123 Business Park, Indore, MP"
    },
    riskScore: 85,
    riskLevel: 'LOW'
  };

  const mockProjects: Project[] = [
    {
      id: "1",
      name: "Green Valley Apartments",
      location: "Vijay Nagar, Indore",
      status: "Completed",
      units: 120,
      completionDate: "2023-08-15",
      rating: 4.5,
      priceRange: "₹3,500-4,200/sq ft",
      image: "/api/placeholder/300/200"
    },
    {
      id: "2",
      name: "Royal Heights",
      location: "Rajwada, Indore",
      status: "Under Construction",
      units: 200,
      completionDate: "2024-12-31",
      rating: 4.2,
      priceRange: "₹4,000-5,000/sq ft",
      image: "/api/placeholder/300/200"
    },
    {
      id: "3",
      name: "Sunrise Towers",
      location: "Bhawarkuan, Indore",
      status: "Planned",
      units: 150,
      completionDate: "2025-06-30",
      rating: 0,
      priceRange: "₹3,800-4,500/sq ft",
      image: "/api/placeholder/300/200"
    }
  ];

  const mockReviews: Review[] = [
    {
      id: "1",
      user: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality construction and timely delivery. Highly recommended!",
      date: "2023-09-15",
      project: "Green Valley Apartments",
      verified: true
    },
    {
      id: "2",
      user: "Priya Sharma",
      rating: 4,
      comment: "Good project with nice amenities. Some minor issues with water supply.",
      date: "2023-08-20",
      project: "Green Valley Apartments",
      verified: true
    },
    {
      id: "3",
      user: "Amit Patel",
      rating: 5,
      comment: "Professional team and quality construction. Happy with my investment.",
      date: "2023-07-10",
      project: "Royal Heights",
      verified: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Under Construction': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Planned': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLegalStatusColor = (status: string) => {
    switch (status) {
      case 'Clean': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Issues': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <main className="mx-auto max-w-7xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent"
          >
            Builder Profile & Verification
          </motion.h1>
          <p className="text-muted-foreground mt-1">Comprehensive builder analysis and project history</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Verified
          </Badge>
          <LottiePlayer src={successAnimation} />
        </div>
      </div>

      {/* Builder Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search builder name or RERA number..."
                value={selectedBuilder}
                onChange={(e) => setSelectedBuilder(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Builder Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Builder Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Builder Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{mockBuilderProfile.name}</h2>
                    <p className="text-muted-foreground">Established in {mockBuilderProfile.establishedYear}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">RERA: {mockBuilderProfile.reraNumber}</Badge>
                      <Badge className={getLegalStatusColor(mockBuilderProfile.legalStatus)}>
                        {mockBuilderProfile.legalStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockBuilderProfile.totalProjects}</div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockBuilderProfile.completedProjects}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockBuilderProfile.underConstruction}</div>
                    <div className="text-sm text-muted-foreground">Under Construction</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{mockBuilderProfile.plannedProjects}</div>
                    <div className="text-sm text-muted-foreground">Planned</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockBuilderProfile.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{mockBuilderProfile.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{mockBuilderProfile.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{mockBuilderProfile.contact.website}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{mockBuilderProfile.contact.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Analysis */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{mockBuilderProfile.riskScore}/100</div>
                  <Badge className={`${getRiskColor(mockBuilderProfile.riskLevel)} mt-2`}>
                    {mockBuilderProfile.riskLevel} RISK
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Legal Status</span>
                    <Badge variant="secondary" className={getLegalStatusColor(mockBuilderProfile.legalStatus)}>
                      {mockBuilderProfile.legalStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">RERA Registration</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Project Delivery</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Ratings & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{mockBuilderProfile.averageRating}/5</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= Math.floor(mockBuilderProfile.averageRating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {mockBuilderProfile.totalReviews} reviews
                  </p>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-8">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-yellow-400 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm w-8">{Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-t-lg flex items-center justify-center">
                      <Building className="h-16 w-16 text-primary/50" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Units:</span>
                          <span className="font-medium">{project.units}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">{project.priceRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion:</span>
                          <span className="font-medium">{project.completionDate}</span>
                        </div>
                        {project.rating > 0 && (
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{project.rating}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {mockReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.user}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${
                                  star <= review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.project}</span>
                        </div>
                        <p className="text-sm mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Projects</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '72%' }} />
                      </div>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Under Construction</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '20%' }} />
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Planned Projects</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-orange-500 rounded-full" style={{ width: '8%' }} />
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-time Delivery</span>
                    <Badge variant="secondary">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Badge variant="secondary">4.3/5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quality Rating</span>
                    <Badge variant="secondary">4.2/5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Legal Compliance</span>
                    <Badge variant="secondary">100%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Contact Builder
        </Button>
      </div>
    </main>
  );
}

