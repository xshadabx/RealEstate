"use client";

import { motion } from "framer-motion";
import AIRecommendationAssistant from "@/components/AIRecommendationAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Search, 
  Star, 
  TrendingUp, 
  MessageSquare
} from "lucide-react";

export default function AIDemoPage() {
  const demoQueries = [
    {
      query: "I need a 2 BHK apartment under ₹60L near metro",
      description: "Budget-conscious search with connectivity preference"
    },
    {
      query: "Show me 3 BHK villas with garden and pool",
      description: "Family-focused search with luxury amenities"
    },
    {
      query: "Find budget-friendly 1 BHK for young professionals",
      description: "First-time buyer with specific lifestyle needs"
    },
    {
      query: "I want luxury properties in city center",
      description: "High-end search with location preference"
    }
  ];

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Natural Language Processing",
      description: "Understands complex queries in plain English"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Smart Scoring System",
      description: "Ranks properties based on match percentage and relevance"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Personalized Recommendations",
      description: "Learns from your preferences and interactions"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Conversational Interface",
      description: "Chat-like experience with intelligent responses"
    }
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Ai.Sha</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your intelligent real estate companion. Experience the future of property search with Ai.Sha - 
            your dedicated AI assistant providing personalized recommendations, loan calculations, and fraud detection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo Queries */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Try These Sample Queries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoQueries.map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">&ldquo;{demo.query}&rdquo;</p>
                        <p className="text-xs text-muted-foreground">{demo.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center space-y-3"
            >
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold">Tell Us What You Want</h3>
              <p className="text-sm text-muted-foreground">
                Describe your dream property in natural language. Our AI understands context, 
                preferences, and requirements.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-3"
            >
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold">AI Analyzes & Matches</h3>
              <p className="text-sm text-muted-foreground">
                Our intelligent engine processes your request, extracts preferences, 
                and finds the best matching properties from our database.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-3"
            >
              <div className="bg-purple-100 text-purple-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold">Get Personalized Results</h3>
              <p className="text-sm text-muted-foreground">
                Receive ranked recommendations with match percentages, 
                detailed reasons, and actionable insights.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4 bg-primary/5 p-8 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Ready to Find Your Dream Property?</h2>
          <p className="text-muted-foreground">
            Click the Ai.Sha assistant button in the bottom right corner to get started!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-4 w-4" />
            <span>Ai.Sha is available on all property pages</span>
          </div>
        </motion.div>
      </motion.div>

      {/* AI Assistant */}
      <AIRecommendationAssistant />
    </main>
  );
}
