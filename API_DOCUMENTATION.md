# 📚 MedicDrop API Documentation

Complete API reference for the MedicDrop healthcare platform.

## 🔗 Base URL

```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## 📋 API Endpoints

### 🔐 Authentication Routes

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "securepassword",
  "role": "patient",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+919876543210",
      "role": "patient"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/auth/login`
Login user with email/phone and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/auth/otp/send`
Send OTP to phone number.

**Request Body:**
```json
{
  "phone": "+919876543210"
}
```

#### POST `/auth/otp/verify`
Verify OTP and login.

**Request Body:**
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

### 👤 User Routes

#### GET `/users/profile`
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "role": "patient",
    "addresses": [...],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT `/users/profile`
Update user profile.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  ]
}
```

### 💊 Medicine Routes

#### GET `/medicines`
Get all medicines with pagination and search.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `category` (optional): Medicine category
- `inStock` (optional): Filter by stock availability

**Example:**
```http
GET /api/medicines?search=paracetamol&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "medicines": [
      {
        "id": "medicine_id",
        "name": "Paracetamol 500mg",
        "salt": "Paracetamol",
        "category": "Pain Relief",
        "price": 25.50,
        "inStock": true,
        "description": "Pain relief medicine",
        "manufacturer": "ABC Pharma"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET `/medicines/:id`
Get medicine by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "medicine_id",
    "name": "Paracetamol 500mg",
    "salt": "Paracetamol",
    "category": "Pain Relief",
    "price": 25.50,
    "inStock": true,
    "description": "Pain relief medicine",
    "manufacturer": "ABC Pharma",
    "dosage": "1-2 tablets",
    "sideEffects": ["Nausea", "Dizziness"],
    "interactions": ["Warfarin", "Alcohol"]
  }
}
```

### 📋 Prescription Routes

#### POST `/prescriptions/upload`
Upload prescription image for OCR processing.

**Request:** Multipart form data
- `image`: Prescription image file
- `userId`: User ID

**Response:**
```json
{
  "success": true,
  "message": "Prescription uploaded successfully",
  "data": {
    "prescriptionId": "prescription_id",
    "imageUrl": "https://cloudinary.com/image.jpg",
    "extractedText": "Paracetamol 500mg 2 times daily",
    "medicines": [
      {
        "name": "Paracetamol 500mg",
        "dosage": "2 times daily",
        "duration": "5 days"
      }
    ]
  }
}
```

#### GET `/prescriptions/user/:userId`
Get user's prescriptions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prescription_id",
      "imageUrl": "https://cloudinary.com/image.jpg",
      "extractedText": "Paracetamol 500mg 2 times daily",
      "medicines": [...],
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 🛒 Order Routes

#### POST `/orders`
Create new order.

**Request Body:**
```json
{
  "items": [
    {
      "medicineId": "medicine_id",
      "quantity": 2,
      "price": 25.50
    }
  ],
  "prescriptionId": "prescription_id",
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "paymentMethod": "cod"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "order_id",
    "totalAmount": 51.00,
    "status": "pending",
    "estimatedDelivery": "2024-01-02T00:00:00.000Z"
  }
}
```

#### GET `/orders/user/:userId`
Get user's orders.

**Query Parameters:**
- `status` (optional): Filter by order status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_id",
        "items": [...],
        "totalAmount": 51.00,
        "status": "delivered",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "deliveredAt": "2024-01-02T00:00:00.000Z"
      }
    ],
    "pagination": {...}
  }
}
```

#### GET `/orders/:id`
Get order by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_id",
    "items": [...],
    "totalAmount": 51.00,
    "status": "delivered",
    "tracking": {
      "currentStatus": "delivered",
      "timeline": [
        {
          "status": "placed",
          "timestamp": "2024-01-01T00:00:00.000Z"
        },
        {
          "status": "confirmed",
          "timestamp": "2024-01-01T01:00:00.000Z"
        },
        {
          "status": "delivered",
          "timestamp": "2024-01-02T00:00:00.000Z"
        }
      ]
    }
  }
}
```

### 🏥 Pharmacy Routes

#### GET `/pharmacy/orders`
Get pharmacy orders.

**Query Parameters:**
- `status` (optional): Filter by order status
- `page` (optional): Page number
- `limit` (optional): Items per page

#### PUT `/pharmacy/orders/:id/status`
Update order status.

**Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Order confirmed and ready for packing"
}
```

#### GET `/pharmacy/inventory`
Get pharmacy inventory.

**Response:**
```json
{
  "success": true,
  "data": {
    "medicines": [...],
    "lowStock": [...],
    "outOfStock": [...]
  }
}
```

### 🚚 Delivery Routes

#### GET `/delivery/orders`
Get assigned delivery orders.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id",
      "customerName": "John Doe",
      "customerPhone": "+919876543210",
      "deliveryAddress": {...},
      "pickupAddress": {...},
      "status": "assigned",
      "estimatedDelivery": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

#### PUT `/delivery/orders/:id/status`
Update delivery status.

**Request Body:**
```json
{
  "status": "picked_up",
  "location": {
    "lat": 19.0760,
    "lng": 72.8777
  },
  "notes": "Order picked up from pharmacy"
}
```

### 👨‍💼 Admin Routes

#### GET `/admin/dashboard`
Get admin dashboard data.

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 1000,
      "totalOrders": 5000,
      "totalRevenue": 250000,
      "activePharmacies": 50
    },
    "recentOrders": [...],
    "topMedicines": [...],
    "regionalData": [...]
  }
}
```

#### GET `/admin/users`
Get all users with pagination.

**Query Parameters:**
- `role` (optional): Filter by user role
- `page` (optional): Page number
- `limit` (optional): Items per page

#### PUT `/admin/users/:id/status`
Update user status.

**Request Body:**
```json
{
  "status": "active",
  "reason": "Account verified"
}
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

## 🔒 Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTHENTICATION_ERROR` | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `DUPLICATE_ERROR` | Resource already exists |
| `SERVER_ERROR` | Internal server error |

## 📝 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **File Upload**: 10 requests per hour per user

## 🔄 Webhooks

### Order Status Updates
```json
{
  "event": "order.status.updated",
  "data": {
    "orderId": "order_id",
    "status": "delivered",
    "timestamp": "2024-01-02T00:00:00.000Z"
  }
}
```

### Payment Updates
```json
{
  "event": "payment.completed",
  "data": {
    "orderId": "order_id",
    "paymentId": "payment_id",
    "amount": 51.00,
    "status": "success"
  }
}
```

## 🧪 Testing

### Test Environment
```
Base URL: https://api-staging.medicdrop.com/api
```

### Sample Test Data
```json
{
  "testUser": {
    "email": "test@medicdrop.com",
    "password": "testpassword123"
  },
  "testMedicine": {
    "id": "test_medicine_id",
    "name": "Test Medicine"
  }
}
```

## 📞 Support

For API support:
- **Email**: api-support@medicdrop.com
- **Documentation**: https://docs.medicdrop.com
- **Status Page**: https://status.medicdrop.com

---

**MedicDrop API** - Powering healthcare delivery! 🚀💊
