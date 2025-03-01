
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SellerValues } from "./SellerView";
import { BuyerValues } from "./BuyerView";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, TrendingUp, Home, Banknote, Calculator, ChevronsUp, LineChart, PiggyBank } from "lucide-react";

interface ResultsViewProps {
  sellerValues: SellerValues;
  buyerValues: BuyerValues;
  className?: string;
}

export function ResultsView({ sellerValues, buyerValues, className }: ResultsViewProps) {
  // Calculate key values
  const totalCostsForBuyer = calculateTotalCosts(sellerValues, buyerValues);
  const estimatedBlockValueAfterRefurb = sellerValues.numFlats * 150000; // From the example, each flat revalued at £150,000
  const totalSpend = buyerValues.buyerOfferPrice + totalCostsForBuyer;
  const newValueCreated = estimatedBlockValueAfterRefurb - totalSpend;
  const refinancedValue = estimatedBlockValueAfterRefurb;
  const refinancedDeposit = refinancedValue * 0.25; // 25% deposit
  const refinancedMortgage = refinancedValue * 0.75; // 75% mortgage
  const cashReleased = refinancedMortgage - buyerValues.buyerOfferPrice;
  const profitOnSale = estimatedBlockValueAfterRefurb - totalSpend;

  function calculateTotalCosts(sellerValues: SellerValues, buyerValues: BuyerValues) {
    const totalRefurb = buyerValues.refurbishmentCost * sellerValues.numFlats;
    const totalLegalForTitleSplitting = buyerValues.legalCostForTitleSplitting * sellerValues.numFlats;
    const totalLegalForRefinancing = buyerValues.legalCostForRefinancing * sellerValues.numFlats;
    
    return totalRefurb + buyerValues.legalCostToBuy + totalLegalForTitleSplitting + 
           totalLegalForRefinancing + buyerValues.stampDutyLandTax;
  }

  return (
    <Card className={cn("w-full transition-all duration-300 ease-in-out card-hover-effect", className)}>
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-t-lg">
        <CardTitle className="font-bold text-2xl text-emerald-800 dark:text-emerald-400">
          Title Splitting Results
        </CardTitle>
        <CardDescription>
          Summary of the potential profit from title splitting strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SECTION 1: COSTS & VALUATION */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400">Costs & Valuation</h3>
            </div>
            
            <div className="space-y-3 border border-emerald-100 dark:border-emerald-900/40 rounded-md p-4">
              <h4 className="text-md font-medium">Initial Investment</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Purchase Price:</div>
                <div className="text-sm font-medium text-right">£{sellerValues.purchasePrice.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground">Total Costs:</div>
                <div className="text-sm font-medium text-right">£{totalCostsForBuyer.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground font-medium">Total Spent:</div>
                <div className="text-sm font-bold text-right">£{totalSpend.toLocaleString()}</div>
              </div>
              
              <Separator />
              
              <h4 className="text-md font-medium">Post-Refurb Valuation</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Each Flat Value After Refurb:</div>
                <div className="text-sm font-medium text-right">£150,000</div>
                
                <div className="text-sm text-muted-foreground font-medium">New Block Valuation:</div>
                <div className="text-sm font-bold text-right">£{estimatedBlockValueAfterRefurb.toLocaleString()}</div>
              </div>
              
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-md">
                <div className="text-sm text-emerald-800 dark:text-emerald-400 font-medium">New Value Created:</div>
                <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  £{newValueCreated.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-500">
                  This value will determine how much deposit can be recycled
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: BUY & SELL STRATEGY */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Banknote className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400">Buy & Sell Strategy</h3>
            </div>
            
            <div className="space-y-3 border border-amber-100 dark:border-amber-900/40 rounded-md p-4">
              <h4 className="text-md font-medium">Exit Strategy Analysis</h4>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ChevronsUp className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm font-medium">If Sold After Title Splitting</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-sm text-muted-foreground">Post-Refurb Value:</div>
                  <div className="text-sm font-medium text-right">£{estimatedBlockValueAfterRefurb.toLocaleString()}</div>
                  <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                  
                  <div className="text-sm text-muted-foreground">Less Total Outlay:</div>
                  <div className="text-sm font-medium text-right">£{totalSpend.toLocaleString()}</div>
                  <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                </div>
                
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                  <div className="text-sm text-amber-800 dark:text-amber-400 font-medium">Profit on Sale:</div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                    £{profitOnSale.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-900/40">
                <div className="flex items-center space-x-2">
                  <LineChart className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm font-medium">Return on Investment</span>
                </div>
                <div className="mt-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">ROI Percentage:</div>
                    <div className="font-medium text-right">{((profitOnSale / totalSpend) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: REFINANCE STRATEGY */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              <h3 className="text-lg font-semibold text-sky-800 dark:text-sky-400">Refinance Strategy</h3>
            </div>
            
            <div className="space-y-3 border border-sky-100 dark:border-sky-900/40 rounded-md p-4">
              <h4 className="text-md font-medium">Mortgage Options</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Refinanced Value:</div>
                <div className="text-sm font-medium text-right">£{refinancedValue.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground">Deposit (25%):</div>
                <div className="text-sm font-medium text-right">£{refinancedDeposit.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground">Mortgage Across All Flats:</div>
                <div className="text-sm font-medium text-right">£{refinancedMortgage.toLocaleString()}</div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Purchase Price:</div>
                <div className="text-sm font-medium text-right">£{buyerValues.buyerOfferPrice.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground">Total Investment:</div>
                <div className="text-sm font-medium text-right">£{totalSpend.toLocaleString()}</div>
              </div>
              
              <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-md">
                <div className="text-sm text-sky-800 dark:text-sky-400 font-medium">Cash Released After Refinancing:</div>
                <div className="text-lg font-bold text-sky-700 dark:text-sky-300">
                  £{Math.max(0, cashReleased).toLocaleString()}
                </div>
                <div className="text-xs text-sky-600 dark:text-sky-500">
                  {cashReleased > 0 
                    ? "You are taking capital out and potentially more" 
                    : "You need to leave some money in the deal"}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-sky-200 dark:border-sky-900/40">
                <div className="flex items-center space-x-2">
                  <PiggyBank className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                  <span className="text-sm font-medium">Money Left In Deal</span>
                </div>
                <div className="mt-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">Capital Remaining:</div>
                    <div className="font-medium text-right">£{Math.max(0, totalSpend - refinancedMortgage).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 border border-emerald-200 dark:border-emerald-900 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
          <h3 className="text-md font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Key Insights</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 dark:text-emerald-500">•</span>
              <span>The title splitting strategy creates an estimated <strong>£{newValueCreated.toLocaleString()}</strong> in additional value.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 dark:text-emerald-500">•</span>
              <span>If you choose to sell after refurbishment, you could realize a profit of <strong>£{profitOnSale.toLocaleString()}</strong>.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 dark:text-emerald-500">•</span>
              <span>Refinancing allows you to potentially withdraw <strong>£{Math.max(0, cashReleased).toLocaleString()}</strong> while still maintaining ownership of the asset.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 dark:text-emerald-500">•</span>
              <span>This property generates income while you hold it, providing an additional revenue stream beyond the capital gains.</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
