import { logger } from "../utils/logger";

interface ProductAvailabilityRequest {
  productId: string;
  quantity: number;
}

interface ProductAvailabilityResponse {
  productId: string;
  available: boolean;
  availableQuantity: number;
}

export const checkProductAvailability = async (
  productId: string,
  quantity: number
): Promise<boolean> => {
  try {
    // Mock implementation
    logger.info("Checking product availability", { productId, quantity });

    const mockResponse: ProductAvailabilityResponse = {
      productId,
      available: true,
      availableQuantity: 100,
    };

    logger.info("Product availability check successful", mockResponse);
    return mockResponse.available && mockResponse.availableQuantity >= quantity;
  } catch (error) {
    logger.error("Product availability check failed", {
      productId,
      quantity,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(`Failed to check product availability for ${productId}`);
  }
};

export const checkMultipleProductsAvailability = async (
  items: ProductAvailabilityRequest[]
): Promise<boolean> => {
  try {
    const checks = items.map((item) =>
      checkProductAvailability(item.productId, item.quantity)
    );

    const results = await Promise.all(checks);
    return results.every((result) => result === true);
  } catch (error) {
    logger.error("Multiple product availability check failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
};
