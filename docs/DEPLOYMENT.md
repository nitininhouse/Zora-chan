# 🚀 Deployment Guide

This guide covers deploying Zora-chan to different environments and platforms.

## 📋 Table of Contents

- [Overview](#overview)
- [Environment Setup](#environment-setup)
- [Vercel Deployment](#vercel-deployment)
- [Manual Deployment](#manual-deployment)
- [Environment Variables](#environment-variables)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## 🌐 Overview

Zora-chan supports multiple deployment environments:

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live application for end users

### Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │     Staging     │    │   Production    │
│                 │    │                 │    │                 │
│  localhost:3000 │    │ staging.vercel  │    │ zora-chan.vercel│
│                 │    │                 │    │                 │
│  Base Sepolia   │    │  Base Sepolia   │    │   Base Mainnet  │
│  (Testnet)      │    │  (Testnet)      │    │  (Production)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## ⚙️ Environment Setup

### Prerequisites

- Node.js 20+
- pnpm 8+
- Git
- Vercel CLI (for manual deployments)

### Required Accounts

1. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Connect your GitHub account

2. **Pinata Account**
   - Sign up at [pinata.cloud](https://pinata.cloud)
   - Create API keys for IPFS storage

3. **Base Network Access**
   - Add Base network to your wallet
   - Get testnet ETH from [Base Faucet](https://bridge.base.org/deposit)

## 🚀 Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link project
   vercel link
   ```

2. **Configure Environment Variables**

   In Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add the following variables:

   ```bash
   # Required for all environments
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key

   # Network configuration
   NEXT_PUBLIC_NETWORK=base-sepolia  # or 'base' for production

   # Registry addresses
   NEXT_PUBLIC_BASE_REGISTRY_ADDRESS=0x...
   NEXT_PUBLIC_BASE_SEPOLIA_REGISTRY_ADDRESS=0x...

   # App configuration
   NEXT_PUBLIC_APP_NAME=Zora-chan
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

3. **Deploy**

   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

### GitHub Actions Deployment

The project includes automated deployment via GitHub Actions:

- **Staging**: Deploys automatically on push to `develop` branch
- **Production**: Deploys automatically on push to `main` branch

#### Required GitHub Secrets

Add these secrets to your GitHub repository:

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Pinata Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

## 🛠️ Manual Deployment

### Build Process

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Build Application**

   ```bash
   pnpm build
   ```

3. **Start Production Server**
   ```bash
   pnpm start
   ```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:

```bash
# Build Docker image
docker build -t zora-chan .

# Run container
docker run -p 3000:3000 zora-chan
```

## 🔧 Environment Variables

### Development Environment

```bash
# .env.local
NEXT_PUBLIC_PINATA_API_KEY=your_dev_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_dev_secret_key
NEXT_PUBLIC_NETWORK=base-sepolia
NEXT_PUBLIC_BASE_SEPOLIA_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_DEBUG=true
NODE_ENV=development
```

### Staging Environment

```bash
# Vercel Environment Variables
NEXT_PUBLIC_PINATA_API_KEY=your_staging_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_staging_secret_key
NEXT_PUBLIC_NETWORK=base-sepolia
NEXT_PUBLIC_BASE_SEPOLIA_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_APP_URL=https://zora-chan-staging.vercel.app
NODE_ENV=production
```

### Production Environment

```bash
# Vercel Environment Variables
NEXT_PUBLIC_PINATA_API_KEY=your_prod_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_prod_secret_key
NEXT_PUBLIC_NETWORK=base
NEXT_PUBLIC_BASE_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_APP_URL=https://zora-chan.vercel.app
NODE_ENV=production
```

### Environment-Specific Configurations

| Variable              | Development    | Staging        | Production   |
| --------------------- | -------------- | -------------- | ------------ |
| `NEXT_PUBLIC_NETWORK` | `base-sepolia` | `base-sepolia` | `base`       |
| `NEXT_PUBLIC_DEBUG`   | `true`         | `false`        | `false`      |
| `NODE_ENV`            | `development`  | `production`   | `production` |

## 📊 Monitoring

### Application Monitoring

1. **Vercel Analytics**
   - Built-in performance monitoring
   - Real-time metrics
   - Error tracking

2. **Custom Monitoring**

   ```typescript
   // Add to your application
   import { Analytics } from '@vercel/analytics/react';

   export default function App() {
     return (
       <>
         <YourApp />
         <Analytics />
       </>
     );
   }
   ```

### Error Tracking

1. **Sentry Integration** (Optional)

   ```bash
   npm install @sentry/nextjs
   ```

   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

2. **Custom Error Handling**

   ```typescript
   // pages/_error.tsx
   import { NextPageContext } from 'next';

   interface ErrorProps {
     statusCode?: number;
   }

   function Error({ statusCode }: ErrorProps) {
     return (
       <div>
         <h1>Error {statusCode}</h1>
         <p>Something went wrong. Please try again.</p>
       </div>
     );
   }

   Error.getInitialProps = ({ res, err }: NextPageContext) => {
     const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
     return { statusCode };
   };

   export default Error;
   ```

### Performance Monitoring

1. **Web Vitals**

   ```typescript
   // pages/_app.tsx
   import { useEffect } from 'react';
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   function MyApp({ Component, pageProps }) {
     useEffect(() => {
       getCLS(console.log);
       getFID(console.log);
       getFCP(console.log);
       getLCP(console.log);
       getTTFB(console.log);
     }, []);

     return <Component {...pageProps} />;
   }
   ```

## 🔍 Troubleshooting

### Common Deployment Issues

1. **Build Failures**

   ```bash
   # Check build logs
   vercel logs

   # Local build test
   pnpm build
   ```

2. **Environment Variable Issues**

   ```bash
   # Verify environment variables
   vercel env ls

   # Pull environment variables
   vercel env pull .env.local
   ```

3. **Network Issues**

   ```bash
   # Check network configuration
   echo $NEXT_PUBLIC_NETWORK

   # Verify contract addresses
   echo $NEXT_PUBLIC_BASE_REGISTRY_ADDRESS
   ```

### Debugging Steps

1. **Check Build Logs**

   ```bash
   vercel logs --follow
   ```

2. **Verify Environment Variables**

   ```bash
   vercel env pull .env.local
   cat .env.local
   ```

3. **Test Locally**

   ```bash
   pnpm dev
   # Test all functionality
   ```

4. **Check Network Configuration**
   - Verify correct network in wallet
   - Check contract addresses
   - Test with small amounts first

### Performance Optimization

1. **Bundle Analysis**

   ```bash
   npm install -g @next/bundle-analyzer
   ANALYZE=true pnpm build
   ```

2. **Image Optimization**

   ```typescript
   import Image from 'next/image';

   // Use Next.js Image component
   <Image
     src="/logo.png"
     alt="Logo"
     width={200}
     height={200}
     priority
   />
   ```

3. **Code Splitting**

   ```typescript
   import dynamic from 'next/dynamic';

   // Lazy load components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

## 🔄 Rollback Strategy

### Automatic Rollback

Vercel automatically rolls back to the previous deployment if:

- Build fails
- Health checks fail
- Error rate exceeds threshold

### Manual Rollback

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Database Rollback

If using external databases:

1. Backup before deployment
2. Keep rollback scripts ready
3. Test rollback procedures

## 📈 Scaling

### Horizontal Scaling

- Vercel handles automatic scaling
- CDN distribution worldwide
- Edge functions for better performance

### Vertical Scaling

- Upgrade Vercel plan for more resources
- Optimize bundle size
- Use caching strategies

### Caching Strategy

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};
```

---

## 📞 Support

For deployment issues:

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: [Create an issue](https://github.com/your-username/zora-chan/issues)
- **Documentation**: [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Last updated**: January 2025
