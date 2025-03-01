
interface ScrapeResult {
  success: boolean;
  data?: {
    price?: number;
    numUnits?: number;
    address?: string;
  };
  error?: string;
}

export class ScraperService {
  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static cleanUrl(url: string): string {
    // Remove any trailing slashes, query parameters, or fragments
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.origin}${parsedUrl.pathname.replace(/\/$/, '')}`;
    } catch (e) {
      return url; // Return original if parsing fails
    }
  }

  private static getDomainFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.toLowerCase();
    } catch (e) {
      console.error('Error extracting domain:', e);
      return '';
    }
  }

  static async scrapePropertyData(url: string): Promise<ScrapeResult> {
    if (!this.isValidUrl(url)) {
      console.error('Invalid URL format:', url);
      return { success: false, error: "Invalid URL format" };
    }

    const cleanedUrl = this.cleanUrl(url);
    console.log('Cleaned URL for scraping:', cleanedUrl);
    
    try {
      console.log('Attempting to scrape data from URL:', cleanedUrl);
      
      // In a real implementation, this would call an API endpoint
      // For demo purposes, we'll simulate the extraction with a timeout
      return new Promise((resolve) => {
        setTimeout(() => {
          // Extract domain to simulate different responses based on site
          const domain = this.getDomainFromUrl(cleanedUrl);
          console.log('Detected domain:', domain);
          
          // Simulate different data for different domains
          if (domain.includes("rightmove")) {
            console.log('Processing Rightmove URL');
            resolve({
              success: true,
              data: {
                price: 685000,
                numUnits: 7,
                address: "123 Property Street, London"
              }
            });
          } else if (domain.includes("zoopla")) {
            console.log('Processing Zoopla URL');
            resolve({
              success: true,
              data: {
                price: 725000,
                numUnits: 8,
                address: "456 Real Estate Road, Manchester"
              }
            });
          } else if (domain.includes("onthemarket")) {
            console.log('Processing OnTheMarket URL, extracting data...');
            // For onthemarket.com, extract the listing ID to make it more realistic
            let listingId = "unknown";
            try {
              // Try to extract listing ID from URL path
              const matches = cleanedUrl.match(/\/details\/(\d+)/);
              if (matches && matches[1]) {
                listingId = matches[1];
                console.log('Extracted OnTheMarket listing ID:', listingId);
              }
            } catch (e) {
              console.error('Error extracting listing ID:', e);
            }
            
            resolve({
              success: true,
              data: {
                price: 750000,
                numUnits: 9,
                address: `789 Investment Avenue, Birmingham (Listing #${listingId})`
              }
            });
          } else {
            // Generic response for other domains
            console.log('Unknown property site, using generic data for domain:', domain);
            resolve({
              success: true,
              data: {
                price: 700000,
                numUnits: 8,
                address: `999 Default Property, Leeds (from ${domain})`
              }
            });
          }
        }, 1500); // Simulate API delay
      });
    } catch (error) {
      console.error('Error during property data extraction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract data"
      };
    }
  }
}
