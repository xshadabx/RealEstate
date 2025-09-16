// Enhanced AI Virtual Real Estate Agent
import { loanCalculator, type LoanEligibility } from './loan-calculator';
import { fraudDetector } from './fraud-detection';

export interface AgentResponse {
  type: 'greeting' | 'property_info' | 'loan_calculation' | 'fraud_analysis' | 'faq' | 'error';
  message: string;
  data?: unknown;
  suggestions?: string[];
  requiresFollowUp?: boolean;
}

export interface LoanRequest {
  loanAmount?: number;
  interestRate?: number;
  tenureYears?: number;
  monthlyIncome?: number;
  existingEMIs?: number;
}

export class VirtualRealEstateAgent {
  private faqDatabase = {
    'carpet area': {
      question: 'What is carpet area vs super built-up area?',
      answer: 'Carpet area is the actual usable floor area within the walls. Super built-up area includes carpet area + walls + common areas + amenities. Typically, carpet area is 70-75% of super built-up area.'
    },
    'emi': {
      question: 'How is EMI calculated?',
      answer: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P=Principal, R=Monthly Interest Rate, N=Loan Tenure in months.'
    },
    'documents': {
      question: 'What documents are required for home loan?',
      answer: 'Income proof, bank statements, property documents, identity proof, address proof, and property valuation report.'
    },
    'tax benefits': {
      question: 'What are the tax benefits on home loans?',
      answer: 'Section 24: Up to ₹2L deduction on interest paid. Section 80C: Up to ₹1.5L deduction on principal repayment.'
    },
    'verification': {
      question: 'How to verify property authenticity?',
      answer: 'Check title deed, encumbrance certificate, property tax receipts, approved building plans, and NOC from society.'
    }
  };

  public processMessage(userInput: string, context?: unknown): AgentResponse {
    const input = userInput.toLowerCase().trim();

    // Greeting detection
    if (this.isGreeting(input)) {
      return this.generateGreeting();
    }

    // Loan/EMI related queries
    if (this.isLoanQuery(input)) {
      return this.handleLoanQuery(input);
    }

    // Fraud detection queries
    if (this.isFraudQuery(input)) {
      return this.handleFraudQuery(input, context);
    }

    // FAQ queries
    if (this.isFAQQuery(input)) {
      return this.handleFAQQuery(input);
    }

    // Property information queries
    if (this.isPropertyQuery(input)) {
      return this.handlePropertyQuery();
    }

    // Default response
    return this.generateDefaultResponse();
  }

  private isGreeting(input: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'];
    return greetings.some(greeting => input.includes(greeting));
  }

  private isLoanQuery(input: string): boolean {
    const loanKeywords = ['emi', 'loan', 'interest', 'tenure', 'eligibility', 'prepayment', 'tax benefit'];
    return loanKeywords.some(keyword => input.includes(keyword));
  }

  private isFraudQuery(input: string): boolean {
    const fraudKeywords = ['fraud', 'fake', 'scam', 'verify', 'authentic', 'genuine', 'suspicious'];
    return fraudKeywords.some(keyword => input.includes(keyword));
  }

  private isFAQQuery(input: string): boolean {
    const faqKeywords = ['what is', 'how to', 'explain', 'difference', 'meaning', 'carpet area', 'built-up'];
    return faqKeywords.some(keyword => input.includes(keyword));
  }

  private isPropertyQuery(input: string): boolean {
    const propertyKeywords = ['property', 'apartment', 'villa', 'price', 'location', 'amenities', 'visit', 'schedule'];
    return propertyKeywords.some(keyword => input.includes(keyword));
  }

  private generateGreeting(): AgentResponse {
    return {
      type: 'greeting',
      message: `🏠 Hello! I'm **Ai.Sha**, your intelligent real estate companion. I'm here to help you 24/7 with:

• **Property Search & Information** - Find properties, check availability, pricing, amenities
• **Loan & EMI Assistance** - Calculate EMIs, check eligibility, understand tax benefits  
• **Fraud Detection** - Analyze listings for authenticity and safety
• **General Queries** - Answer FAQs about real estate

As your dedicated AI assistant, I provide personalized, accurate, and professional guidance to make your real estate journey smooth and secure.

How can I assist you today?`,
      suggestions: [
        'Calculate EMI for ₹50L loan',
        'Check if a property listing is genuine',
        'Explain carpet area vs built-up area',
        'Find properties in Koramangala'
      ]
    };
  }

