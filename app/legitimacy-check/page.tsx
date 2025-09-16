"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import {
  Upload,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Scan,
  MapPin,
  Calendar,
  User,
  Building,
  Sparkles,
  Clock
} from "lucide-react";
import Dropzone from "@/components/Dropzone";

interface DocumentAnalysis {
  type: string;
  confidence: number;
  extractedData: Record<string, any>;
  issues: string[];
  recommendations: string[];
}

interface LegitimacyReport {
  overallScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  analysis: {
    documentVerification: DocumentAnalysis[];
    registryCrosscheck: {
      status: 'VERIFIED' | 'PENDING' | 'FAILED';
      details: string;
    };
    builderVerification: {
      status: 'VERIFIED' | 'PENDING' | 'FAILED';
      reraNumber: string;
      projectStatus: string;
    };
    legalCompliance: {
      status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING';
      issues: string[];
    };
  };
  recommendations: string[];
  nextSteps: string[];
}

export default function LegitimacyCheckPage() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    title: "",
    location: "",
    builder: "",
    reraNumber: "",
    description: ""
  });
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [report, setReport] = useState<LegitimacyReport | null>(null);

  const steps = [
    { id: 1, title: "Property Details", description: "Enter basic property information" },
    { id: 2, title: "Document Upload", description: "Upload property documents" },
    { id: 3, title: "AI Analysis", description: "AI-powered legitimacy check" },
    { id: 4, title: "Report", description: "View detailed analysis report" }
  ];

  const handleDocumentUpload = (files: File[]) => {
    setUploadedDocuments(prev => [...prev, ...files]);
  };

  const simulateOCRAnalysis = async (): Promise<DocumentAnalysis[]> => {
    const analyses: DocumentAnalysis[] = [];

    for (const doc of uploadedDocuments) {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const analysis: DocumentAnalysis = {
        type: doc.name.includes('sale') ? 'Sale Deed' :
              doc.name.includes('registry') ? 'Registry Document' :
              doc.name.includes('rera') ? 'RERA Certificate' : 'Property Document',
        confidence: Math.random() * 20 + 80, // 80-100%
        extractedData: {
          propertyId: `PROP-${Math.random().toString(36).substr(2, 9)}`,
          ownerName: "Rajesh Kumar",
          registrationDate: "2023-05-15",
          propertyValue: "₹35,00,000",
          area: "1200 sq ft"
        },
        issues: doc.name.includes('blurry') ? ['Document quality is poor'] : [],
        recommendations: ['Verify with original documents', 'Cross-check with registry office']
      };

      analyses.push(analysis);
    }

    return analyses;
  };

  const generateLegitimacyReport = async (): Promise<LegitimacyReport> => {
    const documentAnalyses = await simulateOCRAnalysis();

    return {
      overallScore: Math.floor(Math.random() * 30 + 70), // 70-100
      riskLevel: Math.random() > 0.7 ? 'MEDIUM' : 'LOW',
      analysis: {
        documentVerification: documentAnalyses,
        registryCrosscheck: {
          status: 'VERIFIED',
          details: 'Property details match with registry records'
        },
        builderVerification: {
          status: 'VERIFIED',
          reraNumber: 'MP/01/2023/001234',
          projectStatus: 'Under Construction - Phase 1 Complete'
        },
        legalCompliance: {
          status: 'COMPLIANT',
          issues: []
        }
      },
      recommendations: [
        'All documents appear authentic',
        'Builder is RERA registered',
        'Property is legally compliant',
        'Consider getting legal opinion for final verification'
      ],
      nextSteps: [
        'Visit property in person',
        'Verify with local registry office',
        'Check with RERA website',
        'Consult with legal expert'
      ]
    };
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const analysisReport = await generateLegitimacyReport();
      setReport(analysisReport);
      setCurrentStep(4);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <main className="mx-auto max-w-6xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent"
          >
            Property Legitimacy Check
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered document verification and authenticity analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI + OCR
          </Badge>
          <Shield className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-primary border-primary text-white'
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Property Title</label>
                  <Input
                    placeholder="e.g., 2BHK Flat in Vijay Nagar"
                    value={propertyData.title}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., Indore, Madhya Pradesh"
                    value={propertyData.location}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Builder/Developer</label>
                  <Input
                    placeholder="e.g., ABC Developers"
                    value={propertyData.builder}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, builder: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">RERA Number (Optional)</label>
                  <Input
                    placeholder="e.g., MP/01/2023/001234"
                    value={propertyData.reraNumber}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, reraNumber: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Additional Details</label>
                <Textarea
                  placeholder="Any additional information about the property..."
                  value={propertyData.description}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!propertyData.title || !propertyData.location}
                className="w-full"
              >
                Continue to Document Upload
              </Button>
            </CardContent>
          </Card>
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
                <Upload className="h-5 w-5" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Upload Documents</h4>
                  <Dropzone
                    onDrop={handleDocumentUpload}
                    accept={{
                      'application/pdf': ['.pdf'],
                      'image/*': ['.png', '.jpg', '.jpeg']
                    }}
                    maxFiles={10}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Required Documents</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Sale Deed / Agreement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>RERA Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Property Tax Receipts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Building Plan Approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>NOC from Society</span>
                    </div>
                  </div>
                </div>
              </div>

              {uploadedDocuments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Uploaded Documents</h4>
                  <div className="space-y-2">
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={uploadedDocuments.length === 0}
                  className="flex-1"
                >
                  Start AI Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Scan className="h-12 w-12 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is analyzing your documents using OCR technology and cross-referencing with registry databases...
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Document OCR Processing</span>
                  <span>{Math.min(analysisProgress, 100).toFixed(0)}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Scan className="h-4 w-4 text-blue-500" />
                    <span>OCR Processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Registry Crosscheck</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>AI Analysis</span>
                  </div>
                </div>
              </div>

              {!isAnalyzing && (
                <Button onClick={startAnalysis} className="mt-6">
                  Start Analysis
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {currentStep === 4 && report && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Legitimacy Score</h3>
                  <p className="text-muted-foreground">Based on AI analysis of your documents</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">{report.overallScore}/100</div>
                  <Badge className={`${getRiskColor(report.riskLevel)}`}>
                    {report.riskLevel} RISK
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  {report.analysis.documentVerification.map((doc, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{doc.type}</h4>
                        <Badge variant="secondary">{doc.confidence.toFixed(0)}%</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        {Object.entries(doc.extractedData).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Registry Crosscheck */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Registry Crosscheck
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Status: {report.analysis.registryCrosscheck.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {report.analysis.registryCrosscheck.details}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Builder Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Builder Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">RERA Registered</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>RERA Number:</span>
                      <span className="font-mono">{report.analysis.builderVerification.reraNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Project Status:</span>
                      <span>{report.analysis.builderVerification.projectStatus}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Legal Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Status: {report.analysis.legalCompliance.status}</span>
                  </div>
                  {report.analysis.legalCompliance.issues.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Issues Found:</h4>
                      <ul className="space-y-1 text-sm">
                        {report.analysis.legalCompliance.issues.map((issue, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations & Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Next Steps</h4>
                  <ul className="space-y-2">
                    {report.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Check Another Property
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </motion.div>
      )}
    </main>
  );
}

