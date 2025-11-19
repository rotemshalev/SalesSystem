export enum OrderStatus {
  PENDING_SHIPMENT = "Pending Shipment",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
}

export interface CreateOrderResponse {
  orderId: string;
  status: OrderStatus;
  message: string;
}
