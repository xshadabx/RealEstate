"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Search, 
  MapPin, 
  Home, 
  Car,
  Heart,
  MessageSquare,
  Calendar,
  Star,
  X,
  TrendingUp
} from "lucide-react";
import { recommendationEngine, type UserPreferences, type RecommendationScore } from "@/lib/recommendation-engine";
import { virtualAgent } from "@/lib/ai-agent";

// Remove duplicate interfaces since they're now imported from the engine

export default function AIRecommendationAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', message: string, data?: unknown}>>([]);
  const [currentMode, setCurrentMode] = useState<'property' | 'loan' | 'fraud' | 'general'>('general');
  const [userPreferences] = useState<Partial<UserPreferences>>({
    budget: { min: 0, max: 100000000 },
    location: [],
    propertyType: [],
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    features: [],
    lifestyle: []
  });

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setConversation(prev => [...prev, { type: 'user', message: userMessage }]);
    setUserInput("");
    setIsLoading(true);

    // Use the virtual agent for comprehensive responses
    setTimeout(() => {
      const agentResponse = virtualAgent.processMessage(userMessage, { userPreferences });
      setConversation(prev => [...prev, { 
        type: 'ai', 
        message: agentResponse.message,
        data: agentResponse.data 
      }]);
      
      // Handle different response types
      if (agentResponse.type === 'loan_calculation' && agentResponse.data) {
        setCurrentMode('loan');
      } else if (agentResponse.type === 'fraud_analysis') {
        setCurrentMode('fraud');
      } else if (agentResponse.type === 'property_info') {
        setCurrentMode('property');
        // Also get property recommendations if it's a property query
        const propertyRecommendations = recommendationEngine.getRecommendations(userMessage, userPreferences);
        if (propertyRecommendations.length > 0) {
          setRecommendations(propertyRecommendations);
        }
      } else {
        setCurrentMode('general');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Enhanced quick questions for the virtual agent

  const quickQuestions = [
    "Calculate EMI for ₹50L loan at 8.5% for 20 years",
    "I need a 2 BHK apartment under ₹60L near metro",
    "Is this property listing genuine?",
    "What is carpet area vs built-up area?",
    "Show me 3 BHK villas with garden and pool",
    "Check my loan eligibility with ₹1L monthly income"
  ];

  return (
    <>
      {/* Floating AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 floating-widget"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Ai.Sha</h2>
                    <p className="text-sm text-muted-foreground">Your Intelligent Real Estate Companion - 24/7 Property, Loan & Fraud Detection Assistant</p>
                    {currentMode !== 'general' && (
                      <div className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {currentMode === 'property' && '🏠 Property Search'}
                          {currentMode === 'loan' && '💰 Loan Calculator'}
                          {currentMode === 'fraud' && '🔍 Fraud Detection'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Chat Interface */}
                <div className="flex-1 flex flex-col">
                  {/* Conversation */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversation.length === 0 && (
                      <div className="text-center text-muted-foreground">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Hi! I&apos;m <strong>Ai.Sha</strong>, your intelligent real estate companion. I can help with properties, loans, and fraud detection!</p>
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">Try asking:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {quickQuestions.map((question, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs text-left justify-start h-auto p-2"
                                onClick={() => setUserInput(question)}
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {conversation.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Describe what you're looking for..."
                        onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                        disabled={isLoading}
                      />
                      <Button onClick={handleUserInput} disabled={isLoading || !userInput.trim()}>
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Recommendations Sidebar */}
                {recommendations.length > 0 && (
                  <div className="w-96 border-l overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Recommended Properties
                      </h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {recommendations.map((recommendation) => (
                        <Card key={recommendation.property.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between mb-2">
                              <div className="h-24 bg-muted rounded-md flex-1 mr-2" />
                              <div className="flex flex-col items-center">
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                                  {Math.round(recommendation.matchPercentage)}% Match
                                </div>
                                <div className="flex items-center mt-1">
                                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                  <span className="text-xs text-green-600 font-medium">
                                    Score: {Math.round(recommendation.score)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <CardTitle className="text-sm">{recommendation.property.title}</CardTitle>
                            <p className="text-lg font-bold text-primary">{recommendation.property.price}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {recommendation.property.location}
                            </p>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex gap-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                <Home className="h-3 w-3 mr-1" />
                                {recommendation.property.bedrooms} BHK
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Car className="h-3 w-3 mr-1" />
                                {recommendation.property.parking} Parking
                              </Badge>
                            </div>
                            
                            {/* Match Reasons */}
                            <div className="space-y-1 mb-3">
                              {recommendation.reasons.slice(0, 2).map((reason, index) => (
                                <p key={index} className="text-xs text-green-600 flex items-center">
                                  <Star className="h-3 w-3 mr-1" />
                                  {reason}
                                </p>
                              ))}
                            </div>
                            
                            <p className="text-xs bg-primary/10 p-2 rounded text-primary font-medium">
                              💡 {recommendation.property.whyMatch}
                            </p>
                            <div className="flex gap-1 mt-3">
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                <Heart className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Contact
                              </Button>
                              <Button size="sm" className="flex-1 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Visit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
