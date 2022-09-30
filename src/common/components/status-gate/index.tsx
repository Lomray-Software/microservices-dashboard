import { StaticContext } from '@lomray/after';
import type { FCC } from '@lomray/client-helpers/interfaces/fc-with-children';
import React, { useContext } from 'react';

interface IStatusGate {
  code: number;
}

/**
 * Status gate
 * @constructor
 */
const StatusGate: FCC<IStatusGate> = ({ code, children }) => {
  const context = useContext(StaticContext);

  if (context) {
    context.statusCode = code;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default StatusGate;
