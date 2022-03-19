# Microservices dashboard

It's admin dashboard for this [microservices](https://github.com/Lomray-Software/microservices)

[![Quality Gate Status](https://sonarqube-proxy.lomray.com/status/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Reliability Rating](https://sonarqube-proxy.lomray.com/reliability/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Security Rating](https://sonarqube-proxy.lomray.com/security/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Technical Debt](https://sonarqube-proxy.lomray.com/techdept/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Vulnerabilities](https://sonarqube-proxy.lomray.com/vulnerabilities/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Lines of code](https://sonarqube-proxy.lomray.com/lines/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)
[![Code smells](https://sonarqube-proxy.lomray.com/codesmells/microservices-dashboard?token=4ecf364ac12c63753dfa28efa050c247)](https://sonarqube.lomray.com/dashboard?id=microservices-dashboard)

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
