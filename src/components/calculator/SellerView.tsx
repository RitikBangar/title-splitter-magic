
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SellerViewProps {
  onValuesChange: (values: SellerValues) => void;
  className?: string;
}

export interface SellerValues {
  purchasePrice: number;
  numFlats: number;
  averagePricePerFlat: number;
}

export function SellerView({ onValuesChange, className }: SellerViewProps) {
  const [values, setValues] = useState<SellerValues>({
    purchasePrice: 700000,
    numFlats: 8,
    averagePricePerFlat: 87500
  });

  const handleChange = (field: keyof SellerValues, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    
    const newValues = { ...values, [field]: numValue };
    
    // If purchase price or number of flats changes, update the average price per flat
    if (field === 'purchasePrice' || field === 'numFlats') {
      if (newValues.numFlats > 0) {
        newValues.averagePricePerFlat = Math.round(newValues.purchasePrice / newValues.numFlats);
      }
    }
    
    // If average price per flat changes, update the purchase price
    if (field === 'averagePricePerFlat') {
      newValues.purchasePrice = Math.round(newValues.averagePricePerFlat * newValues.numFlats);
    }
    
    setValues(newValues);
    onValuesChange(newValues);
  };
  
  // Initial effect to notify parent about default values
  useEffect(() => {
    onValuesChange(values);
  }, []);

  return (
    <Card className={cn("w-full max-w-md transition-all duration-300 ease-in-out card-hover-effect", className)}>
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-t-lg">
        <CardTitle className="font-bold text-2xl text-emerald-800 dark:text-emerald-400">Seller's View</CardTitle>
        <CardDescription>Enter the property details from the seller's perspective</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purchasePrice" className="font-medium">Purchase Price (£)</Label>
          <Input
            id="purchasePrice"
            type="number"
            value={values.purchasePrice}
            onChange={(e) => handleChange('purchasePrice', e.target.value)}
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="numFlats" className="font-medium">Number of Flats in Block</Label>
          <Input
            id="numFlats"
            type="number"
            value={values.numFlats}
            onChange={(e) => handleChange('numFlats', e.target.value)}
            className="text-right"
            min={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="averagePricePerFlat" className="font-medium">Average Price per Flat (£)</Label>
          <Input
            id="averagePricePerFlat"
            type="number" 
            value={values.averagePricePerFlat}
            onChange={(e) => handleChange('averagePricePerFlat', e.target.value)}
            className="text-right"
            min={0}
          />
        </div>
      </CardContent>
    </Card>
  );
}
