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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import { 
  AlertTriangle, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Send,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  Sparkles,
  TrendingUp,
  Shield,
  Phone,
  Mail,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Bell,
  Target,
  Zap
} from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import { newMessage } from "@/lib/lottie-animations";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdDate: string;
  lastUpdated: string;
  assignedTo: string;
  estimatedResolution: string;
  relatedProperty?: string;
  attachments: string[];
  aiSuggestions: string[];
  similarComplaints: number;
}

interface ComplaintTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  usage: number;
}

export default function ComplaintsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("new");
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    category: "",
    priority: "MEDIUM",
    relatedProperty: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const mockComplaints: Complaint[] = [
    {
      id: "COMP-001",
      title: "Water Supply Issue",
      description: "No water supply in my apartment for the past 3 days. This is affecting daily activities.",
      category: "Infrastructure",
      priority: "HIGH",
      status: "IN_PROGRESS",
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-16",
      assignedTo: "Maintenance Team",
      estimatedResolution: "2024-01-18",
      relatedProperty: "Green Valley Apartments",
      attachments: ["water_meter.jpg", "complaint_letter.pdf"],
      aiSuggestions: ["Check water meter", "Contact building maintenance", "Escalate to builder"],
      similarComplaints: 3
    },
    {
      id: "COMP-002",
      title: "Elevator Not Working",
      description: "Elevator has been out of service for 2 days. Elderly residents are facing difficulties.",
      category: "Infrastructure",
      priority: "MEDIUM",
      status: "RESOLVED",
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-12",
      assignedTo: "Technical Team",
      estimatedResolution: "2024-01-12",
      relatedProperty: "Royal Heights",
      attachments: ["elevator_error.jpg"],
      aiSuggestions: ["Contact elevator service", "Provide alternative access", "Update residents"],
      similarComplaints: 1
    },
    {
      id: "COMP-003",
      title: "Parking Space Dispute",
      description: "Neighbor is using my assigned parking space without permission.",
      category: "Dispute",
      priority: "LOW",
      status: "OPEN",
      createdDate: "2024-01-14",
      lastUpdated: "2024-01-14",
      assignedTo: "Property Manager",
      estimatedResolution: "2024-01-20",
      relatedProperty: "Sunrise Towers",
      attachments: [],
      aiSuggestions: ["Review parking allocation", "Contact property manager", "Document evidence"],
      similarComplaints: 5
    }
  ];

  const mockTemplates: ComplaintTemplate[] = [
    {
      id: "TEMP-001",
      title: "Water Supply Issue",
      description: "No water supply in my apartment. Please resolve this issue at the earliest.",
      category: "Infrastructure",
      usage: 15
    },
    {
      id: "TEMP-002",
      title: "Elevator Maintenance",
      description: "Elevator is not working properly. Please arrange for maintenance.",
      category: "Infrastructure",
      usage: 12
    },
    {
      id: "TEMP-003",
      title: "Noise Complaint",
      description: "Excessive noise from construction work is disturbing residents.",
      category: "Noise",
      usage: 8
    },
    {
      id: "TEMP-004",
      title: "Security Issue",
      description: "Security concerns in the building. Please review and improve security measures.",
      category: "Security",
      usage: 6
    }
  ];

  const categories = [
    "Infrastructure",
    "Maintenance",
    "Security",
    "Noise",
    "Dispute",
    "Payment",
    "Documentation",
    "Other"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'IN_PROGRESS': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'RESOLVED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CLOSED': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return Clock;
      case 'IN_PROGRESS': return AlertTriangle;
      case 'RESOLVED': return CheckCircle;
      case 'CLOSED': return XCircle;
      default: return Clock;
    }
  };

  const handleSubmitComplaint = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setActiveTab("my-complaints");
    // Reset form
    setNewComplaint({
      title: "",
      description: "",
      category: "",
      priority: "MEDIUM",
      relatedProperty: ""
    });
  };

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="mx-auto max-w-7xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent"
          >
            Complaints & Grievances
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered complaint management and resolution tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Assisted
          </Badge>
          <LottiePlayer src={newMessage} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New Complaint</TabsTrigger>
          <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Complaint Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  File New Complaint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Complaint Title</label>
                  <Input
                    placeholder="Brief description of the issue"
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newComplaint.category} onValueChange={(value: string) => setNewComplaint(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={newComplaint.priority} onValueChange={(value: string) => setNewComplaint(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Related Property (Optional)</label>
                  <Input
                    placeholder="Property name or address"
                    value={newComplaint.relatedProperty}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, relatedProperty: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Detailed Description</label>
                  <Textarea
                    placeholder="Please provide detailed information about the issue..."
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                  />
                </div>

                <Button 
                  onClick={handleSubmitComplaint}
                  disabled={isSubmitting || !newComplaint.title || !newComplaint.description}
                  className="w-full flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Smart Templates</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Based on your category, we found 3 similar complaint templates that might help you.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Templates
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Resolution Estimate</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Similar complaints are typically resolved within 3-5 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-900">Auto-Escalation</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          High priority complaints are automatically escalated to senior management.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-complaints" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Complaints List */}
          <div className="space-y-4">
            {filteredComplaints.map((complaint, index) => {
              const StatusIcon = getStatusIcon(complaint.status);
              return (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{complaint.title}</h3>
                            <Badge className={getPriorityColor(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                            <Badge className={getStatusColor(complaint.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {complaint.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{complaint.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {complaint.createdDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {complaint.assignedTo}
                            </div>
                            {complaint.relatedProperty && (
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {complaint.relatedProperty}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress and AI Suggestions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              Est. Resolution: {complaint.estimatedResolution}
                            </span>
                          </div>
                          <Progress 
                            value={complaint.status === 'RESOLVED' ? 100 : 
                                  complaint.status === 'IN_PROGRESS' ? 60 : 
                                  complaint.status === 'OPEN' ? 20 : 0} 
                            className="w-full" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">AI Suggestions</span>
                            <Badge variant="secondary" className="text-xs">
                              {complaint.similarComplaints} similar
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            {complaint.aiSuggestions.slice(0, 2).map((suggestion, idx) => (
                              <p key={idx} className="text-xs text-muted-foreground">
                                • {suggestion}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Complaint Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{template.title}</h4>
                            <Badge variant="outline" className="mt-1">
                              {template.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Used</div>
                            <div className="font-semibold">{template.usage} times</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Plus className="h-3 w-3 mr-1" />
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

