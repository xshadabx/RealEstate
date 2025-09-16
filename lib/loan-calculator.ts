// Loan and EMI Calculator for Real Estate
export interface LoanDetails {
  principal: number;
  interestRate: number;
  tenureMonths: number;
  tenureYears: number;
}

export interface EMICalculation {
  monthlyEMI: number;
  totalInterest: number;
  totalPayable: number;
  principal: number;
  interestRate: number;
  tenureMonths: number;
  breakdown: {
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export interface LoanEligibility {
  maxLoanAmount: number;
  eligibleEMI: number;
  requiredIncome: number;
  loanToValueRatio: number;
  eligibilityScore: number;
}

export class LoanCalculator {
  // Calculate EMI using the standard formula
  public calculateEMI(principal: number, annualRate: number, tenureMonths: number): EMICalculation {
    const monthlyRate = annualRate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    const totalPayable = emi * tenureMonths;
    const totalInterest = totalPayable - principal;
    
    // Generate yearly breakdown
    const breakdown = this.generateBreakdown(principal, monthlyRate, emi, tenureMonths);
    
    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      principal,
      interestRate: annualRate,
      tenureMonths,
      breakdown
    };
  }

  // Generate yearly breakdown of loan payments
  private generateBreakdown(principal: number, monthlyRate: number, emi: number, tenureMonths: number) {
    const breakdown = [];
    let balance = principal;
    let year = 1;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      balance -= principalPayment;
      
      // Add yearly entry
      if (month % 12 === 0 || month === tenureMonths) {
        breakdown.push({
          year,
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          balance: Math.round(Math.max(0, balance))
        });
        year++;
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }
    
    return breakdown;
  }

  // Calculate loan eligibility based on income
  public calculateEligibility(
    monthlyIncome: number,
    existingEMIs: number = 0,
    interestRate: number = 8.5,
    tenureYears: number = 20
  ): LoanEligibility {
    // EMI should not exceed 40% of monthly income
    const maxEMI = (monthlyIncome * 0.4) - existingEMIs;
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / (12 * 100);
    const tenureMonths = tenureYears * 12;
    
    const maxLoanAmount = (maxEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
    
    // Calculate eligibility score (0-100)
    const incomeRatio = (maxEMI / monthlyIncome) * 100;
    const eligibilityScore = Math.min(100, Math.max(0, 100 - (40 - incomeRatio) * 2));
    
    return {
      maxLoanAmount: Math.round(maxLoanAmount),
      eligibleEMI: Math.round(maxEMI),
      requiredIncome: Math.round(monthlyIncome),
      loanToValueRatio: 0.8, // 80% LTV is standard
      eligibilityScore: Math.round(eligibilityScore)
    };
  }

  // Calculate prepayment savings
  public calculatePrepaymentSavings(
    principal: number,
    interestRate: number,
    tenureMonths: number,
    prepaymentAmount: number,
    prepaymentMonth: number
  ) {
    const originalEMI = this.calculateEMI(principal, interestRate, tenureMonths);
    
    // Calculate remaining principal after prepayment
    const monthlyRate = interestRate / (12 * 100);
    let balance = principal;
    
    for (let month = 1; month <= prepaymentMonth; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = originalEMI.monthlyEMI - interestPayment;
      balance -= principalPayment;
    }
    
    // Apply prepayment
    balance -= prepaymentAmount;
    
    // Calculate new EMI for remaining tenure
    const remainingMonths = tenureMonths - prepaymentMonth;
    const newEMI = this.calculateEMI(balance, interestRate, remainingMonths);
    
    const totalSavings = originalEMI.totalPayable - (prepaymentAmount + newEMI.totalPayable);
    
    return {
      originalEMI: originalEMI.monthlyEMI,
      newEMI: newEMI.monthlyEMI,
      totalSavings: Math.round(totalSavings),
      interestSavings: Math.round(totalSavings),
      prepaymentAmount,
      remainingBalance: Math.round(balance)
    };
  }

  // Get current market interest rates
  public getMarketRates() {
    return {
      homeLoan: {
        sbi: 8.5,
        hdfc: 8.6,
        icici: 8.7,
        axis: 8.4,
        kotak: 8.8
      },
      personalLoan: {
        sbi: 10.5,
        hdfc: 11.0,
        icici: 11.2,
        axis: 10.8,
        kotak: 11.5
      },
      governmentSchemes: {
        pmay: 6.5, // Pradhan Mantri Awas Yojana
        clss: 8.0  // Credit Linked Subsidy Scheme
      }
    };
  }

  // Calculate tax benefits
  public calculateTaxBenefits(loanAmount: number, interestRate: number, tenureYears: number) {
    const emi = this.calculateEMI(loanAmount, interestRate, tenureYears * 12);
    const annualInterest = emi.monthlyEMI * 12 * 0.7; // Approximate interest portion
    
    return {
      section24: Math.min(200000, annualInterest), // Max ₹2L deduction
      section80C: Math.min(150000, loanAmount * 0.1), // Max ₹1.5L for principal
      totalAnnualBenefit: Math.min(350000, annualInterest + (loanAmount * 0.1)),
      taxSavings: Math.round(Math.min(350000, annualInterest + (loanAmount * 0.1)) * 0.3) // Assuming 30% tax rate
    };
  }
}

// Export singleton instance
export const loanCalculator = new LoanCalculator();
