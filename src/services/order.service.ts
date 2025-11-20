import {
  Order,
  OrderStatus,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderItem,
} from "../models/order.model";
import {
  DeliveryStatus,
  DeliveryStatusUpdate,
} from "../models/delivery-status.model";
import { saveOrder, findOrderById, updateOrderStatus } from "../db/order.db";
import { checkMultipleProductsAvailability } from "../clients/product-availability.client";
import { publishOrderCreated } from "./sales-delivery-publisher.service";
import { generateOrderId } from "../utils/id-generator";
import { logger } from "../utils/logger";

const calculateTotalAmount = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const createOrder = async (
  request: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  logger.info("Creating new order", { customerId: request.customerId });

  const allAvailable = await checkMultipleProductsAvailability(
    request.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))
  );

  if (!allAvailable) {
    logger.warn("Product availability check failed", {
      customerId: request.customerId,
    });
    throw new Error("One or more products are not available");
  }

  // Create order
  const orderId = generateOrderId();
  const totalAmount = calculateTotalAmount(request.items);

  const order: Order = {
    orderId,
    customerId: request.customerId,
    items: request.items,
    totalAmount,
    status: OrderStatus.PENDING_SHIPMENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await saveOrder(order);
  await publishOrderCreated(order);
  logger.info("Order created successfully", { orderId });

  return {
    orderId,
    status: OrderStatus.PENDING_SHIPMENT,
    message: "Order created successfully",
  };
};

export const updateDeliveryStatus = async (
  update: DeliveryStatusUpdate
): Promise<void> => {
  logger.info("Updating delivery status", update);

  const order = await findOrderById(update.orderId);

  if (!order) {
    logger.error("Order not found for status update", {
      orderId: update.orderId,
    });
    throw new Error(`Order ${update.orderId} not found`);
  }

  // Map delivery status to order status
  const newStatus =
    update.status === DeliveryStatus.SHIPPED
      ? OrderStatus.SHIPPED
      : OrderStatus.DELIVERED;

  await updateOrderStatus(update.orderId, newStatus);

  logger.info("Delivery status updated successfully", {
    orderId: update.orderId,
    newStatus,
  });
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  return await findOrderById(orderId);
};
