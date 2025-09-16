"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  X, 
  TrendingUp,
  Users,
  Award,
  CheckCircle
} from "lucide-react";

export default function FloatingRatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const recentRatings = [
    { id: 1, property: "3BHK Villa in Bhopal", rating: 5, comment: "Excellent property!" },
    { id: 2, property: "2BHK Flat in Indore", rating: 4, comment: "Good location" },
    { id: 3, property: "1BHK Apartment", rating: 5, comment: "Great value for money" },
  ];

  const stats = {
    totalRatings: 1247,
    averageRating: 4.6,
    positiveReviews: 89,
    verifiedReviews: 95
  };

  return (
    <>
      {/* Floating Rating Widget Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 floating-widget"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Star className="h-6 w-6" />
      </motion.button>

      {/* Rating Widget Modal */}
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
              className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Property Ratings & Reviews</h2>
                    <p className="text-sm text-muted-foreground">Share your experience and read reviews</p>
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

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Overall Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Overall Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-yellow-500">
                        {stats.averageRating}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= stats.averageRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on {stats.totalRatings} reviews
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{stats.positiveReviews}%</div>
                        <div className="text-xs text-green-600">Positive</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{stats.verifiedReviews}%</div>
                        <div className="text-xs text-blue-600">Verified</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{stats.totalRatings}</div>
                        <div className="text-xs text-purple-600">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rate Property */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-primary" />
                      Rate a Property
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Property</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Choose a property to rate...</option>
                        <option>3BHK Villa in Bhopal</option>
                        <option>2BHK Flat in Indore</option>
                        <option>1BHK Apartment</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => handleRatingHover(star)}
                            onMouseLeave={handleRatingLeave}
                            className="transition-colors"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                star <= (hoveredRating || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Review (Optional)</label>
                      <textarea
                        placeholder="Share your experience..."
                        className="w-full p-3 border rounded-md h-20 resize-none"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Star className="h-4 w-4 mr-2" />
                      Submit Rating
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      Recent Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentRatings.map((review) => (
                      <div key={review.id} className="border-l-4 border-primary/20 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <p className="font-medium text-sm">{review.property}</p>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      View All Reviews
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