  private handleLoanQuery(input: string): AgentResponse {
    const loanRequest = this.extractLoanDetails(input);
    
    if (this.hasCompleteLoanDetails(loanRequest)) {
      const calculation = loanCalculator.calculateEMI(
        loanRequest.loanAmount!,
        loanRequest.interestRate!,
        loanRequest.tenureYears! * 12
      );
      
      return {
        type: 'loan_calculation',
        message: `💰 **EMI Calculation Results:**

**Loan Details:**
• Principal: ₹${loanRequest.loanAmount!.toLocaleString()}
• Interest Rate: ${loanRequest.interestRate!}% p.a.
• Tenure: ${loanRequest.tenureYears!} years

**Monthly EMI:** ₹${calculation.monthlyEMI.toLocaleString()}
**Total Interest:** ₹${calculation.totalInterest.toLocaleString()}
**Total Payable:** ₹${calculation.totalPayable.toLocaleString()}

**Yearly Breakdown:**
${calculation.breakdown.slice(0, 3).map(year => 
  `Year ${year.year}: Principal ₹${year.principal.toLocaleString()}, Interest ₹${year.interest.toLocaleString()}`
).join('\n')}

💡 *This is an estimate. Actual rates may vary. Consult with banks for exact calculations.*`,
        data: calculation
      };
    } else {
      const missing = this.getMissingLoanDetails(loanRequest);
      return {
        type: 'loan_calculation',
        message: `I need a few more details to calculate your EMI:

${missing.map(item => `• ${item}`).join('\n')}

Please provide the missing information, or ask me to calculate with default values.`,
        requiresFollowUp: true,
        data: loanRequest
      };
    }
  }

