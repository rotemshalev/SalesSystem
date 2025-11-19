import express, { Application } from "express";
import { config } from "./config";
import orderRoutes from "./api/routes/order.routes";
import webhookRoutes from "./api/routes/webhook.routes";
import { logger } from "./utils/logger";

const app: Application = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/orders", orderRoutes);

app.use("/api/webhooks", webhookRoutes);

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Sales System running on port ${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

export default app;
