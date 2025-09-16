"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import AIRecommendationAssistant from "@/components/AIRecommendationAssistant";
import FloatingRatingWidget from "@/components/FloatingRatingWidget";
import TierStatusCard from "@/components/TierStatusCard";
import TierSelectionModal from "@/components/TierSelectionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { Search, Filter, MapPin, Heart, Share2, Eye, Star, TrendingUp, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { TrustTier } from "@/components/TrustTierSystem";
import { TierLevel } from "@/lib/tier-system";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function BuyerHome() {
  const { t } = useLanguage();
  
  const listings = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: ["2BHK Flat in Vijay Nagar", "3BHK Villa in Bhopal", "1BHK Apartment in Indore", "4BHK Penthouse in Gwalior"][i % 4],
    price: ["₹35,00,000", "₹85,00,000", "₹25,00,000", "₹1,25,00,000"][i % 4],
    location: ["Indore", "Bhopal", "Indore", "Gwalior"][i % 4],
    badges: ["Verified", i % 2 === 0 ? "New" : "", i % 3 === 0 ? "AI Recommended" : ""].filter(Boolean) as string[],
    images: i + 1,
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 50) + 10,
    rating: (4 + Math.random()).toFixed(1),
    isLiked: i % 3 === 0,
    isAIRecommended: i % 3 === 0,
    trustTier: i % 4 === 0 ? 'PREMIUM' : i % 3 === 0 ? 'TRUSTED' : i % 2 === 0 ? 'VERIFIED' : 'UNVERIFIED',
    isAIEnhanced: i % 3 === 0,
    hasDuplicateCheck: i % 2 === 0,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);
  
  // Mock user tier data
  const [userTier, setUserTier] = useState<TierLevel>('SILVER');
  const [tierStartDate] = useState(new Date());
  const [tierEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 pb-24">
      {/* Header with AI Insights */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            {t('home')}
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered property recommendations for you</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Active
          </Badge>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Tier Status Card */}
      <div className="mb-6">
        <TierStatusCard
          tier={userTier}
          userType="buyer"
          startDate={tierStartDate}
          endDate={tierEndDate}
          onUpgrade={() => setShowTierModal(true)}
          onViewDetails={() => setShowTierModal(true)}
        />
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties, locations, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/30"
          >
            <div>
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2 mt-1">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Property Type</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Bedrooms</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Any</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <div className="flex gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground mt-2" />
                <Input placeholder="City or Area" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI Market Insights</h3>
            <p className="text-sm text-muted-foreground">
              Properties in your area have seen a 12% increase in value this month. 
              <span className="text-primary font-medium"> 3 new matches</span> found based on your preferences.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Map View Toggle */}
      <div className="mb-8">
        <MapView />
      </div>

      {/* Featured Properties Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Properties</h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            Top Rated
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.slice(0, 2).map((listing, index) => (
            <motion.div
              key={`featured-${listing.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative">
                <Card
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  badges={[...listing.badges, "Featured"]}
                  trustTier={listing.trustTier}
                  isAIEnhanced={listing.isAIEnhanced}
                  hasDuplicateCheck={listing.hasDuplicateCheck}
                  views={listing.views}
                  likes={listing.likes}
                  rating={parseFloat(listing.rating)}
                />
                
                {/* Featured Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feed-style Property Listings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Powered by AI
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.slice(2).map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative">
                <Card
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  badges={listing.badges}
                  trustTier={listing.trustTier}
                  isAIEnhanced={listing.isAIEnhanced}
                  hasDuplicateCheck={listing.hasDuplicateCheck}
                  views={listing.views}
                  likes={listing.likes}
                  rating={parseFloat(listing.rating)}
                />
                
                {/* Enhanced Property Card Overlay */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {listing.isAIRecommended && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI Pick
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className={`h-4 w-4 ${listing.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                {/* Property Stats */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                      <Eye className="h-3 w-3" />
                      {listing.views}
                    </div>
                    <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {listing.rating}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="px-8">
            Load More Properties
          </Button>
        </div>
      </div>
      
      </main>
      
      {/* Floating Widgets */}
      <div className="fixed bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-end gap-4 pointer-events-none z-50">
        {/* Rating Widget */}
        <div className="pointer-events-auto order-2 sm:order-1">
          <FloatingRatingWidget />
        </div>
        
        {/* AI Assistant */}
        <div className="pointer-events-auto order-1 sm:order-2">
          <AIRecommendationAssistant />
        </div>
      </div>

      {/* Tier Selection Modal */}
      <TierSelectionModal
        isOpen={showTierModal}
        onClose={() => setShowTierModal(false)}
        userType="buyer"
        onTierSelect={(tier) => setUserTier(tier)}
        currentTier={userTier}
      />
    </div>
  );
}


