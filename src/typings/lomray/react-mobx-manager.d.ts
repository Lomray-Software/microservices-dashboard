/* eslint-disable @typescript-eslint/naming-convention */
import type Endpoints from '@store/endpoints';

export * from '@lomray/react-mobx-manager';

declare module '@lomray/react-mobx-manager' {
  interface IConstructorParams {
    endpoints: Endpoints;
  }
}
