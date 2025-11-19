import { Router, Request, Response } from "express";
import { updateDeliveryStatus } from "../../services/order.service";
import { validateDeliveryStatusUpdate } from "../middlewares/validation.middleware";
import { logger } from "../../utils/logger";

const router = Router();

router.post(
  "/delivery-status",
  validateDeliveryStatusUpdate,
  async (req: Request, res: Response) => {
    try {
      await updateDeliveryStatus(req.body);
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      logger.error("Failed to update delivery status", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "Failed to update status",
      });
    }
  }
);

export default router;
