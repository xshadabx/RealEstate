"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PiggyBank, 
  BarChart3, 
  Sparkles, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

function sipFutureValue({ monthly, ratePercent, months }: { monthly: number; ratePercent: number; months: number }) {
  const r = ratePercent / 100 / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

export default function ESipPage() {
  const { t } = useLanguage();
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const months = years * 12;
  const totalInvested = monthly * months;
  const expected = useMemo(() => sipFutureValue({ monthly, ratePercent: rate, months }), [monthly, rate, months]);
  const gains = expected - totalInvested;

  // AI Market Analysis
  const marketAnalysis = {
    currentTrend: "Bullish",
    marketGrowth: 12.5,
    riskLevel: "Medium",
    recommendation: "Good time to invest",
    propertyPriceGrowth: 8.2,
    inflationRate: 6.1,
    realEstateIndex: 145.2,
  };

  // AI Forecasts
  const forecasts = [
    { year: 1, value: totalInvested * 1.08, growth: 8 },
    { year: 2, value: totalInvested * 1.17, growth: 17 },
    { year: 3, value: totalInvested * 1.26, growth: 26 },
    { year: 4, value: totalInvested * 1.36, growth: 36 },
    { year: 5, value: expected, growth: Math.round((gains / totalInvested) * 100) },
  ];

  const scenarios = [
    {
      name: "Conservative",
      rate: rate * 0.8,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Moderate",
      rate: rate,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      name: "Aggressive",
      rate: rate * 1.2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

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
            E-SIP (Property SIP)
          </motion.h1>
          <p className="text-muted-foreground mt-1">AI-powered property investment simulation</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Forecasting
          </Badge>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <PiggyBank className="h-6 w-6 text-white animate-pulse" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">SIP Calculator</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Market Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                SIP Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Monthly Investment (₹)</label>
                  <Input 
                    type="number" 
                    value={monthly} 
                    onChange={(e) => setMonthly(parseInt(e.target.value || "0"))} 
                    className="mt-1" 
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Investment Period (Years)</label>
                  <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(parseInt(e.target.value || "0"))} 
                    className="mt-1" 
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expected Annual Return (%)</label>
                  <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(parseFloat(e.target.value || "0"))} 
                    className="mt-1" 
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Investment Type:</span>
                <div className="flex gap-2">
                  <Button
                    variant={userType === "buyer" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserType("buyer")}
                  >
                    As Buyer
                  </Button>
                  <Button
                    variant={userType === "seller" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserType("seller")}
                  >
                    As Seller
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">₹{totalInvested.toLocaleString("en-IN")}</div>
                <div className="text-sm text-muted-foreground">Total Invested</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold">₹{Math.round(expected).toLocaleString("en-IN")}</div>
                <div className="text-sm text-muted-foreground">Estimated Value</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-primary">₹{Math.round(gains).toLocaleString("en-IN")}</div>
                <div className="text-sm text-muted-foreground">Estimated Gains</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              Start SIP as {userType === "buyer" ? "Buyer" : "Seller"}
            </Button>
            <Button variant="outline" size="lg">
              Download Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* AI Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Market Trend</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Current market is <span className="font-medium">{marketAnalysis.currentTrend}</span> with 
                      <span className="font-medium"> {marketAnalysis.marketGrowth}%</span> growth rate
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Risk Assessment</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Risk Level: <span className="font-medium">{marketAnalysis.riskLevel}</span>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Recommendation: <span className="font-medium">{marketAnalysis.recommendation}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <PieChart className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">Market Metrics</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Property Price Growth:</span>
                        <span className="font-medium text-green-600">+{marketAnalysis.propertyPriceGrowth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inflation Rate:</span>
                        <span className="font-medium text-orange-600">{marketAnalysis.inflationRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Real Estate Index:</span>
                        <span className="font-medium">{marketAnalysis.realEstateIndex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario) => {
                  const scenarioValue = sipFutureValue({ monthly, ratePercent: scenario.rate, months });
                  const scenarioGains = scenarioValue - totalInvested;
                  
                  return (
                    <div key={scenario.name} className={`p-4 rounded-lg border ${scenario.bgColor} ${scenario.borderColor}`}>
                      <h4 className={`font-semibold ${scenario.color} mb-2`}>{scenario.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div>Rate: {scenario.rate.toFixed(1)}%</div>
                        <div>Final Value: ₹{Math.round(scenarioValue).toLocaleString()}</div>
                        <div>Gains: ₹{Math.round(scenarioGains).toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          {/* Yearly Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                5-Year Investment Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecasts.map((forecast, index) => (
                  <motion.div
                    key={forecast.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">Y{forecast.year}</span>
                      </div>
                      <div>
                        <div className="font-semibold">Year {forecast.year}</div>
                        <div className="text-sm text-muted-foreground">
                          {forecast.year === 1 ? "Initial Investment" : "Cumulative Growth"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{Math.round(forecast.value).toLocaleString()}</div>
                      <div className={`text-sm flex items-center gap-1 ${
                        forecast.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forecast.growth > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {forecast.growth > 0 ? '+' : ''}{forecast.growth}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Investment Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Investment Opportunity</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Based on current market trends, your SIP investment shows strong potential for growth. 
                        The projected returns of {Math.round((gains / totalInvested) * 100)}% over {years} years 
                        align well with market expectations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Risk Considerations</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider diversifying your investment across different property types and locations. 
                        Market volatility could impact returns by ±15% from projections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}


