"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import LottiePlayer from "@/components/LottiePlayer";
import TierStatusCard from "@/components/TierStatusCard";
import TierSelectionModal from "@/components/TierSelectionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MessageSquare, 
  Heart, 
  Plus, 
  BarChart3, 
  Target, 
  DollarSign,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { TierLevel } from "@/lib/tier-system";

export default function SellerHome() {
  const { t } = useLanguage();
  
  const listings = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: ["2BHK Flat in Vijay Nagar", "3BHK Villa in Bhopal", "1BHK Apartment in Indore"][i % 3],
    price: ["₹35,00,000", "₹85,00,000", "₹25,00,000"][i % 3],
    location: ["Indore", "Bhopal", "Indore"][i % 3],
    badges: ["Active", i % 2 === 0 ? "Featured" : "", i % 3 === 0 ? "AI Optimized" : ""].filter(Boolean) as string[],
    views: Math.floor(Math.random() * 1000) + 100,
    inquiries: Math.floor(Math.random() * 50) + 5,
    likes: Math.floor(Math.random() * 30) + 10,
    status: ["Active", "Pending", "Sold"][i % 3],
    lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  }));

  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [showTierModal, setShowTierModal] = useState(false);
  
  // Mock user tier data
  const [userTier, setUserTier] = useState<TierLevel>('GOLD');
  const [tierStartDate] = useState(new Date());
  const [tierEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now

  const stats = {
    totalViews: 12450,
    totalInquiries: 89,
    conversionRate: 12.5,
    avgResponseTime: "2.3 hours",
    activeListings: 6,
    pendingListings: 2,
    soldListings: 1,
    revenue: 1250000,
    monthlyGrowth: 8.2,
  };

  const recentActivity = [
    { id: 1, type: "inquiry", message: "New inquiry for 2BHK Flat in Vijay Nagar", time: "2 hours ago", priority: "high" },
    { id: 2, type: "view", message: "Property viewed 15 times today", time: "4 hours ago", priority: "medium" },
    { id: 3, type: "ai", message: "AI suggests price optimization for Villa in Bhopal", time: "6 hours ago", priority: "low" },
    { id: 4, type: "message", message: "New message from potential buyer", time: "8 hours ago", priority: "high" },
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
          >
            Seller Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered insights and analytics for your properties</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Active
          </Badge>
        </div>
      </div>

      {/* Tier Status Card */}
      <div className="mb-6">
        <TierStatusCard
          tier={userTier}
          userType="seller"
          startDate={tierStartDate}
          endDate={tierEndDate}
          onUpgrade={() => setShowTierModal(true)}
          onViewDetails={() => setShowTierModal(true)}
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UICard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+{stats.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inquiries</p>
                <p className="text-2xl font-bold">{stats.totalInquiries}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+15%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-500">Target: 15%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">₹{(stats.revenue / 100000).toFixed(1)}L</p>
                <div className="flex items-center gap-1 mt-1">
                  <DollarSign className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">This month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </UICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI Insights */}
        <UICard className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Price Optimization</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your 3BHK Villa in Bhopal could be priced 8% higher based on market trends. 
                      <span className="font-medium"> Potential increase: ₹6.8L</span>
                    </p>
                    <Button size="sm" className="mt-2">Apply AI Pricing</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Listing Performance</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your 2BHK Flat is performing 23% better than similar listings. 
                      <span className="font-medium"> Keep current strategy!</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900">Response Time Alert</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Average response time is 2.3 hours. 
                      <span className="font-medium"> Faster responses increase conversions by 40%</span>
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">Set Auto-Reply</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </UICard>

        {/* Recent Activity */}
        <UICard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </UICard>
      </div>

      {/* Property Listings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Properties</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">View All</Button>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative">
                <Card 
                  title={listing.title} 
                  price={listing.price} 
                  location={listing.location} 
                  badges={listing.badges}
                />
                
                {/* Property Stats Overlay */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <Badge 
                    variant={listing.status === 'Active' ? 'default' : 
                             listing.status === 'Pending' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {listing.status}
                  </Badge>
                  <div className="flex gap-1">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {listing.views}
                    </div>
                  </div>
                </div>

                {/* Property Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                      <MessageSquare className="h-3 w-3" />
                      {listing.inquiries}
                    </div>
                    <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                      <Heart className="h-3 w-3" />
                      {listing.likes}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tier Selection Modal */}
      <TierSelectionModal
        isOpen={showTierModal}
        onClose={() => setShowTierModal(false)}
        userType="seller"
        onTierSelect={(tier) => setUserTier(tier)}
        currentTier={userTier}
      />
    </main>
  );
}


