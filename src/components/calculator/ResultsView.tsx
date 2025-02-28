
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SellerValues } from "./SellerView";
import { BuyerValues } from "./BuyerView";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, TrendingUp, Home, Banknote } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Value Post Title Splitting
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Purchase Price:</div>
                <div className="text-sm font-medium text-right">£{buyerValues.buyerOfferPrice.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground">Total Costs:</div>
                <div className="text-sm font-medium text-right">£{totalCostsForBuyer.toLocaleString()}</div>
                
                <div className="text-sm text-muted-foreground font-medium">Total Spent:</div>
                <div className="text-sm font-bold text-right">£{totalSpend.toLocaleString()}</div>
              </div>
              
              <Separator />
              
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

            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center">
                <Banknote className="mr-2 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Buy & Sell Strategy
              </h3>
              
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-sm text-muted-foreground">If Sold At:</div>
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
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center">
                <Home className="mr-2 h-5 w-5 text-sky-600 dark:text-sky-400" />
                Refinance Strategy
              </h3>
              
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
                <div className="text-sm text-muted-foreground">Total Spent:</div>
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
