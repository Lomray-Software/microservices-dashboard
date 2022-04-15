import type { IQuery } from './query';

interface IUpdate<TEntity> {
  fields: Partial<TEntity>;
  query?: IQuery<TEntity>['query'];
}

export default IUpdate;