  private handleFraudQuery(input: string, context?: unknown): AgentResponse {
    if (context && typeof context === 'object' && 'propertyListing' in context) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const analysis = fraudDetector.analyzeProperty((context as any).propertyListing);
      
      const riskEmoji = {
        'LOW': '✅',
        'MEDIUM': '⚠️',
        'HIGH': '🚨',
        'CRITICAL': '🚨'
      };

      return {
        type: 'fraud_analysis',
        message: `🔍 **Fraud Analysis Report**

**Overall Score:** ${analysis.overallScore}/100 ${riskEmoji[analysis.riskLevel]}
**Risk Level:** ${analysis.riskLevel}
**Confidence:** ${analysis.confidence}%

**Red Flags Found:**
${analysis.redFlags.map(flag => 
  `• ${flag.type}: ${flag.description} (${flag.severity})`
).join('\n')}

**Recommendations:**
${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}

*This analysis is based on automated checks. Always verify with professionals.*`,
        data: analysis
      };
    } else {
      return {
        type: 'fraud_analysis',
        message: `🔍 **Fraud Detection Service**

I can analyze property listings for potential fraud. To check a property, please provide:

• Property details (title, price, location)
• Seller information
• Property images
• Description text

**Common Red Flags I Check:**
• Unrealistic pricing vs market rates
• Blurry or stock images
• Generic/suspicious descriptions
• Unverified sellers
• Missing contact information

Would you like me to analyze a specific property listing?`,
        suggestions: [
          'Analyze this property listing',
          'What are common fraud indicators?',
          'How to verify property authenticity?'
        ]
      };
    }
  }

  private handleFAQQuery(input: string): AgentResponse {
    for (const [key, faq] of Object.entries(this.faqDatabase)) {
      if (input.includes(key)) {
        return {
          type: 'faq',
          message: `❓ **${faq.question}**

${faq.answer}

Is there anything else you'd like to know about this topic?`,
          suggestions: [
            'Tell me more about this',
            'Related questions',
            'Calculate EMI',
            'Check property authenticity'
          ]
        };
      }
    }

    return {
      type: 'faq',
      message: `❓ **Frequently Asked Questions**

Here are some common topics I can help with:

• **Carpet Area vs Built-up Area** - Understanding property measurements
• **EMI Calculation** - How home loan EMIs work
• **Required Documents** - What you need for home loans
• **Tax Benefits** - Home loan tax deductions
• **Property Verification** - How to check authenticity

Which topic interests you?`,
      suggestions: Object.keys(this.faqDatabase).map(key => 
        `Explain ${key.replace('_', ' ')}`
      )
    };
  }

  private handlePropertyQuery(): AgentResponse {
    return {
      type: 'property_info',
      message: `🏠 **Property Information Service**

I can help you with:

• **Property Search** - Find properties matching your criteria
• **Pricing Information** - Market rates and price analysis
• **Location Details** - Connectivity, amenities, nearby facilities
• **Visit Scheduling** - Connect with agents for property visits
• **Comparison** - Compare multiple properties

**What would you like to know?**
• Property availability in specific areas
• Market rates for different locations
• Amenities and facilities
• Commute options and connectivity

Please provide more details about what you're looking for!`,
      suggestions: [
        'Find 2 BHK apartments in Koramangala',
        'What are the market rates in Whitefield?',
        'Schedule a property visit',
        'Compare properties'
      ]
    };
  }

  private generateDefaultResponse(): AgentResponse {
    return {
      type: 'error',
      message: `I'm not sure I understand your request. As Ai.Sha, your intelligent real estate companion, I can help with:

• **Property Search** - "Find 2 BHK apartments under ₹60L"
• **Loan Help** - "Calculate EMI for ₹50L loan at 8.5% for 20 years"
• **Fraud Check** - "Is this property listing genuine?"
• **General Info** - "What is carpet area?"

Could you please rephrase your question or try one of the suggestions below?`,
      suggestions: [
        'Calculate EMI',
        'Check property authenticity',
        'Find properties',
        'Explain carpet area'
      ]
    };
  }

  private extractLoanDetails(input: string): LoanRequest {
    const request: LoanRequest = {};

    // Extract loan amount
    const amountMatch = input.match(/₹?(\d+(?:,\d+)*)\s*(?:lakh|lac|l|cr|crore)/);
    if (amountMatch) {
      const amount = parseInt(amountMatch[1].replace(/,/g, ''));
      const isCrore = input.includes('cr') || input.includes('crore');
      request.loanAmount = isCrore ? amount * 10000000 : amount * 100000;
    }

    // Extract interest rate
    const rateMatch = input.match(/(\d+(?:\.\d+)?)\s*%/);
    if (rateMatch) {
      request.interestRate = parseFloat(rateMatch[1]);
    }

    // Extract tenure
    const tenureMatch = input.match(/(\d+)\s*years?/);
    if (tenureMatch) {
      request.tenureYears = parseInt(tenureMatch[1]);
    }

    // Extract income
    const incomeMatch = input.match(/income\s*₹?(\d+(?:,\d+)*)/);
    if (incomeMatch) {
      request.monthlyIncome = parseInt(incomeMatch[1].replace(/,/g, ''));
    }

    return request;
  }

  private hasCompleteLoanDetails(request: LoanRequest): boolean {
    return !!(request.loanAmount && request.interestRate && request.tenureYears);
  }

  private getMissingLoanDetails(request: LoanRequest): string[] {
    const missing: string[] = [];
    
    if (!request.loanAmount) missing.push('Loan amount (e.g., ₹50L)');
    if (!request.interestRate) missing.push('Interest rate (e.g., 8.5%)');
    if (!request.tenureYears) missing.push('Loan tenure (e.g., 20 years)');
    
    return missing;
  }

  // Calculate loan eligibility
  public calculateEligibility(monthlyIncome: number, existingEMIs: number = 0): LoanEligibility {
    return loanCalculator.calculateEligibility(monthlyIncome, existingEMIs);
  }

  // Get market interest rates
  public getMarketRates() {
    return loanCalculator.getMarketRates();
  }

  // Calculate tax benefits
  public calculateTaxBenefits(loanAmount: number, interestRate: number, tenureYears: number) {
    return loanCalculator.calculateTaxBenefits(loanAmount, interestRate, tenureYears);
  }
}

// Export singleton instance
export const virtualAgent = new VirtualRealEstateAgent();
