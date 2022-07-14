import { StaticContext } from '@lomray/after';
import type { FC } from 'react';
import React, { useContext } from 'react';

interface IStatusGate {
  code: number;
}

/**
 * Status gate
 * @constructor
 */
const StatusGate: FC<IStatusGate> = ({ code, children }) => {
  const context = useContext(StaticContext);

  if (context) {
    context.statusCode = code;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default StatusGate;
