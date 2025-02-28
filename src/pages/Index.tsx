
import { useState } from "react";
import { SellerView, SellerValues } from "@/components/calculator/SellerView";
import { BuyerView, BuyerValues } from "@/components/calculator/BuyerView";
import { FinancingView } from "@/components/calculator/FinancingView";
import { ResultsView } from "@/components/calculator/ResultsView";
import { PropertyLinkExtractor } from "@/components/PropertyLinkExtractor";
import { ModeToggle } from "@/components/mode-toggle";
import { Building, Calculator, PieChart, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [sellerValues, setSellerValues] = useState<SellerValues>({
    purchasePrice: 700000,
    numFlats: 8,
    averagePricePerFlat: 87500
  });
  
  const [buyerValues, setBuyerValues] = useState<BuyerValues>({
    refurbishmentCost: 7500,
    legalCostToBuy: 1000,
    legalCostForTitleSplitting: 600,
    legalCostForRefinancing: 1000,
    stampDutyLandTax: 21000,
    estimatedFlatValue: 75650,
    buyerOfferPrice: 605200
  });

  const handleDataExtracted = (extractedData: Partial<SellerValues>) => {
    // Update seller values with extracted data
    setSellerValues(prev => {
      const updated = { ...prev, ...extractedData };
      
      // If only purchasePrice or numFlats was updated, recalculate averagePricePerFlat
      if ((extractedData.purchasePrice && !extractedData.averagePricePerFlat) || 
          (extractedData.numFlats && !extractedData.averagePricePerFlat)) {
        updated.averagePricePerFlat = Math.round(updated.purchasePrice / updated.numFlats);
      }
      
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 border-b bg-white dark:bg-gray-950 glass-effect">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold">Title Splitting Calculator</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container py-8 px-4 md:py-12">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-1 bg-muted rounded-full mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary text-primary-foreground">
              Property Investment Tool
            </span>
          </div>
          <h1 className="title-heading mb-4">Multi-Unit Deal Analyzer for Title Splitting</h1>
          <p className="subtitle-text max-w-2xl mx-auto">
            Calculate the potential profit and return on investment when purchasing a block of flats, 
            refurbishing them, and creating individual titles to maximize value.
          </p>
        </div>

        {/* Property Link Extractor */}
        <div className="max-w-4xl mx-auto mb-8 animate-fadeIn">
          <PropertyLinkExtractor onDataExtracted={handleDataExtracted} />
        </div>

        {isMobile ? (
          // Mobile view with tabs
          <Tabs defaultValue="seller" className="w-full max-w-md mx-auto mb-8 animate-fadeIn animation-delay-300">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="seller" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Seller</span>
              </TabsTrigger>
              <TabsTrigger value="buyer" className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Buyer</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Finance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="seller">
              <SellerView onValuesChange={setSellerValues} />
            </TabsContent>
            
            <TabsContent value="buyer">
              <BuyerView sellerValues={sellerValues} onValuesChange={setBuyerValues} />
            </TabsContent>
            
            <TabsContent value="finance">
              <FinancingView sellerValues={sellerValues} buyerValues={buyerValues} />
            </TabsContent>
          </Tabs>
        ) : (
          // Desktop view with side-by-side cards
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fadeIn animation-delay-300">
            <SellerView onValuesChange={setSellerValues} />
            <BuyerView sellerValues={sellerValues} onValuesChange={setBuyerValues} />
            <FinancingView sellerValues={sellerValues} buyerValues={buyerValues} />
          </div>
        )}

        {/* Calculation Flow Indicators - Desktop Only */}
        {!isMobile && (
          <div className="hidden md:flex justify-center items-center mb-8 animate-fadeIn animation-delay-600">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Enter Property Data</span>
              <ArrowRight className="h-4 w-4" />
              <span>Calculate Costs</span>
              <ArrowRight className="h-4 w-4" />
              <span>View Profit Potential</span>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="animate-fadeIn animation-delay-600">
          <ResultsView sellerValues={sellerValues} buyerValues={buyerValues} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t glass-effect">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Title Splitting Calculator | A comprehensive property investment analysis tool</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
