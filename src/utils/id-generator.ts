import { v4 as uuidv4 } from "uuid";

export const generateOrderId = (): string => {
  return `ORD-${uuidv4()}`;
};
