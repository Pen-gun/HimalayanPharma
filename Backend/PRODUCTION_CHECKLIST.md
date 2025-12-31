# Production Deployment Checklist

## ✅ Security Features Implemented

### Application Security
- ✅ **Helmet** - Security headers configured
- ✅ **Rate Limiting** - Global (100 req/15min) + Auth routes (5 req/15min)
- ✅ **CORS** - Environment-based origin validation
- ✅ **MongoDB Sanitization** - NoSQL injection protection
- ✅ **Input Validation** - Express-validator on all routes
- ✅ **Error Handling** - Global error handler with safe error messages
- ✅ **Body Parser Limits** - 10MB max request size
- ✅ **Compression** - Response compression enabled

### Authentication & Authorization
- ✅ **JWT** - Token-based authentication
- ✅ **bcryptjs** - Password hashing
- ✅ **Auth Middleware** - Protected routes implementation

## 📋 Pre-Deployment Checklist

### Environment Configuration
- [ ] Create production `.env` file (do NOT commit to git)
- [ ] Set `NODE_ENV=production`
- [ ] Update `MONGODB_URL` with production MongoDB Atlas connection
- [ ] Generate strong `JWT_SECRET` (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- [ ] Set `FRONTEND_URL` to production frontend domain
- [ ] Update `PORT` if needed (default: 5000)

### Database
- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with appropriate permissions
- [ ] IP whitelist configured (or allow all: 0.0.0.0/0)
- [ ] Run seed script on production DB: `npm run seed`
- [ ] Verify database indexes are created
- [ ] Set up database backups

### Security
- [ ] Change default JWT secret
- [ ] Review and adjust rate limiting based on expected traffic
- [ ] Configure CORS for production domain only
- [ ] Review error messages (no sensitive data exposure)
- [ ] Enable HTTPS (handle via reverse proxy/hosting platform)
- [ ] Set up SSL certificates

### Code Quality
- [ ] Remove all console.log statements from production code
- [ ] Remove unused dependencies
- [ ] Run security audit: `npm audit`
- [ ] Fix any high/critical vulnerabilities
- [ ] Test all API endpoints
- [ ] Verify error handling works correctly

### Monitoring & Logging
- [ ] Set up application monitoring (e.g., PM2, New Relic, Datadog)
- [ ] Configure log aggregation (e.g., Winston, Morgan to file)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor database performance
- [ ] Set up uptime monitoring

### Performance
- [ ] Enable compression (already configured)
- [ ] Optimize database queries (.lean() on read-only operations)
- [ ] Set up CDN for static assets if needed
- [ ] Configure caching headers
- [ ] Load testing completed

## 🚀 Deployment Options

### Option 1: Traditional VPS (DigitalOcean, Linode, AWS EC2)
```bash
# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone repository
git clone <your-repo-url>
cd Backend

# Install dependencies
npm ci --production

# Set up environment variables
nano .env  # Add production values

# Start with PM2
pm2 start src/index.js --name "himalayan-api"
pm2 startup
pm2 save

# Set up Nginx reverse proxy
sudo apt-get install nginx
# Configure Nginx to proxy port 80/443 to your app port
```

### Option 2: Heroku
```bash
# Install Heroku CLI
# Login: heroku login

# Create app
heroku create himalayan-pharma-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URL=<your-mongodb-url>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set FRONTEND_URL=<your-frontend-url>

# Deploy
git push heroku main
```

### Option 3: Railway.app
1. Connect GitHub repository
2. Select Backend folder as root
3. Add environment variables in Railway dashboard
4. Deploy automatically on git push

### Option 4: Render.com
1. Create new Web Service
2. Connect repository
3. Root directory: `Backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### Option 5: AWS Elastic Beanstalk / Google Cloud Run / Azure App Service
Follow respective platform documentation for Node.js deployment.

## 🔐 Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/himalayanpharma?retryWrites=true&w=majority

# JWT
JWT_SECRET=<64-character-random-string>
JWT_EXPIRE=30d

# Frontend (CORS)
FRONTEND_URL=https://yourdomain.com
```

## 🧪 Testing Before Production

```bash
# Development
npm run dev

# Production simulation (local)
NODE_ENV=production npm start

# Test endpoints
curl http://localhost:5000/api/v1/health
curl http://localhost:5000/api/v1/categories
curl http://localhost:5000/api/v1/products/featured
curl http://localhost:5000/api/v1/blog?limit=3

# Load testing (optional)
npm install -g autocannon
autocannon -c 100 -d 30 http://localhost:5000/api/v1/health
```

## 📊 Monitoring Commands (with PM2)

```bash
# View logs
pm2 logs himalayan-api

# Monitor resources
pm2 monit

# Restart
pm2 restart himalayan-api

# View status
pm2 status

# View detailed info
pm2 describe himalayan-api
```

## 🔄 CI/CD Setup (GitHub Actions Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd Backend && npm ci
      - run: cd Backend && npm audit
      # Add deployment steps based on your platform
```

## 📝 Post-Deployment

- [ ] Verify all endpoints are accessible
- [ ] Test authentication flow
- [ ] Monitor error logs for first 24 hours
- [ ] Set up automated backups
- [ ] Document API endpoints (Swagger/Postman)
- [ ] Create incident response plan
- [ ] Set up alerting for downtime

## 🆘 Rollback Plan

```bash
# With PM2
pm2 stop himalayan-api
git reset --hard <previous-commit>
npm install
pm2 restart himalayan-api

# With Heroku
heroku rollback

# With Railway/Render
Use dashboard to redeploy previous version
```

## 📞 Support & Maintenance

- Regular security updates: `npm audit fix`
- Monthly dependency updates: `npm outdated`
- Database backups: Configure automated daily backups
- SSL certificate renewal: Set up auto-renewal
- Monitor disk space and database size

---

**Current Status**: ✅ Application is production-ready with all security features enabled

**Last Updated**: December 31, 2025
