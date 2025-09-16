"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import { 
  X, 
  Upload, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  CreditCard,
  Camera,
  Eye,
  Download,
  Sparkles,
  Clock,
  Award,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import { loadingSpinner, successAnimation } from "@/lib/lottie-animations";
import Dropzone from "@/components/Dropzone";

interface KYCData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idType: string;
  idNumber: string;
  dateOfBirth: string;
  occupation: string;
  annualIncome: string;
}

interface VerificationStatus {
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW';
  reraStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'UNDER_REVIEW';
  overallStatus: 'UNVERIFIED' | 'KYC_VERIFIED' | 'RERA_CERTIFIED' | 'FULLY_VERIFIED';
  progress: number;
  documents: {
    idProof: File | null;
    addressProof: File | null;
    reraCertificate: File | null;
    panCard: File | null;
  };
  verificationDate: string;
  expiryDate: string;
}

interface KYCVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: (status: VerificationStatus) => void;
  userType: 'buyer' | 'seller';
}

export default function KYCVerificationModal({ 
  isOpen, 
  onClose, 
  onVerificationComplete, 
  userType 
}: KYCVerificationModalProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKYCData] = useState<KYCData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    idType: "",
    idNumber: "",
    dateOfBirth: "",
    occupation: "",
    annualIncome: ""
  });
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    kycStatus: 'PENDING',
    reraStatus: 'PENDING',
    overallStatus: 'UNVERIFIED',
    progress: 0,
    documents: {
      idProof: null,
      addressProof: null,
      reraCertificate: null,
      panCard: null
    },
    verificationDate: "",
    expiryDate: ""
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic details" },
    { id: 2, title: "Document Upload", description: "ID and address proof" },
    { id: 3, title: "RERA Verification", description: "Project registration" },
    { id: 4, title: "Verification", description: "AI validation" },
    { id: 5, title: "Complete", description: "Verification status" }
  ];

  const idTypes = [
    "Aadhaar Card",
    "PAN Card", 
    "Passport",
    "Driving License",
    "Voter ID",
    "Other Government ID"
  ];

  const states = [
    "Madhya Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", 
    "Gujarat", "Rajasthan", "Uttar Pradesh", "Delhi", "Other"
  ];

  const handleDocumentUpload = (type: keyof VerificationStatus['documents'], files: File[]) => {
    setVerificationStatus(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: files[0] || null
      }
    }));
  };

  const simulateVerification = async () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    
    // Simulate verification progress
    const progressInterval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newStatus: VerificationStatus = {
        kycStatus: 'VERIFIED',
        reraStatus: userType === 'seller' ? 'VERIFIED' : 'PENDING',
        overallStatus: userType === 'seller' ? 'RERA_CERTIFIED' : 'KYC_VERIFIED',
        progress: 100,
        documents: verificationStatus.documents,
        verificationDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      setVerificationStatus(newStatus);
      setCurrentStep(5);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
      clearInterval(progressInterval);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'text-green-600 bg-green-50 border-green-200';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'REJECTED': return 'text-red-600 bg-red-50 border-red-200';
      case 'UNDER_REVIEW': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED': return 'text-green-600 bg-green-50 border-green-200';
      case 'RERA_CERTIFIED': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'KYC_VERIFIED': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'UNVERIFIED': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

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
            <div>
              <h2 className="text-2xl font-bold">KYC Verification</h2>
              <p className="text-muted-foreground">
                Complete verification to {userType === 'seller' ? 'list properties' : 'access premium features'}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="p-6 border-b">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verification Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round((currentStep / steps.length) * 100)}%</span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="w-full" />
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      currentStep >= step.id 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      {currentStep > step.id ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-3 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          placeholder="Enter your full name"
                          value={kycData.fullName}
                          onChange={(e) => setKYCData(prev => ({ ...prev, fullName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={kycData.email}
                          onChange={(e) => setKYCData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          placeholder="+91 98765 43210"
                          value={kycData.phone}
                          onChange={(e) => setKYCData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={kycData.dateOfBirth}
                          onChange={(e) => setKYCData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>ID Type</Label>
                        <Select value={kycData.idType} onValueChange={(value: string) => setKYCData(prev => ({ ...prev, idType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            {idTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>ID Number</Label>
                        <Input
                          placeholder="Enter ID number"
                          value={kycData.idNumber}
                          onChange={(e) => setKYCData(prev => ({ ...prev, idNumber: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Address</Label>
                      <Input
                        placeholder="Enter your complete address"
                        value={kycData.address}
                        onChange={(e) => setKYCData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input
                          placeholder="City"
                          value={kycData.city}
                          onChange={(e) => setKYCData(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Select value={kycData.state} onValueChange={(value: string) => setKYCData(prev => ({ ...prev, state: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Pincode</Label>
                        <Input
                          placeholder="123456"
                          value={kycData.pincode}
                          onChange={(e) => setKYCData(prev => ({ ...prev, pincode: e.target.value }))}
                        />
                      </div>
                    </div>

                    {userType === 'seller' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Occupation</Label>
                          <Input
                            placeholder="Your occupation"
                            value={kycData.occupation}
                            onChange={(e) => setKYCData(prev => ({ ...prev, occupation: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Annual Income</Label>
                          <Select value={kycData.annualIncome} onValueChange={(value: string) => setKYCData(prev => ({ ...prev, annualIncome: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select income range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-5L">₹0 - ₹5 Lakhs</SelectItem>
                              <SelectItem value="5-10L">₹5 - ₹10 Lakhs</SelectItem>
                              <SelectItem value="10-25L">₹10 - ₹25 Lakhs</SelectItem>
                              <SelectItem value="25-50L">₹25 - ₹50 Lakhs</SelectItem>
                              <SelectItem value="50L+">₹50 Lakhs+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!kycData.fullName || !kycData.email || !kycData.phone || !kycData.idType}
                  className="w-full"
                >
                  Continue to Document Upload
                </Button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Document Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">ID Proof</h4>
                        <Dropzone />
                        {verificationStatus.documents.idProof && (
                          <div className="mt-2 p-2 border rounded-lg">
                            <p className="text-sm">{verificationStatus.documents.idProof.name}</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Address Proof</h4>
                        <Dropzone />
                        {verificationStatus.documents.addressProof && (
                          <div className="mt-2 p-2 border rounded-lg">
                            <p className="text-sm">{verificationStatus.documents.addressProof.name}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {userType === 'seller' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">PAN Card</h4>
                          <Dropzone />
                          {verificationStatus.documents.panCard && (
                            <div className="mt-2 p-2 border rounded-lg">
                              <p className="text-sm">{verificationStatus.documents.panCard.name}</p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">RERA Certificate</h4>
                          <Dropzone />
                          {verificationStatus.documents.reraCertificate && (
                            <div className="mt-2 p-2 border rounded-lg">
                              <p className="text-sm">{verificationStatus.documents.reraCertificate.name}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Document Security</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            All documents are encrypted and stored securely. We use bank-level security 
                            to protect your personal information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!verificationStatus.documents.idProof || !verificationStatus.documents.addressProof}
                    className="flex-1"
                  >
                    Continue to RERA Verification
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && userType === 'seller' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      RERA Project Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900">RERA Compliance</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Your RERA certificate will be verified against the official RERA database 
                            to ensure authenticity and compliance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>RERA Registration Number</Label>
                        <Input
                          placeholder="e.g., MP/01/2023/001234"
                          value={kycData.idNumber}
                          onChange={(e) => setKYCData(prev => ({ ...prev, idNumber: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label>Project Name</Label>
                        <Input
                          placeholder="Enter project name"
                          value={kycData.occupation}
                          onChange={(e) => setKYCData(prev => ({ ...prev, occupation: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Important Note</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Only RERA-registered projects can be listed on our platform. 
                            This ensures buyer protection and legal compliance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    disabled={!kycData.idNumber || !kycData.occupation}
                    className="flex-1"
                  >
                    Start Verification
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 mx-auto mb-6">
                      <LottiePlayer src={loadingSpinner} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI Verification in Progress</h3>
                    <p className="text-muted-foreground mb-6">
                      Our AI is analyzing your documents and cross-referencing with official databases...
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Verification Progress</span>
                        <span>{Math.round(verificationProgress)}%</span>
                      </div>
                      <Progress value={verificationProgress} className="w-full" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span>Document Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-green-500" />
                          <span>RERA Verification</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          <span>AI Validation</span>
                        </div>
                      </div>
                    </div>

                    {!isVerifying && (
                      <Button onClick={simulateVerification} className="mt-6">
                        Start Verification
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 mx-auto mb-6">
                      <LottiePlayer src={successAnimation} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Verification Complete!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your account has been successfully verified
                    </p>

                    <div className="space-y-4">
                      <Badge className={`${getOverallStatusColor(verificationStatus.overallStatus)} text-lg px-4 py-2`}>
                        {verificationStatus.overallStatus.replace('_', ' ')}
                      </Badge>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <span className="font-semibold">KYC Status</span>
                          </div>
                          <Badge className={getStatusColor(verificationStatus.kycStatus)}>
                            {verificationStatus.kycStatus}
                          </Badge>
                        </div>
                        
                        {userType === 'seller' && (
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-5 w-5 text-green-500" />
                              <span className="font-semibold">RERA Status</span>
                            </div>
                            <Badge className={getStatusColor(verificationStatus.reraStatus)}>
                              {verificationStatus.reraStatus}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Verified on: {verificationStatus.verificationDate}</p>
                        <p>Expires on: {verificationStatus.expiryDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      onVerificationComplete(verificationStatus);
                      onClose();
                    }}
                    className="flex-1"
                  >
                    Continue to Platform
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

