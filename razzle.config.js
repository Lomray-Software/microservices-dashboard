const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const crypto = require('crypto');

const IS_PROD = process.env.NODE_ENV === 'production';
const BUILD_TYPE = process.env.BUILD_TYPE || 'iso';

/**
 * Build locales manifests for cache PWA
 */
const localesManifests = glob.sync(`${__dirname}/src/assets/locales/*/*.json`).map((localeNamespace) => ({
  // leave only /locales/lang/namespace.json
  url: ['', ...localeNamespace.split('/').splice(-3)].join('/'),
  revision: (() => {
    const fileBuffer = fs.readFileSync(localeNamespace);
    const hashSum = crypto.createHash('sha256');

    return hashSum.update(fileBuffer).digest('hex').slice(0, 10);
  })(),
}));

/**
 * @see razzle.defaultOptions
 */
module.exports = {
  options: {
    enableSourceMaps: !IS_PROD,
    staticExport: {
      parallel: 1,
    },
    buildType: BUILD_TYPE, // spa, iso - ssr
  },
  plugins: [
    'scss',
    'svg-react-component'
  ],
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    // Uncomment to enable bundle analyser
    // config.plugins.push(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());

    // when we are building the client bundle
    if (opts.env.target === "web") {
      const terserOptions = config.optimization && config.optimization.minimizer && config.optimization.minimizer[0].options.terserOptions;

      // disable call console.* from production build
      if (terserOptions && IS_PROD) {
        terserOptions.compress.pure_funcs = ['console.log'];
        config.optimization.minimizer[0].options.terserOptions = terserOptions;
      }

      config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'DefinePlugin') {
          plugin.definitions['process.env.BUILD_TYPE'] = `'${BUILD_TYPE}'`;
        }
      })

      config.plugins.push(new WebpackPwaManifest({
        name: process.env.RAZZLE_APP_NAME,
        short_name: process.env.RAZZLE_APP_SHORT_NAME,
        description: process.env.RAZZLE_APP_DESCRIPTION,
        background_color: process.env.RAZZLE_APP_BACKGROUND_COLOR,
        theme_color: process.env.RAZZLE_APP_BACKGROUND_COLOR,
        display: 'fullscreen',
        ios: {
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'black-translucent',
        },
        icons: [
          {
            src: path.resolve('public/favicon.png'),
            destination: path.join('icons'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
          {
            src: path.resolve('public/favicon.png'),
            destination: path.join('icons', 'android'),
            size: [512],
            purpose: 'maskable'
          },
          {
            src: path.resolve('public/favicon.png'),
            destination: path.join('icons', 'ios'),
            sizes: [120, 152, 167, 180, 1024],
            ios: true
          },
        ]
      }));

      config.plugins.push(new InjectManifest({
        swSrc: path.resolve('src/sw.ts'),
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/, /\.xml$/],
        additionalManifestEntries: [
          ...localesManifests,
          // for ssr we need endpoint for app shell
          ...(BUILD_TYPE !== 'spa' ? [{ url: '/app-shell', revision: (() => {
              const fileBuffer = fs.readFileSync(path.resolve('src/index.html'));
              const hashSum = crypto.createHash('sha256');

              return hashSum.update(fileBuffer).digest('hex').slice(0, 10);
            })() }] : []),
        ],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      }));
    }

    return config;
  },
};
