import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest } from "../../models/order.model";

export const validateOrderRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body as CreateOrderRequest;

  // Check if body exists
  if (!body) {
    res.status(400).json({ error: "Request body is required" });
    return;
  }

  // Validate customerId
  if (
    !body.customerId ||
    typeof body.customerId !== "string" ||
    body.customerId.trim() === ""
  ) {
    res.status(400).json({ error: "Valid customerId is required" });
    return;
  }

  // Validate items array
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    res.status(400).json({ error: "Order must contain at least one item" });
    return;
  }

  // Validate each item
  for (let i = 0; i < body.items.length; i++) {
    const item = body.items[i];

    if (
      !item.productId ||
      typeof item.productId !== "string" ||
      item.productId.trim() === ""
    ) {
      res.status(400).json({ error: `Item ${i + 1}: productId is required` });
      return;
    }

    if (
      typeof item.quantity !== "number" ||
      item.quantity <= 0 ||
      !Number.isInteger(item.quantity)
    ) {
      res
        .status(400)
        .json({ error: `Item ${i + 1}: quantity must be a positive integer` });
      return;
    }

    if (typeof item.price !== "number" || item.price < 0) {
      res
        .status(400)
        .json({ error: `Item ${i + 1}: price must be a non-negative number` });
      return;
    }
  }

  next();
};

export const validateDeliveryStatusUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { orderId, status } = req.body;

  if (!orderId || typeof orderId !== "string" || orderId.trim() === "") {
    res.status(400).json({ error: "Valid orderId is required" });
    return;
  }

  if (!status || !["Shipped", "Delivered"].includes(status)) {
    res
      .status(400)
      .json({ error: 'Status must be either "Shipped" or "Delivered"' });
    return;
  }

  next();
};
