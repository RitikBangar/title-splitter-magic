
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SellerValues } from "./SellerView";

interface BuyerViewProps {
  sellerValues: SellerValues;
  onValuesChange: (values: BuyerValues) => void;
  className?: string;
}

export interface BuyerValues {
  refurbishmentCost: number;
  legalCostToBuy: number;
  legalCostForTitleSplitting: number;
  legalCostForRefinancing: number;
  stampDutyLandTax: number;
  estimatedFlatValue: number;
  buyerOfferPrice: number;
}

export function BuyerView({ sellerValues, onValuesChange, className }: BuyerViewProps) {
  const [values, setValues] = useState<BuyerValues>({
    refurbishmentCost: 7500,
    legalCostToBuy: 1000,
    legalCostForTitleSplitting: 600,
    legalCostForRefinancing: 1000,
    stampDutyLandTax: 21000,
    estimatedFlatValue: 75650,
    buyerOfferPrice: 605200
  });

  // Calculate total refurbishment costs
  const totalRefurbCost = values.refurbishmentCost * sellerValues.numFlats;
  
  // Calculate total legal costs for buying
  const totalLegalCostToBuy = values.legalCostToBuy;
  
  // Calculate total legal costs for title splitting
  const totalLegalCostForTitleSplitting = values.legalCostForTitleSplitting * sellerValues.numFlats;
  
  // Calculate total legal costs for refinancing
  const totalLegalCostForRefinancing = values.legalCostForRefinancing * sellerValues.numFlats;
  
  // Calculate total costs
  const totalCosts = totalRefurbCost + totalLegalCostToBuy + 
    totalLegalCostForTitleSplitting + totalLegalCostForRefinancing + values.stampDutyLandTax;

  // Calculate buyer offer price (purchase price - total costs)
  const calculatedBuyerOfferPrice = Math.max(0, sellerValues.purchasePrice - totalCosts);

  const handleChange = (field: keyof BuyerValues, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    const newValues = { ...values, [field]: numValue };
    setValues(newValues);
    onValuesChange(newValues);
  };

  // Update values whenever seller price or costs change
  useEffect(() => {
    setValues(prev => {
      const newOfferPrice = Math.max(0, sellerValues.purchasePrice - totalCosts);
      const updated = { 
        ...prev, 
        buyerOfferPrice: newOfferPrice,
        estimatedFlatValue: Math.round(newOfferPrice / sellerValues.numFlats) 
      };
      onValuesChange(updated);
      return updated;
    });
  }, [sellerValues.purchasePrice, sellerValues.numFlats, totalCosts]);
  
  // Initial effect to notify parent about default values
  useEffect(() => {
    onValuesChange(values);
  }, []);

  return (
    <Card className={cn("w-full max-w-md transition-all duration-300 ease-in-out card-hover-effect", className)}>
      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-t-lg">
        <CardTitle className="font-bold text-2xl text-amber-700 dark:text-amber-400">Buyer's Assessment</CardTitle>
        <CardDescription>Enter the costs and estimated values from the buyer's perspective</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="refurbishmentCost" className="font-medium">Cost of Refurbishment per Flat (£)</Label>
          <Input
            id="refurbishmentCost"
            type="number"
            value={values.refurbishmentCost}
            onChange={(e) => handleChange('refurbishmentCost', e.target.value)}
            className="text-right"
          />
          <div className="text-sm text-right text-muted-foreground">
            Total: £{totalRefurbCost.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="legalCostToBuy" className="font-medium">Legal Cost to Buy (£)</Label>
          <Input
            id="legalCostToBuy"
            type="number"
            value={values.legalCostToBuy}
            onChange={(e) => handleChange('legalCostToBuy', e.target.value)}
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="legalCostForTitleSplitting" className="font-medium">Legal Cost for Title Splitting per Flat (£)</Label>
          <Input
            id="legalCostForTitleSplitting"
            type="number" 
            value={values.legalCostForTitleSplitting}
            onChange={(e) => handleChange('legalCostForTitleSplitting', e.target.value)}
            className="text-right"
          />
          <div className="text-sm text-right text-muted-foreground">
            Total: £{totalLegalCostForTitleSplitting.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="legalCostForRefinancing" className="font-medium">Legal Cost for Refinancing per Flat (£)</Label>
          <Input
            id="legalCostForRefinancing"
            type="number" 
            value={values.legalCostForRefinancing}
            onChange={(e) => handleChange('legalCostForRefinancing', e.target.value)}
            className="text-right"
          />
          <div className="text-sm text-right text-muted-foreground">
            Total: £{totalLegalCostForRefinancing.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stampDutyLandTax" className="font-medium">Stamp Duty Land Tax (£)</Label>
          <Input
            id="stampDutyLandTax"
            type="number" 
            value={values.stampDutyLandTax}
            onChange={(e) => handleChange('stampDutyLandTax', e.target.value)}
            className="text-right"
          />
        </div>
        
        <div className="pt-2 border-t">
          <div className="text-md font-semibold text-right">
            Total Costs: £{totalCosts.toLocaleString()}
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="estimatedFlatValue" className="font-medium">Estimated Value per Flat (Current Condition) (£)</Label>
          <Input
            id="estimatedFlatValue"
            type="number" 
            value={values.estimatedFlatValue}
            onChange={(e) => handleChange('estimatedFlatValue', e.target.value)}
            className="text-right"
          />
        </div>
        
        <div className="space-y-2 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-md">
          <Label htmlFor="buyerOfferPrice" className="font-medium">Buyer Offer Price (£)</Label>
          <Input
            id="buyerOfferPrice"
            type="number" 
            value={values.buyerOfferPrice}
            onChange={(e) => handleChange('buyerOfferPrice', e.target.value)}
            className="text-right bg-white dark:bg-background"
          />
          <div className="flex justify-between text-sm text-amber-700 dark:text-amber-400">
            <span className="font-medium">Seller Price: £{sellerValues.purchasePrice.toLocaleString()}</span>
            <span className="font-medium">Difference: £{(sellerValues.purchasePrice - values.buyerOfferPrice).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
