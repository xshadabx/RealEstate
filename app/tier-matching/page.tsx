"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TierMatchingSystem from "@/components/TierMatchingSystem";
import { TierLevel } from "@/lib/tier-system";

export default function TierMatchingPage() {
  const [buyerTier, setBuyerTier] = useState<TierLevel>('SILVER');
  const [sellerTier, setSellerTier] = useState<TierLevel>('GOLD');

  const handleTierChange = (newBuyerTier: TierLevel, newSellerTier: TierLevel) => {
    setBuyerTier(newBuyerTier);
    setSellerTier(newSellerTier);
  };

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Tier Matching System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our intelligent tier system matches buyers and sellers based on their 
            timeline, urgency, and service requirements for optimal property transactions.
          </p>
        </div>

        {/* Tier Matching System */}
        <TierMatchingSystem
          buyerTier={buyerTier}
          sellerTier={sellerTier}
          onTierChange={handleTierChange}
        />

        {/* How It Works Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-6 bg-muted/30 rounded-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Timeline Alignment</h3>
            <p className="text-muted-foreground">
              Bronze (6 months), Silver (4 months), Gold (3 months), Platinum (2 months) 
              to find the perfect property match.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-6 bg-muted/30 rounded-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Priority Matching</h3>
            <p className="text-muted-foreground">
              Higher tier buyers get matched with higher tier sellers for 
              faster, more efficient transactions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center p-6 bg-muted/30 rounded-lg"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enhanced Services</h3>
            <p className="text-muted-foreground">
              Each tier offers progressively more AI recommendations, 
              dedicated agents, and premium features.
            </p>
          </motion.div>
        </div>

        {/* Benefits Comparison */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Tier Matching Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600">For Buyers</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Faster property discovery based on urgency</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Priority access to exclusive listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Dedicated support for complex transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>AI-powered recommendations tailored to timeline</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">For Sellers</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Higher listing priority for better visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Access to serious, qualified buyers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Professional marketing and staging support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Faster closing with dedicated agents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
