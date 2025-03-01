
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ScraperService } from "@/utils/ScraperService";
import { useToast } from "@/hooks/use-toast";
import { Link, Globe, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SellerValues } from "./calculator/SellerView";

interface PropertyLinkExtractorProps {
  onDataExtracted: (data: Partial<SellerValues>) => void;
  className?: string;
}

export function PropertyLinkExtractor({ onDataExtracted, className }: PropertyLinkExtractorProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastExtracted, setLastExtracted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExtract = async () => {
    // Reset states
    setError(null);
    
    if (!url.trim()) {
      setError("Please enter a property listing URL");
      toast({
        id: "empty-url-error",
        title: "Error",
        description: "Please enter a property listing URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLastExtracted(null);
    
    console.log("Starting extraction from URL:", url);
    
    try {
      // Try to validate URL format client-side first
      try {
        new URL(url); // Will throw if invalid
      } catch (e) {
        setError("Invalid URL format. Make sure it starts with http:// or https://");
        setIsLoading(false);
        toast({
          id: "invalid-url-format",
          title: "Invalid URL",
          description: "Please enter a valid URL starting with http:// or https://",
          variant: "destructive",
        });
        return;
      }
      
      const result = await ScraperService.scrapePropertyData(url);
      console.log("Extraction result:", result);
      
      if (result.success && result.data) {
        const extractedData: Partial<SellerValues> = {};
        
        if (result.data.price) {
          extractedData.purchasePrice = result.data.price;
        }
        
        if (result.data.numUnits) {
          extractedData.numFlats = result.data.numUnits;
          
          // Calculate average price per flat if both price and units are available
          if (result.data.price && result.data.numUnits) {
            extractedData.averagePricePerFlat = Math.round(result.data.price / result.data.numUnits);
          }
        }
        
        console.log("Updating calculator with extracted data:", extractedData);
        onDataExtracted(extractedData);
        setLastExtracted(new URL(url).hostname);
        
        toast({
          id: "extraction-success",
          title: "Success",
          description: `Data extracted from ${new URL(url).hostname}`,
        });
      } else {
        console.error("Extraction failed:", result.error);
        setError(result.error || "Could not extract property data");
        toast({
          id: "extraction-failed",
          title: "Extraction Failed",
          description: result.error || "Could not extract property data",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to process the URL";
      console.error("Error during extraction:", errorMessage);
      setError(errorMessage);
      toast({
        id: "extraction-error",
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("w-full transition-all duration-300", className)}>
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-t-lg">
        <CardTitle className="text-xl text-violet-800 dark:text-violet-400 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Property Listing Extractor
        </CardTitle>
        <CardDescription>
          Paste a property listing URL to automatically extract information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.rightmove.co.uk/property-for-sale/..."
              className={cn("pl-9 w-full", error ? "border-red-300 focus-visible:ring-red-300" : "")}
            />
          </div>
          <Button 
            onClick={handleExtract} 
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 text-white w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting
              </>
            ) : (
              "Extract Data"
            )}
          </Button>
        </div>
        
        {error ? (
          <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-2">
            Supports property listings from Rightmove, Zoopla, OnTheMarket, and other popular platforms
          </p>
        )}
      </CardContent>
      
      {lastExtracted && (
        <CardFooter className="bg-green-50 dark:bg-green-900/20 rounded-b-lg px-6 py-3">
          <div className="flex items-center text-green-700 dark:text-green-400 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Successfully extracted data from {lastExtracted}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
