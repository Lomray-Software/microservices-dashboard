/* eslint-disable @typescript-eslint/no-var-requires */
import glob from 'glob';
import routes from '../routes';
import Document from './document';

// get manifest.json name if exist
const manifestPath = glob.sync(`${__dirname}/**/manifest*.json`)?.[0]?.split('/').pop();
// get apple icons if exist (pwa)
const iosIcons = glob.sync(`${__dirname}/**/icons/ios/*.*`).map((iconPath) => ({
  link: `/icons/ios/${iconPath.split('/').pop() || ''}`,
  size: /[\d]+x[\d]+/.exec(iconPath)?.[0] ?? '',
}));
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');

/**
 * Server render props
 */
const getRenderProps = () =>
  ({
    assets,
    chunks: assets,
    document: Document,
    routes,
  } as const);

export { getRenderProps, manifestPath, iosIcons };
