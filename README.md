# Microservices dashboard

It's admin dashboard for this [microservices](https://github.com/Lomray-Software/microservices)

[![Quality Gate Status](https://sonarqube-proxy.lomray.com/status/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Reliability Rating](https://sonarqube-proxy.lomray.com/reliability/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Security Rating](https://sonarqube-proxy.lomray.com/security/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Technical Debt](https://sonarqube-proxy.lomray.com/techdept/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Vulnerabilities](https://sonarqube-proxy.lomray.com/vulnerabilities/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Lines of code](https://sonarqube-proxy.lomray.com/lines/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)
[![Code smells](https://sonarqube-proxy.lomray.com/codesmells/microservice-dashboard?token=78c4ed3db7ba9fdb116c3a3f41549d32)](https://sonarqube.lomray.com/dashboard?id=microservice-dashboard)

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
Configure environments variables through `.env.local`.   
Use `NODE_TLS_REJECT_UNAUTHORIZED=0` inside `.env.local` for skip SSL verification (WARNING: use it only for local development).
