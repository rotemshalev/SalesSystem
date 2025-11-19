import { createOrder } from "../src/services/order.service";
import { CreateOrderRequest } from "../src/models/order.model";

describe("OrderService", () => {
  describe("createOrder", () => {
    it("should create an order successfully", async () => {
      const request: CreateOrderRequest = {
        customerId: "CUST-123",
        items: [
          { productId: "PROD-1", quantity: 2, price: 50 },
          { productId: "PROD-2", quantity: 1, price: 100 },
        ],
      };

      const result = await createOrder(request);

      expect(result).toHaveProperty("orderId");
      expect(result.orderId).toMatch(/^ORD-/);
      expect(result.status).toBe("Pending Shipment");
      expect(result.message).toBe("Order created successfully");
    });

    it("should throw error for invalid customer ID", async () => {
      const request: CreateOrderRequest = {
        customerId: "",
        items: [{ productId: "PROD-1", quantity: 1, price: 50 }],
      };

      await expect(createOrder(request)).rejects.toThrow(
        "Customer ID is required"
      );
    });

    it("should throw error for empty items", async () => {
      const request: CreateOrderRequest = {
        customerId: "CUST-123",
        items: [],
      };

      await expect(createOrder(request)).rejects.toThrow(
        "Order must contain at least one item"
      );
    });

    it("should throw error for invalid quantity", async () => {
      const request: CreateOrderRequest = {
        customerId: "CUST-123",
        items: [{ productId: "PROD-1", quantity: 0, price: 50 }],
      };

      await expect(createOrder(request)).rejects.toThrow(
        "Quantity must be greater than 0"
      );
    });
  });
});
