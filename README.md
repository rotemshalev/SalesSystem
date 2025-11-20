# Sales System - Order Processing Integration

Node.js/TypeScript implementation of the Sales System for order processing integration between Sales and Delivery.

## Project Structure
```
sales-system/
├── src/
│   ├── api/
│   │   ├── routes/           # API endpoints (orders, webhooks)
│   │   └── middlewares/      # Validation
│   ├── services/             # Business logic
│   ├── clients/              # External service clients (mocked)
│   ├── db/                   # In-memory data storage
│   ├── models/               # TypeScript types and interfaces
│   ├── utils/                # Logger, ID generator
│   ├── config/               # Configuration
│   └── app.ts                # Application entry point
└── tests/                    # Unit tests
```

## Installation & Setup
```bash
# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Run in development mode
npm run dev

# Build for production
npm run build
npm start

# Run tests
npm test
```

## API Endpoints

### Create Order
```bash
POST /api/orders
Content-Type: application/json

{
  "customerId": "CUST-123",
  "items": [
    { "productId": "PROD-1", "quantity": 2, "price": 50.00 }
  ]
}

Response: { "orderId": "ORD-xxx", "status": "Pending Shipment", "message": "..." }
```

### Get Order
```bash
GET /api/orders/:orderId
```

### Delivery Status Webhook
```bash
POST /api/webhooks/delivery-status
Content-Type: application/json

{
  "orderId": "ORD-xxx",
  "status": "Shipped"  // or "Delivered"
}
```

### Health Check
```bash
GET /health
```

## Design Decisions

### In-Memory Storage
Uses `Map` for data storage instead of a real database. Simple for the assignment scope and demonstrates the data access pattern. Can be easily swapped with PostgreSQL in production.

### Mocked Dependencies
- **Product Availability Client**: Returns mock responses
- **Delivery Publisher**: Logs events instead of publishing to RabbitMQ

## Testing

Unit tests included for the order service:
```bash
npm test                 # Run tests
```

## Environment Variables
```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```