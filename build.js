const fs = require('fs');
const fse = require('fs-extra');

require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'production';
const BUILD_TYPE = process.env.BUILD_TYPE || 'iso';

/**
 * Run sync command and ignore error
 * @param callback
 */
const runSync = (callback) => {
  try {
    callback();
  } catch (e) {
    // ignore
  }
}

if (BUILD_TYPE === 'spa') {
  fs.copyFileSync('./src/index.html', './public/index.html');
}

// cleanup
// runSync(() => fs.rmSync('./build', { recursive: true, force: true }));
// runSync(() => fs.rmSync('./cache', { recursive: true, force: true }));

require('child_process').execSync(
  `razzle build --noninteractive --node-env=${NODE_ENV} --type=${BUILD_TYPE}`,
  {
    stdio: 'inherit',
    env: process.env,
  }
);

// add localization (if exist)
runSync(() => fse.copySync('./src/assets/locales', './build/public/locales', { overwrite: true }));
runSync(() => fs.rmSync('./build/public/locales/namespaces.ts'));

// cleanup
runSync(() => fs.rmSync('./public/index.html'));
