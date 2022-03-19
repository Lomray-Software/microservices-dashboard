/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.info('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`);
  })
  .on('error', (err) => {
    console.error(err);
  });
