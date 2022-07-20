/* eslint-disable unicorn/filename-case */
import { renderStatic } from '@lomray/after';
import { Manager } from '@lomray/react-mobx-manager';
import type { Request, Response } from 'express';
import cookiesMiddleware from 'universal-cookie-express';
import { SITE_DOMAIN } from '@constants/index';
import ROUTE from '@constants/routes';
import { getRenderProps } from '@server/config';
import { applySSGTranslation } from '@server/translation';
import ApiClient from '@services/api-client';
import Endpoints from '@store/endpoints';

type TRender = (req: Request, res: Response) => Promise<void>;

/**
 * Request in SSG mode is mocked and we need provide some properties
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
  await applySSGTranslation(req, res);

  const apiClient = new ApiClient({ headers: req.headers });
  const endpoints = new Endpoints(apiClient);
  const storeManager = new Manager({ storesParams: { endpoints } });

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
