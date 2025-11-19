import { Router, Request, Response } from "express";
import { createOrder, getOrderById } from "../../services/order.service";
import { validateOrderRequest } from "../middlewares/validation.middleware";
import { logger } from "../../utils/logger";

const router = Router();

// Create Order endpoint
router.post("/", validateOrderRequest, async (req: Request, res: Response) => {
  try {
    const result = await createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error("Failed to create order", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(400).json({
      error: error instanceof Error ? error.message : "Failed to create order",
    });
  }
});

// Get Order by ID endpoint
router.get("/:orderId", async (req: Request, res: Response) => {
  try {
    const order = await getOrderById(req.params.orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    logger.error("Failed to get order", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({ error: "Failed to retrieve order" });
  }
});

export default router;
