import { render } from '@jaredpalmer/after';
import express from 'express';
import { enableStaticRendering } from 'mobx-react-lite';
import cookiesMiddleware from 'universal-cookie-express';
import { IS_PROD } from '@constants/index';
import { getRenderProps } from '@server/config';
import enableAxiosCache from '@server/enable-axios-cache';
import resolveAppPath from '@server/tools/resolve-app-path';
import { initServerTranslation } from '@server/translation';
import Manager from '@store/manager';

const publicPath =
  // true - 'razzle start' only (for development /public) in other cases we need /build/public
  process.env.WEBPACK_DEV_SERVER === 'true'
    ? process.env.RAZZLE_PUBLIC_DIR || ''
    : resolveAppPath('build/public');

const server = express();

enableAxiosCache(server);

void (async () => {
  // initialize and load translation
  const lngDetector = await initServerTranslation(server);

  enableStaticRendering(true);

  server
    .disable('x-powered-by')
    // add endpoint for static files (css, js, etc.)
    .use(express.static(publicPath))
    // detect request language
    .use(lngDetector)
    .use(cookiesMiddleware())
    .get('/*', (req, res) => {
      void (async () => {
        try {
          const storeManager = new Manager();

          const html = await render({
            req,
            res,
            storeManager,
            ...getRenderProps(),
          });

          res.send(html);
        } catch (error) {
          console.error(error);
          res.json({
            message: error.message,
            ...(IS_PROD ? {} : { stack: error.stack }),
          });
        }
      })();
    });
})();

export default server;
