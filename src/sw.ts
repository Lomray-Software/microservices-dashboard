import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

const apiDomain = process.env.RAZZLE_API_DOMAIN || '';
const adminUrlRegexp = new RegExp(`^${apiDomain}`, 'i');
const fileExtensionRegexp = /[^/?]+\\.[^/]+$/;
const isSPA = process.env.BUILD_TYPE === 'spa';

/**
 * PWA service worker
 */

void self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Cache app-shell
 */
registerRoute(
  // Return false to exempt requests from being fulfilled by /app-shell.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (fileExtensionRegexp.test(url.pathname)) {
      return false;
    }

    /**
     *  Return true to signal that we want to use the handler.
     *  true - online mode, preferred use network
     *  false - offline mode, use cache
     */
    return !navigator.onLine;
  },
  createHandlerBoundToURL(isSPA ? '/index.html' : '/app-shell'),
);

/**
 * Cache API requests
 */
registerRoute(
  adminUrlRegexp,
  new NetworkFirst({
    cacheName: 'app-api',
  }),
  'GET',
);

/**
 * Purge cache before unregister service worker
 */
self.addEventListener('message', (event) => {
  if (event.data !== 'PURGE_CACHE') {
    return;
  }

  event.waitUntil(
    (async () => {
      console.info('Service Worker: Removing old cache.');

      const keys = await caches.keys();

      return Promise.all(keys.map((cache) => caches.delete(cache)));
    })(),
  );
});
