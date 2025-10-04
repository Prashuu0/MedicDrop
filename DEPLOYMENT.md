# 🚀 MedicDrop Deployment Guide

This guide covers deploying the MedicDrop platform to production environments.

## 🌐 Production Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Vercel)      │◄──►│   (Railway)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   Redis Cache   │    │   File Storage  │
│   (Cloudflare)  │    │   (Railway)     │    │   (Cloudinary)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Prerequisites

### Required Services
- **Frontend Hosting**: Vercel, Netlify, or AWS S3
- **Backend Hosting**: Railway, Heroku, or AWS EC2
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary or AWS S3
- **CDN**: Cloudflare
- **Domain**: Custom domain (optional)

### Required API Keys
- Google Vision API (OCR)
- Google Maps API (Delivery tracking)
- Twilio (SMS/OTP)
- Razorpay (Payments)
- Cloudinary (File uploads)

## 📦 Environment Setup

### 1. Backend Environment Variables

Create `.env` file in backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medicdrop

# JWT
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=https://your-domain.com

# External APIs
GOOGLE_VISION_API_KEY=your_google_vision_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# SMS/OTP
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Redis (Optional)
REDIS_URL=your_redis_url
```

### 2. Frontend Environment Variables

Create `.env` file in frontend directory:

```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

## 🚀 Deployment Steps

### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize project
   railway init
   
   # Set environment variables
   railway variables set MONGODB_URI=your_mongodb_uri
   railway variables set JWT_SECRET=your_jwt_secret
   # ... set all other variables
   
   # Deploy
   railway up
   ```

3. **Configure Domain**
   - Go to Railway dashboard
   - Add custom domain
   - Configure SSL certificate

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   cd frontend
   vercel
   
   # Set environment variables
   vercel env add REACT_APP_API_URL
   vercel env add REACT_APP_GOOGLE_MAPS_API_KEY
   # ... add all other variables
   ```

3. **Configure Domain**
   - Go to Vercel dashboard
   - Add custom domain
   - Configure DNS settings

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster

2. **Configure Database**
   ```bash
   # Connect to cluster
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/medicdrop"
   
   # Create collections
   use medicdrop
   db.createCollection("users")
   db.createCollection("orders")
   db.createCollection("medicines")
   db.createCollection("prescriptions")
   ```

3. **Set Up Indexes**
   ```javascript
   // Create indexes for better performance
   db.users.createIndex({ email: 1 })
   db.users.createIndex({ phone: 1 })
   db.orders.createIndex({ userId: 1 })
   db.orders.createIndex({ status: 1 })
   db.medicines.createIndex({ name: "text" })
   ```

## 🔧 Production Configuration

### 1. Security Headers

Add to backend server:

```javascript
// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Error Handling

```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});
```

### 4. Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 📊 Monitoring & Analytics

### 1. Application Monitoring

- **Sentry**: Error tracking and performance monitoring
- **New Relic**: Application performance monitoring
- **Uptime Robot**: Uptime monitoring

### 2. Database Monitoring

- **MongoDB Atlas**: Built-in monitoring
- **MongoDB Compass**: Database management
- **Atlas Charts**: Data visualization

### 3. Frontend Monitoring

- **Vercel Analytics**: Performance metrics
- **Google Analytics**: User behavior tracking
- **Hotjar**: User experience insights

## 🔒 Security Checklist

### Backend Security
- [ ] Environment variables secured
- [ ] JWT secrets are strong and unique
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] HTTPS enforced
- [ ] Security headers configured

### Frontend Security
- [ ] API keys not exposed in client code
- [ ] Sensitive data not stored in localStorage
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] XSS protection enabled

### Database Security
- [ ] Database access restricted by IP
- [ ] Strong authentication credentials
- [ ] Regular backups configured
- [ ] Encryption at rest enabled
- [ ] Network access restricted

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```javascript
   // Fix CORS configuration
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

2. **Database Connection Issues**
   ```javascript
   // Check MongoDB connection
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```

3. **Environment Variables Not Loading**
   ```javascript
   // Verify environment variables
   console.log('Environment:', process.env.NODE_ENV);
   console.log('Database URL:', process.env.MONGODB_URI ? 'Set' : 'Not set');
   ```

### Performance Optimization

1. **Database Optimization**
   - Create proper indexes
   - Use connection pooling
   - Implement caching with Redis

2. **Frontend Optimization**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement code splitting
   - Optimize images

3. **API Optimization**
   - Implement pagination
   - Use database aggregation
   - Cache frequently accessed data
   - Implement request batching

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement microservices architecture
- Use container orchestration (Docker + Kubernetes)

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies

### Database Scaling
- Use MongoDB sharding
- Implement read replicas
- Use database clustering

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: railway up --service backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
```

## 📞 Support

For deployment issues:
- Check logs in hosting platform
- Verify environment variables
- Test API endpoints
- Check database connectivity
- Review security configurations

---

**MedicDrop** - Deployed and ready to serve! 🚀🏥
