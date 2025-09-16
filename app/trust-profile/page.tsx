"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Star, 
  Building, 
  User,
  Clock,
  TrendingUp,
  Heart,
  MessageSquare,
  Calendar,
  BarChart3,
  Sparkles,
  Eye,
  Download,
  Share2,
  Settings,
  Bell,
  CreditCard,
  Lock,
  LogOut,
  AlertTriangle,
  FileText,
  HelpCircle,
  Plus,
  Send,
  Filter,
  Search
} from "lucide-react";
import { TrustBadge, TrustTier, VerificationDetails, TRUST_TIERS } from "@/components/TrustTierSystem";
// import VerificationDetailsModal from "@/components/VerificationDetailsModal";

export default function TrustProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [currentTier, setCurrentTier] = useState<TrustTier>('VERIFIED');
  
  // New state for complaints and FAQ
  const [complaintForm, setComplaintForm] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  });
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('all');

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userType');
    // Redirect to login page
    router.push('/login');
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the complaint to the backend
    console.log('Complaint submitted:', complaintForm);
    alert('Complaint submitted successfully! We will review it within 24 hours.');
    setComplaintForm({ subject: '', category: '', description: '', priority: 'medium' });
  };

  const mockVerificationDetails: VerificationDetails = {
    kycStatus: 'VERIFIED',
    reraStatus: 'VERIFIED',
    verificationDate: '2024-01-15',
    expiryDate: '2025-01-15',
    documentsVerified: 4,
    totalDocuments: 4,
    trustScore: 85,
    listingCount: 12,
    responseRate: 95,
    avgRating: 4.7
  };

  const mockListings = [
    {
      id: 1,
      title: "2BHK Flat in Vijay Nagar",
      price: "₹35,00,000",
      location: "Indore",
      status: "Active",
      views: 1250,
      inquiries: 45,
      trustTier: 'VERIFIED' as TrustTier
    },
    {
      id: 2,
      title: "3BHK Villa in Bhopal",
      price: "₹85,00,000",
      location: "Bhopal",
      status: "Active",
      views: 2100,
      inquiries: 78,
      trustTier: 'VERIFIED' as TrustTier
    },
    {
      id: 3,
      title: "1BHK Apartment in Indore",
      price: "₹25,00,000",
      location: "Indore",
      status: "Sold",
      views: 890,
      inquiries: 32,
      trustTier: 'VERIFIED' as TrustTier
    }
  ];

  // Get user type to show relevant content
  const [userType, setUserType] = useState<string>('buyer');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserType = localStorage.getItem('userType');
      setUserType(storedUserType || 'buyer');
    }
  }, []);

  // Complaint categories
  const complaintCategories = [
    { value: 'property', label: 'Property Related', icon: Building },
    { value: 'payment', label: 'Payment Issues', icon: CreditCard },
    { value: 'seller', label: 'Seller Behavior', icon: User },
    { value: 'buyer', label: 'Buyer Behavior', icon: User },
    { value: 'technical', label: 'Technical Issues', icon: Settings },
    { value: 'fraud', label: 'Fraud/Suspicious Activity', icon: AlertTriangle },
    { value: 'other', label: 'Other', icon: FileText }
  ];

  // FAQ data - separate for buyers and sellers
  const buyerFAQs = [
    {
      id: 1,
      category: 'property',
      question: 'How do I verify if a property listing is genuine?',
      answer: 'Look for verified badges, check seller credentials, verify property documents, and use our AI fraud detection system. Always visit the property in person before making any payments.'
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept bank transfers, UPI, credit/debit cards, and cheques. For large amounts, we recommend using our secure escrow service to protect your investment.'
    },
    {
      id: 3,
      category: 'property',
      question: 'What documents should I check before buying?',
      answer: 'Essential documents include: Sale Deed, Property Tax Receipts, Encumbrance Certificate, Building Plan Approval, NOC from Society, and RERA Registration if applicable.'
    },
    {
      id: 4,
      category: 'payment',
      question: 'How is EMI calculated for home loans?',
      answer: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P=Principal, R=Monthly Interest Rate, N=Loan Tenure in months. Use our loan calculator for accurate estimates.'
    },
    {
      id: 5,
      category: 'property',
      question: 'What is the difference between carpet area and built-up area?',
      answer: 'Carpet area is the actual usable floor area within walls. Built-up area includes carpet area + walls + balconies. Super built-up area includes common areas and amenities.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'How do I save properties to my favorites?',
      answer: 'Click the heart icon on any property card to add it to your favorites. You can view all saved properties in your profile under "Saved Properties".'
    }
  ];

  const sellerFAQs = [
    {
      id: 1,
      category: 'property',
      question: 'How do I create an effective property listing?',
      answer: 'Use high-quality photos, write detailed descriptions, include all amenities, set competitive pricing, and ensure all documents are verified. Our AI can help optimize your listing for better visibility.'
    },
    {
      id: 2,
      category: 'payment',
      question: 'When do I receive payment from buyers?',
      answer: 'Payment is typically released after successful property transfer and document verification. We use secure escrow services to protect both parties during the transaction.'
    },
    {
      id: 3,
      category: 'property',
      question: 'What documents do I need to list my property?',
      answer: 'Required documents include: Property Deed, Property Tax Receipts, Building Plan, NOC from Society, and any relevant approvals. RERA registration is mandatory for new projects.'
    },
    {
      id: 4,
      category: 'seller',
      question: 'How can I improve my property visibility?',
      answer: 'Complete your profile verification, use professional photos, respond quickly to inquiries, maintain good ratings, and consider our premium listing options for better visibility.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'What are the platform fees for sellers?',
      answer: 'We charge a small commission only after successful sale completion. Basic listing is free, with optional premium features available for enhanced visibility.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'How do I manage inquiries from buyers?',
      answer: 'Use our built-in messaging system to communicate with buyers. Set up auto-replies for common questions and respond promptly to maintain good response rates.'
    }
  ];

  const currentFAQs = userType === 'seller' ? sellerFAQs : buyerFAQs;

  const filteredFAQs = currentFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpgrade = (tier: TrustTier) => {
    setCurrentTier(tier);
    // In a real app, this would trigger the upgrade process
    console.log(`Upgrading to ${tier}`);
  };

  return (
    <main className="mx-auto max-w-6xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
          >
            Trust Profile
          </motion.h1>
          <p className="text-muted-foreground mt-1">Your trustworthiness and verification status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Trust Tier Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Trust Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Trust Level</h3>
              <p className="text-sm text-muted-foreground">Your verification status</p>
            </div>
            <Badge variant="secondary">Trust Level: {currentTier}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">85%</p>
              <p className="text-sm text-muted-foreground">Trust Score</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-sm text-muted-foreground">Verified Documents</p>
            </div>
          </div>
          <Button onClick={() => handleUpgrade('PREMIUM')} className="w-full">
            Upgrade Trust Level
          </Button>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Personal Profile</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Trust Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                    <p className="text-2xl font-bold">{mockVerificationDetails.listingCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Trust Score</p>
                    <p className="text-2xl font-bold">{mockVerificationDetails.trustScore}/100</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">{mockVerificationDetails.avgRating.toFixed(1)}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">{mockVerificationDetails.responseRate}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">john.doe@example.com</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm font-medium">January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm font-medium">Mumbai, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User Type</span>
                    <Badge variant="secondary">Buyer</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
                <div className="border-t pt-4">
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Property inquiry sent</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Message received from seller</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Property added to favorites</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="listings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Listings</h2>
            <Button>
              <Building className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">{listing.location}</p>
                      </div>
                      <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                    
                    <div className="text-lg font-bold text-primary mb-3">{listing.price}</div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span>{listing.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span>{listing.inquiries} inquiries</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Trust Impact Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Visibility Boost Impact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Search Ranking</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Featured Placement</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }} />
                        </div>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Click-through Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '60%' }} />
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Trust Score Benefits</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">40% Higher Visibility</span>
                      </div>
                      <p className="text-xs text-green-700">Your listings appear higher in search results</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Enhanced Trust</span>
                      </div>
                      <p className="text-xs text-blue-700">Buyers trust your listings more</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Premium Badge</span>
                      </div>
                      <p className="text-xs text-purple-700">Your verified badge builds credibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Trust Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Trust Badge</h4>
                    <p className="text-sm text-muted-foreground">Display your trust badge on all listings</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Verification Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified about verification updates</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Secure Deposits</h4>
                    <p className="text-sm text-muted-foreground">Enable secure payment protection (Coming Soon)</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submit Complaint Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Submit a Complaint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleComplaintSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="Brief description of your complaint"
                      value={complaintForm.subject}
                      onChange={(e) => setComplaintForm({...complaintForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                      required
                    >
                      <option value="">Select a category</option>
                      {complaintCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={complaintForm.priority}
                      onChange={(e) => setComplaintForm({...complaintForm, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md h-32 resize-none"
                      placeholder="Please provide detailed information about your complaint..."
                      value={complaintForm.description}
                      onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Complaints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Complaints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Property listing issue</h4>
                      <Badge variant="secondary">In Review</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted 2 days ago</p>
                    <p className="text-xs text-muted-foreground mt-1">Category: Property Related</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Payment processing delay</h4>
                      <Badge variant="default">Resolved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Resolved 1 week ago</p>
                    <p className="text-xs text-muted-foreground mt-1">Category: Payment Issues</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Technical support needed</h4>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Submitted 5 days ago</p>
                    <p className="text-xs text-muted-foreground mt-1">Category: Technical Issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          {/* FAQ Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-1">
                {userType === 'seller' ? 'Seller' : 'Buyer'} specific questions and answers
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              {currentFAQs.length} Questions
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              className="p-2 border rounded-md"
              value={selectedFaqCategory}
              onChange={(e) => setSelectedFaqCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="property">Property</option>
              <option value="payment">Payment</option>
              <option value="technical">Technical</option>
              {userType === 'seller' && <option value="seller">Seller</option>}
              {userType === 'buyer' && <option value="buyer">Buyer</option>}
            </select>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <Badge variant="outline" className="capitalize">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No FAQs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Verification Details Modal - Temporarily disabled */}
    </main>
  );
}

