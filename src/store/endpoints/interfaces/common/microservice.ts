/**
 * JSON RPC microservice error structure
 */
interface IBaseException {
  code: number;
  status: number;
  service: string;
  message: string;
  rawMessage: string;
  payload: Record<string, any>;
}

/**
 * JSON RPC response structure
 */
interface IMicroserviceResponse<TResult = Record<string, any>> {
  id?: string;
  result?: TResult;
  error?: IBaseException;
}

export type { IBaseException, IMicroserviceResponse };
