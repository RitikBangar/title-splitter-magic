
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { BuyerValues } from "./BuyerView";
import { SellerValues } from "./SellerView";
import { Bold, PoundSterling } from "lucide-react";

interface FinancingViewProps {
  sellerValues: SellerValues;
  buyerValues: BuyerValues;
  className?: string;
}

export interface FinancingValues {
  depositPercentage: number;
  mortgageInterestRate: number;
  bridgingFinanceRate: number;
  rentPerFlatMonthly: number;
}

export function FinancingView({ sellerValues, buyerValues, className }: FinancingViewProps) {
  const [values, setValues] = useState<FinancingValues>({
    depositPercentage: 25,
    mortgageInterestRate: 6,
    bridgingFinanceRate: 8,
    rentPerFlatMonthly: 600
  });

  const handleChange = (field: keyof FinancingValues, value: string | number[]) => {
    let numValue: number;
    
    if (Array.isArray(value)) {
      numValue = value[0];
    } else {
      numValue = value === "" ? 0 : parseFloat(value);
    }
    
    setValues({ ...values, [field]: numValue });
  };

  // Calculate financing details based on the seller's purchase price
  const purchasePrice = sellerValues.purchasePrice; // Use seller's price instead of buyer's offer price
  const depositAmount = Math.round(purchasePrice * (values.depositPercentage / 100));
  const ltvMortgage = purchasePrice - depositAmount;
  
  const mortgageInterestYearly = Math.round(ltvMortgage * (values.mortgageInterestRate / 100));
  const mortgageInterestMonthly = Math.round(mortgageInterestYearly / 12);
  
  const bridgingInterestYearly = Math.round(ltvMortgage * (values.bridgingFinanceRate / 100));
  const bridgingInterestMonthly = Math.round(bridgingInterestYearly / 12);

  // Calculate rental income
  const rentPerFlatYearly = values.rentPerFlatMonthly * 12;
  const rentPerBlockYearly = rentPerFlatYearly * sellerValues.numFlats;
  const rentPerBlockMonthly = rentPerBlockYearly / 12;

  // Calculate profit after interest payments
  const profitAfterMortgageMonthly = rentPerBlockMonthly - mortgageInterestMonthly;
  const profitAfterBridgingMonthly = rentPerBlockMonthly - bridgingInterestMonthly;

  return (
    <Card className={cn("w-full max-w-md transition-all duration-300 ease-in-out card-hover-effect", className)}>
      <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/20 dark:to-indigo-950/20 rounded-t-lg">
        <CardTitle className="font-bold text-2xl text-sky-700 dark:text-sky-400">Financing & Rental</CardTitle>
        <CardDescription>Evaluate financing options and potential rental income</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="depositPercentage" className="font-medium">Deposit Percentage</Label>
            <span className="text-sm font-medium">{values.depositPercentage}%</span>
          </div>
          <Slider
            id="depositPercentage"
            min={5}
            max={50}
            step={1}
            value={[values.depositPercentage]}
            onValueChange={(value) => handleChange('depositPercentage', value)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>£{depositAmount.toLocaleString()} (Deposit)</span>
            <span>£{ltvMortgage.toLocaleString()} (Mortgage)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="mortgageInterestRate" className="font-medium">Mortgage Rate (%)</Label>
            <Input
              id="mortgageInterestRate"
              type="number"
              value={values.mortgageInterestRate}
              onChange={(e) => handleChange('mortgageInterestRate', e.target.value)}
              className="text-right"
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bridgingFinanceRate" className="font-medium">Bridging Rate (%)</Label>
            <Input
              id="bridgingFinanceRate"
              type="number"
              value={values.bridgingFinanceRate}
              onChange={(e) => handleChange('bridgingFinanceRate', e.target.value)}
              className="text-right"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Interest (Mortgage)</div>
            <div className="text-md font-medium">£{mortgageInterestYearly.toLocaleString()}/year</div>
            <div className="text-sm">£{mortgageInterestMonthly.toLocaleString()}/month</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Interest (Bridging)</div>
            <div className="text-md font-medium">£{bridgingInterestYearly.toLocaleString()}/year</div>
            <div className="text-sm">£{bridgingInterestMonthly.toLocaleString()}/month</div>
          </div>
        </div>
        
        <div className="pt-4 border-t mt-2">
          <div className="space-y-2">
            <Label htmlFor="rentPerFlatMonthly" className="font-medium">Rent per Flat (Monthly) (£)</Label>
            <div className="bg-sky-100 dark:bg-sky-900/40 p-1 rounded-md border border-sky-300 dark:border-sky-700">
              <Input
                id="rentPerFlatMonthly"
                type="number"
                value={values.rentPerFlatMonthly}
                onChange={(e) => handleChange('rentPerFlatMonthly', e.target.value)}
                className="text-right bg-transparent border-0 font-bold text-sky-800 dark:text-sky-300"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Block Rental Income</div>
              <div className="text-md font-medium">£{rentPerBlockYearly.toLocaleString()}/year</div>
              <div className="text-sm">£{rentPerBlockMonthly.toLocaleString()}/month</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Per Flat</div>
              <div className="text-md font-medium">£{rentPerFlatYearly.toLocaleString()}/year</div>
              <div className="text-sm">£{values.rentPerFlatMonthly.toLocaleString()}/month</div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t mt-2">
          <div className="text-lg font-semibold mb-2">Profit after Interest Payments</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-2 bg-sky-100 dark:bg-sky-900/30 rounded-md">
              <div className="text-sm text-muted-foreground">With Mortgage</div>
              <div className="text-md font-bold text-sky-700 dark:text-sky-400">
                £{profitAfterMortgageMonthly.toLocaleString()}/month
              </div>
            </div>
            
            <div className="space-y-1 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
              <div className="text-sm text-muted-foreground">With Bridging</div>
              <div className="text-md font-bold text-indigo-700 dark:text-indigo-400">
                £{profitAfterBridgingMonthly.toLocaleString()}/month
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
