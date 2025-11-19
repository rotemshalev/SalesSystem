import { Order } from "../models/order.model";
import { logger } from "../utils/logger";

interface DeliveryOrderPayload {
  orderId: string;
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  createdAt: Date;
}

export const publishOrderCreated = async (order: Order): Promise<void> => {
  const payload: DeliveryOrderPayload = {
    orderId: order.orderId,
    customerId: order.customerId,
    items: order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    createdAt: order.createdAt,
  };

  try {
    // Mock implementation
    logger.info("Publishing order to delivery system", {
      orderId: order.orderId,
    });
    logger.info("[MOCK] Order published to delivery queue", payload);

    // In real implementation:
    // await client.post('/orders', payload);
  } catch (error) {
    logger.error("Failed to publish order to delivery system", {
      orderId: order.orderId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      `Failed to publish order ${order.orderId} to delivery system`
    );
  }
};
