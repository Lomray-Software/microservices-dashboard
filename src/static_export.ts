/* eslint-disable unicorn/filename-case */
import { renderStatic } from '@lomray/after';
import { applySSGTranslation } from '@lomray/afterjs-helpers/server/translation';
import { Manager } from '@lomray/react-mobx-manager';
import type { Request, Response } from 'express';
import cookiesMiddleware from 'universal-cookie-express';
import { SITE_DOMAIN } from '@constants/index';
import ROUTE from '@constants/routes';
import { getRenderProps, translationConfig } from '@server/config';
import initApi from '@services/api-client';

type TRender = (req: Request, res: Response) => Promise<void>;

/**
 * Request in SSG mode is mocked, and we need provide some properties
 */
const extendStaticRequest = (req: Request): Request => {
  req.protocol = 'http';
  req.headers = { cookie: '' };
  req.originalUrl = req.url;
  // @ts-ignore
  req.get = (name: string): string | string[] | undefined => {
    if (name === 'host') {
      return SITE_DOMAIN.split('://')[1];
    }

    return undefined;
  };

  return req;
};

/**
 * NOTE: Please uncomment lines with ssg comment in:
 */
export const render: TRender = async (req, res) => {
  extendStaticRequest(req);
  cookiesMiddleware()(req, res, () => null);
  await applySSGTranslation(req, res, translationConfig);

  const { endpoints, apiClient } = initApi({ headers: req.headers });
  const storeManager = new Manager({ storesParams: { endpoints } });

  apiClient.setStoreManager(storeManager);
  await storeManager.init();

  const { html, data } = await renderStatic({
    req,
    res,
    storeManager,
    ...getRenderProps(),
  });

  res.json({ html, data: { ...(data ?? {}) } });
};

export const routes = (): string[] => [...Object.values(ROUTE).map(({ URL }) => URL), '/404'];
// export const routes = (): string[] => ['/', '/404'];
