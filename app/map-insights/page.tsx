"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Train, 
  Plane, 
  ShoppingBag, 
  GraduationCap, 
  Hospital, 
  TreePine,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Clock,
  DollarSign,
  Building,
  Home,
  School,
  ShoppingCart,
  Heart,
  Zap,
  CheckCircle
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for map component
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface LocationInsight {
  type: 'amenity' | 'transport' | 'education' | 'healthcare' | 'shopping';
  name: string;
  distance: number;
  rating: number;
  category: string;
  icon: any;
}

interface ZoneAnalysis {
  zone: string;
  score: number;
  factors: {
    connectivity: number;
    amenities: number;
    safety: number;
    growth: number;
    investment: number;
  };
  recommendations: string[];
}

interface AIRecommendation {
  location: string;
  score: number;
  reasons: string[];
  priceRange: string;
  growth: number;
}

export default function MapInsightsPage() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState("Indore");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [insights, setInsights] = useState<LocationInsight[]>([]);
  const [zoneAnalysis, setZoneAnalysis] = useState<ZoneAnalysis | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data for location insights
  const mockInsights: LocationInsight[] = [
    { type: 'transport', name: 'Indore Railway Station', distance: 2.5, rating: 4.2, category: 'Railway', icon: Train },
    { type: 'transport', name: 'Devi Ahilya Airport', distance: 8.0, rating: 4.5, category: 'Airport', icon: Plane },
    { type: 'education', name: 'DAVV University', distance: 3.2, rating: 4.3, category: 'University', icon: GraduationCap },
    { type: 'healthcare', name: 'Choithram Hospital', distance: 1.8, rating: 4.4, category: 'Hospital', icon: Hospital },
    { type: 'shopping', name: 'Treasure Island Mall', distance: 2.1, rating: 4.1, category: 'Shopping Mall', icon: ShoppingBag },
    { type: 'amenity', name: 'Rajwada Palace', distance: 4.5, rating: 4.6, category: 'Tourist Attraction', icon: Building },
  ];

  const mockZoneAnalysis: ZoneAnalysis = {
    zone: "Vijay Nagar",
    score: 87,
    factors: {
      connectivity: 92,
      amenities: 85,
      safety: 90,
      growth: 88,
      investment: 82
    },
    recommendations: [
      "Excellent connectivity with metro and bus routes",
      "High safety index with 24/7 security",
      "Growing commercial area with good ROI potential",
      "Well-developed infrastructure and amenities"
    ]
  };

  const mockAIRecommendations: AIRecommendation[] = [
    {
      location: "Vijay Nagar",
      score: 92,
      reasons: ["Excellent connectivity", "Growing IT hub", "Good schools nearby"],
      priceRange: "₹3,500-4,500/sq ft",
      growth: 12.5
    },
    {
      location: "Rajwada",
      score: 88,
      reasons: ["Heritage area", "Commercial hub", "Good transport links"],
      priceRange: "₹4,000-5,500/sq ft",
      growth: 10.2
    },
    {
      location: "Bhawarkuan",
      score: 85,
      reasons: ["Industrial area", "Affordable prices", "Good connectivity"],
      priceRange: "₹2,800-3,800/sq ft",
      growth: 8.7
    }
  ];

  useEffect(() => {
    setInsights(mockInsights);
    setZoneAnalysis(mockZoneAnalysis);
    setAiRecommendations(mockAIRecommendations);
  }, [selectedLocation]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'transport': return Navigation;
      case 'education': return GraduationCap;
      case 'healthcare': return Hospital;
      case 'shopping': return ShoppingBag;
      case 'amenity': return Building;
      default: return MapPin;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getFactorScore = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Below Average';
  };

  return (
    <main className="mx-auto max-w-7xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
          >
            Map Insights & Location Analysis
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered location intelligence and neighborhood insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI + GIS
          </Badge>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Location Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search location or enter coordinates..."
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96">
                <MapView />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Zone Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              {zoneAnalysis && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{zoneAnalysis.score}/100</div>
                    <Badge className={`${getScoreColor(zoneAnalysis.score)}`}>
                      {getFactorScore(zoneAnalysis.score)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connectivity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${zoneAnalysis.factors.connectivity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{zoneAnalysis.factors.connectivity}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Amenities</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${zoneAnalysis.factors.amenities}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{zoneAnalysis.factors.amenities}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Safety</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${zoneAnalysis.factors.safety}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{zoneAnalysis.factors.safety}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Growth</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-purple-500 rounded-full" 
                            style={{ width: `${zoneAnalysis.factors.growth}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{zoneAnalysis.factors.growth}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Properties</span>
                  </div>
                  <span className="font-semibold">1,247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Avg. Price</span>
                  </div>
                  <span className="font-semibold">₹3,850/sq ft</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Growth</span>
                  </div>
                  <span className="font-semibold text-green-600">+12.5%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="font-semibold">4.2/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="amenities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="amenities">Nearby Amenities</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analysis">Zone Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="amenities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{insight.name}</h4>
                          <p className="text-sm text-muted-foreground">{insight.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium">{insight.distance} km</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{insight.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="transport" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  Public Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Train className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Indore Railway Station</p>
                        <p className="text-sm text-muted-foreground">2.5 km away</p>
                      </div>
                    </div>
                    <Badge variant="secondary">15 min</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Bus Stop</p>
                        <p className="text-sm text-muted-foreground">500 m away</p>
                      </div>
                    </div>
                    <Badge variant="secondary">5 min</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Plane className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Devi Ahilya Airport</p>
                        <p className="text-sm text-muted-foreground">8.0 km away</p>
                      </div>
                    </div>
                    <Badge variant="secondary">25 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Connectivity Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">92/100</div>
                    <p className="text-sm text-muted-foreground">Excellent Connectivity</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Metro Access</span>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bus Routes</span>
                      <Badge variant="secondary">12+ Routes</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Auto/Taxi</span>
                      <Badge variant="secondary">24/7</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Parking</span>
                      <Badge variant="secondary">Good</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Location Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{rec.location}</h4>
                        <p className="text-sm text-muted-foreground">{rec.priceRange}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{rec.score}/100</div>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          +{rec.growth}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Why this location:</h5>
                      <ul className="space-y-1">
                        {rec.reasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-center gap-2 text-sm">
                            <Zap className="h-3 w-3 text-yellow-500" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Zone Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {zoneAnalysis && (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg">
                      <h3 className="text-xl font-bold">{zoneAnalysis.zone}</h3>
                      <div className="text-3xl font-bold text-primary mt-2">{zoneAnalysis.score}/100</div>
                      <Badge className={`${getScoreColor(zoneAnalysis.score)} mt-2`}>
                        {getFactorScore(zoneAnalysis.score)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Key Factors:</h4>
                      {Object.entries(zoneAnalysis.factors).map(([factor, score]) => (
                        <div key={factor} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{factor}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-primary rounded-full" 
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8">{score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {zoneAnalysis && (
                  <div className="space-y-3">
                    {zoneAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

