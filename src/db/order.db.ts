import { Order, OrderStatus } from "../models/order.model";
import { logger } from "../utils/logger";

const orders = new Map<string, Order>();

export const saveOrder = async (order: Order): Promise<Order> => {
  orders.set(order.orderId, order);
  logger.info("Order saved to database", { orderId: order.orderId });
  return order;
};

export const findOrderById = async (orderId: string): Promise<Order | null> => {
  const order = orders.get(orderId);
  return order || null;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<Order | null> => {
  const order = orders.get(orderId);

  if (!order) {
    logger.warn("Order not found for status update", { orderId });
    return null;
  }

  order.status = status;
  order.updatedAt = new Date();

  orders.set(orderId, order);
  logger.info("Order status updated", { orderId, status });

  return order;
};
