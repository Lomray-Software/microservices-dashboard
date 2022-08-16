// noinspection JSUnusedGlobalSymbols

const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const crypto = require('crypto');

const IS_PROD = process.env.NODE_ENV === 'production';
const BUILD_TYPE = process.env.BUILD_TYPE || 'iso';
const RAZZLE_ENABLE_PWA = Number(process.env.RAZZLE_ENABLE_PWA) || 0;

/**
 * @see razzle.defaultOptions
 */
module.exports = {
  options: {
    enableReactRefresh: true,
    enableSourceMaps: !IS_PROD,
    staticExport: {
      parallel: 1,
    },
    buildType: BUILD_TYPE, // spa, iso - ssr
  },
  plugins: [
    'scss',
    'svg-react-component',
    // {
    //   name: 'bundle-analyzer',
    //   options: {
    //     target: 'web', // or 'node'
    //     env: 'production', // or 'development'
    //     bundleAnalyzerConfig: {},
    //   },
    // },
  ],
  /**
   * @param env
   * @param webpackConfig
   * @param {Record<any, Record>} webpackObject
   */
  modifyWebpackConfig({ env, webpackConfig, webpackObject }) {
    // when we are building the client bundle
    if (env.target === 'web') {
      // Remove aggressive merge plugin (prevent combine pages to the same chunk)
      const aggressiveMergePlugin = webpackConfig.plugins.findIndex(
        plugin => plugin instanceof webpackObject.optimize.AggressiveMergingPlugin
      );
      webpackConfig.plugins.splice(aggressiveMergePlugin, 1);

      // webpackConfig.optimization.minimize = false;
      webpackConfig.optimization.splitChunks = {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
      };

      const terserOptions = webpackConfig.optimization && webpackConfig.optimization.minimizer && webpackConfig.optimization.minimizer[0].options.terserOptions;

      // disable call console.log from production build
      if (terserOptions && IS_PROD) {
        terserOptions.compress.pure_funcs = ['console.log'];
        webpackConfig.optimization.minimizer[0].options.terserOptions = terserOptions;
      }

      // replace env BUILD_TYPE in src
      const instanceOfDefinePlugin = webpackConfig.plugins.find(
        plugin => plugin instanceof webpackObject.DefinePlugin
      );
      instanceOfDefinePlugin.definitions['process.env.BUILD_TYPE'] = `'${BUILD_TYPE}'`;

      // disable css mini extract plugin order warnings (because we use SCSS modules)
      if (IS_PROD) {
        const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
          plugin => plugin instanceof MiniCssExtractPlugin
        );
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
      }

      if (RAZZLE_ENABLE_PWA === 1) {
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

        webpackConfig.plugins.push(new WebpackPwaManifest({
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

        webpackConfig.plugins.push(new InjectManifest({
          swSrc: path.resolve('src/sw.ts'),
          exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/, /\.xml$/],
          additionalManifestEntries: [
            ...localesManifests,
            // for ssr we need endpoint for app shell
            ...(BUILD_TYPE !== 'spa' ? [{
              url: '/app-shell', revision: (() => {
                const fileBuffer = fs.readFileSync(path.resolve('src/index.html'));
                const hashSum = crypto.createHash('sha256');

                return hashSum.update(fileBuffer).digest('hex').slice(0, 10);
              })()
            }] : []),
          ],
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        }));
      }
    }

    return webpackConfig;
  },
};
