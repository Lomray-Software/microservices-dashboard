module.exports = {
  presets: [
    'razzle/babel',
  ],
  plugins: [
    'after',
    'inline-react-svg',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        root: [
          './src',
        ],
        alias: {
          '@assets': './src/assets',
          '@common/*': './src/common',
          '@wrappers/*': './src/common/wrappers',
          '@forms/*': './src/common/forms',
          '@helpers/*': './src/common/helpers',
          '@hooks/*': './src/common/hooks',
          '@modals/*': './src/common/modals',
          '@context/*': './src/common/context',
          '@components/*': './src/common/components',
          '@services': './src/common/services',
          '@constants': './src/constants',
          '@interfaces': './src/interfaces',
          '@pages': './src/pages',
          '@server': './src/server',
          '@store': './src/store',
          '@server-tools': './src/server/tools',
        },
      },
    ],
  ],
  assumptions: {
    setPublicClassFields: false,
  },
}
