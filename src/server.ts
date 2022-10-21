import { render } from '@lomray/after';
import { getPublicPath } from '@lomray/afterjs-helpers/server/tools/paths';
import { initServerTranslation } from '@lomray/afterjs-helpers/server/translation';
import { Manager } from '@lomray/react-mobx-manager';
import express from 'express';
import { enableStaticRendering } from 'mobx-react-lite';
import cookiesMiddleware from 'universal-cookie-express';
import { IS_PROD } from '@constants/index';
import { getRenderProps, translationConfig } from '@server/config';
import initApi from '@services/api-client';

const server = express();

void (async () => {
  // initialize and load translation
  const lngDetector = await initServerTranslation(server, translationConfig);

  enableStaticRendering(true);

  server
    .disable('x-powered-by')
    // add endpoint for static files (css, js, etc.)
    .use(express.static(getPublicPath(process.env.RAZZLE_PUBLIC_DIR)))
    // detect request language
    .use(lngDetector)
    .use(cookiesMiddleware())
    .get('/*', (req, res) => {
      void (async () => {
        try {
          const { endpoints } = initApi({ headers: req.headers });
          const storeManager = new Manager({
            options: { shouldDisablePersist: true, isSSR: true },
            storesParams: { endpoints },
          });

          await storeManager.init();
          endpoints.apiClient.setStoreManager(storeManager);

          const html = await render({
            req,
            res,
            storeManager,
            ...getRenderProps(),
          });

          // detect redirect
          if (res.statusCode === 302 || res.statusCode === 301) {
            return;
          }

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
