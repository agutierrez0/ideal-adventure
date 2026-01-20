# ideal-adventure
Repository for learning about containerizing applications

## Services

This project contains two microservices:

- **User Service** (port 3001): Manages user accounts and information
- **Payment Service** (port 3002): Handles payments and communicates with User Service

## Running Locally

1. Install dependencies for each service:
   ```bash
   cd user-service && npm install
   cd ../payment-service && npm install
   ```

2. Start the services:
   ```bash
   # Terminal 1
   cd user-service && npm start

   # Terminal 2
   cd payment-service && npm start
   ```

## Running with Docker Compose

Ensure Docker and Docker Compose are installed.

```bash
docker compose up --build
```

## API Endpoints

### User Service (http://localhost:3001)

- `POST /users` - Create a user
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
  - Response: `{ "id": 1 }`

- `GET /users/:id` - Get user by ID
  - Response: `{ "id": 1, "name": "John Doe", "email": "john@example.com" }`

### Payment Service (http://localhost:3002)

- `POST /payments` - Create a payment (verifies user exists)
  - Body: `{ "userId": 1, "amount": 100.0 }`
  - Response: `{ "id": 1, "status": "completed" }`

- `GET /payments/:id` - Get payment by ID
  - Response: `{ "id": 1, "userId": 1, "amount": 100.0, "status": "completed" }`
