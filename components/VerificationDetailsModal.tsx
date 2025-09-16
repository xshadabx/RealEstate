"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { 
  X, 
  Shield, 
  CheckCircle, 
  Award, 
  Star, 
  Building, 
  User,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Heart,
  MessageSquare,
  BarChart3,
  Sparkles,
  Lock,
  CreditCard,
  DollarSign,
  Zap
} from "lucide-react";
import { TrustTier, TRUST_TIERS, VerificationDetails } from "./TrustTierSystem";

interface VerificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustTier: TrustTier;
  verificationDetails: VerificationDetails;
  onUpgrade?: (tier: TrustTier) => void;
  showSecureDeposit?: boolean;
}

export default function VerificationDetailsModal({
  isOpen,
  onClose,
  trustTier,
  verificationDetails,
  onUpgrade,
  showSecureDeposit = false
}: VerificationDetailsModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const tierInfo = TRUST_TIERS[trustTier];
  const TierIcon = tierInfo.icon;

  const getNextTier = (): TrustTier | null => {
    const tiers: TrustTier[] = ['UNVERIFIED', 'VERIFIED', 'PREMIUM', 'TRUSTED'];
    const currentIndex = tiers.indexOf(trustTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const nextTier = getNextTier();
  const nextTierInfo = nextTier ? TRUST_TIERS[nextTier] : null;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${tierInfo.bgColor} flex items-center justify-center`}>
                <TierIcon className={`h-6 w-6 ${tierInfo.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tierInfo.name}</h2>
                <p className="text-muted-foreground">{tierInfo.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview" className="space-y-6">
                {/* Trust Score Overview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Trust Score</h3>
                        <p className="text-sm text-muted-foreground">Your overall trustworthiness rating</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{tierInfo.trustScore}/100</div>
                        <div className="text-sm text-muted-foreground">Current Score</div>
                      </div>
                    </div>
                    <Progress value={tierInfo.trustScore} className="w-full" />
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">+{tierInfo.visibilityBoost}%</div>
                      <div className="text-sm text-muted-foreground">Visibility Boost</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{verificationDetails.listingCount}</div>
                      <div className="text-sm text-muted-foreground">Active Listings</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">{verificationDetails.avgRating.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                        <MessageSquare className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{verificationDetails.responseRate}%</div>
                      <div className="text-sm text-muted-foreground">Response Rate</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Trust Score Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Trust Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">KYC Verification</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${verificationDetails.kycStatus === 'VERIFIED' ? 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">
                            {verificationDetails.kycStatus === 'VERIFIED' ? 30 : 0}/30
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">RERA Certification</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{ width: `${verificationDetails.reraStatus === 'VERIFIED' ? 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">
                            {verificationDetails.reraStatus === 'VERIFIED' ? 25 : 0}/25
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Document Verification</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-purple-500 rounded-full" 
                              style={{ width: `${(verificationDetails.documentsVerified / verificationDetails.totalDocuments) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">
                            {verificationDetails.documentsVerified}/{verificationDetails.totalDocuments}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Platform Activity</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-orange-500 rounded-full" 
                              style={{ width: `${Math.min(verificationDetails.listingCount * 10, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">
                            {Math.min(verificationDetails.listingCount * 10, 100)}/100
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Customer Rating</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-500 rounded-full" 
                              style={{ width: `${verificationDetails.avgRating * 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">
                            {verificationDetails.avgRating.toFixed(1)}/5.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification" className="space-y-6">
                {/* Verification Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">KYC Verification</p>
                              <p className="text-sm text-muted-foreground">Identity verification</p>
                            </div>
                          </div>
                          <Badge className={
                            verificationDetails.kycStatus === 'VERIFIED' ? 'text-green-600 bg-green-50 border-green-200' :
                            verificationDetails.kycStatus === 'PENDING' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                            'text-gray-600 bg-gray-50 border-gray-200'
                          }>
                            {verificationDetails.kycStatus}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">RERA Certification</p>
                              <p className="text-sm text-muted-foreground">Project registration</p>
                            </div>
                          </div>
                          <Badge className={
                            verificationDetails.reraStatus === 'VERIFIED' ? 'text-green-600 bg-green-50 border-green-200' :
                            verificationDetails.reraStatus === 'PENDING' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                            'text-gray-600 bg-gray-50 border-gray-200'
                          }>
                            {verificationDetails.reraStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Verified On</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{verificationDetails.verificationDate}</p>
                        </div>

                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Expires On</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{verificationDetails.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Document Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Documents Verified</span>
                        <span className="text-sm font-medium">
                          {verificationDetails.documentsVerified}/{verificationDetails.totalDocuments}
                        </span>
                      </div>
                      <Progress 
                        value={(verificationDetails.documentsVerified / verificationDetails.totalDocuments) * 100} 
                        className="w-full" 
                      />
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>ID Proof</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Address Proof</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>PAN Card</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>RERA Certificate</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-6">
                {/* Current Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Your Current Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tierInfo.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Performance Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-green-900">Visibility Boost</h4>
                            <p className="text-sm text-green-700">
                              Your listings appear {tierInfo.visibilityBoost}% higher in search results
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-blue-900">Trust Score</h4>
                            <p className="text-sm text-blue-700">
                              Your {tierInfo.trustScore}/100 trust score builds buyer confidence
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-purple-900">Verified Badge</h4>
                            <p className="text-sm text-purple-700">
                              Your {tierInfo.badgeText} badge is displayed on all listings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upgrade" className="space-y-6">
                {nextTierInfo ? (
                  <>
                    {/* Upgrade Offer */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Upgrade to {nextTierInfo.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-4">
                            <div className={`w-16 h-16 rounded-full ${nextTierInfo.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <nextTierInfo.icon className={`h-8 w-8 ${nextTierInfo.color}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-blue-900 mb-2">{nextTierInfo.name}</h3>
                              <p className="text-blue-700 mb-4">{nextTierInfo.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="text-green-600">+{nextTierInfo.visibilityBoost}% visibility</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-600" />
                                  <span className="text-yellow-600">{nextTierInfo.trustScore}/100 trust score</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Requirements */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Requirements to Upgrade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {nextTierInfo.requirements.map((requirement: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-primary">{index + 1}</span>
                              </div>
                              <span className="text-sm">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* New Benefits */}
                    <Card>
                      <CardHeader>
                        <CardTitle>New Benefits You'll Get</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {nextTierInfo.benefits.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upgrade Button */}
                    <div className="text-center">
                      <Button 
                        onClick={() => onUpgrade?.(nextTier)}
                        size="lg"
                        className="w-full max-w-md"
                        disabled={!nextTierInfo.isFree}
                      >
                        {nextTierInfo.isFree ? (
                          <>
                            <Award className="h-5 w-5 mr-2" />
                            Upgrade to {nextTierInfo.name} (Free)
                          </>
                        ) : (
                          <>
                            <Lock className="h-5 w-5 mr-2" />
                            Premium Feature (Coming Soon)
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600 mb-2">Maximum Trust Level Achieved!</h3>
                      <p className="text-muted-foreground">
                        You've reached the highest trust tier available. Keep up the great work!
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Secure Deposit (Future Feature) */}
                {showSecureDeposit && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Secure Deposit (Coming Soon)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-900">Secure Payment Protection</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              Coming soon: Secure deposit system to protect both buyers and sellers during transactions.
                            </p>
                            <Button variant="outline" size="sm" className="mt-2" disabled>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Enable Secure Deposits (Coming Soon)
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

