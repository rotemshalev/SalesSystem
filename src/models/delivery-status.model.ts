export enum DeliveryStatus {
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
}

export interface DeliveryStatusUpdate {
  orderId: string;
  status: DeliveryStatus;
  timestamp?: Date;
}
