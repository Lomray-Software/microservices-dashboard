import React, { FC } from 'react';
import { Route } from 'react-router-dom';

interface IStatusGate {
  code: number;
}

/**
 * Status gate
 * @constructor
 *
 * @see https://reactrouter.com/web/guides/server-rendering/404-401-or-any-other-status
 * @see https://github.com/jaredpalmer/after.js/#dynamic-404-and-redirects
 */
const StatusGate: FC<IStatusGate> = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = code;
      }

      return children;
    }}
  />
);

export default StatusGate;
