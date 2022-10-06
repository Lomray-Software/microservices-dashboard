# Microservices dashboard

It's admin dashboard for this [microservices](https://github.com/Lomray-Software/microservices)

![npm](https://img.shields.io/npm/v/@lomray/microservices-dashboard)
![GitHub](https://img.shields.io/github/license/Lomray-Software/microservices-dashboard)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=microservices-dashboard&metric=coverage)](https://sonarcloud.io/summary/new_code?id=microservices-dashboard)

Install it and run (development):

```bash
npm ci
npm start
```

## Structure
- `constants/index` - configure application constants
- `constants/menu` - configure site menu
- `constants/routes` - configure site routes

## SSR (isomorphic, root: @server/document) - current
```bash
npm run build
npm run start:prod
```

## SPA (root: ./src/index.html)
```bash
npm run build:spa
serve -s build/public
```

## SSG (root: each .html in build/public)
```typescript
/**
 * NOTE: Please uncomment lines with ssg comment in:
 * @see asyncRouteComponentWrapper
 */
```
```bash
npm run build
serve build/public
```

## Local development
Configure environments variables through `.env.local` (copy from `.env.local.example`).   
Use `NODE_TLS_REJECT_UNAUTHORIZED=0` inside `.env.local` for skip SSL verification (WARNING: use it only for local development).
